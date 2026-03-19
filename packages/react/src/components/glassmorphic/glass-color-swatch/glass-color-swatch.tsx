'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassColorSwatchProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** CSS color string */
    color: string;
    /** Label for the swatch */
    label?: string;
    /** Whether to show the label text */
    showLabel?: boolean;
    /** Whether this swatch is selected */
    selected?: boolean;
    /** Visual size */
    size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
};

/**
 * GlassColorSwatch — A clickable color swatch that copies the color value.
 *
 * @example
 * ```tsx
 * <GlassColorSwatch color="#f59e0b" label="Amber" showLabel selected />
 * ```
 */
export const GlassColorSwatch = React.forwardRef<
    HTMLButtonElement,
    GlassColorSwatchProps
>(
    (
        {
            color,
            label,
            showLabel = false,
            selected,
            size = 'md',
            className,
            onClick,
            ...props
        },
        ref,
    ) => {
        const [copied, setCopied] = React.useState(false);

        const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
            await navigator.clipboard.writeText(color);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
            onClick?.(e);
        };

        return (
            <div className={cn('inline-flex flex-col items-center gap-1', className)}>
                <button
                    ref={ref}
                    onClick={handleClick}
                    type="button"
                    className={cn(
                        'relative rounded-lg border-2 transition-all duration-200',
                        sizeMap[size],
                        selected
                            ? 'border-[var(--accent-primary,#f59e0b)] ring-2 ring-[var(--accent-subtle,rgba(245,158,11,0.10))]'
                            : 'border-[var(--surface-border,#e2e8f0)] dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                        'hover:scale-110 active:scale-95',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent,#3b82f6)]',
                        'cursor-pointer',
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${label || color}. Click to copy.`}
                    title={copied ? 'Copied!' : `Copy ${color}`}
                    {...props}
                >
                    {(selected || copied) && (
                        <svg
                            className="absolute inset-0 m-auto h-3.5 w-3.5 text-white drop-shadow-md"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </button>
                {showLabel && (
                    <span className="text-[10px] font-mono text-[var(--glass-text-muted,#94a3b8)]">
                        {label || color}
                    </span>
                )}
            </div>
        );
    },
);

GlassColorSwatch.displayName = 'GlassColorSwatch';
