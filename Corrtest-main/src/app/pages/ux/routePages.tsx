import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Icon } from '../../components/Icon';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { PButton, PCard, PChartCard, PDataTable, PInput, PModal, PPageHeader, PPagination, PSelect, PStatusBadge, PTabset, PToast } from '../../components/polly';
import { ReactNode, useState } from 'react';
import { useShell } from '../../context/ShellContext';
import { LlpSrpDeferredCallouts } from '../../components/pricing/LlpSrpDeferredCallouts';
import { PurchaseAdviceAugmentation } from '../../components/settlement/PurchaseAdviceAugmentation';
import { ReconciliationAdjustmentsAugmentation } from '../../components/settlement/ReconciliationAdjustmentsAugmentation';
import { TradingDeskAugmentation } from '../../components/trading/TradingDeskAugmentation';
import { PipelineMarksContextStrip } from '../../components/trading/PipelineMarksContextStrip';
import { WorkflowJourneyCard } from '../../components/shell/WorkflowJourneyCard';
import { OpportunityBridgePanel } from '../../components/trading/OpportunityBridgePanel';
import { MarketMakingIntentPanel } from '../../components/trading/MarketMakingIntentPanel';
import { ConditionHandoffPanel } from '../../components/settlement/ConditionHandoffPanel';
import { AotCommitmentTimelinePanel } from '../../components/trading/AotCommitmentTimelinePanel';
import { EligibilityNlpAssistantPanel } from '../../components/pricing/EligibilityNlpAssistantPanel';

export { HomeDashboardPage as DashboardPage } from '../v2/HomeDashboardPage';
export { NetworkIntegrationsPage as IntegrationMappingsPage } from '../v2/NetworkIntegrationsPage';
export { SettingsAdminOverviewPage } from '../v2/SettingsAdminOverviewPage';
export { InsightsExecutivePage } from '../v2/InsightsExecutivePage';
export { PricingProgramsPage } from '../v2/PricingProgramsPage';
export { CashSettlementHubPage as CashSettlementMonitorPage } from '../v2/CashSettlementHubPage';

function inferDrawerEntity(title: string): 'loan' | 'tape' | 'package' {
  const t = title.toLowerCase();
  if (t.includes('tape') || t.includes('mandatory bid')) return 'tape';
  if (
    t.includes('delivery') ||
    t.includes('clearing') ||
    t.includes('purchase advice') ||
    t.includes('cash settlement') ||
    t.includes('operational compliance') ||
    t.includes('reconciliation') ||
    t.includes('servicing onboarding') ||
    t.includes('custodial') ||
    t.includes('post closing') ||
    t.includes('conditioning')
  )
    return 'package';
  return 'loan';
}

type Row = Record<string, string | number>;

/** Readable column titles from fixture keys (snake_case → labels, common acronyms). */
function humanizeColumnLabel(key: string): string {
  const acronym: Record<string, string> = {
    id: 'ID',
    api: 'API',
    pa: 'PA',
    aba: 'ABA',
    ltv: 'LTV',
    dti: 'DTI',
    fha: 'FHA',
    va: 'VA',
    uldd: 'ULDD',
    qc: 'QC',
    epd: 'EPD',
    epo: 'EPO',
    sla: 'SLA',
    bps: 'BPS',
    srp: 'SRP',
    llpa: 'LLPA',
    mers: 'MERS',
    msr: 'MSR',
  };
  return key
    .split('_')
    .map((word) => {
      const lower = word.toLowerCase();
      if (acronym[lower]) return acronym[lower];
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function KpiRow({ items }: { items: Array<{ label: string; value: string; trend?: string }> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <PCard key={item.label} className="border-[var(--colors-border-common-default)]">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">{item.label}</p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-[var(--colors-text-icon-dark)]">{item.value}</p>
          {item.trend ? <p className="mt-1 text-xs text-[var(--colors-text-icon-medium)]">{item.trend}</p> : null}
        </PCard>
      ))}
    </div>
  );
}

