import { Outlet } from 'react-router';
import { PillarTabs } from '../components/shell/PillarTabs';

const tabs = [
  { to: '/insights', label: 'Overview' },
  { to: '/insights/command', label: 'Command center' },
  { to: '/insights/ai', label: 'AI insights' },
  { to: '/insights/execution-delta', label: 'Execution delta' },
  { to: '/insights/margin-accuracy', label: 'Margin accuracy' },
  { to: '/insights/market-share', label: 'Market share' },
  { to: '/insights/sla-throughput', label: 'SLA & throughput' },
];

export function InsightsLayout() {
  return (
    <>
      <PillarTabs items={tabs} />
      <Outlet />
    </>
  );
}
