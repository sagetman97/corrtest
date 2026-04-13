# AI-First Repo Standards for Pod Teams

## Objective

Provide a standard repository shape and operating rules for fast AI product
builds.

## Recommended Repository Layout

```text
repo/
  src/
  tests/
  prompts/
  evals/
  docs/
    how-to/
    reference/
    explanation/
  scripts/
  .cursor/rules/
```

## Non-Negotiable Standards

- Keep `prompts/` versioned; no prompt-only changes in chat without commits.
- Keep `evals/` with baseline datasets and pass/fail thresholds.
- Document each major decision in markdown within 24 hours.
- Add runbooks for deployment, incident triage, and rollback.
- Keep an environment/secret handling doc but never store secrets.

## Definition of Done (Feature Level)

- Functional acceptance criteria met.
- At least one automated evaluation added/updated.
- Monitoring/observability hooks in place.
- Documentation updated in `docs/`.
- A rollback or mitigation path documented.

## Branch and Review Expectations

- Small PRs merged continuously.
- PRs include "why" and risk notes, not only implementation details.
- High-risk model behavior changes require explicit review callout.
