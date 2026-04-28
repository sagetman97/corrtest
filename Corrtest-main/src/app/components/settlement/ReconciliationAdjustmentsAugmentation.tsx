import { PButton, PDataTable, PStatusBadge, PToast } from '../polly';
import { PollyInlineAlert } from '../shell/PollyInlineAlert';
import { bidSnapshotFieldCompare, warehouseWireQueue } from '../../data/fixtures';
import { useShell } from '../../context/ShellContext';

export function ReconciliationAdjustmentsAugmentation() {
  const { openDrawer } = useShell();

  return (
    <div className="space-y-6">
      <PollyInlineAlert tone="info" title="Bid snapshot vs delivered truth">
        Compare committed bid data to validated delivery; late delivery rolls and interest adjustments flow from this control point
        (Brief reconciliation bullets).
      </PollyInlineAlert>

      <section className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-5 shadow-[var(--shadow-m)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">Field-level snapshot check · PA-812 cohort</h3>
          <PButton size="xs" variant="outline" intent="accent" onClick={() => PToast.success('Diff export — prototype')}>
            Export diff
          </PButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="border-b border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)]">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">Field</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">Bid</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">Delivered</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">Aligned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--colors-border-common-default)]">
              {bidSnapshotFieldCompare.map((row) => (
                <tr key={row.field}>
                  <td className="px-3 py-2.5 font-medium text-[var(--colors-text-icon-dark)]">{row.field}</td>
                  <td className="px-3 py-2.5 text-[var(--colors-text-icon-medium)]">{row.bid}</td>
                  <td className="px-3 py-2.5 text-[var(--colors-text-icon-medium)]">{row.delivered}</td>
                  <td className="px-3 py-2.5">
                    <PStatusBadge status={row.aligned ? 'success' : 'warning'} label={row.aligned ? 'Yes' : 'Review'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Warehouse wire queue">
        <h3 className="mb-3 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Warehouse & wire instruction queue</h3>
        <PDataTable
          variant="compact"
          rowKey={(row) => row.id}
          rows={warehouseWireQueue}
          onRowClick={(row) =>
            openDrawer({
              type: 'package',
              id: row.id,
              title: row.institution,
              subtitle: row.purpose,
              meta: {
                ABA: row.aba,
                Beneficiary: row.beneficiary,
                Amount: row.amount,
                Status: row.status,
              },
            })
          }
          columns={[
            { key: 'id', label: 'Wire ref', sortable: true, freeze: true },
            { key: 'institution', label: 'Institution', sortable: true },
            { key: 'purpose', label: 'Purpose', sortable: false },
            { key: 'aba', label: 'ABA', sortable: false },
            { key: 'amount', label: 'Amount', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (v) => (
                <PStatusBadge
                  status={v === 'sent' ? 'completed' : v === 'queued' ? 'processing' : 'warning'}
                  label={v}
                />
              ),
            },
          ]}
        />
      </section>

      <PollyInlineAlert tone="warning" title="Live banking integration">
        Production would dual-control wire release and sync custodian confirmations — all values here are **fixtures**.
      </PollyInlineAlert>
    </div>
  );
}
