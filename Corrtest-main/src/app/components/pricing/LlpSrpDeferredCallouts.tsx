import { PCard } from '../polly';
import { PollyInlineAlert } from '../shell/PollyInlineAlert';

/**
 * Surfaces deferred platform capabilities (MSR CF, pool optimizer) without fake precision —
 * aligns with Brief + parity ledger §6.
 */
export function LlpSrpDeferredCallouts() {
  return (
    <div className="space-y-4">
      <PollyInlineAlert tone="warning" icon="circle-exclamation" title="MSR cash-flow & loan-level adjustors">
        Full <strong>MSR CF API</strong> visualization and loan-level SRP adjustors depend on valuation services — UI defers deep curves
        until API contracts exist (Brief infrastructure notes).
      </PollyInlineAlert>

      <PCard
        title="Roadmap · advanced engines"
        description="Explicitly out of scope for this prototype build"
        className="border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)]"
      >
        <ul className="grid gap-2 md:grid-cols-3">
          <li className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
            <p className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">Pool optimizer</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--colors-text-icon-medium)]">
              Requires pipeline optimization backend (product list).
            </p>
          </li>
          <li className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
            <p className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">Blockchain-like doc repository</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--colors-text-icon-medium)]">
              Architecture decision; settlement agents need provenance (Brief settlement).
            </p>
          </li>
          <li className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
            <p className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">Live banking / wire APIs</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--colors-text-icon-medium)]">
              Warehouse instructions remain mocked on cash and reconciliation surfaces.
            </p>
          </li>
        </ul>
      </PCard>
    </div>
  );
}
