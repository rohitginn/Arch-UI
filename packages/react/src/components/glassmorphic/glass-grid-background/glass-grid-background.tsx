'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassGridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'grid' | 'dot';
    size?: number;
    color?: string;
}

export function GlassGridBackground({
    children,
    className,
    variant = 'grid',
    size = 16,
    color,
    ...props
}: GlassGridBackgroundProps) {
    const bgClass =
        variant === 'dot'
            ? 'bg-[radial-gradient(var(--bg-pattern)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,var(--bg-pattern)_1px,transparent_1px),linear-gradient(to_bottom,var(--bg-pattern)_1px,transparent_1px)]';

    const defaultColor = 'rgba(0,0,0,0.05)';


    return (
        <div
            className={cn(
                'relative flex h-full w-full items-center justify-center bg-white dark:bg-black overflow-hidden',
                className
            )}
            style={{
                '--bg-pattern': color || defaultColor,
                backgroundSize: `${size}px ${size}px`,
            } as React.CSSProperties}
            {...props}
        >
            <div
                className={cn('absolute inset-0 h-full w-full', bgClass)}
                style={{
                    '--bg-pattern': color ? color : 'currentColor',
                    opacity: color ? 1 : 0.4
                } as React.CSSProperties}
            >
                <div className="absolute inset-0 dark:hidden" style={{ color: color || '#e5e7eb' }} />
                <div className="absolute inset-0 hidden dark:block" style={{ color: color || '#1f2937' }} />
            </div>

            {/* Radial fade for depth */}
            <div className="pointer-events-none absolute inset-0 bg-white/50 dark:bg-black/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <div className="relative z-10">{children}</div>
        </div>
    );
}
