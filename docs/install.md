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

### Legacy Deliberate migration

If the target still has generated legacy Cursor paths, the installer copies them to a UTC-safe backup such as `.intent-witness/backups/20260815T163254123Z/legacy/`, then removes only `.cursor/skills/deliberate/` and `.cursor/agents/deliberate-reviewer.md`. It never deletes `.deliberate/` user state. When `.intent-witness/intent.md` is absent, it copies `.deliberate/intent.md` into the new state directory while preserving the old intent and all legacy reviews in place. `--check` reports remaining legacy Cursor paths actionably.

## Then

1. Edit `.intent-witness/intent.md` for the product (domain, primary job, objects, explicit avoid).
2. Run the app so a browser can load it.
3. In Cursor: `Use Intent Witness` on the changed UI.
4. Before delegation, the parent captures scoped rendered evidence with Cursor Browser and stores artifacts plus a manifest under `.intent-witness/evidence/<id>/`.
5. The builder delegates that evidence packet to `intent-witness-reviewer`, fulfills any specific `INSUFFICIENT_EVIDENCE` requests with more parent-side capture, and writes `.intent-witness/reviews/<id>.yaml`.

If the installed files drift from `skill/intent-witness` or `adapters/cursor/intent-witness-reviewer.md`, `--check` fails. Re-run the installer.
