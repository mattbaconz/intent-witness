---
title: "Performance and Cost"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, performance, cost]
---

# Performance and Cost

## Why cost matters

A naive closed loop can explode into:

- many screenshots per route;
- multiple viewports/states;
- expensive multimodal calls;
- repeated builder revisions;
- browser startup overhead;
- token-heavy code/context packages.

Intent Witness must make review feel proportionate to the change.

## Review tiers

### Quick review
Use for one component/small surface.

- one viewport;
- current design memory;
- no full route crawl;
- 1 iteration unless material issue found.

### Standard review (default)

- desktop + narrow viewport;
- primary route/state;
- code/DOM evidence as needed;
- max 2 meaningful revision cycles by default.

### Deep review
Explicit user/CI use:

- multiple routes/states;
- interaction flows;
- accessibility checks;
- broader consistency analysis.

## Budgeting principles

- Capture only affected routes when possible.
- Summarize design memory before reviewer invocation.
- Prefer deterministic measurements for simple facts.
- Send screenshot crops/representative states rather than unnecessary full history.
- Do not ask 3 agents to independently review every change by default.
- Bound revision loops.

## Convergence guard

Default V0 maximum: 2 reviewer-requested revision cycles before requiring user judgment or passing with unresolved notes, unless an explicit severe correctness/accessibility issue remains.

This avoids “robot art critic thrashing.”

## Benchmark cost

Eval reports should record:

- model(s);
- tokens if available;
- wall-clock time;
- number of tool/browser calls;
- number of revision cycles;
- approximate API/credit cost if known.

A small quality gain that costs 10× time/credits may not be viable.
