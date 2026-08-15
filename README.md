# Deliberate

**Stop letting coding agents design on autopilot.**

Deliberate is an independent design reviewer for coding agents. After a builder implements a user-facing interface, a read-only reviewer inspects the **rendered UI**, compares it to product intent, and returns evidence-based findings with revision constraints. It does not restyle by default, and it does not impose a house aesthetic.

```text
Understand → Build → Render → Review → Revise → Compare → Stop
```

The thesis: AI slop is not one look. It is **convergence without intent**.

## Install (Cursor)

From this repository:

```bash
npm install
node scripts/install-cursor.mjs
```

Into another project:

```bash
node scripts/install-cursor.mjs path/to/your-app
```

That copies:

- `.cursor/skills/deliberate/`
- `.cursor/agents/deliberate-reviewer.md` (`readonly: true`)
- `.deliberate/intent.md` if missing

Confirm the install matches source:

```bash
node scripts/install-cursor.mjs --check
```

Fill in `.deliberate/intent.md` before a serious review. Details: [docs/install.md](docs/install.md).

## Usage

1. Run your app.
2. In Cursor:

```text
Build the dashboard. Use Deliberate.
```

or:

```text
Review the RelayOps dashboard using Deliberate.
```

The builder should implement, render, delegate to `deliberate-reviewer`, persist `.deliberate/reviews/`, revise the deepest material issue, and compare. Default budget: two reviewer-requested revision cycles.

## Demo

[`examples/demo-dashboard`](examples/demo-dashboard) is **RelayOps**, an operations UI whose primary job is watching live execution. The shipped layout is a generic KPI dashboard on purpose, so the first review should return `REVISE` at information-architecture depth.

```bash
cd examples/demo-dashboard
npm install
npm run dev
```

Then: `Review the RelayOps dashboard using Deliberate.`

## What it does not do

- Cards, gradients, rounded corners, Inter, sidebars, and dark mode are not automatically wrong.
- There is no universal beauty or slop score.
- Deliberate does not replace a designer, Figma, or a component library.
- V0 does not include SaaS, CLI/MCP, Playwright, or blocking hooks.

## Tests

```bash
npm test
```

## Spec

Product specification lives in [`deliberate-vault/`](deliberate-vault/). Agents: start at [AGENTS.md](AGENTS.md).
