'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@archui/core';
import { GlassCard } from '../glass-card';
import { GlassButton } from '../glass-button';

/**
 * X Icon Component - Refined
 */
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

export interface GlassModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Close modal when clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional className for modal content */
  className?: string;
  /** Animation variant */
  animation?: 'fade' | 'scale' | 'slide';
}

/**
 * GlassModal - A premium glassmorphic modal component
 * 
 * Features:
 * - Visible frosted glass effect
 * - Snappy animations (200ms)
 * - Subtle scale animation (0.98)
 * - Elegant backdrop blur
 * - Focus trap and escape key support
 * 
 * @example
 * ```tsx
 * <GlassModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Welcome"
 *   description="This is a glassmorphic modal"
 * >
 *   <p>Modal content goes here</p>
 * </GlassModal>
 * ```
 */
export function GlassModal({
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
  animation = 'scale',
}: GlassModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  // Mount state for SSR
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
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

    // Focus first element
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

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[90vw] max-h-[90vh]',
  };

  // Animation classes - SNAPPIER with subtle scale
  const animationClasses = {
    fade: {
      overlay: open
        ? 'opacity-100'
        : 'opacity-0',
      content: open
        ? 'opacity-100'
        : 'opacity-0',
    },
    scale: {
      overlay: open
        ? 'opacity-100'
        : 'opacity-0',
      content: open
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-[0.98]', // Subtle scale - more premium
    },
    slide: {
      overlay: open
        ? 'opacity-100'
        : 'opacity-0',
      content: open
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-4', // Smaller translate for subtlety
    },
  };

  if (!mounted) return null;
  if (!open && !isAnimating) return null;

  const handleAnimationEnd = () => {
    if (!open) {
      setIsAnimating(false);
    }
  };

  return createPortal(
    <div
      className={cn(
        'fixed',
        'inset-0',
        'z-50',
        'flex',
        'items-center',
        'justify-center',
        'p-4',
        'transition-opacity',
        'duration-200', // Snappier - was 300ms
        'ease-out',
        animationClasses[animation].overlay
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
      onClick={handleOverlayClick}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Backdrop - Refined */}
      <div
        className={cn(
          'absolute',
          'inset-0',
          'bg-black/50', // Slightly lighter
          'backdrop-blur-sm',
          'transition-opacity',
          'duration-200', // Snappier
          open ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          'relative',
          'w-full',
          sizeClasses[size],
          'transition-all',
          'duration-200', // Snappier - was 300ms
          'ease-[cubic-bezier(0.34,1.56,0.64,1)]', // Spring easing
          animationClasses[animation].content
        )}
      >
        <GlassCard
          variant="elevated"
          blur="xl"
          className={cn(
            'relative',
            'p-0',
            'overflow-hidden',
            // Multi-layer shadow for depth
            'shadow-[0_8px_32px_rgba(0,0,0,0.15),0_16px_48px_rgba(0,0,0,0.12),0_32px_80px_rgba(0,0,0,0.1)]',
            className
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                'flex',
                'items-start',
                'justify-between',
                'p-6',
                'pb-0'
              )}
            >
              <div className="flex-1 pr-4">
                {title && (
                  <h2
                    id="modal-title"
                    className={cn(
                      'text-xl',
                      'font-semibold',
                      'text-text-primary',
                      'leading-tight'
                    )}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className={cn(
                      'mt-1.5',
                      'text-sm',
                      'text-text-secondary',
                      'leading-relaxed'
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>

              {showCloseButton && (
                <GlassButton
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    'flex-shrink-0',
                    '-mt-0.5',
                    '-mr-1'
                  )}
                  onClick={() => onOpenChange(false)}
                  aria-label="Close modal"
                >
                  <XIcon className="h-4 w-4" />
                </GlassButton>
              )}
            </div>
          )}

          {/* Content */}
          <div
            className={cn(
              'p-6',
              'max-h-[60vh]',
              'overflow-y-auto',
              // Custom scrollbar - subtle
              'scrollbar-thin',
              'scrollbar-track-transparent',
              'scrollbar-thumb-black/10',
              'dark:scrollbar-thumb-white/10',
              'hover:scrollbar-thumb-black/20',
              'dark:hover:scrollbar-thumb-white/20'
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={cn(
                'flex',
                'items-center',
                'justify-end',
                'gap-3',
                'px-6',
                'py-4',
                'border-t',
                'border-[var(--glass-divider)]',
                'bg-[var(--glass-surface-hover)]/40'
              )}
            >
              {footer}
            </div>
          )}
        </GlassCard>
      </div>
    </div>,
    document.body
  );
}

GlassModal.displayName = 'GlassModal';

export { GlassModal as default };
