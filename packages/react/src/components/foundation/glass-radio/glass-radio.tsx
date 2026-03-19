'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { motion, AnimatePresence } from 'motion/react';

const glassRadioVariants = cva(
  [
    // Base radio styles
    'relative shrink-0 cursor-pointer',
    'rounded-full',
    'backdrop-blur-sm',
    // Semantic token-based colors (light: solid, dark: glass)
    'bg-form-bg border-2 border-form-border',
    'transition-all duration-200 ease-out',
    // Focus styles - blue accent ring
    'focus:outline-none focus:ring-2 focus:ring-ring-focus/20 focus:ring-offset-2 focus:ring-offset-transparent',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // Checked styles
    'data-[state=checked]:border-blue-500 dark:data-[state=checked]:border-blue-400',
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
        gradient: 'data-[state=checked]:border-purple-500 dark:data-[state=checked]:border-purple-400',
        glow: 'data-[state=checked]:shadow-[0_0_12px_rgba(59,130,246,0.5)]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface GlassRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
  VariantProps<typeof glassRadioVariants> {
  label?: string;
  description?: string;
}

const GlassRadio = React.forwardRef<HTMLInputElement, GlassRadioProps>(
  (
    { className, size, variant, label, description, checked, disabled, ...props },
    ref
  ) => {
    const dotSize = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
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
            type="radio"
            ref={ref}
            checked={checked}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn(
              glassRadioVariants({ size, variant }),
              'peer-focus:ring-2 peer-focus:ring-white/20',
              checked && 'border-blue-400',
              'flex items-center justify-center',
              className
            )}
          >
            {/* Inner dot */}
            <AnimatePresence>
              {checked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    'rounded-full bg-blue-500 dark:bg-blue-400',
                    dotSize[size || 'md']
                  )}
                />
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

GlassRadio.displayName = 'GlassRadio';

// Radio Group Component
export interface GlassRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const GlassRadioGroup = React.forwardRef<HTMLDivElement, GlassRadioGroupProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      name,
      children,
      className,
      orientation = 'vertical',
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-6',
          className
        )}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<GlassRadioProps>(child)) {
            return React.cloneElement(child, {
              name,
              checked: child.props.value === currentValue,
              onChange: () => handleChange(child.props.value as string),
            });
          }
          return child;
        })}
      </div>
    );
  }
);

GlassRadioGroup.displayName = 'GlassRadioGroup';

export { GlassRadio, GlassRadioGroup, glassRadioVariants };
