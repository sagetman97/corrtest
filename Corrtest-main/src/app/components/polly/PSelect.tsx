import { SelectHTMLAttributes } from 'react';
import { cn } from '../ui/utils';

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface PSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: Option[];
  variant?: 'default' | 'simple' | 'minimal';
  readOnlyState?: boolean;
}

export function PSelect({
  label,
  hint,
  error,
  options,
  className,
  id,
  variant = 'default',
  readOnlyState = false,
  ...props
}: PSelectProps) {
  const selectId = id ?? props.name;
  const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined;
  return (
    <div className="space-y-1">
      {label ? <label htmlFor={selectId} className="text-sm font-medium">{label}</label> : null}
      <select
        id={selectId}
        className={cn(
          'h-10 w-full rounded-[8px] border border-border bg-input-background px-3 text-sm',
          variant === 'simple' ? 'border-x-0 border-t-0 rounded-none px-0' : '',
          variant === 'minimal' ? 'bg-transparent border-transparent px-0' : '',
          readOnlyState ? 'bg-muted text-muted-foreground pointer-events-none' : '',
          error ? 'border-destructive' : 'hover:border-foreground/40',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        disabled={readOnlyState || props.disabled}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${selectId}-error`} className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p id={`${selectId}-hint`} className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
