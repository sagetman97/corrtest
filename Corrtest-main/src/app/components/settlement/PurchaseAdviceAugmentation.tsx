import { PDataTable, PStatusBadge } from '../polly';
import { PollyInlineAlert } from '../shell/PollyInlineAlert';
import { purchaseAdviceWireRoutes } from '../../data/fixtures';
import { useShell } from '../../context/ShellContext';

export function PurchaseAdviceAugmentation() {
  const { openDrawer } = useShell();

  return (
    <div className="space-y-4">
      <PollyInlineAlert tone="info" title="Purchase advice → warehouse routing">
        Generated PAs drive funding instructions to warehouse / custody endpoints; settlement agents gate release against buyer approval
        (Brief: PA generation and cash settlement).
      </PollyInlineAlert>

      <section
        aria-label="Wire routing status"
        className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">Wire routing & dual-control</h3>
          <span className="text-xs text-[var(--colors-text-icon-medium)]">Click a row to inspect funding path</span>
        </div>
        <PDataTable
          variant="compact"
          rowKey={(row) => row.pa_id}
          rows={purchaseAdviceWireRoutes}
          onRowClick={(row) =>
            openDrawer({
              type: 'package',
              id: row.pa_id,
              title: row.pa_id,
              subtitle: row.buyer,
              meta: {
                Warehouse: row.warehouse,
                Instructed: row.instructed,
                Status: row.status,
              },
            })
          }
          columns={[
            { key: 'pa_id', label: 'PA ID', sortable: true, freeze: true },
            { key: 'buyer', label: 'Buyer', sortable: true },
            { key: 'warehouse', label: 'Warehouse / custody', sortable: true },
            { key: 'instructed', label: 'Instructed', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (v) => (
                <PStatusBadge
                  status={v === 'confirmed' ? 'success' : 'warning'}
                  label={v === 'confirmed' ? 'Confirmed' : 'Dual control'}
                />
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}
