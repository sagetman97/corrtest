interface StatusBadgeProps {
  status: 'active' | 'pending' | 'error' | 'success' | 'warning' | 'locked' | 'processing';
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const styles = {
    active: 'bg-[#e7ecfc] text-[#1c67fe]',
    pending: 'bg-[#fef3e7] text-[#c67c00]',
    error: 'bg-[#fdeced] text-[#d63447]',
    success: 'bg-[#e8f5ef] text-[#27ae60]',
    warning: 'bg-[#fef3e7] text-[#e67e22]',
    locked: 'bg-[#f3e8fc] text-[#9b51e0]',
    processing: 'bg-[#eaeaea] text-[#777777]',
  };

  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs ${styles[status]}`}
      style={{ borderRadius: 'var(--radius-xs)' }}
    >
      {displayLabel}
    </span>
  );
}
