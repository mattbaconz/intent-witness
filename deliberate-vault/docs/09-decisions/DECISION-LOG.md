---
title: "Decision Log"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, decisions, adr]
---

# Decision Log

Use this file for accepted architectural/product decisions. Append; do not rewrite history silently.

## D-001 — Name: Deliberate

**Date:** 2026-08-14  
**Status:** Working decision

Rationale: Encodes the thesis that good agent design comes from intentional decisions rather than autopilot convergence. Broader and more durable than “anti-slop.”

Trademark/domain clearance has **not** been completed.

## D-002 — Independent review is the primary wedge

**Date:** 2026-08-14  
**Status:** Accepted hypothesis

Deliberate differentiates from generation-focused skills by separating builder and reviewer roles after implementation.

## D-003 — No universal SlopScore in V0

**Date:** 2026-08-14  
**Status:** Accepted

Reason: uncalibrated numeric precision would be misleading and encourage gaming/aesthetic monoculture.

## D-004 — Product intent outranks global style heuristics

**Date:** 2026-08-14  
**Status:** Accepted

Common patterns are not failures unless weakly justified in context.

## D-005 — Problem depth is mandatory

**Date:** 2026-08-14  
**Status:** Accepted

Every material finding must classify deepest layer: polish, composition, information architecture, or interaction.

## D-006 — Cursor is first adapter

**Date:** 2026-08-14  
**Status:** Working decision

Reason: current combination of skills, subagents, browser, hooks, and tool extensibility makes the complete loop demonstrable.

## D-007 — SaaS deferred

**Date:** 2026-08-14  
**Status:** Accepted

No SaaS until OSS review loop proves benchmark advantage and repeat usage.

## D-008 — FOSS core should be genuinely useful

**Date:** 2026-08-14  
**Status:** Accepted

Do not cripple local review to force cloud conversion.

## D-009 — Benchmark against strong prompt and competitors

**Date:** 2026-08-14  
**Status:** Accepted

Vanilla-only comparisons are insufficient evidence.

## D-010 — Gate mode is opt-in and later

**Date:** 2026-08-14  
**Status:** Accepted

V0 review is advisory/revision-oriented. Blocking completion before trust would create high uninstall risk.

## D-011 — Default revision budget is two cycles

**Date:** 2026-08-15  
**Status:** Accepted

V0 stops after two reviewer-requested revision cycles unless the user asks to continue. Prevents art-critic loops (K6) while still allowing one structural pass and one comparison pass.

## Pending decisions

See [[OPEN-QUESTIONS]].
