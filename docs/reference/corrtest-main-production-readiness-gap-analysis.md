# Corrtest-main Production Readiness Gap Analysis

Owner: AI Solutions + Engineering Pod  
Last reviewed: 2026-04-28  
Status: Draft reference (implementation planning)  
Primary requirements source: `docs/AI Correspondent Execution & Settlement Layer (1).extracted.md`  
Related references:
- `docs/reference/correspondent-ui-parity-ledger-corrtest.md`
- `Corrtest-main/docs/ai-correspondent-frontend-redesign-plan-v2.md`
- `docs/reference/ux-guidelines-figma-master-ai.md`

Confidence: High for frontend architecture and coverage findings; Medium-High for sequencing and target-state recommendations (backend contracts are not yet canonical in this repo).

## Purpose

Define what the application is supposed to do (from the requirements brief) versus what `Corrtest-main` currently does, then produce a detailed, implementation-ready plan to close the gap across:
- Capability coverage
- Functional behavior
- UX workflow and operator pipeline
- Structural/architectural frontend needs
- Adds/removes/deprecations

This document is intentionally detailed so it can be used as a backlog seed and design-review reference.

## Audit Scope

Reviewed artifacts:
- Product requirements: `docs/AI Correspondent Execution & Settlement Layer (1).extracted.md`
- Frontend codebase: `Corrtest-main/src/**` (routes, pages, components, data fixtures, shell, styles)
- Existing frontend planning docs:
  - `docs/reference/correspondent-ui-parity-ledger-corrtest.md`
  - `Corrtest-main/docs/ai-correspondent-frontend-redesign-plan-v2.md`

Out of scope:
- Backend repositories/services not wired into `Corrtest-main`
- Database, infra, and partner integration implementation details outside this repo

## Executive Finding

`Corrtest-main` is a strong UX prototype with broad information architecture coverage of the requirements brief, but it is not yet a functional operator-grade application. Most core actions are mock-driven and do not execute domain transactions, enforce controls, or persist outcomes.

In short:
- IA coverage: strong
- Workflow depth: partial
- Transactional functionality: mostly missing
- Governance/compliance controls: mostly visual, not enforced
- Production usability for real operators: not yet sufficient

---

## Pass 1: Capability Coverage (Requirements -> Frontend)

Legend:
- Covered: screen and interaction pattern materially present
- Partial: present conceptually but lacks required behavior/contracts
- Missing: not materially represented as actionable functionality

### Infrastructure Layer

1) Buyer API common format  
Status: Partial  
Evidence: `/pricing/buyer-api` (`src/app/pages/ux/routePages.tsx`)  
Gap:
- No typed request/response contract lifecycle
- No schema versioning/publish/rollback workflow
- No validation simulation beyond UX placeholders

2) Base price + LLPA + SRP, including cash-flow sensitivity  
Status: Partial  
Evidence: `/pricing/marks`, `/pricing/llpa-srp`, `src/app/components/pricing/LlpSrpDeferredCallouts.tsx`  
Gap:
- LLPA/SRP editing exists at UX level
- MSR/CF-dependent logic explicitly deferred
- No decomposition API traceability (base -> adjustments -> final)

3) CRA/spec/live bank axes  
Status: Partial  
Evidence: labels and context in pricing/trading surfaces  
Gap:
- Not a first-class filtering/simulation workflow
- No partner/source lineage model

4) Eligibility updates with quick reverse/rollback  
Status: Partial  
Evidence: `/pricing/eligibility`, workspace action controls  
Gap:
- No draft/publish/rollback object model
- No effective-date scheduling
- No approval gates or conflict detection

5) Mark-to-market replacement for static rate sheets  
Status: Partial  
Evidence: product language and marks surfaces  
Gap:
- No mark stream/subscription model
- No scheduled refresh/on-demand refresh contract
- No stale mark protection or confidence metadata enforcement

### Execution Layer

