'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassShineBorderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    borderRadius?: number;
    borderWidth?: number;
    duration?: number;
    shineColor?: string | string[];
}

export function GlassShineBorder({
    children,
    className,
    borderRadius = 12,
    borderWidth = 1,
    duration = 8,
    shineColor = '#3b82f6', // blue-500
    ...props
}: GlassShineBorderProps) {
    return (
        <div
            className={cn(
                'relative min-h-[60px] w-full overflow-hidden rounded-[--border-radius] bg-white/60 p-[--border-width] dark:bg-black/40',
                'backdrop-blur-xl transition-all',
                className
            )}
            style={
                {
                    '--border-radius': `${borderRadius}px`,
                    '--border-width': `${borderWidth}px`,
                    '--duration': `${duration}s`,
                    '--shine-color': Array.isArray(shineColor) ? shineColor.join(',') : shineColor,
                } as React.CSSProperties
            }
            {...props}
        >
            <div
                className={cn(
                    'absolute inset-0 z-0 h-full w-full rounded-[--border-radius]',
                    'bg-[conic-gradient(transparent_20%,var(--shine-color)_100%)]',
                    'animate-shine'
                )}
                style={{
                    animation: 'shine var(--duration) linear infinite'
                }}
            />
            <div className="absolute inset-[--border-width] z-10 rounded-[calc(var(--border-radius)-var(--border-width))] bg-white/80 dark:bg-black/80" />
            <div className="relative z-20 h-full w-full">{children}</div>
        </div>
    );
}

// Add keyframes to global CSS or Tailwind config if not present, but for now we use inline style animation for portability
// Ideally the user should add this to tailwind.config.ts:
// keyframes: { shine: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }
