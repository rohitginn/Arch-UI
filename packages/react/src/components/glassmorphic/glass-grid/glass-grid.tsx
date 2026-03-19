'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassGridVariants = cva(
  [
    'grid',
    'transition-all duration-200',
  ],
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        12: 'grid-cols-12',
        auto: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
        none: '',
      },
      rows: {
        1: 'grid-rows-1',
        2: 'grid-rows-2',
        3: 'grid-rows-3',
        4: 'grid-rows-4',
        5: 'grid-rows-5',
        6: 'grid-rows-6',
        auto: 'auto-rows-auto',
        none: '',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch',
      },
      flow: {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        dense: 'grid-flow-dense',
        rowDense: 'grid-flow-row-dense',
        colDense: 'grid-flow-col-dense',
      },
    },
    defaultVariants: {
      cols: 'auto',
      rows: 'none',
      gap: 'md',
      align: 'stretch',
      justify: 'stretch',
      flow: 'row',
    },
  }
);

export interface GlassGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassGridVariants> {
}

const GlassGrid = React.forwardRef<HTMLDivElement, GlassGridProps>(
  ({ className, cols, rows, gap, align, justify, flow, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassGridVariants({ cols, rows, gap, align, justify, flow }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassGrid.displayName = 'GlassGrid';

// Grid Item component for spanning
const glassGridItemVariants = cva(
  '',
  {
    variants: {
      colSpan: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
        full: 'col-span-full',
        auto: 'col-auto',
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
        full: 'row-span-full',
        auto: 'row-auto',
      },
      colStart: {
        1: 'col-start-1',
        2: 'col-start-2',
        3: 'col-start-3',
        4: 'col-start-4',
        5: 'col-start-5',
        6: 'col-start-6',
        7: 'col-start-7',
        8: 'col-start-8',
        9: 'col-start-9',
        10: 'col-start-10',
        11: 'col-start-11',
        12: 'col-start-12',
        auto: 'col-start-auto',
      },
      rowStart: {
        1: 'row-start-1',
        2: 'row-start-2',
        3: 'row-start-3',
        4: 'row-start-4',
        5: 'row-start-5',
        6: 'row-start-6',
        auto: 'row-start-auto',
      },
    },
    defaultVariants: {
      colSpan: 'auto',
      rowSpan: 'auto',
      colStart: 'auto',
      rowStart: 'auto',
    },
  }
);

export interface GlassGridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassGridItemVariants> {}

const GlassGridItem = React.forwardRef<HTMLDivElement, GlassGridItemProps>(
  ({ className, colSpan, rowSpan, colStart, rowStart, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassGridItemVariants({ colSpan, rowSpan, colStart, rowStart }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassGridItem.displayName = 'GlassGridItem';

export { GlassGrid, GlassGridItem, glassGridVariants, glassGridItemVariants };
