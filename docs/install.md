# Install Deliberate (Cursor, V0)

V0 is a project skill plus a read-only reviewer subagent. There is no CLI product yet.

## In this repository

This repo already has `.cursor/skills/deliberate` and `.cursor/agents/deliberate-reviewer.md` installed. Refresh them from source:

```bash
node scripts/install-cursor.mjs
node scripts/install-cursor.mjs --check
```

## Into another app

```bash
node path/to/deliberate/scripts/install-cursor.mjs path/to/your-app
```

Creates or updates:

```text
.cursor/skills/deliberate/
.cursor/agents/deliberate-reviewer.md
.deliberate/intent.md          # only if missing
.deliberate/reviews/
```

The reviewer agent is `readonly: true` and `model: inherit`. No `hooks.json` is installed.

## Then

1. Edit `.deliberate/intent.md` for the product (domain, primary job, objects, explicit avoid).
2. Run the app so a browser can load it.
3. In Cursor: `Use Deliberate` on the changed UI.
4. The builder should delegate to `deliberate-reviewer` and write `.deliberate/reviews/<id>.yaml`.

If the installed files drift from `skill/deliberate` or `adapters/cursor/deliberate-reviewer.md`, `--check` fails. Re-run the installer.
