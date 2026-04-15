# Documentation Change Log

## Purpose

Track major structural and standards changes to this knowledge base.

## Entries

### 2026-04-13 (MCP agent guidance)

- `AGENTS.md`: MCP section (canonical `docs/`, normalize-and-cite pattern, pointers to
  strategy/capabilities/troubleshooting, no secrets in repo).
- `.cursor/rules/mcp.mdc` (`alwaysApply`): same expectations for every chat.
- `docs/how-to/configure-cursor-for-polly-docs.md`: lists `mcp.mdc` in core setup.

### 2026-04-13 (repo hygiene)

- Portable repo roots in `scripts/*.py` (derive from `__file__`).
- Added `requirements.txt` for Python tooling; expanded `.gitignore` for virtualenvs.
- PPTX extraction in `extract_collateral_summary.py`: zip/XML fallback when `python-pptx` fails.
- Root `README.md` next-steps aligned with org chart location and tiering.
- `chat-usage-guide.md` and `data-handling-and-classification.md`: Tier 2/3 distribution cautions.
- Added `CONTRIBUTING.md` and GitHub Action `markdownlint` on `**/*.md` (excludes `.cursor/` and generated `collateral-extract-notes.md`).
- Relaxed `.markdownlint.json` with `MD034`/`MD036`/`MD060` disabled to match existing authored tables and links.

### 2026-04-13

- Established Diataxis-aligned documentation structure.
- Added Cursor rule set for grounded answers and maintenance loop.
- Added Pod operating model, intake process, and scorecard framework.
- Added tool integration matrix and core tool profile pages.
- Added knowledge operations, lifecycle, and alignment governance docs.
- Added source-tiering docs for GTM and archived collateral folders.
- Added collateral extraction notes and GTM snapshot reference pages.
- Updated org chart reporting fixes (Olivia Bumb branch and Dennis/Ethan/Wendy subtree).
- Refreshed `docs/reference/mcp-strategy.md` for the current Atlassian, GitHub, Slack, and Google Workspace MCP stack.
- Added `docs/reference/mcp-capabilities-and-usage.md` with capability summaries, when-to-use guidance, and upstream links; cross-linked from index, reference README, configure-cursor how-to, tool profiles, and matrix.
- Expanded `.gitignore` to reduce accidental commit of local MCP config copied into the repo.
