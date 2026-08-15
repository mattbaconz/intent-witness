---
title: "Metrics and Measurement"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, eval, metrics]
---

# Metrics and Measurement

## Product quality metrics

### Blind ship preference
Primary headline candidate: percentage of paired comparisons where raters would ship Intent Witness output over baseline.

### Product-specificity rating
Does structure/interaction visibly reflect domain and user job?

### IA quality
Grouping, labels, navigation, duplication, mental model.

### Primary-job clarity
How quickly the screen communicates what the user should do/understand.

### Reviewer actionability
Would a competent builder know what structural change to make?

### Reviewer correctness
Expert judgment of whether observations/mismatches are valid.

### False-positive rate
Strong/justified interfaces incorrectly receive material revision.

### Convergence rate
Fraction of `REVISE` cases that reach PASS/NOTES within iteration budget.

## Workflow metrics

- review latency;
- number of reviewer calls;
- revision cycles;
- tool/browser calls;
- tokens/credits/cost;
- user overrides;
- review skipped rate;
- repeat use per repository.

## OSS metrics

- stars/forks;
- installs where measurable;
- external contributors;
- fixture contributions;
- unique ADE adapters;
- repeat issue reporters/users;
- community before/after submissions.

## Metrics to avoid as primary KPI

### GitHub stars alone
High virality can coexist with no retention.

### Number of detected issues
Incentivizes noisy reviewer behavior.

### Universal “design score”
Not calibrated and likely gameable.

### Number of supported rules/styles
Rewards breadth instead of review quality.

## Evaluation report format

For each release, eventually publish:

```text
Benchmark version
Models/ADEs
Cases
Human raters
Blind ship preference
Dimension ratings
False-positive cases
Average review cycles
Average cost/latency
Known failures
```

Transparency about losses is part of credibility.
