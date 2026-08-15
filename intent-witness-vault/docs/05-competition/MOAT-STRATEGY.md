---
title: "Moat Strategy"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, moat, competition]
---

# Moat Strategy

## Premise

A `SKILL.md` is copyable. A list of anti-patterns is copyable. Browser screenshots are copyable. Therefore Intent Witness must not confuse implementation ingredients with moat.

## Potential defensibility layers

### 1. Review protocol quality

A rigorously tested protocol that consistently produces evidence-based, depth-correct critiques is harder to reproduce than a slogan, especially if backed by fixtures and benchmark history.

Still copyable—but execution and iteration matter.

### 2. Open eval corpus

SlopBench-style paired cases, human ratings, counterexamples, and regression fixtures can become shared infrastructure and a source of credibility.

The moat is not secrecy; it is being the project where design-review quality is actually measured.

### 3. Cross-model / cross-ADE portability

A protocol that works across builders means users can retain design memory and review behavior while switching models/tools.

### 4. Project-specific design memory

Durable decisions and principles create switching friction and practical value. This should remain exportable/open to avoid lock-in resentment.

### 5. Evidence engine

Reliable capture of routes/states/DOM/responsive behavior can become non-trivial infrastructure if it measurably improves review.

Do not build it before justified.

### 6. Community taxonomy + fixtures

Contributors can submit:

- reviewer failure cases;
- false positives;
- domain-specific fixtures;
- ADE adapters;
- evaluation briefs;
- deterministic evidence rules.

A diverse corpus helps prevent one maintainer's taste from defining the system.

### 7. Team/CI history (future)

Hosted comparison history, organization design contracts, reviewer policy, and PR integrations could create commercial durability, but this is later.

## Anti-moats

Do not rely on:

- number of rules;
- secret prompts;
- number of supported themes;
- GitHub stars alone;
- one model vendor;
- one ADE integration;
- vague claims of “taste.”

## Strategic stance toward competitors

Intent Witness can be **complementary**:

```text
Hallmark / Impeccable / UI UX Pro Max → better generation
Intent Witness → independent review
```

If that combination performs best, embrace it. Trying to own every step would increase scope and make the project less credible.
