'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* -------------------------------------------------------------------------- */
/*  GlassList                                                                  */
/* -------------------------------------------------------------------------- */

export interface GlassListProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Visual variant */
    variant?: 'default' | 'bordered' | 'divided';
    /** Spacing between items */
    spacing?: 'sm' | 'md' | 'lg';
    /** Ordered list */
    ordered?: boolean;
}

export interface GlassListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Leading icon / avatar */
    leading?: React.ReactNode;
    /** Trailing action */
    trailing?: React.ReactNode;
    /** Secondary text line */
    secondary?: React.ReactNode;
    /** Clickable row */
    interactive?: boolean;
    /** Active / selected */
    active?: boolean;
    /** Disabled */
    disabled?: boolean;
}

const SPACING_MAP: Record<string, string> = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
};

/**
 * GlassList — Vertical list container.
 *
 * @example
 * ```tsx
 * <GlassList variant="divided">
 *   <GlassListItem leading={<UserIcon />} trailing={<ChevronRight />}>
 *     Profile
 *   </GlassListItem>
 * </GlassList>
 * ```
 */
export const GlassList = React.forwardRef<HTMLUListElement, GlassListProps>(
    ({ variant = 'default', spacing = 'md', ordered, className, children, ...rest }, ref) => {
        const Tag = ordered ? 'ol' : 'ul';
        return (
            <Tag
                ref={ref as any}
                role="list"
                className={cn(
                    'flex flex-col',
                    SPACING_MAP[spacing],
                    variant === 'bordered' && [
                        'rounded-xl border p-1',
                        'border-[var(--surface-border,#e2e8f0)]',
                        'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                        'bg-[var(--surface-bg,#ffffff)]',
                        'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.03))]',
                    ],
                    variant === 'divided' && 'divide-y divide-[var(--surface-border,#e2e8f0)] dark:divide-[var(--surface-border,rgba(255,255,255,0.08))]',
                    className,
                )}
                {...rest}
            >
                {children}
            </Tag>
        );
    },
);
GlassList.displayName = 'GlassList';

/**
 * GlassListItem — Individual row inside GlassList.
 */
export const GlassListItem = React.forwardRef<HTMLLIElement, GlassListItemProps>(
    ({ leading, trailing, secondary, interactive, active, disabled, className, children, ...rest }, ref) => {
        return (
            <li
                ref={ref}
                role={interactive ? 'button' : 'listitem'}
                tabIndex={interactive && !disabled ? 0 : undefined}
                aria-selected={active || undefined}
                aria-disabled={disabled || undefined}
                className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200',
                    'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
                    interactive && !disabled && [
                        'cursor-pointer',
                        'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
                        'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
                    ],
                    active && [
                        'bg-[var(--accent-subtle,#dbeafe)]',
                        'dark:bg-[var(--accent-subtle,rgba(59,130,246,0.15))]',
                        'text-[var(--accent-primary,#3b82f6)]',
                    ],
                    disabled && 'opacity-50 pointer-events-none',
                    className,
                )}
                {...rest}
            >
                {leading && <span className="flex-shrink-0">{leading}</span>}
                <span className="flex-1 min-w-0">
                    <span className="block truncate text-sm">{children}</span>
                    {secondary && (
                        <span className="block truncate text-xs text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]">
                            {secondary}
                        </span>
                    )}
                </span>
                {trailing && <span className="flex-shrink-0 text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]">{trailing}</span>}
            </li>
        );
    },
);
GlassListItem.displayName = 'GlassListItem';
