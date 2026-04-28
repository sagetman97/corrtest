# AI Correspondent Frontend Redesign Plan (v2)

**Status:** Proposal  
**Last updated:** 2026-04-27  
**Scope:** `Corrtest-main` React prototype — holistic UX/product/technical rethink  
**Product brief:** `docs/AI Correspondent Execution & Settlement Layer (1).extracted.txt`  
**Design authority:** Polly UX (`docs/reference/ux-guidelines-figma-master-ai.md`, `Figma/` exports), `ui-components-main` (Vue source of truth)

---

## 1. Executive summary

### What we are trying to accomplish

The AI Correspondent Execution & Settlement Layer is not “a bigger admin app with more tables.” It is a **three-layer operating system for correspondent capital markets**:

1. **Infrastructure** — Replace static rate sheets with **API-first, mark-to-market pricing**: shared buyer API shape, base price, LLPA/SRP (grid + cash-flow), CRA/spec axes, eligibility, margins, seller overlays, quick change/revert.
2. **Execution** — **Agentic** buyer/seller matching: best-efforts and mandatory paths, pipeline marks, reserve spread / early bid concepts, shadow bidding, market-making style guardrails, opportunities and intros (often anonymized).
3. **Settlement** — **Automated delivery, stip clearing, reconciliation, purchase advice, escrow/cash release**, plus compliance and custody/post-close signals.

Users should feel they are **orchestrating a market and a pipeline**, not browsing thirty loosely related screens.

### Diagnosis of the current frontend (honest)

The current implementation is **functionally navigable** and **good at proving route coverage**, but it is **weak as a product UX** for three reasons:

| Problem | Why it hurts |
|--------|----------------|
| **Route explosion** | ~30+ entries in the primary nav creates **cognitive overload** and hides the real mental model (three layers + loan journey). |
| **Template repetition** | Many screens reuse the same **KPI row + generic table + “workflow notes”** pattern. That reads as **internal scaffolding**, not a differentiated product. |
| **Mismatch with Figma mock energy** | The original Figma-export app likely emphasized **dashboard density, product vertical accents, and card-led layouts**. The current build often feels like **spreadsheet-first** admin. |
| **“Polly belongs in ecosystem” gap** | `ui-components-main` is **Vue**. Our React “adapter” approximates semantics but **cannot visually clone** Polly’s mature components without either (a) disciplined token/CSS parity, (b) embedding Vue islands, or (c) migrating to a shared token package used by both. |

**Bottom line:** We optimized for **coverage and speed**, not for **clarity, narrative, or craft**. That was appropriate for an early scaffold; it is **not** the right end state for demos or design partnership.

---

## 2. Product intent — structured reading of the brief

Use this as the **non-negotiable backbone** for IA and screen priority.

### 2.1 Infrastructure (pricing model engine)

- **Eliminate rate sheets** as the center of gravity; emphasize **marks** (daily/on-demand sufficient per brief).
- **Buyer API contract** as the spine: common payload, versioning, auth, hybrid AOT / price adjustment flows.
- **LLPA/SRP**: grids + cash-flow (MSR/prepay/default/discount structured CF).
- **CRA/spec** as first-class “axes,” not footnotes.
- **Eligibility** updates with **AI-assisted editing** (NLP) + **revert/rollback** story.
- **Seller-level eligibility** and **overwrites**.
- **Dynamic margins** (market share based, capacity, pool optimization concepts).

### 2.2 Execution (matching + commitments)

- **Best-efforts automation** (integrator dependency acknowledged in brief).
- **Mandatory bid desk** + **bid tape** semantics.
- **Agents** for buyers and sellers (anonymous intros, upside math, delta BE vs mandatory).
- **Pipeline marks** + **reserve spread** (“buy earlier in pipeline”).
- **Shadow bidding** rules and approvals.
- **Market making controls** (buyer/seller margin intent, lifecycle commit points).

### 2.3 Settlement (delivery → cash)