6) Automated best-efforts locking  
Status: Partial  
Evidence: `/trading/best-efforts`, trading augmentation components  
Gap:
- No transaction state machine (proposed/accepted/failed/retried)
- No idempotency semantics for lock actions

7) Automated mandatory bid desk + tape semantics  
Status: Partial  
Evidence: `/trading/mandatory-bid`, `/trading/shadow-bidding`  
Gap:
- No ingest-map-validate-submit flow
- No failure queue or rerun paths
- No commitment lifecycle persistence

8) Buyer/seller agents for opportunities and revenue deltas  
Status: Partial  
Evidence: `/trading/opportunities`, insights surfaces  
Gap:
- Recommendations are not policy-governed
- Explainability/lineage is mock-only
- No approve/reject feedback loop to model governance

9) Automated market making / dynamic margins  
Status: Partial  
Evidence: `/trading/market-making`, analytics contexts  
Gap:
- No optimization objective configuration persistence
- No guardrail enforcement event model

10) Pipeline marks and reserve-spread context  
Status: Partial  
Evidence: `/trading/pipeline-marks`, `PipelineMarksContextStrip.tsx`  
Gap:
- No canonical comparison to mandatory baseline
- No execution-threshold automation with approvals

### Settlement Layer

11) Delivery automation and condition lifecycle  
Status: Partial  
Evidence: `/settlement/delivery`, `/settlement/conditioning`, `/settlement/clearing`  
Gap:
- No delivery package state machine
- No condition assignment/resolution SLA engine

12) Purchase advice generation and transmission  
Status: Covered (UX), Partial (functionality)  
Evidence: `/settlement/purchase-advice`, purchase advice augmentation  
Gap:
- No durable PA versioning/sign-off
- No integration ack workflow

13) Cash settlement with master/sub escrow and release controls  
Status: Covered (UX), Partial (functionality)  
Evidence: `/settlement/cash`, `CashSettlementHubPage.tsx`  
Gap:
- Balances are mock
- Release approval is conceptual only
- No dual-control or hold-resolution flow

14) Reconciliation + adjustment explanation + wire/warehouse instructions  
Status: Partial  
Evidence: `/settlement/reconciliation`, reconciliation augmentation  
Gap:
- Diff views are illustrative
- No adjudication outcomes persisted
- No instruction generation contract

15) Compliance, servicing onboarding, custodial, post-close performance  
Status: Partial  
Evidence: dedicated routes exist across settlement tabs  
Gap:
- No normalized external result contracts
- No operational queue actions tied to outcomes

### Cross-Cutting

16) Roles, auditability, governance, monetization context  
Status: Partial  
Evidence: settings/admin/program pages  
Gap:
- Role displays are not hard-enforced
- Audit trails are placeholders
- Program/fee models not connected to transactional economics

---

## Pass 1: Frontend Architecture Assessment (Current State)

### Strengths

- Clear pillar-based route model with broad domain coverage (`src/app/App.tsx`)
- Good shell structure for operator workflows (`src/app/layouts/AppShell.tsx`)
- Reusable page scaffolding enables rapid expansion (`src/app/pages/ux/routePages.tsx`)
- Consistent visual primitives and token-driven styling (`src/styles/polly-ui-tokens.css`)
- Discoverability support via command-style search (`src/app/components/shell/GlobalSearchBar.tsx`)

### Hard Limitations

1) No real data integration layer
- Static fixtures dominate (`src/app/data/fixtures.ts`)
- No canonical API client/query layer

2) No authn/authz enforcement
- No login/session boundary
- No role-based route/action guards

3) No transactional durability
- Actions are mostly toast notifications and local state
- No mutation lifecycle (pending/success/fail/retry/idempotent)

4) No domain state model
- Shared context only handles drawer entity (`src/app/context/ShellContext.tsx`)
- No centralized domain-store patterns for cross-screen lifecycle

5) No production-grade observability in UI
- Mock lineage and audit statements
- No run/event identifiers attached to decisions

6) Testing gap
- No meaningful app-level automated test coverage for critical flows

---

## Pass 1: UX Workflow/Pipeline Readiness (End-User Usability)

The target experience is an operator pipeline: mark -> execute -> settle -> cash -> post-close.

Current usability constraints:
- Operators can navigate all stages, but cannot reliably complete end-to-end tasks.
- Context is visible, but actions do not produce authoritative system outcomes.
- High-risk operations (cash release, commitment, condition clearance) are not controlled by enforced workflows.

### Required End-to-End Pipeline (Target)

1) Pricing/Infrastructure pipeline
- Configure buyer API contract versions
- Run marks + eligibility + LLPA/SRP decomposition
- Publish guarded changes with rollback window

2) Execution pipeline
- Run BE and mandatory pathways with explicit transaction statuses
- Evaluate agent recommendations with explainability
- Commit, amend, and reconcile AOT/price adjustments

3) Settlement pipeline
- Ingest delivery package
- Generate/route conditions
- Produce purchase advice
- Reconcile variances
- Release cash via approval controls

4) Post-close pipeline
- Feed servicing/custodial systems
- Track performance signals and exception actions

At present, all four pipelines are represented conceptually but are not operationally complete.

---

## What To Remove, What To Keep, What To Change

### Keep

- Pillar IA and tabbed layouts (strong conceptual fit)
- Context drawer pattern
- Domain route breadth (good roadmap map)
- Prototype callouts where they prevent false precision

### Remove or Deprecate

1) Mixed prototype and production signaling in operator-critical views
- Remove "prototype-only" messaging from screens as they become transactional
- Keep a clear non-prod badge at environment level instead of per-action noise

2) Duplicate or drifting UI patterns
- Consolidate modal/table/nav variants where redundant (legacy drift risk)

3) Over-reliance on generic `WorkspacePage` for all domain screens
- Replace with archetype-specific views where operator decisions differ materially

### Structural/Design Changes Needed

1) Screen archetypes over generic templates
- Mission Control
- Pipeline Board
- Bid Desk
- Loan Command
- Delivery/Condition Command
- Reconciliation Diff
- Escrow Release Control
- API Contract Management

2) State machine visibility
- Every high-risk workflow shows explicit lifecycle states and blockers

3) Trust and provenance surfaces
- AI recommendations must show policy/model/snapshot IDs and confidence
- Document delivery and reconciliation must show source lineage

4) Role-aware UX
- Route, action, and data visibility controlled by role and counterpart context

---

## Functional Gaps by Domain Object (Must-Have Contracts)

Define these frontend contracts before deep UI rewrites:

1) `BuyerPricingRequest` / `BuyerPricingResponse`
- Includes base price, adjustments, eligibility outcomes, confidence, lineage

2) `EligibilityRuleSet`, `EligibilityOverride`, `RollbackEvent`

3) `MarkSnapshot`, `MarkRefreshEvent`, `StalenessPolicy`

4) `BidTapeSubmission`, `LoanBidResult`, `ShadowScenario`

5) `Commitment`, `AOTEvent`, `PriceAdjustmentEvent`

6) `DeliveryPackage`, `Condition`, `ConditionResolution`

7) `PurchaseAdvice`, `AdjustmentBreakdown`, `ApprovalTask`

8) `EscrowAccount`, `EscrowLedgerEntry`, `ReleaseApproval`

9) `ComplianceCheckResult`, `FraudSignal`, `QCOutcome`

10) `ServicingTransferEvent`, `CustodialEvent`, `PostCloseSignal`

Without these contracts, frontend parity work will continue to be cosmetic.

---

## Implementation Task Plan (Detailed, Sequenced)

### Task Group A: Foundation (P0)

