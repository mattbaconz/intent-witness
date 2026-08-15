---
title: "Personas and Jobs"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, users, jobs]
---

# Personas and Jobs

## Persona A — AI-first builder / indie hacker

**Context:** Uses Cursor/Claude Code/Codex heavily; can ship product code but does not have a dedicated designer.

**Pain:** Interfaces look “fine” yet generic; struggles to explain why.

**Job:** “Before I ship this UI, challenge the decisions I am most likely to miss.”

**Value:** Independent review without leaving the coding workflow.

## Persona B — Frontend engineer with taste

**Context:** Can recognize poor output and fix it, but AI agents repeatedly regress design quality.

**Pain:** Spends time re-explaining project design intent and correcting the same patterns.

**Job:** “Make my agent remember and respect how this product should be designed.”

**Value:** Persistent design memory + review protocol.

## Persona C — Designer working with coding agents

**Context:** Uses AI to implement designs or works with engineers who do.

**Pain:** Generated implementation follows visual tokens but breaks hierarchy, interaction, or responsive priorities.

**Job:** “Turn design principles into executable review constraints.”

**Value:** Design-language contract and evidence-based review.

## Persona D — Small product team

**Context:** Multiple engineers/agents create frontend surfaces.

**Pain:** UI drifts; reviews focus on code correctness, not product design.

**Job:** “Catch design regressions in PRs before they become product debt.”

**Value (later):** CI/team review, shared design memory, comparison history.

## Not the primary V0 user

- Large design organizations with mature review processes and little AI-generated UI.
- Users wanting one-click website generation with no willingness to revise.
- People who only want a component/theme pack.
- Teams requiring a deterministic pass/fail compliance tool; Intent Witness’s judgment layer is probabilistic.

## User jobs hierarchy

1. **Explain why the UI feels generic.**
2. **Tell the builder what depth of change is required.**
3. **Force materially different alternatives when structure is weak.**
4. **Preserve project-specific design intent across sessions/models.**
5. **Eventually gate regressions in team workflows.**
