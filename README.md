# Pastebin Lite

A small Pastebin-like application built with Next.js and SQLite.  
Users can create text pastes, get shareable links, and view pastes with optional constraints like TTL (expiry) and max views.

## Features

- Create a text paste and get a shareable URL
- View paste via `/p/:id`
- Optional constraints:
  - TTL (time-to-live / expiry)
  - Max views
- Persistent storage using SQLite
- Health check API `/api/healthz`

## Run Locally

1. Clone the repository:


            git clone https://github.com/<your-username>/pastebin-lite.git
            cd pastebin-lite

2. Install dependencies:


            npm run dev
   

3.Run the development server:


            npm run dev

Open your browser at: http://localhost:3000




