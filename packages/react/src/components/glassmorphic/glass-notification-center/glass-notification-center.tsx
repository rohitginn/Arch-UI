'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import {
    type GlassVariant,
    glassVariant,
    glassText,
    glassHighlight,
    glassItemSurface,
    glassItemActive,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read?: boolean;
    icon?: React.ReactNode;
    type?: 'info' | 'success' | 'warning' | 'error';
}

export interface GlassNotificationCenterProps {
    /** Controlled open state */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Notifications list */
    notifications?: Notification[];
    /** Called when a notification is marked as read */
    onMarkRead?: (id: string) => void;
    /** Called when a notification is dismissed */
    onDismiss?: (id: string) => void;
    /** Called when "Mark all read" is clicked */
    onMarkAllRead?: () => void;
    /** Title for the panel */
    title?: string;
    /** Visual variant */
    variant?: GlassVariant;
    /** Additional CSS classes */
    className?: string;
}

/* ─── Icons ─────────────────────────────────────────────── */

const typeColors: Record<string, string> = {
    info: 'bg-[var(--glass-info)]',
    success: 'bg-[var(--glass-success)]',
    warning: 'bg-[var(--glass-warning)]',
    error: 'bg-[var(--glass-error)]',
};

const CloseIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);

const BellIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
);

/* ─── Notification Card ─────────────────────────────────── */

const NotificationCard: React.FC<{
    notification: Notification;
    variant: GlassVariant;
    onDismiss?: (id: string) => void;
    onMarkRead?: (id: string) => void;
    index: number;
}> = ({ notification, variant, onDismiss, onMarkRead, index }) => (
    <div
        className={cn(
            'group relative flex gap-3 p-3 rounded-xl',
            'transition-all duration-200 ease-out',
            glassItemSurface[variant],
            'hover:shadow-[var(--glass-depth-sm)]',
            'hover:-translate-y-[0.5px]',
            'border border-transparent hover:border-[var(--glass-edge)]',
            !notification.read && glassItemActive[variant],
            !notification.read && 'border-l-2 border-[var(--glass-accent)]',
            notification.read && 'opacity-70 hover:opacity-100',
        )}
        style={{
            animationDelay: `${index * 40}ms`,
            animationFillMode: 'both',
        }}
        onClick={() => !notification.read && onMarkRead?.(notification.id)}
    >
        <div className="mt-1 shrink-0">
            {notification.icon || (
                <div className={cn(
                    'h-8 w-8 rounded-lg flex items-center justify-center',
                    'bg-[var(--glass-surface-hover)]',
                    notification.type && typeColors[notification.type] ? `${typeColors[notification.type]}/10` : '',
                )}>
                    <BellIcon />
                </div>
            )}
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
                <p className={cn(
                    'text-sm truncate',
                    notification.read
                        ? [glassText.secondary, 'font-normal'].join(' ')
                        : [glassText.primary, 'font-medium'].join(' '),
                )}>
                    {notification.title}
                </p>
                {!notification.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--glass-accent)] animate-pulse" />
                )}
            </div>
            <p className={cn('mt-0.5 text-xs line-clamp-2', glassText.muted)}>
                {notification.message}
            </p>
            <p className={cn('mt-1 text-[11px]', glassText.placeholder)}>
                {notification.timestamp}
            </p>
        </div>

        <button
            type="button"
            className={cn(
                'absolute top-2 right-2 p-1 rounded-md',
                'opacity-0 group-hover:opacity-100',
                glassText.muted,
                'hover:text-[var(--glass-text)]',
                'hover:bg-[var(--glass-surface-hover)]',
                'transition-all duration-150',
            )}
            onClick={(e) => {
                e.stopPropagation();
                onDismiss?.(notification.id);
            }}
            aria-label="Dismiss notification"
        >
            <CloseIcon />
        </button>
    </div>
);

/* ─── Main Component ────────────────────────────────────── */

const GlassNotificationCenter = React.forwardRef<HTMLDivElement, GlassNotificationCenterProps>(
    (
        {
            open = false,
            onOpenChange,
            notifications = [],
            onMarkRead,
            onDismiss,
            onMarkAllRead,
            title = 'Notifications',
            variant = 'default',
            className,
        },
        ref,
    ) => {
        const unreadCount = notifications.filter((n) => !n.read).length;
        const v = glassVariant[variant];

        React.useEffect(() => {
            if (!open) return;
            const handler = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onOpenChange?.(false);
            };
            document.addEventListener('keydown', handler);
            return () => document.removeEventListener('keydown', handler);
        }, [open, onOpenChange]);

        if (!open) return null;

        return (
            <>
                <div
                    className="fixed inset-0 z-40 bg-black/10 dark:bg-black/30 animate-in fade-in duration-200"
                    onClick={() => onOpenChange?.(false)}
                />

                <div
                    ref={ref}
                    className={cn(
                        'fixed top-0 right-0 z-50 h-full w-full max-w-[380px]',
                        v.surface, glassHighlight,
                        'border-l',
                        v.border.replace('border ', ''),
                        'animate-in slide-in-from-right duration-300 ease-out',
                        className,
                    )}
                >
                    {/* Header */}
                    <div className={cn(
                        'flex items-center justify-between px-5 py-4',
                        'border-b border-[var(--glass-divider)]',
                    )}>
                        <div className="flex items-center gap-2">
                            <h2 className={cn('text-base font-semibold', glassText.primary)}>
                                {title}
                            </h2>
                            {unreadCount > 0 && (
                                <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[11px] font-semibold bg-[var(--glass-accent)] text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            {unreadCount > 0 && (
                                <button
                                    type="button"
                                    className="px-2 py-1 rounded-md text-xs text-[var(--glass-accent)] hover:bg-[var(--glass-surface-hover)] transition-colors"
                                    onClick={onMarkAllRead}
                                >
                                    Mark all read
                                </button>
                            )}
                            <button
                                type="button"
                                className={cn(
                                    'p-1.5 rounded-lg transition-all',
                                    glassText.muted,
                                    'hover:text-[var(--glass-text)]',
                                    'hover:bg-[var(--glass-surface-hover)]',
                                )}
                                onClick={() => onOpenChange?.(false)}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    </div>

                    {/* Notification List */}
                    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5" style={{ maxHeight: 'calc(100vh - 65px)' }}>
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className={cn('mb-3', glassText.placeholder)}>
                                    <BellIcon />
                                </div>
                                <p className={cn('text-sm', glassText.muted)}>
                                    No notifications yet
                                </p>
                            </div>
                        ) : (
                            notifications.map((notification, index) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    variant={variant}
                                    onDismiss={onDismiss}
                                    onMarkRead={onMarkRead}
                                    index={index}
                                />
                            ))
                        )}
                    </div>
                </div>
            </>
        );
    },
);

GlassNotificationCenter.displayName = 'GlassNotificationCenter';

export { GlassNotificationCenter };
