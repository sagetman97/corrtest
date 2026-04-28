import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';
import { PageHeader } from '../components/PageHeader';

const users = [
  { name: 'Sarah Chen', email: 'sarah.chen@abclending.com', role: 'Admin', lastActive: '2 min ago', status: 'active' },
  { name: 'Michael Park', email: 'michael.park@abclending.com', role: 'Pricing Manager', lastActive: '15 min ago', status: 'active' },
  { name: 'David Liu', email: 'david.liu@abclending.com', role: 'Capital Markets', lastActive: '1 hour ago', status: 'active' },
  { name: 'Jennifer Wu', email: 'jennifer.wu@abclending.com', role: 'Operations', lastActive: '3 hours ago', status: 'active' },
  { name: 'Robert Martinez', email: 'robert.martinez@abclending.com', role: 'Read Only', lastActive: 'Yesterday', status: 'active' },
  { name: 'Emily Johnson', email: 'emily.johnson@abclending.com', role: 'Capital Markets', lastActive: '2 days ago', status: 'active' },
];

const auditLog = [
  { timestamp: '2026-04-27 10:42 AM', user: 'Sarah Chen', action: 'Updated pricing configuration', resource: 'Conv 30Y Fixed v4.2.1', ip: '192.168.1.42' },
  { timestamp: '2026-04-27 10:38 AM', user: 'Michael Park', action: 'Created investor commitment', resource: 'CMT-8472', ip: '192.168.1.55' },
  { timestamp: '2026-04-27 10:15 AM', user: 'David Liu', action: 'Exported loan data', resource: '847 loans', ip: '192.168.1.73' },
  { timestamp: '2026-04-27 09:52 AM', user: 'Sarah Chen', action: 'Modified user permissions', resource: 'Emily Johnson', ip: '192.168.1.42' },
  { timestamp: '2026-04-27 09:30 AM', user: 'Jennifer Wu', action: 'Approved exception', resource: 'EX-0042', ip: '192.168.1.88' },
];

const roles = [
  { role: 'Admin', users: 2, permissions: 'Full access to all features and settings' },
  { role: 'Pricing Manager', users: 3, permissions: 'Manage pricing configs, view analytics' },
  { role: 'Capital Markets', users: 4, permissions: 'Access trading, commitments, analytics' },
  { role: 'Operations', users: 5, permissions: 'View dashboards, manage exceptions' },
  { role: 'Read Only', users: 8, permissions: 'View-only access to all modules' },
];

export function Admin() {
  return (
    <div className="p-4">
      <PageHeader
        title="Admin & Settings"
        subtitle="Organization: ABC Lending Corp | Account ID: ACC-8847392"
      />

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard
          title="Active Users"
          value="22"
          subtitle="Across 5 role types"
          icon="users"
        />
        <StatCard
          title="Security Events"
          value="0"
          change="Last 30 days"
          changeType="positive"
          icon="shield"
        />
        <StatCard
          title="Avg Session Duration"
          value="3.2 hrs"
          change="Last 7 days"
          changeType="neutral"
          icon="clock"
        />
        <StatCard
          title="Audit Records"
          value="8,472"
          change="Last 90 days"
          changeType="neutral"
          icon="list"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2>User Management</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border text-sm hover:bg-muted/30" style={{ borderRadius: 'var(--radius-xl)' }}>
              Manage Roles
            </button>
            <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90" style={{ borderRadius: 'var(--radius-xl)' }}>
              Invite User
            </button>
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'name', label: 'Name', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
            { key: 'role', label: 'Role', sortable: true },
            { key: 'lastActive', label: 'Last Active', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
          data={users}
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2>Role Permissions</h2>
        </div>
        <div
          className="bg-card border border-border overflow-hidden"
          style={{ borderRadius: 'var(--radius-base)', boxShadow: 'var(--shadow-m)' }}
        >
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Role</th>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Users</th>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roles.map((row) => (
                <tr key={row.role}>
                  <td className="px-3 py-2.5 text-sm">{row.role}</td>
                  <td className="px-3 py-2.5 text-sm">{row.users}</td>
                  <td className="px-3 py-2.5 text-sm text-muted-foreground">{row.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2>Audit Log</h2>
          <button className="text-xs text-muted-foreground hover:text-foreground">Export audit log</button>
        </div>
        <DataTable
          columns={[
            { key: 'timestamp', label: 'Timestamp', sortable: true },
            { key: 'user', label: 'User', sortable: true },
            { key: 'action', label: 'Action', sortable: false },
            { key: 'resource', label: 'Resource', sortable: false },
            { key: 'ip', label: 'IP Address', sortable: false },
          ]}
          data={auditLog}
        />
      </div>
    </div>
  );
}
