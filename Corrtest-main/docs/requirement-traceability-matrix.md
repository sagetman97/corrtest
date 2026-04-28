# AI Correspondent Requirement-to-Screen Traceability

## Scope

- Project: `Corrtest-main` UX redesign (frontend-only prototype phase)
- Requirement source: `docs/AI Correspondent Execution & Settlement Layer (1).docx`
- UX rule source: `docs/reference/ux-guidelines-figma-master-ai.md`

## Trace Matrix

| Requirement | UX Coverage Route(s) | Component/Pattern Coverage | Status |
|---|---|---|---|
| API-first buyer pricing model | `/pricing/buyer-api-config` | `PInput`, `PSelect`, `PTabset`, `PCard` | Covered |
| Base price + dynamic marks | `/pricing/base-pricing-marks` | `PDataTable`, KPI cards, action buttons | Covered |
| LLPA/SRP grid + cash-flow logic surface | `/pricing/llpa-srp-workspace` | Table + workflow card states | Covered |
| Eligibility and rule updates | `/pricing/eligibility-rules` | Rule-group oriented table + status states | Covered |
| Best-efforts execution flow | `/execution/best-efforts` | Workflow table + action controls | Covered |
| Mandatory execution flow | `/execution/mandatory-bid` | Bid tape table + status progression | Covered |
| Agentic buyer/seller opportunity matching | `/execution/opportunity-discovery` | Opportunity queue + confidence semantics | Covered |
| Market-making style controls | `/execution/market-making-controls` | Constraint profile table + policy cards | Covered |
| Pipeline marks and hybrid best-efforts early pricing | `/execution/pipeline-marks` | Reserve spread and pipeline mark workspace | Covered |
| Shadow bidding with approval nuance | `/execution/shadow-bidding` | Simulated bid scenarios and approval-state rows | Covered |
| Delivery package handling | `/settlement/delivery-inbox` | Intake queue and completeness states | Covered |
| Conditioning loops | `/settlement/conditioning-workspace` | Condition queue + escalation states | Covered |
| Clearing queue management | `/settlement/clearing-queue` | Queue table with hold/clear state | Covered |
| Purchase advice | `/settlement/purchase-advice` | Advice queue + approval states | Covered |
| Cash settlement progression | `/settlement/cash-monitor` | Settlement variance monitoring table | Covered |
| Operational compliance (ULDD/docs/fraud/QC) | `/settlement/operational-compliance` | Compliance exception table + QC states | Covered |
| Purchase reconciliation and price adjustments | `/settlement/reconciliation-adjustments` | Snapshot delta and adjustment workflow table | Covered |
| Servicing onboarding integrations | `/settlement/servicing-onboarding` | Transfer handoff and payment-date readiness UX | Covered |
| Custodial workflows (E-Notes/MERS) | `/settlement/custodial-tracking` | Custody trail table and exception states | Covered |
| Post-closing performance monitoring | `/settlement/post-closing-performance` | EPO/EPD/recapture monitoring panel | Covered |
| Buyer/seller directories and approvals | `/counterparties/buyers`, `/counterparties/sellers`, `/counterparties/approval-relationships` | Directory and relationship table patterns | Covered |
| LOS/Doc/Fraud/Servicing endpoint mapping | `/integrations/mappings` | Integration table + health states | Covered |
| Analytics execution/margin/share/SLA views | `/analytics/*` | `PChartCard` + chart palette semantics | Covered |
| Rule templates/roles/policies admin surfaces | `/admin/*` | Admin pages with table/state patterns | Covered |
| Monetization model exploration (buyer/seller per-loan economics) | `/admin/monetization-model` | Monetization scenario table + KPI model | Covered |

## Accessibility and Responsive Coverage

- Focus-visible ring standardized in `src/styles/theme.css`.
- Keyboard-accessible navigation, skip-link, and semantic sectioning in app shell.
- Responsive layout patterns:
  - KPI grids collapse to 2 or 1 columns based on viewport.
  - Table containers use horizontal scroll for dense financial grids.
  - Actions wrap for small-width devices.

## Deferred UX Ledger

| Deferred Item | Reason | Planned Follow-up |
|---|---|---|
| Full modal-based multistep flow choreography | Kept this phase lightweight for route breadth | Add modal-driven workflow wizards in next UX sprint |
| Live data refresh and optimistic reconciliation states | Out of UX-only scope (backend-coupled) | Implement when API contracts are finalized |
| Role-aware field-level permissions | Needs final IAM policy model | Add authorization matrix and hidden/disabled state rules |
| End-to-end validation logic for complex LLPA/SRP formula authoring | Requires domain compute engine | Introduce formula editor with validation DSL |
| Cross-screen breadcrumbs and saved filters persistence | Requires shared app state/store decisions | Add route-level state persistence pass |
| AI NLP eligibility-edit assistant with explainability transcript | Requires prompt/risk framework and policy constraints | Add guided copilot drawer with audited action log |
| Process-guarantee score to increase buyer/seller trust | Needs measurable SLA + QC policy definition | Add trust score computation and scorecard visuals |

## Completion Statement

This prototype baseline now includes all required domain surfaces, route IA, adapter patterns, chart/table standards, and accessibility-first shell behavior for UX-level validation. Remaining items are explicitly deferred due to backend or policy dependency.
