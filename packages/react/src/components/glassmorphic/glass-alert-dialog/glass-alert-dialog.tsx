'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassAlertDialogProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Callback when confirm button is clicked */
    onConfirm: () => void;
    /** Callback when cancel button is clicked */
    onCancel: () => void;
    /** Dialog title */
    title: string;
    /** Dialog description */
    description?: string;
    /** Confirm button text */
    confirmLabel?: string;
    /** Cancel button text */
    cancelLabel?: string;
    /** Visual variant */
    variant?: 'warning' | 'danger';
}

/**
 * GlassAlertDialog — Blocking confirmation dialog.
 *
 * Modal that requires explicit user action (Confirm or Cancel).
 * Cannot be dismissed by clicking backdrop or pressing Escape.
 *
 * @example
 * ```tsx
 * <GlassAlertDialog
 *   open={showDelete}
 *   title="Delete project?"
 *   description="This action is irreversible."
 *   confirmLabel="Delete"
 *   variant="danger"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDelete(false)}
 * />
 * ```
 */
export function GlassAlertDialog({
    open,
    onConfirm,
    onCancel,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
}: GlassAlertDialogProps) {
    const confirmRef = React.useRef<HTMLButtonElement>(null);

    // Focus confirm button & lock body scroll
    React.useEffect(() => {
        if (open) {
            confirmRef.current?.focus();
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Block Escape key
    React.useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') e.preventDefault();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="glass-alert-dialog-title"
            aria-describedby={description ? 'glass-alert-dialog-desc' : undefined}
        >
            {/* Backdrop — NOT dismissible */}
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />
            {/* Dialog */}
            <div
                className={cn(
                    'relative z-10 w-full max-w-md rounded-2xl p-6',
                    // Light
                    'bg-[var(--surface-bg,#ffffff)]',
                    'border border-[var(--surface-border,#e2e8f0)]',
                    // Dark
                    'dark:bg-[var(--surface-bg-hover,rgba(255,255,255,0.08))]',
                    'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                    'dark:backdrop-blur-xl',
                    // Shadow
                    'shadow-2xl',
                )}
            >
                <h2
                    id="glass-alert-dialog-title"
                    className="text-lg font-semibold text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]"
                >
                    {title}
                </h2>
                {description && (
                    <p
                        id="glass-alert-dialog-desc"
                        className="mt-2 text-sm text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]"
                    >
                        {description}
                    </p>
                )}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        type="button"
                        className={cn(
                            'rounded-xl px-4 py-2 text-sm font-medium cursor-pointer',
                            'bg-[var(--surface-bg-hover,#f1f5f9)]',
                            'text-[var(--glass-text,#0f172a)]',
                            'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.05))]',
                            'dark:text-[var(--glass-text,#f8fafc)]',
                            'border border-[var(--surface-border,#e2e8f0)]',
                            'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                            'hover:bg-[var(--surface-bg-active,#e2e8f0)]',
                            'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.08))]',
                            'transition-colors duration-200',
                            'active:scale-[0.97] active:transition-transform active:duration-75',
                        )}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        ref={confirmRef}
                        onClick={onConfirm}
                        type="button"
                        className={cn(
                            'rounded-xl px-4 py-2 text-sm font-medium text-white cursor-pointer',
                            'transition-all duration-200',
                            'hover:-translate-y-[1px] hover:shadow-lg',
                            'active:scale-[0.97] active:transition-transform active:duration-75',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                            variant === 'danger' && [
                                'bg-[var(--glass-error,#ef4444)]',
                                'hover:bg-red-600 dark:hover:bg-red-500',
                                'focus-visible:ring-red-500',
                            ],
                            variant === 'warning' && [
                                'bg-[var(--glass-warning,#f59e0b)]',
                                'hover:bg-amber-600 dark:hover:bg-amber-500',
                                'focus-visible:ring-amber-500',
                            ],
                        )}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
