'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassKbdProps extends React.HTMLAttributes<HTMLElement> {
    /** Key combination, e.g. "⌘K" or ["Ctrl", "Shift", "P"] */
    keys?: string | string[];
}

/**
 * GlassKbd — Keyboard shortcut display component.
 *
 * Renders keycap-styled elements with a subtle inset shadow
 * to mimic physical key depth. Used in tooltips, command
 * palettes, and documentation.
 *
 * @example
 * ```tsx
 * <GlassKbd keys={["⌘", "K"]} />
 * <GlassKbd keys="Esc" />
 * ```
 */
export const GlassKbd = React.forwardRef<HTMLElement, GlassKbdProps>(
    ({ className, keys, children, ...props }, ref) => {
        const renderKeys = () => {
            if (keys) {
                const keyArray = Array.isArray(keys) ? keys : [keys];
                return keyArray.map((key, i) => (
                    <React.Fragment key={i}>
                        {i > 0 && (
                            <span className="text-[var(--glass-text-muted,#94a3b8)] mx-0.5 text-[10px]">
                                +
                            </span>
                        )}
                        <kbd
                            className={cn(
                                'inline-flex h-5 min-w-[20px] items-center justify-center rounded px-1.5',
                                'text-[11px] font-medium font-mono leading-none',
                                // Light
                                'bg-[var(--surface-bg-subtle,#f8fafc)]',
                                'text-[var(--glass-text-secondary,#475569)]',
                                'border border-[var(--surface-border,#e2e8f0)]',
                                'shadow-[0_1px_0_1px_var(--surface-border,#e2e8f0)]',
                                // Dark
                                'dark:bg-[var(--surface-bg-hover,rgba(255,255,255,0.08))]',
                                'dark:text-[var(--glass-text-secondary,#94a3b8)]',
                                'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                                'dark:shadow-[0_1px_0_1px_rgba(0,0,0,0.4)]',
                            )}
                        >
                            {key}
                        </kbd>
                    </React.Fragment>
                ));
            }
            return (
                <kbd
                    className={cn(
                        'inline-flex h-5 min-w-[20px] items-center justify-center rounded px-1.5',
                        'text-[11px] font-medium font-mono leading-none',
                        'bg-[var(--surface-bg-subtle,#f8fafc)]',
                        'text-[var(--glass-text-secondary,#475569)]',
                        'border border-[var(--surface-border,#e2e8f0)]',
                        'shadow-[0_1px_0_1px_var(--surface-border,#e2e8f0)]',
                        'dark:bg-[var(--surface-bg-hover,rgba(255,255,255,0.08))]',
                        'dark:text-[var(--glass-text-secondary,#94a3b8)]',
                        'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                        'dark:shadow-[0_1px_0_1px_rgba(0,0,0,0.4)]',
                    )}
                >
                    {children}
                </kbd>
            );
        };

        return (
            <span
                ref={ref}
                className={cn('inline-flex items-center gap-0.5', className)}
                {...props}
            >
                {renderKeys()}
            </span>
        );
    }
);

GlassKbd.displayName = 'GlassKbd';
