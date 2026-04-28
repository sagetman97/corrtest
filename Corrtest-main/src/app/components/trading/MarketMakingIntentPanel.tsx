import { useState } from 'react';
import { PButton, PCard, PInput, PSelect, PStatusBadge, PToast } from '../polly';

export function MarketMakingIntentPanel() {
  const [buyerIntent, setBuyerIntent] = useState('18');
  const [sellerIntent, setSellerIntent] = useState('12');
  const [lifecycle, setLifecycle] = useState('pre-lock');
  const [mode, setMode] = useState<'polly' | 'direct'>('polly');

  return (
    <PCard
      title="Two-sided intent and transition strategy"
      description="Capture buyer + seller margin intent, lifecycle timing, and direct-to-investor vs Polly-mediated mode."
    >
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-3 md:grid-cols-2">
          <PInput label="Buyer desired margin (bps)" value={buyerIntent} onChange={(e) => setBuyerIntent(e.target.value)} />
          <PInput label="Seller desired premium (bps)" value={sellerIntent} onChange={(e) => setSellerIntent(e.target.value)} />
          <PSelect
            label="Lifecycle commit point"
            value={lifecycle}
            onChange={(e) => setLifecycle(e.target.value)}
            options={[
              { label: 'Pre-lock pipeline', value: 'pre-lock' },
              { label: 'Lock complete', value: 'lock-complete' },
              { label: 'Post-closing auction', value: 'post-closing' },
            ]}
          />
          <PSelect
            label="Execution path mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'polly' | 'direct')}
            options={[
              { label: 'Polly-mediated matching', value: 'polly' },
              { label: 'Direct-to-investor handoff', value: 'direct' },
            ]}
          />
        </div>
        <div className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Current profile</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <PStatusBadge status="info" label={mode === 'polly' ? 'Polly-mediated path' : 'Direct handoff path'} />
            <PStatusBadge status="active" label={`Commit: ${lifecycle}`} />
          </div>
          <p className="mt-2 text-sm text-[var(--colors-text-icon-medium)]">
            Spread target: {buyerIntent} bps buyer margin vs {sellerIntent} bps seller premium.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <PButton
          size="sm"
          intent="primary"
          onClick={() => PToast.success('Intent profile saved for demo scenario')}
        >
          Save intent profile
        </PButton>
        <PButton
          size="sm"
          variant="outline"
          intent="accent"
          onClick={() => PToast.info('Comparison preview generated')}
        >
          Compare execution mode
        </PButton>
      </div>
    </PCard>
  );
}
