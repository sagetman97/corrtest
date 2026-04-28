import { Link, useLocation } from 'react-router';
import { Icon, IconName } from './Icon';
import { ProductLogo } from './PollyLogo';

const navItems: Array<{ path: string; label: string; icon: IconName }> = [
  { path: '/', label: 'Overview', icon: 'home' },
  { path: '/product-pricing', label: 'Product & Pricing', icon: 'file-text' },
  { path: '/loan-trading', label: 'Loan Trading', icon: 'trending-up' },
  { path: '/analytics', label: 'Analytics', icon: 'bar-chart' },
  { path: '/ai-insights', label: 'AI Insights', icon: 'sparkles' },
  { path: '/integrations', label: 'Integrations', icon: 'network' },
  { path: '/admin', label: 'Admin', icon: 'settings' },
  { path: '/support', label: 'Support', icon: 'support' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <div className="w-56 bg-sidebar border-r border-sidebar-border h-full flex flex-col shrink-0">
      <div className="px-3 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <ProductLogo size={24} variant="dark" productColor="#01FFF0" />
          <span className="text-sm text-sidebar-foreground font-medium">Polly</span>
        </div>
      </div>

      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-2.5 py-1.5 mb-0.5 transition-colors text-sm ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-2.5 border-t border-sidebar-border">
        <div className="text-xs">
          <div className="text-sidebar-foreground mb-0.5">ABC Lending Corp</div>
          <div className="text-sidebar-foreground/60">Production</div>
        </div>
      </div>
    </div>
  );
}
