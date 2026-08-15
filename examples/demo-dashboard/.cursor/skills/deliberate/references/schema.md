# Review Output Schema

Protocol version `0.1`. Schema version `0.1`.

Return a concise human summary, then a fenced YAML (or JSON) block. Snake_case is preferred; camelCase is accepted by the validator.

```yaml
protocol_version: "0.1"
schema_version: "0.1"
verdict: PASS | PASS_WITH_NOTES | REVISE | INSUFFICIENT_EVIDENCE
summary: "..."
deepest_problem: polish | composition | information_architecture | interaction | null
overall_confidence: low | medium | high
alternatives_required: false
alternative_constraints: []
findings:
  - id: "finding-1"
    title: "..."
    observation: "Observable fact about the implementation"
    product_mismatch: "Why this matters for the user's job/product intent"
    depth: composition
    severity: material | non_blocking
    confidence: high
    evidence:
      - kind: screenshot | dom | source | interaction | responsive | design-memory
        reference: "route/path/region/file"
        fact: "..."
    revision_constraint: "Optional instruction preventing a shallow fix"
```

Evidence `reference` maps to the kind-specific field (`path`, `file`, `route`, `viewport`, `source`, or `selector`). Prefer also filling that field explicitly.

## Comparison (rereview)

```yaml
prior_review_id: "review-1"
resolved_finding_ids: ["finding-1"]
unresolved_finding_ids: []
regressions: []
improvements:
  - "Active runs now occupy the first viewport."
verdict: PASS | PASS_WITH_NOTES | REVISE
next_action: "..."
```

A comparison review may include this block in addition to a full `ReviewResult`.

## Validation

- `REVISE` requires ≥1 material finding.
- Every material finding requires evidence.
- Do not create more than 5 material findings unless grouping is impossible.
- Use `INSUFFICIENT_EVIDENCE` instead of inventing facts.
- `alternatives_required: true` only when deepest problem is `information_architecture` or `interaction`.
- If alternatives are required, constraints must force structural distance.
- Do not emit a universal numeric quality or slop score.
