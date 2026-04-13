# How to Extract Org Chart Data from PDF (OCR Workflow)

## Purpose

Convert image-based org chart PDFs into searchable markdown for reliable chat
answers.

## When to Use

- Direct text extraction from PDF returns little or no content.
- Org chart is embedded as an image or flattened graphic.

## Workflow

1. Keep source file in repository root or `docs/sources/`.
2. Run OCR using a trusted tool approved by your environment.
3. Export OCR output to plain text or markdown.
4. Clean names, roles, and reporting lines.
5. Normalize into `docs/reference/people/org-chart.md`.

## Normalization Format

| Person | Role | Team | Reports To | Confidence | Last Verified |
| --- | --- | --- | --- | --- | --- |
| Name | Title | Team | Manager | High/Medium/Low | YYYY-MM-DD |

## Validation Checklist

- Spot-check 10+ entries against source visual.
- Mark uncertain text as unverified.
- Record OCR tool and extraction date.
- Update `docs/reference/processes/decision-log.md` if org changes affect plans.
