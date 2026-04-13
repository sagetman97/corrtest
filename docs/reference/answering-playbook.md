# Chat Answering Playbook

Use this playbook to keep answers reliable when using Cursor Chat.

## Standard Answer Flow

1. Locate relevant docs in `docs/`.
2. Extract only the facts needed to answer the question.
3. Respond with concise answer plus referenced file paths.
4. If required facts are missing, state the gap and propose a doc update.

## Confidence Labels

- High: Directly supported by current docs.
- Medium: Partially supported; one or more assumptions.
- Low: Minimal or no direct support; needs validation.

## Non-Negotiables

- Do not invent policy, access, compliance, or org facts.
- Prefer explicit uncertainty over plausible speculation.
- Update docs after repeated unanswered questions.
