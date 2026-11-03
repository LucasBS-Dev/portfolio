import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler, configured } from "../lib/contact.mjs";

const env = { RESEND_API_KEY: "key", CONTACT_FROM: "Portfolio <contact@example.com>", CONTACT_TO: "lucas@example.com", TRUST_PROXY: "true", NODE_ENV: "test" };
const valid = { name: "Pessoa Teste", email: "pessoa@example.com", message: "Uma mensagem de teste válida.", website: "" };
function request(body = valid, ip = crypto.randomUUID()) {
  return new Request("http://localhost:3001/api/contact", { method: "POST", headers: { "Content-Type": "application/json", Origin: "http://localhost:3001", "x-forwarded-for": ip }, body: JSON.stringify(body) });
}
test("indisponível sem credenciais e sem limite distribuído em produção", () => {
  assert.equal(configured({}), false);
  assert.equal(configured({ ...env, NODE_ENV: "production" }), false);
});
test("valida campos e honeypot no servidor", async () => {
  const handler = createContactHandler({ env, fetchImpl: async () => { throw new Error("must not send"); } });
  assert.equal((await handler(request({ ...valid, email: "inválido" }))).status, 400);
  assert.equal((await handler(request({ ...valid, website: "spam" }))).status, 400);
  assert.equal((await handler(request({ ...valid, message: "curta" }))).status, 400);
});
test("aceita somente confirmação do provedor e usa Reply-To", async () => {
  let sent;
  const handler = createContactHandler({ env, fetchImpl: async (_url, options) => { sent = JSON.parse(options.body); return Response.json({ id: "mock-id" }); } });
  assert.equal((await handler(request())).status, 200);
  assert.equal(sent.reply_to, valid.email);
  assert.match(sent.text, /mensagem de teste/);
  const noId = createContactHandler({ env, fetchImpl: async () => Response.json({}) });
  assert.equal((await noId(request())).status, 502);
});
test("falha de provedor não vira sucesso", async () => {
  const handler = createContactHandler({ env, fetchImpl: async () => new Response("no", { status: 503 }) });
  assert.equal((await handler(request())).status, 502);
});
test("limita requisições por origem", async () => {
  const handler = createContactHandler({ env, fetchImpl: async () => Response.json({ id: "mock-id" }) });
  const ip = crypto.randomUUID();
  for (let i = 0; i < 5; i++) assert.equal((await handler(request(valid, ip))).status, 200);
  assert.equal((await handler(request(valid, ip))).status, 429);
});
test("limite distribuído falha fechado", async () => {
  const prod = { ...env, NODE_ENV: "production", UPSTASH_REDIS_REST_URL: "https://redis.example.com", UPSTASH_REDIS_REST_TOKEN: "token" };
  const handler = createContactHandler({ env: prod, fetchImpl: async () => new Response("error", { status: 500 }) });
  assert.equal((await handler(request())).status, 503);
});
test("compara a origem ao Host público e rejeita origens externas", async () => {
  const handler = createContactHandler({ env, fetchImpl: async () => Response.json({ id: "mock-id" }) });
  const headers = { "Content-Type": "application/json", Host: "127.0.0.1:3002", Origin: "http://127.0.0.1:3002", "x-forwarded-for": crypto.randomUUID() };
  const same = new Request("http://localhost:3002/api/contact", { method: "POST", headers, body: JSON.stringify(valid) });
  assert.equal((await handler(same)).status, 200);
  const foreign = new Request("http://localhost:3002/api/contact", { method: "POST", headers: { ...headers, Origin: "https://example.org" }, body: JSON.stringify(valid) });
  assert.equal((await handler(foreign)).status, 403);
});
test("limite distribuído permite cinco e bloqueia a sexta tentativa", async () => {
  const prod = { ...env, NODE_ENV: "production", UPSTASH_REDIS_REST_URL: "https://redis.example.com", UPSTASH_REDIS_REST_TOKEN: "token" };
  let count = 0;
  const handler = createContactHandler({ env: prod, fetchImpl: async (url, options) => {
    if (String(url).includes("redis.example.com")) {
      const commands = JSON.parse(options.body);
      assert.equal(commands[0][0], "INCR");
      assert.deepEqual(commands[1].slice(0, 1), ["EXPIRE"]);
      return Response.json([{ result: ++count }, { result: 1 }]);
    }
    return Response.json({ id: "mock-id" });
  } });
  const ip = crypto.randomUUID();
  for (let i = 0; i < 5; i++) assert.equal((await handler(request(valid, ip))).status, 200);
  assert.equal((await handler(request(valid, ip))).status, 429);
});
