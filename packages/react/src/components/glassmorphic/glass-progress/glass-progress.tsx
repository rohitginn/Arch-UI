'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassProgressVariants = cva(
  [
    'relative overflow-hidden rounded-full',
    'transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        default: 'bg-surface-elevated border border-surface-border',
        glass: [
          'bg-surface-glass backdrop-blur-xl',
          'border border-surface-glass-border',
          'shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]', // Luxury Minimal edge highlight
        ],
      },
      size: {
        xs: 'h-1.5',
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-6', // Slightly thicker for organic feel
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const glassProgressIndicatorVariants = cva(
  [
    'h-full rounded-full',
    'transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]', // Organic Smoothness curve
  ],
  {
    variants: {
      color: {
        default: 'bg-text-primary shadow-[0_0_12px_rgba(255,255,255,0.1)]',
        primary: 'bg-interactive-primary shadow-[0_0_12px_var(--interactive-primary)]',
        success: 'bg-form-success shadow-[0_0_12px_var(--form-success)]',
        warning: 'bg-form-warning shadow-[0_0_12px_var(--form-warning)]',
        error: 'bg-form-error shadow-[0_0_12px_var(--form-error)]',
        gradient: 'bg-gradient-to-r from-interactive-primary via-purple-500 to-pink-500 shadow-[0_0_16px_rgba(168,85,247,0.5)]',
      },
      animated: {
        true: '',
        false: '',
      },
      striped: {
        true: [
          'bg-[length:1rem_1rem]',
          'bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]',
        ],
        false: '',
      },
    },
    compoundVariants: [
      {
        animated: true,
        striped: true,
        className: 'animate-[progress-stripes_1s_linear_infinite]',
      },
      {
        animated: true,
        striped: false,
        color: 'gradient',
        className: 'animate-[gradient-shift_2.5s_ease_infinite] bg-[length:200%_100%]',
      },
    ],
    defaultVariants: {
      color: 'primary',
      animated: false,
      striped: false,
    },
  }
);

type ProgressColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'gradient';

export interface GlassProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
  VariantProps<typeof glassProgressVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  label?: string;
  indeterminate?: boolean;
  color?: ProgressColor | null;
  animated?: boolean | null;
  striped?: boolean | null;
}

const GlassProgress = React.forwardRef<HTMLDivElement, GlassProgressProps>(
  ({
    className,
    variant,
    size,
    color,
    animated,
    striped,
    value = 0,
    max = 100,
    showValue,
    label,
    indeterminate,
    ...props
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="w-full flex flex-col gap-2">
        {/* Label and value display */}
        {(label || showValue) && (
          <div className="flex justify-between items-baseline text-sm tracking-tight">
            {label && (
              <span className="font-medium text-text-primary">
                {label}
              </span>
            )}
            {showValue && !indeterminate && (
              <span className="text-text-secondary font-mono text-xs font-semibold">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Progress bar */}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          className={cn(glassProgressVariants({ variant, size }), className)}
          {...props}
        >
          {indeterminate ? (
            // Indeterminate animation
            <div
              className={cn(
                glassProgressIndicatorVariants({ color: color ?? 'primary', animated: true, striped: false }),
                'w-1/3 animate-[indeterminate_1.5s_ease-in-out_infinite]',
                'relative opacity-90'
              )}
            >
              <div className="absolute inset-0 bg-white/20 blur-sm rounded-full mix-blend-overlay" />
            </div>
          ) : (
            // Determinate progress
            <div
              className={cn(
                glassProgressIndicatorVariants({ color: color ?? 'primary', animated: animated ?? false, striped: striped ?? false }),
                // Deep glow inner effect
                'relative overflow-hidden opacity-95'
              )}
              style={{ width: `${percentage}%` }}
            >
              {/* Organic highlight inside the bar */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent mix-blend-overlay pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

GlassProgress.displayName = 'GlassProgress';

// Add keyframes to tailwind (needs to be in global CSS or tailwind config)
// @keyframes progress-stripes {
//   0% { background-position: 1rem 0; }
//   100% { background-position: 0 0; }
// }
// @keyframes indeterminate {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(400%); }
// }
// @keyframes gradient-shift {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }

export { GlassProgress, glassProgressVariants, glassProgressIndicatorVariants };
