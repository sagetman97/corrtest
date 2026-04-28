# AI Correspondent UI parity & requirements ledger (Corrtest)

**Purpose:** Trace **business requirements** → **`Corrtest-main`** routes → **`Corrtest-old`** Figma-era screens, and record **parity decisions** (keep, merge from old, defer, or intentionally out of scope). Use this as a backlog and design-review anchor.

**Canonical product brief:** `docs/AI Correspondent Execution & Settlement Layer (1).extracted.txt` (hereafter **Brief**).

**Frontend instances:**

| Path | Role |
|------|------|
| `Corrtest-main/` | Current pillar IA, Polly shell, workspace pages (`src/app/App.tsx`). |
| `Corrtest-old/` | Earlier 8-route Figma-style prototype (`src/app/App.tsx`). |

**UX authority (visual/interaction):** `docs/reference/ux-guidelines-figma-master-ai.md`, `ui-components-main/` (Vue source of truth for tokens/components).

**Last reviewed:** 2026-04-27 (global search + trading/settlement augmentations reflected)

**Confidence:** Requirements-to-route mapping **high** (text + code paths). Priority ordering **medium** (product trade-offs). Figma fidelity **medium** without pixel-level diff of every export.

---

## 1. Requirement clusters (from Brief)

Clusters group the Brief into testable themes. Line references point into `docs/AI Correspondent Execution & Settlement Layer (1).extracted.txt`.

| ID | Cluster | Brief anchors (themes) |
|----|---------|-------------------------|
| **R-INF-API** | Buyer API spine | Common API/format; base price; LLPA/SRP grids + CF; CRA/spec; hybrid AOT + price adjustment; transition integration (lines 3–17). |
| **R-INF-GOV** | Eligibility & change governance | AI/NLP eligibility edits; quick change + **revert**; seller eligibility/overwrites; dynamic margins; market-share-based margins (lines 8–15). |
| **R-INF-MTM** | Marks vs rate sheets | Mark-to-market; **eliminate rate sheets** as center of gravity (lines 3–10). |
| **R-INF-CF** | MSR / advanced valuation | Cash-flow models for MSR, loan-level SRP, LLPAs (lines 11–12) — often **deferred** in UI until API depth exists. |
| **R-EX-BE** | Best efforts | Automated BE locking; daily/on-demand marks sufficient (lines 21–24). |
| **R-EX-MAND** | Mandatory / tapes | Mandatory bid desk; bid tape; hedge-advisor friction (lines 25–26, 18). |
| **R-EX-AGENT** | Agents & intros | Buyer/seller agents; anonymous intros; upside / delta BE vs mandatory (lines 27–32). |
| **R-EX-MM** | Market making & pipeline | Market making; pipeline marks; reserve spread; credible mandatory mark vs auction (lines 18–19, 34–37). |
| **R-EX-SHADOW** | Shadow bidding | Shadow bidding rules/approvals (Brief product list lines 103–104). |
| **R-ST-DEL** | Delivery & conditions | Automated delivery; conditions to seller; agent-to-agent clearing (lines 39–47). |
| **R-ST-PA-REC** | PA & reconciliation | Purchase advice; bid snapshot vs delivered; adjustments; wires/warehouse (lines 48, 123–127). |
| **R-ST-CASH** | Escrow & cash | Master/sub escrow; release on buyer approval (lines 49–52). |
| **R-ST-COMP** | Operational compliance | ULDD, docs/images, fraud/temporal, QC workflows (lines 110–114). |
| **R-ST-SERV** | Servicing & custody | Servicing onboarding; e-notes; MERS (lines 128–136). |
| **R-ST-POST** | Post-close | EPO/EPD, delinquency, prepay, delivery metrics (lines 84, 137). |
| **R-NET** | Counterparties & integrations | Buyers/sellers; LOS/doc politics; integrations (multiple sections). |
| **R-ANA** | Analytics | Margin accuracy, market share, execution delta, throughput (Brief lines 63–66; product list). |
| **R-GOV** | Org / audit / monetization | Roles, auditability; per-loan buyer/seller fees (Brief lines 71–73; Zoom-out admin). |

