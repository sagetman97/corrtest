import { IconName } from './Icon';
import { Icon } from './Icon';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon?: IconName;
  subtitle?: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, subtitle }: StatCardProps) {
  const changeColor = {
    positive: 'text-[#27ae60]',
    negative: 'text-[#d63447]',
    neutral: 'text-muted-foreground',
    warning: 'text-[#e67e22]'
  }[changeType];

  return (
    <div
      className="bg-card border border-border p-3"
      style={{
        borderRadius: 'var(--radius-base)',
        boxShadow: 'var(--shadow-m)'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wide">{title}</div>
          <div className="text-lg mb-0.5">{value}</div>
          {change && (
            <div className={`text-xs ${changeColor}`}>{change}</div>
          )}
          {subtitle && (
            <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
          )}
        </div>
        {icon && (
          <Icon name={icon} size={14} className="text-muted-foreground shrink-0 mt-0.5" />
        )}
      </div>
    </div>
  );
}
