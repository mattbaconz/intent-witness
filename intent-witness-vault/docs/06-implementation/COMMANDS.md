---
title: "Commands and User Flows"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, commands, ux]
---

# Commands and User Flows

These are product concepts, not final CLI/API commitments.

## Skill-level verbs

Keep the public vocabulary small.

### `review`
Inspect current implementation and return findings.

### `redesign`
Review current implementation; when structural issues are deep, require alternative structures and guide builder through revision.

### `compare`
Compare current UI against a prior reviewed state.

### `init`
Create product-intent/design-memory starter files.

Potential future:

### `gate`
Opt-in completion/CI enforcement.

## Example natural-language usage

```text
Use Intent Witness and review this settings page.
```

```text
Redesign this dashboard with Intent Witness. Don't just restyle it.
```

```text
Compare this revision to the last Intent Witness review.
```

## Potential CLI

```bash
intent-witness init
intent-witness review --route /dashboard
intent-witness compare --route /dashboard
intent-witness doctor
```

## UX principle

Users should not need to understand subagents, schemas, or MCP to use Intent Witness.

The simple mental model:

> **“Use Intent Witness” means: build it, have an independent reviewer look at the real UI, fix material issues, and re-check.**

## Result presentation

Human-facing summary should be concise even if internal schema is detailed:

```text
Intent Witness: REVISE
Deepest issue: Information architecture

1. Active execution is visually subordinate to aggregate metrics.
2. Activity duplicates run history.
3. Mobile order hides failures below secondary content.

Do not restyle the current grid. Explore structures organized around active execution.
```

Allow links/paths to full structured artifact for debugging/evals.
