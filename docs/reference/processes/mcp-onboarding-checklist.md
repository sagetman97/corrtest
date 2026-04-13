# MCP Onboarding Checklist

## Metadata

- Owner: AI Solutions Manager
- Last reviewed: 2026-04-13
- Confidence: High

## Purpose

Standardize how new MCP connectors are evaluated and adopted.

## Pre-Integration Checks

- Connector serves high-value knowledge workflows.
- Required permissions are understood.
- Data sensitivity and compliance constraints are reviewed.
- Fallback ingestion path exists (API/export/manual).

## Implementation Steps

1. Enable connector and verify authentication.
2. Run minimal read test.
3. Validate expected data shape and coverage.
4. Map outputs to canonical docs.
5. Document operational guardrails.

## Exit Criteria

- Connector reads are stable.
- At least one recurring ingestion workflow is operational.
- Process and ownership are documented.

## Related

- Capability summary for each MCP in use: `docs/reference/mcp-capabilities-and-usage.md`
