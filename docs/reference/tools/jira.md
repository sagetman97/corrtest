# Jira at Polly (Knowledge Profile)

## Metadata

- Owner: Pod delivery lead (initially AI Solutions Manager)
- Last reviewed: 2026-04-13
- Confidence: Medium

## Purpose

Jira is the canonical planning and execution system for work items, including
epics, stories, tasks, and delivery status.

## Why It Matters for AI Pod Knowledge

- Source of truth for roadmap, milestone state, and scope changes.
- Useful for converting intent into execution artifacts.
- Enables searchable history of priorities and decision timing.

## Integration Approach

1. Prefer MCP connector if available and stable.
2. Fallback to Jira REST API pull for weekly snapshots.
3. Normalize key outputs into markdown.

**MCP:** Atlassian Rovo MCP (Jira/Confluence/Compass). See `docs/reference/mcp-capabilities-and-usage.md`.

## Canonical Derived Docs

- `docs/reference/processes/pod-intake-and-scoping.md`
- `docs/reference/team/pod-metrics.md`
- `docs/reference/processes/decision-log.md`

## Data to Ingest (Suggested)

- Active epics and owners
- Current sprint scope
- Blocked issues and blockers
- Scope changes after sprint start

## Guardrails

- Do not treat ticket descriptions as approved product requirements unless
  confirmed in decision docs.
- Keep sensitive customer details out of general reference pages.
