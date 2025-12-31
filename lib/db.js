import Database from "better-sqlite3";
const db = new Database("pastes.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS pastes (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    ttl_seconds INTEGER,
    max_views INTEGER,
    created_at INTEGER NOT NULL,
    views INTEGER DEFAULT 0
  )
`
).run();

export default db;
