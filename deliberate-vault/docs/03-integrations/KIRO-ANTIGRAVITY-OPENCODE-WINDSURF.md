---
title: "Secondary ADE Integrations"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, integrations, ade]
---

# Secondary ADE Integrations

This file defines strategy, not frozen implementation details. Host products change quickly; verify official docs before shipping adapters.

## Kiro

### Expected fit
Kiro exposes skills/custom-agent/subagent-style concepts, hooks, and MCP-oriented extensibility. Deliberate should map:

- skill → portable SKILL.md;
- reviewer → custom read-only agent/subagent;
- design memory → project `.deliberate/` files;
- gate → host hook if reliable;
- evidence → host/browser or Deliberate engine.

### Risk
Do not let Kiro-specific steering become the canonical Deliberate memory format.

## Google Antigravity

### Expected fit
Antigravity has agent skills and strong browser automation workflows, making it attractive for visual evidence capture.

### Strategy
Use the same review protocol; prefer native browser evidence before introducing custom Playwright duplication.

### Risk
Browser success may tempt the adapter to become Antigravity-specific. Keep evidence schema host-neutral.

## OpenCode

### Expected fit
OpenCode's primary/subagent model and flexible tools can map directly to builder/reviewer roles.

### Strategy
Allow explicit `@deliberate`-style reviewer invocation if native UX supports it, while preserving automatic skill orchestration.

### Risk
Different model/tool configurations can make benchmark results incomparable; record environment metadata.

## Windsurf / Devin Local

### Expected fit
Skills/custom agents/hooks can support Deliberate's protocol.

### Strategy
Ship only after the V0 protocol is stable. Adapter should be thin and reuse fixtures.

## General secondary-host rule

Do not promise “supports every ADE” because the skill file can be copied there. Support means:

1. install path is documented/tested;
2. review loop executes end-to-end;
3. structured result returns reliably;
4. browser/evidence story is known;
5. limitations are explicit;
6. conformance fixtures pass.

See [[ADE-ADAPTERS]].
