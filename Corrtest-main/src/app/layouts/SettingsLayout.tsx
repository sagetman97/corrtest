import { Outlet } from 'react-router';
import { PillarTabs } from '../components/shell/PillarTabs';

const tabs = [
  { to: '/settings', label: 'Overview' },
  { to: '/settings/admin', label: 'Admin' },
  { to: '/settings/roles', label: 'Roles' },
  { to: '/settings/policies', label: 'Policies' },
  { to: '/settings/templates', label: 'Templates' },
  { to: '/settings/adapter-showcase', label: 'Adapter' },
];

export function SettingsLayout() {
  return (
    <>
      <PillarTabs items={tabs} />
      <Outlet />
    </>
  );
}
