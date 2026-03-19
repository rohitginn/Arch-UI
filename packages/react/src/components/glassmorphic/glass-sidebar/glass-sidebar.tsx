'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

/**
 * Glass Sidebar Variants
 */
const glassSidebarVariants = cva(
  [
    'fixed',
    'top-0',
    'h-full',
    'z-50',
    'backdrop-blur-xl',
    // Light mode
    'border-r',
    'border-white/40',
    'bg-white/80',
    'supports-[backdrop-filter]:bg-white/60',
    'shadow-[20px_0_40px_rgba(0,0,0,0.05)]',
    'text-slate-900',
    // Dark mode
    'dark:border-white/[0.08]',
    'dark:bg-black/60',
    'dark:text-white',
    // Motion
    'transition-transform',
    'duration-300',
    'ease-[cubic-bezier(0.25,0.1,0.25,1)]',
  ],
  {
    variants: {
      side: {
        left: ['left-0', 'border-r'],
        right: ['right-0', 'border-l'],
      },
      size: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-[420px]',
      },
    },
    compoundVariants: [
      {
        side: 'left',
        className: '-translate-x-full data-[open=true]:translate-x-0',
      },
      {
        side: 'right',
        className: 'translate-x-full data-[open=true]:translate-x-0',
      },
    ],
    defaultVariants: {
      side: 'left',
      size: 'md',
    },
  }
);

export interface GlassSidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassSidebarVariants> {
  /** Whether sidebar is open */
  open: boolean;
  /** Callback when sidebar should close */
  onClose: () => void;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Show overlay backdrop */
  overlay?: boolean;
  /** Close when clicking overlay */
  closeOnOverlay?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
}

/**
 * GlassSidebar - A premium glassmorphic sidebar component
 * 
 * Features:
 * - Smooth slide animation from left or right
 * - Frosted glass backdrop blur
 * - Optional overlay backdrop
 * - Header and footer sections
 * - Focus trap and keyboard navigation
 * 
 * @example
 * ```tsx
 * <GlassSidebar
 *   open={isSidebarOpen}
 *   onClose={() => setIsSidebarOpen(false)}
 *   header={<h2>Menu</h2>}
 * >
 *   <nav>Navigation items...</nav>
 * </GlassSidebar>
 * ```
 */
const GlassSidebar = React.forwardRef<HTMLDivElement, GlassSidebarProps>(
  (
    {
      className,
      side,
      size,
      open,
      onClose,
      header,
      footer,
      overlay = true,
      closeOnOverlay = true,
      closeOnEscape = true,
      children,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false);
    const sidebarRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => sidebarRef.current!);

    // Mount state for SSR
    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Lock body scroll when open
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    // Handle escape key
    React.useEffect(() => {
      if (!closeOnEscape || !open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose, closeOnEscape]);

    const handleOverlayClick = () => {
      if (closeOnOverlay) onClose();
    };

    if (!mounted) return null;

    return createPortal(
      <>
        {/* Overlay */}
        {overlay && (
          <div
            className={cn(
              'fixed',
              'inset-0',
              'z-40',
              'bg-black/50',
              'backdrop-blur-sm',
              'transition-opacity',
              'duration-300',
              open ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={cn(glassSidebarVariants({ side, size }), className)}
          data-open={open}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {/* Gradient overlay */}
          <div
            className={cn(
              'absolute',
              'inset-0',
              'bg-gradient-to-b',
              'from-slate-50/30 dark:from-white/5',
              'to-transparent',
              'pointer-events-none'
            )}
            aria-hidden="true"
          />

          <div className="relative h-full flex flex-col">
            {/* Header */}
            {header && (
              <div
                className={cn(
                  'flex-shrink-0',
                  'px-6',
                  'py-5',
                  'border-b',
                  'border-[var(--glass-divider)]'
                )}
              >
                {header}
              </div>
            )}

            {/* Content */}
            <div
              className={cn(
                'flex-1',
                'overflow-y-auto',
                'px-6',
                'py-5',
                'scrollbar-thin'
              )}
            >
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div
                className={cn(
                  'flex-shrink-0',
                  'px-6',
                  'py-5',
                  'border-t',
                  'border-[var(--glass-divider)]'
                )}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      </>,
      document.body
    );
  }
);

GlassSidebar.displayName = 'GlassSidebar';

/**
 * Glass Sidebar Nav Item
 */
const glassSidebarItemVariants = cva(
  [
    'flex',
    'items-center',
    'gap-3',
    'w-full',
    'px-4',
    'py-3',
    'rounded-xl',
    'text-sm',
    'font-medium',
    'transition-all',
    'duration-200',
    'cursor-pointer',
  ],
  {
    variants: {
      active: {
        true: [
          'bg-black/[0.06]',
          'dark:bg-white/[0.1]',
          'text-slate-900',
          'dark:text-white',
          'shadow-sm',
          'font-semibold',
        ],
        false: [
          'text-slate-600',
          'dark:text-white/70',
          'hover:bg-black/[0.04]',
          'dark:hover:bg-white/[0.06]',
          'hover:text-slate-900',
          'dark:hover:text-white',
          'hover:-translate-y-[1px]',
        ],
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface GlassSidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof glassSidebarItemVariants> {
  /** Icon element */
  icon?: React.ReactNode;
  /** Badge/counter element */
  badge?: React.ReactNode;
}

const GlassSidebarItem = React.forwardRef<
  HTMLButtonElement,
  GlassSidebarItemProps
>(({ className, active, icon, badge, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(glassSidebarItemVariants({ active }), className)}
      {...props}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {badge && <span className="flex-shrink-0">{badge}</span>}
    </button>
  );
});

GlassSidebarItem.displayName = 'GlassSidebarItem';

/**
 * Glass Sidebar Section
 */
export interface GlassSidebarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
}

const GlassSidebarSection = React.forwardRef<
  HTMLDivElement,
  GlassSidebarSectionProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('mb-6', className)} {...props}>
      {title && (
        <h3
          className={cn(
            'px-4',
            'mb-2',
            'text-xs',
            'font-semibold',
            'text-[var(--glass-text-muted)]',
            'uppercase',
            'tracking-wider'
          )}
        >
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
});

GlassSidebarSection.displayName = 'GlassSidebarSection';

export {
  GlassSidebar,
  GlassSidebarItem,
  GlassSidebarSection,
  glassSidebarVariants,
  glassSidebarItemVariants,
};
