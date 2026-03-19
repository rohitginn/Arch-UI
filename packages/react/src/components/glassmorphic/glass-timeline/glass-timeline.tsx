'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import {
    type GlassVariant,
    glassText,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export type TimelineStatus = 'completed' | 'active' | 'pending' | 'error';

export interface TimelineEvent {
    id: string;
    title: string;
    description?: string;
    timestamp?: string;
    status?: TimelineStatus;
    icon?: React.ReactNode;
}

export interface GlassTimelineProps {
    /** Timeline events */
    events: TimelineEvent[];
    /** Visual variant */
    variant?: GlassVariant;
    /** Additional CSS classes */
    className?: string;
}

export interface GlassTimelineItemProps {
    title: string;
    description?: string;
    timestamp?: string;
    status?: TimelineStatus;
    icon?: React.ReactNode;
    isLast?: boolean;
    index?: number;
    variant?: GlassVariant;
    className?: string;
    children?: React.ReactNode;
}

/* ─── Status Colors (token-based) ─────────────────────────── */

const statusDotColor: Record<TimelineStatus, string> = {
    completed: 'bg-[var(--glass-success)]',
    active: 'bg-[var(--glass-accent)]',
    pending: 'bg-[var(--glass-surface-active)]',
    error: 'bg-[var(--glass-error)]',
};

const statusGlow: Record<TimelineStatus, string> = {
    completed: 'shadow-[0_0_8px_var(--glass-success)]',
    active: 'shadow-[0_0_8px_var(--glass-accent)]',
    pending: '',
    error: 'shadow-[0_0_8px_var(--glass-error)]',
};



/* ─── Timeline Item ─────────────────────────────────────── */

export const GlassTimelineItem: React.FC<GlassTimelineItemProps> = ({
    title,
    description,
    timestamp,
    status = 'pending',
    icon,
    isLast = false,
    index = 0,
    className,
    children,
}) => (
    <div
        className={cn('relative flex gap-4 pb-8', isLast && 'pb-0', className)}
        style={{
            animationDelay: `${index * 80}ms`,
            animationFillMode: 'both',
        }}
    >
        <div className="relative flex flex-col items-center">
            <div
                className={cn(
                    'relative z-10 h-3 w-3 rounded-full shrink-0 mt-1.5',
                    statusDotColor[status],
                    statusGlow[status],
                    status === 'active' && 'animate-pulse',
                )}
            />
            {!isLast && (
                <div
                    className={cn(
                        'w-px flex-1 mt-1',
                        'bg-gradient-to-b',
                        status === 'completed'
                            ? 'from-[var(--glass-success)]/40 to-[var(--glass-success)]/10'
                            : status === 'active'
                                ? 'from-[var(--glass-accent)]/40 to-[var(--glass-divider)]'
                                : 'from-[var(--glass-divider)] to-transparent',
                    )}
                />
            )}
        </div>

        <div
            className={cn(
                'flex-1 -mt-0.5 pb-1',
                'p-3 rounded-xl',
                'transition-all duration-200 ease-out',
                'bg-[var(--glass-surface-hover)]/50',
                'hover:bg-[var(--glass-surface-hover)]',
                'hover:shadow-[var(--glass-depth-sm)]',
                'border border-transparent hover:border-[var(--glass-edge)]',
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                    {icon && <span className={glassText.muted}>{icon}</span>}
                    <h4 className={cn(
                        'text-sm font-medium',
                        status === 'pending' ? glassText.muted : glassText.primary,
                    )}>
                        {title}
                    </h4>
                </div>
                {timestamp && (
                    <span className={cn('text-[11px] shrink-0 tabular-nums', glassText.placeholder)}>
                        {timestamp}
                    </span>
                )}
            </div>
            {description && (
                <p className={cn('mt-1 text-xs leading-relaxed', glassText.muted)}>
                    {description}
                </p>
            )}
            {children}
        </div>
    </div>
);

GlassTimelineItem.displayName = 'GlassTimelineItem';

/* ─── Main Component ────────────────────────────────────── */

const GlassTimeline = React.forwardRef<HTMLDivElement, GlassTimelineProps>(
    ({ events, variant: _variant = 'default', className }, ref) => (
        <div ref={ref} className={cn('relative', className)}>
            {events.map((event, index) => (
                <GlassTimelineItem
                    key={event.id}
                    title={event.title}
                    description={event.description}
                    timestamp={event.timestamp}
                    status={event.status}
                    icon={event.icon}
                    isLast={index === events.length - 1}
                    index={index}
                />
            ))}
        </div>
    ),
);

GlassTimeline.displayName = 'GlassTimeline';

export { GlassTimeline };
