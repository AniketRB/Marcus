# Contributing

## Approval boundaries

Follow the founder's brief: approve the build plan before application code, then obtain approval at every phase boundary. Summarize what was built, how to run and verify it, what comes next, and open decisions. Stop for material product changes. No deployment, paid-service purchase, or change in journal visibility is implied by a development approval.

## Branches and commits

- `main` is the stable integration branch. The initial documentation bootstrap is the sole direct-to-main initialization.
- Use short-lived `feat/`, `fix/`, `chore/`, or `docs/` branches and pull requests thereafter.
- Use small atomic Conventional Commits. Push each meaningful commit promptly.
- Never force-push or overwrite another contributor's changes without explicit authorization.
- Keep README, architecture, relevant ADRs and CHANGELOG current with behavioral changes.
- Tag approved releases semantically, beginning with `v0.1.0` when the first runnable foundation is accepted.

## Local checks

```sh
git config core.hooksPath .githooks
python scripts/check_repository.py
```

Hooks check staged content before commits and tracked content before pushes. The bootstrap check catches basic whitespace errors, missing mandatory documents and common secret patterns. It is a limited safeguard, not proof that content contains no secrets. Review staged diffs before committing. If a credential is exposed, revoke it; deleting a later copy is insufficient.

The first application PR must pin dependencies, commit its lockfile, and add formatting, linting, type-checking and meaningful tests to both hooks and CI. Add an established secret scanner in that PR. No feature PR merges until those checks are required and passing.

## GitHub protections

After the remote bootstrap, configure a ruleset for `main`: require PRs, require passing checks, block force-pushes and deletion, and resolve review conversations. Enable secret scanning/push protection where supported. These are recommendations until verified in GitHub; local files do not enforce remote protections. A solo founder need not require an unavailable second reviewer.

## Test priorities

Test ownership and shared-publication boundaries, offline replay without duplicates, AI adapter validation and quota behavior, excerpt handling and export inclusion. Use synthetic content. Include negative access tests between two users. Check critical flows on mobile browsers, keyboard navigation and reduced motion. Do not use implementation-mirroring tests as substitutes for behavior checks.
