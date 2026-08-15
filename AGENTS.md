# AGENTS.md — Intent Witness

Read this before changing Intent Witness. Canonical product spec: `intent-witness-vault/`.

## Mission

Build an open-source, design-judgment layer. Separate implementation from independent review. Do not reduce this to an anti-pattern prompt pack. V0 is Cursor-only; portability is a protocol goal, not authorization to build other ADE adapters, SaaS, or a CLI/MCP engine.

## Source of truth

When documents disagree:

1. `intent-witness-vault/docs/09-decisions/DECISION-LOG.md`
2. `intent-witness-vault/docs/06-implementation/V0-SPEC.md`
3. `intent-witness-vault/docs/02-system/ARCHITECTURE.md`
4. `intent-witness-vault/docs/02-system/REVIEW-PROTOCOL.md`

This repository is the V0 implementation (skill, Cursor adapter, schema, RelayOps demo). Do not pull SaaS, CLI/MCP, Playwright, hooks, or extra ADE adapters into this block.

## Invariants

Never violate these without updating the Decision Log:

1. **No universal aesthetic.** Do not encode “good UI = dark, dense, square, Linear-like.”
2. **Evidence before verdict.** Vague taste statements are invalid.
3. **Convention is not slop.** Challenge unjustified convergence, not familiarity.
4. **Depth-aware revision.** IA/interaction issues cannot be closed with polish-only changes.
5. **Independent review.** Prefer a fresh-context, read-only `intent-witness-reviewer`. The builder does not self-certify.
6. **Compare revisions.** Deltas over numeric scores.
7. **Local-first V0.** Host browser + project files. No cloud required.
8. **No SlopScore.** No `87/100` design grades.

## Layout

- `skill/intent-witness/` — portable skill (source of truth)
- `adapters/cursor/` — Cursor reviewer blueprint
- `schema/` — Zod + JSON Schema + validator
- `evals/fixtures/` — protocol fixtures, not live SlopBench
- `scripts/install-cursor.mjs` — copies skill/agent into a repo
- `examples/demo-dashboard/` — RelayOps trap demo
- `.cursor/` — installed copies; keep in sync via the installer

After review, persist YAML to `.intent-witness/reviews/`.

## Types

Keep these explicit in `schema/`: `ProductIntent`, `Evidence`, `ProblemDepth`, `ReviewFinding`, `ReviewResult`, `ComparisonResult`.

## Finding quality

Bad: “Improve visual hierarchy and spacing.”

Good: “The active run is the primary user object, but four aggregate KPI cards occupy the strongest first-viewport hierarchy. Depth: information architecture. Do not solve by removing borders; reorganize around active execution.”

## Tests to keep green

- `npm test` — schema rules + five protocol fixtures + installer check
- `node scripts/install-cursor.mjs --check`
- Demo: `npm run build` in `examples/demo-dashboard`

When reviewer behavior fails, add a fixture. Do not add a global ban on cards, Inter, or gradients.

## Out of scope until evals earn it

SaaS, hosted inference, CLI/MCP engine, Playwright evidence engine, completion hooks, other ADE adapters, public benchmark claims.
