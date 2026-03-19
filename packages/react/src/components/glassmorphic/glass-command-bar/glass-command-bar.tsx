'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* -------------------------------------------------------------------------- */
/*  GlassCommandBar                                                            */
/* -------------------------------------------------------------------------- */

export interface CommandBarAction {
    /** Unique key */
    id: string;
    /** Visible label */
    label: string;
    /** Icon element */
    icon?: React.ReactNode;
    /** Keyboard shortcut display (e.g. ['⌘','K']) */
    shortcut?: string[];
    /** Click handler */
    onClick: () => void;
    /** Disabled */
    disabled?: boolean;
}

export interface GlassCommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Actions to display */
    actions: CommandBarAction[];
    /** Context text shown on the left */
    context?: string;
    /** Position */
    position?: 'bottom' | 'top';
}

/**
 * GlassCommandBar — Persistent bottom/top floating toolbar for power-user shortcuts.
 *
 * Floats above page content with frosted glass background.
 * Shows current context and quick-action buttons.
 *
 * @example
 * ```tsx
 * <GlassCommandBar
 *   context="3 items selected"
 *   actions={[
 *     { id: 'delete', label: 'Delete', icon: <Trash />, shortcut: ['⌫'], onClick: handleDelete },
 *     { id: 'export', label: 'Export', icon: <Download />, onClick: handleExport },
 *   ]}
 * />
 * ```
 */
export const GlassCommandBar = React.forwardRef<HTMLDivElement, GlassCommandBarProps>(
    ({ actions, context, position = 'bottom', className, ...rest }, ref) => {
        return (
            <div
                ref={ref}
                role="toolbar"
                aria-label="Command bar"
                className={cn(
                    'fixed left-1/2 -translate-x-1/2 z-50',
                    'flex items-center gap-2 rounded-2xl px-4 py-2',
                    // Glass surface
                    'bg-[var(--surface-bg,#ffffff)]/90 backdrop-blur-xl',
                    'dark:bg-[var(--surface-bg-hover,rgba(20,20,20,0.9))]',
                    'border border-[var(--surface-border,#e2e8f0)]',
                    'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                    'shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
                    // Position
                    position === 'bottom' && 'bottom-6',
                    position === 'top' && 'top-6',
                    className,
                )}
                {...rest}
            >
                {/* Context label */}
                {context && (
                    <>
                        <span className="text-sm font-medium text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)] whitespace-nowrap">
                            {context}
                        </span>
                        <span className="h-5 w-px bg-[var(--surface-border,#e2e8f0)] dark:bg-[var(--surface-border,rgba(255,255,255,0.1))]" />
                    </>
                )}

                {/* Action buttons */}
                {actions.map((action) => (
                    <button
                        key={action.id}
                        type="button"
                        onClick={action.onClick}
                        disabled={action.disabled}
                        title={action.label}
                        className={cn(
                            'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium cursor-pointer',
                            'transition-all duration-200',
                            'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
                            'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
                            'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
                            'active:scale-[0.97] active:transition-transform active:duration-75',
                            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                        )}
                    >
                        {action.icon && <span className="h-4 w-4 flex-shrink-0">{action.icon}</span>}
                        <span>{action.label}</span>
                        {action.shortcut && (
                            <span className="ml-1 flex gap-0.5">
                                {action.shortcut.map((key, i) => (
                                    <kbd
                                        key={i}
                                        className={cn(
                                            'inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded text-[10px] font-mono',
                                            'bg-[var(--surface-bg-active,#e2e8f0)] dark:bg-[rgba(255,255,255,0.08)]',
                                            'text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]',
                                        )}
                                    >
                                        {key}
                                    </kbd>
                                ))}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        );
    },
);

GlassCommandBar.displayName = 'GlassCommandBar';
