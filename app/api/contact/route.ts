import { configured, createContactHandler } from "../../../lib/contact.mjs";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json({ available: configured() }, { headers: { "Cache-Control": "no-store" } });
}
export const POST = createContactHandler();
