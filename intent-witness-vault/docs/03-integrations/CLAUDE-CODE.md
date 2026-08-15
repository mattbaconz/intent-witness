---
title: "Claude Code Integration"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, claude, integration]
---

# Claude Code Integration

> **V0 status:** Future/out of scope. This is a conceptual integration note, not an adapter to implement or distribute in V0.

## Target architecture

Claude Code is a natural Intent Witness host because agent skills, subagents, hooks, and MCP-style tooling can map cleanly to the protocol.

Suggested conceptual layout:

```text
.claude/
├── skills/
│   └── intent-witness/
│       └── SKILL.md
└── agents/
    └── intent-witness-reviewer.md

.intent-witness/
└── intent.md
```

Exact paths/features should be confirmed against current Claude Code documentation at implementation time.

## Flow

```text
Claude builder
   ↓
Intent Witness skill
   ↓
render/test UI
   ↓
independent intent-witness-reviewer
   ↓
structured findings
   ↓
Claude builder revises
   ↓
review again
```

## Recommended reviewer policy

- fresh context;
- read-only tools where possible;
- browser/tool access sufficient to inspect UI;
- no direct edits;
- schema-constrained response;
- limited to affected scope unless requested otherwise.

## Hooks

Claude Code hooks can eventually enforce review lifecycle rules. Gate mode should remain opt-in and bounded, with a clear user override.

Potential check:

```text
if frontend_changed_since(last_review):
    require_intent-witness_review()
```

This should be deterministic; do not use an expensive model hook when a timestamp/hash check is enough.

## MCP/tool fallback

If browser capture is not native to the current setup, use Intent Witness's future Playwright/MCP engine to provide screenshots and structural evidence.

## Integration test requirements

- Skill is discoverable/invocable.
- Reviewer can be delegated independently.
- Builder receives exact structured findings.
- Reviewer cannot silently edit implementation.
- Rereview compares rather than re-litigates resolved issues.

## Competitive note

Anthropic maintains an official frontend-design skill focused on creating distinctive, intentional interfaces. Intent Witness should be complementary: use strong generation guidance if desired, then independently review the implementation.

See [[COMPETITIVE-LANDSCAPE]].