---

## 2. `Corrtest-main` route inventory → requirement clusters

Routes from `Corrtest-main/src/app/App.tsx`. **Primary** = strongest Brief fit; **Secondary** = partial or storytelling only.

### Global shell & home

| Route | Primary clusters | Secondary | Notes |
|-------|------------------|-----------|--------|
| `/home` | R-ANA (snapshot KPIs), cross-layer teaser | R-ST-DEL (queue hint) | `DashboardPage` — assumptions ledger + quick actions; **no** dedicated activity/exceptions tables yet (still **P1** merge from old Overview). |
| Top bar: search, Insights, Program, Settings | R-ANA, R-GOV | — | **`GlobalSearchBar`** (`Corrtest-main/src/app/components/shell/GlobalSearchBar.tsx`) filters **`globalSearchIndex`** (`src/app/data/searchIndex.ts`) — command-palette–style **route/workspace discovery** with navigation on pick; **⌘/Ctrl+K** focuses search; **not** loan/tape/entity search (replace index or backend when available). |

### Pricing & marks (`/pricing/*`)

| Route | Primary | Secondary |
|-------|---------|-----------|
| `/pricing/overview` | R-INF-MTM, R-INF-API | Hub navigation |
| `/pricing/buyer-api` | R-INF-API | Hybrid AOT mentioned in copy potential |
| `/pricing/marks` | R-INF-MTM, R-INF-API | Base price / marks |
| `/pricing/eligibility` | R-INF-GOV | AI NLP eligibility — surface exists; depth TBD |
| `/pricing/llpa-srp` | R-INF-API, R-INF-CF | Grid + CF story; **`LlpSrpDeferredCallouts`** surfaces MSR CF / pool optimizer / API depth as **roadmap callouts** (no fake precision). |

### Trading & execution (`/trading/*`)

| Route | Primary | Secondary |
|-------|---------|-----------|
| `/trading/overview` | R-EX-BE, R-EX-MAND | Hub |
| `/trading/best-efforts` | R-EX-BE | Locks; **`TradingDeskAugmentation`** (best-efforts) — commitments/utilization + bid-style rows (fixture-backed). |
| `/trading/mandatory-bid` | R-EX-MAND | Tapes/bids; **`TradingDeskAugmentation`** (mandatory) — same widget pattern, copy/alerts tuned for mandatory context. |
| `/trading/opportunities` | R-EX-AGENT | Agentic queue |
| `/trading/market-making` | R-EX-MM | Margins / guardrails |
| `/trading/pipeline-marks` | R-EX-MM | Pipeline / reserve spread; **`PipelineMarksContextStrip`** adds reserve/spread context above workspace. |
| `/trading/shadow-bidding` | R-EX-SHADOW | Approvals nuance |

### Settlement & cash (`/settlement/*`)

| Route | Primary | Secondary |
|-------|---------|-----------|
| `/settlement/overview` | R-ST-DEL – R-ST-POST | Hub |
| `/settlement/delivery` | R-ST-DEL | |
| `/settlement/conditioning` | R-ST-DEL | |
| `/settlement/clearing` | R-ST-DEL, R-ST-CASH | |
| `/settlement/purchase-advice` | R-ST-PA-REC | **`PurchaseAdviceAugmentation`** — wire routes / warehouse-adjacent tables (fixtures); live banking APIs **deferred** (see §6). |
| `/settlement/cash` | R-ST-CASH | **`CashSettlementHubPage`** — master escrow card, sub-account grid, trend chart; wire execution remains **illustrative** / not live integration. |
| `/settlement/compliance` | R-ST-COMP | |
| `/settlement/reconciliation` | R-ST-PA-REC | **`ReconciliationAdjustmentsAugmentation`** — bid snapshot vs delivered field compare + warehouse/wire queue mock depth. |
| `/settlement/servicing` | R-ST-SERV | |
| `/settlement/custodial` | R-ST-SERV | |
| `/settlement/post-close` | R-ST-POST | |

### Network (`/network/*`)

