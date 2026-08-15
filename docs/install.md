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

The parent captures rendered evidence into `.intent-witness/evidence/<review-id>/` and supplies it with intent, changed files, route, and constraints to the hard-read-only reviewer. The reviewer cannot capture, browse, write, or implement. Save returned artifacts under `.intent-witness/reviews/`; fulfill any specific `INSUFFICIENT_EVIDENCE` request with a new parent-side capture.
