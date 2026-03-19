'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Maximum height before scrolling */
    maxHeight?: string | number;
    /** Scrollbar orientation */
    orientation?: 'vertical' | 'horizontal' | 'both';
}

/**
 * GlassScrollArea — Custom scrollbar replacement.
 *
 * Renders a minimal, styled scrollbar that matches the glass aesthetic
 * (thin, rounded, fades when inactive). Prevents browser-native
 * scrollbar inconsistencies.
 *
 * @example
 * ```tsx
 * <GlassScrollArea maxHeight={300}>
 *   <LongContent />
 * </GlassScrollArea>
 * ```
 */
export const GlassScrollArea = React.forwardRef<HTMLDivElement, GlassScrollAreaProps>(
    (
        {
            className,
            maxHeight = '400px',
            orientation = 'vertical',
            children,
            style,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'relative',
                    // Custom scrollbar styling
                    '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
                    '[&::-webkit-scrollbar-track]:bg-transparent',
                    '[&::-webkit-scrollbar-track]:rounded-full',
                    '[&::-webkit-scrollbar-thumb]:rounded-full',
                    '[&::-webkit-scrollbar-thumb]:bg-[var(--surface-border,#e2e8f0)]',
                    'dark:[&::-webkit-scrollbar-thumb]:bg-[var(--surface-border,rgba(255,255,255,0.1))]',
                    '[&::-webkit-scrollbar-thumb]:hover:bg-[var(--surface-border-strong,#cbd5e1)]',
                    'dark:[&::-webkit-scrollbar-thumb]:hover:bg-[var(--surface-border-hover,rgba(255,255,255,0.2))]',
                    // Firefox scrollbar
                    'scrollbar-thin',
                    'scrollbar-color-[var(--surface-border)]_transparent',
                    // Overflow
                    orientation === 'vertical' && 'overflow-y-auto overflow-x-hidden',
                    orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
                    orientation === 'both' && 'overflow-auto',
                    className,
                )}
                style={{
                    maxHeight:
                        typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        );
    },
);

GlassScrollArea.displayName = 'GlassScrollArea';