1. Build frontend contract package (types + validators) for the ten core objects above.
2. Add API abstraction layer (read/write clients) and shared error model.
3. Add auth/session boundaries and route guards.
4. Add role-based action guards for settlement, admin, and approval actions.
5. Add mutation lifecycle framework (pending/success/fail/retry/cancel/idempotency token support).

Acceptance criteria:
- No high-risk action can execute without role check and mutation lifecycle state.
- Every domain action emits a local event record (at minimum for UI traceability).

### Task Group B: Infrastructure/Pricing (P1)

1. Rebuild buyer API config into lifecycle management (draft/publish/rollback/version compare).
2. Add eligibility override editor with precedence and expiration controls.
3. Add LLPA/SRP decomposition panel with explicit "model-backed" vs "estimate" status.
4. Add marks refresh controls (manual + scheduled metadata display).
5. Replace ambiguous static tables with object-centric records and status chips.

Acceptance criteria:
- Operator can produce an auditable pricing change and revert it safely.

### Task Group C: Execution (P2)

1. Implement BE lock flow state machine.
2. Implement mandatory bid tape ingest/map/validate/submit lifecycle.
3. Implement commitment and AOT timeline with amendment support.
4. Implement pipeline mark threshold workflows (approve/execute/hold).
5. Add agent recommendation governance panel (confidence + rationale + approval).

Acceptance criteria:
- Operator can execute a full "recommendation -> commitment" workflow with state trace.

### Task Group D: Settlement (P3)

1. Implement delivery package intake and condition generation states.
2. Implement condition assignment/clear/return loop with SLA timer badges.
3. Implement purchase advice generation and approval chain.
4. Implement reconciliation adjudication outcomes and instruction payload preview.
5. Implement escrow release queue with dual-control checks and hold resolution.

Acceptance criteria:
- Operator can move a package from delivery to approved cash release with complete traceability.

### Task Group E: Integration and Post-Close (P4)

1. Implement connector status model with ingest/error/retry lifecycle.
2. Add servicing onboarding event pipeline and status feedback.
3. Add custodial event timeline (e-note, MERS handoff markers).
4. Add post-close signal queue with actionability and owner assignment.

Acceptance criteria:
- Non-happy-path integration failures are visible and actionable in UI.

---

## Detailed UX Remediation Backlog (Design + Product + Engineering)

### A) Navigation and information architecture

- Keep top-level pillars but reduce operator click depth by elevating contextual tasks.
- Promote "current work" queues over static overview stats in primary surfaces.
- Add recent entities and pinned work objects (loan, tape, package).

### B) Workflow ergonomics

- Replace passive dashboards with actionable queue cards tied to workflow states.
- Standardize operator actions: assign, approve, reject, hold, rerun, escalate.
- Add uniform reason-code capture for approvals/rejections.

### C) Data representation quality

- Convert fixture-centric rows into domain object views.
- Show decomposition and reasoned explanations for pricing and reconciliation deltas.
- Distinguish hard failures from warnings, and warnings from recommendation-only flags.

### D) Trust/compliance UX

- Enforce visible approval chain on cash and commitment actions.
- Add immutable timeline cards for major decisions.
- Display provenance metadata consistently (policy/model/snapshot/source).

### E) Performance and usability

- Add server-driven pagination/sort/filter for large datasets.
- Preserve user filters/view presets across sessions.
- Add keyboard actions for high-frequency workflows.

---

## Sanity Check Pass 2 (Additional Missing Assumptions and Needs)

Second-pass review highlighted additional assumptions that must be explicitly handled to avoid delivery risk.

### Assumptions currently implicit (should be made explicit)

1) Partner integration availability
- Assumes buyer APIs, LOS, fraud systems, and servicing systems are available and stable.

2) Governance operating model
- Assumes who approves what (and at what thresholds) is already defined.

3) Data timeliness expectations
- Assumes acceptable staleness windows for marks and decisions are known.

4) Identity federation
- Assumes identity/tenant model for buyer/seller/operator separation.

5) Exception ownership
- Assumes ownership and SLA policy for unresolved conditions/reconciliations.

