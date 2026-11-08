"""Documentation-bootstrap checks; never print suspected secret values."""

from pathlib import Path
import re
import subprocess
import sys


def git(*args: str) -> bytes:
    return subprocess.check_output(["git", *args])


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    import os

    os.chdir(root)
    staged = "--staged" in sys.argv
    names = git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z") if staged else git("ls-files", "-z")
    required = ["README.md", ".gitignore", ".env.example", "LICENSE", "CONTRIBUTING.md", "CHANGELOG.md", "docs/product-flow.md", "docs/build-plan.md", "docs/architecture.md"]
    errors = [f"Missing required document: {name}" for name in required if not (root / name).is_file()]
    patterns = [
        re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
        re.compile(r"\b(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}"),
        re.compile(r"\bAIza[A-Za-z0-9_-]{30,}"),
        re.compile(r"\bAKIA[A-Z0-9]{16}\b"),
        re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}"),
        re.compile(r"(?im)^[ \t]*[A-Z0-9_]*(?:API_KEY|SECRET|TOKEN|PASSWORD|SERVICE_ROLE_KEY)[ \t]*=[ \t]*[\"']?[A-Za-z0-9_+/=-]{12,}"),
    ]
    checked = 0
    for raw_name in names.split(b"\0"):
        if not raw_name:
            continue
        name = raw_name.decode("utf-8")
        parts = Path(name).parts
        if any(part in {"node_modules", ".git", "work", ".local"} for part in parts):
            errors.append(f"Forbidden tracked directory: {name}")
        if any(part.startswith(".env") and part != ".env.example" for part in parts) or name.endswith((".pem", ".key")):
            errors.append(f"Forbidden secret/configuration file: {name}")
        data = git("show", f":{name}")
        try:
            content = data.decode("utf-8")
        except UnicodeDecodeError:
            continue
        checked += 1
        if any(pattern.search(content) for pattern in patterns):
            errors.append(f"Potential secret in {name}; inspect privately and remove or revoke it.")
        if any(line.rstrip(" \t") != line for line in content.splitlines()):
            errors.append(f"Trailing whitespace: {name}")
        if content and not content.endswith("\n"):
            errors.append(f"Missing final newline: {name}")
    if errors:
        print("\n".join(errors))
        return 1
    print(f"Repository safeguards passed ({checked} text files checked).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
