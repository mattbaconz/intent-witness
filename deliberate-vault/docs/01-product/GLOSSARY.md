---
title: "Glossary"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, glossary, terminology]
---

# Glossary

## AI slop
Informal umbrella term for repetitive, generic, low-intent AI-generated output. Deliberate uses more precise subcategories below.

## Unjustified convergence
A common structure/style appears without a strong reason from product intent, user job, or design language.

## Convention
A familiar pattern that may be beneficial because users already understand it. Convention is not automatically slop.

## Product specificity
The degree to which an interface’s hierarchy, objects, actions, and structure visibly reflect the product’s actual domain and user jobs.

## Semantic flattening
Different concepts receive similar hierarchy, containers, or interaction treatment despite differing importance or urgency.

## Performative load
The proportion/importance of high-salience visual elements that signal category/status/brand theater more than product function. This is a qualitative concept in V0, not a universal numeric score.

## Implementation leakage
Backend, schema, API, or component structure leaks into the user-facing information architecture.

## Design memory
Persistent project-specific intent, language, constraints, decisions, references, and anti-references used by future reviews.

## Builder
The primary coding agent that implements UI.

## Reviewer
A separate Deliberate role/context that inspects the implementation and returns findings but should not directly edit in native-review mode.

## Review protocol
The canonical sequence and output contract used to evaluate UI.

## Problem depth
The deepest layer causing a finding: polish, composition, information architecture, or interaction.

## Revision constraint
A rule that prevents a shallow fix, e.g. “do not solve by restyling the existing dashboard grid.”

## Structural distance
How different two proposed solutions are in macrostructure, object hierarchy, or interaction model—not merely color/theme.

## Anti-reference
An example the user dislikes, used to extract undesirable principles/patterns without globally banning individual components.

## SlopBench
Working name for the evaluation corpus and benchmark suite.

## ADE
Agentic Development Environment: Cursor, Claude Code, Codex, Kiro, Antigravity, OpenCode, Windsurf/Devin Local, etc.
