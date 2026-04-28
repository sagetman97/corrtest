import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export type DrawerEntity =
  | { type: 'loan'; id: string; title: string; subtitle?: string; meta?: Record<string, string> }
  | { type: 'tape'; id: string; title: string; subtitle?: string; meta?: Record<string, string> }
  | { type: 'package'; id: string; title: string; subtitle?: string; meta?: Record<string, string> }
  | null;

interface ShellContextValue {
  drawerOpen: boolean;
  drawerEntity: DrawerEntity;
  openDrawer: (entity: Exclude<DrawerEntity, null>) => void;
  closeDrawer: () => void;
}

const ShellContext = createContext<ShellContextValue | null>(null);

export function ShellProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerEntity, setDrawerEntity] = useState<DrawerEntity>(null);

  const openDrawer = useCallback((entity: Exclude<DrawerEntity, null>) => {
    setDrawerEntity(entity);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setDrawerEntity(null);
  }, []);

  const value = useMemo(
    () => ({
      drawerOpen,
      drawerEntity,
      openDrawer,
      closeDrawer,
    }),
    [drawerOpen, drawerEntity, openDrawer, closeDrawer],
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error('useShell must be used within ShellProvider');
  return ctx;
}
