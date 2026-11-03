// Adaptador Resend: o endereço alternativo só pode ser um servidor local em desenvolvimento.
export async function sendWithResend({ env, fetchImpl, name, email, message }) {
  let endpoint = "https://api.resend.com/emails";
  if (env.NODE_ENV !== "production" && env.RESEND_API_URL) {
    const candidate = new URL(env.RESEND_API_URL);
    if (candidate.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(candidate.hostname)) throw new Error("test endpoint must be local");
    endpoint = candidate.href;
  }
  const result = await fetchImpl(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: email, subject: `Contato pelo portfólio: ${name}`, text: `Nome: ${name}\nE-mail: ${email}\n\n${message}` }),
    signal: AbortSignal.timeout(10000),
  });
  if (!result.ok) return false;
  const accepted = await result.json();
  return typeof accepted?.id === "string" && Boolean(accepted.id);
}
