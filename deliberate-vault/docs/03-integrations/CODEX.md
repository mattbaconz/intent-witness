---
title: "Codex Integration"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, codex, integration]
---

# Codex Integration

## Target architecture

OpenAI's Codex customization model supports Agent Skills, project guidance, MCP, and subagent workflows. Deliberate should use the open skill format and a specialized reviewer agent where available.

Conceptual structure:

```text
.agents/ or Codex-configured custom agent area
  deliberate-reviewer configuration

skill/
  deliberate/SKILL.md

.deliberate/
  intent.md
```

Do not hard-code paths here until implementation verifies the current Codex client conventions.

## Flow

```text
Codex builder
   ↓
Deliberate skill
   ↓
subagent reviewer
   ↓
MCP/browser evidence as needed
   ↓
ReviewResult
   ↓
Codex builder revision
```

## Multi-model opportunity

If the environment permits reviewer model configuration, Deliberate can intentionally use a different model family or reasoning configuration for the reviewer. This may reduce correlated builder/reviewer priors, but it must be benchmarked rather than assumed.

Eval conditions should include:

- same model builder/reviewer;
- different model reviewer;
- no subagent / self-review;

## MCP opportunity

Codex supports MCP-related customization, which makes a future Deliberate engine portable:

```text
capture_evidence
review_ui
compare_ui
```

The core reviewer should remain model-agnostic.

## Acceptance criteria

- Skill can instruct Codex to delegate bounded review.
- Reviewer returns structured output.
- Builder correctly addresses deep findings.
- Tool/MCP absence degrades gracefully.

## Research sources

See `research/SOURCES.md`: CODEX-SKILLS, CODEX-SUBAGENTS, CODEX-CUSTOMIZATION, CODEX-MCP.
