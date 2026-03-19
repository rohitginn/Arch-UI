'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

/**
 * GlassTable Primitives
 * Built with CSS Grid to support complex glass layering and backdrop filters.
 */

const tableVariants = cva(
    'w-full text-left border-collapse grid isolation-isolate',
    {
        variants: {
            variant: {
                default: 'text-text-primary',
                subtle: 'text-text-secondary text-sm',
            },
            compact: {
                true: 'gap-y-0.5',
                false: 'gap-y-1',
            },
        },
        defaultVariants: {
            variant: 'default',
            compact: false,
        },
    }
);

interface GlassTableProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tableVariants> {
    children: React.ReactNode;
}

const GlassTable = React.forwardRef<HTMLDivElement, GlassTableProps>(
    ({ className, variant, compact, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="table"
                className={cn(tableVariants({ variant, compact }), className)}
                style={{ gridTemplateColumns: '1fr' }} // This will be overridden by row templates
                {...props}
            >
                {children}
            </div>
        );
    }
);
GlassTable.displayName = 'GlassTable';

const GlassTableHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="rowgroup"
                className={cn(
                    'sticky top-0 z-20 backdrop-blur-md bg-surface-primary/50 border-b border-surface-border',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
GlassTableHeader.displayName = 'GlassTableHeader';

const GlassTableBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} role="rowgroup" className={cn('relative divide-y divide-surface-border/50', className)} {...props}>
                {children}
            </div>
        );
    }
);
GlassTableBody.displayName = 'GlassTableBody';

const GlassTableRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="row"
                className={cn(
                    'contents group', // Use grid contents to allow table-row behavior
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
GlassTableRow.displayName = 'GlassTableRow';

const GlassTableCell = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="cell"
                className={cn(
                    'px-4 py-3 align-middle transition-colors group-hover:bg-surface-primary/10',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
GlassTableCell.displayName = 'GlassTableCell';

const GlassTableHeadCell = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="columnheader"
                className={cn(
                    'px-4 py-3 align-middle font-semibold text-text-primary/70 tracking-tightest',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
GlassTableHeadCell.displayName = 'GlassTableHeadCell';

export {
    GlassTable,
    GlassTableHeader,
    GlassTableBody,
    GlassTableRow,
    GlassTableCell,
    GlassTableHeadCell,
};