### Additional functionality likely needed but not currently modeled

1) Decision replay/audit export package for regulated workflows
2) Bulk operations (approve/assign/rerun) for high-volume desks
3) SLA breach escalation routing and reminders
4) Human override policy capture (who, why, duration)
5) Data quality scoring and confidence gating for agentic actions
6) Sandbox/simulation mode for config changes before publish
7) Runbook-linked error cards (from error to recovery steps)

### Additional design changes likely needed

1) Role-based home variants (buyer operator, seller operator, settlement manager, admin)
2) Consolidated "Work Queue" lens spanning all pillars for day-to-day operations
3) Side-by-side compare UX for before/after pricing and bid/reconcile states
4) Better progressive disclosure for advanced financial controls

---

## Recommended File-Level Change Targets in `Corrtest-main`

High-impact targets to start implementation:

1) `src/app/App.tsx`
- Add protected route boundaries and role-aware route availability.

2) `src/app/pages/ux/routePages.tsx`
- Break out generic workflow pages into domain-specific stateful containers.

3) `src/app/data/fixtures.ts`
- Keep for demo, but move to dedicated mock adapter behind contract interfaces.

4) `src/app/components/shell/ContextDrawer.tsx`
- Replace static prototype audit text with dynamic event/provenance rendering.

5) `src/app/pages/v2/CashSettlementHubPage.tsx`
- Add actionable release queue and approval workflow controls.

6) `src/app/components/settlement/PurchaseAdviceAugmentation.tsx`
- Add status/state progression and approval-task integration hooks.

7) `src/app/components/settlement/ReconciliationAdjustmentsAugmentation.tsx`
- Add adjudication action model and instruction output structure.

8) `src/app/components/trading/TradingDeskAugmentation.tsx`
- Add transaction states and failure/retry UX.

9) `src/app/components/shell/GlobalSearchBar.tsx`
- Expand from route search to entity/task search once contracts exist.

---

## Release Readiness Gates (Frontend)

Declare frontend functionally ready only when:

1) Every critical action has:
- Role check
- Approval policy check (if required)
- Mutation lifecycle with error handling
- Timeline/audit event

2) Every core workflow (mark -> execute -> settle -> cash) has:
- End-to-end happy path
- At least one non-happy-path recovery route

3) Every agentic recommendation has:
- Confidence
- Rationale
- Source lineage
- Human acceptance/rejection logging

4) Every settlement/cash action has:
- Dual-control where required
- Hold/release history
- Reconciliation trace

---

## Decision Requests for Pod Leads

To reduce ambiguity before implementation:

1) Approve canonical frontend contract-first approach (required before major UI rewrites).
2) Confirm role matrix and approval thresholds for settlement and execution actions.
3) Confirm whether Insights remains separate nav pillar or becomes embedded in Home/pillars.
4) Confirm whether prototype messaging should be centralized at environment level.
5) Confirm minimum viable integration set for design-partner usability.

---

## Next Update Procedure

When implementation begins:
- Update this doc section-by-section with status markers: Planned/In Progress/Done.
- Link to concrete PRs and route-level acceptance checks.
- Keep `Last reviewed` current and record unresolved unknowns.

---

## Demo-Only Deep Check (Frontend Experience and Flow)

Context: this section assumes the immediate goal is a coherent prototype demo, not production backend completeness.

Confidence: High for route continuity and UI flow findings; Medium-High for narrative-risk ranking (depends on presenter style and audience expectations).

### A) Recommended Demo Narrative Path (Click Order)

Primary story path:
1. `/home`
2. `/pricing/programs`
3. `/pricing/buyer-api`
4. `/pricing/marks`
5. `/trading/pipeline-marks`
6. `/trading/best-efforts` (or `/trading/mandatory-bid`)
7. `/settlement/delivery`
8. `/settlement/purchase-advice`
9. `/settlement/reconciliation`
10. `/settlement/cash`

