---
title: "Review Protocol"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, review, protocol]
---

# Review Protocol

## Purpose

The review protocol is Intent Witness's most important intellectual asset. It defines how an independent reviewer turns product context + rendered evidence into a useful revision brief.

## Review stages

### Stage 0 — Eligibility

Review is warranted when a meaningful user-facing frontend change occurred, such as:

- new screen/route;
- major component or page redesign;
- navigation/IA change;
- responsive layout change;
- new onboarding/settings/workflow;
- material design-system change.

Do not invoke full review for tiny copy edits or invisible refactors unless explicitly requested.

### Stage 1 — Establish intent

The reviewer must know, or infer with explicit uncertainty:

- product/domain;
- target user;
- primary job on this screen;
- primary objects;
- critical states/urgency;
- desired product traits;
- explicit constraints;
- existing design language;
- references/anti-references if present.

If this context is absent, the reviewer may derive it from the repo/request but must not invent detailed business requirements.

### Stage 2 — Observe before judging

Inspect:

- rendered first viewport;
- whole page/scroll structure;
- at least one narrow/mobile viewport when relevant;
- important interaction state(s) when available;
- source/DOM only to support visual/structural claims.

Record observations before recommendation.

### Stage 3 — Evaluate five axes

#### A. Intent alignment
Does the screen visibly prioritize the user's primary job?

#### B. Information architecture
Are concepts grouped/named/ordered around user mental models rather than implementation convenience?

#### C. Visual hierarchy/composition
Do weight, placement, density, grouping, and contrast communicate priority correctly?

#### D. Interaction quality
Are important actions/states discoverable, efficient, and appropriately differentiated?

#### E. Product specificity / convergence
Would the structure plausibly belong to many unrelated products? If yes, is that because a useful convention applies or because product-specific structure is missing?

### Stage 4 — Identify findings

Each blocking finding must contain:

1. **Observation** — what is visibly/structurally true.
2. **Product mismatch** — why it conflicts with user/product intent.
3. **Evidence** — screenshot region, route, DOM/source fact, duplication, interaction path, etc.
4. **Depth** — polish / composition / IA / interaction.
5. **Confidence** — low / medium / high.
6. **Revision constraint** — what shallow response must be avoided.

### Stage 5 — Determine verdict

Recommended V0 verdicts:

- `PASS` — no material design issue found; minor notes optional.
- `PASS_WITH_NOTES` — shippable, non-blocking issues remain.
- `REVISE` — material issue needs revision.
- `INSUFFICIENT_EVIDENCE` — reviewer cannot confidently judge due to missing render/state/context.

Avoid `FAIL` in V0; it encourages performative gatekeeping.

### Stage 6 — Decide whether alternatives are required

Require 2–3 structurally distinct alternatives when:

- deepest issue is IA or interaction;
- current macrostructure appears generic and weakly justified;
- builder has already attempted cosmetic fixes without resolving core issue;
- user explicitly asks for exploration.

Alternative constraints should force structural distance. Example:

```text
A: cannot use KPI cards as the primary organizing structure.
B: must organize around the active run as the dominant object.
C: must use a temporal/event model rather than a dashboard grid.
```

Do not ask for “three variations” without constraints; models often return colorways.

### Stage 7 — Revision

The builder, not reviewer, implements. Builder must address findings by deepest problem first.

If multiple findings conflict, prioritize:

1. correctness/accessibility;
2. primary user job;
3. IA/interaction;
4. hierarchy/composition;
5. polish.

### Stage 8 — Comparison review

The reviewer receives previous + current state and answers:

- What materially improved?
- What regressed?
- Which original findings are resolved/unresolved?
- Did the revision merely move the same problem?
- Is another iteration justified?

Do not restart critique from scratch unless the UI changed fundamentally.

## Reviewer anti-patterns

Invalid reviewer behavior:

- “Make it more modern/premium.”
- “Use more whitespace.”
- “Reduce cards” without explaining why.
- punishing a standard convention solely because it is common;
- forcing asymmetry/novelty;
- recommending a redesign when the issue is small;
- inventing user needs;
- making aesthetic claims with fake numeric precision;
- returning ten equal-severity findings;
- treating every difference from references as a problem.

## Stopping rule

Stop when:

- all material findings are resolved or consciously accepted;
- remaining issues are non-blocking;
- another iteration has lower expected value than the churn/cost;
- reviewer confidence is low and no concrete evidence remains.

Intent Witness must optimize for **convergence**, not endless critique.
