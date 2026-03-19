'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassInputVariants = cva(
  [
    'flex',
    'w-full',
    'rounded-xl',
    'border',
    'transition-all',
    'duration-200',
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'outline-none',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    // Placeholder — use token so it adapts to theme
    'placeholder:text-[var(--glass-text-placeholder)]',
    // Base - Frosted Glass (Light)
    'bg-white/60',
    'shadow-[0_2px_4px_rgba(0,0,0,0.02)]',
    'text-slate-900',
    'border-black/[0.08]',
    // Dark mode
    'dark:bg-black/[0.2]',
    'dark:border-white/[0.1]',
    'dark:text-white',
    // Focus styles
    'focus:bg-white/80',
    'focus:border-blue-500/50',
    'focus:ring-2',
    'focus:ring-blue-500/20',
    'focus:-translate-y-0.5',
    'focus:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_0_0_2px_rgba(59,130,246,0.1)]',
    'dark:focus:bg-white/[0.1]',
  ],
  {
    variants: {
      variant: {
        default: [],
        filled: [
          'bg-slate-100/80',
          'border-transparent',
          'hover:bg-slate-100/90',
          'focus:bg-white',
          'focus:border-black/[0.1]',
          'dark:bg-white/[0.12]',
          'dark:hover:bg-white/[0.16]',
          'dark:focus:bg-white/[0.14]',
        ],
        outline: [
          'bg-transparent',
          'border-black/[0.15]',
          'hover:border-black/[0.2]',
          'hover:bg-white/40',
          'focus:bg-white/50',
          'dark:bg-transparent',
          'dark:border-white/[0.2]',
          'dark:hover:border-white/[0.25]',
          'dark:hover:bg-white/[0.04]',
          'dark:focus:bg-white/[0.06]',
        ],
        glow: [
          'focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04),0_0_16px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06)]',
          'dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06),0_0_16px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.15)]',
        ],
      },
      inputSize: {
        sm: ['h-9', 'px-3.5', 'text-sm'],
        md: ['h-11', 'px-4', 'text-base'],
        lg: ['h-13', 'px-5', 'text-lg'],
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

/**
 * Floating Label Wrapper Styles - Refined
 */
const floatingLabelStyles = {
  wrapper: 'relative',
  label: cn(
    'absolute',
    'left-4',
    'text-form-label',
    'dark:text-form-label',
    'pointer-events-none',
    'transition-all',
    'duration-200',
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'origin-left'
  ),
};

const floatingLabelSizeStyles = {
  labelPad: {
    sm: 'pt-4 pb-1',
    md: 'pt-5 pb-1',
    lg: 'pt-6 pb-1',
  },
  labelDefault: {
    sm: 'top-1/2 -translate-y-1/2 text-sm',
    md: 'top-1/2 -translate-y-1/2 text-base',
    lg: 'top-1/2 -translate-y-1/2 text-lg',
  },
  labelFloating: {
    sm: 'top-1.5 -translate-y-0 text-[11px] scale-[0.9] font-medium',
    md: 'top-2 -translate-y-0 text-xs scale-[0.85] font-medium',
    lg: 'top-2.5 -translate-y-0 text-xs scale-[0.85] font-medium',
  },
};

export interface GlassInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof glassInputVariants> {
  /** Floating label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Left icon/element */
  leftIcon?: React.ReactNode;
  /** Right icon/element */
  rightIcon?: React.ReactNode;
  /** Show character count */
  showCount?: boolean;
  /** Container className */
  containerClassName?: string;
}

/**
 * GlassInput - A premium glassmorphic input component
 * 
 * Features:
 * - Visible frosted glass effect
 * - Elegant focus glow animation
 * - Floating label with spring animation
 * - Shake animation on error
 * - Multiple variants (default, filled, outline, glow)
 * - Character count display
 * 
 * @example
 * ```tsx
 * <GlassInput
 *   label="Email"
 *   type="email"
 *   variant="glow"
 *   placeholder="Enter your email"
 * />
 * ```
 */
const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      showCount = false,
      maxLength,
      disabled,
      containerClassName,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(
      (value as string) || (defaultValue as string) || ''
    );
    const [isShaking, setIsShaking] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const prevError = React.useRef<string | undefined>(undefined);

    // Merge refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Sync controlled value
    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(value as string);
      }
    }, [value]);

    // Shake animation on error
    React.useEffect(() => {
      if (error && !prevError.current) {
        setIsShaking(true);
        const timer = setTimeout(() => setIsShaking(false), 500);
        return () => clearTimeout(timer);
      }
      prevError.current = error;
    }, [error]);

    const hasValue = inputValue.length > 0;
    const isFloating = isFocused || hasValue;
    const hasError = !!error;
    const resolvedInputSize = (inputSize ?? 'md') as 'sm' | 'md' | 'lg';
    const labelPadClass = floatingLabelSizeStyles.labelPad[resolvedInputSize];

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={cn('relative', 'perspective-1000', containerClassName)}>
        {/* Input wrapper for icons and label */}
        <div className={cn(floatingLabelStyles.wrapper)}>
          {/* Left icon */}
          {leftIcon && (
            <div
              className={cn(
                label
                  ? ['absolute', 'inset-y-0', 'left-3.5', 'flex', 'items-center', labelPadClass]
                  : ['absolute', 'left-3.5', 'top-1/2', '-translate-y-1/2'],
                'z-10',
                'text-form-placeholder',
                'dark:text-form-placeholder',
                'transition-colors',
                'duration-200',
                isFocused && 'text-form-label dark:text-form-label'
              )}
            >
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={inputRef}
            type={props.type || 'text'}
            className={cn(
              glassInputVariants({ variant, inputSize }),
              // Error styles - softer but clear
              hasError && [
                'border-form-error-border',
                'ring-2',
                'ring-form-error-ring/20',
                'focus:border-form-error-border',
                'focus:ring-form-error-ring/30',
                'focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1),0_2px_8px_rgba(239,68,68,0.1)]',
              ],
              // Icon padding
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              // Floating label padding
              label && labelPadClass,
              label && 'placeholder:text-transparent focus:placeholder:text-form-placeholder dark:focus:placeholder:text-form-placeholder',
              // Shake animation
              isShaking && 'animate-[shake_0.5s_ease-in-out]',
              className
            )}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <label
              className={cn(
                floatingLabelStyles.label,
                isFloating
                  ? floatingLabelSizeStyles.labelFloating[resolvedInputSize]
                  : floatingLabelSizeStyles.labelDefault[resolvedInputSize],
                hasError && 'text-form-error-text',
                leftIcon && 'left-11'
              )}
            >
              {label}
            </label>
          )}

          {/* Right icon */}
          {rightIcon && (
            <div
              className={cn(
                label
                  ? ['absolute', 'inset-y-0', 'right-3.5', 'flex', 'items-center', labelPadClass]
                  : ['absolute', 'right-3.5', 'top-1/2', '-translate-y-1/2'],
                'z-10',
                'text-form-placeholder',
                'dark:text-form-placeholder',
                'transition-colors',
                'duration-200',
                isFocused && 'text-form-label dark:text-form-label'
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper / Error text */}
        {(error || helperText || showCount) && (
          <div className="flex justify-between items-start gap-2 mt-2.5 px-1 min-h-[20px]">
            <span
              className={cn(
                'text-sm',
                'leading-tight',
                'transition-all',
                'duration-300',
                'flex-1',
                hasError
                  ? 'text-form-error-text animate-[slideIn_0.3s_ease-out]'
                  : 'text-form-helper dark:text-form-helper'
              )}
            >
              {error || helperText}
            </span>
            {showCount && maxLength && (
              <span
                className={cn(
                  'text-sm',
                  'tabular-nums',
                  inputValue.length >= maxLength
                    ? 'text-form-error-text'
                    : 'text-form-placeholder dark:text-form-placeholder'
                )}
              >
                {inputValue.length}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export { GlassInput, glassInputVariants };
