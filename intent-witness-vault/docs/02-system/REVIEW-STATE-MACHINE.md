---
title: "Review State Machine"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, state, machine, architecture]
---

# Review State Machine

## Purpose

A state machine prevents review thrashing and makes adapters predictable.

## States

```text
UNINITIALIZED
    ↓
CONTEXT_READY
    ↓
IMPLEMENTED
    ↓
EVIDENCE_READY
    ↓
UNDER_REVIEW
    ├──→ PASS_COMPLETE
    ├──→ NOTES_COMPLETE
    ├──→ NEEDS_EVIDENCE ──→ EVIDENCE_READY
    └──→ REVISION_REQUIRED
               ↓
        ALTERNATIVES (optional)
               ↓
           REVISING
               ↓
        EVIDENCE_READY
               ↓
        COMPARISON_REVIEW
               ├──→ PASS_COMPLETE
               ├──→ NOTES_COMPLETE
               └──→ REVISION_REQUIRED (if budget remains)
```

## State definitions

### UNINITIALIZED
No usable product intent exists.

Transition when sufficient intent is available from project files, repo, or user request.

### CONTEXT_READY
Product intent is known enough to implement/review.

### IMPLEMENTED
Builder has made the requested user-facing change.

### EVIDENCE_READY
Relevant rendered evidence exists or the adapter has explicitly recorded limitations.

### UNDER_REVIEW
Independent reviewer is evaluating.

### NEEDS_EVIDENCE
Reviewer cannot responsibly judge. Missing evidence is specific (e.g., mobile state, route does not load).

### REVISION_REQUIRED
At least one material finding exists.

### ALTERNATIVES
Required only for structural/deep issues; builder produces structurally distinct approaches before selecting one.

### REVISING
Builder applies selected changes.

### COMPARISON_REVIEW
Reviewer compares current state against previous findings and before-state.

### PASS_COMPLETE / NOTES_COMPLETE
Terminal states for this change.

## Guards

- Cannot enter `REVISION_REQUIRED` without evidence-backed material finding.
- Cannot enter `ALTERNATIVES` solely for polish issue.
- Cannot loop more than configured revision budget by default.
- A user override can terminate review with acknowledged findings.
- Frontend changes after a final review invalidate completion state in future gate mode.

## Review artifact identity

Each review should include:

- review ID;
- change/commit/file hash if available;
- timestamp;
- protocol/schema version;
- evidence IDs;
- parent review ID for comparisons.

This makes hooks/CI capable of determining whether the current frontend was actually reviewed.
