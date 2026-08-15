# Review Output Schema

Protocol version `0.1`. Schema version `0.1`.

Return a concise human summary, then a fenced YAML (or JSON) block. camelCase is the sole canonical wire format. Runtime validators normalize snake_case only as backward-compatible input for older artifacts; published JSON Schemas intentionally validate canonical camelCase only.

```yaml
protocolVersion: "0.1"
schemaVersion: "0.1"
verdict: PASS | PASS_WITH_NOTES | REVISE | INSUFFICIENT_EVIDENCE
summary: "..."
deepestProblem: polish | composition | information_architecture | interaction | null
overallConfidence: low | medium | high
alternativesRequired: false
alternativeConstraints: []
findings:
  - id: "finding-1"
    title: "..."
    observation: "Observable fact about the implementation"
    productMismatch: "Why this matters for the user's job/product intent"
    depth: composition
    severity: material | non_blocking
    confidence: high
    evidence:
      - kind: screenshot | dom | source | interaction | responsive | design-memory
        reference: "route/path/region/file"
        fact: "..."
    revisionConstraint: "Optional instruction preventing a shallow fix"
```

Evidence `reference` is accepted by both the runtime validator and generated JSON Schemas. The runtime normalizes it to the kind-specific field (`path`, `file`, `route`, `viewport`, `source`, or `selector`). Prefer also filling that field explicitly. Unrelated fields are rejected rather than silently discarded.

## Comparison (rereview)

```yaml
priorReviewId: "review-1"
resolvedFindingIds: ["finding-1"]
unresolvedFindingIds: []
regressions: []
improvements:
  - "Active runs now occupy the first viewport."
verdict: PASS | PASS_WITH_NOTES | REVISE
nextAction: "..."
```

A comparison review may include this block in addition to a full `ReviewResult`.

## Validation

- `REVISE` requires ≥1 material finding.
- Every material finding requires evidence.
- Do not create more than 5 material findings.
- Use `INSUFFICIENT_EVIDENCE` instead of inventing facts.
- `alternativesRequired: true` only when deepest problem is `information_architecture` or `interaction`.
- If alternatives are required, constraints must force structural distance.
- Do not emit a universal numeric quality or slop score.
# JSON Schema limits

The generated JSON Schemas enforce representable structural and conditional rules, including material evidence, verdict/finding constraints, structural-alternative bounds, and per-array uniqueness. JSON Schema cannot express cross-array set relationships such as resolved versus unresolved finding IDs being disjoint (or regression IDs being globally unique). Consumers must run the published `validateComparisonResult` runtime validator for those rules; the generated artifact schema carries this limitation in `$comment`.