export function WorkspacePage({
  prepend,
  prependPlacement = 'afterHeader',
  title,
  subtitle,
  color,
  kpis,
  rows,
  journeyStep,
  nextStep,
  nextStepDescription,
  fallbackLinks,
}: {
  prepend?: ReactNode;
  prependPlacement?: 'beforeHeader' | 'afterHeader';
  title: string;
  subtitle: string;
  color: string;
  kpis: Array<{ label: string; value: string; trend?: string }>;
  rows: Row[];
  journeyStep?: 'mark' | 'execute' | 'settle' | 'cash';
  nextStep?: { label: string; to: string };
  nextStepDescription?: string;
  fallbackLinks?: Array<{ label: string; to: string }>;
}) {
  const [viewState, setViewState] = useState<'default' | 'loading' | 'empty' | 'error' | 'readOnly'>('default');
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showDebugControls, setShowDebugControls] = useState(false);
  const { openDrawer } = useShell();
  const computedRows = viewState === 'empty' ? [] : rows;
  const columns = Object.keys(rows[0] ?? {}).map((key) => ({ key, label: humanizeColumnLabel(key) }));
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-4 p-4 pb-10">
      {prepend && prependPlacement === 'beforeHeader' ? <div className="space-y-6">{prepend}</div> : null}
      <PPageHeader
        title={title}
        subtitle={subtitle}
        color={color}
        actions={
          <>
            <PButton variant="outline" intent="accent" onClick={() => PToast.success('Export queued successfully')}>Export</PButton>
            <PButton onClick={() => setOpenModal(true)}>Run Workflow</PButton>
          </>
        }
      />
      {prepend && prependPlacement === 'afterHeader' ? <div className="space-y-4">{prepend}</div> : null}
      <aside
        aria-label="Prototype view controls"
        className={`rounded-[var(--border-radius-base)] border border-dashed p-3 ${
          viewState === 'error'
            ? 'border-destructive bg-destructive/10'
            : 'border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)]'
        }`}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--colors-text-icon-medium)]">
            Demo controls
          </span>
          <span className="text-[11px] text-[var(--colors-text-icon-placeholder)]">Demo preview · mock-backed</span>
          <PButton
            size="xs"
            variant="outline"
            intent="accent"
            onClick={() => setShowDebugControls((v) => !v)}
          >
            {showDebugControls ? 'Hide debug' : 'Show debug'}
          </PButton>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-[var(--colors-text-icon-dark)]">View state</span>
          <PButton size="xs" variant={viewState === 'default' ? 'solid' : 'outline'} intent="accent" onClick={() => setViewState('default')}>Default</PButton>
          <PButton size="xs" variant={viewState === 'loading' ? 'solid' : 'outline'} intent="accent" onClick={() => setViewState('loading')}>Loading</PButton>
          <PButton size="xs" variant={viewState === 'empty' ? 'solid' : 'outline'} intent="accent" onClick={() => setViewState('empty')}>Empty</PButton>
          {showDebugControls ? (
            <PButton size="xs" variant={viewState === 'error' ? 'solid' : 'outline'} intent="error" onClick={() => setViewState('error')}>Error</PButton>
          ) : null}
          <PButton size="xs" variant={viewState === 'readOnly' ? 'solid' : 'outline'} intent="ai" onClick={() => setViewState('readOnly')}>Read only</PButton>
          {showDebugControls ? (
            <PButton
              size="xs"
              intent="error"
              variant="outline"
              onClick={() => PToast.error('Debug only: simulated failure state')}
            >
              Simulate failure
            </PButton>
          ) : null}
        </div>
      </aside>
      {journeyStep && nextStepDescription ? (
        <WorkflowJourneyCard
          currentStep={journeyStep}
          nextStep={nextStep}
          nextStepDescription={nextStepDescription}
          fallbackLinks={fallbackLinks}
        />
      ) : null}
      <KpiRow items={kpis} />
      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <PDataTable
          rows={computedRows}
          rowKey={(_, index) => `${title}-${index}`}
          variant="default"
          loading={viewState === 'loading'}
          errored={viewState === 'error'}
          errorMessage="Service unavailable. Retry or continue in read-only mode."
          emptyTitle="No matching records"
          emptyMessage="Try adjusting filters or switching the operating mode."
          onRowClick={(row) => {
            const record = row as Row;
            const keys = Object.keys(record);
            const primary = keys[0] ?? 'id';
            const idKey = keys.find((k) => k.endsWith('_id') || k === 'id') ?? primary;
            openDrawer({
              type: inferDrawerEntity(title),
              id: String(record[idKey] ?? record[primary]),
              title: String(record[primary] ?? title),
              subtitle,
              meta: Object.fromEntries(keys.slice(0, 12).map((k) => [humanizeColumnLabel(k), String(record[k])])),
            });
          }}
          footer={<PPagination page={page} totalPages={5} onPageChange={(next) => setPage(Math.max(1, Math.min(5, next)))} />}
          columns={columns.map((column) => ({
            key: column.key as keyof Row,
            label: column.label,
            sortable: true,
            freeze: column.key === columns[0]?.key,
          }))}
        />
        <PCard title="Workflow Notes" description="Demo preview behavior (mock-backed data)">
          <ul className="space-y-2 text-sm leading-relaxed text-[var(--colors-text-icon-medium)]">
            <li>Default, loading, success, and blocked states represented in row data and status badges.</li>
            <li>Action controls are intentionally non-persistent and do not invoke backend APIs.</li>
            <li>All controls follow tokenized spacing/radius/focus-state conventions.</li>
            <li>Read-only mode simulates unavailable operations while preserving data visibility.</li>
          </ul>
        </PCard>
      </div>
      <PModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`${title} workflow`}
        description="Confirm workflow execution and review implications."
        showBack
        onBack={() => setOpenModal(false)}
      >
        <div className="space-y-3">
          <PInput label="Execution note" placeholder="Add reason/context for this action" readOnlyState={viewState === 'readOnly'} />
          <PSelect
            label="Priority"
            options={[{ label: 'Standard', value: 'standard' }, { label: 'Urgent', value: 'urgent' }]}
            readOnlyState={viewState === 'readOnly'}
          />
          <div className="flex justify-end gap-2">
            <PButton variant="outline" intent="accent" onClick={() => setOpenModal(false)}>Cancel</PButton>
            <PButton
              onClick={() => {
                setOpenModal(false);
                PToast.success('Workflow completed successfully');
              }}
              isLoading={viewState === 'loading'}
              loadingText="Running..."
            >
              Confirm
            </PButton>
          </div>
        </div>
      </PModal>
    </div>
  );
}

