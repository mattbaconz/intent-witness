---
title: "Vision"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, product, vision]
---

# Vision

## North star

**Give coding agents design judgment without giving them a house style.**

Deliberate should become the neutral review layer that sits between “the frontend compiles” and “this product is ready to ship.”

Long-term, a developer should be able to use any strong builder—Cursor, Claude Code, Codex, Kiro, OpenCode, Windsurf, Antigravity, or a future agent—and add Deliberate without changing their preferred model or workflow.

```text
Any builder + Deliberate → more intentional product UI
```

## Why this matters

Coding agents increasingly control implementation decisions that historically required a frontend engineer, product designer, UX designer, or design review. As generation quality improves, the failure mode shifts from obviously broken UI to **plausible but generic UI**: interfaces that look competent while encoding weak hierarchy, redundant concepts, default dashboard structures, shallow responsive adaptation, and design choices inherited from model training rather than the product.

A generator is naturally biased toward completing the task and defending its own path. Deliberate introduces a separate role whose only job is to ask:

> “Why is this interface organized this way, and is that decision supported by the product?”

## Durable thesis

The project should survive the disappearance of today's specific AI tropes.

Do not build around “purple gradients are slop.” Build around these durable behaviors:

- defaulting to statistically common structures when product context is weak;
- collapsing semantically different objects into visually identical components;
- mirroring implementation/schema structure into user-facing IA;
- optimizing for local visual polish rather than end-to-end task clarity;
- self-review bias in a single agent context;
- style imitation without extracting underlying design principles;
- responsive adaptation as mechanical stacking rather than reprioritization.

## Future state

If V0 validates, Deliberate can expand into:

1. **Open skill** — portable review workflow.
2. **Local engine** — rendering, DOM analysis, measurements, state capture.
3. **Design memory** — persistent project intent/language and decisions.
4. **CI review** — frontend PR design checks and comparison artifacts.
5. **Team layer** — organization design constraints and shared review policy.
6. **SaaS (optional)** — hosted history, collaborative review, expensive multimodal evaluation, team analytics.

The open-source local product must remain genuinely useful even if the SaaS never exists.

## Success definition

Deliberate succeeds when users independently report outcomes like:

- “The agent stopped making every screen a dashboard.”
- “It caught that my settings mirrored the backend instead of the user’s mental model.”
- “It forced three genuinely different structures instead of three colorways.”
- “The result feels built for my product rather than generated from a template.”
- “I can switch builder models and keep the same design judgment.”

Stars, installs, and Discord virality are distribution indicators. The core success metric is **repeatable preference improvement under controlled evaluation**.
