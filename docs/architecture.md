# Architecture

## Baseline

React, Vite and TypeScript PWA; custom editorial styling using Tailwind and Radix primitives; React Router; TanStack Query; Dexie/IndexedDB and Workbox. Render static hosting plus a TypeScript/Hono API running on Node. Supabase Postgres, Auth and private Storage. Backend-only provider adapters for AI, transcription and extraction. Dockerized Chromium/Playwright for PDF rendering on Render. GitHub Actions with lint, format, type, behavior and security checks from the application foundation onward.

These are the proposed stack baseline carried forward from the stack discussion. Render-first was explicitly accepted; exact dependency versions, provider/model and paid plans are not yet selected or purchased.

## Intended layout

Phase 1 implementation uses a single npm package with `src/` and `api/` to keep installation straightforward. Custom CSS provides the visual tokens; native dialog and controls provide the initial interactions. Tailwind/Radix, server-data management and offline-draft libraries are deferred until their features require them. The future package layout below remains the extraction direction as domain logic grows.

`apps/web` for the PWA; `apps/api` for routes and runtime adapters; `packages/domain` for portable business rules and validation; `packages/prompts` for versioned prompt files; `packages/journal-template` for export layout; `supabase` for migrations and access policies; `docs` for maintained decisions. Create application directories only after plan approval.

## Boundaries

Browser -> Supabase Auth; authenticated browser -> API; API -> AI and processing adapters; reader-owned data -> Supabase with row-level ownership policies. Never expose privileged database keys or AI keys in browser bundles. Normal authenticated operations retain the user's access context; privileged tasks need explicit owner checks. Gallery access reads publication data rather than private entry tables. Attachments use private buckets and short-lived authorized access. Do not include raw content in telemetry.

## Data overview

- Profiles and preferences.
- Canonical works and editions, separate from each user's reading book.
- User books, reading position, status and completion events.
- Versioned context sources and provenance; permission-verified full text only where supported.
- Entries: type, reference, excerpt, reader writing, structured AI answer, tags, visibility in export, timestamps and independent ordering.
- Media, passage links and durable processing jobs.
- Publications and immutable publication revisions containing explicitly selected material; audience, spoiler marker, publication and removal state.
- Reports and administrator actions.
- Exports with template/revision and included entry revisions; private output files.
- Usage counters and private cache keys including edition, prompt/model version and relevant reading context.

## Offline and jobs

Local drafts have stable client identifiers. Retry synchronization with idempotent writes; expose pending, failed and saved states. Store jobs durably, authorize job inputs and outputs, and bound retries. No reliance on in-memory work surviving a restart. Cross-device draft conflict handling must preserve both versions. Supabase is durable storage; Render's local disk is temporary.

## AI and privacy

Separate extraction, explanation and transcription interfaces. Validate structured responses and reject malformed output. Enforce per-user caps and bounded retry/backoff server-side. Never reuse one reader's private context in another reader's cached response. Keep prompts separately versioned. The live provider's terms and a content-processing notice must be settled before real user data is sent. Free Gemini development is limited to synthetic fixtures until that decision.

## Portability

Keep domain services compatible with standard Web APIs; isolate Node startup, filesystem and browser launch. On Cloudflare, replace the Node hosting adapter and local PDF runner with Workers and Browser Run. Supabase and journal templates stay in place. Job execution, runtime limits, cookies/CORS, OAuth redirects, uploads and PDF performance need migration testing. Portability does not mean a configuration-only migration.

## Security and deletion

Test two-user ownership isolation, gallery audience, unpublished revisions and media access. Published material is deliberately separate from private source data. Account deletion covers private data, publications, media, generated files, jobs and local sessions; document provider/back-up retention accurately. Do not promise end-to-end encryption: server-side AI and export process selected content. No in-copyright full-book upload/indexing. Excerpt limits and source-permission policy require explicit implementation rules.
