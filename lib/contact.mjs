import { createHash } from "node:crypto";
import { sendWithResend } from "./resend.mjs";

const WINDOW_SECONDS = 600;
const MAX_REQUESTS = 5;
const MAX_BODY = 8192;
const memory = new Map();

export function configured(env = process.env) {
  const mail = Boolean(env.RESEND_API_KEY && env.CONTACT_FROM && env.CONTACT_TO);
  const distributed = Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
  return mail && (env.NODE_ENV !== "production" || distributed);
}

function response(status, code) {
  return Response.json({ code }, { status, headers: { "Cache-Control": "no-store" } });
}

async function limitRequest(key, env, fetchImpl, now) {
  const redis = env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN;
  if (redis) {
    const root = env.UPSTASH_REDIS_REST_URL.replace(/\/$/, "");
    const result = await fetchImpl(`${root}/pipeline`, {
      method: "POST", headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", key], ["EXPIRE", key, WINDOW_SECONDS, "NX"]]),
      signal: AbortSignal.timeout(5000),
    });
    if (!result.ok) throw new Error("limiter unavailable");
    const body = await result.json();
    if (!Array.isArray(body) || typeof body[0]?.result !== "number" || body.some((entry) => entry.error)) throw new Error("invalid limiter response");
    return body[0].result <= MAX_REQUESTS;
  }
  if (env.NODE_ENV === "production") throw new Error("distributed limiter required");
  for (const [item, value] of memory) if (value.expires <= now) memory.delete(item);
  const entry = memory.get(key) ?? { count: 0, expires: now + WINDOW_SECONDS * 1000 };
  entry.count += 1;
  memory.set(key, entry);
  return entry.count <= MAX_REQUESTS;
}

async function readBody(request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY) throw new Error("too large");
  if (!request.body) throw new Error("missing body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw new Error("too large"); }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode());
}

export function createContactHandler({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
  return async function POST(request) {
    if (!configured(env)) return response(503, "unavailable");
    const origin = request.headers.get("origin");
    try {
      if (origin && new URL(origin).host.toLowerCase() !== (request.headers.get("host") || new URL(request.url).host).toLowerCase()) return response(403, "forbidden");
    } catch { return response(403, "forbidden"); }
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return response(415, "invalid");
    const ip = env.TRUST_PROXY === "true" ? (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown") : "shared";
    const key = `contact:${createHash("sha256").update(ip).digest("hex")}`;
    try {
      if (!(await limitRequest(key, env, fetchImpl, now()))) return response(429, "rate");
    } catch { return response(503, "unavailable"); }
    let body;
    try { body = await readBody(request); } catch { return response(400, "invalid"); }
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (body?.website || name.length < 2 || name.length > 80 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 4000) return response(400, "invalid");
    try {
      if (!(await sendWithResend({ env, fetchImpl, name, email, message }))) return response(502, "failed");
      return response(200, "sent");
    } catch { return response(502, "failed"); }
  };
}


