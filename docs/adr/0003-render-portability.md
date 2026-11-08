# ADR 0003: Render first with a portable backend

Date: 2026-11-08. Status: Render-first accepted; implementation baseline proposed.

Host the Vite frontend and Node/TypeScript API on Render; retain Supabase for data/auth/storage. Use Hono and separate runtime adapters. On Render, generate PDFs through Dockerized Chromium. Isolate the PDF interface so Cloudflare Browser Run can replace it later. Avoid feature logic tied to local filesystem persistence or Node-only APIs. Free Render services sleep; paid compute and browser memory sizing require approval and measurement. Migration is possible but needs runtime, jobs, auth and export verification.
