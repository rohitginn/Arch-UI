'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { X } from 'lucide-react';

const glassBadgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'font-medium',
    'backdrop-blur-sm',
    'border',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white/80 dark:bg-white/10',
          'border-black/5 dark:border-white/15',
          'text-slate-800 dark:text-white',
          'shadow-sm',
        ],
        primary: [
          'bg-blue-500/10 dark:bg-blue-500/20',
          'text-blue-700 dark:text-blue-300',
          'border-blue-500/20 dark:border-blue-400/30',
        ],
        secondary: [
          'bg-purple-500/10 dark:bg-purple-500/20',
          'text-purple-700 dark:text-purple-300',
          'border-purple-500/20 dark:border-purple-400/30',
        ],
        success: [
          'bg-emerald-500/10 dark:bg-emerald-500/20',
          'text-emerald-700 dark:text-emerald-300',
          'border-emerald-500/20 dark:border-emerald-400/30',
        ],
        warning: [
          'bg-amber-500/10 dark:bg-amber-500/20',
          'text-amber-800 dark:text-amber-300',
          'border-amber-500/20 dark:border-amber-400/30',
        ],
        error: [
          'bg-red-500/10 dark:bg-red-500/20',
          'text-red-700 dark:text-red-300',
          'border-red-500/20 dark:border-red-400/30',
        ],
        outline: [
          'bg-transparent',
          'border-black/15 dark:border-white/20',
          'text-slate-700 dark:text-slate-200',
        ],
        glass: [
          'bg-white/40 dark:bg-white/[0.08]',
          'border-white/40 dark:border-white/10',
          'text-slate-900 dark:text-white',
          'shadow-sm backdrop-blur-md',
        ],
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5',
      },
      pill: {
        true: 'rounded-full',
        false: 'rounded-md',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pill: true,
    },
  }
);

export interface GlassBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof glassBadgeVariants> {
  dot?: boolean;
  dotColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  pulse?: boolean;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const dotColors = {
  default: 'bg-slate-500 dark:bg-slate-400',
  primary: 'bg-blue-500 dark:bg-blue-400',
  secondary: 'bg-purple-500 dark:bg-purple-400',
  success: 'bg-emerald-500 dark:bg-emerald-400',
  warning: 'bg-amber-500 dark:bg-amber-400',
  error: 'bg-red-500 dark:bg-red-400',
};

const GlassBadge = React.forwardRef<HTMLSpanElement, GlassBadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      pill = true,
      dot = false,
      dotColor,
      pulse = false,
      icon,
      closable = false,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const activeDotColor = dotColor || (variant === 'glass' || variant === 'outline' ? 'default' : variant) as keyof typeof dotColors;

    return (
      <span
        ref={ref}
        className={cn(glassBadgeVariants({ variant, size, pill }), className)}
        {...props}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            {pulse && (
              <span
                className={cn(
                  'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                  dotColors[activeDotColor]
                )}
              />
            )}
            <span
              className={cn(
                'relative inline-flex h-1.5 w-1.5 rounded-full',
                dotColors[activeDotColor]
              )}
            />
          </span>
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {closable && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose?.();
            }}
            className={cn(
              'ml-0.5 -mr-1 p-0.5 rounded-full shrink-0',
              'hover:bg-black/10 dark:hover:bg-white/20',
              'transition-colors duration-150 outline-none',
              'focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1'
            )}
            aria-label="Remove badge"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </span>
    );
  }
);

GlassBadge.displayName = 'GlassBadge';

export { GlassBadge, glassBadgeVariants };
