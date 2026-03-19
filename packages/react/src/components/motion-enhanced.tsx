'use client';

/**
 * Motion-enhanced wrappers for ArchUI glassmorphic components.
 *
 * These require `motion` (>= 11) as a peer dependency.
 * They wrap the existing components with AnimatePresence-powered
 * enter/exit animations while preserving all original props and behavior.
 *
 * Usage:
 *   import { MotionGlassModal, MotionGlassToast } from '@archui/react';
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@archui/core';
import { GlassCard } from './glassmorphic/glass-card';
import { GlassButton } from './glassmorphic/glass-button';
import { GlassAlert as BaseGlassAlert, type GlassAlertProps } from './glassmorphic/glass-alert/glass-alert';
import { usePrefersReducedMotion } from '../utils/motion';

/* ──────────────────────────────────────────────
   X Icon (same as base modal)
   ────────────────────────────────────────────── */
const XIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

/* ══════════════════════════════════════════════
   MotionGlassModal
   ══════════════════════════════════════════════ */

export interface MotionGlassModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    footer?: React.ReactNode;
    className?: string;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[90vw] max-h-[90vh]',
} as const;

export function MotionGlassModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    size = 'md',
    closeOnOverlayClick = true,
    showCloseButton = true,
    footer,
    className,
}: MotionGlassModalProps) {
    const prefersReduced = usePrefersReducedMotion();
    const modalRef = React.useRef<HTMLDivElement>(null);
    const previousActiveElement = React.useRef<HTMLElement | null>(null);

    // Body scroll lock
    React.useEffect(() => {
        if (open) {
            previousActiveElement.current = document.activeElement as HTMLElement;
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) onOpenChange(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);

    // Focus trap
    React.useEffect(() => {
        if (!open || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        firstElement?.focus();

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };
        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [open]);

    // Return focus on close
    React.useEffect(() => {
        if (!open && previousActiveElement.current) {
            previousActiveElement.current.focus();
        }
    }, [open]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onOpenChange(false);
        }
    };

    // Animation values (reduced motion = instant fade only)
    const dur = prefersReduced ? 0.01 : 0.2;
    const ease = [0.25, 0.46, 0.45, 0.94] as const;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? 'modal-title' : undefined}
                    aria-describedby={description ? 'modal-description' : undefined}
                    onClick={handleOverlayClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: dur }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: dur }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        ref={modalRef}
                        className={cn('relative w-full', sizeClasses[size])}
                        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: dur, ease }}
                    >
                        <GlassCard
                            variant="elevated"
                            blur="xl"
                            className={cn(
                                'relative p-0 overflow-hidden',
                                'shadow-[0_8px_32px_rgba(0,0,0,0.15),0_16px_48px_rgba(0,0,0,0.12),0_32px_80px_rgba(0,0,0,0.1)]',
                                className
                            )}
                        >
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-start justify-between p-6 pb-0">
                                    <div className="flex-1 pr-4">
                                        {title && (
                                            <h2
                                                id="modal-title"
                                                className="text-xl font-semibold text-slate-900 dark:text-white leading-tight"
                                            >
                                                {title}
                                            </h2>
                                        )}
                                        {description && (
                                            <p
                                                id="modal-description"
                                                className="mt-1.5 text-sm text-slate-500 dark:text-white/60 leading-relaxed"
                                            >
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                    {showCloseButton && (
                                        <GlassButton
                                            variant="ghost"
                                            size="icon-sm"
                                            className="flex-shrink-0 -mt-0.5 -mr-1"
                                            onClick={() => onOpenChange(false)}
                                            aria-label="Close modal"
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </GlassButton>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
                                {children}
                            </div>

                            {/* Footer */}
                            {footer && (
                                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/20 dark:border-white/[0.08] bg-white/10 dark:bg-white/[0.02]">
                                    {footer}
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

MotionGlassModal.displayName = 'MotionGlassModal';

/* ══════════════════════════════════════════════
   MotionGlassAlert
   ══════════════════════════════════════════════ */

interface MotionGlassAlertWrapperProps extends GlassAlertProps {
    /** Controls visibility for AnimatePresence */
    visible?: boolean;
}

export function MotionGlassAlert({
    visible = true,
    ...props
}: MotionGlassAlertWrapperProps) {
    const prefersReduced = usePrefersReducedMotion();
    const dur = prefersReduced ? 0.01 : 0.2;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                    transition={{ duration: dur, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <BaseGlassAlert {...props} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

MotionGlassAlert.displayName = 'MotionGlassAlert';

/* ══════════════════════════════════════════════
   MotionGlassToast (wrapper for toast items)
   ══════════════════════════════════════════════ */

interface MotionGlassToastItemProps {
    children: React.ReactNode;
    /** Unique key for AnimatePresence */
    layoutId?: string;
}

export function MotionGlassToastItem({
    children,
    layoutId,
}: MotionGlassToastItemProps) {
    const prefersReduced = usePrefersReducedMotion();
    const dur = prefersReduced ? 0.01 : 0.25;

    return (
        <motion.div
            layout={!prefersReduced}
            layoutId={layoutId}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 80 }}
            transition={{ duration: dur, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}

MotionGlassToastItem.displayName = 'MotionGlassToastItem';
