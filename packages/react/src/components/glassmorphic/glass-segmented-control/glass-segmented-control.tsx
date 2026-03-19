'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { motion } from 'motion/react';
import {
    glassText,
    glassHighlight,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export interface SegmentItem {
    value: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export interface GlassSegmentedControlProps {
    /** Segment items */
    items: SegmentItem[];
    /** Controlled value */
    value?: string;
    /** Default value (uncontrolled) */
    defaultValue?: string;
    /** Called when value changes */
    onValueChange?: (value: string) => void;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Visual variant */
    variant?: 'default' | 'solid';
    /** Full width */
    fullWidth?: boolean;
    /** Additional CSS classes */
    className?: string;
}

const sizeStyles = {
    sm: 'h-8 text-xs px-3',
    md: 'h-9 text-sm px-4',
    lg: 'h-10 text-sm px-5',
};

/**
 * GlassSegmentedControl — Pill-shaped toggle group with sliding indicator
 */
const GlassSegmentedControl = React.forwardRef<HTMLDivElement, GlassSegmentedControlProps>(
    (
        {
            items,
            value: controlledValue,
            defaultValue,
            onValueChange,
            size = 'md',
            variant: _variant = 'default',
            fullWidth = false,
            className,
        },
        ref,
    ) => {
        const [internalValue, setInternalValue] = React.useState(defaultValue || items[0]?.value);
        const activeValue = controlledValue ?? internalValue;
        const id = React.useId();

        const handleSelect = (val: string) => {
            if (controlledValue === undefined) setInternalValue(val);
            onValueChange?.(val);
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'relative inline-flex p-1 rounded-xl',
                    'bg-[var(--glass-surface-hover)]/60',
                    'border border-[var(--glass-edge)]',
                    fullWidth && 'w-full',
                    className,
                )}
            >
                <div className={cn('relative flex', fullWidth && 'w-full')}>
                    {items.map((item) => {
                        const isActive = activeValue === item.value;
                        return (
                            <button
                                key={item.value}
                                type="button"
                                data-value={item.value}
                                disabled={item.disabled}
                                className={cn(
                                    'relative inline-flex items-center justify-center gap-1.5 rounded-lg font-medium',
                                    'outline-none',
                                    sizeStyles[size],
                                    fullWidth && 'flex-1',
                                    isActive
                                        ? glassText.primary
                                        : [glassText.muted, 'hover:text-[var(--glass-text-secondary)]'].join(' '),
                                    item.disabled && 'opacity-40 pointer-events-none',
                                    'active:scale-[0.97] active:duration-75',
                                )}
                                onClick={() => handleSelect(item.value)}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId={`${id}-segmented-indicator`}
                                        className={cn(
                                            'absolute inset-0 rounded-lg pointer-events-none z-0',
                                            'bg-[var(--glass-surface-elevated)]',
                                            'shadow-[var(--glass-depth-sm)]',
                                            glassHighlight,
                                        )}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center justify-center gap-1.5 w-full h-full">
                                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                                    <span>{item.label}</span>
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    },
);

GlassSegmentedControl.displayName = 'GlassSegmentedControl';

export { GlassSegmentedControl };
