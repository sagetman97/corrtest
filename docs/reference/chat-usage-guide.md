# Cursor Chat Usage Guide for Polly Knowledge

## Purpose

Define default prompting and interaction patterns so answers stay grounded and
useful.

## Default Query Pattern

Use prompts that request:

- explicit source use from `docs/`,
- concise answer,
- file-path citations,
- and gap identification if data is missing.

## Recommended Prompt Forms

- "Answer from `docs/reference` and cite files."
- "Compare these two process docs and list conflicts."
- "If missing info, draft the missing page in the correct folder."
- "Return confidence level and what would increase confidence."

## Verification Pattern

For high-impact questions:

1. Ask for citations.
2. Ask for uncertainty callouts.
3. Ask for next doc updates to close gaps.

## Source-Tiering Pattern

- Prefer canonical reference docs first.
- Use GTM materials as current planning context when canonical docs are missing.
- Use `(DNU) ARCHIVED sales collateral` only for historical comparisons or when
  explicitly requested.
- Label historical or potentially stale claims clearly.

## Distribution and confidentiality (Tier 2 / Tier 3)

- Treat GTM and archived folders as **internal working or historical** material;
  they may include pricing, roadmap, or customer-facing language.
- **Do not** paste verbatim excerpts into external email, customer chats, or
  public posts. Summarize only what is appropriate for the audience, or point
  readers to **Tier 1** docs that have been reviewed for that purpose.
- For classification detail, see `docs/reference/processes/data-handling-and-classification.md`.

## Anti-Patterns

- Asking for policy-level answers without source references.
- Accepting confident answers with no citations.
- Leaving repeated unanswered questions undocumented.
