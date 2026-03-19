'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassTextareaVariants = cva(
  [
    // Base styles
    'w-full min-h-[100px] rounded-xl',
    'backdrop-blur-md',
    // Semantic tokens - light & dark
    'bg-form-bg text-form-text placeholder:text-form-placeholder',
    'dark:bg-form-bg dark:text-form-text dark:placeholder:text-form-placeholder',
    'transition-all duration-300 ease-out',
    'resize-none',
    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-ring-focus/20 dark:focus:ring-ring-focus/20',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        default: [
          'border border-form-border dark:border-form-border',
          'hover:border-form-border-hover dark:hover:border-form-border-hover',
          'focus:border-form-border-focus focus:bg-form-bg-focus dark:focus:border-form-border-focus dark:focus:bg-form-bg-focus',
        ],
        bordered: [
          'border-2 border-slate-300 dark:border-white/30',
          'hover:border-slate-400 dark:hover:border-white/40',
          'focus:border-blue-500 dark:focus:border-blue-400/70',
        ],
        ghost: [
          'border border-transparent',
          'bg-transparent backdrop-blur-none',
          'hover:bg-slate-100 dark:hover:bg-white/10',
          'focus:bg-slate-100 dark:focus:bg-white/15',
        ],
        gradient: [
          'border border-slate-300 dark:border-white/20',
          'bg-gradient-to-br from-slate-100 via-slate-50 to-transparent dark:from-white/15 dark:via-white/10 dark:to-transparent',
          'focus:from-slate-150 focus:via-slate-100 focus:to-slate-50 dark:focus:from-white/20 dark:focus:via-white/15 dark:focus:to-white/10',
        ],
      },
      size: {
        sm: 'px-3 py-2 text-sm min-h-[80px]',
        md: 'px-4 py-3 text-base min-h-[100px]',
        lg: 'px-5 py-4 text-lg min-h-[120px]',
      },
      isError: {
        true: 'border-form-error-border focus:ring-form-error-ring/20 focus:border-form-error-border',
        false: '',
      },
      glow: {
        true: 'focus:shadow-[0_0_20px_rgba(255,255,255,0.15)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isError: false,
      glow: false,
    },
  }
);

export interface GlassTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
  VariantProps<typeof glassTextareaVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  charCount?: boolean;
  maxLength?: number;
}

const GlassTextarea = React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  (
    {
      className,
      variant,
      size,
      isError,
      glow,
      label,
      helperText,
      errorText,
      charCount,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue?.toString() || ''
    );
    const currentValue = value !== undefined ? value.toString() : internalValue;
    const currentLength = currentValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const showError = isError || !!errorText;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-form-label dark:text-form-label">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={maxLength}
            className={cn(
              glassTextareaVariants({
                variant,
                size,
                isError: showError,
                glow,
              }),
              className
            )}
            {...props}
          />
          {charCount && maxLength && (
            <div className="absolute bottom-3 right-3 text-xs text-form-placeholder dark:text-form-placeholder">
              {currentLength}/{maxLength}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p
            className={cn(
              'text-sm',
              showError ? 'text-form-error-text' : 'text-form-helper dark:text-form-helper'
            )}
          >
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

GlassTextarea.displayName = 'GlassTextarea';

export { GlassTextarea, glassTextareaVariants };
