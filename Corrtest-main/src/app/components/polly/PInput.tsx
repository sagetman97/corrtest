import { InputHTMLAttributes } from 'react';
import { cn } from '../ui/utils';

interface PInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  variant?: 'default' | 'simple';
  highlighted?: boolean;
  readOnlyState?: boolean;
}

export function PInput({
  label,
  hint,
  error,
  className,
  id,
  variant = 'default',
  highlighted = false,
  readOnlyState = false,
  ...props
}: PInputProps) {
  const inputId = id ?? props.name;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className={variant === 'simple' ? 'space-y-0.5' : 'space-y-1'}>
      {label ? <label htmlFor={inputId} className="text-sm font-medium">{label}</label> : null}
      <input
        id={inputId}
        className={cn(
          'h-10 w-full rounded-[8px] border border-border bg-input-background px-3 text-sm',
          variant === 'simple' ? 'border-x-0 border-t-0 rounded-none px-0' : '',
          readOnlyState ? 'bg-muted text-muted-foreground' : '',
          highlighted ? 'ring-2 ring-[var(--polly-yellow-exchange)]' : '',
          error ? 'border-destructive' : 'hover:border-foreground/40',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        readOnly={readOnlyState || props.readOnly}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
