import http from "node:http";
// Somente para QA local: nenhum e-mail é enviado.
http.createServer(async (request, response) => {
  let body = "";
  for await (const chunk of request) body += chunk;
  const message = JSON.parse(body || "{}");
  response.setHeader("Content-Type", "application/json");
  if (message.text?.includes("falha simulada")) { response.writeHead(503); response.end(JSON.stringify({ error: "simulated" })); }
  else { response.writeHead(200); response.end(JSON.stringify({ id: "mock-only" })); }
}).listen(4011, "127.0.0.1", () => console.log("Mock Resend em http://127.0.0.1:4011"));
