---
title: "Enterprise and CI Concept"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, business, enterprise, ci]
---

# Enterprise and CI Concept

> **V0 status:** Future/out of scope. No enterprise, CI gate, or hosted workflow is part of the verified alpha.

## Future workflow

```text
Frontend PR opened
  ↓
Changed routes inferred
  ↓
Preview deployment/local build captured
  ↓
Intent Witness compares against base branch
  ↓
PR comment:
  PASS / NOTES / REVISE
  evidence + screenshots + findings
  ↓
Designer/engineer acknowledges or revises
```

## What CI must do differently from local review

CI review must be:

- conservative;
- reproducible;
- bounded in cost/time;
- transparent about uncertainty;
- resistant to flaky screenshot/render differences;
- easy to override with accountability.

## Possible PR artifact

```text
Intent Witness — Design Review

Verdict: REVISE
Scope: /runs, /agents/[id]

Material finding
Active failure state moved below aggregate usage on mobile.
Evidence: before/after 390px captures.
Depth: composition

Non-blocking
New inspector spacing diverges from project density guidance.

[View comparison] [Acknowledge] [Re-run]
```

## Gate policies

Potential modes:

- `advisory` — always comment, never block;
- `material-only` — block only high-confidence material findings;
- `policy-only` — block deterministic design-system/accessibility rules, leave subjective findings advisory;
- `protected-flows` — stronger review for checkout/onboarding/admin critical flows.

Recommended default for teams: advisory or policy-only until trust is earned.

## Enterprise controls

- route/screenshot exclusions;
- retention periods;
- model provider choices;
- no-training/privacy settings;
- audit logs;
- per-team design memory;
- reviewer override permissions;
- private network/self-hosted capture where required.

## Risk

A manager-facing score dashboard can weaponize subjective review. Avoid league tables like “Team A design quality 71.” Focus on actionable findings and acknowledged decisions.
