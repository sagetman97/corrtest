import { ReactNode } from 'react';
import { Icon, IconName } from '../Icon';

type AlertTone = 'info' | 'success' | 'warning';

const toneClass: Record<AlertTone, { wrap: string; icon: string }> = {
  info: {
    wrap: 'border-[var(--colors-border-common-accent)] bg-[var(--colors-background-common-ultra-light-neutral)]',
    icon: 'text-[var(--colors-border-common-accent)]',
  },
  success: {
    wrap: 'border-[var(--colors-text-icon-success)]/30 bg-[var(--colors-background-common-ultra-light-neutral)]',
    icon: 'text-[var(--colors-text-icon-success,#27ae60)]',
  },
  warning: {
    wrap: 'border-[var(--colors-text-icon-warning)]/40 bg-[var(--colors-background-common-ultra-light-neutral)]',
    icon: 'text-[var(--colors-text-icon-warning,#e67e22)]',
  },
};

/** Inline callout using Polly radius + borders (Figma / ui-components parity). */
export function PollyInlineAlert({
  tone = 'info',
  icon = 'circle-info',
  title,
  children,
}: {
  tone?: AlertTone;
  icon?: IconName;
  title?: string;
  children: ReactNode;
}) {
  const c = toneClass[tone];
  return (
    <aside
      className={`flex gap-3 rounded-[var(--border-radius-base)] border p-4 shadow-[var(--shadow-s)] ${c.wrap}`}
      role="note"
    >
      <Icon name={icon} size={18} className={`mt-0.5 shrink-0 ${c.icon}`} />
      <div className="min-w-0 flex-1 text-sm text-[var(--colors-text-icon-dark)]">
        {title ? <p className="mb-1 font-medium">{title}</p> : null}
        <div className="text-[var(--colors-text-icon-medium)] [&_p]:leading-relaxed">{children}</div>
      </div>
    </aside>
  );
}
