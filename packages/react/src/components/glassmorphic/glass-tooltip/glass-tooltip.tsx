'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import {
    type GlassVariant,
    glassVariant,
    glassText,
    glassHighlight,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface GlassTooltipProps {
    /** Tooltip content */
    content: React.ReactNode;
    /** Placement relative to trigger */
    placement?: TooltipPlacement;
    /** Delay before showing (ms) */
    delay?: number;
    /** Delay before hiding (ms) */
    hideDelay?: number;
    /** Visual variant */
    variant?: GlassVariant;
    /** Additional CSS classes for tooltip */
    className?: string;
    /** Trigger element */
    children: React.ReactElement;
    /** Disable tooltip */
    disabled?: boolean;
}

/* ─── Placement Utilities ───────────────────────────────── */

const placementStyles: Record<TooltipPlacement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const enterAnimations: Record<TooltipPlacement, string> = {
    top: 'animate-in fade-in slide-in-from-bottom-1 zoom-in-95',
    bottom: 'animate-in fade-in slide-in-from-top-1 zoom-in-95',
    left: 'animate-in fade-in slide-in-from-right-1 zoom-in-95',
    right: 'animate-in fade-in slide-in-from-left-1 zoom-in-95',
};

const arrowSurfaceByVariant: Record<GlassVariant, Record<TooltipPlacement, string>> = {
    default: {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--glass-surface)] border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--glass-surface)] border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--glass-surface)] border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--glass-surface)] border-t-transparent border-b-transparent border-l-transparent',
    },
    solid: {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--glass-solid-bg)] border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--glass-solid-bg)] border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--glass-solid-bg)] border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--glass-solid-bg)] border-t-transparent border-b-transparent border-l-transparent',
    },
    bordered: {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--glass-bordered-bg)] border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--glass-bordered-bg)] border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--glass-bordered-bg)] border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--glass-bordered-bg)] border-t-transparent border-b-transparent border-l-transparent',
    },
};

/* ─── Main Component ────────────────────────────────────── */

const GlassTooltip: React.FC<GlassTooltipProps> = ({
    content,
    placement = 'top',
    delay = 200,
    hideDelay = 0,
    variant = 'default',
    className,
    children,
    disabled = false,
}) => {
    const [visible, setVisible] = React.useState(false);
    const showTimerRef = React.useRef<ReturnType<typeof setTimeout>>();
    const hideTimerRef = React.useRef<ReturnType<typeof setTimeout>>();

    const v = glassVariant[variant];

    const show = React.useCallback(() => {
        if (disabled) return;
        clearTimeout(hideTimerRef.current);
        showTimerRef.current = setTimeout(() => setVisible(true), delay);
    }, [delay, disabled]);

    const hide = React.useCallback(() => {
        clearTimeout(showTimerRef.current);
        hideTimerRef.current = setTimeout(() => setVisible(false), hideDelay);
    }, [hideDelay]);

    React.useEffect(() => {
        return () => {
            clearTimeout(showTimerRef.current);
            clearTimeout(hideTimerRef.current);
        };
    }, []);

    return (
        <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
            {children}
            {visible && (
                <div
                    className={cn(
                        'absolute z-50 pointer-events-none',
                        placementStyles[placement],
                        enterAnimations[placement],
                        'duration-150',
                    )}
                    style={{ animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    role="tooltip"
                >
                    <div
                        className={cn(
                            'relative px-3 py-1.5 rounded-lg',
                            'text-xs font-medium whitespace-nowrap',
                            v.surface, v.border, glassHighlight,
                            glassText.primary,
                            className,
                        )}
                    >
                        {content}
                        <span className={cn('absolute w-0 h-0 border-[5px]', arrowSurfaceByVariant[variant][placement])} />
                    </div>
                </div>
            )}
        </div>
    );
};

GlassTooltip.displayName = 'GlassTooltip';

export { GlassTooltip };
