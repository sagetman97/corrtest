import { NavLink } from 'react-router';

export interface PillarTabItem {
  to: string;
  label: string;
}

export function PillarTabs({ items }: { items: PillarTabItem[] }) {
  return (
    <div className="border-b border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] px-4">
      <div className="flex gap-1 overflow-x-auto py-2" role="tablist" aria-label="Section navigation">
        {items.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end
            className={({ isActive }) =>
              `whitespace-nowrap rounded-[var(--border-radius-xl)] px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)] focus-visible:ring-offset-2 ${
                isActive
                  ? 'bg-[var(--colors-background-common-primary)] text-[var(--colors-text-icon-light)]'
                  : 'text-[var(--colors-text-icon-medium)] hover:bg-[var(--colors-background-common-default-grey)] hover:text-[var(--colors-text-icon-dark)]'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
