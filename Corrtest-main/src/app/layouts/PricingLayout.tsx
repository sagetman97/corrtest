import { Outlet } from 'react-router';
import { PillarTabs } from '../components/shell/PillarTabs';

const tabs = [
  { to: '/pricing/overview', label: 'Overview' },
  { to: '/pricing/programs', label: 'Programs' },
  { to: '/pricing/buyer-api', label: 'Buyer API' },
  { to: '/pricing/marks', label: 'Marks' },
  { to: '/pricing/eligibility', label: 'Eligibility' },
  { to: '/pricing/llpa-srp', label: 'LLPA / SRP' },
];

export function PricingLayout() {
  return (
    <>
      <PillarTabs items={tabs} />
      <Outlet />
    </>
  );
}
