import { PButton, PDataTable, PStatusBadge, PToast } from '../polly';
import { PollyInlineAlert } from '../shell/PollyInlineAlert';
import { PStatTile } from '../shell/PStatTile';
import { activeCommitments, investorBidsSnapshot } from '../../data/fixtures';
import { useShell } from '../../context/ShellContext';

type Variant = 'best-efforts' | 'mandatory';

export function TradingDeskAugmentation({ variant }: { variant: Variant }) {
  const { openDrawer } = useShell();
  const isMandatory = variant === 'mandatory';
  const beVsMandatoryRows = [
    { loan_id: 'LN-10121', best_efforts_price: '100.94', mandatory_price: '101.08', delta_bps: '+14', suggested_path: 'Mandatory' },
    { loan_id: 'LN-10114', best_efforts_price: '100.76', mandatory_price: '100.85', delta_bps: '+9', suggested_path: 'Mandatory' },
    { loan_id: 'LN-10111', best_efforts_price: '101.02', mandatory_price: '100.98', delta_bps: '-4', suggested_path: 'Best efforts' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[var(--border-radius-lg)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-4 shadow-[var(--shadow-s)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--colors-text-icon-dark)]">
              {isMandatory ? 'Capital markets snapshot · Mandatory path' : 'Capital markets snapshot · Best efforts'}
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-[var(--colors-text-icon-medium)]">
              Investor liquidity, commitments, and utilization — complements the loan-level desk grid below.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PButton variant="outline" intent="accent" size="sm" onClick={() => PToast.info('Compare investors — prototype')}>
              Compare liquidity
            </PButton>
            <PButton size="sm" intent="primary" onClick={() => PToast.success('Scenario analysis queued — prototype')}>
              Run desk analysis
            </PButton>
          </div>
        </div>
      </div>

      {isMandatory ? (
        <PollyInlineAlert tone="warning" icon="triangle-exclamation" title="Hedge advisors & bid tapes (Brief)">
          Large aggregators and hedge advisors often have <strong>direct investor integrations</strong>. Polly&apos;s value is tractability
          and consistent pricing APIs — expect partner politics, not just UI. Demos should acknowledge non-intermediation risk.
        </PollyInlineAlert>
      ) : (
        <PollyInlineAlert tone="info" title="PPE integration dependency">
          Automated best-efforts locking requires participating PPEs to implement the Buyer API lock workflow (Brief execution notes).
        </PollyInlineAlert>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile
          title="Best execution gain"
          value="+45.2 bps"
          change="vs fallback investor"
          changeType="positive"
          icon="trending-up"
        />
        <PStatTile title="Active commitments" value="$184.5M" subtitle="Across fixture investors" icon="boxes-stacked" />
        <PStatTile title="Active liquidity profiles" value="28" change="+2 vs prior month" changeType="positive" icon="users" />
        <PStatTile title="Delivery compliance" value="98.4%" change="90d rolling" changeType="positive" icon="circle-check" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section
          aria-label="Investor bid liquidity"
          className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4"
        >
          <h3 className="mb-3 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Investor bid snapshot</h3>
          <PDataTable
            variant="compact"
            rowKey={(row) => `${row.investor}-${row.product}`}
            rows={investorBidsSnapshot}
            onRowClick={(row) =>
              openDrawer({
                type: 'loan',
                id: row.investor,
                title: row.investor,
                subtitle: `${row.product} · ${row.volume}`,
                meta: {
                  'Avg price': row.avgPrice,
                  Margin: row.margin,
                  Loans: String(row.loans),
                  Status: row.status,
                },
              })
            }
            columns={[
              { key: 'investor', label: 'Investor', sortable: true, freeze: true },
              { key: 'product', label: 'Product', sortable: true },
              { key: 'loans', label: 'Loans', sortable: true },
              { key: 'volume', label: 'Volume', sortable: true },
              {
                key: 'status',
                label: 'Status',
                render: (v) => <PStatusBadge status={v === 'active' ? 'active' : 'pending'} label={v} />,
              },
            ]}
          />
        </section>

        <section
          aria-label="Commitments and utilization"
          className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4"
        >
          <h3 className="mb-3 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Active commitments & utilization</h3>
          <PDataTable
            variant="compact"
            rowKey={(row) => row.id}
            rows={activeCommitments}
            onRowClick={(row) =>
              openDrawer({
                type: 'tape',
                id: row.id,
                title: row.id,
                subtitle: `${row.investor} · ${row.type}`,
                meta: {
                  Volume: row.volume,
                  'Delivery date': row.deliveryDate,
                  Utilization: row.utilization,
                  Status: row.status,
                },
              })
            }
            columns={[
              { key: 'id', label: 'Commitment ID', sortable: true, freeze: true },
              { key: 'investor', label: 'Investor', sortable: true },
              {
                key: 'type',
                label: 'Type',
                render: (v) => <PStatusBadge status={v === 'Mandatory' ? 'warning' : 'info'} label={v} />,
              },
              { key: 'deliveryDate', label: 'Delivery', sortable: true },
              {
                key: 'utilization',
                label: 'Utilization',
                align: 'right',
                render: (v) => {
                  const pct = parseInt(String(v), 10);
                  const tone =
                    pct >= 90 ? 'text-[var(--colors-text-icon-error,#d63447)]' : pct >= 70 ? 'text-[var(--colors-text-icon-warning,#e67e22)]' : 'text-[var(--colors-text-icon-success,#27ae60)]';
                  return <span className={`font-medium ${tone}`}>{v}</span>;
                },
              },
            ]}
          />
        </section>
      </div>
      <section aria-label="Best efforts vs mandatory comparator">
        <h3 className="mb-3 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Best efforts vs mandatory comparator</h3>
        <PDataTable
          variant="compact"
          rowKey={(row) => row.loan_id}
          rows={beVsMandatoryRows}
          columns={[
            { key: 'loan_id', label: 'Loan ID', sortable: true, freeze: true },
            { key: 'best_efforts_price', label: 'Best efforts', sortable: true },
            { key: 'mandatory_price', label: 'Mandatory', sortable: true },
            { key: 'delta_bps', label: 'Delta (bps)', sortable: true },
            {
              key: 'suggested_path',
              label: 'Suggested path',
              render: (v) => <PStatusBadge status={v === 'Mandatory' ? 'warning' : 'info'} label={v} />,
            },
          ]}
          onRowClick={(row) =>
            openDrawer({
              type: 'loan',
              id: row.loan_id,
              title: `Execution comparison ${row.loan_id}`,
              subtitle: `Suggested path: ${row.suggested_path}`,
              meta: {
                'Best efforts': row.best_efforts_price,
                Mandatory: row.mandatory_price,
                'Delta bps': row.delta_bps,
                'Suggested path': row.suggested_path,
              },
            })
          }
        />
      </section>
    </div>
  );
}
