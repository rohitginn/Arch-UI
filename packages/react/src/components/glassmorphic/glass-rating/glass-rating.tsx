'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ───────────────── Star Icon ───────────────── */
const StarIcon = ({
    className,
    filled,
    half,
}: {
    className?: string;
    filled?: boolean;
    half?: boolean;
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
        fill={filled || half ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {half ? (
            <>
                <defs>
                    <linearGradient id="halfFill">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="url(#halfFill)"
                />
            </>
        ) : (
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        )}
    </svg>
);

/* ───────────────── Types ───────────────── */
export interface GlassRatingProps {
    /** Current value (0 to max) */
    value?: number;
    /** Default value (uncontrolled) */
    defaultValue?: number;
    /** Maximum number of stars */
    max?: number;
    /** Callback when value changes */
    onValueChange?: (value: number) => void;
    /** Size of the stars */
    size?: 'sm' | 'md' | 'lg';
    /** Allow half-star ratings */
    allowHalf?: boolean;
    /** Read-only mode */
    readOnly?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Custom active color class */
    activeColor?: string;
    /** Custom inactive color class */
    inactiveColor?: string;
    /** Label for accessibility */
    label?: string;
    /** Show value text next to stars */
    showValue?: boolean;
    /** Additional CSS classes */
    className?: string;
}

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
};

const gapClasses = {
    sm: 'gap-0.5',
    md: 'gap-1',
    lg: 'gap-1.5',
};

/* ───────────────── Component ───────────────── */
const GlassRating = React.forwardRef<HTMLDivElement, GlassRatingProps>(
    (
        {
            value: controlledValue,
            defaultValue = 0,
            max = 5,
            onValueChange,
            size = 'md',
            allowHalf = false,
            readOnly = false,
            disabled = false,
            activeColor = 'text-amber-400',
            inactiveColor = 'text-text-muted',
            label = 'Rating',
            showValue = false,
            className,
        },
        ref
    ) => {
        const isControlled = controlledValue !== undefined;
        const [internalValue, setInternalValue] = React.useState(defaultValue);
        const [hoverValue, setHoverValue] = React.useState<number | null>(null);

        const currentValue = isControlled ? controlledValue : internalValue;
        const displayValue = hoverValue !== null ? hoverValue : currentValue;

        const handleClick = React.useCallback(
            (starValue: number) => {
                if (readOnly || disabled) return;
                const newValue = currentValue === starValue ? 0 : starValue; // toggle off if same
                if (!isControlled) setInternalValue(newValue);
                onValueChange?.(newValue);
            },
            [readOnly, disabled, currentValue, isControlled, onValueChange]
        );

        const handleMouseEnter = React.useCallback(
            (starValue: number) => {
                if (readOnly || disabled) return;
                setHoverValue(starValue);
            },
            [readOnly, disabled]
        );

        const handleMouseLeave = React.useCallback(() => {
            setHoverValue(null);
        }, []);

        const handleKeyDown = React.useCallback(
            (e: React.KeyboardEvent) => {
                if (readOnly || disabled) return;
                const step = allowHalf ? 0.5 : 1;
                let newValue = currentValue;
                if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    newValue = Math.min(max, currentValue + step);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    newValue = Math.max(0, currentValue - step);
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    newValue = 0;
                } else if (e.key === 'End') {
                    e.preventDefault();
                    newValue = max;
                }
                if (newValue !== currentValue) {
                    if (!isControlled) setInternalValue(newValue);
                    onValueChange?.(newValue);
                }
            },
            [readOnly, disabled, allowHalf, max, currentValue, isControlled, onValueChange]
        );

        const stars = React.useMemo(() => {
            const items: React.ReactNode[] = [];
            for (let i = 1; i <= max; i++) {
                const isFilled = displayValue >= i;
                const isHalf = allowHalf && !isFilled && displayValue >= i - 0.5;

                items.push(
                    <button
                        key={i}
                        type="button"
                        disabled={disabled}
                        tabIndex={-1}
                        onClick={() => handleClick(allowHalf ? i - 0.5 : i)}
                        onMouseEnter={() => handleMouseEnter(i)}
                        className={cn(
                            'relative transition-all duration-150',
                            'focus:outline-none',
                            !readOnly && !disabled && 'cursor-pointer hover:scale-125 active:scale-95',
                            disabled && 'cursor-not-allowed opacity-50',
                            readOnly && 'cursor-default'
                        )}
                    >
                        <StarIcon
                            className={cn(
                                sizeClasses[size],
                                'transition-colors duration-200',
                                isFilled || isHalf ? activeColor : inactiveColor,
                                isFilled && 'drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]'
                            )}
                            filled={isFilled}
                            half={isHalf}
                        />
                    </button>
                );
            }
            return items;
        }, [max, displayValue, allowHalf, size, activeColor, inactiveColor, readOnly, disabled, handleClick, handleMouseEnter]);

        return (
            <div
                ref={ref}
                role="slider"
                aria-label={label}
                aria-valuenow={currentValue}
                aria-valuemin={0}
                aria-valuemax={max}
                tabIndex={readOnly || disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    'inline-flex items-center',
                    gapClasses[size],
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-bg rounded-md',
                    className
                )}
            >
                {stars}
                {showValue && (
                    <span
                        className={cn(
                            'ml-2 tabular-nums font-medium text-text-secondary',
                            size === 'sm' && 'text-xs',
                            size === 'md' && 'text-sm',
                            size === 'lg' && 'text-base'
                        )}
                    >
                        {currentValue.toFixed(allowHalf ? 1 : 0)}
                    </span>
                )}
            </div>
        );
    }
);

GlassRating.displayName = 'GlassRating';

export { GlassRating };