export function BuyerApiConfigPage() {
  const [tab, setTab] = useState('base');
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-4 p-4 pb-8">
      <PPageHeader title="Buyer API Config" subtitle="Infrastructure layer: API-first pricing contract management" color={PILLAR_PAGE_ACCENT.bluePricing} />
      <PTabset tabs={[{ id: 'base', label: 'Base Fields' }, { id: 'llpa', label: 'LLPA/SRP Fields' }, { id: 'eligibility', label: 'Eligibility Fields' }]} activeTab={tab} onTabChange={setTab}>
        <div className="grid gap-4 xl:grid-cols-2">
          <PCard title="Endpoint contract" description="Versioned base URL, transport security, and call timeout for pricing requests">
            <div className="grid gap-2">
              <PInput label="Endpoint URL" defaultValue="https://buyer-a.internal/pricing/v2" />
              <PSelect label="Auth Strategy" options={[{ label: 'mTLS + JWT', value: 'mtls' }, { label: 'OAuth2', value: 'oauth' }]} />
              <PInput label="Timeout (ms)" defaultValue="3200" />
            </div>
          </PCard>
          <PCard title="Payload simulation" description="Sample request/response body for contract tests and regression">
            <pre className="overflow-auto rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3 font-mono text-xs text-[var(--colors-text-icon-dark)]">{`{ "base_price": 100.225, "llpa": -0.75, "srp": 1.125 }`}</pre>
            <div className="mt-3 flex flex-wrap gap-2">
              <PButton>Validate payload</PButton>
              <PButton variant="outline" intent="accent">
                Rollback test
              </PButton>
            </div>
          </PCard>
        </div>
      </PTabset>
    </div>
  );
}

export const BasePricingMarksPage = () => (
  <WorkspacePage
    title="Base Pricing & Marks"
    subtitle="Manage base price feeds, overlays, and dynamic mark policies"
    color={PILLAR_PAGE_ACCENT.bluePricing}
    kpis={[
      { label: 'Active buyers', value: '24' },
      { label: 'Mark policy breaches', value: '3', trend: 'last 24h' },
      { label: 'Avg recalc latency', value: '1.4s' },
      { label: 'Reverted changes', value: '8', trend: 'last 7 days' },
    ]}
    rows={[
      { buyer: 'Acme Capital', base_price: 100.127, mark_bps: 18, state: 'active' },
      { buyer: 'North River', base_price: 100.054, mark_bps: 22, state: 'pending' },
      { buyer: 'Bayline', base_price: 99.987, mark_bps: 26, state: 'warning' },
    ]}
    journeyStep="mark"
    nextStep={{ label: 'Pipeline marks', to: '/trading/pipeline-marks' }}
    nextStepDescription="Marks are set. Move into execution discovery to evaluate reserve spread and early bid candidates."
    fallbackLinks={[
      { label: 'Buyer API', to: '/pricing/buyer-api' },
      { label: 'Eligibility rules', to: '/pricing/eligibility' },
    ]}
  />
);

export const EligibilityRulesPage = () => (
  <WorkspacePage
    prepend={<EligibilityNlpAssistantPanel />}
    prependPlacement="afterHeader"
    title="Eligibility & Rule Updates"
    subtitle="Rule groups and live eligibility overlays"
    color={PILLAR_PAGE_ACCENT.bluePricing}
    kpis={[
      { label: 'Rule groups', value: '17' },
      { label: 'Published versions', value: '63' },
      { label: 'Draft versions', value: '4' },
      { label: 'Failed validations', value: '1' },
    ]}
    rows={[
      { rule_group: 'Conventional Core', products: 42, last_update: '10:42', state: 'active' },
      { rule_group: 'Jumbo Overlay', products: 13, last_update: '09:18', state: 'active' },
      { rule_group: 'CRA Expansion', products: 9, last_update: '08:05', state: 'pending' },
    ]}
  />
);

export const LlpSrpWorkspacePage = () => (
  <WorkspacePage
    prepend={<LlpSrpDeferredCallouts />}
    prependPlacement="afterHeader"
    title="LLPA/SRP Config Workspace"
    subtitle="Grid and cash-flow based adjustment workbench"
    color={PILLAR_PAGE_ACCENT.bluePricing}
    kpis={[
      { label: 'Grid cells', value: '182' },
      { label: 'Scenario runs', value: '47' },
      { label: 'Outlier alerts', value: '2' },
      { label: 'Approval requests', value: '6' },
    ]}
    rows={[
      { profile: 'DTI>45 / FICO<680', llpa_bps: -75, srp_bps: 24, state: 'active' },
      { profile: 'LTV>90 / MI card', llpa_bps: -55, srp_bps: 18, state: 'pending' },
      { profile: 'CRA eligible', llpa_bps: 22, srp_bps: 12, state: 'active' },
    ]}
  />
);

