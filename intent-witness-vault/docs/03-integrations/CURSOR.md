---
title: "Cursor Integration"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, cursor, integration]
---

# Cursor Integration

## Why Cursor first

Cursor currently exposes the full set of primitives Intent Witness wants: Agent Skills, custom subagents, browser control, hooks, and MCP/tool integration. That makes it the best V0 demonstration host.

## Proposed project layout

```text
.cursor/
├── skills/
│   └── intent-witness/
│       ├── SKILL.md
│       └── references/
│           ├── review-protocol.md
│           └── design-reasoning.md
├── agents/
│   └── intent-witness-reviewer.md
└── hooks.json              # later / opt-in gate mode

.intent-witness/
└── intent.md
```

## User experience

Implicit invocation:

```text
Redesign the dashboard and use Intent Witness.
```

Or skill command depending on Cursor's current skill invocation UX:

```text
/intent-witness review this dashboard
```

## Builder instructions

The Cursor skill should tell the main agent:

1. Implement the requested frontend change.
2. Run/open the app.
3. Collect relevant product intent and changed routes/files.
4. Delegate an **independent, read-only** review to `intent-witness-reviewer`.
5. Ensure the reviewer inspects rendered UI with browser tools when available.
6. Parse the structured result.
7. If `REVISE`, address deepest problem first.
8. If alternatives are required, generate structurally distinct approaches before implementation.
9. Re-render and request comparison review.
10. Stop on pass/pass-with-notes or iteration budget.

## Reviewer agent

Conceptual frontmatter/prompt:

```md
---
name: intent-witness-reviewer
description: Independent product-design reviewer for Intent Witness.
readonly: true
---

You review; you do not implement.
Evaluate decisions against product intent and rendered evidence.
Do not impose a house aesthetic.
Return the Intent Witness ReviewResult schema.
```

Verify exact supported frontmatter against current Cursor docs during implementation.

## Browser evidence

Cursor's browser tooling can navigate a local app, click/type/scroll, capture screenshots, and inspect console/network information. V0 should use the host browser instead of immediately shipping a custom browser stack.

Reviewer minimum evidence for a full-screen change:

- desktop first viewport;
- full page if scrolling matters;
- narrow/mobile viewport;
- at least one relevant state when the page is interactive.

## Hooks: later gate mode

Cursor hooks can observe/control stages of the agent loop. A future opt-in hook may prevent completion when:

- frontend files changed after the latest review;
- no valid review artifact exists for the current change;
- a prior `REVISE` verdict remains unresolved.

Do not ship blocking as default. False positives would destroy trust.

## Cursor-specific risks

- Agent may skip skill invocation unless description/triggers are strong.
- Builder may paraphrase away structured reviewer findings.
- Subagent may inherit insufficient context or too much implementation bias.
- Browser may not be available/configured in every environment.
- Hooks can create loops if review state is not tracked carefully.

## V0 acceptance test

A clean repo should support:

```text
User: Build this dashboard. Use Intent Witness.

Builder implements → reviewer opens page → reviewer returns REVISE with evidence → builder structurally revises → reviewer returns PASS_WITH_NOTES.
```

No manual copy/paste of hidden reviewer prompts should be required.

## Research sources

See `research/SOURCES.md`: CURSOR-SKILLS, CURSOR-SUBAGENTS, CURSOR-BROWSER, CURSOR-HOOKS.
