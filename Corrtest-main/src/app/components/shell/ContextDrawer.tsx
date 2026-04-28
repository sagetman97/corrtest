import { useShell } from '../../context/ShellContext';
import { Icon } from '../Icon';
import { PButton } from '../polly/PButton';
import { useNavigate } from 'react-router';

function inferCommandRoute(entityType: 'loan' | 'tape' | 'package', subtitle?: string) {
  const s = (subtitle ?? '').toLowerCase();
  if (entityType === 'tape') return '/trading/mandatory-bid';
  if (entityType === 'package') {
    if (s.includes('reconciliation')) return '/settlement/reconciliation';
    if (s.includes('purchase advice')) return '/settlement/purchase-advice';
    if (s.includes('cash')) return '/settlement/cash';
    if (s.includes('conditioning')) return '/settlement/conditioning';
    return '/settlement/delivery';
  }
  if (s.includes('opportunit')) return '/trading/opportunities';
  if (s.includes('mandatory')) return '/trading/mandatory-bid';
  if (s.includes('best efforts')) return '/trading/best-efforts';
  if (s.includes('eligibility')) return '/pricing/eligibility';
  return '/trading/best-efforts';
}

export function ContextDrawer() {
  const { drawerOpen, drawerEntity, closeDrawer } = useShell();
  const navigate = useNavigate();

  if (!drawerOpen || !drawerEntity) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-[var(--colors-backdrop)] outline-none md:bg-transparent"
        aria-label="Close context panel backdrop"
        onClick={closeDrawer}
      />
      <aside
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] shadow-[var(--shadow-xl)] md:max-w-lg"
        aria-label="Context detail"
      >
        <header className="flex items-start justify-between gap-3 border-b border-[var(--colors-border-common-default)] p-4">
          <div>
            <p className="text-xs font-medium text-[var(--colors-text-icon-medium)]">
              {drawerEntity.type === 'loan' ? 'Loan' : drawerEntity.type === 'tape' ? 'Bid tape' : 'Delivery package'}
            </p>
            <h2 className="text-lg font-semibold text-[var(--colors-text-icon-dark)]">{drawerEntity.title}</h2>
            {drawerEntity.subtitle ? (
              <p className="mt-1 text-sm text-[var(--colors-text-icon-medium)]">{drawerEntity.subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="rounded-[var(--border-radius-xs)] p-2 outline-none hover:bg-[var(--colors-background-common-default-grey)] focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]"
            onClick={closeDrawer}
            aria-label="Close panel"
          >
            <Icon name="x" size={18} />
          </button>
        </header>
        <div className="flex-1 overflow-auto p-4 text-sm">
          {drawerEntity.meta ? (
            <dl className="space-y-2">
              {Object.entries(drawerEntity.meta).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-[var(--colors-border-common-default)] py-2 last:border-0">
                  <dt className="text-[var(--colors-text-icon-medium)]">{k}</dt>
                  <dd className="text-right font-medium text-[var(--colors-text-icon-dark)]">{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-[var(--colors-text-icon-medium)]">Select an item from a table or board to inspect lineage, marks, and next actions.</p>
          )}
          <div className="mt-6 space-y-2 rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
            <p className="text-xs font-semibold text-[var(--colors-text-icon-dark)]">Audit trail</p>
            <ul className="space-y-1 text-xs text-[var(--colors-text-icon-medium)]">
              <li>• Snapshot recorded at 10:42 ET</li>
              <li>• AI suggestion scored against policy PA-12</li>
              <li>• Demo preview data path (mock-backed)</li>
            </ul>
          </div>
        </div>
        <footer className="border-t border-[var(--colors-border-common-default)] p-4">
          <div className="flex flex-wrap gap-2">
            <PButton intent="primary" className="flex-1" onClick={closeDrawer}>
              Done
            </PButton>
            <PButton
              variant="outline"
              intent="accent"
              className="flex-1"
              onClick={() => {
                const route = inferCommandRoute(drawerEntity.type, drawerEntity.subtitle);
                closeDrawer();
                navigate(route);
              }}
            >
              Open full command
            </PButton>
          </div>
        </footer>
      </aside>
    </>
  );
}
