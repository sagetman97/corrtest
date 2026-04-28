import { Link } from 'react-router';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PButton, PDataTable, PPageHeader, PStatusBadge } from '../../components/polly';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { PollyInlineAlert } from '../../components/shell/PollyInlineAlert';
import { PStatTile } from '../../components/shell/PStatTile';
import {
  cashSettlementLines,
  escrowMasterAccount,
  escrowSubAccounts,
  execVolumeTrend,
} from '../../data/fixtures';
import { useShell } from '../../context/ShellContext';

function escrowRowBadge(status: (typeof escrowSubAccounts)[number]['status']) {
  if (status === 'cleared') return <PStatusBadge status="success" label="Released" />;
  if (status === 'pending_release') return <PStatusBadge status="warning" label="Pending release" />;
  return <PStatusBadge status="error" label="On hold" />;
}

export function CashSettlementHubPage() {
  const { openDrawer } = useShell();

  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-8 p-4 pb-14">
      <PPageHeader
        title="Cash settlement & escrow"
        subtitle="Funding milestones, master/sub escrow, wires — Brief lines 49–54; warehouse instructions noted below"
        color={PILLAR_PAGE_ACCENT.greenSettlement}
        actions={
          <Link to="/settlement/reconciliation">
            <PButton variant="outline" intent="accent" size="sm">
              Reconciliation
            </PButton>
          </Link>
        }
      />

      <PollyInlineAlert tone="info" title="Escrow model (product brief)">
        Each buyer maintains a master escrow; each seller/customer maps to a sub-account. Agents release cash settlement once the
        buyer approves settlement work completed by operational agents — prototype shows balances only.
      </PollyInlineAlert>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile title="Funding today" value="$42.8M" change="vs prior session" changeType="positive" icon="dollar-sign" />
        <PStatTile title="Late settlements" value="2" change="SLA watch" changeType="warning" icon="circle-exclamation" />
        <PStatTile title="Cash breaks" value="1" change="Variance queue" changeType="warning" icon="triangle-exclamation" />
        <PStatTile title="Netting matched" value="97%" change="Dual-control checkpoints" changeType="positive" icon="circle-check" />
      </div>

      {/* Master escrow */}
      <section aria-labelledby="escrow-master-heading">
        <h2 id="escrow-master-heading" className="mb-3 text-base font-semibold text-[var(--colors-text-icon-dark)]">
          Master escrow account
        </h2>
        <div className="rounded-[var(--border-radius-lg)] border border-[var(--colors-border-common-accent)] bg-[var(--colors-background-common-white)] p-5 shadow-[var(--shadow-l)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">{escrowMasterAccount.label}</p>
              <p className="mt-1 text-lg font-semibold text-[var(--colors-text-icon-dark)]">{escrowMasterAccount.buyer}</p>
              <p className="mt-1 font-mono text-xs text-[var(--colors-text-icon-medium)]">{escrowMasterAccount.id}</p>
            </div>
            <PStatusBadge status="success" label={escrowMasterAccount.status} />
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
              <dt className="text-[11px] uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Ledger balance</dt>
              <dd className="mt-1 text-lg font-semibold text-[var(--colors-text-icon-dark)]">{escrowMasterAccount.balance}</dd>
            </div>
            <div className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
              <dt className="text-[11px] uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Available to release</dt>
              <dd className="mt-1 text-lg font-semibold text-[var(--colors-text-icon-dark)]">{escrowMasterAccount.availableToRelease}</dd>
            </div>
            <div className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
              <dt className="text-[11px] uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Operational holds</dt>
              <dd className="mt-1 text-lg font-semibold text-[var(--colors-text-icon-warning,#e67e22)]">{escrowMasterAccount.holds}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Sub-accounts */}
      <section aria-labelledby="escrow-subs-heading">
        <h2 id="escrow-subs-heading" className="mb-3 text-base font-semibold text-[var(--colors-text-icon-dark)]">
          Seller sub-accounts
        </h2>
        <div className="grid gap-3 lg:grid-cols-2">
          {escrowSubAccounts.map((sub) => (
            <button
              key={sub.id}
              type="button"
              className="rounded-[var(--border-radius-base)] text-left transition hover:shadow-[var(--shadow-m)] focus:outline-none focus:ring-2 focus:ring-[var(--colors-border-common-accent)]"
              onClick={() =>
                openDrawer({
                  type: 'package',
                  id: sub.id,
                  title: sub.seller,
                  subtitle: 'Sub-escrow account',
                  meta: {
                    Balance: sub.balance,
                    'Pending release': sub.pendingRelease,
                    'Hold reason': sub.holdReason,
                    Status: sub.status,
                  },
                })
              }
            >
              <div className="h-full rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4 shadow-[var(--shadow-s)]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-[var(--colors-text-icon-medium)]">{sub.id}</p>
                    <p className="mt-1 font-semibold text-[var(--colors-text-icon-dark)]">{sub.seller}</p>
                  </div>
                  {escrowRowBadge(sub.status)}
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-[11px] uppercase text-[var(--colors-text-icon-medium)]">Balance</dt>
                    <dd className="font-medium text-[var(--colors-text-icon-dark)]">{sub.balance}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase text-[var(--colors-text-icon-medium)]">Pending release</dt>
                    <dd className="font-medium text-[var(--colors-text-icon-dark)]">{sub.pendingRelease}</dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-[var(--colors-border-common-default)] pt-3 text-xs text-[var(--colors-text-icon-medium)]">
                  Hold: {sub.holdReason}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <PollyInlineAlert tone="warning" icon="triangle-exclamation" title="Warehouse & wire instructions">
        Full detail for wires, warehouse lines, and purchase adjustments lives under reconciliation APIs in the Brief. Export and dual-control are mocked here.
      </PollyInlineAlert>

      {/* Liquidity sparkline — uses semantic chart tokens */}
      <section className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-5 shadow-[var(--shadow-m)]">
        <h3 className="mb-4 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Settlement funding pace (7d)</h3>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={execVolumeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--colors-border-common-default,#e5e7eb)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--colors-text-icon-medium)" />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="var(--colors-text-icon-medium)" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="var(--colors-text-icon-medium)" />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: 'var(--colors-border-common-default)' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="locks" name="Locks" stroke="var(--chart-1,#1c67fe)" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume ($M)" stroke="var(--chart-2,#6fcf97)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section aria-labelledby="cash-lines-heading">
        <h2 id="cash-lines-heading" className="mb-3 text-base font-semibold text-[var(--colors-text-icon-dark)]">
          Settlement wires & variance
        </h2>
        <PDataTable
          rowKey={(row) => row.settlement_id}
          rows={cashSettlementLines}
          onRowClick={(row) =>
            openDrawer({
              type: 'package',
              id: row.settlement_id,
              title: row.counterparty,
              subtitle: row.wire_status,
              meta: {
                Expected: row.expected,
                Variance: row.variance,
                'Wire status': row.wire_status,
              },
            })
          }
          columns={[
            { key: 'settlement_id', label: 'Settlement ID', sortable: true, freeze: true },
            { key: 'counterparty', label: 'Counterparty', sortable: true },
            { key: 'expected', label: 'Expected', sortable: true },
            { key: 'variance', label: 'Variance', sortable: true },
            { key: 'wire_status', label: 'Wire status', sortable: true },
            {
              key: 'state',
              label: 'State',
              render: (v) => (
                <PStatusBadge
                  status={v === 'completed' ? 'completed' : v === 'warning' ? 'warning' : 'processing'}
                  label={v}
                />
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}
