import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { PageHeader } from '../components/PageHeader';

const investorBids = [
  { investor: 'Fannie Mae', product: 'Conv 30Y Fixed', loans: 47, volume: '$18.2M', avgPrice: '101.250', margin: '+58 bps', status: 'active' },
  { investor: 'Freddie Mac', product: 'Conv 30Y Fixed', loans: 52, volume: '$21.5M', avgPrice: '101.125', margin: '+52 bps', status: 'active' },
  { investor: 'Ginnie Mae', product: 'FHA 30Y Fixed', loans: 38, volume: '$14.8M', avgPrice: '100.875', margin: '+48 bps', status: 'active' },
  { investor: 'Wells Fargo', product: 'Jumbo 30Y Fixed', loans: 23, volume: '$12.3M', avgPrice: '100.625', margin: '+42 bps', status: 'active' },
  { investor: 'UWM', product: 'Conv 15Y Fixed', loans: 31, volume: '$9.7M', avgPrice: '101.375', margin: '+62 bps', status: 'active' },
  { investor: 'Rocket Mortgage', product: 'VA 30Y Fixed', loans: 19, volume: '$7.4M', avgPrice: '100.750', margin: '+45 bps', status: 'pending' },
];

const commitments = [
  { id: 'CMT-8472', investor: 'Fannie Mae', type: 'Mandatory', volume: '$45.2M', deliveryDate: '2026-05-15', status: 'active', utilization: '78%' },
  { id: 'CMT-8471', investor: 'Freddie Mac', type: 'Best Efforts', volume: '$32.8M', deliveryDate: '2026-05-20', status: 'active', utilization: '65%' },
  { id: 'CMT-8470', investor: 'Ginnie Mae', type: 'Mandatory', volume: '$28.5M', deliveryDate: '2026-05-18', status: 'locked', utilization: '92%' },
  { id: 'CMT-8469', investor: 'Wells Fargo', type: 'Best Efforts', volume: '$19.3M', deliveryDate: '2026-06-01', status: 'pending', utilization: '34%' },
];

export function LoanTrading() {
  return (
    <div className="p-4">
      <PageHeader
        title="Loan Trading"
        subtitle="Market data as of 2026-04-27 10:45 AM EDT"
        productColor="#FFD601"
        showLogo={true}
      />

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard
          title="Best Execution Gain"
          value="+45.2 bps"
          change="vs fallback"
          changeType="positive"
          icon="trending-up"
        />
        <StatCard
          title="Active Commitments"
          value="$184.5M"
          subtitle="Across 12 investors"
          icon="boxes-stacked"
        />
        <StatCard
          title="Active Investors"
          value="28"
          change="+2 this month"
          changeType="positive"
          icon="users"
        />
        <StatCard
          title="Delivery Compliance"
          value="98.4%"
          change="Last 90 days"
          changeType="positive"
          icon="circle-check"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2>Active Investor Bids</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border text-sm hover:bg-muted/30" style={{ borderRadius: 'var(--radius-xl)' }}>
              Compare Investors
            </button>
            <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90" style={{ borderRadius: 'var(--radius-xl)' }}>
              Run Analysis
            </button>
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'investor', label: 'Investor', sortable: true },
            { key: 'product', label: 'Product', sortable: true },
            { key: 'loans', label: 'Loans', sortable: true },
            { key: 'volume', label: 'Volume', sortable: true },
            { key: 'avgPrice', label: 'Avg Price', sortable: true },
            { key: 'margin', label: 'Margin', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
          data={investorBids}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2>Active Commitments</h2>
          <button className="text-xs text-muted-foreground hover:text-foreground">All commitments</button>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Commitment ID', sortable: true },
            { key: 'investor', label: 'Investor', sortable: true },
            { key: 'type', label: 'Type', sortable: true },
            { key: 'volume', label: 'Volume', sortable: true },
            { key: 'deliveryDate', label: 'Delivery Date', sortable: true },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'utilization',
              label: 'Utilization',
              sortable: true,
              render: (value) => {
                const pct = parseInt(value);
                const color = pct >= 90 ? 'text-[#eb5757]' : pct >= 70 ? 'text-[#f2994a]' : 'text-[#6fcf97]';
                return <span className={color}>{value}</span>;
              },
            },
          ]}
          data={commitments}
        />
      </div>
    </div>
  );
}