Why this path:
- It cleanly demonstrates mark -> execute -> settle -> cash.
- It aligns best with current route strengths without relying on weaker/placeholder side paths.

### B) Critical Demo Blockers (Fix Before External Demo)

1) Missing explicit handoff CTAs between key stages  
Impact: presenter must manually navigate tabs, increasing risk of narrative break.  
Where: generic workspace pages (`Corrtest-main/src/app/pages/ux/routePages.tsx`), hub transitions.

2) Drawer action appears actionable but is effectively a no-op  
Impact: if clicked live, it can reduce confidence in interaction quality.  
Where: `Corrtest-main/src/app/components/shell/ContextDrawer.tsx` ("Open full command").

3) Prototype-disclaimer density in critical flow screens  
Impact: repeated "prototype/mock" strings can overshadow value story if shown in sequence.  
Where: multiple pages (pricing, trading, settlement, home, network).

### C) Medium Demo Gaps (Important, Not Showstoppers)

1) Label inconsistency across surfaces  
- "Trading" vs legacy "Execution"
- "Reconciliation" vs "Reconciliation & Adjustments"
- "Cash settlement" variants  
Risk: audience confusion during rapid navigation.

2) Search rescue coverage is incomplete  
- Command search indexes routes/workspaces but misses some settlement tabs.  
Where: `Corrtest-main/src/app/data/searchIndex.ts`.

3) Key trust-support screens are not integrated into primary script  
- `/network/approvals`
- `/network/integrations`  
Risk: harder to answer provenance/integration questions on the fly.

4) Top bar controls are responsive-hidden at narrower widths  
Where: `Corrtest-main/src/app/components/shell/AppTopBar.tsx`  
Risk: if demo resolution is small, expected controls may disappear.

### D) Same-Day Quick Wins for Demo Quality

1) Add "Next step" CTA cards on key pages:
- marks -> pipeline marks
- best-efforts/mandatory -> delivery
- purchase advice -> reconciliation
- reconciliation -> cash

2) Wire drawer footer button to a real destination (context-aware route).

3) Normalize route/page labels for the demo storyline (single naming convention).

4) Expand command search index to all settlement routes for live-demo recovery.

5) Add a compact step banner on key pages:
- `Mark -> Execute -> Settle -> Cash` with current stage highlighted.

### E) Demo Presenter Fallback Branches

Fallback A (if asked "how does AI justify recommendations?")
- Jump to `/insights/ai`, then return to `/trading/opportunities`.

Fallback B (if asked "how do we trust data and counterpart controls?")
- Jump to `/network/integrations` and `/network/approvals`, then resume settlement.

Fallback C (if asked "what happens when settlement fails?")
- Insert `/settlement/conditioning` before purchase advice.

### F) Pre-Demo QA Checklist (Run Every Time)

1) Route continuity
- Confirm every click in the primary path works with no dead-end controls.

2) Narrative integrity
- Confirm presenter can explain each transition in one sentence.

3) Content hygiene
- Hide/avoid screens with heavy mock disclaimers unless intentionally discussed.

4) Recovery readiness
- Verify command search can locate all key fallback routes.

5) Screen-size resilience
- Test demo at intended resolution and confirm top-bar actions remain accessible.

6) Timing sanity
- Complete full primary path in under 10 minutes without backtracking.

---

## Re-Audit Delta Addendum (New Findings Only)

Date: 2026-04-28  
Scope: third-pass cross-check of:
- `docs/AI Correspondent Execution & Settlement Layer (1).extracted.md`
- `Corrtest-main/src/**`
- this analysis document

Confidence: High for route and UX evidence; Medium-High for severity ranking.

### 1) Newly Identified Missing Demoable Functionality

1) Anonymous counterparty discovery and intro workflow is not represented.
- Requirement nuance: buyer agents should discover non-approved counterparties (anonymous first), then support intros.
- Current gap: opportunities exist, but no intro lifecycle (requested -> accepted -> connected).

