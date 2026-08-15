---
name: intent-witness
description: Independent design-review workflow for frontend work. Use when creating, redesigning, reviewing, or materially changing a user-facing interface and the user wants intentional, product-specific UI/UX rather than model-default/generic output. Intent Witness separates implementation from review: understand product intent, build and render the UI, delegate an independent evidence-based review, revise the deepest material problems, and compare before shipping. Do not use for invisible backend-only changes or trivial copy edits unless explicitly requested.
---

# Intent Witness

> Stop letting coding agents design on autopilot.

Intent Witness is a **review workflow**, not a house style. Your job as the builder is to implement the user's request, then obtain an independent design review of the actual rendered interface before declaring meaningful frontend work complete.

Protocol version: `0.1`. Schema version: `0.1`. Default revision budget: **2** reviewer-requested cycles.

## Core thesis

AI slop is not one aesthetic. It is **convergence without intent**.

A card, sidebar, gradient, hero, table, modal, pill, or dashboard grid is not inherently bad. It becomes suspicious when it appears because it is a familiar generation prior rather than because it helps this product's users.

## Required workflow

### 1. Establish product intent

Before reviewing, identify:

- product/domain;
- target user;
- primary job of the changed screen/flow;
- primary domain objects;
- critical states/urgency;
- explicit user constraints;
- existing design language and decisions if available;
- references/anti-references if supplied.

Prefer project `.intent-witness/intent.md` and design-memory files when present. Current explicit user instructions override memory.

Do not invent detailed business requirements merely to justify a critique.

### 2. Implement the requested change

Build the frontend normally. Use the project's existing framework/design system unless the request requires changing it.

Do not pre-emptively force a “Intent Witness aesthetic.”

### 3. Render the actual UI

Review must be grounded in the implementation, not only source code.

For a material screen change, inspect when available:

- desktop/primary viewport;
- full page if scroll structure matters;
- narrow/mobile viewport;
- important interactive state(s);
- error/loading/empty state when relevant to the task.

Use host browser capabilities or the configured evidence tool. If no rendered evidence can be obtained, say so and reduce confidence rather than pretending.

### 4. Delegate independent review

If the host supports a dedicated subagent/custom agent, invoke the **fresh-context, read-only** `intent-witness-reviewer` agent. Pass only the context needed to judge the screen:

- product intent (from `.intent-witness/intent.md` when present);
- user request;
- changed routes/files;
- relevant design memory;
- route/base URL for the running app;
- previous review from `.intent-witness/reviews/` if this is a revision.

Do not ask the reviewer to implement. Independence is part of the product hypothesis.

If native subagents are unavailable, perform the review as a clearly separated second phase with the strongest available context isolation.

### 5. Require evidence-based output

A material review finding must contain:

1. observation;
2. product mismatch/impact;
3. evidence;
4. problem depth;
5. confidence;
6. revision constraint where a shallow fix is likely.

Use the schema in `references/schema.md`.

Invalid finding:

> Improve the visual hierarchy and add more breathing room.

Valid finding:

> Four aggregate KPI cards occupy the strongest first-viewport hierarchy, while the user's primary job is monitoring active execution. This makes live run state visually subordinate to secondary summary data. Depth: information architecture. Do not solve by only shrinking or restyling the KPI cards; reorganize the page around the active workflow.

### 6. Persist the review artifact

After the reviewer returns, write the human summary plus structured YAML to:

```text
.intent-witness/reviews/<review-id>.yaml
```

Use a stable id such as `2026-08-15-dashboard` or increment `review-1`, `review-2`. Also copy or point `latest.yaml` at the current review so comparison can find it.

Do not declare the UI done until this file exists for the current change.

### 7. Classify deepest problem

Use exactly these conceptual depths:

1. **polish** — spacing, type, color, contrast, borders, minor visual craft;
2. **composition** — grouping, proportions, hierarchy, spatial organization;
3. **information_architecture** — what belongs on the screen, naming/grouping/priority of concepts;
4. **interaction** — how the user completes the task, state transitions, action model.

Address the deepest material issue first.

**Do not “fix” a Level 3/4 issue with only Level 1 changes.**

### 8. Distinguish convention from unjustified convergence

Before criticizing a familiar pattern, ask:

- Does it reduce cognitive load?
- Does it match user mental models?
- Does it clarify priority or state?
- Is it consistent with this product's language?
- Would changing it improve the primary job or merely make it less common?

If a common convention is justified, leave it alone.

### 9. Force structural alternatives when needed

If the deepest problem is information architecture or interaction, or the builder has already cosmetically revised the same weak structure, require 2–3 **structurally distinct** directions before implementation.

Do not accept three themes/colorways of the same macrostructure.

Use constraints such as:

- one direction cannot use KPI cards as primary structure;
- one must organize around the user's primary domain object;
- one must use a temporal/workflow model rather than a grid.

Choose based on product fit, not novelty.

### 10. Revise

The builder implements the revision. Do not defend the original implementation merely because you authored it.

Resolve findings in this order:

1. correctness/accessibility;
2. primary user job;
3. IA/interaction;
4. composition/hierarchy;
5. polish.

### 11. Compare, don't restart

After revision, re-render, then ask `intent-witness-reviewer` to compare before/after. Pass:

- previous `.intent-witness/reviews/*.yaml`;
- what changed;
- current route/base URL.

The reviewer should answer:

- what improved materially;
- which finding IDs are resolved;
- what regressed;
- whether the same underlying issue remains;
- whether another iteration is worth the cost.

Persist the comparison as a new review file (or a `comparison` block on the new review). Do not re-litigate resolved decisions without new evidence.

### 12. Stop

Default maximum: **two** reviewer-requested revision cycles for ordinary work.

Stop on:

- PASS;
- PASS_WITH_NOTES;
- low-confidence non-material disagreement;
- iteration limit where human judgment is preferable.

Do not create endless “art critic” loops.

## Review axes

Load `references/review-protocol.md` and `references/design-reasoning.md` as needed. At minimum inspect:

- intent alignment;
- information architecture;
- hierarchy/composition;
- interaction clarity;
- product specificity / convergence;
- responsive priority;
- design-language consistency.

## Global anti-rules

Never treat these as universally bad:

- cards;
- gradients;
- rounded corners;
- Inter/Geist/any specific font;
- centered heroes;
- sidebars;
- modals;
- pills/badges;
- dark mode;
- minimalism;
- maximalism;
- asymmetry;
- dense UI.

Any one can be appropriate.

## Reviewer uncertainty

If context or evidence is insufficient, use `INSUFFICIENT_EVIDENCE` or low confidence. Do not fabricate certainty or fake numeric scores.

## No universal quality score

Do not output `Design Score 87/100`, `Slop Score 71`, or similar. V0 uses findings and comparison deltas.

## References

Load only as needed:

- `references/review-protocol.md` — detailed axes and failure patterns.
- `references/design-reasoning.md` — intent inference, depth-aware revision, alternatives, stop rule.
- `references/convergence.md` — distinguishing convention from model-default behavior.
- `references/schema.md` — structured review output.
