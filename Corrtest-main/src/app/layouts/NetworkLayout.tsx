import { Outlet } from 'react-router';
import { PillarTabs } from '../components/shell/PillarTabs';

const tabs = [
  { to: '/network/overview', label: 'Overview' },
  { to: '/network/buyers', label: 'Buyers' },
  { to: '/network/sellers', label: 'Sellers' },
  { to: '/network/approvals', label: 'Approvals' },
  { to: '/network/integrations', label: 'Integrations' },
];

export function NetworkLayout() {
  return (
    <>
      <PillarTabs items={tabs} />
      <Outlet />
    </>
  );
}
