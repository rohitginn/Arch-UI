'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassSeparatorVariants = cva(
  [
    'shrink-0',
    'transition-all duration-200',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'h-px w-full',
        vertical: 'h-full w-px',
      },
      variant: {
        solid: [
          'bg-black/10',
          'dark:bg-white/10',
        ],
        dashed: [
          'border-0 bg-transparent',
          'bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_4px,transparent_4px,transparent_8px)]',
          'dark:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_4px,transparent_4px,transparent_8px)]',
        ],
        dotted: [
          'border-0 bg-transparent',
          'bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_6px)]',
          'dark:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_2px,transparent_2px,transparent_6px)]',
        ],
        gradient: [
          'bg-gradient-to-r from-transparent via-black/10 to-transparent',
          'dark:via-white/10',
        ],
        glow: [
          'bg-gradient-to-r from-transparent via-primary/80 to-transparent',
          'shadow-[0_0_12px_rgba(var(--primary),0.4)]',
          'dark:shadow-[0_0_12px_rgba(var(--primary),0.3)]',
        ],
      },
      spacing: {
        none: 'my-0',
        xs: 'my-1',
        sm: 'my-2',
        md: 'my-4',
        lg: 'my-6',
        xl: 'my-8',
      },
    },
    compoundVariants: [
      {
        orientation: 'vertical',
        spacing: 'xs',
        className: 'my-0 mx-1',
      },
      {
        orientation: 'vertical',
        spacing: 'sm',
        className: 'my-0 mx-2',
      },
      {
        orientation: 'vertical',
        spacing: 'md',
        className: 'my-0 mx-4',
      },
      {
        orientation: 'vertical',
        spacing: 'lg',
        className: 'my-0 mx-6',
      },
      {
        orientation: 'vertical',
        spacing: 'xl',
        className: 'my-0 mx-8',
      },
      {
        orientation: 'vertical',
        variant: 'dashed',
        className: 'bg-[repeating-linear-gradient(0deg,_var(--separator-color)_0,_var(--separator-color)_4px,_transparent_4px,_transparent_8px)]',
      },
      {
        orientation: 'vertical',
        variant: 'dotted',
        className: 'bg-[repeating-linear-gradient(0deg,_var(--separator-color)_0,_var(--separator-color)_2px,_transparent_2px,_transparent_6px)]',
      },
      {
        orientation: 'vertical',
        variant: 'gradient',
        className: 'bg-gradient-to-b',
      },
      {
        orientation: 'vertical',
        variant: 'glow',
        className: 'bg-gradient-to-b shadow-[0_0_8px_rgba(var(--primary),0.3)]',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'solid',
      spacing: 'md',
    },
  }
);

export interface GlassSeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-orientation'>,
  VariantProps<typeof glassSeparatorVariants> {
  decorative?: boolean;
  label?: string;
}

const GlassSeparator = React.forwardRef<HTMLDivElement, GlassSeparatorProps>(
  ({ className, orientation = 'horizontal', variant, spacing, decorative = true, label, ...props }, ref) => {
    const orientationValue = orientation ?? 'horizontal';

    // If there's a label, render a labeled separator
    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center',
            spacing === 'xs' && 'my-1',
            spacing === 'sm' && 'my-2',
            spacing === 'md' && 'my-4',
            spacing === 'lg' && 'my-6',
            spacing === 'xl' && 'my-8',
            className
          )}
          role={decorative ? 'none' : 'separator'}
          aria-orientation={decorative ? undefined : orientationValue}
          {...props}
        >
          <div className={cn(
            'flex-1 h-px',
            variant === 'solid' && 'bg-border',
            variant === 'gradient' && 'bg-gradient-to-r from-transparent via-border to-border',
            variant === 'glow' && 'bg-gradient-to-r from-transparent via-primary/50 to-primary/50',
          )} />
          <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <div className={cn(
            'flex-1 h-px',
            variant === 'solid' && 'bg-border',
            variant === 'gradient' && 'bg-gradient-to-r from-border via-border to-transparent',
            variant === 'glow' && 'bg-gradient-to-r from-primary/50 via-primary/50 to-transparent',
          )} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(glassSeparatorVariants({ orientation: orientationValue, variant, spacing }), className)}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientationValue}
        {...props}
      />
    );
  }
);

GlassSeparator.displayName = 'GlassSeparator';

export { GlassSeparator, glassSeparatorVariants };