export const BestEffortsDeskPage = () => (
  <WorkspacePage
    prepend={<TradingDeskAugmentation variant="best-efforts" />}
    title="Best Efforts Desk"
    subtitle="Recommended buyer matching and commitment capture"
    color={PILLAR_PAGE_ACCENT.yellowExchange}
    kpis={[
      { label: 'Open locks', value: '114' },
      { label: 'Recommended switches', value: '19' },
      { label: 'Projected gain', value: '+$82k' },
      { label: 'Blocked requests', value: '5' },
    ]}
    rows={[
      { loan_id: 'LN-10121', current_buyer: 'Acme', suggested_buyer: 'North River', delta_bps: 14, state: 'active' },
      { loan_id: 'LN-10114', current_buyer: 'Bayline', suggested_buyer: 'Acme', delta_bps: 9, state: 'pending' },
    ]}
    journeyStep="execute"
    nextStep={{ label: 'Delivery inbox', to: '/settlement/delivery' }}
    nextStepDescription="Execution decision captured. Hand off selected loans to settlement intake for package validation."
    fallbackLinks={[
      { label: 'AI insights', to: '/insights/ai' },
      { label: 'Approvals', to: '/network/approvals' },
    ]}
  />
);

export const MandatoryBidDeskPage = () => (
  <WorkspacePage
    prepend={
      <>
        <AotCommitmentTimelinePanel />
        <TradingDeskAugmentation variant="mandatory" />
      </>
    }
    title="Mandatory Bid Desk"
    subtitle="Bid tape management and mandatory execution path"
    color={PILLAR_PAGE_ACCENT.yellowExchange}
    kpis={[
      { label: 'Bids in tape', value: '36' },
      { label: 'Spread variance', value: '4.2 bps' },
      { label: 'Committed lots', value: '9' },
      { label: 'Risk alerts', value: '2' },
    ]}
    rows={[
      { tape_id: 'TP-8821', seller: 'Harbor', bid_count: 6, best_bid: 101.18, state: 'active' },
      { tape_id: 'TP-8819', seller: 'Orion', bid_count: 4, best_bid: 100.94, state: 'processing' },
    ]}
    journeyStep="execute"
    nextStep={{ label: 'Delivery inbox', to: '/settlement/delivery' }}
    nextStepDescription="Mandatory path selected. Continue to settlement intake and condition loops."
    fallbackLinks={[
      { label: 'Integrations', to: '/network/integrations' },
      { label: 'Pipeline marks', to: '/trading/pipeline-marks' },
    ]}
  />
);

export const OpportunityDiscoveryPage = () => (
  <WorkspacePage
    prepend={<OpportunityBridgePanel />}
    title="Opportunity Discovery"
    subtitle="Agentic recommendation queue for buyer/seller matches"
    color={PILLAR_PAGE_ACCENT.purpleAi}
    kpis={[
      { label: 'AI opportunities', value: '42' },
      { label: 'High confidence', value: '17' },
      { label: 'Potential uplift', value: '+48 bps' },
      { label: 'Dismissed', value: '6' },
    ]}
    rows={[
      { opportunity_id: 'OP-214', side: 'buyer', confidence: 'High', expected_gain_bps: 16, state: 'active' },
      { opportunity_id: 'OP-213', side: 'seller', confidence: 'Medium', expected_gain_bps: 11, state: 'pending' },
    ]}
    journeyStep="execute"
    nextStep={{ label: 'Approval relationships', to: '/network/approvals' }}
    nextStepDescription="Turn high-confidence recommendations into approvals and counterparty introductions."
    fallbackLinks={[
      { label: 'Buyer directory', to: '/network/buyers' },
      { label: 'Shadow bidding', to: '/trading/shadow-bidding' },
    ]}
  />
);

export const MarketMakingControlsPage = () => (
  <WorkspacePage
    prepend={<MarketMakingIntentPanel />}
    title="Market Making Controls"
    subtitle="Intent signaling and guardrails for agentic matching"
    color={PILLAR_PAGE_ACCENT.purpleAi}
    kpis={[
      { label: 'Signal profiles', value: '7' },
      { label: 'Auto-match enabled', value: '4' },
      { label: 'Constraint breaks', value: '1' },
      { label: 'Manual overrides', value: '3' },
    ]}
    rows={[
      { profile: 'Conservative', min_margin_bps: 22, max_spread_bps: 14, state: 'active' },
      { profile: 'Aggressive', min_margin_bps: 12, max_spread_bps: 24, state: 'warning' },
    ]}
    journeyStep="execute"
    nextStep={{ label: 'Best efforts desk', to: '/trading/best-efforts' }}
    nextStepDescription="Intent profiles are set. Validate execution outcomes on best-efforts and mandatory desks."
    fallbackLinks={[
      { label: 'Mandatory desk', to: '/trading/mandatory-bid' },
      { label: 'Pipeline marks', to: '/trading/pipeline-marks' },
    ]}
  />
);

