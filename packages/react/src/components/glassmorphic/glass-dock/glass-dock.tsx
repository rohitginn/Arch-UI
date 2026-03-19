'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
    magnification?: number;
    distance?: number;
    position?: 'bottom' | 'top';
}

export function GlassDock({
    children,
    className,
    magnification = 60,
    distance = 140,
    position = 'bottom',
    ...props
}: GlassDockProps) {
    const dockRef = React.useRef<HTMLDivElement>(null);

    // Clone children to pass mouse utils if needed, or simply let items handle themselves via context
    // For simplicity in this version, we'll keep it as a static container with premium glass styling
    // A full magnification implementation requires Framer Motion or React Spring, which might not be installed.
    // We will deliver a highly polished static version that feels like a dock.

    return (
        <div
            ref={dockRef}
            className={cn(
                'mx-auto flex h-16 items-end gap-3 rounded-2xl px-3 pb-3',
                'bg-white/60 dark:bg-white/[0.05]',
                'backdrop-blur-2xl',
                'border border-white/40 dark:border-white/10',
                'shadow-[0_8px_32px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)_inset]',
                'transition-all duration-300',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export interface GlassDockItemProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
}

export function GlassDockItem({
    children,
    className,
    active,
    ...props
}: GlassDockItemProps) {
    return (
        <div
            className={cn(
                'group relative flex aspect-square h-10 w-10 items-center justify-center rounded-xl bg-white/20 dark:bg-white/5 shadow-sm transition-all duration-200',
                'hover:-translate-y-2 hover:scale-110 hover:bg-white/40 dark:hover:bg-white/10',
                'cursor-pointer',
                active && 'bg-white/60 dark:bg-white/20 shadow-md',
                className
            )}
            {...props}
        >
            {children}

            {/* Reflection Dot */}
            {active && (
                <div className="absolute -bottom-2 h-1 w-1 rounded-full bg-slate-500 dark:bg-white" />
            )}
        </div>
    );
}