| Route | Primary | Secondary |
|-------|---------|-----------|
| `/network/buyers` | R-NET | Anchor buyer theme (Brief line 56) |
| `/network/sellers` | R-NET | |
| `/network/approvals` | R-NET, R-EX-AGENT | Approved relationships |
| `/network/integrations` | R-NET, R-ST-COMP | LOS/doc connectors |

### Insights (`/insights/*`)

| Route | Primary |
|-------|---------|
| `/insights` (hub) | R-ANA |
| `/insights/execution-delta` | R-ANA |
| `/insights/margin-accuracy` | R-ANA, Brief line 64 |
| `/insights/market-share` | R-ANA |
| `/insights/sla-throughput` | R-ANA, Brief throughput |

### Settings & program

| Route | Primary |
|-------|---------|
| `/settings/*` | R-GOV |
| `/program` | R-GOV (monetization, lines 71–73) |

---

## 3. `Corrtest-old` screen inventory → requirement clusters

Sources: `Corrtest-old/src/app/pages/*.tsx`.

| Old route | Screen | Strong Brief fit | Misalignment / risk |
|-----------|--------|-------------------|---------------------|
| `/` | `Overview.tsx` | R-ANA + **operational** exception handling (not explicit in Brief but supports SLA/trust) | Does not map layers (pricing/execution/settlement) |
| `/product-pricing` | `ProductPricing.tsx` | R-INF-GOV (versions, pending changes) | **Rate sheet** language and **retail PPE** framing vs **Buyer API / M2M** (Brief lines 3–10) |
| `/loan-trading` | `LoanTrading.tsx` | R-EX-BE, R-EX-MAND (commitments, utilization) | **Investor** metaphor vs **buyer API + seller tape** language |
| `/analytics` | `Analytics.tsx` | R-ANA (volume, margin, channel) | Single combined dashboard — **not** replicated as one page in main |
| `/ai-insights` | `AIInsights.tsx` | R-EX-AGENT, auditability | **No single equivalent route** in main |
| `/integrations` | `Integrations.tsx` | R-NET, R-ST-COMP | Richer **health + sync log** than main’s integration workspace alone |
| `/admin` | `Admin.tsx` | R-GOV | **Unified** users + roles + audit vs **split** settings tabs in main |
| `/support` | `Support.tsx` | Adoption / pilots (not in Brief technical list) | **Missing** in main |

---

## 4. Coverage matrix (cluster × implementation)

Legend: **Main** = `Corrtest-main` has a dedicated or strong surrogate screen. **Old** = `Corrtest-old` had meaningful UX. **Gap** = neither fully expresses Brief depth.

| Cluster | Main | Old | Gap / next UX depth |
|---------|------|-----|----------------------|
| R-INF-API | Strong (`/pricing/buyer-api`, marks, llpa-srp) | Weak (product catalog, not API contract) | CRA/spec axes as first-class filters; versioning matrix |
| R-INF-GOV | Strong (eligibility page + workspace pattern) | Medium (change log) | NLP eligibility editor prototype; **rollback timeline** UX |
| R-INF-MTM | Strong | Mixed (“pricing engine”) | Avoid “rate sheet” language everywhere |
| R-INF-CF | Weak (tables only) | None | MSR CF curves, loan-level adjustments — **defer** until model API |
| R-EX-BE | Strong | Medium | PPE integration caveat (line 23) as **ecosystem callout** |
| R-EX-MAND | Strong | Medium | Hedge advisor **non-intermediation** note — informational surface |
| R-EX-AGENT | Medium (opportunities) | Strong (AI Insights cards) | **Merge** card pattern from old into main |
| R-EX-MM | Strong | Weak | — |
| R-EX-SHADOW | Strong | None | — |
| R-ST-DEL – R-ST-POST | Strong breadth | None | Delivery **agent** narrative + doc provenance |
| R-ST-CASH | Strong (**prototype** visualization on `/settlement/cash`) | Weak | Live wires / banking rails — still **integration** gap |
| R-ST-PA-REC | Strong + **fixture-backed** PA/reconciliation augmentations | None | Production bid snapshot parity + bank-confirmed wires |
| R-NET | Strong | Strong (integrations) | **Sync activity log** from old |
| R-ANA | Medium (four charts + hub) | Strong (single dashboard) | **Executive** combined analytics optional |
| R-GOV | Medium (split settings) | Strong (unified admin) | Unified admin hub optional |

