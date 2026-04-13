# Google Workspace at Polly (Knowledge Profile)

## Metadata

- Owner: Workspace administrators and team document owners
- Last reviewed: 2026-04-13
- Confidence: Medium

## Purpose

Google Workspace (Drive, Mail, Calendar, Account services) hosts critical
operational documents, meeting artifacts, and scheduling context.

## Why It Matters for AI Pod Knowledge

- Drive holds plans, specs, and stakeholder artifacts.
- Calendar reflects execution cadence and milestone timing.
- Mail can hold important approvals and partner context.

## Integration Approach

1. Prioritize Drive ingestion via MCP/API/export for docs.
2. Use Calendar summaries for cadence and milestone tracking.
3. Keep Mail usage minimal and policy-compliant (summary-only).

**MCP:** `workspace-mcp` (Drive, Calendar, Gmail, Sheets, Slides, etc., per `--tools` and tier). See `docs/reference/mcp-capabilities-and-usage.md`.

## Canonical Derived Docs

- `docs/reference/team/pod-metrics.md`
- `docs/reference/team/operating-cadence.md` (future)
- `docs/explanation/pod-operating-model.md`

## Data to Ingest (Suggested)

- Current product specs and proposal docs
- Milestone meetings and recurring rituals
- Approved decisions requiring execution

## Guardrails

- Do not copy private email threads verbatim into docs.
- Treat source docs as inputs; publish only normalized summaries.
- Include source link/path and retrieval date for every derived page.
