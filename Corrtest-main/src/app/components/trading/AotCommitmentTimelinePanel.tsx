import { PButton, PCard, PStatusBadge, PToast } from '../polly';

const timelineEvents = [
  {
    ts: '09:42 ET',
    event: 'Seller hit received',
    detail: 'Hit captured for TP-8821 at 101.18.',
    status: 'success' as const,
  },
  {
    ts: '09:47 ET',
    event: 'AOT package accepted',
    detail: 'AOT mapped to commitment draft CMT-8472.',
    status: 'active' as const,
  },
  {
    ts: '10:03 ET',
    event: 'Price adjustment requested',
    detail: 'Variance +4 bps submitted for approval.',
    status: 'warning' as const,
  },
  {
    ts: '10:11 ET',
    event: 'Commitment confirmed',
    detail: 'Updated commitment accepted and routed to settlement.',
    status: 'locked' as const,
  },
];

export function AotCommitmentTimelinePanel() {
  return (
    <PCard
      title="AOT & commitment timeline"
      description="Lifecycle from seller hit to commitment confirmation."
    >
      <ol className="grid gap-2 lg:grid-cols-2">
        {timelineEvents.map((item, idx) => (
          <li key={`${item.ts}-${item.event}`}>
            <div className="min-w-0 rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <p className="font-medium text-[var(--colors-text-icon-medium)]">{item.ts}</p>
                <PStatusBadge status={item.status} label={item.event} />
              </div>
              <p className="mt-1 text-sm text-[var(--colors-text-icon-dark)]">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap gap-2">
        <PButton size="sm" intent="primary" onClick={() => PToast.success('AOT timeline exported')}>
          Export timeline
        </PButton>
        <PButton size="sm" variant="outline" intent="accent" onClick={() => PToast.info('Adjustment review queue opened')}>
          Open adjustment queue
        </PButton>
      </div>
    </PCard>
  );
}
