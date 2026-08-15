---
title: "Claude Code Integration"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, claude, integration]
---

# Claude Code Integration

## Target architecture

Claude Code is a natural Deliberate host because agent skills, subagents, hooks, and MCP-style tooling can map cleanly to the protocol.

Suggested conceptual layout:

```text
.claude/
├── skills/
│   └── deliberate/
│       └── SKILL.md
└── agents/
    └── deliberate-reviewer.md

.deliberate/
└── intent.md
```

Exact paths/features should be confirmed against current Claude Code documentation at implementation time.

## Flow

```text
Claude builder
   ↓
Deliberate skill
   ↓
render/test UI
   ↓
independent deliberate-reviewer
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
    require_deliberate_review()
```

This should be deterministic; do not use an expensive model hook when a timestamp/hash check is enough.

## MCP/tool fallback

If browser capture is not native to the current setup, use Deliberate's future Playwright/MCP engine to provide screenshots and structural evidence.

## Integration test requirements

- Skill is discoverable/invocable.
- Reviewer can be delegated independently.
- Builder receives exact structured findings.
- Reviewer cannot silently edit implementation.
- Rereview compares rather than re-litigates resolved issues.

## Competitive note

Anthropic maintains an official frontend-design skill focused on creating distinctive, intentional interfaces. Deliberate should be complementary: use strong generation guidance if desired, then independently review the implementation.

See [[COMPETITIVE-LANDSCAPE]].
