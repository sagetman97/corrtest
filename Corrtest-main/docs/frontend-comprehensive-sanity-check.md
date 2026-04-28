# Corrtest Frontend Comprehensive Sanity Check

Last reviewed: 2026-04-27

## Scope

- Product flow/requirements check against `docs/AI Correspondent Execution & Settlement Layer (1).extracted.txt`
- Design-system parity check against `ui-components-main` component and type contracts
- Figma principle compliance check against `docs/reference/ux-guidelines-figma-master-ai.md`

## 1) Product Flow and Requirement Coverage

## What is covered

- Core IA now includes end-to-end surfaces for:
  - Infrastructure (`buyer-api-config`, `base-pricing-marks`, `eligibility-rules`, `llpa-srp-workspace`)
  - Execution (`best-efforts`, `mandatory-bid`, `opportunity-discovery`, `market-making-controls`)
  - Settlement (`delivery-inbox`, `conditioning`, `clearing`, `purchase-advice`, `cash-monitor`)
  - Extended workflows from extracted requirements:
    - `pipeline-marks`
    - `shadow-bidding`
    - `operational-compliance`
    - `reconciliation-adjustments`
    - `servicing-onboarding`
    - `custodial-tracking`
    - `post-closing-performance`
    - `monetization-model`

## Edge-case UX behavior added

- Table-level edge states: loading, empty, error, default.
- Simulated read-only mode for workflow controls.
- Success/failure messaging via toasts.
- Confirmation modal for workflow execution actions.
- Pagination footer pattern integrated into table scaffold.

## Remaining high-value product UX gaps (intentionally deferred)

- Multi-step guided lock-to-settlement wizard with checkpoint memory.
- Persona/policy-aware route guards and field-level permission states.
- Explainability panel tying AI recommendations to evidence traces.
- Scenario save/restore with comparative diff for pricing and execution decisions.

## 2) `ui-components-main` Parity Check

## Components reviewed for parity

- Types/contracts reviewed:
  - `types/button.ts`
  - `types/input.ts`
  - `types/select.ts`
  - `types/table.ts`
  - `types/modal.ts`
  - `types/toast.ts`
  - `types/tabs.ts`
  - `types/navigation.ts`
- Component behavior/style references reviewed:
  - `components/button/PButton.vue`
  - `components/input/PInput.vue`
  - `components/table/PTable.vue`
  - `components/modal/PModal.vue`
  - `components/toast/PToastArea.vue`

## Alignment improvements implemented

- `PButton`:
  - moved to semantic variants closer to source (`primary`, `accent`, `error`, `ai`, `aiLight`)
  - added parity-like flags (`isLoading`, `loadingText`, `expand`)
  - support for `text` and `lite` behavior
- `PInput`:
  - added `variant` (`default`/`simple`)
  - added `readOnlyState` and `highlighted`
- `PSelect`:
  - added `variant` (`default`/`simple`/`minimal`)
  - added `readOnlyState`
- `PDataTable`:
  - added alignment/freeze options per column
  - added empty title/message, loading, error states
  - added footer slot and row click callback
  - added compact/default variant hook
- `PModal`:
  - added size model and AI/default variant
  - added optional back action and close-control behavior

## Parity status

- Strong conceptual parity (semantics/states/props model) is now in place.
- Not a full 1:1 implementation parity:
  - Vue slot-level flexibility and utility composables are intentionally not replicated.
  - This remains a React adapter strategy, not framework-level cloning.

## 3) Figma Principles Compliance Check

## Areas validated and improved

- Tokens:
  - spacing/radius/shadow/focus usage remains tokenized through theme layer.
- State model:
  - explicit default/loading/empty/error/read-only handling now demonstrated in-workflow.
- Component conventions:
  - `p-*` adapter families expanded and exercised via real routes.
- Chart semantics:
  - chart series switched to semantic chart variables (`--chart-1`, `--chart-projection`, `--chart-2`) instead of hardcoded values.
- Accessibility:
  - focus-visible behavior already enforced globally and preserved in new controls.

## Added quality harness

- New route `admin/adapter-showcase` serves as a parity/state verification surface for:
  - button variants and loading behavior
  - input/select field state examples
  - modal + toast behavior

## Risk notes

- Some UX constraints in Figma exports are still represented at principle level (due export ambiguity).
- A stricter token lint rule set (stylelint/design-token linting) is still recommended for long-term enforcement.

## Recommended Next Iteration

1. Add route-level persona simulation (`buyer`, `seller`, `settlement-ops`) with dynamic control availability.
2. Add dedicated AI explainability drawer component with source evidence mapping.
3. Add saved scenario compare experience for pricing/mandatory bid/reconciliation views.
4. Add Cypress-like interaction checks for keyboard flows (modal trap, tab order, row actions).
