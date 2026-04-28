import { PollyInlineAlert } from '../shell/PollyInlineAlert';

/** Brief: hybrid BE pipeline marks, reserve spread vs proxy — contextual copy above workspace grid. */
export function PipelineMarksContextStrip() {
  return (
    <div className="space-y-4">
      <PollyInlineAlert tone="info" title="Reserve spread & early bids">
        Buyers may expose <strong>pipeline marks</strong> so sellers see loans earlier in the funnel; when a bid clears the{' '}
        <strong>reserve spread</strong> threshold vs a proxy mark, execution can favor earlier purchase (Brief: hedge cost avoidance).
      </PollyInlineAlert>
      <div className="grid gap-3 rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4 shadow-[var(--shadow-s)] sm:grid-cols-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Proxy mark source</p>
          <p className="mt-1 text-sm text-[var(--colors-text-icon-dark)]">Buyer API v2 pipeline endpoint</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Reserve spread policy</p>
          <p className="mt-1 text-sm text-[var(--colors-text-icon-dark)]">Desk threshold + shadow approval (SB-*)</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Frequency</p>
          <p className="mt-1 text-sm text-[var(--colors-text-icon-dark)]">Daily / on-demand marks sufficient per Brief</p>
        </div>
      </div>
    </div>
  );
}
