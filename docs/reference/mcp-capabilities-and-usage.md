# MCP Capabilities and When to Use Each Connector

## Metadata

- Owner: AI Solutions Manager
- Last reviewed: 2026-04-13
- Confidence: High (capabilities summarized from official upstream docs; exact tool names may change with MCP server versions)

## Purpose

Describe **what each connected MCP can do** in Cursor and **when to use it** versus local `docs/` or manual exports. For strategy and ingestion rules, see `docs/reference/mcp-strategy.md`.

## Where configuration lives

- **Cursor MCP config** is stored in the **user profile** (for example `~/.cursor/mcp.json` on Windows: typically under `%USERPROFILE%\.cursor\`).
- **Do not** commit OAuth secrets, PATs, or client secrets into this repository. If you ever copy a config into the repo for debugging, use `.gitignore` patterns and rotate any exposed credentials.

## Connected MCP inventory (Pod setup)

| MCP entry (name in Cursor) | Upstream | Typical transport |
|----------------------------|----------|-------------------|
| Atlassian / Jira–Confluence (Rovo MCP) | Atlassian hosted MCP | `mcp-remote` → `https://mcp.atlassian.com/v1/mcp` |
| GitHub | GitHub hosted MCP | Streamable HTTP + PAT |
| Slack | Slack hosted MCP | Streamable HTTP + OAuth (`https://mcp.slack.com/mcp`) |
| Google Workspace | Community `workspace-mcp` | Local `uvx workspace-mcp` (stdio) |

Exact tool lists appear in **Cursor → Settings → MCP** for each server. This page describes **categories of capability** and **decision rules**, not an exhaustive tool catalog.

---

## Atlassian MCP (Rovo / Jira & Confluence & Compass)

**Primary capabilities (category-level):**

- **Jira:** Search and work with issues, epics, sprints, and delivery context tied to your permissions.
- **Confluence:** Search and create pages; link content across products (per Atlassian’s MCP documentation).
- **Compass:** Component/service context where enabled.

**When to use**

- Roadmap, scope, status, and **delivery truth** that should later appear in `docs/reference/processes/` and pod metrics.
- Pulling structured facts before updating `docs/reference/processes/decision-log.md` or intake/scoping docs.

**When not to use as canonical policy**

- Ticket text alone is not an approved requirement until reflected in decision or product docs (`docs/reference/tools/jira.md`).

**Normalize into**

- `docs/reference/processes/pod-intake-and-scoping.md`
- `docs/reference/team/pod-metrics.md`
- `docs/reference/processes/decision-log.md`

**Upstream references**

- [Atlassian Rovo MCP — IDE setup](https://support.atlassian.com/atlassian-rovo-mcp-server/docs/setting-up-ides/)
- [Getting started with Atlassian Remote MCP Server](https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/)

---

## GitHub MCP

**Primary capabilities (category-level):**

- Repository, issue, and pull request context: discovery, history, and collaboration signals appropriate to your PAT scopes.
- Engineering ownership and change velocity context for documentation.

**When to use**

- PR and issue summaries, release or review context, and **engineering facts** for `docs/reference/engineering/`.
- Linking implementation decisions to written decisions in `docs/reference/processes/decision-log.md`.

**When not to use**

- Do not mirror secrets, tokens, or sensitive code into `docs/` (`docs/reference/processes/secrets.md`, `docs/reference/tools/github.md`).

**Normalize into**

- `docs/reference/engineering/ai-first-repo-standards.md`
- `docs/reference/processes/decision-log.md`
- Future focused pages such as CI health when you add them.

**Upstream references**

- [GitHub MCP Server repository](https://github.com/github/github-mcp-server)
- [Install GitHub MCP in Cursor](https://raw.githubusercontent.com/github/github-mcp-server/main/docs/installation-guides/install-cursor.md)

---

## Slack MCP

**Primary capabilities (category-level):**

- Search across the workspace (messages, files, channels, members, depending on workspace policy).
- Read thread/channel context and send messages where permitted.
- Work with Slack canvases and member/profile context (per Slack MCP overview).

**When to use**

- Recovering **decision context**, blockers, and timelines not yet in `docs/`.
- Drafting summaries that will be **confirmed** and written to `docs/reference/processes/decision-log.md`.

**When not to use as policy**

- Slack is **not** canonical policy by default; cite channel and date, then normalize (`docs/reference/tools/slack.md`).

**Normalize into**

- `docs/reference/processes/decision-log.md`
- `docs/how-to/run-weekly-pod-operating-rhythm.md` (when updating cadence notes)

**Upstream references**

- [Guide to the Slack MCP server](https://slack.com/help/articles/48855576908307-Guide-to-the-Slack-MCP-server)
- [Connect Slack MCP to Cursor](https://docs.slack.dev/ai/slack-mcp-server/connect-to-cursor)

---

## Google Workspace MCP (`workspace-mcp`)

**What it covers in this Pod setup**

- **Drive:** List/search files, read content (including common Workspace formats), folder operations at higher tool tiers.
- **Calendar:** Calendars, events, and (depending on tier) free/busy and management tools.
- **Gmail:** Search and read messages; sending and label management appear at broader tiers and may conflict with **read-only** mode.
- **Sheets / Slides:** Read and edit operations per enabled tools and tiers.

**Configuration knobs (conceptual)**

- `--tools` selects services (for example `drive`, `calendar`, `gmail`, `sheets`, `slides`).
- `--tool-tier` (`core` / `extended` / `complete`) controls how many tools per service are exposed.
- `--read-only` restricts to read-oriented behavior and scopes where supported.

**When to use**

- Ingesting **specs, decks, and operational artifacts** into `docs/reference/` or `docs/explanation/`.
- Calendar **cadence and milestone** context for `docs/reference/team/operating-cadence.md` and related pages.
- Email only when policy allows and summaries are appropriate (avoid pasting full threads into broad reference pages).

**When not to use**

- Do not copy **full mail threads** or sensitive attachments verbatim into general docs (`docs/reference/tools/google-workspace.md`).

**Normalize into**

- `docs/reference/team/pod-metrics.md`
- `docs/explanation/pod-operating-model.md`
- Topic-specific reference pages with source link and retrieval date.

**Upstream references**

- [Google Workspace MCP (workspace-mcp)](https://github.com/taylorwilsdon/google_workspace_mcp)

---

## Decision quick-reference: which MCP for what?

| Need | Prefer |
|------|--------|
| Epic/sprint/status, Jira truth | Atlassian MCP → then normalize to docs |
| PR/issue/repo history | GitHub MCP → then normalize to docs |
| Informal decisions, blockers, timelines | Slack MCP → **confirm** → decision log |
| Specs in Drive, slide decks, sheets | Google Workspace MCP → normalized reference pages |
| **Authoritative policy/process** | **`docs/`** after human review; MCP is input only |

## Related docs

- `docs/reference/mcp-strategy.md` — reliability pattern and governance
- `docs/reference/tools/tooling-integration-matrix.md` — broader tool inventory (including non-MCP systems)
- `docs/how-to/troubleshoot-mcp-connectivity.md` — failures and fallbacks
- `docs/how-to/ingest-tool-knowledge-into-docs.md` — how to turn MCP output into markdown
