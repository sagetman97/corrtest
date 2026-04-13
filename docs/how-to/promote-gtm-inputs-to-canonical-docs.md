# How to Promote GTM Inputs to Canonical Docs

## Purpose

Convert GTM working files into stable documentation that Cursor can safely use as
default answer context.

## Inputs

- `docs/GTM -20260413T175856Z-3-001/**`
- `docs/reference/company/collateral-extract-notes.md`

## Steps

1. Identify high-impact facts (pricing, ownership, launch process, dependencies).
2. Confirm freshness (date, owner, and whether decision is still valid).
3. Normalize into Tier 1 docs under:
   - `docs/reference/company/`
   - `docs/reference/processes/`
   - `docs/reference/team/`
4. Add source citation back to the original GTM file path.
5. Mark superseded GTM statements as historical if no longer valid.

## Quality Gate

- Canonical page has owner, last reviewed, source, and confidence metadata.
- Contradictions with existing reference docs are resolved before publishing.
- Archived collateral is not used as sole authority for current claims.
