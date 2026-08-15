---
title: "CLI and MCP Engine"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, mcp, cli, architecture]
---

# CLI and MCP Engine

## Why an engine exists

Native ADE capabilities are ideal for V0, but they vary. A local CLI/MCP engine can later standardize evidence collection and make Deliberate portable.

The engine should **not** become a second IDE or a giant browser automation framework.

## Proposed CLI

Illustrative only:

```bash
deliberate init
deliberate review --route /dashboard
deliberate compare --before <id> --after current
deliberate capture --route /settings --viewport desktop
deliberate doctor
```

## Proposed MCP tools

Keep the public surface small:

```text
deliberate.get_project_context
deliberate.capture_evidence
deliberate.review
deliberate.compare
deliberate.record_decision
```

### `capture_evidence`

Input:

```json
{
  "baseUrl": "http://localhost:3000",
  "routes": ["/dashboard"],
  "viewports": ["desktop", "mobile"],
  "states": []
}
```

Output references local artifacts rather than embedding huge images in text.

### `review`

Inputs product intent, evidence references, design memory, and changed scope. Returns [[STRUCTURED-OUTPUT-SCHEMAS]].

## Engine modules (future)

```text
engine/
  browser/
  capture/
  dom/
  source/
  metrics/
  schemas/
  cache/
```

## Deterministic measurements

Candidates:

- viewport overflow;
- interactive element count;
- heading hierarchy;
- repeated component/surface count;
- duplicate labels/routes;
- number of nested container boundaries;
- accessible name coverage;
- contrast/accessibility via established tooling;
- source-order vs visual/mobile priority hints.

Do not claim these are direct “slop measurements.” They are evidence features.

## Renderer choice

Playwright is a likely candidate because it is mature and cross-browser, but V0 should avoid committing until native host browser experiments establish what is missing.

## Model boundary

The engine can be model-free for capture/metrics. Contextual judgment may occur:

- in the host reviewer model; or
- in an optional Deliberate-managed reviewer later.

Prefer host reviewer for open-source/local-first adoption initially.

## Caching

Cache evidence keyed by:

- route;
- viewport;
- relevant file/content hash;
- state fixture;
- browser/engine version.

Invalidate conservatively after frontend changes.

## Exit condition for building engine

Do not build the engine because it sounds impressive. Build it when V0 shows that native-host evidence is insufficient or inconsistent and standardized evidence materially improves review quality/reproducibility.
