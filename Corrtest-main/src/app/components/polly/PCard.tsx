import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface PCardProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PCard({ title, description, actions, children, className }: PCardProps) {
  return (
    <section
      className={cn(
        'rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4 shadow-[var(--shadow-m)]',
        className,
      )}
    >
      {(title || actions) ? (
        <header className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title ? (
              <h3 className="text-base font-semibold leading-snug text-[var(--colors-text-icon-dark)]">{title}</h3>
            ) : null}
            {description ? (
              <p className="mt-1 text-xs leading-relaxed text-[var(--colors-text-icon-medium)]">{description}</p>
            ) : null}
          </div>
          {actions}
        </header>
      ) : null}
      {children}
    </section>
  );
}