- **Delivery package** automation; **condition lists**; **agent-to-agent** clearing.
- **Purchase advice** generation and transmission.
- **Escrow model**: master/sub accounts; **release on buyer approval** of settlement work.
- **Compliance stack**: ULDD, docs/images, fraud/temporal, QC workflows.
- **Reconciliation**: bid snapshot vs delivered truth; late delivery; rolls; adjustments; wires/warehouse instructions.
- **Servicing onboarding**, **custodial** (e-notes/MERS), **post-close performance**.

### 2.4 Cross-cutting product truths

- Ecosystem friction is explicit (hedge advisors, investor appetite, LOS doc access politics). UX must **acknowledge trust, provenance, and auditability**, not pretend it away.
- Monetization and anchor buyer/seller questions belong in **program admin / strategy** surfaces, not cluttering operator workflows.

---

## 3. Current experience — what we built and how it feels

### 3.1 Information architecture

- **Flat, exhaustive IA:** Dashboard + many second-level routes grouped by labels (Pricing, Execution, Settlement, Counterparties, Integrations, Analytics, Admin).
- **Strength:** Every concept from the brief has *somewhere* to live.
- **Weakness:** Operators do not think in “20+ destinations.” They think in **jobs** (“clear this loan,” “improve margin,” “release funds,” “fix eligibility drift”).

### 3.2 Navigation model

- Long sidebar with **many visually similar links** (no icons in nav currently; heavy reliance on text scanning).
- No **global command palette**, no **recent items**, no **pinned loans**, no **role-based landing**.

### 3.3 Page patterns

The dominant pattern is:

- KPI strip → generic table → side “workflow notes” card → optional modal/toast demos.

This produces:

- **Uniformity without hierarchy** (everything looks equally important).
- **Weak storytelling** for the three-layer model (users don’t feel progression Infrastructure → Execution → Settlement).

### 3.4 Visual / brand alignment

- Tailwind + CSS variables give a Polly-ish palette, but **layout rhythm** often diverges from Polly’s card/table/chart compositions as documented in Figma exports.
- Charts exist but are not yet **first-class narrative devices** on primary workflows (they’re more “analytics pages”).

### 3.5 Fidelity to `ui-components-main`

- **Reality check:** Polly’s canonical components are **Vue SFCs** with rich props/slots and shared CSS variables.
- **Current approach:** React wrappers approximate intent but **do not inherit** the exact styling, density, slot behaviors, or interaction details.
- **Implication:** “Looks like Polly” requires an explicit strategy (Section 6), not incremental class tweaks alone.

---

## 4. Design goals for v2 (what “good” looks like)

### 4.1 User-facing goals

1. **Reduce destinations:** fewer nav items; deeper, contextual drill-down.
2. **Job-first UX:** primary flows organized around **loan / tape / package / settlement event**, not feature buckets alone.
3. **Progressive disclosure:** advanced configuration (grid editors, CF models) behind clear entry points.
4. **Trust & audit surfaces:** evidence trails for AI suggestions, doc lineage, reconciliation diffs—where the brief implies doubt and operational risk.
5. **Polly ecosystem consistency:** typography, spacing scale, radii, shadows, table density, component affordances aligned to `ui-components-main` + Figma guidance.

### 4.2 Engineering goals

1. **Stop duplicating pages** via one mega-template; instead **compose** from a small library of **screen archetypes**.
2. **Centralize design tokens** so React matches Polly CSS variable naming where possible.
3. **Separate** “demo data” from “layout primitives” — mock data becomes fixtures, not inline clutter in every page file.

---

## 5. Proposed product narrative & IA (v2)

### 5.1 Primary navigation (top-level): **five items**

Use the five mental poles operators actually occupy:

