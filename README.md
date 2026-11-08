# Marginalia

A private reading companion and self-assembling journal, with an opt-in gallery of readers' perspectives on the same book. Working product name: Marginalia. GitHub repository: `AniketRB/Marcus`.

## Current state

Gate 3 bootstrap: documentation and repository safeguards only. There is no application, development server, deployed service, or installed application dependency yet. The founder authorized starting development on 2026-11-08; the original brief still requires approval of the concrete build plan before application implementation.

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