---

## 5. Parity ledger per surface (decision record)

Each row: **Surface** · **Decision** · **Rationale** · **Suggested owner / phase**.

### 5.1 Navigation & IA

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| Pillar IA (pricing / trading / settlement / network) | **KEEP** | Matches Brief three-layer + ecosystem story | — |
| Flat 8-item nav (old) | **DO NOT RESTORE** | Cognitive overload vs Brief “jobs not feature buckets” | — |
| Legacy redirects in `App.tsx` | **KEEP** | Bookmarks and deep links | — |

### 5.2 Home `/home`

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| KPI strip + assumptions + quick actions | **KEEP** | Aligns with cross-layer snapshot | P0 |
| **Recent activity** table (old `Overview.tsx`) | **MERGE FROM OLD** | Operational awareness; supports exception mindset | P1 |
| **Active exceptions** queue + severity (old Overview) | **MERGE FROM OLD** | Maps to conditioning, eligibility drift, settlement variance | P1 |
| Wire `fixtures.ts` (loans/tapes/packages/alerts) into home | **MERGE / NEW** | Data already scoped in `Corrtest-main/src/app/data/fixtures.ts` | P1 |

### 5.3 Pricing & marks

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| Buyer API, marks, eligibility, LLPA/SRP routes | **KEEP** | Core R-INF-* | P0 |
| Old **product catalog** table (products × versions × pending changes) | **MERGE SELECTIVELY** | Useful for **governance** — reframe as **buyer programs** or **pricing programs**, not “rate sheets” | P2 |
| Old **recent configuration changes** table | **MERGE** | Supports revert/audit story (R-INF-GOV) | P2 |

### 5.4 Trading & execution

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| Dedicated desks (BE, mandatory, pipeline, shadow, MM) | **KEEP** | Direct Brief mapping | P0 |
| Old **investor bids** + **commitments** single page | **DONE (prototype)** via **`TradingDeskAugmentation`** | BE + mandatory desks prepend strip: stats, alerts, **`PDataTable`** bids/commitments + drawer on row — parity with old loan-trading metaphor without restoring flat IA | — |

### 5.5 Settlement

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| Full settlement stack routes | **KEEP** | Breadth matches Brief settlement list | P0 |
| Escrow master/sub narrative | **DONE (prototype)** on `/settlement/cash` | Master + sub accounts in **`CashSettlementHubPage`**; release rules explained via inline alert | Hard prod → banking integration |

### 5.6 Network & integrations

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| Buyers, sellers, approvals | **KEEP** | R-NET | P0 |
| Old **integration health + sync log** | **MERGE INTO** `/network/integrations` or overview | Operational trust; matches Brief LOS/integration friction | P1 |

### 5.7 Insights & AI

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| Four analytic routes + hub | **KEEP** | R-ANA coverage | P0 |
| Old **single-page analytics** (multi-chart + channel table) | **MERGE** as **`/insights/command`** or **expand `/insights` hub** | Exec storytelling; reduces clicks for demos | P2 |
| Old **AI Insights** (cards + basis + traceability) | **NEW ROUTE RECOMMENDED** e.g. `/insights/ai` or `/trading/ai-insights` | Distinct from workspace tables; matches **agentic + audit** (Brief lines 21–22, 72–73) | P1 |

### 5.8 Settings / admin / support

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| Settings tabs (roles, policies, templates, adapter) | **KEEP** | R-GOV | P0 |
| Old unified **Admin** (users + role matrix + audit) | **MERGE** as **`/settings/admin`** or richer **Settings hub** | Governance demos | P2 |
| Old **Support** page | **RESTORE** as **`/support`** + link from Settings or user menu | Design partners / pilots (Brief anchor buyers question) | P2 |

### 5.9 Program / monetization

