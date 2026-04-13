# How to Ingest Tool Knowledge into Docs

## Purpose

Convert tool data into stable markdown knowledge that Cursor Chat can trust.

## Steps

1. Identify question/problem to support.
2. Pull source data from MCP/API/export.
3. Filter to facts relevant to decisions or operations.
4. Write normalized markdown page in correct section.
5. Add metadata: owner, source, date, confidence.
6. Link related docs and glossary terms.
7. Add or update index/README pointers if the page is core.

## Validation

- Facts map to source data.
- Page is single-topic and scannable.
- Sensitive information is excluded.

## Common Mistakes

- Dumping raw export logs into docs.
- Omitting owner/review metadata.
- Keeping key decisions only in chat threads.
