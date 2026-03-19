'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import {
    glassText,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export interface GlassEmptyStateProps {
    /** Icon or illustration */
    icon?: React.ReactNode;
    /** Title text */
    title?: string;
    /** Description text */
    description?: string;
    /** Action button or content */
    action?: React.ReactNode;
    /** Visual variant */
    variant?: 'default' | 'bordered';
    /** Additional CSS classes */
    className?: string;
    /** Children for fully custom content */
    children?: React.ReactNode;
}

/* ─── Default Icon ──────────────────────────────────────── */

const DefaultIcon = () => (
    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
);

/**
 * GlassEmptyState — Frosted empty state container
 */
const GlassEmptyState = React.forwardRef<HTMLDivElement, GlassEmptyStateProps>(
    ({ icon, title = 'Nothing here yet', description, action, variant = 'default', className, children }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex flex-col items-center justify-center py-16 px-8',
                'rounded-2xl text-center',
                variant === 'bordered'
                    ? 'bg-[var(--glass-bordered-bg)] border border-dashed border-[var(--glass-bordered-border)]'
                    : 'bg-[var(--glass-surface-hover)]/40 border border-dashed border-[var(--glass-edge)]',
                className,
            )}
        >
            {children || (
                <>
                    <div
                        className={cn(
                            'mb-5',
                            glassText.placeholder,
                            'animate-[float_4s_ease-in-out_infinite]',
                        )}
                        style={{
                            // @ts-expect-error CSS custom properties
                            '--float-distance': '6px',
                        }}
                    >
                        {icon || <DefaultIcon />}
                    </div>

                    <h3 className={cn('text-base font-medium mb-1.5', glassText.secondary)}>
                        {title}
                    </h3>

                    {description && (
                        <p className={cn('text-sm max-w-xs leading-relaxed', glassText.muted)}>
                            {description}
                        </p>
                    )}

                    {action && <div className="mt-5">{action}</div>}
                </>
            )}
        </div>
    ),
);

GlassEmptyState.displayName = 'GlassEmptyState';

export { GlassEmptyState };
