# Slack at Polly (Knowledge Profile)

## Metadata

- Owner: Team leads and channel owners
- Last reviewed: 2026-04-13
- Confidence: Medium

## Purpose

Slack is the primary communication channel for operational coordination,
decisions-in-progress, and rapid clarifications.

## Why It Matters for AI Pod Knowledge

- Contains context not yet captured in formal docs.
- Helps reconstruct decision rationale and unresolved questions.
- Useful for incident and blocker timelines.

## Integration Approach

1. Use MCP integration if available for channel-scoped retrieval.
2. Fallback to export/summarization workflow.
3. Convert confirmed decisions into canonical markdown quickly.

**MCP:** Slack hosted MCP. See `docs/reference/mcp-capabilities-and-usage.md`.

## Canonical Derived Docs

- `docs/reference/processes/decision-log.md`
- `docs/how-to/run-weekly-pod-operating-rhythm.md`
- `docs/reference/team/operating-cadence.md` (future)

## Data to Ingest (Suggested)

- Decisions with owner and effective date
- Action items and deadlines
- Recurring blockers and mitigation patterns

## Guardrails

- Slack messages are not policy by default.
- Summaries must note source channels and dates.
- Avoid storing private HR or sensitive customer details in general docs.
