# Install Intent Witness for Cursor

```bash
npx @mattbaconz/intent-witness install cursor path/to/your-app
npx @mattbaconz/intent-witness check cursor path/to/your-app
```

A clone checkout retains the script entry point:

```bash
node scripts/install-cursor.mjs path/to/your-app
node scripts/install-cursor.mjs --check path/to/your-app
```

First install refuses existing unmanaged `.cursor/skills/intent-witness/` or `.cursor/agents/intent-witness-reviewer.md`. Inspect them, or replace intentionally with `intent-witness install cursor path/to/your-app --force`. Conflicts and local edits of managed files are copied below `.intent-witness/backups/<UTC-safe-id>/`; intent, reviews, and evidence are never overwritten.

## Local privacy defaults

On first install, Intent Witness creates `.intent-witness/.gitignore` only when that file is absent. The default policy keeps `evidence/`, `reviews/`, `backups/`, and `install.json` local; it also ignores the local `scratch/` directory. Durable `intent.md` is versionable by default so teams can share product intent. Existing ignore policy is never replaced.

Versioning evidence, reviews, backups, scratch data, or install metadata is an intentional opt-in: remove only the relevant pattern from `.intent-witness/.gitignore` (and review the files for sensitive screenshots, product context, or user data) before adding it to source control. Keep `install.json` local unless a repository deliberately versions an installed-copy manifest for reproducible checks.

The parent captures rendered evidence into `.intent-witness/evidence/<review-id>/` and supplies it with intent, changed files, route, and constraints to the hard-read-only reviewer. The reviewer cannot capture, browse, write, or implement. Save returned artifacts under `.intent-witness/reviews/`; fulfill any specific `INSUFFICIENT_EVIDENCE` request with a new parent-side capture.
