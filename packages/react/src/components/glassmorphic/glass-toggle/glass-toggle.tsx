'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassToggleProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    /** Controlled pressed state */
    pressed?: boolean;
    /** Callback when pressed state changes */
    onPressedChange?: (pressed: boolean) => void;
    /** Button size */
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'h-8 px-2.5 text-xs rounded-lg gap-1.5',
    md: 'h-9 px-3 text-sm rounded-lg gap-2',
    lg: 'h-10 px-4 text-sm rounded-xl gap-2',
};

/**
 * GlassToggle — A single on/off toggle button.
 *
 * Distinct from GlassSwitch (which is form-oriented).
 * Used for toolbar actions like bold/italic or grid/list view.
 *
 * @example
 * ```tsx
 * const [bold, setBold] = useState(false);
 * <GlassToggle pressed={bold} onPressedChange={setBold}>
 *   <Bold className="h-4 w-4" />
 * </GlassToggle>
 * ```
 */
export const GlassToggle = React.forwardRef<HTMLButtonElement, GlassToggleProps>(
    ({ className, pressed = false, onPressedChange, size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                role="switch"
                aria-pressed={pressed}
                data-state={pressed ? 'on' : 'off'}
                onClick={() => onPressedChange?.(!pressed)}
                className={cn(
                    'inline-flex items-center justify-center font-medium',
                    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    'select-none cursor-pointer',
                    // Focus ring
                    'focus-visible:outline-none',
                    'focus-visible:ring-2',
                    'focus-visible:ring-offset-2',
                    'focus-visible:ring-[var(--glass-accent,#3b82f6)]',
                    'focus-visible:ring-offset-[var(--surface-bg,#ffffff)]',
                    'dark:focus-visible:ring-offset-[var(--ring-offset,#0f172a)]',
                    // Active press
                    'active:scale-[0.97] active:transition-transform active:duration-75',
                    // Disabled
                    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
                    sizeClasses[size],
                    // Unpressed
                    !pressed && [
                        'bg-transparent',
                        'text-[var(--glass-text-secondary,#475569)]',
                        'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
                        'hover:text-[var(--glass-text,#0f172a)]',
                        'dark:text-[var(--glass-text-secondary,#94a3b8)]',
                        'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.08))]',
                        'dark:hover:text-[var(--glass-text,#f8fafc)]',
                    ],
                    // Pressed
                    pressed && [
                        'bg-[var(--surface-bg-hover,#f1f5f9)]',
                        'text-[var(--glass-text,#0f172a)]',
                        'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.05))]',
                        'dark:text-[var(--glass-text,#f8fafc)]',
                        'border border-[var(--surface-border,#e2e8f0)]',
                        'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                        'shadow-sm',
                    ],
                    className,
                )}
                {...props}
            >
                {children}
            </button>
        );
    },
);

GlassToggle.displayName = 'GlassToggle';
