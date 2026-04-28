import { Link } from 'react-router';
import { PButton, PCard, PDataTable, PPageHeader, PStatusBadge } from '../../components/polly';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { PollyInlineAlert } from '../../components/shell/PollyInlineAlert';
import { PStatTile } from '../../components/shell/PStatTile';
import { aiRecommendations } from '../../data/fixtures';
import { useShell } from '../../context/ShellContext';

export function AiInsightsNarrativePage() {
  const { openDrawer } = useShell();

  const actionable = aiRecommendations.length;
  const potentialGain = '$30.6K';
  const avgConfidence = '94.2%';
  const actionPlanRows = aiRecommendations.slice(0, 3).map((rec, index) => ({
    priority: `P${index + 1}`,
    recommendation: rec.title,
    impact: rec.impact,
    owner: index === 0 ? 'Capital Markets' : index === 1 ? 'Pricing Ops' : 'Lock Desk',
    next_step: rec.action,
    confidence: rec.confidence,
  }));

  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-8 p-4 pb-14">
      <PPageHeader
        title="AI insights"
        subtitle="Agentic recommendations with confidence, impact, and traceability hooks — aligns with Execution + Infrastructure brief themes"
        color={PILLAR_PAGE_ACCENT.purpleAi}
        actions={
          <PButton variant="outline" intent="accent" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top
          </PButton>
        }
      />

      <PollyInlineAlert tone="info" icon="sparkles" title="Human review required">
        All recommendations include confidence scores and mocked lineage for UX. Production would attach policy IDs, model
        version, and snapshot hashes for audit (Brief: trust and provenance).
      </PollyInlineAlert>

      <div className="grid gap-3 sm:grid-cols-3">
        <PStatTile title="Actionable insights" value={String(actionable)} subtitle="Last 24h (fixture)" icon="circle-check" changeType="positive" />
        <PStatTile title="Potential gain (active)" value={potentialGain} subtitle="Summed illustrative impact" icon="trending-up" />
        <PStatTile title="Avg confidence" value={avgConfidence} subtitle="Across predictions" icon="sparkles" />
      </div>

      <section
        aria-label="Recommendation queue"
        className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">Recommendation queue</h2>
          <span className="text-xs text-[var(--colors-text-icon-medium)]">Select a recommendation to inspect basis and traceability</span>
        </div>
        <PDataTable
          variant="compact"
          rowKey={(row) => row.id}
          rows={aiRecommendations.map((rec) => ({
            id: rec.id,
            recommendation: rec.title,
            confidence: rec.confidence,
            impact: rec.impact,
            loans: `${rec.loanCount}`,
          }))}
          columns={[
            { key: 'id', label: 'ID', sortable: true, freeze: true },
            { key: 'recommendation', label: 'Recommendation', sortable: true },
            {
              key: 'confidence',
              label: 'Confidence',
              render: (v) => <PStatusBadge status={v === 'High' ? 'success' : 'warning'} label={String(v)} />,
            },
            { key: 'impact', label: 'Impact', sortable: true },
            { key: 'loans', label: 'Loans', sortable: true, align: 'right' },
          ]}
          onRowClick={(row) => {
            const rec = aiRecommendations.find((item) => item.id === row.id);
            if (!rec) return;
            openDrawer({
              type: 'loan',
              id: rec.id,
              title: rec.title,
              subtitle: rec.impact,
              meta: {
                Confidence: rec.confidence,
                Loans: String(rec.loanCount),
                Basis: rec.basis,
              },
            });
          }}
        />
      </section>

      <section
        aria-label="Action plan"
        className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4 shadow-[var(--shadow-m)]"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">Action plan for today</h2>
          <span className="text-xs text-[var(--colors-text-icon-medium)]">Prioritized handoff list from AI queue</span>
        </div>
        <PDataTable
          variant="compact"
          rowKey={(row) => `${row.priority}-${row.recommendation}`}
          rows={actionPlanRows}
          columns={[
            { key: 'priority', label: 'Priority', sortable: true, freeze: true },
            { key: 'recommendation', label: 'Recommendation', sortable: true },
            { key: 'impact', label: 'Impact', sortable: true },
            { key: 'owner', label: 'Owner', sortable: true },
            { key: 'next_step', label: 'Next step', sortable: true },
            {
              key: 'confidence',
              label: 'Confidence',
              render: (v) => <PStatusBadge status={v === 'High' ? 'success' : 'warning'} label={String(v)} />,
            },
          ]}
          onRowClick={(row) => {
            const rec = aiRecommendations.find((item) => item.title === row.recommendation);
            if (!rec) return;
            openDrawer({
              type: 'loan',
              id: `${rec.id}-action`,
              title: `Action plan · ${rec.id}`,
              subtitle: row.owner,
              meta: {
                Recommendation: rec.title,
                'Next step': row.next_step,
                Owner: row.owner,
                Impact: rec.impact,
                Confidence: rec.confidence,
              },
            });
          }}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <PCard
          title="Basis and policy checks"
          description="Why recommendations were generated and how to validate before action."
          className="border-[var(--colors-border-common-default)]"
        >
          <div className="space-y-3 text-sm">
            {aiRecommendations.slice(0, 2).map((rec) => (
              <div
                key={`${rec.id}-basis`}
                className="rounded-[var(--border-radius-sm)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)] p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--colors-text-icon-medium)]">{rec.id}</span>
                  <PStatusBadge status={rec.confidence === 'High' ? 'success' : 'warning'} label={`${rec.confidence} confidence`} />
                </div>
                <p className="mt-2 text-sm text-[var(--colors-text-icon-dark)]">{rec.basis}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <PButton
              variant="outline"
              intent="accent"
              size="sm"
              onClick={() =>
                openDrawer({
                  type: 'loan',
                  id: 'ai-traceability',
                  title: 'Traceability bundle',
                  subtitle: 'AI recommendation lineage',
                  meta: { 'Model version': '2.4.1-mock', Policy: 'PA-12', 'Snapshot id': 'SNP-88421' },
                })
              }
            >
              View traceability
            </PButton>
            <PButton
              variant="outline"
              intent="accent"
              size="sm"
              onClick={() =>
                openDrawer({
                  type: 'loan',
                  id: 'ai-dismiss',
                  title: 'Dismissed (prototype)',
                  subtitle: 'AI queue update',
                  meta: { Reason: 'User dismissed from insights feed' },
                })
              }
            >
              Dismiss sample
            </PButton>
          </div>
        </PCard>

        <PCard
          title="Related workspaces"
          description="Deep-link into execution and pricing surfaces"
          className="border-[var(--colors-border-common-default)]"
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <Link to="/trading/opportunities" className="inline-flex rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
              <PButton variant="outline" intent="accent" size="sm" expand>
                Opportunity discovery
              </PButton>
            </Link>
            <Link to="/trading/shadow-bidding" className="inline-flex rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
              <PButton variant="outline" intent="accent" size="sm" expand>
                Shadow bidding
              </PButton>
            </Link>
            <Link to="/pricing/eligibility" className="inline-flex rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
              <PButton variant="outline" intent="accent" size="sm" expand>
                Eligibility rules
              </PButton>
            </Link>
            <Link to="/trading/mandatory-bid" className="inline-flex rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
              <PButton variant="outline" intent="accent" size="sm" expand>
                Mandatory bid desk
              </PButton>
            </Link>
          </div>
        </PCard>
      </div>
    </div>
  );
}
