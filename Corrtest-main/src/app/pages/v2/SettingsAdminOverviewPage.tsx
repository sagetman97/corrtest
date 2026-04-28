import { Link } from 'react-router';
import { PButton, PDataTable, PPageHeader, PStatusBadge, PToast } from '../../components/polly';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { PollyInlineAlert } from '../../components/shell/PollyInlineAlert';
import { PStatTile } from '../../components/shell/PStatTile';
import { adminAuditLog, adminRolesSummary, adminUsers } from '../../data/fixtures';

export function SettingsAdminOverviewPage() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-8 p-4 pb-14">
      <PPageHeader
        title="Administration"
        subtitle="Organization governance: users, roles, and audit trail — aligns with Brief trust / auditability themes"
        color={PILLAR_PAGE_ACCENT.bluePricing}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to="/support">
              <PButton variant="outline" intent="accent" size="sm">
                Support
              </PButton>
            </Link>
            <PButton size="sm" intent="primary" onClick={() => PToast.success('Invite sent — prototype')}>
              Invite user
            </PButton>
          </div>
        }
      />

      <PollyInlineAlert tone="info" title="Least privilege">
        Role changes and publishes should flow through approvals in production. This view consolidates demos that were split across legacy admin screens.
      </PollyInlineAlert>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile title="Active users" value="22" subtitle="Across 5 role types" icon="users" />
        <PStatTile title="Security events (30d)" value="0" change="None escalated" changeType="positive" icon="shield" />
        <PStatTile title="Avg session" value="3.2 hrs" subtitle="Last 7 days" changeType="neutral" icon="clock" />
        <PStatTile title="Audit records (90d)" value="8,472" subtitle="Queryable in prod" changeType="neutral" icon="list" />
      </div>

      <section aria-labelledby="users-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="users-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
            User directory
          </h2>
          <div className="flex gap-2">
            <Link to="/settings/roles">
              <PButton variant="outline" intent="accent" size="sm">
                Role matrix detail
              </PButton>
            </Link>
          </div>
        </div>
        <PDataTable
          variant="compact"
          rowKey={(row) => row.email}
          rows={adminUsers}
          columns={[
            { key: 'name', label: 'Name', sortable: true, freeze: true },
            { key: 'email', label: 'Email', sortable: true },
            { key: 'role', label: 'Role', sortable: true },
            { key: 'lastActive', label: 'Last active', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <PStatusBadge status={v === 'active' ? 'success' : 'pending'} label={v} />,
            },
          ]}
        />
      </section>

      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading" className="mb-3 text-base font-semibold text-[var(--colors-text-icon-dark)]">
          Role summary
        </h2>
        <div className="overflow-hidden rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] shadow-[var(--shadow-m)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Users</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">Permissions summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--colors-border-common-default)]">
                {adminRolesSummary.map((row) => (
                  <tr key={row.role} className="hover:bg-[var(--colors-background-common-ultra-light-neutral)]/80">
                    <td className="px-4 py-3 font-medium text-[var(--colors-text-icon-dark)]">{row.role}</td>
                    <td className="px-4 py-3 text-[var(--colors-text-icon-dark)]">{row.users}</td>
                    <td className="px-4 py-3 text-[var(--colors-text-icon-medium)]">{row.permissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="audit-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="audit-heading" className="text-base font-semibold text-[var(--colors-text-icon-dark)]">
            Recent audit events
          </h2>
          <PButton variant="text" intent="accent" size="sm" onClick={() => PToast.info('Export queued — prototype')}>
            Export audit log
          </PButton>
        </div>
        <PDataTable
          variant="compact"
          rowKey={(row) => `${row.timestamp}-${row.action}`}
          rows={adminAuditLog}
          columns={[
            { key: 'timestamp', label: 'Timestamp', sortable: true, freeze: true },
            { key: 'user', label: 'User', sortable: true },
            { key: 'action', label: 'Action', sortable: false },
            { key: 'resource', label: 'Resource', sortable: false },
            { key: 'ip', label: 'IP', sortable: false },
          ]}
        />
      </section>

      <div className="flex flex-wrap gap-3 border-t border-[var(--colors-border-common-default)] pt-6">
        <Link to="/settings/policies" className="rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="outline" intent="accent">
            Notification policies
          </PButton>
        </Link>
        <Link to="/settings/templates" className="rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="outline" intent="accent">
            Rule templates
          </PButton>
        </Link>
        <Link to="/settings/adapter-showcase" className="rounded-[var(--border-radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="outline" intent="accent">
            Adapter showcase
          </PButton>
        </Link>
      </div>
    </div>
  );
}