export const PipelineMarksPage = () => (
  <WorkspacePage
    prepend={<PipelineMarksContextStrip />}
    title="Pipeline Marks"
    subtitle="Hybrid best-efforts pipeline marks and reserve-spread signaling"
    color={PILLAR_PAGE_ACCENT.yellowExchange}
    kpis={[
      { label: 'Pipeline loans', value: '862' },
      { label: 'Early bid candidates', value: '138' },
      { label: 'Reserve spread met', value: '74' },
      { label: 'Hedge cost avoided', value: '$412K' },
    ]}
    rows={[
      { loan_id: 'PL-22014', seller: 'Northpoint', reserve_spread_bps: 12, bid_above_proxy_bps: 16, state: 'active' },
      { loan_id: 'PL-22011', seller: 'Keystone', reserve_spread_bps: 10, bid_above_proxy_bps: 7, state: 'warning' },
    ]}
    journeyStep="execute"
    nextStep={{ label: 'Best efforts desk', to: '/trading/best-efforts' }}
    nextStepDescription="Reserve-spread candidates are identified. Route selected loans to execution desks."
    fallbackLinks={[
      { label: 'Mandatory desk', to: '/trading/mandatory-bid' },
      { label: 'AI insights', to: '/insights/ai' },
    ]}
  />
);

export const ShadowBiddingPage = () => (
  <WorkspacePage
    title="Shadow Bidding"
    subtitle="Approval-aware simulated bidding and what-if pricing outcomes"
    color={PILLAR_PAGE_ACCENT.purpleAi}
    kpis={[
      { label: 'Shadow scenarios', value: '57' },
      { label: 'Approval exceptions', value: '5' },
      { label: 'Projected uplift', value: '+31 bps' },
      { label: 'Promotion ready', value: '14' },
    ]}
    rows={[
      { scenario_id: 'SB-404', seller: 'Harbor', buyer_candidate: 'Penny-like profile', confidence: 'high', state: 'active' },
      { scenario_id: 'SB-399', seller: 'Orion', buyer_candidate: 'Rocket-like profile', confidence: 'medium', state: 'pending' },
    ]}
  />
);

export const DeliveryInboxPage = () => (
  <WorkspacePage
    title="Delivery Inbox"
    subtitle="Settlement intake queue and package completeness checks"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'Packages today', value: '73' },
      { label: 'Ready to clear', value: '41' },
      { label: 'Conditioned', value: '19' },
      { label: 'Returned', value: '4' },
    ]}
    rows={[
      { package_id: 'PK-7721', loan_id: 'LN-9821', completeness: '96%', next_step: 'clearing', state: 'active' },
      { package_id: 'PK-7718', loan_id: 'LN-9816', completeness: '72%', next_step: 'conditioning', state: 'warning' },
    ]}
  />
);

export const ConditioningWorkspacePage = () => (
  <WorkspacePage
    prepend={<ConditionHandoffPanel />}
    title="Conditioning Workspace"
    subtitle="Resolve delivery exceptions and condition loops"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'Open conditions', value: '31' },
      { label: 'Aging > 48h', value: '7' },
      { label: 'Turnaround avg', value: '11h' },
      { label: 'Escalations', value: '2' },
    ]}
    rows={[
      { condition_id: 'CD-902', severity: 'High', owner: 'Settlement Ops', due_by: 'EOD', state: 'warning' },
      { condition_id: 'CD-894', severity: 'Medium', owner: 'Doc Review', due_by: 'Tomorrow', state: 'active' },
    ]}
    journeyStep="settle"
    nextStep={{ label: 'Purchase advice', to: '/settlement/purchase-advice' }}
    nextStepDescription="Condition loops are progressing. Continue to purchase advice generation once exceptions are cleared."
    fallbackLinks={[
      { label: 'Clearing queue', to: '/settlement/clearing' },
      { label: 'Reconciliation', to: '/settlement/reconciliation' },
    ]}
  />
);

export const ClearingQueuePage = () => (
  <WorkspacePage
    prepend={<ConditionHandoffPanel />}
    title="Clearing Queue"
    subtitle="Clear/return loops and escrow controls"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'Ready to clear', value: '28' },
      { label: 'Escrow holds', value: '5' },
      { label: 'Clearance SLA', value: '98.2%' },
      { label: 'Re-opened', value: '3' },
    ]}
    rows={[
      { queue_id: 'CQ-77', package_id: 'PK-7721', escrow_status: 'cleared', state: 'active' },
      { queue_id: 'CQ-75', package_id: 'PK-7709', escrow_status: 'on_hold', state: 'pending' },
    ]}
    journeyStep="settle"
    nextStep={{ label: 'Purchase advice', to: '/settlement/purchase-advice' }}
    nextStepDescription="Clearing decisions and seller handoff are complete. Continue to purchase advice generation."
    fallbackLinks={[
      { label: 'Conditioning', to: '/settlement/conditioning' },
      { label: 'Cash & escrow', to: '/settlement/cash' },
    ]}
  />
);

