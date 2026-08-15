---
title: "Detection Model"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, detection, system]
---

# Detection Model

## Overview

Deliberate should combine multiple evidence classes rather than attempt a single “AI slop detector.”

```text
Intent context
   +
Source/DOM structure
   +
Rendered visual evidence
   +
Interaction/route evidence
   +
Project design language
   ↓
Contextual reviewer
   ↓
Findings about unjustified decisions
```

## Detector class 1 — Structural regularity

Potential signals:

- repeated identical containers for semantically different objects;
- excessive nested surfaces;
- repeated section formula (`heading → paragraph → 3 cards`);
- equal-size/equal-weight modules despite different priority;
- dominant dashboard grid despite a workflow-oriented product;
- route proliferation with overlapping jobs;
- table/card duplication of the same information.

These are **signals**, not failures.

## Detector class 2 — Visual hierarchy

Potential signals:

- primary object below secondary summary content;
- high-salience decoration outranking actionable state;
- too many elements with similar size/contrast/weight;
- typography not reflecting semantic hierarchy;
- critical failures/status requiring text reading because visual states are indistinct;
- large dead space that hides important operational content;
- over-compartmentalization causing visual noise.

## Detector class 3 — Performative patterns

Inspired by the broader “performative UI” phenomenon. Examples:

- category-signaling animated gradients;
- glowing CTA/orb disconnected from function;
- logo marquee/social proof with weak relevance;
- generic AI prompt box used as a hero even when product is not prompt-centric;
- token-stream theater;
- decorative graph/node backgrounds;
- repetitive badges/pills signaling sophistication.

Deliberate should not ban these. It asks whether high-salience elements communicate product capability or merely perform category membership.

## Detector class 4 — UX/IA slop

Potential signals:

- routes named Overview/Dashboard/Insights/Analytics/Activity with overlapping content;
- configuration surface mirrors backend parameters rather than user decisions;
- every action uses a modal;
- confirmations on low-risk actions;
- destructive actions poorly differentiated;
- duplicated information across screens;
- important action several layers deep while secondary stats are prominent;
- empty states dominated by decoration instead of next action;
- one generic component used for every domain object.

## Detector class 5 — Responsive priority

Potential signals:

- desktop grid simply stacks in source order;
- primary action/state moves below secondary content;
- touch targets or interaction models remain desktop-oriented;
- dense comparison content becomes unreadable instead of changing representation;
- navigation collapses mechanically without preserving primary paths.

## Detector class 6 — Copy/semantic genericity

Potential signals:

- “Welcome back 👋 Here's what's happening today” regardless of product;
- generic section labels that do not map to domain jobs;
- repeated “Powerful / Intelligent / Seamless” claims;
- action labels like “Manage” or “View details” when more specific verbs exist;
- generated explanatory copy where direct UI would suffice.

## Detector class 7 — Design-language regression

Once design memory exists:

- new screen uses different hierarchy carrier;
- arbitrary new radii/shadows/tokens;
- primary interactions use inconsistent patterns;
- density changes without contextual reason;
- semantic color meanings drift;
- navigation behavior diverges.

Consistency should not block justified evolution; record intentional changes in decisions.

## Product-specificity heuristic

A useful reviewer thought experiment:

> If branding and noun labels were removed, how much of the composition and interaction would still reveal what kind of product this is?

Low specificity is not automatically wrong—for commodity workflows, generic conventions can be ideal—but it should trigger a search for whether the product's unique primary objects/actions are being suppressed.

## No universal scalar score in V0

Do not collapse these signals into `SlopScore: 78/100`.

Reasons:

- dimensions are context-dependent;
- weights are not calibrated;
- precise numbers suggest validity we do not have;
- teams may want different tradeoffs;
- a single score encourages gaming and monoculture.

Future research may create calibrated diagnostic scores, but only after human-label validation.
