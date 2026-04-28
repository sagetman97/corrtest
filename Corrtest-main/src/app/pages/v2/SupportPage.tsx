import { Link } from 'react-router';
import { PButton, PCard, PPageHeader, PStatusBadge, PToast } from '../../components/polly';
import { Icon } from '../../components/Icon';
import { PStatTile } from '../../components/shell/PStatTile';
import { implementationMilestones, supportContacts, supportResources } from '../../data/fixtures';

export function SupportPage() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-6 p-4 pb-12">
      <PPageHeader
        title="Support & success"
        subtitle="Customer success and implementation support for design partners and pilot rollouts (demo preview)"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile title="Open tickets" value="2" change="Last 30 days" changeType="neutral" icon="support" />
        <PStatTile title="Avg response" value="1.2 hrs" change="Target &lt; 4h" changeType="positive" icon="circle-check" />
        <PStatTile title="Implementation" value="100%" subtitle="Milestones below" changeType="positive" icon="circle-check" />
        <PStatTile title="Doc resources" value="47" subtitle="Guides and references" changeType="neutral" icon="file-text" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PCard
          title="Your Polly team"
          className="h-full border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)]"
        >
          <ul className="space-y-4">
            {supportContacts.map((c) => (
              <li
                key={c.type}
                className="border-b border-[var(--colors-border-common-default)] pb-4 last:border-0 last:pb-0"
              >
                <p className="text-sm text-[var(--colors-text-icon-medium)]">{c.type}</p>
                <p className="mt-1 font-medium text-[var(--colors-text-icon-dark)]">{c.name}</p>
                <a
                  href={`mailto:${c.email}`}
                  className="mt-1 block rounded-[var(--border-radius-sm)] text-sm text-[var(--colors-border-common-accent)] underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]"
                >
                  {c.email}
                </a>
                <p className="mt-1 text-sm text-[var(--colors-text-icon-medium)]">{c.phone}</p>
              </li>
            ))}
          </ul>
          <PButton className="mt-6 w-full" intent="primary" onClick={() => PToast.success('Support ticket captured for follow-up')}>
            Create support ticket
          </PButton>
        </PCard>

        <PCard title="Documentation & links" className="h-full border-[var(--colors-border-common-default)]">
          <ul className="space-y-2">
            {supportResources.map((r) => (
              <li key={r.title}>
                {r.url.startsWith('/') ? (
                  <Link
                    to={r.url}
                    className="flex items-center justify-between gap-3 rounded-[var(--border-radius-sm)] px-3 py-2.5 transition hover:bg-[var(--colors-background-common-ultra-light-neutral)]"
                  >
                    <span>
                      <span className="block text-sm font-medium text-[var(--colors-text-icon-dark)]">{r.title}</span>
                      <span className="text-xs text-[var(--colors-text-icon-medium)]">{r.category}</span>
                    </span>
                    <Icon name="arrow-right" size={14} className="shrink-0 text-[var(--colors-text-icon-placeholder)]" />
                  </Link>
                ) : (
                  <a
                    href={r.url}
                    className="flex items-center justify-between gap-3 rounded-[var(--border-radius-sm)] px-3 py-2.5 transition hover:bg-[var(--colors-background-common-ultra-light-neutral)]"
                  >
                    <span>
                      <span className="block text-sm font-medium text-[var(--colors-text-icon-dark)]">{r.title}</span>
                      <span className="text-xs text-[var(--colors-text-icon-medium)]">{r.category}</span>
                    </span>
                    <Icon name="arrow-right" size={14} className="shrink-0 text-[var(--colors-text-icon-placeholder)]" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <PButton className="mt-4 w-full" variant="outline" intent="accent" onClick={() => PToast.info('Documentation catalog opened')}>
            Browse all documentation
          </PButton>
        </PCard>
      </div>

      <section aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" className="mb-4 text-base font-semibold text-[var(--colors-text-icon-dark)]">
          Implementation timeline
        </h2>
        <div className="rounded-[var(--border-radius-lg)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-6 shadow-[var(--shadow-m)]">
          <ul className="space-y-0">
            {implementationMilestones.map((m, idx) => (
              <li key={m.phase} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)]">
                    {m.status === 'completed' ? (
                      <Icon name="circle-check" size={20} className="text-[var(--colors-text-icon-success,#27ae60)]" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--colors-border-common-accent)]" aria-hidden />
                    )}
                  </div>
                  {idx < implementationMilestones.length - 1 ? (
                    <span className="my-1 block min-h-[2.5rem] w-px bg-[var(--colors-border-common-default)]" aria-hidden />
                  ) : null}
                </div>
                <div className={`flex-1 ${idx < implementationMilestones.length - 1 ? 'pb-8' : ''}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-[var(--colors-text-icon-dark)]">{m.phase}</h3>
                    <PStatusBadge status={m.status === 'completed' ? 'success' : 'info'} label={m.status === 'completed' ? 'Completed' : 'In progress'} />
                  </div>
                  <p className="mt-1 text-sm text-[var(--colors-text-icon-medium)]">{m.description}</p>
                  <p className="mt-1 text-xs text-[var(--colors-text-icon-placeholder)]">{m.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
