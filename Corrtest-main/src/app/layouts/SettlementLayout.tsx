import { Outlet } from 'react-router';
import { PillarTabs } from '../components/shell/PillarTabs';

const tabs = [
  { to: '/settlement/overview', label: 'Overview' },
  { to: '/settlement/delivery', label: 'Delivery' },
  { to: '/settlement/conditioning', label: 'Conditioning' },
  { to: '/settlement/clearing', label: 'Clearing' },
  { to: '/settlement/purchase-advice', label: 'Purch. advice' },
  { to: '/settlement/cash', label: 'Cash' },
  { to: '/settlement/compliance', label: 'Compliance' },
  { to: '/settlement/reconciliation', label: 'Reconcile' },
  { to: '/settlement/servicing', label: 'Servicing' },
  { to: '/settlement/custodial', label: 'Custodial' },
  { to: '/settlement/post-close', label: 'Post-close' },
];

export function SettlementLayout() {
  return (
    <>
      <PillarTabs items={tabs} />
      <Outlet />
    </>
  );
}
