---
title: "Roadmap"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, implementation, roadmap]
---

# Roadmap

## Phase 0 — Research/specification

**Status:** Current.

- establish product thesis;
- map competitors;
- define review protocol;
- define schemas;
- design benchmark and kill criteria;
- build this vault.

## Phase 1 — V0: review loop

Goal: prove independent review creates value.

Deliver:

- portable skill;
- Cursor adapter;
- reviewer subagent;
- product-intent template;
- structured review results;
- 10+ eval cases;
- baseline comparison.

No SaaS.

## Phase 2 — V0.5: evidence helpers

Only if Phase 1 reveals evidence inconsistency.

Candidates:

- Playwright capture helper;
- screenshot/viewport standardization;
- route/state fixture format;
- deterministic DOM/source facts;
- review artifact cache;
- `deliberate doctor`.

## Phase 3 — V1: portable OSS product

Goal: Deliberate is useful outside one ADE.

Deliver:

- CLI installer;
- Claude Code/Codex adapters;
- MCP interface if justified;
- richer design memory;
- reference/anti-reference extraction;
- public benchmark corpus;
- stable schema/protocol versions;
- contributor fixture workflow.

## Phase 4 — Review gate / CI experiment

Goal: determine whether teams want automated design review on PRs.

- changed-route inference;
- CI evidence capture;
- PR comment artifact;
- baseline/current comparison;
- conservative gate policy;
- override/acknowledgment flow.

Remain OSS-capable where possible.

## Phase 5 — Optional SaaS

Only if repeated team demand exists.

Potential hosted value:

- team design memory;
- review history/artifacts;
- organization policies;
- expensive multimodal reviewer routing;
- design regression dashboard;
- Figma/design-system sync;
- reviewer analytics;
- private benchmark/eval sets.

See [[SAAS-LATER]].

## Roadmap anti-rule

Do not pull Phase 5 features forward because they make the README look like a startup. Every phase must earn the next.
