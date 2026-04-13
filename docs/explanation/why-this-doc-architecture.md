# Why This Documentation Architecture

## Design Principles

This repository structure is designed for two audiences at once:

- Humans who need to learn and execute work quickly.
- AI assistants that retrieve facts from markdown and answer questions.

## Key Choices

### Diataxis-Based Structure

We separate content into tutorials, how-to guides, reference, and explanation.
This reduces mixed-intent documents and improves both navigation and retrieval.

### Retrieval-Friendly Markdown

We use one H1 per file, clear heading hierarchy, and topic-focused sections.
This improves chunk quality for retrieval and keeps answers traceable.

### Persistent Agent Guidance

Rules in `.cursor/rules/` and instructions in `AGENTS.md` keep assistant output
grounded in repository content over time.

## Operational Benefits

- Faster onboarding for new topics.
- Fewer contradictory docs.
- Higher confidence in chat answers.
- Easier identification of documentation gaps.
