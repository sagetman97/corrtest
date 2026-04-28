import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';
import { PageHeader } from '../components/PageHeader';

const integrations = [
  { name: 'Encompass LOS', type: 'Loan Origination System', status: 'active', lastSync: '2 min ago', health: 'Healthy', loans: 1247 },
  { name: 'Black Knight MSP', type: 'Product & Pricing', status: 'active', lastSync: '5 min ago', health: 'Healthy', loans: 0 },
  { name: 'Optimal Blue', type: 'Product & Pricing', status: 'active', lastSync: '3 min ago', health: 'Healthy', loans: 0 },
  { name: 'Fannie Mae DU', type: 'Underwriting', status: 'active', lastSync: '1 min ago', health: 'Healthy', loans: 485 },
  { name: 'Freddie Mac LPA', type: 'Underwriting', status: 'active', lastSync: '1 min ago', health: 'Healthy', loans: 312 },
  { name: 'CoreLogic AVM', type: 'Property Valuation', status: 'active', lastSync: '8 min ago', health: 'Degraded', loans: 0 },
  { name: 'ICE Mortgage Technology', type: 'LOS Integration', status: 'active', lastSync: '4 min ago', health: 'Healthy', loans: 643 },
  { name: 'MeridianLink', type: 'Point of Sale', status: 'pending', lastSync: 'Never', health: 'Not Connected', loans: 0 },
];

const syncActivity = [
  { timestamp: '10:45 AM', integration: 'Encompass LOS', action: 'Loan sync completed', records: 847, status: 'success' },
  { timestamp: '10:43 AM', integration: 'Fannie Mae DU', action: 'Underwriting results received', records: 142, status: 'success' },
  { timestamp: '10:40 AM', integration: 'CoreLogic AVM', action: 'Connection timeout - retrying', records: 0, status: 'warning' },
  { timestamp: '10:38 AM', integration: 'Freddie Mac LPA', action: 'Underwriting results received', records: 98, status: 'success' },
  { timestamp: '10:35 AM', integration: 'Black Knight MSP', action: 'Rate sheet update received', records: 1, status: 'success' },
];

export function Integrations() {
  return (
    <div className="p-4">
      <PageHeader
        title="Integrations & Network"
        subtitle="Connection status as of 2026-04-27 10:45 AM EDT"
      />

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard
          title="Active Integrations"
          value="7"
          subtitle="Across LOS, PPE, and agencies"
          icon="network"
        />
        <StatCard
          title="Integration Health"
          value="87.5%"
          change="1 degraded connection"
          changeType="warning"
          icon="bolt"
        />
        <StatCard
          title="Synced Today"
          value="2,847"
          subtitle="Loan records processed"
          icon="circle-check"
        />
        <StatCard
          title="Sync Errors"
          value="3"
          change="Last 24 hours"
          changeType="warning"
          icon="circle-exclamation"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2>Active Integrations</h2>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90" style={{ borderRadius: 'var(--radius-xl)' }}>
            Add Integration
          </button>
        </div>
        <DataTable
          columns={[
            { key: 'name', label: 'Integration Name', sortable: true },
            { key: 'type', label: 'Type', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            { key: 'lastSync', label: 'Last Sync', sortable: true },
            {
              key: 'health',
              label: 'Health',
              sortable: true,
              render: (value) => {
                const status = value === 'Healthy' ? 'success' : value === 'Degraded' ? 'warning' : 'error';
                return <StatusBadge status={status} label={value} />;
              },
            },
            {
              key: 'loans',
              label: 'Synced Loans',
              sortable: true,
              render: (value) => value > 0 ? value.toLocaleString() : '—',
            },
          ]}
          data={integrations}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2>Recent Sync Activity</h2>
          <button className="text-xs text-muted-foreground hover:text-foreground">Full sync log</button>
        </div>
        <DataTable
          columns={[
            { key: 'timestamp', label: 'Time', sortable: true },
            { key: 'integration', label: 'Integration', sortable: true },
            { key: 'action', label: 'Action', sortable: false },
            {
              key: 'records',
              label: 'Records',
              sortable: true,
              render: (value) => value > 0 ? value.toLocaleString() : '—',
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
          data={syncActivity}
        />
      </div>
    </div>
  );
}
