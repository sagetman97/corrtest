import { Link, useNavigate } from 'react-router';
import { Icon, IconName } from '../../components/Icon';
import { PollyInlineAlert } from '../../components/shell/PollyInlineAlert';
import { PStatTile } from '../../components/shell/PStatTile';
import { PButton, PCard, PDataTable, PPageHeader, PStatusBadge } from '../../components/polly';
import { activeExceptions, loans, recentActivity } from '../../data/fixtures';
import { useShell } from '../../context/ShellContext';

function activityStatus(s: (typeof recentActivity)[number]['status']) {
  const map = {
    locked: 'locked' as const,
    success: 'success' as const,
    warning: 'warning' as const,
    pending: 'pending' as const,
    active: 'active' as const,
    processing: 'processing' as const,
  };
  return map[s];
}

const ledgerAccent: Record<
  'warning' | 'info' | 'success',
  { bar: string; iconWrap: string; icon: string }
> = {
  warning: {
    bar: 'border-l-4 border-l-[var(--colors-text-icon-warning,#e67e22)]',
    iconWrap: 'bg-[#fef3e7] text-[var(--colors-text-icon-warning,#e67e22)]',
    icon: 'text-[var(--colors-text-icon-warning,#e67e22)]',
  },
  info: {
    bar: 'border-l-4 border-l-[var(--colors-border-common-accent,#1c67fe)]',
    iconWrap: 'bg-[#e7ecfc] text-[var(--colors-border-common-accent,#1c67fe)]',
    icon: 'text-[var(--colors-border-common-accent,#1c67fe)]',
  },
  success: {
    bar: 'border-l-4 border-l-[var(--colors-text-icon-success,#27ae60)]',
    iconWrap: 'bg-[#e8f5ef] text-[var(--colors-text-icon-success,#27ae60)]',
    icon: 'text-[var(--colors-text-icon-success,#27ae60)]',
  },
};

