import { Outlet } from 'react-router';
import { PillarTabs } from '../components/shell/PillarTabs';

const tabs = [
  { to: '/trading/overview', label: 'Overview' },
  { to: '/trading/best-efforts', label: 'Best efforts' },
  { to: '/trading/mandatory-bid', label: 'Mandatory bid' },
  { to: '/trading/opportunities', label: 'Opportunities' },
  { to: '/trading/market-making', label: 'Market making' },
  { to: '/trading/pipeline-marks', label: 'Pipeline marks' },
  { to: '/trading/shadow-bidding', label: 'Shadow bidding' },
];

export function TradingLayout() {
  return (
    <>
      <PillarTabs items={tabs} />
      <Outlet />
    </>
  );
}