| Nav item | Purpose |
|----------|---------|
| **Home** | Personalized mission control: alerts, SLA risk, approval queue, “what changed since yesterday.” |
| **Pricing & Marks** | Infrastructure layer: buyer API health, marks, configs, eligibility, LLPA/SRP workspaces. |
| **Trading & Execution** | Pipeline, locks, tapes, bids, shadow scenarios, agent opportunities, market-making guardrails. |
| **Settlement & Cash** | Delivery → conditions → clearing → PA → escrow release; compliance nested here as tabs. |
| **Network & Integrations** | Counterparties, approvals, connectors, audit/integration health—not mixed into operational queues. |

**Analytics** becomes:

- **Insights rail or Home dashboards**, not a parallel mega-section—unless personas require deep BI (then keep a single “Insights” hub with tabs).

**Admin / program strategy** (monetization scenarios, anchor cohort assumptions) moves to:

- **Settings** or **Program** (restricted), not beside operational queues.

### 5.2 Secondary navigation pattern

- **Horizontal tabs within a pillar** (matches `p-tabset` patterns).
- **Context drawer** for loan/tape/package detail (persistent right panel), instead of navigating away constantly.

### 5.3 Core object model (UX entities)

Everything should anchor to explicit objects:

- **Loan / Pipeline loan** (stage, marks, eligibility snapshot)
- **Tape / Bid package** (mandatory)
- **Delivery package** (settlement)
- **Condition** (settlement)
- **Purchase Advice** (settlement)
- **Escrow ledger entry** (cash)
- **Buyer API endpoint profile** (infra)

If a screen cannot point to one of these, it is probably **configuration** and belongs under Settings.

---

## 6. Alignment with `ui-components-main` (strategy, not wishful thinking)

Pick **one** primary strategy for visual parity; mixing without discipline causes drift.

### Option A — **Token-first React (recommended for prototype speed)**

- Extract/normalize Polly CSS variables from `ui-components-main` packages (spacing, borders, typography, semantic colors).
- Publish or mirror a **`polly-tokens.css`** consumed by Corrtest.
- Rebuild React primitives to **match class semantics** (density, radii, focus rings) documented in Vue components.

**Pros:** Fast, no Vue in React.  
**Cons:** Still manual parity work on complex widgets (select menus, tables).

### Option B — **Micro-frontends / Vue islands**

- Embed selected Vue components (e.g., `PTable`, `PModal`) inside React routes via a thin integration layer.

**Pros:** Highest fidelity where it matters.  
**Cons:** Build/tooling complexity; team must own the boundary.

### Option C — **Replace Corrtest shell with Vue app using `ui-components-main` directly**

**Pros:** Perfect component fidelity.  
**Cons:** Largest migration cost if React investment must be preserved.

### Recommendation for this pod

- **Short term:** Option **A** + ruthless token audit + fewer bespoke components.
- **Selective escalation:** Option **B** only for **one** high-leverage component (often **table/data grid**) if demos demand it.

---

## 7. Screen archetypes (replace the single “WorkspacePage”)

Define **6–8 archetypes** and forbid “generic table pages” except where truly appropriate.

1. **Mission Control (Home)** — exceptions, SLA heat, approvals, actionable queue with filters.
2. **Pipeline Board** — loans grouped by stage; drag/select optional later.
3. **Tape / Bid Desk** — mandatory-specific layout: tape header, bid comparison, shadow lane.
4. **Loan Command** — single loan: pricing snapshot, execution recommendations, settlement status timeline.
5. **Package / Delivery Command** — documents checklist, completeness, routing to conditions.
6. **Reconciliation Diff** — bid vs delivered vs adjustments (explicit diff UI, not a flat table).
7. **Escrow Ledger** — balances, sub-accounts, release approvals (buyer approval gate explicit).
8. **API Health & Config** — endpoint profiles, payloads, versioning; developer-grade but still visual.

Each archetype gets:

- prescribed **above-the-fold story**
- prescribed **primary action**
- prescribed **empty/loading/error** behaviors

---

## 8. UX principles drawn from Figma guidance

Operationalize `docs/reference/ux-guidelines-figma-master-ai.md`:

