'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassCollapsibleProps {
    /** Trigger element / button label */
    trigger: React.ReactNode;
    /** Collapsible content */
    children: React.ReactNode;
    /** Controlled open state */
    open?: boolean;
    /** Callback on open/close */
    onOpenChange?: (open: boolean) => void;
    /** Default open state (uncontrolled) */
    defaultOpen?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * GlassCollapsible — Single-panel show/hide component.
 *
 * Distinct from GlassAccordion (which is multi-panel).
 * Used for "show advanced options" toggles, inline expansion, etc.
 * Animates height smoothly to avoid layout shift.
 *
 * @example
 * ```tsx
 * <GlassCollapsible trigger="Advanced options">
 *   <AdvancedForm />
 * </GlassCollapsible>
 * ```
 */
export function GlassCollapsible({
    trigger,
    children,
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    className,
}: GlassCollapsibleProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = controlledOpen ?? internalOpen;
    const setIsOpen = onOpenChange ?? setInternalOpen;
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number>(0);

    React.useEffect(() => {
        if (contentRef.current) {
            const resizeObserver = new ResizeObserver(() => {
                setHeight(contentRef.current?.scrollHeight ?? 0);
            });
            resizeObserver.observe(contentRef.current);
            return () => resizeObserver.disconnect();
        }
    }, []);

    return (
        <div className={cn('w-full', className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex w-full items-center justify-between py-2 text-sm font-medium',
                    'text-[var(--glass-text,#0f172a)]',
                    'dark:text-[var(--glass-text,#f8fafc)]',
                    'hover:text-[var(--glass-accent,#3b82f6)]',
                    'transition-colors duration-200',
                    'cursor-pointer select-none',
                )}
                aria-expanded={isOpen}
            >
                {trigger}
                <svg
                    className={cn(
                        'h-4 w-4 shrink-0',
                        'text-[var(--glass-text-muted,#94a3b8)]',
                        'transition-transform duration-200',
                        isOpen && 'rotate-180',
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div
                className="overflow-hidden transition-[max-height] duration-[var(--duration-base,200ms)] ease-[var(--ease-smooth,cubic-bezier(0.4,0,0.2,1))]"
                style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
                aria-hidden={!isOpen}
            >
                <div ref={contentRef}>{children}</div>
            </div>
        </div>
    );
}