2) "Not-approved buyer would have won" is not modeled as an actionable seller workflow.
- Requirement nuance: seller should see missed wins caused by approval gaps and trigger approval action.
- Current gap: opportunity and approvals are separate views; no bridge task object.

3) Per-loan BE vs mandatory comparator workflow is missing.
- Requirement nuance: seller agent should quantify delta between best efforts and mandatory for decisioning.
- Current gap: desk pages are separate; no single side-by-side decision artifact.

4) Two-sided market-making intent capture is incomplete.
- Requirement nuance: both buyer and seller margins + lifecycle commit timing should be captured.
- Current gap: controls are mainly unilateral and illustrative.

5) No explicit operator control for transition strategy (direct-to-investor vs Polly-mediated path).
- Requirement nuance: brief explicitly highlights hedge-advisor intermediation friction and transition approach.
- Current gap: acknowledged conceptually, not shown as selectable execution path in UX.

6) Seller-facing condition packet and agent-to-agent handoff thread is missing.
- Requirement nuance: seller receives conditions; buy/sell agents clear conditions collaboratively.
- Current gap: conditioning is mostly internal queue representation.

### 2) Newly Identified Demo Assumptions to Make Explicit

1) Assumes anchor design-partner status can be discussed without an in-app tracker object.
2) Assumes presenter can avoid accidental clicks on non-script controls during live demos.
3) Assumes profile-like pseudo-identities are acceptable without explicit disclosure thresholds.
4) Assumes production-readiness narrative despite mixed prototype/production signals.

### 3) Newly Identified UX Coherence Risks

1) Environment-state contradiction is severe:
- "Production/read-only" shell cues coexist with repeated "prototype/mock/UX-only" messaging.
- This causes trust ambiguity during external demos.

2) Counterparty and execution narratives remain fragmented:
- Network and trading pillars are not connected by a direct "act now" bridge from opportunity to approval/introduction.

3) Support links can expose placeholder destinations.
- Some support resource URLs are `#`, creating dead-link risk if explored live.

4) Naming drift extends beyond previously captured terms.
- Legacy aliasing and mixed naming patterns increase cognitive load during rapid navigation and Q&A pivots.

### 4) Priority Corrections for Demo Context

For demo readiness specifically, prioritize:

- D0 (Critical):
  - Remove or disable accidental-failure controls from live script routes.
  - Resolve no-op CTA(s) and dead-link risks.
  - Standardize environment-state messaging ("prototype preview" vs "production").

- D1 (High):
  - Add bridge actions between opportunities and approval/introduction flows.
  - Add BE vs mandatory comparison artifact for at least one canonical scenario.
  - Expand search index to all high-probability Q&A recovery routes (settlement + network + settings).

- D2 (Medium):
  - Add transition-strategy view (direct vs mediated path) as narrative support page.
  - Add anchor design-partner tracking view for strategy demos.

### 5) Evidence Paths (for all delta findings)

- Requirements:
  - `docs/AI Correspondent Execution & Settlement Layer (1).extracted.md`

- Routes and IA:
  - `Corrtest-main/src/app/App.tsx`
  - `Corrtest-main/src/app/routing/routeConfig.tsx`
  - `Corrtest-main/src/app/data/searchIndex.ts`

- Workflow pages and controls:
  - `Corrtest-main/src/app/pages/ux/routePages.tsx`
  - `Corrtest-main/src/app/pages/v2/HubPages.tsx`
  - `Corrtest-main/src/app/components/trading/TradingDeskAugmentation.tsx`
  - `Corrtest-main/src/app/components/shell/ContextDrawer.tsx`
  - `Corrtest-main/src/app/components/shell/PrimaryNav.tsx`
  - `Corrtest-main/src/app/pages/v2/SupportPage.tsx`
  - `Corrtest-main/src/app/data/fixtures.ts`

