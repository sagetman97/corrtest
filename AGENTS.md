# Polly Repository Instructions

## Mission

Use this repository as the source of truth for Polly documentation and
question-answering support.

## Answering Behavior

- Prefer information from local files in `docs/`.
- Cite file paths used for important claims.
- If confidence is low, say what is unknown and propose where to document it.
- Do not invent policy details, org details, or process details.

## MCP integrations

- **`docs/` remains canonical** for grounded answers. MCP supplies live context
  from external systems (for example Jira, GitHub, Slack, Google Workspace); treat
  MCP output as **input** until it is normalized into markdown under `docs/`.
- For **which MCP to use**, **priority order**, and **safe handling**, follow
  `docs/reference/mcp-strategy.md` and
  `docs/reference/mcp-capabilities-and-usage.md`. For failures, see
  `docs/how-to/troubleshoot-mcp-connectivity.md`.
- **Pattern:** import via MCP when needed → **normalize** into `docs/` (source
  system, retrieval date, confidence) → **cite** those files in answers.
- **Never** commit secrets, tokens, or credentials from MCP or tool output. Do
  not treat informal channels (for example Slack) as authoritative policy
  without reflecting decisions in `docs/`.

## Documentation Standards

- Write in clear, concrete language.
- Keep one file focused on one topic.
- Include "Last reviewed" dates in critical operational documents.
- Cross-link related files to improve discoverability.

## Maintenance

- When asked a question that is not documented, create a draft in the right
  Diataxis section.
- Keep glossary terms synchronized with usage across documents.
