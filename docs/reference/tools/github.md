# GitHub at Polly (Knowledge Profile)

## Metadata

- Owner: Engineering lead for each Pod repository
- Last reviewed: 2026-04-13
- Confidence: Medium

## Purpose

GitHub is the source of truth for code, pull requests, code reviews, and
versioned technical history.

## Why It Matters for AI Pod Knowledge

- Captures implementation decisions and trade-offs in PR discussions.
- Identifies code ownership and change velocity.
- Provides release and incident root-cause context.

## Integration Approach

1. Prefer MCP connector for repo-aware retrieval.
2. Fallback to GitHub API for PR and issue summaries.
3. Convert important patterns into markdown references.

**MCP:** GitHub official MCP server. See `docs/reference/mcp-capabilities-and-usage.md`.

## Canonical Derived Docs

- `docs/reference/engineering/ai-first-repo-standards.md`
- `docs/reference/engineering/ci-health.md` (future)
- `docs/reference/processes/decision-log.md`

## Data to Ingest (Suggested)

- PR merge frequency and lead time
- Recurring review feedback themes
- High-risk areas by churn
- Open security or reliability issues

## Guardrails

- Never mirror secrets or private tokens into docs.
- Summarize decisions and risks, not raw confidential code snippets.
