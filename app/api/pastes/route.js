import db from "@/lib/db";
import { nanoid } from "nanoid";

export async function POST(request) {
  const body = await request.json();
  const { content, ttl_seconds, max_views } = body;

  if (!content || typeof content !== "string") {
    return Response.json({ error: "Content required" }, { status: 400 });
  }

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return Response.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return Response.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const id = nanoid(8);
  const created_at = Date.now();

  db.prepare(
    `
    INSERT INTO pastes (id, content, ttl_seconds, max_views, created_at)
    VALUES (?, ?, ?, ?, ?)
  `
  ).run(id, content, ttl_seconds ?? null, max_views ?? null, created_at);

  return Response.json(
    {
      id,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`,
    },
    { status: 201 }
  );
}
