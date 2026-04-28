import { Link, useLocation } from 'react-router';
import { ProductLogo } from './PollyLogo';
import { groupedRoutes } from '../routing/routeConfig';

export function Navigation() {
  const location = useLocation();

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border h-full flex flex-col shrink-0">
      <div className="px-3 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <ProductLogo size={24} variant="dark" productColor="#01FFF0" />
          <span className="text-sm text-sidebar-foreground font-medium">Polly</span>
        </div>
        <p className="mt-1 text-xs text-sidebar-foreground/70">AI Correspondent UX Prototype</p>
      </div>

      <nav className="flex-1 px-2 py-3 overflow-y-auto" aria-label="Primary">
        {Object.entries(groupedRoutes).map(([group, routes]) => (
          <section key={group} className="mb-4">
            <h2 className="px-2 py-1 text-[11px] uppercase tracking-wide text-sidebar-foreground/60">{group}</h2>
            <div className="space-y-0.5">
              {routes.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-2.5 py-1.5 transition-colors text-sm ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-foreground'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    }`}
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className="px-3 py-2.5 border-t border-sidebar-border">
        <div className="text-xs">
          <div className="text-sidebar-foreground mb-0.5">ABC Lending Corp</div>
          <div className="text-sidebar-foreground/60">Production</div>
        </div>
      </div>
    </aside>
  );
}