function AssumptionLedgerRow({
  tone,
  badgeStatus,
  badgeLabel,
  icon,
  headline,
  body,
}: {
  tone: keyof typeof ledgerAccent;
  badgeStatus: 'warning' | 'info' | 'success';
  badgeLabel: string;
  icon: IconName;
  headline: string;
  body: string;
}) {
  const a = ledgerAccent[tone];
  return (
    <li
      className={`overflow-hidden rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] shadow-[var(--shadow-s)] ${a.bar}`}
    >
      <div className="flex gap-4 p-4 sm:p-5">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--border-radius-base)] ${a.iconWrap}`}
          aria-hidden
        >
          <Icon name={icon} size={18} className={a.icon} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <PStatusBadge status={badgeStatus} label={badgeLabel} />
            <span className="text-xs font-medium text-[var(--colors-text-icon-medium)]">{headline}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--colors-text-icon-dark)]">{body}</p>
        </div>
      </div>
    </li>
  );
}

export function HomeDashboardPage() {
  const navigate = useNavigate();
  const { openDrawer } = useShell();
  const asOf = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-6 p-4 pb-10">
      <PPageHeader
        title="Operations overview"
        subtitle={`Infrastructure, execution, and settlement snapshot · Data as of ${asOf}`}
      />

      <PollyInlineAlert tone="info" title="Trust & auditability">
        Demo preview uses realistic mock data. Each key action is script-safe for walkthroughs; production lineage IDs,
        policy versions, and source attestations are planned in the next implementation phase.
      </PollyInlineAlert>

      {/* Primary KPI strip — Polly tokens via PStatTile */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile
          title="Buyer APIs healthy"
          value="18 / 19"
          change="1 endpoint degraded"
          changeType="warning"
          icon="network"
        />
        <PStatTile
          title="Execution opportunities"
          value="42"
          change="+12 vs yesterday"
          changeType="positive"
          icon="trending-up"
        />
        <PStatTile
          title="Settlement queue"
          value="73 loans"
          change="12 needing conditioning"
          changeType="warning"
          icon="boxes-stacked"
        />
        <PStatTile
          title="Margin delta"
          value="+36 bps"
          change="vs baseline execution path"
          changeType="positive"
          icon="bar-chart"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <PStatTile
          title="Best execution gain"
          value="+42.3 bps"
          subtitle="vs fallback investor"
          change="+2.1 bps vs 7d avg"
          changeType="positive"
          icon="bolt"
        />
        <PStatTile
          title="Lock processing time"
          value="2.4 min"
          change="-18% vs 30d avg"
          changeType="positive"
          icon="clock"
        />
      </div>

      <div className="grid gap-6 2xl:grid-cols-2">
        <section className="min-w-0" aria-labelledby="recent-activity-heading">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 id="recent-activity-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
              Recent activity
            </h2>
            <Link
              to="/trading/best-efforts"
              className="rounded-[var(--border-radius-sm)] text-xs font-medium text-[var(--colors-border-common-accent)] underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]"
            >
              View trading desks
            </Link>
          </div>
          <PDataTable
            variant="compact"
            rowKey={(row) => row.loan}
            rows={recentActivity}
            onRowClick={(row) =>
              openDrawer({
                type: 'loan',
                id: row.loan,
                title: row.borrower,
                subtitle: row.action,
                meta: {
                  Loan: row.loan,
                  Borrower: row.borrower,
                  Amount: row.amount,
                  Action: row.action,
                  Time: row.time,
                },
              })
            }
            columns={[
              { key: 'action', label: 'Action', sortable: true },
              { key: 'loan', label: 'Loan ID', sortable: true, freeze: true },
              { key: 'borrower', label: 'Borrower', sortable: true },
              { key: 'amount', label: 'Amount', sortable: true },
              { key: 'time', label: 'Time', sortable: true },
              {
                key: 'status',
                label: 'Status',
                render: (v) => <PStatusBadge status={activityStatus(v)} />,
              },
            ]}
          />
        </section>

        <section className="min-w-0" aria-labelledby="exceptions-heading">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 id="exceptions-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
              Active exceptions
            </h2>
            <div className="flex flex-wrap gap-2">
              <PButton size="sm" variant="outline" intent="accent" onClick={() => navigate('/settlement/reconciliation')}>
                Reconciliation
              </PButton>
              <PButton size="sm" intent="primary" onClick={() => navigate('/pricing/eligibility')}>
                Review queue
              </PButton>
            </div>
          </div>
          <PDataTable
            variant="compact"
            rowKey={(row) => row.id}
            rows={activeExceptions}
            onRowClick={(row) =>
              openDrawer({
                type: 'loan',
                id: row.loan,
                title: row.type,
                subtitle: `Exception ${row.id}`,
                meta: {
                  Exception: row.id,
                  Loan: row.loan,
                  Type: row.type,
                  Severity: row.severity,
                  Created: row.created,
                  Status: row.status,
                },
              })
            }
            columns={[
              { key: 'id', label: 'Exception ID', sortable: true, freeze: true },
              { key: 'loan', label: 'Loan ID', sortable: true },
              { key: 'type', label: 'Type', sortable: true },
              {
                key: 'severity',
                label: 'Severity',
                render: (v) => (
                  <PStatusBadge
                    status={v === 'High' ? 'error' : v === 'Medium' ? 'warning' : 'info'}
                    label={v}
                  />
                ),
              },
              { key: 'created', label: 'Created', sortable: true },
              {
                key: 'status',
                label: 'Status',
                render: (v) => <PStatusBadge status={v === 'pending' ? 'pending' : 'active'} label={v} />,
              },
            ]}
          />
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <PCard
          title="Pipeline spotlight"
          description="Live fixture loans — click to open context"
          className="border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)]"
        >
          <ul className="space-y-3">
            {loans.map((ln) => (
              <li key={ln.id}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 rounded-[var(--border-radius-sm)] border border-transparent px-2 py-2 text-left transition hover:border-[var(--colors-border-common-default)] hover:bg-[var(--colors-background-common-ultra-light-neutral)] focus:outline-none focus:ring-2 focus:ring-[var(--colors-border-common-accent)]"
                  onClick={() =>
                    openDrawer({
                      type: 'loan',
                      id: ln.id,
                      title: ln.borrower,
                      subtitle: ln.stage,
                      meta: {
                        'Loan ID': ln.id,
                        Buyer: ln.buyer,
                        Stage: ln.stage,
                        'Δ bps': String(ln.deltaBps),
                        Amount: ln.amount.toLocaleString(),
                      },
                    })
                  }
                >
                  <span>
                    <span className="font-medium text-[var(--colors-text-icon-dark)]">{ln.id}</span>
                    <span className="ml-2 text-sm text-[var(--colors-text-icon-medium)]">{ln.borrower}</span>
                  </span>
                  <PStatusBadge status={ln.status === 'attention' ? 'warning' : 'success'} label={ln.stage} />
                </button>
              </li>
            ))}
          </ul>
        </PCard>

        <PCard title="Quick actions" description="Jump to pillar workflows, executive views, and governance" className="border-[var(--colors-border-common-default)]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <PButton variant="outline" expand onClick={() => navigate('/pricing/programs')}>
              Pricing programs
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/pricing/buyer-api')}>
              Buyer API contract
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/settlement/delivery')}>
              Delivery inbox
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/settlement/cash')}>
              Cash & escrow
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/insights/ai')}>
              AI insights
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/insights/command')}>
              Command center
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/network/integrations')}>
              Integration health
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/settings/admin')}>
              Administration
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/insights')}>
              Insights hub
            </PButton>
            <PButton variant="outline" expand onClick={() => navigate('/support')}>
              Support
            </PButton>
          </div>
        </PCard>
      </div>

      <PCard
        title="Assumptions ledger"
        description="Working hypotheses for demos — cross-check with the Brief before roadmap lock-in."
        className="border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)]"
      >
        <p className="mb-4 text-sm leading-relaxed text-[var(--colors-text-icon-medium)]">
          Each row is a <span className="font-medium text-[var(--colors-text-icon-dark)]">traceable decision surface</span>: what we are
          temporarily treating as true in this prototype, and why it matters for correspondent execution and settlement.
        </p>
        <ul className="space-y-3" aria-label="Product and integration assumptions">
          <AssumptionLedgerRow
            tone="warning"
            badgeStatus="warning"
            badgeLabel="Assumption"
            icon="triangle-exclamation"
            headline="Settlement · cash & escrow"
            body="Cash-netting and escrow release rules are still in policy design for the next sprint — balances and release timing in this demo are illustrative."
          />
          <AssumptionLedgerRow
            tone="info"
            badgeStatus="info"
            badgeLabel="Open"
            icon="circle-info"
            headline="Network · seller data"
            body="Seller overlays and profiles are mocked from static fixtures until CRM or LOS sync defines the live contract."
          />
          <AssumptionLedgerRow
            tone="success"
            badgeStatus="success"
            badgeLabel="Covered"
            icon="circle-check"
            headline="IA · three-layer model"
            body="Best-efforts, mandatory bid, and settlement stacks in the nav intentionally mirror the Brief’s infrastructure, execution, and settlement story."
          />
        </ul>
      </PCard>
    </div>
  );
}
