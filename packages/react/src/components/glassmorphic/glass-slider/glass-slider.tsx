'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassSliderProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange' | 'type' | 'size'
    > {
    /** Current value */
    value?: number;
    /** Default value (uncontrolled) */
    defaultValue?: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step size */
    step?: number;
    /** Callback on value change */
    onChange?: (value: number) => void;
    /** Show value tooltip on thumb drag */
    showTooltip?: boolean;
    /** Visual size */
    size?: 'sm' | 'md' | 'lg';
    /** Label text */
    label?: string;
}

const trackHeight = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' };

/**
 * GlassSlider — Range input with glass-styled track and thumb.
 *
 * Supports single value selection with real-time fill track and optional
 * tooltip on thumb drag.
 *
 * @example
 * ```tsx
 * <GlassSlider label="Volume" value={volume} onChange={setVolume} />
 * ```
 */
export function GlassSlider({
    value: controlledValue,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    showTooltip = false,
    size = 'md',
    label,
    className,
    disabled,
    ...props
}: GlassSliderProps) {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [isDragging, setIsDragging] = React.useState(false);
    const value = controlledValue ?? internalValue;
    const percentage = ((value - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    return (
        <div className={cn('w-full', className)}>
            {label && (
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]">
                        {label}
                    </label>
                    <span className="text-sm text-[var(--glass-text-muted,#94a3b8)] tabular-nums">
                        {value}
                    </span>
                </div>
            )}
            <div className="relative flex items-center">
                {/* Track background */}
                <div
                    className={cn(
                        'absolute w-full rounded-full',
                        trackHeight[size],
                        'bg-[var(--surface-bg-hover,#f1f5f9)]',
                        'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.05))]',
                        'border border-[var(--surface-border,#e2e8f0)]',
                        'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                    )}
                />
                {/* Fill track */}
                <div
                    className={cn(
                        'absolute rounded-full pointer-events-none',
                        trackHeight[size],
                        'bg-[var(--accent-primary,#f59e0b)]',
                        'transition-[width] duration-75',
                    )}
                    style={{ width: `${percentage}%` }}
                />
                {/* Native input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    disabled={disabled}
                    className={cn(
                        'relative z-10 w-full appearance-none bg-transparent cursor-pointer',
                        // Webkit thumb
                        '[&::-webkit-slider-thumb]:appearance-none',
                        '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
                        '[&::-webkit-slider-thumb]:rounded-full',
                        '[&::-webkit-slider-thumb]:bg-white',
                        '[&::-webkit-slider-thumb]:border-2',
                        '[&::-webkit-slider-thumb]:border-[var(--accent-primary,#f59e0b)]',
                        '[&::-webkit-slider-thumb]:shadow-md',
                        '[&::-webkit-slider-thumb]:transition-transform',
                        '[&::-webkit-slider-thumb]:duration-[var(--duration-fast,120ms)]',
                        '[&::-webkit-slider-thumb]:hover:scale-110',
                        '[&::-webkit-slider-thumb]:active:scale-95',
                        // Dark thumb
                        'dark:[&::-webkit-slider-thumb]:bg-[var(--surface-bg-hover,rgba(255,255,255,0.08))]',
                        // Firefox thumb
                        '[&::-moz-range-thumb]:appearance-none',
                        '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
                        '[&::-moz-range-thumb]:rounded-full',
                        '[&::-moz-range-thumb]:bg-white',
                        '[&::-moz-range-thumb]:border-2',
                        '[&::-moz-range-thumb]:border-[var(--accent-primary,#f59e0b)]',
                        '[&::-moz-range-thumb]:shadow-md',
                        // Disabled
                        disabled && 'opacity-40 cursor-not-allowed',
                    )}
                    aria-label={label}
                    {...props}
                />
                {/* Tooltip */}
                {showTooltip && isDragging && (
                    <div
                        className={cn(
                            'absolute -top-9 px-2 py-1 rounded-md text-xs font-semibold',
                            'bg-[var(--surface-bg,#ffffff)]',
                            'text-[var(--glass-text,#0f172a)]',
                            'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.05))]',
                            'dark:text-[var(--glass-text,#f8fafc)]',
                            'dark:backdrop-blur-xl',
                            'border border-[var(--surface-border,#e2e8f0)]',
                            'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                            'shadow-lg',
                            'pointer-events-none tabular-nums',
                        )}
                        style={{
                            left: `${percentage}%`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {value}
                    </div>
                )}
            </div>
        </div>
    );
}
