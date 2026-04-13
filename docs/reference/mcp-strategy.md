# MCP Strategy for Polly Knowledge Work

## Metadata

- Owner: AI Solutions Manager
- Last reviewed: 2026-04-13
- Confidence: High

## Purpose

Define how **Model Context Protocol (MCP)** connectors relate to this repository: MCP supplies **live context from external systems**; **`docs/` remains the canonical, versioned source of truth** for grounded answers in Cursor.

## Current MCP setup (Cursor)

MCP servers are configured in **Cursor user settings** (not committed to this repo). The Pod uses:

| Area | Role |
|------|------|
| **Atlassian (Rovo MCP)** | Jira, Confluence, Compass-aligned work per Atlassian |
| **GitHub** | Repositories, issues, pull requests |
| **Slack** | Workspace search, messages, canvases (per permissions) |
| **Google Workspace** (`workspace-mcp`) | Drive, Calendar, Gmail, Sheets, Slides (per `--tools` / tier / read-only flags) |

**Capabilities and when to use each connector:** `docs/reference/mcp-capabilities-and-usage.md`.

Verify **green / healthy** status in **Cursor → Settings → MCP** before relying on tool calls in a critical workflow. If a server is red, follow `docs/how-to/troubleshoot-mcp-connectivity.md`.

## Recommended priority (documentation-first Pod)

For **knowledge work** in this repo, prioritize connectors in this order:

1. **Work execution truth:** ticketing (Jira via Atlassian MCP) and source control (GitHub).
2. **Communication context:** Slack for missing or in-flight context — always **normalize** into markdown, not policy-by-default.
3. **Artifacts and cadence:** Google Workspace (Drive specs/decks, Calendar cadence; Gmail only when appropriate).
4. **Internal wiki / second brain** (if the org provides an MCP): optional; same ingest pattern.

Internal documentation/wiki MCP remains valuable when available; it did not replace the above ordering for this Pod’s current stack.

## Reliability pattern

1. **Import** facts via MCP tools when needed.
2. **Normalize** into focused markdown under `docs/` (owner, source system, retrieval date, confidence).
3. **Cite** those files in future chat answers.

This preserves durable knowledge if MCP connectivity, OAuth tokens, or vendor endpoints change.

## Data quality rules

- Always record **source system** and **retrieval date** on derived pages.
- Mark uncertain or unverified facts explicitly.
- Do not treat **Slack messages** or **raw chat** as canonical policy (`docs/reference/tools/slack.md`, `docs/reference/answering-playbook.md`).
- Do not store **secrets** from any MCP output in `docs/` (`docs/reference/processes/secrets.md`).

## Security and configuration hygiene

- Keep **PATs, OAuth client secrets, and refresh tokens** out of git. Prefer Cursor’s secret handling and user-level `mcp.json` only.
- If credentials may have been exposed, **rotate** them at the source (GitHub, Google Cloud OAuth client, Atlassian, Slack).

## Related process docs

- `docs/reference/mcp-capabilities-and-usage.md` — capabilities and when to use each MCP
- `docs/reference/processes/mcp-onboarding-checklist.md`
- `docs/how-to/troubleshoot-mcp-connectivity.md`
- `docs/reference/processes/knowledge-ingestion-pipeline.md`
- `docs/how-to/ingest-tool-knowledge-into-docs.md`
- `docs/how-to/configure-cursor-for-polly-docs.md`
