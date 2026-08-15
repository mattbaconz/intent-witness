# Cursor adapter

Installs the portable Intent Witness skill and a read-only reviewer subagent.

## Layout after install

```text
.cursor/
  skills/intent-witness/     # copy of skill/intent-witness
  agents/intent-witness-reviewer.md
.intent-witness/
  intent.md              # created from template if missing
  reviews/               # builder writes review YAML here
```

## Install

From the Intent Witness repo:

```bash
node scripts/install-cursor.mjs
node scripts/install-cursor.mjs path/to/your-app
node scripts/install-cursor.mjs --check
```

`--check` fails if the installed skill or agent drifted from source.

## Usage

1. Add product context to `.intent-witness/intent.md`.
2. Run the app.
3. In Cursor: `Build/review this UI. Use Intent Witness.`
4. The builder should delegate to `intent-witness-reviewer` (readonly) and persist `.intent-witness/reviews/`.

No completion hook is installed. Review is advisory.
