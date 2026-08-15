# Review Output Schema

Return a structured result equivalent to:

```yaml
protocol_version: "0.x"
schema_version: "0.x"
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

## Validation

- `REVISE` requires ≥1 material finding.
- Every material finding requires evidence.
- Do not create more than 3–5 material findings unless grouping is impossible.
- Use `INSUFFICIENT_EVIDENCE` instead of inventing facts.
- If alternatives are required, constraints must force structural distance.
