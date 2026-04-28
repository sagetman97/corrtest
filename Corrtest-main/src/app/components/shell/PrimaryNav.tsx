import { NavLink } from 'react-router';
import { Icon, IconName } from '../Icon';
import { ProductLogo } from '../PollyLogo';

const pillars: Array<{ to: string; label: string; icon: IconName; end?: boolean }> = [
  { to: '/home', label: 'Home', icon: 'home', end: true },
  { to: '/pricing', label: 'Pricing & Marks', icon: 'layers' },
  { to: '/trading', label: 'Trading & Execution', icon: 'trending-up' },
  { to: '/settlement', label: 'Settlement & Cash', icon: 'truck' },
  { to: '/network', label: 'Network & Integrations', icon: 'network' },
];

export function PrimaryNav() {
  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-[var(--colors-border-common-default)] bg-[var(--colors-background-uncommon-nav-nav)] text-[var(--colors-text-icon-light)]">
      <div className="border-b border-[var(--colors-border-common-dark)] px-4 py-4">
        <div className="flex items-center gap-2">
          <ProductLogo size={28} variant="dark" productColor="#01FFF0" />
          <div>
            <div className="text-sm font-semibold">Polly</div>
            <div className="text-[11px] text-white/70">AI Correspondent</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3" aria-label="Primary">
        {pillars.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[var(--border-radius-sm)] px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--colors-background-uncommon-nav-nav)] ${
                isActive
                  ? 'bg-[var(--colors-background-uncommon-nav-section-active)] text-white'
                  : 'text-white/80 hover:bg-[var(--colors-background-uncommon-nav-subsection-default)] hover:text-white'
              }`
            }
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[var(--colors-border-common-dark)] px-4 py-3 text-xs text-white/60">
        <div className="font-medium text-white/90">Demo org</div>
        <div>Demo preview · mock-backed workflows</div>
      </div>
    </aside>
  );
}
