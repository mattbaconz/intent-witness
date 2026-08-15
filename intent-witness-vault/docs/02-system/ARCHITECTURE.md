---
title: "Architecture"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, architecture, system]
---

# Architecture

## Architectural goal

Intent Witness must be **portable by protocol**. The core review logic should not depend on one ADE's subagent, browser, hook, or rules format.

The system is conceptually four layers:

```text
┌───────────────────────────────────────────────┐
│              INTENT WITNESS SKILL              │
│ Workflow, trigger rules, context packaging    │
└───────────────────────┬───────────────────────┘
                        ↓
┌───────────────────────────────────────────────┐
│               REVIEWER ROLE                   │
│ Independent product/design reasoning          │
└───────────────────────┬───────────────────────┘
                        ↑ evidence
┌───────────────────────────────────────────────┐
│               EVIDENCE ENGINE                 │
│ Browser • DOM • screenshots • source checks   │
└───────────────────────┬───────────────────────┘
                        ↑
┌───────────────────────────────────────────────┐
│                 ADE ADAPTER                   │
│ Cursor / Claude / Codex / Kiro / etc.         │
└───────────────────────────────────────────────┘
```

The builder agent remains outside Intent Witness's core and is treated as a client.

## Layer 1 — Skill/orchestrator

Responsibilities:

- decide when review is required;
- gather product/user/change context;
- tell builder to render affected UI;
- delegate to reviewer where supported;
- parse structured review output;
- enforce depth-aware revision behavior;
- request re-review after material changes;
- stop when pass/acceptable outcome is reached.

Should **not**:

- contain hundreds of style rules inline;
- hard-code ADE-specific commands in core logic;
- directly decide visual quality without evidence.

## Layer 2 — Reviewer

Responsibilities:

- interpret product intent;
- inspect evidence;
- identify mismatches and model-default decisions;
- separate convention from unjustified convergence;
- classify problem depth;
- provide revision constraints;
- express confidence and uncertainty;
- compare revision against previous state.

Recommended properties:

- separate/fresh context;
- read-only in native subagent mode;
- no implementation edits during review;
- structured output;
- no reward for “more unusual” designs by default.

## Layer 3 — Evidence engine

V0 may rely on host browser and code-reading tools. Later local engine can standardize:

- route discovery;
- browser startup/navigation;
- viewport capture;
- screenshot capture;
- DOM tree and accessibility tree extraction;
- computed-style summaries;
- container/surface heuristics;
- route/navigation inventory;
- duplicate-label detection;
- responsive overflow checks;
- interaction-state capture;
- deterministic accessibility checks;
- optional source-level pattern detectors.

Important: deterministic evidence **supports** review. It does not replace contextual judgment.

## Layer 4 — ADE adapter

Each adapter maps host primitives into the protocol:

| Capability | Preferred | Fallback |
|---|---|---|
| Skill | native Agent Skill | project rule/prompt file |
| Reviewer | native subagent | same agent with fresh task / MCP reviewer |
| Browser | native browser | Playwright helper |
| Gate | hook/lifecycle control | advisory only |
| Design memory | project files | prompt context |
| Tools | MCP/native tools | CLI process |

See [[ADE-ADAPTERS]].

## Data flow

```text
User request
  ↓
Builder creates/changes UI
  ↓
Orchestrator forms ReviewRequest
  ├─ product intent
  ├─ changed routes/files
  ├─ explicit user constraints
  ├─ existing design language
  ├─ screenshots/DOM evidence
  └─ previous review (if revision)
  ↓
Reviewer returns ReviewResult
  ├─ verdict
  ├─ findings[]
  ├─ deepest_problem
  ├─ revision_constraints[]
  ├─ alternatives_required?
  └─ confidence
  ↓
Builder revises
  ↓
Comparison review
```

## Portability boundary

The canonical API is **semantic**, not vendor-specific:

- `prepare_review`
- `capture_evidence`
- `review`
- `compare`
- `record_decision`

An adapter may implement these with subagents, MCP calls, CLI commands, or direct tool invocations.

## Failure isolation

The reviewer must never be able to silently corrupt the implementation in review-only mode. If it needs to propose code, that proposal is advisory and the builder applies it.

Future autonomous mode may permit reviewer-authored changes, but that is explicitly outside V0.

## Versioning

Version independently:

- review protocol version;
- structured schema version;
- skill package version;
- engine version;
- adapter version.

A review result should carry protocol/schema versions so benchmark results remain reproducible.
