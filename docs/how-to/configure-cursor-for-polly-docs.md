# How to Configure Cursor for Polly Documentation Work

## Outcome

Cursor Chat reliably answers questions from your local Polly docs and clearly
signals uncertainty when docs are incomplete.

## Core Setup (Already in This Repo)

- `AGENTS.md` with repository-level answering behavior.
- `.cursor/rules/docs-chat-grounding.mdc` for source-grounded answers.
- `.cursor/rules/markdown-authoring.mdc` for consistent markdown quality.
- `.cursor/rules/docs-maintenance-loop.mdc` for gap-closing behavior.
- `.cursor/rules/pod-team-context.mdc` for team-specific context.
- Diataxis folder structure under `docs/`.

## Cursor Features to Enable

1. Keep this folder open as the active workspace.
2. Use Agent (Chat) mode for question answering and doc maintenance.
3. Add frequently used docs to chat with `@docs/...` when asking specific
   questions.
4. Ask for path-based citations in high-impact answers.

## MCP Strategy (Recommended)

Use MCP connectors to reduce manual copy/paste from external systems.

### Pod default stack (see reference for detail)

1. **Atlassian (Rovo MCP)** — Jira / Confluence / Compass context.
2. **GitHub MCP** — repositories, issues, pull requests.
3. **Slack MCP** — workspace search and thread context (not policy authority).
4. **Google Workspace MCP** (`workspace-mcp`) — Drive, Calendar, Gmail, Sheets, Slides as configured.

**Full capability list and “when to use what”:** `docs/reference/mcp-capabilities-and-usage.md`.  
**Strategy, ingestion, and hygiene:** `docs/reference/mcp-strategy.md`.

### Priority Order (if adding more connectors later)

1. File-system/document MCP (local docs and exports).
2. Internal wiki MCP (if your company supports one).
3. Ticketing MCP (Jira/Linear) for process and status context.
4. Source-control MCP (GitHub/GitLab) for engineering context.
5. Communication MCP (Slack/Teams) only for referenced, auditable summaries.

### Governance Notes

- Treat MCP data as source input, then normalize into `docs/`.
- Avoid answering from chat logs alone for policy/process questions.
- Mark each generated doc with source and confidence.

## Prompt Patterns That Work Well

- "Answer this from `docs/reference` and cite files."
- "If docs are missing, list gaps and draft the missing markdown."
- "Summarize differences between these two process docs and flag conflicts."

## Weekly Maintenance Loop

1. Review unanswered or low-confidence chat questions.
2. Add/update docs in the right Diataxis section.
3. Normalize new terms into `docs/glossary.md`.
4. Archive or mark stale docs.
