# Corrtest-main Baseline Audit (Keep/Replace/Remove)

## Scope

- Audit target: `src/app/**`
- Purpose: establish controlled migration from Figma-export baseline to AI Correspondent UX architecture.
- Date: 2026-04-27

## Current Architecture Snapshot

- Shell: single layout with left nav + routed main panel (`src/app/App.tsx`).
- Routing: 8 flat top-level routes (`/`, `/product-pricing`, `/loan-trading`, `/analytics`, `/ai-insights`, `/integrations`, `/admin`, `/support`).
- Data model: page-local hardcoded arrays in each route file.
- Component model:
  - Local custom components: `Navigation`, `DataTable`, `PageHeader`, `StatCard`, `StatusBadge`, etc.
  - Extensive `components/ui/*` primitives available but inconsistently used.
- Styling:
  - CSS variable theme in `src/styles/theme.css`.
  - Many ad hoc style literals and non-semantic color constants in components/pages.

## Keep / Replace / Remove Matrix

## Keep (retain with light edits)

- `src/app/components/Icon.tsx`
  - Reason: practical icon abstraction already used app-wide.
- `src/app/components/PollyLogo.tsx`
  - Reason: brand mark abstraction can continue in shell/header.
- `src/styles/index.css`
  - Reason: centralized style entrypoint; keep import chain.

## Replace (migrate to new architecture/components)

- `src/app/App.tsx`
  - Replace with grouped domain routing + centralized route config.
- `src/app/components/Navigation.tsx`
  - Replace with IA-aligned grouped navigation and route metadata consumption.
- `src/app/components/DataTable.tsx`
  - Replace with typed DS-compliant table adapter.
- `src/app/components/StatusBadge.tsx`
  - Replace with semantic status mapping and token-based styles.
- `src/app/components/PageHeader.tsx`
  - Replace with standardized page scaffold pattern.
- `src/app/components/StatCard.tsx`
  - Replace with DS-compliant KPI card.
- Existing page modules under `src/app/pages/*`
  - Replace with domain-oriented pages for Infrastructure/Execution/Settlement and related modules.

## Remove (after migration)

- Legacy route pages not in target IA:
  - `src/app/pages/ProductPricing.tsx`
  - `src/app/pages/LoanTrading.tsx`
  - `src/app/pages/AIInsights.tsx`
  - `src/app/pages/Support.tsx`
- Any duplicated ad hoc style or color constants superseded by tokenized adapters.

## Migration Order

1. Foundation/token hardening.
2. Adapter component layer introduction.
3. Shell + route IA swap.
4. Domain page migrations.
5. Chart/table standardization and state coverage.
6. Accessibility and responsive hardening.
7. Requirement traceability closeout.

## Risks Observed in Baseline

- Weak typing (`any`) in table and renderers.
- No centralized route metadata for IA growth.
- Inconsistent component usage despite broad UI primitive inventory.
- Inline style literals increase drift risk from UX guideline.

## Exit Criteria for Baseline Phase

- This audit file exists and is accepted as migration source.
- Every legacy component/page is classified Keep/Replace/Remove.
- Migration order is fixed and referenced by subsequent implementation commits.
