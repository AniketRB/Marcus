# Marginalia

A private reading companion and self-assembling journal, with an opt-in gallery of readers' perspectives on the same book. Working product name: Marginalia. GitHub repository: `AniketRB/Marcus`.

## Current state

The founder approved the build plan on 2026-11-08. Phase 1 provides a runnable design preview of Library, Journal, Ask and Gallery, a portable Hono health API, PWA shell and automated quality checks. Sample content is illustrative. Accounts, AI, persistence and actual publication are not connected. Phase 2 awaits interface review.

## Run the preview

Use Node 22.19.0 (see `.nvmrc`) and npm. Dependencies are exactly pinned with a committed lockfile.

```sh
npm ci
npm run dev
# In another terminal, if testing the API:
npm run dev:api
```

Vite prints the local preview URL. The API health route is `http://localhost:10000/health`. No credentials are required for this phase.

```sh
npm run format:check
npm run check
npx playwright install chromium
npm run test:e2e
```

`npm run build` creates the production PWA in `dist`. Test service-worker behavior with a production preview; it is not enabled in development. Fonts currently load from Google Fonts with local serif/sans fallbacks. Real-device installation and offline draft storage are not yet verified/implemented.

## Product and decisions

- [Product flow](docs/product-flow.md)
- [Architecture](docs/architecture.md)
- [Build plan and acceptance criteria](docs/build-plan.md)
- [Design direction](docs/design-direction.md)
- [Decision records](docs/adr/README.md)
- [Workflow](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## Bootstrap setup

Prerequisites: Git and Python 3.11 or later. Node.js 22.19.0 is available on the initial workstation; the application runtime and package-manager versions will be pinned during the foundation phase after checking compatibility.

```sh
git clone https://github.com/AniketRB/Marcus.git
cd Marcus
git config core.hooksPath .githooks
python scripts/check_repository.py
```

The configured hooks run the repository check on commits and pushes. GitHub Actions runs the same check on pushes and pull requests. Application lint, format, type, and test checks are introduced with the first application scaffold, before feature work.

## Configuration

`.env.example` lists names and safe empty values only. Never commit a populated environment file. AI credentials and privileged database credentials are backend-only. Do not put private notes, excerpts, photographs, or tokens in logs or fixtures.

## License

License selection is pending. See [LICENSE](LICENSE).
