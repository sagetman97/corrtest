import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PPageHeader } from '../../components/polly';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { PollyInlineAlert } from '../../components/shell/PollyInlineAlert';
import { PStatTile } from '../../components/shell/PStatTile';
import { execChannelPerformance, execMarginByProduct, execVolumeTrend } from '../../data/fixtures';

/** Combined analytics “command center” — parity with legacy flat Analytics route; uses chart token semantics from UX guidelines. */
export function InsightsExecutivePage() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,90rem)] space-y-8 p-4 pb-14">
      <PPageHeader
        title="Command center"
        subtitle="7-day rolling · Volume, margin, channel pull-through — narrative analytics on one surface"
        color={PILLAR_PAGE_ACCENT.magentaAnalytics}
      />

      <PollyInlineAlert tone="info" title="Analytics palette">
        Actual vs projection conventions: sequential primary stroke, categorical bars for segmentation. Palette ties to `--chart-*` theme variables.
      </PollyInlineAlert>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PStatTile title="Total lock volume" value="$402.4M" change="+15.3% vs last week" changeType="positive" icon="dollar-sign" />
        <PStatTile title="Avg margin" value="52.8 bps" change="+3.2 bps vs last week" changeType="positive" icon="trending-up" />
        <PStatTile title="Pipeline velocity" value="18.2 days" change="-2.1 days vs last month" changeType="positive" icon="bolt" />
        <PStatTile title="Market share (mock)" value="4.8%" change="+0.3% vs last quarter" changeType="positive" icon="bar-chart" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-5 shadow-[var(--shadow-m)]">
          <h3 className="mb-4 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Lock volume trend</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={execVolumeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--colors-border-common-default,#e5e7eb)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="locks" stroke="var(--chart-1,#1c67fe)" strokeWidth={2.5} name="Locks" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="volume"
                  stroke="var(--chart-2,#6fcf97)"
                  strokeWidth={2.5}
                  name="Volume ($M)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-5 shadow-[var(--shadow-m)]">
          <h3 className="mb-4 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Margin by product</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={execMarginByProduct}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--colors-border-common-default,#e5e7eb)" />
                <XAxis dataKey="product" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="margin" fill="var(--chart-2,#1dd6ff)" name="Margin (bps)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-5 shadow-[var(--shadow-m)]">
        <h3 className="mb-4 text-sm font-semibold text-[var(--colors-text-icon-dark)]">Channel performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-ultra-light-neutral)]">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">
                  Channel
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">
                  Locks
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">
                  Volume ($M)
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">
                  Pull-through
                </th>
                <th className="min-w-[140px] px-3 py-2 text-left text-xs font-semibold text-[var(--colors-text-icon-dark)]">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--colors-border-common-default)]">
              {execChannelPerformance.map((row) => (
                <tr key={row.channel} className="hover:bg-[var(--colors-background-common-ultra-light-neutral)]/60">
                  <td className="px-3 py-3 font-medium text-[var(--colors-text-icon-dark)]">{row.channel}</td>
                  <td className="px-3 py-3 text-[var(--colors-text-icon-dark)]">{row.locks}</td>
                  <td className="px-3 py-3 text-[var(--colors-text-icon-dark)]">${row.volume}M</td>
                  <td className="px-3 py-3 text-[var(--colors-text-icon-dark)]">{row.pullThrough}%</td>
                  <td className="px-3 py-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--colors-background-common-default-grey)]">
                      <div
                        className="h-2 rounded-full bg-[var(--colors-border-common-accent,#1c67fe)] transition-all"
                        style={{ width: `${Math.min(100, row.pullThrough)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
