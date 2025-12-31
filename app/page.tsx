"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  async function createPaste(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <div
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1>Pastebin Lite</h1>

      <form onSubmit={createPaste}>
        <textarea
          rows={6}
          cols={50}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />

        <br />
        <button style={{ marginTop: 10 }} type="submit">
          Create Paste
        </button>
      </form>

      {url && (
        <p style={{ marginTop: 20 }}>
          Share link: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
