'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassContainerVariants = cva(
  [
    'w-full mx-auto',
    'px-4 sm:px-6 lg:px-8',
    'transition-all duration-300',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm', // 640px
        md: 'max-w-screen-md', // 768px
        lg: 'max-w-screen-lg', // 1024px
        xl: 'max-w-screen-xl', // 1280px
        '2xl': 'max-w-screen-2xl', // 1536px
        full: 'max-w-full',
        prose: 'max-w-prose', // 65ch - ideal for reading
      },
      padding: {
        none: 'px-0',
        sm: 'px-2 sm:px-4',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12',
        xl: 'px-8 sm:px-12 lg:px-16',
      },
      center: {
        true: 'mx-auto',
        false: '',
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: 'md',
      center: true,
    },
  }
);

export interface GlassContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassContainerVariants> {
  as?: 'div' | 'section' | 'main' | 'article';
}

const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ className, size, padding, center, as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(glassContainerVariants({ size, padding, center }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';

export { GlassContainer, glassContainerVariants };
