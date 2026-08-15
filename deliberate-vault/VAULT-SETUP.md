---
title: "Using This as an Obsidian Vault"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, obsidian, vault]
---

# Using This as an Obsidian Vault

## Open in Obsidian

1. Unzip the archive.
2. In Obsidian, choose **Open folder as vault**.
3. Select the `deliberate-vault` folder.
4. Start at [[00-START-HERE]] or [[MAP-OF-CONTENT]].

No community plugins are required. Internal navigation uses standard Obsidian wiki-links.

## Recommended reading modes

### Human strategy session
Open [[MAP-OF-CONTENT]] and use the graph/backlinks to move between product, architecture, competition, evals, and roadmap.

### Cursor/Codex/Claude implementation
Point the coding agent at root [[AGENTS]] first. The agent should then load only the canonical docs relevant to its task.

### Reviewer-skill development
Start at:

- `skill/deliberate/SKILL.md`
- `skill/deliberate/references/review-protocol.md`
- [[STRUCTURED-OUTPUT-SCHEMAS]]
- [[TEST-PLAN]]
- [[KILL-CRITERIA]]

## Folder semantics

- `docs/01-product/` — what/why/who/positioning.
- `docs/02-system/` — canonical system and reviewer behavior.
- `docs/03-integrations/` — volatile host adapters.
- `docs/04-evals/` — how the thesis is tested/falsified.
- `docs/05-competition/` — alternatives, threats, moat strategy.
- `docs/06-implementation/` — V0 scope and build plan.
- `docs/07-oss-growth/` — FOSS/community/launch.
- `docs/08-business/` — optional later commercial path.
- `docs/09-decisions/` — decisions, risks, unresolved questions.
- `skill/` — buildable Agent Skill blueprint.
- `adapters/` — host-specific reviewer blueprints.
- `templates/` — project/eval/review templates.
- `research/` — dated external-source snapshot.
- `examples/` — illustrative project context.

## Canonical-document precedence

When similar information appears in multiple notes:

1. [[DECISION-LOG]] for explicit decisions.
2. [[V0-SPEC]] for current implementation scope.
3. [[ARCHITECTURE]] for system boundaries.
4. [[REVIEW-PROTOCOL]] for review behavior.
5. [[OPEN-QUESTIONS]] for unresolved decisions.
6. Integration notes are descriptive adapters and may become stale faster than core docs.

## Updating the vault

When a material design/architecture decision changes:

- update the canonical doc;
- append [[DECISION-LOG]];
- add/move related question in [[OPEN-QUESTIONS]];
- add regression fixture if reviewer behavior changes;
- refresh dated research only when needed.

Do not rewrite the entire vault from an agent's memory; preserve explicit decision history.
