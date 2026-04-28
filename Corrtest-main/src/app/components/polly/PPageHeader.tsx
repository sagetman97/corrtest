import { ReactNode } from 'react';
import { PILLAR_PAGE_ACCENT } from '../../design/pillarPageAccent';
import { ProductLogo } from '../PollyLogo';

interface PPageHeaderProps {
  title: string;
  subtitle?: string;
  color?: string;
  actions?: ReactNode;
}

export function PPageHeader({ title, subtitle, color = PILLAR_PAGE_ACCENT.tealBrand, actions }: PPageHeaderProps) {
  return (
    <header className="mb-4 flex flex-wrap items-start justify-between gap-4 border-b border-[var(--colors-border-common-default)] pb-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <ProductLogo size={28} productColor={color} />
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--colors-text-icon-dark)] sm:text-2xl">{title}</h1>
          {subtitle ? (
            <p className="mt-1 max-w-4xl text-sm leading-relaxed text-[var(--colors-text-icon-medium)]">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{actions}</div> : null}
    </header>
  );
}
