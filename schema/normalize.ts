const KEY_MAP: Record<string, string> = {
  protocol_version: "protocolVersion",
  schema_version: "schemaVersion",
  deepest_problem: "deepestProblem",
  overall_confidence: "overallConfidence",
  alternatives_required: "alternativesRequired",
  alternative_constraints: "alternativeConstraints",
  product_mismatch: "productMismatch",
  revision_constraint: "revisionConstraint",
  prior_review_id: "priorReviewId",
  resolved_finding_ids: "resolvedFindingIds",
  unresolved_finding_ids: "unresolvedFindingIds",
  next_action: "nextAction",
  product_name: "productName",
  target_users: "targetUsers",
  primary_job: "primaryJob",
  secondary_jobs: "secondaryJobs",
  primary_objects: "primaryObjects",
  critical_states: "criticalStates",
  desired_traits: "desiredTraits",
  explicit_avoid: "explicitAvoid",
  review_id: "reviewId",
  base_url: "baseUrl",
  changed_files: "changedFiles",
  product_intent: "productIntent",
  captured_evidence: "capturedEvidence",
  evidence_requests: "evidenceRequests",
  created_at: "createdAt",
};

export function normalizeKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeKeys);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      const mapped = KEY_MAP[key] ?? key;
      out[mapped] = normalizeKeys(nested);
    }
    return out;
  }
  return value;
}

export function normalizeEvidence(raw: Record<string, unknown>): Record<string, unknown> {
  const evidence = { ...raw };
  const reference = typeof evidence.reference === "string" ? evidence.reference : undefined;
  const kind = evidence.kind;

  if (reference) {
    if (kind === "screenshot" && evidence.path == null) evidence.path = reference;
    if (kind === "source" && evidence.file == null) evidence.file = reference;
    if (kind === "interaction" && evidence.route == null) evidence.route = reference;
    if (kind === "responsive" && evidence.viewport == null) evidence.viewport = reference;
    if (kind === "design-memory" && evidence.source == null) evidence.source = reference;
    if (kind === "dom" && evidence.selector == null) evidence.selector = reference;
    if (evidence.fact == null && evidence.note == null) evidence.fact = reference;
  }

  if (kind === "screenshot" && evidence.fact == null && typeof evidence.note === "string") {
    evidence.fact = evidence.note;
  }

  if (kind === "interaction" && !Array.isArray(evidence.steps)) {
    evidence.steps = [];
  }

  delete evidence.reference;

  return evidence;
}

const EVIDENCE_KINDS = new Set([
  "screenshot",
  "dom",
  "source",
  "interaction",
  "responsive",
  "design-memory",
]);

function normalizeEvidenceDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeEvidenceDeep);
  if (!value || typeof value !== "object") return value;
  const normalized = Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, nested]) => [key, normalizeEvidenceDeep(nested)]),
  );
  return typeof normalized.kind === "string" && EVIDENCE_KINDS.has(normalized.kind)
    ? normalizeEvidence(normalized)
    : normalized;
}

export function normalizeReviewShape(value: unknown): unknown {
  return normalizeEvidenceDeep(normalizeKeys(value));
}
