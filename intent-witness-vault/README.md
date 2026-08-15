---
title: "Intent Witness"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, index, oss]
---

# Intent Witness

> **Stop letting coding agents design on autopilot.**

Intent Witness is an open-source design-judgment layer for coding agents. It does not try to replace Cursor, Claude Code, Codex, Kiro, Antigravity, OpenCode, Windsurf, v0, or future UI generators. It gives those builders an independent review loop that asks whether the interface decisions actually follow from the product, user job, design language, and interaction model.

The core loop is:

```text
Understand → Build → Render → Review → Revise → Compare → Ship
```

The thesis is deliberately narrower than “AI can’t design” and more durable than “ban purple gradients”:

> **AI slop is not one aesthetic. It is convergence without intent.**

Intent Witness therefore focuses on **unjustified convergence**: design choices that appear to come from generic model priors or implementation convenience rather than the needs of the specific product.

## What Intent Witness is

- A portable [[SKILL|agent skill]] that teaches builders when and how to invoke design review.
- An independent [[REVIEW-PROTOCOL|review protocol]] that returns evidence and revision constraints, not generic “make it prettier” advice.
- A future local [[MCP-CLI|CLI/MCP engine]] that can render apps, inspect DOM/structure, capture screenshots, run deterministic checks, and provide evidence to a reviewer.
- A project-specific [[DESIGN-MEMORY|design memory]] so review is measured against *this product*, not a universal house aesthetic.
- A benchmarkable system with explicit [[KILL-CRITERIA|kill criteria]].

## What Intent Witness is not

- A theme pack.
- A component library.
- A universal “beauty score.”
- A ban list for cards, gradients, pills, shadows, or rounded corners.
- A design generator that replaces the primary coding agent.
- A SaaS-first product.

## Start here

1. Human/product owner: [[00-START-HERE]]
2. Coding agent: [[AGENTS]]
3. Product thesis: [[VISION]] → [[PROBLEM-THESIS]] → [[PRINCIPLES]]
4. Technical system: [[ARCHITECTURE]] → [[REVIEW-PROTOCOL]] → [[DETECTION-MODEL]]
5. V0 implementation: [[V0-SPEC]] → [[REPO-STRUCTURE]] → [[TEST-PLAN]]
6. Validation: [[EVAL-STRATEGY]] → [[BASELINES]] → [[KILL-CRITERIA]]
7. Competitive threats: [[COMPETITIVE-LANDSCAPE]] → [[THREAT-MODEL]] → [[MOAT-STRATEGY]]
8. FOSS launch: [[FOSS-STRATEGY]] → [[DEMO-STRATEGY]] → [[DISCORD-PLAYBOOK]]

## Canonical promise

Intent Witness should be able to say, with evidence:

> “This implementation is polished, but the information architecture appears model-default rather than product-specific. The user’s primary job is visually subordinate to generic metrics. Do not restyle the current grid. Produce structurally distinct alternatives organized around the primary workflow.”

If Intent Witness instead says things like “improve hierarchy,” “add breathing room,” or “use tasteful typography” without evidence, it has failed.

## Current phase

**Phase: hypothesis / V0 specification.**

The immediate goal is not to build a cloud platform. The immediate goal is to determine whether an independent review loop can **consistently beat**:

1. a frontier model with a normal prompt;
2. the same model with an excellent handcrafted frontend prompt; and
3. strong existing design skills such as Hallmark and Impeccable.

See [[KILL-CRITERIA]].
