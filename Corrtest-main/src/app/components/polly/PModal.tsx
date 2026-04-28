import { ReactNode } from 'react';
import { PButton } from './PButton';

interface PModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onBack?: () => void;
  cancelText?: string;
  showBack?: boolean;
  backText?: string;
  variant?: 'default' | 'ai';
  hideClose?: boolean;
  size?: 'default' | 'small' | 'xs' | 'large' | 'xl' | 'full';
  children: ReactNode;
}

const sizeClassMap: Record<NonNullable<PModalProps['size']>, string> = {
  xs: 'max-w-md',
  small: 'max-w-lg',
  default: 'max-w-xl',
  large: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-[92vw]',
};

export function PModal({
  open,
  title,
  description,
  onClose,
  onBack,
  cancelText = 'Cancel',
  showBack = false,
  backText = 'Go Back',
  variant = 'default',
  hideClose = false,
  size = 'default',
  children,
}: PModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] p-4 shadow-[var(--shadow-xl)] ${sizeClassMap[size]} ${variant === 'ai' ? 'border-[var(--polly-purple-ai)]' : ''}`}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              {showBack ? <PButton variant="lite" size="xs" intent="accent" onClick={onBack}>{backText}</PButton> : null}
              <h2 className={`text-base ${variant === 'ai' ? 'text-[var(--polly-purple-ai)]' : ''}`}>{title}</h2>
            </div>
            {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
          </div>
          {!hideClose ? (
            <button className="rounded-[4px] px-2 py-1 text-sm hover:bg-muted" onClick={onClose} aria-label="Close modal">
              x
            </button>
          ) : null}
        </div>
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <PButton variant="outline" intent="accent" onClick={onClose}>{cancelText}</PButton>
        </div>
      </div>
    </div>
  );
}
