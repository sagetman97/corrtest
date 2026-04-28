import { ReactNode } from 'react';
import { PCard } from './PCard';

interface PChartCardProps {
  title: string;
  subtitle?: string;
  legend?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function PChartCard({ title, subtitle, legend, actions, children }: PChartCardProps) {
  return (
    <PCard
      title={title}
      description={subtitle}
      actions={actions}
      className="h-full"
    >
      <div className="mb-3">{children}</div>
      {legend ? <div className="border-t border-[var(--colors-border-common-default)] pt-2">{legend}</div> : null}
    </PCard>
  );
}
