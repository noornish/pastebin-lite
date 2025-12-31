import db from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = params;

  const testNowHeader = request.headers.get("x-test-now-ms");
  const now = testNowHeader ? Number(testNowHeader) : Date.now();

  const paste = db.prepare("SELECT * FROM pastes WHERE id = ?").get(id);
  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (paste.ttl_seconds && now > paste.created_at + paste.ttl_seconds * 1000) {
    return Response.json({ error: "Expired" }, { status: 404 });
  }

  if (paste.max_views && paste.views >= paste.max_views) {
    return Response.json({ error: "View limit exceeded" }, { status: 404 });
  }

  db.prepare("UPDATE pastes SET views = views + 1 WHERE id = ?").run(id);

  return Response.json({
    content: paste.content,
    remaining_views: paste.max_views ? paste.max_views - paste.views - 1 : null,
    expires_at: paste.ttl_seconds
      ? new Date(paste.created_at + paste.ttl_seconds * 1000).toISOString()
      : null,
  });
}
