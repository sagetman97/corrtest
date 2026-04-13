# Polly Knowledge Base

This repository is a documentation-first workspace for your new role at Polly.
Its primary purpose is to make Cursor Chat a reliable "answer engine" that
references local documentation and responds with grounded, auditable answers.

## Primary Goals

- Keep operational/company knowledge in versioned Markdown.
- Make docs easy for humans to browse and easy for AI to retrieve.
- Build a repeatable structure so new notes stay consistent over time.
- Prefer source-grounded answers over memory-based guesses.

## Recommended Usage in Cursor Chat

1. Ask questions directly in chat.
2. When needed, point chat at specific files using `@docs/...`.
3. Ask for citations to exact files used in the answer.
4. If information is missing, ask chat to create a draft doc stub.

## Repository Structure

- `docs/`: Main knowledge base (Diataxis structure + shared references).
- `.cursor/rules/`: Project rules that steer chat behavior in this workspace.
- `AGENTS.md`: Simple top-level instructions for agent behavior.

Read `docs/index.md` to start navigating the knowledge base.

## Why This Layout Works

- Diataxis separates learning docs, task docs, facts, and conceptual context.
- Consistent Markdown structure improves readability and retrieval quality.
- Cursor rules provide persistent guidance so answers stay consistent.

## Next steps

1. Open `docs/index.md` and bookmark `docs/reference/company/source-tiering-and-reliability.md` (canonical vs planning vs archived sources).
2. For org structure, use the canonical chart at `docs/reference/company/orgchart.md` (summary pointer: `docs/reference/people/org-chart.md`).
3. Keep `docs/glossary.md` aligned with terms you add elsewhere.
4. Extend tool and process coverage under `docs/reference/tools/` and `docs/how-to/` as you learn.

Refine continuously from real questions in chat; promote stable facts from Tier 2 inputs into Tier 1 reference pages per `docs/how-to/promote-gtm-inputs-to-canonical-docs.md`.

## Development

- `requirements.txt`: Python packages for maintenance scripts (collateral extraction, org chart OCR).
- `CONTRIBUTING.md`: conventions for extending this repo and running markdown lint.

## Core Operating Docs

- `docs/reference/knowledge-operations-framework.md`
- `docs/reference/chat-usage-guide.md`
- `docs/reference/documentation-quality-checklist.md`
- `docs/reference/processes/knowledge-ingestion-pipeline.md`
- `docs/reference/processes/pod-intake-and-scoping.md`
- `docs/reference/mcp-strategy.md` and `docs/reference/mcp-capabilities-and-usage.md` (MCP connectors vs canonical `docs/`)
