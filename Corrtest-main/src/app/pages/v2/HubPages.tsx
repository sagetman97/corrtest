import { Link } from 'react-router';
import { Icon, IconName } from '../../components/Icon';
import { PCard, PPageHeader } from '../../components/polly';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';

export function HubCard({
  to,
  title,
  description,
  icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: IconName;
}) {
  return (
    <Link
      to={to}
      className="group block h-full rounded-[var(--border-radius-lg)] outline-none ring-[var(--colors-border-common-accent)] transition hover:shadow-[var(--shadow-l)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--colors-background-common-default-grey)]"
    >
      <PCard className="h-full border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] transition group-hover:border-[var(--colors-border-common-accent)]">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--border-radius-base)] bg-[var(--colors-background-common-ultra-light-neutral)] text-[var(--colors-text-icon-dark)]">
            <Icon name={icon} size={18} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-[var(--colors-text-icon-dark)]">{title}</h3>
            <p className="mt-1 text-sm text-[var(--colors-text-icon-medium)]">{description}</p>
          </div>
        </div>
      </PCard>
    </Link>
  );
}

const hubWrap = 'mx-auto w-full max-w-[min(100%,90rem)] space-y-6 p-4 pb-8';

export function PricingOverviewPage() {
  return (
    <div className={hubWrap}>
      <PPageHeader
        title="Pricing & marks"
        subtitle="API-first infrastructure: buyer contract, marks, eligibility, and adjustment grids"
        color={PILLAR_PAGE_ACCENT.bluePricing}
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <HubCard
          to="/pricing/programs"
          title="Pricing programs"
          description="Program catalog, versions, and configuration lineage — API-first marks, not static rate sheets."
          icon="list"
        />
        <HubCard to="/pricing/buyer-api" title="Buyer API" description="Contract, auth, versioning, and payload simulation." icon="network" />
        <HubCard to="/pricing/marks" title="Base pricing & marks" description="Feeds, overlays, and mark policy posture." icon="bar-chart" />
        <HubCard to="/pricing/eligibility" title="Eligibility rules" description="Published drafts, overlays, and rollback posture." icon="list" />
        <HubCard to="/pricing/llpa-srp" title="LLPA / SRP workspace" description="Grid and cash-flow adjustment scenarios." icon="sliders" />
      </div>
    </div>
  );
}

export function TradingOverviewPage() {
  return (
    <div className={hubWrap}>
      <PPageHeader title="Trading & execution" subtitle="Locks, tapes, agents, and market-making guardrails" color={PILLAR_PAGE_ACCENT.yellowExchange} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <HubCard to="/trading/best-efforts" title="Best efforts desk" description="Recommended buyer moves and commitment capture." icon="trending-up" />
        <HubCard to="/trading/mandatory-bid" title="Mandatory bid desk" description="Tape semantics and mandatory path controls." icon="layers" />
        <HubCard to="/trading/opportunities" title="Opportunity discovery" description="Agentic queue with confidence and uplift." icon="sparkles" />
        <HubCard to="/trading/market-making" title="Market making" description="Intent profiles and constraint surfaces." icon="sliders" />
        <HubCard to="/trading/pipeline-marks" title="Pipeline marks" description="Reserve spread and early-bid signaling." icon="bar-chart" />
        <HubCard to="/trading/shadow-bidding" title="Shadow bidding" description="Approval-aware what-if scenarios." icon="bolt" />
      </div>
    </div>
  );
}

