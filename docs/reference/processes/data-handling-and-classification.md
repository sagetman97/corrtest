# Data Handling and Classification

## Metadata

- Owner: Security + Engineering
- Last reviewed: 2026-04-13
- Confidence: Medium

## Purpose

Set baseline handling expectations for data used by Pod products and docs.

## Classification Levels

- Public: Safe for broad sharing.
- Internal: Company-use data with normal controls.
- Sensitive: Restricted business/customer/security content.
- Restricted: Highly controlled data with explicit approval requirements.

## Handling Rules

- Store only needed data for each workflow.
- Keep sensitive/restricted data out of broad markdown docs.
- Use summarized or anonymized outputs where possible.
- Record source and processing date for derived datasets.

## AI Workflow Rules

- Do not send restricted data to unapproved external services.
- Validate retention and access controls before ingestion.
- Document approved/denied data pathways per initiative.

## Knowledge base folders (this repo)

- `docs/GTM -20260413T175856Z-3-001/**` and `docs/(DNU) ARCHIVED sales collateral/**`
  may contain **internal** or **sensitive** business content. Use them for
  Cursor work inside approved environments; **do not** treat them as safe to
  redistribute. Prefer summarized or redacted **Tier 1** pages in
  `docs/reference/**` when sharing outward.
