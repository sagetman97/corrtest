import { cn } from '../ui/utils';
import { PollyStatus } from './types';

const statusClassMap: Record<PollyStatus, string> = {
  active: 'bg-accent text-foreground',
  pending: 'bg-[#fef3e7] text-[#c67c00]',
  error: 'bg-[#fdeced] text-[#d63447]',
  success: 'bg-[#e8f5ef] text-[#27ae60]',
  warning: 'bg-[#fef3e7] text-[#e67e22]',
  locked: 'bg-[#ede9fe] text-[#A089FD]',
  processing: 'bg-muted text-muted-foreground',
  info: 'bg-[#e7ecfc] text-[#1c67fe]',
  completed: 'bg-[#e8f5ef] text-[#27ae60]',
  cancelled: 'bg-muted text-muted-foreground',
};

interface PStatusBadgeProps {
  status: PollyStatus;
  label?: string;
}

export function PStatusBadge({ status, label }: PStatusBadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-[4px] px-2 py-0.5 text-xs', statusClassMap[status])}>
      {label ?? status}
    </span>
  );
}
