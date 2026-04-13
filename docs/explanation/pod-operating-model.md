# AI Pod Operating Model (3-6 Month Builds)

## Purpose

Define how the new Polly Pod runs fast, learns quickly, and ships safely.

## Team Shape

- AI Solutions Manager (player-coach: product + engineering)
- AI Engineer (core implementation owner)
- 2-3 additional contributors (engineering, design, domain, or data)

## Delivery Cadence

- 1-week discovery spikes
- 2-week build iterations
- Monthly milestone reviews
- 90-day outcome checkpoint

## Product Lifecycle Template

1. Problem framing and success metric definition.
2. Feasibility spike (data, model, workflow, UX assumptions).
3. Prototype and internal user validation.
4. Hardening for pilot (security, monitoring, QA).
5. Pilot run and go/no-go decision.

## AI-First Engineering Principles

- Build thin vertical slices early.
- Prefer measurable experiments over abstract debate.
- Keep prompt, model, and evaluation assets versioned with code.
- Instrument quality and latency from day one.
- Document decisions immediately in markdown.

## Knowledge Management Standard

- Every milestone creates/updates:
  - one reference page,
  - one how-to/runbook,
  - and one decision note.
- Cursor Chat answers should cite these pages.

## Risks to Actively Manage

- Scope bloat in early cycles.
- Over-optimization before product signal.
- Weak evaluation causing false confidence.
- Tooling sprawl without canonical documentation.
