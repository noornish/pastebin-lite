import db from "@/lib/db";

export default async function PastePage({ params }) {
  const { id } = await params;

  const paste = db.prepare("SELECT * FROM pastes WHERE id = ?").get(id);

  if (!paste) {
    return <h1>404 - Paste not found</h1>;
  }

  const now = Date.now();

  if (
    (paste.ttl_seconds && now > paste.created_at + paste.ttl_seconds * 1000) ||
    (paste.max_views && paste.views >= paste.max_views)
  ) {
    return <h1>404 - Paste not found</h1>;
  }

  db.prepare("UPDATE pastes SET views = views + 1 WHERE id = ?").run(id);

  return (
    <main style={{ padding: 30 }}>
      <pre>{paste.content}</pre>
    </main>
  );
}
