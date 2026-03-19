'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* -------------------------------------------------------------------------- */
/*  GlassPopover                                                               */
/* -------------------------------------------------------------------------- */

export interface GlassPopoverProps {
    /** The trigger element */
    children: React.ReactElement;
    /** Popover content */
    content: React.ReactNode;
    /** Placement relative to trigger */
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    /** Controlled open state */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Trigger mode */
    trigger?: 'click' | 'hover';
    /** Show arrow */
    arrow?: boolean;
    /** Offset from trigger in px */
    offset?: number;
    /** Additional class for popover panel */
    className?: string;
}

/**
 * GlassPopover — Floating content panel anchored to a trigger.
 *
 * Supports click/hover trigger, 8 placement positions, outside-click
 * and Escape dismissal. No external dependencies (pure CSS/JS positioning).
 *
 * @example
 * ```tsx
 * <GlassPopover content={<div>Details here</div>} placement="bottom-start">
 *   <button>Show info</button>
 * </GlassPopover>
 * ```
 */
export function GlassPopover({
    children,
    content,
    placement = 'bottom',
    open: controlledOpen,
    onOpenChange,
    trigger = 'click',
    arrow = false,
    offset: offsetPx = 8,
    className,
}: GlassPopoverProps) {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const triggerRef = React.useRef<HTMLElement>(null);
    const popoverRef = React.useRef<HTMLDivElement>(null);
    const hoverTimeout = React.useRef<ReturnType<typeof setTimeout>>();

    const setOpen = React.useCallback(
        (next: boolean) => {
            if (!isControlled) setInternalOpen(next);
            onOpenChange?.(next);
        },
        [isControlled, onOpenChange],
    );

    // Position state
    const [pos, setPos] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const recalculate = React.useCallback(() => {
        const t = triggerRef.current;
        const p = popoverRef.current;
        if (!t || !p) return;

        const tr = t.getBoundingClientRect();
        const pr = p.getBoundingClientRect();

        let top = 0;
        let left = 0;

        const base = placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';
        const align = placement.split('-')[1] as 'start' | 'end' | undefined;

        switch (base) {
            case 'top':
                top = tr.top - pr.height - offsetPx + window.scrollY;
                left = tr.left + (tr.width - pr.width) / 2 + window.scrollX;
                break;
            case 'bottom':
                top = tr.bottom + offsetPx + window.scrollY;
                left = tr.left + (tr.width - pr.width) / 2 + window.scrollX;
                break;
            case 'left':
                top = tr.top + (tr.height - pr.height) / 2 + window.scrollY;
                left = tr.left - pr.width - offsetPx + window.scrollX;
                break;
            case 'right':
                top = tr.top + (tr.height - pr.height) / 2 + window.scrollY;
                left = tr.right + offsetPx + window.scrollX;
                break;
        }

        if (align === 'start' && (base === 'top' || base === 'bottom')) {
            left = tr.left + window.scrollX;
        } else if (align === 'end' && (base === 'top' || base === 'bottom')) {
            left = tr.right - pr.width + window.scrollX;
        }

        setPos({ top, left });
    }, [placement, offsetPx]);

    // Reposition when open
    React.useEffect(() => {
        if (!isOpen) return;
        // Delay one frame so popover is mounted and measurable
        requestAnimationFrame(recalculate);
        window.addEventListener('scroll', recalculate, true);
        window.addEventListener('resize', recalculate);
        return () => {
            window.removeEventListener('scroll', recalculate, true);
            window.removeEventListener('resize', recalculate);
        };
    }, [isOpen, recalculate]);

    // Outside click
    React.useEffect(() => {
        if (!isOpen) return;
        const handler = (e: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isOpen, setOpen]);

    // Escape key
    React.useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, setOpen]);

    // Trigger clone
    const triggerElement = React.cloneElement(children, {
        ref: triggerRef,
        ...(trigger === 'click' && {
            onClick: (e: React.MouseEvent) => {
                (children.props as any)?.onClick?.(e);
                setOpen(!isOpen);
            },
        }),
        ...(trigger === 'hover' && {
            onMouseEnter: () => {
                clearTimeout(hoverTimeout.current);
                setOpen(true);
            },
            onMouseLeave: () => {
                hoverTimeout.current = setTimeout(() => setOpen(false), 150);
            },
        }),
    });

    // Arrow rotation
    const arrowSide = React.useMemo(() => {
        const base = placement.split('-')[0];
        switch (base) {
            case 'top':
                return 'bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45';
            case 'bottom':
                return 'top-[-4px] left-1/2 -translate-x-1/2 rotate-45';
            case 'left':
                return 'right-[-4px] top-1/2 -translate-y-1/2 rotate-45';
            case 'right':
                return 'left-[-4px] top-1/2 -translate-y-1/2 rotate-45';
            default:
                return '';
        }
    }, [placement]);

    return (
        <>
            {triggerElement}
            {isOpen && (
                <div
                    ref={popoverRef}
                    role="dialog"
                    className={cn(
                        'fixed z-50 rounded-xl p-4 min-w-[180px]',
                        // Light
                        'bg-[var(--surface-bg,#ffffff)]',
                        'border border-[var(--surface-border,#e2e8f0)]',
                        'shadow-lg',
                        // Dark
                        'dark:bg-[var(--surface-bg-hover,rgba(30,30,30,0.95))]',
                        'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                        'dark:backdrop-blur-xl',
                        'dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
                        // Animation
                        'animate-in fade-in-0 zoom-in-95 duration-150',
                        className,
                    )}
                    style={{ top: pos.top, left: pos.left }}
                    {...(trigger === 'hover' && {
                        onMouseEnter: () => clearTimeout(hoverTimeout.current),
                        onMouseLeave: () => {
                            hoverTimeout.current = setTimeout(() => setOpen(false), 150);
                        },
                    })}
                >
                    {arrow && (
                        <span
                            className={cn(
                                'absolute h-2 w-2',
                                'bg-[var(--surface-bg,#ffffff)] dark:bg-[var(--surface-bg-hover,rgba(30,30,30,0.95))]',
                                'border border-[var(--surface-border,#e2e8f0)] dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                                arrowSide,
                            )}
                        />
                    )}
                    {content}
                </div>
            )}
        </>
    );
}
