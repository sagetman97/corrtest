# How to Convert a PDF into Retrieval-Friendly Docs

## Purpose

Turn PDFs (like org charts or policy documents) into markdown that Cursor Chat
can reference accurately.

## Recommended Workflow

1. Keep original PDF in repository root or `docs/sources/`.
2. Extract text into markdown sections.
3. Split into multiple topic-focused markdown files.
4. Add metadata (owner, source, last reviewed, confidence).
5. Link each derived file back to the source PDF path.

## Authoring Guidance After Extraction

- Use one topic per file.
- Add clear headings for teams, processes, or systems.
- Remove visual noise from slides/PDF layout artifacts.
- Keep tables only when they are factual and stable.

## Validation Checklist

- Is every critical claim backed by a source?
- Are uncertain details marked as unverified?
- Is terminology aligned with `docs/glossary.md`?
