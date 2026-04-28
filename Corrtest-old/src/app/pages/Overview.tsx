import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { PageHeader } from '../components/PageHeader';

const recentActivity = [
  { action: 'Price Lock', loan: 'LN-2847392', borrower: 'Johnson, M.', amount: '$425,000', time: '2 min ago', status: 'locked' },
  { action: 'Best Execution', loan: 'LN-2847388', borrower: 'Smith, R.', amount: '$680,000', time: '8 min ago', status: 'success' },
  { action: 'Pricing Exception', loan: 'LN-2847385', borrower: 'Davis, K.', amount: '$550,000', time: '15 min ago', status: 'warning' },
  { action: 'Lock Expiry', loan: 'LN-2847381', borrower: 'Wilson, T.', amount: '$390,000', time: '22 min ago', status: 'pending' },
  { action: 'Commitment', loan: 'LN-2847376', borrower: 'Brown, L.', amount: '$725,000', time: '34 min ago', status: 'active' },
];

const exceptions = [
  { id: 'EX-0042', loan: 'LN-2847392', type: 'Eligibility Variance', severity: 'High', created: '10:42 AM', status: 'pending' },
  { id: 'EX-0041', loan: 'LN-2847388', type: 'Price Adjustment', severity: 'Medium', created: '10:28 AM', status: 'pending' },
  { id: 'EX-0040', loan: 'LN-2847385', type: 'Lock Extension', severity: 'Low', created: '10:15 AM', status: 'active' },
];

export function Overview() {
  return (
    <div className="p-4">
      <PageHeader
        title="Overview"
        subtitle="Last updated: 2026-04-27 10:47 AM EDT | Data as of 10:45 AM"
      />

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard
          title="Active Locks"
          value="847"
          change="+12.4% vs prior day"
          changeType="positive"
          icon="lock"
        />
        <StatCard
          title="Lock Volume"
          value="$284.5M"
          change="+8.2% vs prior day"
          changeType="positive"
          icon="dollar-sign"
        />
        <StatCard
          title="Pull-Through Rate"
          value="87.3%"
          change="-1.2 pp vs 7d avg"
          changeType="negative"
          icon="trending-up"
        />
        <StatCard
          title="Pricing Exceptions"
          value="23"
          change="3 high severity"
          changeType="warning"
          icon="circle-exclamation"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <StatCard
          title="Best Execution Gain"
          value="+42.3 bps"
          subtitle="vs fallback investor"
          changeType="positive"
          icon="bolt"
        />
        <StatCard
          title="Lock Processing Time"
          value="2.4 min"
          change="-18% vs 30d avg"
          changeType="positive"
          icon="clock"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2>Recent Activity</h2>
          <button className="text-xs text-muted-foreground hover:text-foreground">View all activity</button>
        </div>
        <DataTable
          columns={[
            { key: 'action', label: 'Action', sortable: true },
            { key: 'loan', label: 'Loan ID', sortable: true },
            { key: 'borrower', label: 'Borrower', sortable: true },
            { key: 'amount', label: 'Amount', sortable: true },
            { key: 'time', label: 'Time', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
          data={recentActivity}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2>Active Exceptions</h2>
          <button
            className="px-3 py-1.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            style={{ borderRadius: 'var(--radius-xl)' }}
          >
            Review All
          </button>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Exception ID', sortable: true },
            { key: 'loan', label: 'Loan ID', sortable: true },
            { key: 'type', label: 'Type', sortable: true },
            {
              key: 'severity',
              label: 'Severity',
              sortable: true,
              render: (value) => (
                <StatusBadge
                  status={value === 'High' ? 'error' : value === 'Medium' ? 'warning' : 'pending'}
                  label={value}
                />
              ),
            },
            { key: 'created', label: 'Created', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
          data={exceptions}
        />
      </div>
    </div>
  );
}
