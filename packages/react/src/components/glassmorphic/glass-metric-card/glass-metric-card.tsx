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

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface GlassMetricCardProps {
    /** Primary metric value */
    value: string | number;
    /** Metric label */
    label: string;
    /** Trend direction */
    trend?: TrendDirection;
    /** Trend percentage or text */
    trendValue?: string;
    /** Icon to display */
    icon?: React.ReactNode;
    /** Visual variant */
    variant?: GlassVariant;
    /** Additional CSS classes */
    className?: string;
}

const TrendIcon: React.FC<{ direction: TrendDirection }> = ({ direction }) => {
    if (direction === 'neutral') return null;
    return (
        <svg
            className={cn('h-3.5 w-3.5', direction === 'up' ? 'text-[var(--glass-success)]' : 'text-[var(--glass-error)]')}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {direction === 'up' ? (
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
            ) : (
                <path d="M7 7l5 5 5-5M7 17l5-5 5 5" />
            )}
        </svg>
    );
};

/**
 * GlassMetricCard — Dashboard KPI card with animated value transitions
 */
const GlassMetricCard = React.forwardRef<HTMLDivElement, GlassMetricCardProps>(
    ({ value, label, trend, trendValue, icon, variant = 'default', className }, ref) => {
        const cardRef = React.useRef<HTMLDivElement>(null);
        const [displayValue, setDisplayValue] = React.useState(value);

        const v = glassVariant[variant];

        React.useEffect(() => {
            const numVal = typeof value === 'number' ? value : parseFloat(String(value));
            const prevVal = typeof displayValue === 'number' ? displayValue : parseFloat(String(displayValue));

            if (isNaN(numVal) || isNaN(prevVal)) {
                setDisplayValue(value);
                return;
            }

            const duration = 600;
            const start = performance.now();
            const diff = numVal - prevVal;

            const animate = (time: number) => {
                const elapsed = time - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = prevVal + diff * eased;
                setDisplayValue(Math.round(current * 100) / 100);
                if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

        const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
            const el = cardRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.01)`;
        }, []);

        const handleMouseLeave = React.useCallback(() => {
            const el = cardRef.current;
            if (!el) return;
            el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
        }, []);

        const mergedRef = React.useCallback(
            (node: HTMLDivElement | null) => {
                (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            },
            [ref],
        );

        const trendColor = trend === 'up'
            ? 'text-[var(--glass-success)]'
            : trend === 'down'
                ? 'text-[var(--glass-error)]'
                : glassText.muted;

        return (
            <div
                ref={mergedRef}
                className={cn(
                    'relative p-5 rounded-2xl',
                    'transition-all duration-300 ease-out',
                    'will-change-transform',
                    v.surface, v.border, glassHighlight,
                    v.surfaceHover,
                    className,
                )}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className={cn('text-xs font-medium uppercase tracking-wider', glassText.muted)}>
                            {label}
                        </p>
                        <p className={cn('text-3xl font-bold tracking-tight tabular-nums', glassText.primary)}>
                            {typeof displayValue === 'number' ? Math.round(displayValue).toLocaleString() : displayValue}
                        </p>
                        {(trend || trendValue) && (
                            <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
                                {trend && <TrendIcon direction={trend} />}
                                {trendValue && <span>{trendValue}</span>}
                            </div>
                        )}
                    </div>

                    {icon && (
                        <div className={cn(
                            'flex items-center justify-center h-10 w-10 rounded-xl',
                            'bg-[var(--glass-surface-hover)]',
                            glassText.muted,
                        )}>
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

GlassMetricCard.displayName = 'GlassMetricCard';

export { GlassMetricCard };