export const PurchaseAdviceWorkspacePage = () => (
  <WorkspacePage
    prepend={<PurchaseAdviceAugmentation />}
    title="Purchase Advice Workspace"
    subtitle="Purchase advice generation and approval workflow"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'Generated today', value: '22' },
      { label: 'Pending approval', value: '8' },
      { label: 'Approved', value: '13' },
      { label: 'Rejected', value: '1' },
    ]}
    rows={[
      { advice_id: 'PA-812', buyer: 'North River', amount: '$8.4M', approver: 'Lock Desk', state: 'processing' },
      { advice_id: 'PA-809', buyer: 'Acme', amount: '$7.9M', approver: 'Settlement Lead', state: 'active' },
    ]}
    journeyStep="settle"
    nextStep={{ label: 'Reconciliation', to: '/settlement/reconciliation' }}
    nextStepDescription="Purchase advice is generated. Reconcile bid snapshots and final delivered terms before funding release."
    fallbackLinks={[
      { label: 'Conditioning', to: '/settlement/conditioning' },
      { label: 'Integrations', to: '/network/integrations' },
    ]}
  />
);

export const OperationalCompliancePage = () => (
  <WorkspacePage
    title="Operational Compliance"
    subtitle="ULDD, document validation, fraud checks, and workflow rules"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'ULDD packages', value: '63' },
      { label: 'Doc mismatches', value: '9' },
      { label: 'Fraud flags', value: '2' },
      { label: 'Conditional QC', value: '17' },
    ]}
    rows={[
      { package_id: 'PK-7742', uldd_status: 'validated', fraud_scan: 'clear', qc_rule_path: 'standard', state: 'active' },
      { package_id: 'PK-7734', uldd_status: 'exception', fraud_scan: 'manual_review', qc_rule_path: 'enhanced', state: 'warning' },
    ]}
  />
);

export const ReconciliationAdjustmentsPage = () => (
  <WorkspacePage
    prepend={<ReconciliationAdjustmentsAugmentation />}
    title="Reconciliation"
    subtitle="Bid snapshot reconciliation, late-delivery rolls, and purchase adjustments"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'Reconciled today', value: '44' },
      { label: 'Delta exceptions', value: '6' },
      { label: 'Interest adjustments', value: '11' },
      { label: 'Warehouse instructions', value: '29' },
    ]}
    rows={[
      { compare_id: 'RC-901', bid_snapshot_delta: '+4 bps', late_delivery: 'no', adjustment_status: 'accepted', state: 'active' },
      { compare_id: 'RC-895', bid_snapshot_delta: '-11 bps', late_delivery: 'yes', adjustment_status: 'disputed', state: 'warning' },
    ]}
    journeyStep="settle"
    nextStep={{ label: 'Cash & escrow', to: '/settlement/cash' }}
    nextStepDescription="Reconciliation outcomes are ready. Move to escrow release controls for final cash settlement."
    fallbackLinks={[
      { label: 'Purchase advice', to: '/settlement/purchase-advice' },
      { label: 'Conditioning', to: '/settlement/conditioning' },
    ]}
  />
);

export const ServicingOnboardingPage = () => (
  <WorkspacePage
    title="Servicing Onboarding"
    subtitle="Servicing data handoff, transfer communication, and payment-date readiness"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'Transfers in flight', value: '28' },
      { label: 'Payment date aligned', value: '93%' },
      { label: 'Goodbye letters', value: '23 queued' },
      { label: 'Servicing API health', value: '98.7%' },
    ]}
    rows={[
      { transfer_id: 'SV-122', servicing_system: 'MSP', data_upload: 'complete', transfer_notice: 'queued', state: 'active' },
      { transfer_id: 'SV-119', servicing_system: 'Sagent', data_upload: 'retrying', transfer_notice: 'pending', state: 'processing' },
    ]}
  />
);

export const CustodialTrackingPage = () => (
  <WorkspacePage
    title="Custodial Tracking"
    subtitle="E-Notes, MERS transfer trail, and custody exceptions"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'E-notes tracked', value: '512' },
      { label: 'MERS events', value: '744' },
      { label: 'Custody breaks', value: '3' },
      { label: 'Audit-ready trail', value: '99.1%' },
    ]}
    rows={[
      { note_id: 'EN-7712', mers_event: 'transfer_complete', chain_integrity: 'verified', state: 'active' },
      { note_id: 'EN-7701', mers_event: 'awaiting_update', chain_integrity: 'pending', state: 'pending' },
    ]}
  />
);

export const PostClosingPerformancePage = () => (
  <WorkspacePage
    title="Post Closing Performance"
    subtitle="EPO/EPD, delinquency, recapture, and prepay servicing signals"
    color={PILLAR_PAGE_ACCENT.greenSettlement}
    kpis={[
      { label: 'EPO alerts', value: '4' },
      { label: 'EPD alerts', value: '2' },
      { label: 'Delinquency trend', value: '1.7%' },
      { label: 'Recapture opportunities', value: '37' },
    ]}
    rows={[
      { portfolio_segment: 'Conv 30Y', epo_rate: '0.8%', epd_rate: '0.3%', servicing_signal: 'stable', state: 'active' },
      { portfolio_segment: 'FHA 30Y', epo_rate: '1.6%', epd_rate: '0.9%', servicing_signal: 'watch', state: 'warning' },
    ]}
  />
);

