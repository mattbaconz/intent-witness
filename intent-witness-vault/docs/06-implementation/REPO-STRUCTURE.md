---
title: "Proposed Repository Structure"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, implementation, repo]
---

# Proposed Repository Structure

## V0 minimal repository

```text
intent-witness/
├── README.md
├── LICENSE
├── AGENTS.md
├── docs/
│   ├── architecture.md
│   ├── review-protocol.md
│   └── evals.md
├── skill/
│   └── intent-witness/
│       ├── SKILL.md
│       └── references/
│           ├── review-protocol.md
│           ├── design-reasoning.md
│           ├── convergence.md
│           └── schema.md
├── adapters/
│   └── cursor/
│       ├── skill-link-or-copy/
│       └── intent-witness-reviewer.md
├── templates/
│   └── intent.md
├── evals/
│   ├── cases/
│   ├── fixtures/
│   ├── runs/
│   └── scripts/
└── examples/
    └── demo-dashboard/
```

## V1 evolution

```text
packages/
├── core/
├── schemas/
├── engine/
├── cli/
└── mcp/

adapters/
├── cursor/
├── claude-code/
├── codex/
├── kiro/
├── antigravity/
├── opencode/
└── windsurf/
```

## Separation rules

### `skill/`
Natural-language workflow, progressively loaded references. No vendor-specific config.

### `adapters/`
Thin host integration only. No duplicated review philosophy.

### `packages/core/`
Protocol state machine and host-neutral operations if code becomes necessary.

### `packages/schemas/`
Stable data contracts.

### `evals/`
First-class project area, not an afterthought. Every reviewer behavior regression should add a fixture.

### `.intent-witness/` in user repos
Project-owned memory/state, not package internals.

## Naming conventions

Prefer clear semantic names over branding-heavy abstractions:

- `review-request.json`
- `review-result.json`
- `product-intent.md`
- `design-language.md`
- `decision-log.md`

Avoid “tastebrain,” “slop neural core,” or similarly clever internals that make agent navigation worse.

## Agent navigation

Root `AGENTS.md` should point agents to canonical source-of-truth docs and warn against scope expansion. Keep architecture decisions in a dedicated log.
