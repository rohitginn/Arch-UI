'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { GlassToggle } from '../glass-toggle/glass-toggle';

export interface GlassToggleGroupItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}

export interface GlassToggleGroupProps {
    /** Items to render as toggles */
    items: GlassToggleGroupItem[];
    /** 'single' = radio behaviour, 'multiple' = checkbox behaviour */
    type?: 'single' | 'multiple';
    /** Controlled value (string for single, string[] for multiple) */
    value?: string | string[];
    /** Callback on value change */
    onValueChange?: (value: string | string[]) => void;
    /** Toggle button size */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes on the group wrapper */
    className?: string;
}

/**
 * GlassToggleGroup — Grouped set of toggle buttons.
 *
 * Supports single (radio) and multiple (checkbox) selection modes.
 * Used for filter bars, view mode selectors, and settings panels.
 *
 * @example
 * ```tsx
 * <GlassToggleGroup
 *   type="single"
 *   value={view}
 *   onValueChange={setView}
 *   items={[
 *     { value: 'grid', label: <Grid className="h-4 w-4" /> },
 *     { value: 'list', label: <List className="h-4 w-4" /> },
 *   ]}
 * />
 * ```
 */
export function GlassToggleGroup({
    items,
    type = 'single',
    value,
    onValueChange,
    size = 'md',
    className,
}: GlassToggleGroupProps) {
    const handleToggle = (itemValue: string) => {
        if (type === 'single') {
            onValueChange?.(itemValue);
        } else {
            const current = Array.isArray(value) ? value : [];
            const next = current.includes(itemValue)
                ? current.filter((v) => v !== itemValue)
                : [...current, itemValue];
            onValueChange?.(next);
        }
    };

    const isPressed = (itemValue: string): boolean => {
        if (type === 'single') return value === itemValue;
        return Array.isArray(value) && value.includes(itemValue);
    };

    return (
        <div
            className={cn(
                'inline-flex items-center gap-1 rounded-xl p-1',
                'bg-[var(--surface-bg-subtle,#f8fafc)]',
                'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.05))]',
                'border border-[var(--surface-border,#e2e8f0)]',
                'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                className,
            )}
            role="group"
        >
            {items.map((item) => (
                <GlassToggle
                    key={item.value}
                    pressed={isPressed(item.value)}
                    onPressedChange={() => handleToggle(item.value)}
                    size={size}
                    disabled={item.disabled}
                >
                    {item.label}
                </GlassToggle>
            ))}
        </div>
    );
}
