# Install Intent Witness (Cursor, V0)

V0 is a project skill plus a read-only reviewer subagent. There is no CLI product yet.

## In this repository

This repo already has `.cursor/skills/intent-witness` and `.cursor/agents/intent-witness-reviewer.md` installed. Refresh them from source:

```bash
node scripts/install-cursor.mjs
node scripts/install-cursor.mjs --check
```

## Into another app

```bash
node path/to/intent-witness/scripts/install-cursor.mjs path/to/your-app
```

Creates or updates:

```text
.cursor/skills/intent-witness/
.cursor/agents/intent-witness-reviewer.md
.intent-witness/intent.md          # only if missing
.intent-witness/reviews/
```

The reviewer agent is `readonly: true` and `model: inherit`. No `hooks.json` is installed.

## Then

1. Edit `.intent-witness/intent.md` for the product (domain, primary job, objects, explicit avoid).
2. Run the app so a browser can load it.
3. In Cursor: `Use Intent Witness` on the changed UI.
4. The builder should delegate to `intent-witness-reviewer` and write `.intent-witness/reviews/<id>.yaml`.

If the installed files drift from `skill/intent-witness` or `adapters/cursor/intent-witness-reviewer.md`, `--check` fails. Re-run the installer.