export const BuyerDirectoryPage = () => (
  <WorkspacePage
    title="Buyer Directory"
    subtitle="Buyer profile, appetite and API health matrix"
    color={PILLAR_PAGE_ACCENT.yellowExchange}
    kpis={[
      { label: 'Connected buyers', value: '24' },
      { label: 'Active appetite updates', value: '11' },
      { label: 'API warnings', value: '2' },
      { label: 'Approved programs', value: '84' },
    ]}
    rows={[
      { buyer: 'Acme', product_scope: 'Conv/FHA/VA', api_health: 'healthy', approvals: 12, state: 'active' },
      { buyer: 'North River', product_scope: 'Conv/Jumbo', api_health: 'degraded', approvals: 9, state: 'warning' },
    ]}
  />
);

export const SellerDirectoryPage = () => (
  <WorkspacePage
    title="Seller Directory"
    subtitle="Seller metadata and execution preference controls"
    color={PILLAR_PAGE_ACCENT.yellowExchange}
    kpis={[
      { label: 'Active sellers', value: '39' },
      { label: 'Eligibility mismatches', value: '4' },
      { label: 'Preferred mandatory', value: '18' },
      { label: 'Preferred best-efforts', value: '21' },
    ]}
    rows={[
      { seller: 'Harbor', lock_policy: 'mandatory first', profile: 'high volume', state: 'active' },
      { seller: 'Orion', lock_policy: 'best efforts', profile: 'mixed', state: 'active' },
    ]}
  />
);

export const ApprovalRelationshipsPage = () => (
  <WorkspacePage
    title="Approval Relationships"
    subtitle="Buyer/seller approval graph and policy exceptions"
    color={PILLAR_PAGE_ACCENT.yellowExchange}
    kpis={[
      { label: 'Relationships', value: '112' },
      { label: 'Pending approvals', value: '6' },
      { label: 'Expired approvals', value: '3' },
      { label: 'Policy exceptions', value: '2' },
    ]}
    rows={[
      { buyer: 'Acme', seller: 'Harbor', approval_scope: 'mandatory', expires: '2026-08-01', state: 'active' },
      { buyer: 'North River', seller: 'Orion', approval_scope: 'best_efforts', expires: '2026-05-30', state: 'pending' },
    ]}
  />
);

const lineData = [
  { day: 'Mon', actual: 36, projection: 34 },
  { day: 'Tue', actual: 41, projection: 36 },
  { day: 'Wed', actual: 45, projection: 38 },
  { day: 'Thu', actual: 39, projection: 39 },
  { day: 'Fri', actual: 47, projection: 40 },
];

const barData = [
  { bucket: 'Retail', value: 38 },
  { bucket: 'Broker', value: 27 },
  { bucket: 'Consumer Direct', value: 18 },
  { bucket: 'Correspondent', value: 17 },
];

function AnalyticsPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-4 p-4 pb-10">
      <PPageHeader
        title={title}
        subtitle={subtitle}
        color={PILLAR_PAGE_ACCENT.magentaAnalytics}
        actions={<PButton variant="outline" intent="accent">Download CSV</PButton>}
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <PChartCard title="Actual vs Projection" subtitle="Sequential and projection palette semantics">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--colors-border-common-default,#e5e7eb)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--colors-text-icon-medium)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--colors-text-icon-medium)" />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="var(--chart-1)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="projection" stroke="var(--chart-projection)" strokeDasharray="4 4" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </PChartCard>
        <PChartCard title="Segment Distribution" subtitle="Categorical palette usage">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--colors-border-common-default,#e5e7eb)" />
              <XAxis dataKey="bucket" tick={{ fontSize: 11 }} stroke="var(--colors-text-icon-medium)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--colors-text-icon-medium)" />
              <Tooltip />
              <Bar dataKey="value" fill="var(--chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </PChartCard>
      </div>
    </div>
  );
}

export const AnalyticsExecutionDeltaPage = () => <AnalyticsPage title="Execution Delta" subtitle="Execution spread and fallback comparison" />;
export const AnalyticsMarginAccuracyPage = () => <AnalyticsPage title="Margin Accuracy" subtitle="Observed vs configured margin accuracy" />;
export const AnalyticsMarketSharePage = () => <AnalyticsPage title="Market Share" subtitle="Channel and buyer share observations" />;
export const AnalyticsSlaThroughputPage = () => <AnalyticsPage title="SLA & Throughput" subtitle="Flow timings from intake to settlement" />;

