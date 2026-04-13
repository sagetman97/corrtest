# Contributing to the Polly knowledge base

This repository is **documentation-first**: changes should keep `docs/` accurate,
discoverable, and safe to cite in Cursor Chat.

## Before you edit

- Read `docs/reference/repository-map.md` for where topics belong.
- Follow `docs/reference/documentation-quality-checklist.md` for important pages.
- Respect source tiering in `docs/reference/company/source-tiering-and-reliability.md`
  (canonical reference vs GTM working inputs vs archived collateral).

## Style

- One main topic per file; use templates under `docs/templates/` when helpful.
- Prefer updating an existing canonical page over creating near-duplicates.
- Cross-link related pages and glossary terms (`docs/glossary.md`).

## Scripts

- Install dependencies: `pip install -r requirements.txt` (use a virtualenv).
- Collateral inventory: run from repo root — `python scripts/extract_collateral_summary.py`

## Markdown lint (optional)

From repo root (requires Node.js):

`npx markdownlint-cli2 "**/*.md" "!.cursor/**" "!docs/reference/company/collateral-extract-notes.md"`

(`collateral-extract-notes.md` is generated and may contain raw URLs and PDF artifacts.)

## Pull requests (when using Git)

- Describe what changed and why; note if Tier 1 canonical docs were updated or
  only Tier 2 inputs.
- Keep secrets and credentials out of markdown (`docs/reference/processes/secrets.md`).
