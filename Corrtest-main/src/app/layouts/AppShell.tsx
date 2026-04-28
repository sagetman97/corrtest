import { Outlet } from 'react-router';
import { PrimaryNav } from '../components/shell/PrimaryNav';
import { AppTopBar } from '../components/shell/AppTopBar';
import { ContextDrawer } from '../components/shell/ContextDrawer';

export function AppShell() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--colors-background-common-default-grey)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-[var(--border-radius-sm)] focus:bg-[var(--colors-background-common-white)] focus:px-3 focus:py-1 focus:text-sm focus:shadow-[var(--shadow-m)]"
      >
        Skip to main content
      </a>
      <PrimaryNav />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AppTopBar />
        <main id="main-content" className="min-h-0 flex-1 overflow-auto" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <ContextDrawer />
    </div>
  );
}