export const AdminTemplatesPage = () => (
  <WorkspacePage
    title="Rule Templates"
    subtitle="Template catalog for pricing and settlement policies"
    color={PILLAR_PAGE_ACCENT.bluePricing}
    kpis={[
      { label: 'Templates', value: '29' },
      { label: 'Draft updates', value: '4' },
      { label: 'Recently published', value: '7' },
      { label: 'Deprecation candidates', value: '3' },
    ]}
    rows={[
      { template: 'Conventional Core', owner: 'Pricing Ops', version: 'v8', state: 'active' },
      { template: 'Settlement Escrow', owner: 'Settlement Ops', version: 'v3', state: 'pending' },
    ]}
  />
);

export function AdminRolesPage() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-4 p-4 pb-10">
      <PPageHeader title="User Roles" subtitle="Visual-only role controls for this UX phase" />
      <PCard title="Role policy matrix" description="Capability flags by role — interactive publish and settlement gates ship in a later phase">
        <PDataTable
          rowKey={(row) => String(row.role)}
          rows={[
            { role: 'Admin', can_publish: 'Yes', can_approve_settlement: 'Yes', can_manage_users: 'Yes' },
            { role: 'Desk Operator', can_publish: 'No', can_approve_settlement: 'Yes', can_manage_users: 'No' },
            { role: 'Analyst', can_publish: 'No', can_approve_settlement: 'No', can_manage_users: 'No' },
          ]}
          columns={[
            { key: 'role', label: 'Role', sortable: true },
            { key: 'can_publish', label: 'Publish', sortable: true },
            { key: 'can_approve_settlement', label: 'Settlement Approval', sortable: true },
            { key: 'can_manage_users', label: 'User Mgmt', sortable: true },
          ]}
        />
      </PCard>
    </div>
  );
}

export const AdminPoliciesPage = () => (
  <WorkspacePage
    title="Notification & Workflow Policies"
    subtitle="Global policy settings for alerts and escalations"
    color={PILLAR_PAGE_ACCENT.bluePricing}
    kpis={[
      { label: 'Policies', value: '14' },
      { label: 'Escalation paths', value: '9' },
      { label: 'Quiet windows', value: '3' },
      { label: 'Policy conflicts', value: '1' },
    ]}
    rows={[
      { policy: 'Settlement SLA Breach', channel: 'email+slack', severity: 'high', state: 'active' },
      { policy: 'Pricing Drift Alert', channel: 'in-app', severity: 'medium', state: 'active' },
    ]}
  />
);

export function AdapterShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-4 p-4 pb-12">
      <PPageHeader title="Adapter Showcase" subtitle="State parity reference for React adapter layer" color={PILLAR_PAGE_ACCENT.purpleAi} />
      <div className="grid gap-4 xl:grid-cols-2">
        <PCard title="Buttons">
          <div className="flex flex-wrap gap-2">
            <PButton intent="primary">Primary</PButton>
            <PButton intent="accent">Accent</PButton>
            <PButton intent="error">Error</PButton>
            <PButton intent="ai">AI</PButton>
            <PButton variant="outline" intent="accent">Outline</PButton>
            <PButton variant="text" intent="accent">Text</PButton>
            <PButton isLoading loadingText="Loading">Loading</PButton>
            <PButton radius="round" leftIcon={<Icon name="sparkles" size={12} />} aria-label="Icon only" />
          </div>
        </PCard>
        <PCard title="Inputs">
          <div className="space-y-2">
            <PInput label="Default" hint="Helper text slot" placeholder="Enter value" />
            <PInput label="Errored" error="Required field missing" defaultValue="" />
            <PInput label="Read only" readOnlyState defaultValue="Locked value" />
            <PSelect label="Select" options={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }]} />
          </div>
        </PCard>
      </div>
      <PCard title="Modal and Toast">
        <div className="flex gap-2">
          <PButton onClick={() => setModalOpen(true)}>Open Modal</PButton>
          <PButton variant="outline" intent="accent" onClick={() => PToast.info('Neutral toast')}>Toast Info</PButton>
          <PButton variant="outline" intent="error" onClick={() => PToast.error('Error toast')}>Toast Error</PButton>
        </div>
      </PCard>
      <PModal open={modalOpen} onClose={() => setModalOpen(false)} title="Adapter modal sample" description="Demonstrates default modal shell and actions.">
        <p className="text-sm leading-relaxed text-[var(--colors-text-icon-medium)]">
          This demonstrates the standardized modal experience for workflow confirmation.
        </p>
      </PModal>
    </div>
  );
}

export const MonetizationModelPage = () => (
  <WorkspacePage
    title="Monetization Model"
    subtitle="Per-loan buyer/seller pricing model and adoption scenario planner"
    color={PILLAR_PAGE_ACCENT.bluePricing}
    kpis={[
      { label: 'Buyer fee / loan', value: '$68' },
      { label: 'Seller fee / loan', value: '$42' },
      { label: 'Projected margin', value: '37%' },
      { label: 'Anchor partner scenarios', value: '10' },
    ]}
    rows={[
      { cohort: 'Top 5 buyers', avg_loans_month: 12200, net_revenue_month: '$1.34M', state: 'active' },
      { cohort: 'Tier-2 expansion', avg_loans_month: 4800, net_revenue_month: '$412K', state: 'pending' },
    ]}
  />
);
