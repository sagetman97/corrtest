import { StatCard } from '../components/StatCard';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader } from '../components/PageHeader';

const volumeData = [
  { date: '4/20', locks: 142, volume: 48.2 },
  { date: '4/21', locks: 156, volume: 52.8 },
  { date: '4/22', locks: 168, volume: 57.3 },
  { date: '4/23', locks: 145, volume: 49.1 },
  { date: '4/24', locks: 171, volume: 61.5 },
  { date: '4/25', locks: 183, volume: 68.2 },
  { date: '4/26', locks: 177, volume: 64.7 },
];

const marginData = [
  { product: 'Conv 30Y', margin: 58, volume: 124.5 },
  { product: 'FHA 30Y', margin: 48, volume: 86.3 },
  { product: 'VA 30Y', margin: 45, volume: 42.8 },
  { product: 'Jumbo 30Y', margin: 42, volume: 68.2 },
  { product: 'Conv 15Y', margin: 62, volume: 51.7 },
  { product: 'ARM 5/1', margin: 38, volume: 28.9 },
];

const channelData = [
  { channel: 'Retail', locks: 485, volume: 172.3, pullThrough: 89.2 },
  { channel: 'Wholesale', locks: 312, volume: 98.7, pullThrough: 85.6 },
  { channel: 'Correspondent', locks: 156, volume: 52.4, pullThrough: 91.8 },
  { channel: 'Consumer Direct', locks: 94, volume: 28.1, pullThrough: 82.3 },
];

export function Analytics() {
  return (
    <div className="p-4">
      <PageHeader
        title="Data & Analytics"
        subtitle="7-day rolling period | 2026-04-20 through 2026-04-27"
        productColor="#FF54D9"
        showLogo={true}
      />

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard
          title="Total Lock Volume"
          value="$402.4M"
          change="+15.3% vs last week"
          changeType="positive"
          icon="dollar-sign"
        />
        <StatCard
          title="Avg Margin"
          value="52.8 bps"
          change="+3.2 bps vs last week"
          changeType="positive"
          icon="trending-up"
        />
        <StatCard
          title="Pipeline Velocity"
          value="18.2 days"
          change="-2.1 days vs last month"
          changeType="positive"
          icon="bolt"
        />
        <StatCard
          title="Market Share"
          value="4.8%"
          change="+0.3% vs last quarter"
          changeType="positive"
          icon="bar-chart"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div
          className="bg-card border border-border p-5"
          style={{ borderRadius: 'var(--radius-base)', boxShadow: 'var(--shadow-m)' }}
        >
          <h3 className="mb-4 text-sm">Lock Volume Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="locks" stroke="#1c67fe" strokeWidth={2} name="Locks" />
              <Line yAxisId="right" type="monotone" dataKey="volume" stroke="#6fcf97" strokeWidth={2} name="Volume ($M)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className="bg-card border border-border p-5"
          style={{ borderRadius: 'var(--radius-base)', boxShadow: 'var(--shadow-m)' }}
        >
          <h3 className="mb-4 text-sm">Margin by Product</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={marginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="product" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="margin" fill="#1c67fe" name="Margin (bps)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className="bg-card border border-border p-5"
        style={{ borderRadius: 'var(--radius-base)', boxShadow: 'var(--shadow-m)' }}
      >
        <h3 className="mb-4 text-sm">Channel Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Channel</th>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Locks</th>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Volume</th>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Pull-Through</th>
                <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wide">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {channelData.map((row) => (
                <tr key={row.channel}>
                  <td className="px-3 py-2.5 text-sm">{row.channel}</td>
                  <td className="px-3 py-2.5 text-sm">{row.locks}</td>
                  <td className="px-3 py-2.5 text-sm">${row.volume}M</td>
                  <td className="px-3 py-2.5 text-sm">{row.pullThrough}%</td>
                  <td className="px-3 py-2.5">
                    <div className="w-full bg-[#eaeaea] rounded-full h-1.5">
                      <div
                        className="bg-[#1c67fe] h-1.5 rounded-full"
                        style={{ width: `${row.pullThrough}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
