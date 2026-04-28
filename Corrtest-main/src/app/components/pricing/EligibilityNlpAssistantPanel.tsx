import { useState } from 'react';
import { PButton, PCard, PStatusBadge, PToast } from '../polly';

export function EligibilityNlpAssistantPanel() {
  const [prompt, setPrompt] = useState(
    'For CRA expansion, allow DTI up to 47 for eligible census tracts and keep current FICO floor.',
  );
  const [generated, setGenerated] = useState(false);

  return (
    <PCard
      title="Eligibility NLP assistant (demo)"
      description="Convert plain-language policy edits into structured rule suggestions with review before publish."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[var(--colors-text-icon-dark)]" htmlFor="eligibility-nlp-input">
            Policy instruction
          </label>
          <textarea
            id="eligibility-nlp-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="w-full rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] px-3 py-2 text-sm text-[var(--colors-text-icon-dark)] outline-none focus:ring-2 focus:ring-[var(--colors-border-common-accent)]"
            placeholder="Describe the eligibility change in plain language"
          />
          <div className="flex flex-wrap gap-2">
            <PButton
              size="sm"
              intent="primary"
              onClick={() => {
                setGenerated(true);
                PToast.success('Rule suggestions generated');
              }}
            >
              Generate rule suggestions
            </PButton>
            <PButton
              size="sm"
              variant="outline"
              intent="accent"
              onClick={() => PToast.info('Rollback preview opened')}
            >
              Preview rollback impact
            </PButton>
          </div>
        </div>
        <div className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <PStatusBadge status={generated ? 'info' : 'pending'} label={generated ? 'Suggested draft update' : 'Awaiting generation'} />
            <p className="text-xs text-[var(--colors-text-icon-medium)]">Human review required before publish</p>
          </div>
          {generated ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--colors-text-icon-dark)]">
              <li>Rule group: CRA Expansion</li>
              <li>Constraint update: <code>DTI &lt;= 47</code> for eligible census-tract flag</li>
              <li>Unchanged safeguards: <code>FICO floor remains current</code></li>
              <li>Rollback token prepared: <code>RBK-CRA-20260428-1</code></li>
            </ul>
          ) : (
            <p className="text-sm text-[var(--colors-text-icon-medium)]">
              Generate suggestions to preview structured draft changes and rollback token.
            </p>
          )}
        </div>
      </div>
    </PCard>
  );
}
