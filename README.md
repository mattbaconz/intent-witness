# Intent Witness

Intent Witness is a local-first, Cursor-only design-review workflow. A parent captures rendered evidence; a fresh hard-read-only reviewer judges it against product intent. It returns evidence-backed constraints, never numeric scores or a house style.

## Five-minute alpha path

Requires Node 20+ and Cursor.

```bash
npx @mattbaconz/intent-witness install cursor path/to/your-app
npx @mattbaconz/intent-witness check cursor path/to/your-app
```

Edit `.intent-witness/intent.md`, start the app, capture desktop/narrow/state evidence with Cursor Browser under `.intent-witness/evidence/<review-id>/`, and ask Cursor to use Intent Witness. The parent supplies those paths and facts to `intent-witness-reviewer`; the reviewer cannot browse, implement, or write. Persist its result under `.intent-witness/reviews/`. Missing evidence produces specific requests, not invented findings.

The installer adds managed Cursor skill/agent files plus user-owned intent, evidence, reviews, and an install manifest. Details: [install](docs/install.md) and [support](docs/support.md).

## Boundaries

Cards, gradients, sidebars, density, and familiar typefaces are not automatic failures. V0 has no universal aesthetic, SlopScore, hosted service, Playwright capture, hooks, or extra ADE adapters. RelayOps is a deliberate metric-first demo, not an indictment of dashboards.

## Development

```bash
npm ci
npm test
npm run typecheck
npm run schema:check
npm run evals:validate
npm run docs:check
npm run package:check
```

Build the demo with `npm run build` in `examples/demo-dashboard`. See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).
