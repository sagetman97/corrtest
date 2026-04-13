# Source Tiering and Reliability (Company Materials)

## Purpose

Define which company-source folders should be treated as current, historical, or
restricted context for Cursor answers and documentation updates.

## Tier Model

### Tier 1: Canonical Current

Use by default for factual answers and planning.

- `docs/reference/**`
- `docs/how-to/**`
- `docs/explanation/**`
- `docs/reference/company/orgchart.md`

### Tier 2: Current Working Inputs (Needs Normalization)

Useful for active strategy context, but should be normalized into reference docs
before being treated as canonical.

- `docs/GTM -20260413T175856Z-3-001/**`

### Tier 3: Historical / Non-Default

Do not use by default in answers unless user explicitly asks for historical
context.

- `docs/(DNU) ARCHIVED sales collateral/**`

## Answering Rules

- Prefer Tier 1 first.
- Use Tier 2 to enrich or update Tier 1 docs.
- Use Tier 3 only when explicitly requested or when comparing historical vs
  current positioning.
- If Tier 2 or Tier 3 are used, explicitly label confidence and document age.

## Update Policy

- Promote high-value Tier 2 facts into Tier 1 reference docs.
- Keep Tier 3 assets untouched; create separate summary/reference pages instead
  of editing archived files.
