'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { motion, AnimatePresence } from 'motion/react';

const glassCheckboxVariants = cva(
  [
    // Base checkbox styles
    'relative shrink-0 cursor-pointer',
    'rounded-md',
    'backdrop-blur-sm',
    // Semantic token-based colors (light: solid, dark: glass)
    'bg-form-bg border-2 border-form-border',
    'transition-all duration-200 ease-out',
    // Focus styles - blue accent ring
    'focus:outline-none focus:ring-2 focus:ring-ring-focus/20 focus:ring-offset-2 focus:ring-offset-transparent',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // Checked styles - blue background
    'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500/80 dark:data-[state=checked]:border-blue-400',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      variant: {
        default: 'hover:bg-form-bg-hover hover:border-form-border-hover',
        gradient:
          'data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500 dark:data-[state=checked]:from-blue-500/80 dark:data-[state=checked]:to-purple-500/80',
        glow: 'data-[state=checked]:shadow-[0_0_12px_rgba(59,130,246,0.5)]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface GlassCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
  VariantProps<typeof glassCheckboxVariants> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

const GlassCheckbox = React.forwardRef<HTMLInputElement, GlassCheckboxProps>(
  (
    {
      className,
      size,
      variant,
      label,
      description,
      checked,
      indeterminate,
      disabled,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (ref || innerRef) as React.RefObject<HTMLInputElement>;

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, combinedRef]);

    const sizeClass = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    };

    return (
      <label
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            ref={combinedRef}
            checked={checked}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn(
              glassCheckboxVariants({ size, variant }),
              'peer-focus:ring-2 peer-focus:ring-ring-focus/20',
              className
            )}
          >
            <AnimatePresence mode="wait">
              {/* Checkmark */}
              {checked && !indeterminate && (
                <motion.svg
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    'absolute inset-0 m-auto text-white',
                    sizeClass[size || 'md']
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.05 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
              {/* Indeterminate */}
              {indeterminate && (
                <motion.svg
                  key="indet"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    'absolute inset-0 m-auto text-white',
                    sizeClass[size || 'md']
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.05 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-form-text">{label}</span>
            )}
            {description && (
              <span className="text-xs text-form-helper">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

GlassCheckbox.displayName = 'GlassCheckbox';

export { GlassCheckbox, glassCheckboxVariants };
