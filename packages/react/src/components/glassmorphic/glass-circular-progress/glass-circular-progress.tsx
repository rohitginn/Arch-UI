'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* -------------------------------------------------------------------------- */
/*  GlassCircularProgress                                                      */
/* -------------------------------------------------------------------------- */

export interface GlassCircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Progress value 0‑100. Pass `undefined` for indeterminate spinner. */
    value?: number;
    /** Diameter in px */
    size?: number;
    /** Stroke width in px */
    strokeWidth?: number;
    /** Show percentage text in the center */
    showValue?: boolean;
    /** Custom center label (overrides showValue) */
    label?: React.ReactNode;
    /** Color variant */
    color?: 'accent' | 'success' | 'warning' | 'error';
}

const COLOR_MAP: Record<string, { track: string; indicator: string }> = {
    accent: {
        track: 'stroke-[var(--accent-subtle,#dbeafe)] dark:stroke-[rgba(255,255,255,0.08)]',
        indicator: 'stroke-[var(--accent-primary,#3b82f6)]',
    },
    success: {
        track: 'stroke-emerald-100 dark:stroke-[rgba(255,255,255,0.08)]',
        indicator: 'stroke-[var(--glass-success,#22c55e)]',
    },
    warning: {
        track: 'stroke-amber-100 dark:stroke-[rgba(255,255,255,0.08)]',
        indicator: 'stroke-[var(--glass-warning,#f59e0b)]',
    },
    error: {
        track: 'stroke-red-100 dark:stroke-[rgba(255,255,255,0.08)]',
        indicator: 'stroke-[var(--glass-error,#ef4444)]',
    },
};

/**
 * GlassCircularProgress — Determinate / indeterminate circular indicator.
 *
 * @example
 * ```tsx
 * <GlassCircularProgress value={72} showValue />
 * <GlassCircularProgress />  // indeterminate spinner
 * ```
 */
export const GlassCircularProgress = React.forwardRef<HTMLDivElement, GlassCircularProgressProps>(
    (
        {
            value,
            size = 48,
            strokeWidth = 4,
            showValue = false,
            label,
            color = 'accent',
            className,
            ...rest
        },
        ref,
    ) => {
        const indeterminate = value === undefined;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const progress = indeterminate ? 0.25 : Math.min(Math.max(value ?? 0, 0), 100) / 100;
        const offset = circumference * (1 - progress);

        const colors = COLOR_MAP[color] ?? COLOR_MAP.accent;

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={indeterminate ? undefined : Math.round(progress * 100)}
                className={cn('relative inline-flex items-center justify-center', className)}
                style={{ width: size, height: size }}
                {...rest}
            >
                <svg
                    viewBox={`0 0 ${size} ${size}`}
                    className={cn(
                        indeterminate && 'animate-spin',
                        'transition-transform duration-300',
                    )}
                    style={{ width: size, height: size }}
                >
                    {/* Track */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        className={colors.track}
                    />
                    {/* Indicator */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        className={cn(colors.indicator, 'transition-all duration-500 ease-out')}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: offset,
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                        }}
                    />
                </svg>
                {/* Center content */}
                {(showValue || label) && !indeterminate && (
                    <span
                        className={cn(
                            'absolute text-xs font-semibold',
                            'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
                        )}
                    >
                        {label ?? `${Math.round(progress * 100)}%`}
                    </span>
                )}
            </div>
        );
    },
);

GlassCircularProgress.displayName = 'GlassCircularProgress';
