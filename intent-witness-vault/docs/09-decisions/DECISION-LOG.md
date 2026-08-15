---
title: "Decision Log"
project: Intent Witness
status: pre-implementation
updated: 2026-08-15
tags: [intent-witness, decisions, adr]
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

Intent Witness differentiates from generation-focused skills by separating builder and reviewer roles after implementation.

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

**Date:** 2026-08-15<br>
**Status:** Accepted

V0 stops after two reviewer-requested revision cycles unless the user asks to continue. Prevents art-critic loops (K6) while still allowing one structural pass and one comparison pass.

## D-012 — Rename to Intent Witness

**Date:** 2026-08-15<br>
**Status:** Working decision, pending professional clearance

The product, skill, reviewer, state directory, public repository, and package identity use **Intent Witness**. D-001 remains as the historical record of the original working name. Trademark, company-name, domain, GitHub, and npm clearance remain required before public release.

## D-013 — MIT license

**Date:** 2026-08-15<br>
**Status:** Accepted

The public Intent Witness repository is licensed under MIT. Keep the copyright notice and license text aligned with the current product identity.

## D-014 — Verified-alpha release bar

**Date:** 2026-08-15<br>
**Status:** Accepted

An alpha may be called verified only when `npm test`, `node scripts/install-cursor.mjs --check`, and the RelayOps `npm run build` command pass on the release commit, with the installed Cursor copies matching the root sources. This bar does not authorize public performance claims.

## D-015 — Public and private repository roles

**Date:** 2026-08-15<br>
**Status:** Accepted

`mattbaconz/intent-witness` is the public source, documentation, fixtures, and MIT-licensed distribution repository. `mattbaconz/intent-witness-ops` is private and holds operational records; credentials, private evidence, and release operations do not belong in the public repository.

## D-016 — Scoped npm package identity

**Date:** 2026-08-15<br>
**Status:** Accepted

The package identity is `@mattbaconz/intent-witness`. Keeping it scoped reserves a clear ownership boundary; no package is published until professional clearance and the verified-alpha bar are complete.

## D-017 — Capture before review

**Date:** 2026-08-15<br>
**Status:** Accepted

The builder captures rendered UI evidence first, stores local artifacts under `.intent-witness/evidence/`, then delegates the independent review. Review findings must cite captured or directly observed evidence; the reviewer must not infer a verdict from implementation rationale alone.

## Pending decisions

See [[OPEN-QUESTIONS]].
