'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassLabelVariants = cva(
  [
    'text-sm font-medium leading-none',
    'transition-colors duration-200',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
  {
    variants: {
      variant: {
        default: 'text-slate-900 dark:text-white',
        muted: 'text-slate-600 dark:text-slate-300',
        error: 'text-red-600 dark:text-red-400',
        success: 'text-emerald-600 dark:text-emerald-400',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface GlassLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof glassLabelVariants> {
  required?: boolean;
  optional?: boolean;
}

const GlassLabel = React.forwardRef<HTMLLabelElement, GlassLabelProps>(
  ({ className, variant, size, required, optional, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(glassLabelVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500 dark:text-red-400" aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="ml-1.5 text-slate-400 dark:text-slate-500 text-xs font-normal">
            (optional)
          </span>
        )}
      </label>
    );
  }
);

GlassLabel.displayName = 'GlassLabel';

export { GlassLabel, glassLabelVariants };
