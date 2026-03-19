'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassSelectTriggerVariants = cva(
  [
    // Base styles
    'w-full rounded-xl cursor-pointer',
    'backdrop-blur-md',
    'flex items-center justify-between',
    // Semantic tokens
    'bg-form-bg text-form-text',
    'dark:bg-form-bg dark:text-form-text',
    'transition-all duration-300 ease-out',
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
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-13 px-5 text-lg',
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

export interface GlassSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface GlassSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
  VariantProps<typeof glassSelectTriggerVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  options: GlassSelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string } }) => void;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const GlassSelect = React.forwardRef<HTMLDivElement, GlassSelectProps>(
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
      options,
      placeholder = 'Select an option',
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const showError = isError || !!errorText;

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optionValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.({ target: { value: optionValue } });
      onValueChange?.(optionValue);
      setIsOpen(false);
    };

    // Close on outside click
    React.useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on escape
    React.useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
      <div ref={ref} className={cn('w-full space-y-2', className)} {...props}>
        {label && (
          <label className="block text-sm font-medium text-form-label dark:text-form-label">
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative">
          {/* Trigger Button */}
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              glassSelectTriggerVariants({
                variant,
                size,
                isError: showError,
                glow,
              }),
              isOpen && 'ring-2 ring-ring-focus/20 dark:ring-ring-focus/20'
            )}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={cn(!selectedOption && 'text-form-placeholder dark:text-form-placeholder')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={cn(
                'h-5 w-5 text-form-placeholder dark:text-form-placeholder transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className={cn(
                'absolute z-50 w-full mt-2',
                'rounded-xl overflow-hidden',
                'backdrop-blur-xl',
                'border border-form-border dark:border-form-border',
                'bg-form-bg-focus dark:bg-form-bg-focus',
                'shadow-lg shadow-black/10 dark:shadow-black/30',
                'animate-in fade-in-0 zoom-in-95 duration-150'
              )}
              role="listbox"
            >
              <div className="py-1 max-h-60 overflow-auto">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      'w-full px-4 py-2.5 text-left text-sm',
                      'transition-colors duration-150',
                      'text-form-text dark:text-form-text',
                      'hover:bg-form-bg-hover dark:hover:bg-form-bg-hover',
                      option.value === value && 'bg-form-bg-hover dark:bg-form-bg-hover font-medium',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    <span className="flex items-center justify-between">
                      {option.label}
                      {option.value === value && (
                        <svg
                          className="h-4 w-4 text-blue-500 dark:text-blue-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                ))}
              </div>
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

GlassSelect.displayName = 'GlassSelect';

export { GlassSelect, glassSelectTriggerVariants as glassSelectVariants };
