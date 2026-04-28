import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../ui/utils';
import { Icon } from '../Icon';
import { PollySize } from './types';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground hover:brightness-95',
        accent: 'bg-[var(--polly-teal-brand)] text-[var(--polly-dark-brand)] hover:brightness-95',
        error: 'bg-destructive text-destructive-foreground hover:brightness-95',
        ai: 'bg-[var(--polly-purple-ai)] text-white hover:brightness-95',
        aiLight: 'bg-[var(--colors-background-button-copilot-light-action,var(--polly-purple-ai))] text-[var(--polly-dark-brand)] hover:brightness-95',
      },
      variant: {
        solid: '',
        outline: 'bg-transparent border border-border text-foreground hover:bg-muted',
        text: 'bg-transparent border-transparent text-foreground hover:bg-muted',
        lite: 'bg-transparent border-transparent text-foreground px-1 hover:bg-transparent hover:underline',
      },
      size: {
        xs: 'h-7 px-3 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-4 text-base',
        xl: 'h-12 px-5 text-base',
      } satisfies Record<PollySize, string>,
      radius: {
        base: 'rounded-[16px]',
        pill: 'rounded-[99px]',
        round: 'rounded-full',
      },
      expand: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      intent: 'primary',
      variant: 'solid',
      size: 'md',
      radius: 'pill',
      expand: false,
    },
  },
);

interface PButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'primary' | 'accent' | 'error' | 'ai' | 'aiLight';
  variant?: 'solid' | 'outline' | 'text' | 'lite';
  size?: PollySize;
  radius?: 'base' | 'pill' | 'round';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  expand?: boolean;
}

export function PButton({
  intent = 'primary',
  variant = 'solid',
  size = 'md',
  radius = 'pill',
  className,
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText = 'Loading',
  expand = false,
  disabled,
  children,
  ...props
}: PButtonProps) {
  return (
    <button
      aria-disabled={disabled || isLoading}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ intent, variant, size, radius, expand }), className)}
      {...props}
    >
      {isLoading ? <Icon name="spinner" size={14} className="animate-spin" /> : leftIcon}
      {isLoading ? loadingText : children}
      {!isLoading ? rightIcon : null}
    </button>
  );
}
