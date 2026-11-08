# Build plan - approval requested

Application implementation starts after founder approval of this plan. Every phase ends with a runnable demonstration, verification results, documentation/changelog update, pushed commits and PR, and an approval request before the next phase. No release is tagged until accepted.

## Phase 0 - repository bootstrap (current)

Deliver product/stack records, engineering rules, environment template, basic repository hooks and CI, initial commit and remote backup. Confirm GitHub protections separately; do not claim they are enabled from local configuration. Gate: approve this plan. No application exists yet.

## Phase 1 - visual foundation and reproducible tooling

Pin Node/package-manager/dependencies with a committed lockfile. Add React/Vite/TypeScript and portable Hono workspace, lint/format/type/tests/build/secret scanning in CI and local hooks. Present Library, Journal, Ask and Gallery designs with mobile/desktop/dark-mode states using explicitly labelled synthetic fixtures. Establish design tokens, accessible primitives, navigation, PWA manifest/icons and installation shell. No live AI or fake functioning features.

Acceptance: clean clone installs and passes checks; preview runs with documented commands; essential visual states are reviewable; founder approves the interface direction. Target accepted tag: v0.1.0.

## Phase 2 - private library and reliable capture

Implement Supabase schema/migrations, email and Google authentication, direct-to-library onboarding, user books and edition metadata. Implement manual posts, media and voice capture with editable transcripts; offline drafts and idempotent synchronization. Optional starter-book suggestions can remain absent.

Acceptance: two users cannot access each other's private records/files; a reader can add a book and preserve a post through offline/reconnect; sign-out prevents unintended access to previous-account drafts; pending/error states are visible. No live external processing before provider terms approval.

## Phase 3 - assisted reading and journal

Implement backend AI interface, prompt versioning, limits/caps/cache, layered text answers, voice transcription and image extraction/correction/range selection. Add try-first, saving, timeline/position view, search, tags and entry editing. Implement verified source metadata and a deliberately small supported retrieval corpus, without blocking excerpt-based use of other books.

Acceptance: synthetic evaluation covers ambiguous interpretations, translation uncertainty and spoiler boundaries; malformed responses and quota failures recover gracefully; repeated jobs do not duplicate entries; ownership and cache isolation tests pass. Approve provider, exact model, limits, recent Ask retention and temporary-image retention before live processing.

## Phase 4 - shared gallery (required MVP)

Implement work/edition grouping, publication preview, selected versioned snapshots, browse/filter/read, progress/spoiler labels, updates and unpublish. Add reporting and minimal administrator removal. Confirm signed-in-only versus anonymous readership before access-policy work.

Acceptance: unpublished entries, future private edits and excluded media never appear in gallery responses; one member can read another's explicitly published journal; unpublish revokes platform access; admin authorization is tested. Test missing books/empty gallery and edition differences.

## Phase 5 - finish and export

Implement finish/reopen, accurate stats, closing reflections, curation, one A5/A4 PDF template, glossary and key reflections. Add full account-data export and deletion. PDF jobs persist and output stays private; serialize browser work initially and size the instance using actual measurements.

Acceptance: export includes exactly the selected revisions/order, preserves separation of reader/AI text, and handles long entries and page breaks. Visually inspect generated PDFs. Verify deletion across database, storage, publications and queued jobs and explain retention limits.

## Phase 6 - pilot readiness and Render deployment

Audit accessibility, offline/account-switch behavior, mobile PWA compatibility, performance and access policies. Load-test bounded AI/PDF jobs, recovery and limits. Prepare Render configuration, environment/runbook and rollback instructions; verify Supabase email delivery/OAuth redirects. Founder approves live service choices and deployment. Start the approximately ten-reader pilot after a full journey demonstration.

Acceptance: reproducible setup, passing required CI, installed-PWA smoke tests, backup/recovery procedure, provider notice and no exposed secrets. Report measured costs and limitations rather than promising a fixed total.

## Pending decisions

- AI: standard paid processing for private content is recommended but not yet authorized; synthetic-only development can proceed.
- Gallery audience: signed-in members is the proposed MVP default; confirm before Phase 4.
- License selection before a reuse-permitting release.
- Actual deployment, paid resources and any open-internet publication require explicit approval.

Comments, likes, followers, messaging, additional reading modes, print ordering and multiple templates remain later scope.
