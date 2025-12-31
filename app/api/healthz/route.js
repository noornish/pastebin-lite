import db from "@/lib/db";

export async function GET() {
  try {
    db.prepare("SELECT 1").get();
    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
