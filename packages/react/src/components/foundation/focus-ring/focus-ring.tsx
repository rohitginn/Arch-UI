'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface FocusRingProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement;
    /** Custom ring color CSS variable or Tailwind class */
    ringColor?: string;
    /** Ring offset in Tailwind units (default: 2) */
    offset?: 2 | 1 | 0;
    /** Disable the focus ring entirely */
    disabled?: boolean;
}

/**
 * FocusRing — Consistent WCAG 2.1 AA focus indicator.
 *
 * Wraps any interactive element to provide a uniform
 * `ring-2 ring-offset-2` halo on `focus-visible`.
 *
 * @example
 * ```tsx
 * <FocusRing>
 *   <button>Click me</button>
 * </FocusRing>
 * ```
 */
export function FocusRing({
    children,
    ringColor,
    offset = 2,
    disabled = false,
}: FocusRingProps) {
    if (disabled) return children;

    const child = React.Children.only(children);

    return React.cloneElement(child, {
        className: cn(
            child.props.className,
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            offset === 2 && 'focus-visible:ring-offset-2',
            offset === 1 && 'focus-visible:ring-offset-1',
            offset === 0 && 'focus-visible:ring-offset-0',
            ringColor ?? 'focus-visible:ring-[var(--glass-accent,#3b82f6)]',
            'focus-visible:ring-offset-[var(--surface-bg,#ffffff)]',
            'dark:focus-visible:ring-offset-[var(--ring-offset,#0f172a)]',
        ),
    } as React.HTMLAttributes<HTMLElement>);
}
