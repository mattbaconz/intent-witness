# Cursor adapter

Installs the portable Deliberate skill and a read-only reviewer subagent.

## Layout after install

```text
.cursor/
  skills/deliberate/     # copy of skill/deliberate
  agents/deliberate-reviewer.md
.deliberate/
  intent.md              # created from template if missing
  reviews/               # builder writes review YAML here
```

## Install

From the Deliberate repo:

```bash
node scripts/install-cursor.mjs
node scripts/install-cursor.mjs path/to/your-app
node scripts/install-cursor.mjs --check
```

`--check` fails if the installed skill or agent drifted from source.

## Usage

1. Add product context to `.deliberate/intent.md`.
2. Run the app.
3. In Cursor: `Build/review this UI. Use Deliberate.`
4. The builder should delegate to `deliberate-reviewer` (readonly) and persist `.deliberate/reviews/`.

No completion hook is installed. Review is advisory.