- **Spacing scale only** (`xxxs` → `xxxl`); kill one-off gaps.
- **Radii semantics:** pills for controls; **cards at base radius**; avoid mixing ad hoc rounds in the same viewport.
- **Shadow semantics:** elevated overlays use stronger elevation per guidance.
- **Charts:** card anatomy with title/actions/legend; categorical vs sequential palette discipline.
- **Accessibility:** visible focus always; status not color-only (pair badges/icons with text).

---

## 9. Phased action plan

### Phase 0 — Reset & inventory (1–3 days)

- Freeze feature additions.
- Inventory **which routes are demo-critical** vs audit-only.
- Recover **baseline Figma mock screens** (export or screenshots) and produce a **gap matrix**: mock vs current vs desired v2.

**Outputs:** prioritized journey list + visual references.

### Phase 1 — IA & shell rebuild (3–7 days)

- Implement **5-pillar nav** + **context drawer** shell (even with mocked data).
- Collapse routes: redirect old URLs → new canonical paths.
- Introduce **global patterns**: search/command placeholder, notifications placeholder, user menu placeholder.

**Outputs:** navigable v2 skeleton; fewer clicks to core jobs.

### Phase 2 — Archetype rollout (2–4 weeks, incremental)

Rebuild highest-value flows first:

1. **Loan Command** + **Pipeline Board** (Execution narrative)
2. **Tape / Bid Desk** (Mandatory narrative)
3. **Package Command + Reconciliation Diff** (Settlement narrative)
4. **Buyer API profile** pages (Infrastructure narrative—developer clarity without tables-only)

**Outputs:** demo-ready stories end-to-end per archetype.

### Phase 3 — Design system parity pass (ongoing)

- Token package / mirrored CSS vars from `ui-components-main`.
- Refactor adapters or introduce Vue islands selectively.

**Outputs:** measurable delta vs Figma screenshots (pixel-perfect not required; **semantic parity** required).

### Phase 4 — AI trust surfaces (parallel)

- Every AI-assisted action includes: **inputs, recommendation, confidence, evidence links, rollback**.
- Dedicated **Assistant panel** pattern (modal or side sheet) aligned to `p-modal` AI variants in Polly library.

---

## 10. Success metrics (prototype-appropriate)

- **Navigation:** ≤7 primary destinations; users can name the three layers without prompting.
- **Time-to-insight:** primary questions answerable in **one screen** where possible (e.g., “why is settlement blocked?”).
- **Demo narrative:** a 10-minute walkthrough tells a coherent story: **mark → execute → settle → cash**.
- **Design audit:** spacing/radius/shadow violations trend to zero against UX guideline checks.

---

## 11. Explicit non-goals (for v2 redesign prototype)

- Full backend integration (still mocked).
- Pixel-perfect replication of every Vue component in React without token strategy.
- Building all ecosystem bullet points from Section 2.4 at equal fidelity—**sequence by partner value**.

---

## 12. Open decisions (record in ADR light format)

1. **React vs Vue** for long-term Correspondent UI—does engineering mandate React for embedding?
2. **Persona defaults:** buyer-heavy vs seller-heavy demo mode?
3. **Which “trust model” UX for doc access** (given LOS competitive sensitivity)?

---

## 13. Appendix — mapping brief themes → v2 pillars

| Brief theme | v2 home |
|-------------|---------|
| Buyer API / marks / LLPA/SRP / eligibility | Pricing & Marks |
| Best-efforts + mandatory + pipeline marks + shadow | Trading & Execution |
| Delivery + conditions + PA + escrow | Settlement & Cash |
| Counterparties + integrations | Network & Integrations |
| Analytics spread | Home + Insights (avoid duplicate nav) |
| Monetization / anchors | Program / Settings (gated) |

---

## Document control

- **Authoring intent:** This document is the **single planning source** for Correspondent UI v2 until superseded.
- **Next step:** Review with design + eng leads; prioritize Phase 1 shell + Phase 2 archetype #1/#2 for the next sprint.
