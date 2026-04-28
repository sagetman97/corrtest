import { TextareaHTMLAttributes } from 'react';
import { cn } from '../ui/utils';

interface PTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  highlighted?: boolean;
  readOnlyState?: boolean;
}

export function PTextarea({ label, error, className, id, highlighted = false, readOnlyState = false, ...props }: PTextareaProps) {
  const inputId = id ?? props.name;
  return (
    <div className="space-y-1">
      {label ? <label htmlFor={inputId} className="text-sm font-medium">{label}</label> : null}
      <textarea
        id={inputId}
        className={cn(
          'min-h-24 w-full rounded-[8px] border border-border bg-input-background px-3 py-2 text-sm',
          readOnlyState ? 'bg-muted text-muted-foreground' : '',
          highlighted ? 'ring-2 ring-[var(--polly-yellow-exchange)]' : '',
          error ? 'border-destructive' : 'hover:border-foreground/40',
          className,
        )}
        aria-invalid={Boolean(error)}
        readOnly={readOnlyState || props.readOnly}
        {...props}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