| Surface | Decision | Rationale | Phase |
|---------|----------|-----------|-------|
| `/program` (Monetization model workspace) | **KEEP** | Brief lines 71–73 | P0 |

---

## 6. Deferred items ledger (intentional or blocked)

Items where **Brief asks for depth** but **UI should wait** for model/API clarity or to avoid fake precision.

| Item | Brief hint | Why defer |
|------|------------|-----------|
| Pool optimizer | Product list ~100 | Needs optimization backend — **callout only** on LLPA/SRP |
| Full MSR CF visualization | Lines 11–12, 59 | Depends on MSR CF API — **callout only** until model depth exists |
| Blockchain-like / enterprise doc repository | Line 43 + doc provenance themes | Platform architecture — **defer** full product; UI shows operational surfaces only |
| Real hedge-advisor workflow | Lines 18, 26 | Partner politics — **informational** on trading desks, not workflow |
| Live wire instructions / bank rails | Line 127 | Banking integration — PA aug shows **mock** routes; reconciliation shows **mock** queue |

---

## 7. Suggested implementation phases (backlog-shaped)

**Phase 0 — Documentation (done)**  
This ledger + Brief remain canonical; Slack/MCP outputs get normalized here when decisions stick.

**Phase 1 — High-impact parity from old Figma**  
1. Home: activity + exceptions + use of `fixtures` / alerts — **still open** (dashboard not yet merged).  
2. Integrations: health + sync activity pattern from `Corrtest-old/.../Integrations.tsx` — **still open**.  
3. **AI insights** narrative — **done** (`/insights/ai`, `AiInsightsNarrativePage`).  
4. **Support** route — **done** (`/support`). Admin overview — **partial** (`/settings/admin`).

**Phase 2 — Governance & analytics storytelling**  
1. Pricing: program/buyer catalog + change log (**without** rate-sheet center of gravity) — **partial** (`/pricing/programs`); deeper change log optional.  
2. Trading: commitment/utilization widgets — **done (prototype)** (`TradingDeskAugmentation`).  
3. Insights: combined executive dashboard — **partial** (`/insights/command`).

**Phase 3 — Settlement depth**  
1. Escrow master/sub visualization — **done (prototype)** (`CashSettlementHubPage`).  
2. Warehouse / reconciliation / PA panels — **done (fixture-backed)** (`PurchaseAdviceAugmentation`, `ReconciliationAdjustmentsAugmentation`); **live** data remains future integration.

---

## 8. Traceability checklist (for QA / demos)

Use before stakeholder demos:

- [ ] **No primary “rate sheet” copy** on pricing paths (Brief lines 3–10); prefer marks / API / programs.  
- [ ] **Buyer API** visible in IA (`/pricing/buyer-api`).  
- [ ] **Mandatory vs best-efforts** both present (`/trading/*`).  
- [ ] **Pipeline marks / reserve spread** surfaced (`/trading/pipeline-marks`).  
- [ ] **Shadow bidding** surfaced (`/trading/shadow-bidding`).  
- [ ] Settlement path **delivery → PA → cash → reconciliation → servicing → custody → post-close** reachable from `/settlement/overview` hub.  
- [ ] **Integrations** show health/sync narrative (after Phase 1 merge).  
- [x] **AI** story has a **non-table** surface (`/insights/ai`).
- [x] **Global search** navigates pillar routes (prototype index, not entities).  
- [ ] **Monetization** reachable (`/program`).  

---

## 9. Related documents

- `docs/AI Correspondent Execution & Settlement Layer (1).extracted.txt` — product requirements source.  
- `docs/reference/ux-guidelines-figma-master-ai.md` — spacing, charts, tables, tokens.  
- `Corrtest-main/docs/ai-correspondent-frontend-redesign-plan-v2.md` — v2 IA and redesign rationale.  
- `docs/reference/mcp-strategy.md` — when importing live Jira/Slack; normalize into docs after.

---

### Maintenance

When routes or priorities change: update **§2**, **§5**, and **Last reviewed**. When Brief changes: update **§1** cluster table and matrices.
