import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { PageHeader } from '../components/PageHeader';

const pricingConfigs = [
  { name: 'Conventional 30Y Fixed', version: 'v4.2.1', status: 'active', lastUpdate: '2026-04-25 09:15 AM', rules: 247, changes: 3 },
  { name: 'FHA 30Y Fixed', version: 'v4.2.1', status: 'active', lastUpdate: '2026-04-25 09:15 AM', rules: 189, changes: 2 },
  { name: 'VA 30Y Fixed', version: 'v4.2.0', status: 'active', lastUpdate: '2026-04-22 02:30 PM', rules: 156, changes: 0 },
  { name: 'Jumbo 30Y Fixed', version: 'v4.2.1', status: 'active', lastUpdate: '2026-04-25 09:15 AM', rules: 203, changes: 5 },
  { name: 'Conventional 15Y Fixed', version: 'v4.1.8', status: 'pending', lastUpdate: '2026-04-26 04:45 PM', rules: 198, changes: 8 },
  { name: 'ARM 5/1', version: 'v4.2.0', status: 'active', lastUpdate: '2026-04-22 02:30 PM', rules: 134, changes: 1 },
];

const recentChanges = [
  { id: 'CHG-1847', product: 'Conventional 30Y Fixed', change: 'LLPA adjustment for DTI > 45%', author: 'Sarah Chen', timestamp: '2026-04-25 09:15 AM', status: 'active' },
  { id: 'CHG-1846', product: 'Jumbo 30Y Fixed', change: 'Updated investor overlays for credit score bands', author: 'Michael Park', timestamp: '2026-04-25 09:12 AM', status: 'active' },
  { id: 'CHG-1845', product: 'FHA 30Y Fixed', change: 'Rate sheet effective 4/26', author: 'Sarah Chen', timestamp: '2026-04-25 08:45 AM', status: 'active' },
  { id: 'CHG-1844', product: 'Conventional 15Y Fixed', change: 'Lock policy update - extended to 90 days', author: 'David Liu', timestamp: '2026-04-26 04:45 PM', status: 'pending' },
];

export function ProductPricing() {
  return (
    <div className="p-4">
      <PageHeader
        title="Product & Pricing"
        subtitle="Pricing Engine v4.2 | Last sync: 2026-04-27 10:45 AM EDT"
        productColor="#01FFF0"
        showLogo={true}
      />

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard
          title="Active Products"
          value="24"
          subtitle="Across all channels"
          icon="file-text"
        />
        <StatCard
          title="Active Pricing Rules"
          value="1,847"
          change="+12 this week"
          changeType="positive"
          icon="list"
        />
        <StatCard
          title="Pending Changes"
          value="8"
          subtitle="Awaiting approval"
          icon="circle-exclamation"
        />
        <StatCard
          title="Pricing Accuracy"
          value="99.7%"
          change="Last 30 days"
          changeType="positive"
          icon="circle-check"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2>Pricing Configurations</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border text-sm hover:bg-muted/30" style={{ borderRadius: 'var(--radius-xl)' }}>
              Compare Versions
            </button>
            <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90" style={{ borderRadius: 'var(--radius-xl)' }}>
              New Configuration
            </button>
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'name', label: 'Product Name', sortable: true },
            { key: 'version', label: 'Version', sortable: true },
            {
              key: 'status',
              label: 'Status',
              sortable: true,
              render: (value) => <StatusBadge status={value} />,
            },
            { key: 'lastUpdate', label: 'Last Updated', sortable: true },
            { key: 'rules', label: 'Active Rules', sortable: true },
            {
              key: 'changes',
              label: 'Pending Changes',
              sortable: true,
              render: (value) => (
                <span className={value > 0 ? 'text-[#f2994a]' : 'text-muted-foreground'}>
                  {value}
                </span>
              ),
            },
          ]}
          data={pricingConfigs}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2>Recent Configuration Changes</h2>
          <button className="text-xs text-muted-foreground hover:text-foreground">Full change log</button>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Change ID', sortable: true },
            { key: 'product', label: 'Product', sortable: true },
            { key: 'change', label: 'Description', sortable: false },
            { key: 'author', label: 'Author', sortable: true },
            { key: 'timestamp', label: 'Timestamp', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
          data={recentChanges}
        />
      </div>
    </div>
  );
}
