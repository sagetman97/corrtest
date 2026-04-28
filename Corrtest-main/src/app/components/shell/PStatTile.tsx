import { ReactNode } from 'react';
import { Icon, IconName } from '../Icon';

export type StatTrend = 'positive' | 'negative' | 'neutral' | 'warning';

const trendColor: Record<StatTrend, string> = {
  positive: 'text-[var(--colors-text-icon-success,#27ae60)]',
  negative: 'text-[var(--colors-text-icon-error,#d63447)]',
  neutral: 'text-[var(--colors-text-icon-medium)]',
  warning: 'text-[var(--colors-text-icon-warning,#e67e22)]',
};

/**
 * Dense KPI tile aligned with Polly tokens (`ui-components-main` cascade via `polly-ui-tokens.css`).
 * Use on home, integrations, and executive summaries.
 */
export function PStatTile({
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle,
  icon,
  footer,
}: {
  title: string;
  value: string;
  change?: string;
  changeType?: StatTrend;
  subtitle?: string;
  icon?: IconName;
  footer?: ReactNode;
}) {
  return (
    <section
      className="flex min-h-[100px] flex-col border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-3 shadow-[var(--shadow-m)]"
      style={{ borderRadius: 'var(--border-radius-base, 12px)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--colors-text-icon-medium)]">{title}</p>
          <p className="text-xl font-semibold leading-tight text-[var(--colors-text-icon-dark)]">{value}</p>
          {change ? <p className={`mt-0.5 text-xs ${trendColor[changeType]}`}>{change}</p> : null}
          {subtitle ? <p className="mt-1 text-xs text-[var(--colors-text-icon-medium)]">{subtitle}</p> : null}
          {footer ? <div className="mt-2">{footer}</div> : null}
        </div>
        {icon ? (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--border-radius-sm)] bg-[var(--colors-background-common-ultra-light-neutral)] text-[var(--colors-text-icon-dark)]"
            aria-hidden
          >
            <Icon name={icon} size={16} />
          </span>
        ) : null}
      </div>
    </section>
  );
}
