# How to Run a Model Evaluation Cycle

## Purpose

Maintain quality and reliability for AI product behavior during rapid delivery.

## Frequency

- At least once per sprint for active initiatives.
- Before pilot and before major release decisions.

## Steps

1. Define evaluation scope and target behaviors.
2. Select representative test set and edge cases.
3. Run baseline and candidate comparisons.
4. Record pass/fail against thresholds.
5. Document regressions and mitigation plans.
6. Decide ship/hold with explicit rationale.

## Required Outputs

- Updated metrics in `docs/reference/team/pod-metrics.md`
- Decision entry in `docs/reference/processes/decision-log.md`
- Runbook updates if failure modes changed

## Guardrails

- Do not rely on anecdotal spot checks only.
- Keep evaluation artifacts versioned with code and prompts.
