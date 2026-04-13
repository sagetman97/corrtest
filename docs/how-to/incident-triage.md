# How to Triage an Incident for Pod Products

## Metadata

- Owner: On-call or incident lead
- Last reviewed: 2026-04-13

## Trigger

- Production error spike
- Availability degradation
- Severe model-quality regression
- Security-relevant anomaly

## Immediate Response

1. Confirm incident severity and impact scope.
2. Start incident channel and assign incident lead.
3. Stabilize user impact (rollback, feature flag, or traffic control).
4. Capture timeline events in real time.

## Investigation Sources

- Datadog
- Sentry
- Kibana
- CircleCI
- Recent deployments and config changes

## Decision Points

- Can we recover without rollback?
- Do we need to disable AI feature paths temporarily?
- Is customer communication required?

## Exit Criteria

- User impact resolved or mitigated.
- Root cause hypothesis documented.
- Follow-up actions entered and owners assigned.
- Lessons added to `docs/reference/processes/decision-log.md`.
