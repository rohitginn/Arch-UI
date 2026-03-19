'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { motion } from 'motion/react';

const glassSwitchVariants = cva(
  [
    // Base switch styles
    'relative inline-flex shrink-0 cursor-pointer',
    'rounded-full',
    'backdrop-blur-sm',
    // Semantic token-based colors (light: solid, dark: glass)
    'bg-interactive-bg border-2 border-form-border',
    'transition-all duration-300 ease-out',
    // Focus styles - blue accent ring
    'focus:outline-none focus:ring-2 focus:ring-ring-focus/20 focus:ring-offset-2 focus:ring-offset-transparent',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
      variant: {
        default: 'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500/80 dark:data-[state=checked]:border-blue-400',
        gradient:
          'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500 data-[state=checked]:border-purple-500 dark:data-[state=checked]:from-blue-500/80 dark:data-[state=checked]:to-purple-500/80 dark:data-[state=checked]:border-purple-400',
        success:
          'data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-500/80 dark:data-[state=checked]:border-emerald-400',
        glow: 'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:shadow-[0_0_16px_rgba(59,130,246,0.5)] dark:data-[state=checked]:bg-blue-500/80 dark:data-[state=checked]:border-blue-400',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const thumbSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const thumbTranslate = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-7',
};

export interface GlassSwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
  VariantProps<typeof glassSwitchVariants> {
  label?: string;
  description?: string;
  labelPosition?: 'left' | 'right';
}

const GlassSwitch = React.forwardRef<HTMLInputElement, GlassSwitchProps>(
  (
    {
      className,
      size = 'md',
      variant,
      label,
      description,
      labelPosition = 'right',
      checked,
      disabled,
      ...props
    },
    ref
  ) => {
    const labelContent = (label || description) && (
      <div className="flex flex-col">
        {label && (
          <span className="text-sm font-medium text-form-text">{label}</span>
        )}
        {description && (
          <span className="text-xs text-form-helper">{description}</span>
        )}
      </div>
    );

    return (
      <label
        className={cn(
          'inline-flex items-center gap-3 cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {labelPosition === 'left' && labelContent}
        <motion.div
          className="relative"
          whileTap={disabled ? undefined : { scale: 0.95 }}
        >
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn(
              glassSwitchVariants({ size, variant }),
              'peer-focus:ring-2 peer-focus:ring-white/20',
              className
            )}
          >
            {/* Thumb */}
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                'absolute left-0.5 top-1/2 -translate-y-1/2',
                'rounded-full bg-white shadow-sm',
                thumbSizes[size || 'md'],
                checked && thumbTranslate[size || 'md']
              )}
            />
          </div>
        </motion.div>
        {labelPosition === 'right' && labelContent}
      </label>
    );
  }
);

GlassSwitch.displayName = 'GlassSwitch';

export { GlassSwitch, glassSwitchVariants };
