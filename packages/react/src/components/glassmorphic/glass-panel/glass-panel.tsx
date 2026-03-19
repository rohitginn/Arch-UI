'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

/**
 * Glass Panel Variants using Tailwind CSS
 */
const glassPanelVariants = cva(
  [
    'relative',
    'rounded-2xl',
    'overflow-hidden',
    'border',
    // Semantic token-based border
    'border-surface-border',
    // 3D Transform transitions
    'transition-all',
    'duration-500',
    'ease-[cubic-bezier(0.34,1.56,0.64,1)]',
    'transform-gpu',
    'will-change-transform',
    // Perspective container
    'group',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white/60',
          'dark:bg-black/40',
          'backdrop-blur-xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.04)]',
          'hover:-translate-y-1',
          'hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
          'hover:scale-[1.01]',
        ],
        elevated: [
          'bg-white/80',
          'dark:bg-black/60',
          'backdrop-blur-xl',
          'shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]',
          'hover:-translate-y-2',
          'hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)]',
          'hover:scale-[1.02]',
        ],
        floating: [
          'bg-white/80',
          'dark:bg-black/60',
          'backdrop-blur-2xl',
          'shadow-[0_25px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.2)]',
          'animate-float',
          'hover:-translate-y-3',
          'hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)]',
          'hover:scale-[1.03]',
        ],
        subtle: [
          'bg-white/40',
          'dark:bg-white/5',
          'backdrop-blur-sm',
          'shadow-none',
          'hover:-translate-y-0.5',
          'hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]',
          'hover:scale-[1.005]',
        ],
      },
      blur: {
        none: 'backdrop-blur-none',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
        xl: 'backdrop-blur-xl',
        '2xl': 'backdrop-blur-2xl',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-7',
        xl: 'p-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      blur: 'lg',
      padding: 'md',
    },
  }
);

export interface GlassPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassPanelVariants> {
  /** Show inner border glow */
  innerGlow?: boolean;
  /** Show outer shadow glow */
  outerGlow?: boolean;
  /** Custom glow color (hex or rgba) */
  glowColor?: string;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
}

/**
 * GlassPanel - A versatile floating glass panel component
 * 
 * Features:
 * - Customizable blur intensity (8-40px)
 * - Multiple elevation variants
 * - Inner and outer glow effects
 * - Header and footer sections
 * - Floating animation option
 * 
 * @example
 * ```tsx
 * <GlassPanel
 *   variant="elevated"
 *   blur="xl"
 *   innerGlow
 *   header={<h3>Panel Title</h3>}
 * >
 *   Panel content goes here
 * </GlassPanel>
 * ```
 */
const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      className,
      variant,
      blur,
      padding,
      innerGlow = false,
      outerGlow = false,
      glowColor = 'rgba(255, 255, 255, 0.1)',
      header,
      footer,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const glowStyle = outerGlow
      ? { boxShadow: `0 0 40px ${glowColor}` }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          glassPanelVariants({ variant, blur, padding: header || footer ? 'none' : padding }),
          className
        )}
        style={{ ...style, ...glowStyle }}
        {...props}
      >
        {/* Inner glow overlay */}
        {innerGlow && (
          <div
            className={cn(
              'absolute',
              'inset-0',
              'rounded-2xl',
              'pointer-events-none',
              'border',
              'border-slate-300/30 dark:border-white/20',
              'transition-all',
              'duration-500',
              'group-hover:border-slate-400/40 dark:group-hover:border-white/30'
            )}
            style={{
              boxShadow: `inset 0 0 20px ${glowColor}`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Animated border shine on hover */}
        <div
          className={cn(
            'absolute',
            'inset-0',
            'rounded-2xl',
            'pointer-events-none',
            'opacity-0',
            'group-hover:opacity-100',
            'transition-opacity',
            'duration-500',
            'bg-gradient-to-br',
            'from-white/10 via-transparent to-transparent',
            'animate-[shimmer_2s_ease-in-out_infinite]'
          )}
          aria-hidden="true"
        />

        {/* Gradient overlay with hover effect */}
        <div
          className={cn(
            'absolute',
            'inset-0',
            'bg-gradient-to-br',
            'from-slate-100/30 dark:from-white/5',
            'to-transparent',
            'pointer-events-none',
            'transition-opacity',
            'duration-500',
            'group-hover:from-slate-100/40 dark:group-hover:from-white/8',
            'group-hover:opacity-90'
          )}
          aria-hidden="true"
        />

        {/* Header */}
        {header && (
          <div
            className={cn(
              'relative',
              'z-10',
              'px-5',
              'py-4',
              'border-b',
              'border-slate-200/50 dark:border-white/10'
            )}
          >
            {header}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            'relative',
            'z-10',
            header || footer ? 'p-5' : ''
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              'relative',
              'z-10',
              'px-5',
              'py-4',
              'border-t',
              'border-white/10'
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

export { GlassPanel, glassPanelVariants };
