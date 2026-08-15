---
title: "Implementation Plan"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, implementation, plan]
---

# Implementation Plan

## Milestone 1 — Freeze V0 protocol

Deliverables:

- final V0 `SKILL.md` draft;
- reviewer blueprint;
- JSON/YAML schema;
- 5 synthetic fixtures;
- decision on review iteration budget.

Acceptance:

- agents can read docs and explain Deliberate consistently;
- reviewer output is specific in manual dry runs.

## Milestone 2 — Cursor native loop

Deliverables:

- installer/manual setup for `.cursor/skills/deliberate`;
- `.cursor/agents/deliberate-reviewer.md`;
- sample `.deliberate/intent.md`;
- end-to-end demo repo.

Acceptance:

- builder delegates review without manual prompt copying;
- reviewer uses browser and returns structured result;
- read-only behavior respected;
- revision + rereview completes.

## Milestone 3 — Eval harness

Deliverables:

- case format;
- run metadata format;
- artifact directories;
- 10 cases;
- strong manual-prompt baseline;
- competitor baseline procedure.

Acceptance:

- same starting commit can be re-run per condition;
- outputs can be blinded for raters.

## Milestone 4 — First kill test

Run at least:

- 10 cases × 4 conditions;
- multiple UI categories;
- one or more model families if budget permits.

Decision:

- continue;
- revise protocol;
- narrow positioning;
- kill project.

## Milestone 5 — Public OSS alpha

Only on positive evidence.

Deliverables:

- polished README;
- install path;
- demo video/GIF;
- limitations;
- public benchmark subset;
- issue templates;
- contribution guide.

## Milestone 6 — Evidence engine experiment

Only if native browser/review evidence is a real bottleneck.

Prototype Playwright capture + deterministic facts. Compare review quality with and without it.

## Milestone 7 — Cross-ADE

Add Claude Code/Codex first, then secondary hosts based on demand.

## Rule

Do not execute a later milestone merely because earlier code is complete. The **evaluation acceptance criterion** must be met.
