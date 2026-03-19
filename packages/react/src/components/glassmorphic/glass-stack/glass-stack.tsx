'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassStackVariants = cva(
  [
    'flex',
    'transition-all duration-200',
  ],
  {
    variants: {
      direction: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',    // 4px
        sm: 'gap-2',    // 8px
        md: 'gap-4',    // 16px
        lg: 'gap-6',    // 24px
        xl: 'gap-8',    // 32px
        '2xl': 'gap-12', // 48px
        '3xl': 'gap-16', // 64px
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
    },
    defaultVariants: {
      direction: 'vertical',
      align: 'stretch',
      justify: 'start',
      gap: 'md',
      wrap: false,
    },
  }
);

export interface GlassStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassStackVariants> {
  divider?: React.ReactNode;
}

const GlassStack = React.forwardRef<HTMLDivElement, GlassStackProps>(
  ({ className, direction, align, justify, gap, wrap, divider, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    
    const content = divider
      ? childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childArray.length - 1 && divider}
          </React.Fragment>
        ))
      : children;

    return (
      <div
        ref={ref}
        className={cn(glassStackVariants({ direction, align, justify, gap, wrap }), className)}
        {...props}
      >
        {content}
      </div>
    );
  }
);

GlassStack.displayName = 'GlassStack';

// Convenience components
const HStack = React.forwardRef<HTMLDivElement, Omit<GlassStackProps, 'direction'>>(
  (props, ref) => <GlassStack ref={ref} direction="horizontal" {...props} />
);
HStack.displayName = 'HStack';

const VStack = React.forwardRef<HTMLDivElement, Omit<GlassStackProps, 'direction'>>(
  (props, ref) => <GlassStack ref={ref} direction="vertical" {...props} />
);
VStack.displayName = 'VStack';

export { GlassStack, HStack, VStack, glassStackVariants };
