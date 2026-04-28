import { Link } from 'react-router';
import { PButton, PDataTable, PPageHeader, PStatusBadge, PToast } from '../../components/polly';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { PollyInlineAlert } from '../../components/shell/PollyInlineAlert';
import { PStatTile } from '../../components/shell/PStatTile';
import { pricingConfigurationChanges, pricingProgramsCatalog } from '../../data/fixtures';

/**
 * Programs catalog — governance-oriented view of marks/eligibility artifacts.
 * Copy avoids centering “rate sheets”; aligns with Brief API-first / mark-to-market positioning.
 */
export function PricingProgramsPage() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-8 p-4 pb-14">
      <PPageHeader
        title="Pricing programs"
        subtitle="Programs & rule bundles tied to Buyer API payloads — marks and eligibility ship through versions here"
        color={PILLAR_PAGE_ACCENT.bluePricing}
        actions={
          <div className="flex flex-wrap gap-2">
            <PButton variant="outline" intent="accent" size="sm" onClick={() => PToast.info('Compare versions — prototype')}>
              Compare versions
            </PButton>
            <PButton size="sm" intent="primary" onClick={() => PToast.success('Draft program created — prototype')}>
              New program draft
            </PButton>
          </div>
        }
      />

      <PollyInlineAlert tone="warning" title="Language guardrail">
        Static rate sheets are deprecated as the operating metaphor; this catalog tracks <strong>programs</strong>,{' '}
        <strong>marks</strong>, and <strong>published versions</strong> consumed by Buyer APIs.
      </PollyInlineAlert>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile title="Active programs" value="24" subtitle="Across channels" icon="file-text" />
        <PStatTile title="Active pricing rules" value="1,847" change="+12 this week" changeType="positive" icon="list" />
        <PStatTile title="Pending approvals" value="8" subtitle="Awaiting publish" icon="circle-exclamation" />
        <PStatTile title="Mark accuracy (30d)" value="99.7%" change="Observed vs configured" changeType="positive" icon="circle-check" />
      </div>

      <section aria-labelledby="catalog-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="catalog-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
            Program catalog
          </h2>
          <Link
            to="/pricing/buyer-api"
            className="rounded-[var(--border-radius-sm)] text-xs font-medium text-[var(--colors-border-common-accent)] underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]"
          >
            Buyer API contract →
          </Link>
        </div>
        <PDataTable
          rowKey={(row) => row.name}
          rows={pricingProgramsCatalog}
          columns={[
            { key: 'name', label: 'Program', sortable: true, freeze: true },
            { key: 'version', label: 'Version', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <PStatusBadge status={v === 'active' ? 'active' : 'pending'} label={v} />,
            },
            { key: 'lastUpdate', label: 'Last updated', sortable: true },
            { key: 'rules', label: 'Active rules', sortable: true },
            {
              key: 'pendingChanges',
              label: 'Pending changes',
              align: 'right',
              sortable: true,
              render: (v) => (
                <span className={Number(v) > 0 ? 'font-medium text-[var(--colors-text-icon-warning,#e67e22)]' : ''}>{v}</span>
              ),
            },
          ]}
        />
      </section>

      <section aria-labelledby="changelog-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="changelog-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
            Recent configuration changes
          </h2>
          <button
            type="button"
            className="rounded-[var(--border-radius-sm)] text-xs font-medium text-[var(--colors-border-common-accent)] underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]"
            onClick={() => PToast.success('Full changelog export — prototype')}
          >
            Full changelog
          </button>
        </div>
        <PDataTable
          variant="compact"
          rowKey={(row) => row.id}
          rows={pricingConfigurationChanges}
          columns={[
            { key: 'id', label: 'Change ID', sortable: true, freeze: true },
            { key: 'product', label: 'Program', sortable: true },
            { key: 'change', label: 'Description', sortable: false },
            { key: 'author', label: 'Author', sortable: true },
            { key: 'timestamp', label: 'Timestamp', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <PStatusBadge status={v === 'active' ? 'success' : 'pending'} label={v} />,
            },
          ]}
        />
      </section>

      <div className="flex flex-wrap gap-3 border-t border-[var(--colors-border-common-default)] pt-6">
        <Link to="/pricing/marks" className="rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="outline" intent="accent">
            Base pricing & marks
          </PButton>
        </Link>
        <Link to="/pricing/eligibility" className="rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="outline" intent="accent">
            Eligibility rules
          </PButton>
        </Link>
        <Link to="/pricing/llpa-srp" className="rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="outline" intent="accent">
            LLPA / SRP workspace
          </PButton>
        </Link>
      </div>
    </div>
  );
}
