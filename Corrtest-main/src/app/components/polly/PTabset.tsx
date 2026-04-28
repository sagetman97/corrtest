import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface Tab {
  id: string;
  label: string;
}

interface PTabsetProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children?: ReactNode;
}

export function PTabset({ tabs, activeTab, onTabChange, children }: PTabsetProps) {
  return (
    <div className="space-y-3">
      <div role="tablist" className="flex gap-2 border-b border-border pb-2">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selected}
              className={cn(
                'rounded-[99px] px-3 py-1.5 text-sm',
                selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-accent',
              )}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}
