import { useMemo } from 'react';
import { Link } from 'react-router';
import { PButton, PDataTable, PPageHeader, PStatusBadge, PToast } from '../../components/polly';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { PollyInlineAlert } from '../../components/shell/PollyInlineAlert';
import { PStatTile } from '../../components/shell/PStatTile';
import { integrationConnectors, syncActivityLog, type ConnectorHealth } from '../../data/fixtures';

function healthBadge(h: ConnectorHealth) {
  if (h === 'Healthy') return <PStatusBadge status="success" label={h} />;
  if (h === 'Degraded') return <PStatusBadge status="warning" label={h} />;
  return <PStatusBadge status="error" label={h} />;
}

export function NetworkIntegrationsPage() {
  const stats = useMemo(() => {
    const total = integrationConnectors.length;
    const healthy = integrationConnectors.filter((c) => c.health === 'Healthy').length;
    const degraded = integrationConnectors.filter((c) => c.health === 'Degraded').length;
    const healthPct = total ? ((healthy / total) * 100).toFixed(1) : '0';
    const syncErrors = syncActivityLog.filter((s) => s.status === 'warning').length;
    const syncedToday = integrationConnectors.reduce((acc, c) => acc + c.loans, 0);
    return { total, healthy, degraded, healthPct, syncErrors, syncedToday };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-6 p-4 pb-10">
      <PPageHeader
        title="Integrations & connectors"
        subtitle="LOS, agency, fraud, and pricing feeds — operational health and sync lineage (prototype data)"
        color={PILLAR_PAGE_ACCENT.bluePricing}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to="/network/overview">
              <PButton variant="outline" intent="accent" size="sm">
                Network overview
              </PButton>
            </Link>
            <PButton size="sm" intent="primary" onClick={() => PToast.info('Add connector — prototype only')}>
              Add connector
            </PButton>
          </div>
        }
      />

      <PollyInlineAlert tone="info" title="Ecosystem friction (Brief)">
        LOS document access and fraud connectors are explicit value levers. Use this view in demos to discuss secure
        handoff (e.g. Investor Connect–class flows) versus competitive concerns from originators.
      </PollyInlineAlert>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile
          title="Active connectors"
          value={String(stats.total)}
          subtitle="Across LOS, PPE, agencies"
          icon="network"
        />
        <PStatTile
          title="Integration health"
          value={`${stats.healthPct}%`}
          change={stats.degraded ? `${stats.degraded} degraded` : 'All nominal'}
          changeType={stats.degraded ? 'warning' : 'positive'}
          icon="bolt"
        />
        <PStatTile
          title="Loan records synced (fixtures)"
          value={stats.syncedToday.toLocaleString()}
          subtitle="Rolling mock counter"
          icon="circle-check"
        />
        <PStatTile
          title="Sync warnings (24h)"
          value={String(stats.syncErrors)}
          change="From activity log"
          changeType={stats.syncErrors ? 'warning' : 'neutral'}
          icon="circle-exclamation"
        />
      </div>

      <section aria-labelledby="conn-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="conn-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
            Connector inventory
          </h2>
          <span className="max-w-[28ch] text-right text-xs leading-snug text-[var(--colors-text-icon-medium)]">
            Health reflects connector fixtures; extend with live telemetry when backends exist.
          </span>
        </div>
        <PDataTable
          rowKey={(row) => row.name}
          rows={integrationConnectors}
          columns={[
            { key: 'name', label: 'Integration', sortable: true, freeze: true },
            { key: 'domain', label: 'Domain', sortable: true },
            {
              key: 'connStatus',
              label: 'Connection',
              render: (v) => <PStatusBadge status={v === 'active' ? 'active' : 'pending'} label={v} />,
            },
            { key: 'lastSync', label: 'Last sync', sortable: true },
            {
              key: 'health',
              label: 'Health',
              render: (v) => healthBadge(v as ConnectorHealth),
            },
            {
              key: 'loans',
              label: 'Synced loans',
              align: 'right',
              render: (v) => (
                <span className={v > 0 ? 'text-[var(--colors-text-icon-dark)]' : 'text-[var(--colors-text-icon-placeholder)]'}>
                  {v > 0 ? v.toLocaleString() : '—'}
                </span>
              ),
            },
          ]}
        />
      </section>

      <section aria-labelledby="sync-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="sync-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
            Recent sync activity
          </h2>
          <button
            type="button"
            className="rounded-[var(--border-radius-sm)] text-xs font-medium text-[var(--colors-border-common-accent)] underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]"
            onClick={() => PToast.success('Export queued — prototype')}
          >
            Full sync log
          </button>
        </div>
        <PDataTable
          variant="compact"
          rowKey={(row) => `${row.timestamp}-${row.integration}`}
          rows={syncActivityLog}
          columns={[
            { key: 'timestamp', label: 'Time', sortable: true },
            { key: 'integration', label: 'Integration', sortable: true },
            { key: 'action', label: 'Action', sortable: false },
            {
              key: 'records',
              label: 'Records',
              align: 'right',
              sortable: true,
              render: (v) => (v > 0 ? v.toLocaleString() : '—'),
            },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <PStatusBadge status={v === 'success' ? 'success' : 'warning'} label={v} />,
            },
          ]}
        />
      </section>
    </div>
  );
}