export function SettlementOverviewPage() {
  return (
    <div className={hubWrap}>
      <PPageHeader title="Settlement & cash" subtitle="Delivery through funding: clearing, advice, escrow, and custody" color={PILLAR_PAGE_ACCENT.greenSettlement} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <HubCard to="/settlement/delivery" title="Delivery inbox" description="Intake queue and completeness checks." icon="boxes-stacked" />
        <HubCard to="/settlement/conditioning" title="Conditioning" description="Exception loops and ownership." icon="triangle-exclamation" />
        <HubCard to="/settlement/clearing" title="Clearing queue" description="Clear/return and escrow gates." icon="circle-check" />
        <HubCard to="/settlement/purchase-advice" title="Purchase advice" description="Generation, approval, and transmission." icon="file-text" />
        <HubCard
          to="/settlement/cash"
          title="Cash & escrow"
          description="Master/sub escrow, wires, variance — release on buyer approval (prototype balances)."
          icon="dollar-sign"
        />
        <HubCard to="/settlement/compliance" title="Operational compliance" description="ULDD, docs, fraud, and QC paths." icon="shield" />
        <HubCard to="/settlement/reconciliation" title="Reconciliation" description="Bid snapshot vs delivered truth and adjustment decisions." icon="refresh" />
        <HubCard to="/settlement/servicing" title="Servicing onboarding" description="Transfers and servicing handoff." icon="users" />
        <HubCard to="/settlement/custodial" title="Custodial" description="E-notes and MERS trail." icon="lock" />
        <HubCard to="/settlement/post-close" title="Post-close performance" description="EPO/EPD and servicing signals." icon="trending-up" />
      </div>
    </div>
  );
}

export function NetworkOverviewPage() {
  return (
    <div className={hubWrap}>
      <PPageHeader title="Network & integrations" subtitle="Counterparties, approvals, and ecosystem connectors" color={PILLAR_PAGE_ACCENT.yellowExchange} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <HubCard to="/network/buyers" title="Buyer directory" description="Appetite, scope, and API posture." icon="users" />
        <HubCard to="/network/sellers" title="Seller directory" description="Execution preferences and profiles." icon="boxes-stacked" />
        <HubCard to="/network/approvals" title="Approval relationships" description="Buyer/seller approval graph." icon="shield" />
        <HubCard to="/network/integrations" title="Integrations" description="LOS, doc, fraud, servicing endpoints." icon="network" />
      </div>
    </div>
  );
}

export function InsightsHubPage() {
  return (
    <div className={hubWrap}>
      <PPageHeader title="Insights" subtitle="Execution, margin, flow analytics, and AI narrative surfaces" color={PILLAR_PAGE_ACCENT.magentaAnalytics} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
        <HubCard
          to="/insights/command"
          title="Command center"
          description="Combined volume, margin, and channel analytics on one executive surface."
          icon="bar-chart"
        />
        <HubCard
          to="/insights/ai"
          title="AI insights & traceability"
          description="Confidence-scored recommendations with basis and lineage hooks."
          icon="sparkles"
        />
        <HubCard to="/insights/execution-delta" title="Execution delta" description="Spread and fallback comparison." icon="trending-up" />
        <HubCard to="/insights/margin-accuracy" title="Margin accuracy" description="Observed vs configured margins." icon="bar-chart" />
        <HubCard to="/insights/market-share" title="Market share" description="Channel and buyer share trends." icon="bar-chart" />
        <HubCard to="/insights/sla-throughput" title="SLA & throughput" description="Timings from intake to settlement." icon="clock" />
      </div>
    </div>
  );
}

export function SettingsHubPage() {
  return (
    <div className={hubWrap}>
      <PPageHeader title="Settings" subtitle="Roles, policies, templates, support, and UI adapter reference" color={PILLAR_PAGE_ACCENT.bluePricing} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <HubCard
          to="/settings/admin"
          title="Administration"
          description="Users, role summary, audit trail — governance in one scroll."
          icon="shield"
        />
        <HubCard to="/support" title="Support & success" description="Contacts, docs, and implementation timeline." icon="support" />
        <HubCard to="/settings/roles" title="User roles" description="Capability matrix for operators." icon="users" />
        <HubCard to="/settings/policies" title="Notification policies" description="Alerts, channels, and escalations." icon="circle-exclamation" />
        <HubCard to="/settings/templates" title="Rule templates" description="Catalog for pricing and settlement policies." icon="file-text" />
        <HubCard to="/settings/adapter-showcase" title="Adapter showcase" description="React control parity with Polly UI tokens." icon="sparkles" />
      </div>
    </div>
  );
}
