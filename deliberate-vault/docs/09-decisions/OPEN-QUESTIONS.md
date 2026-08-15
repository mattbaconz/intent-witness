---
title: "Open Questions"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, questions, decisions]
---

# Open Questions

These are intentionally unresolved. Agents should not silently choose an answer and treat it as canonical.

## Product/review

- How much product intent is the minimum needed for useful review?
- Should Deliberate auto-infer `intent.md`, ask the user, or both?
- How should confidence be calibrated?
- When exactly should structural alternatives be mandatory?
- Should reviewer output include positive observations to reduce overcorrection?
- How should the reviewer handle deliberately generic/commodity products?
- How do we detect a “Deliberate aesthetic” emerging in outputs?

## Reviewer implementation

- Same model vs different model family for reviewer?
- Should V0 use host subagent only, or optionally an external model reviewer?
- Can structured output be reliably enforced across all ADEs?
- How much source code should reviewer see vs only rendered evidence?
- Does giving reviewer implementation rationale bias it toward accepting weak choices?

## Evidence engine

- When does native browser evidence become too inconsistent?
- Is Playwright necessary for V0.5?
- Which deterministic metrics actually predict useful findings?
- Can route/state discovery be automated without dangerous side effects?
- How should screenshots with private data be handled locally?

## Evaluation

- What blind preference margin counts as meaningful?
- How many raters/cases are enough for V0 go/no-go?
- Which competitor configuration is fairest?
- How do we measure product specificity without rewarding novelty?
- How do we include accessibility/correctness without mixing them into subjective design judgment?

## OSS

- Apache-2.0 vs MIT?
- Repo name/domain availability?
- Should SlopBench live in same repo or separate project?
- How much competitor research belongs in public docs?
- Contribution governance if aesthetic debates become contentious?

## SaaS

- Is individual Pro viable at all, or should paid value start at team/CI?
- Who owns budget?
- Is hosted reviewer compute sufficiently valuable?
- What should remain local for privacy?

## Naming

- Final trademark/domain clearance for “Deliberate.”
- CLI/npm package name availability.
