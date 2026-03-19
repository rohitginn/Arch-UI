'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Variant system                                                      */
/* ------------------------------------------------------------------ */

const splitButtonVariants = cva(
  [
    'inline-flex items-center',
    'rounded-xl',
    'overflow-hidden',
    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white/80 backdrop-blur-md border border-black/[0.08]',
          'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]',
          'dark:bg-white/[0.08] dark:border-white/[0.12]',
          'dark:shadow-[0_2px_10px_-2px_rgba(0,0,0,0.3)]',
        ],
        primary: [
          'bg-blue-600 border border-blue-700',
          'shadow-[0_2px_8px_-2px_rgba(59,130,246,0.4)]',
          'dark:bg-blue-500/90 dark:border-blue-400/30',
        ],
        secondary: [
          'bg-slate-100 border border-slate-200',
          'dark:bg-slate-800 dark:border-slate-700',
        ],
        danger: [
          'bg-red-600 border border-red-700',
          'shadow-[0_2px_8px_-2px_rgba(239,68,68,0.4)]',
          'dark:bg-red-500/90 dark:border-red-400/30',
        ],
        success: [
          'bg-emerald-600 border border-emerald-700',
          'shadow-[0_2px_8px_-2px_rgba(16,185,129,0.4)]',
          'dark:bg-emerald-500/90 dark:border-emerald-400/30',
        ],
        outline: [
          'bg-transparent border border-slate-300',
          'dark:border-white/20',
        ],
      },
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/* ------------------------------------------------------------------ */
/*  Inner button & divider classes per variant                         */
/* ------------------------------------------------------------------ */

const actionClasses: Record<string, string> = {
  default:
    'text-slate-900 hover:bg-black/[0.05] dark:text-white dark:hover:bg-white/[0.08] focus-visible:ring-slate-500/30',
  primary:
    'text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:ring-blue-300',
  secondary:
    'text-slate-800 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700 focus-visible:ring-slate-400',
  danger:
    'text-white hover:bg-red-700 dark:hover:bg-red-600 focus-visible:ring-red-300',
  success:
    'text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 focus-visible:ring-emerald-300',
  outline:
    'text-slate-700 hover:bg-slate-50 dark:text-white dark:hover:bg-white/[0.06] focus-visible:ring-slate-400',
};

const dividerClasses: Record<string, string> = {
  default: 'bg-black/[0.1] dark:bg-white/[0.15]',
  primary: 'bg-blue-800/30 dark:bg-blue-300/20',
  secondary: 'bg-slate-300 dark:bg-slate-600',
  danger: 'bg-red-800/30 dark:bg-red-300/20',
  success: 'bg-emerald-800/30 dark:bg-emerald-300/20',
  outline: 'bg-slate-300 dark:bg-white/20',
};

const sizeActionPadding: Record<string, string> = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
};

const sizeTogglePadding: Record<string, string> = {
  sm: 'px-1.5',
  md: 'px-2',
  lg: 'px-2.5',
};

const sizeIconClasses: Record<string, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

/* ------------------------------------------------------------------ */
/*  Menu item type                                                     */
/* ------------------------------------------------------------------ */

export interface SplitButtonMenuItem {
  /** Unique key */
  key: string;
  /** Display label */
  label: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Disabled */
  disabled?: boolean;
  /** Danger styling */
  danger?: boolean;
}

/* ------------------------------------------------------------------ */
/*  SplitButton component                                               */
/* ------------------------------------------------------------------ */

export interface SplitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof splitButtonVariants> {
  /** Primary action label */
  label: string;
  /** Left icon for primary action */
  icon?: React.ReactNode;
  /** Dropdown menu items */
  menuItems: SplitButtonMenuItem[];
  /** Called when a menu item is selected */
  onMenuSelect?: (item: SplitButtonMenuItem) => void;
  /** Called when the primary button is clicked */
  onAction?: () => void;
  /** Loading state for primary action */
  loading?: boolean;
  /** Class for the wrapper */
  wrapperClassName?: string;
}

const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  (
    {
      label,
      icon,
      menuItems,
      onMenuSelect,
      onAction,
      loading = false,
      disabled = false,
      variant = 'default',
      size = 'md',
      className,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLUListElement>(null);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const v = variant ?? 'default';
    const s = size ?? 'md';

    // Close on outside click
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Close on Escape
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          setFocusedIndex(-1);
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [open]);

    // Keyboard nav
    const handleMenuKeyDown = (e: React.KeyboardEvent) => {
      const enabledItems = menuItems.filter((i) => !i.disabled);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % enabledItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev <= 0 ? enabledItems.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedIndex >= 0 && enabledItems[focusedIndex]) {
          onMenuSelect?.(enabledItems[focusedIndex]);
          setOpen(false);
        }
      }
    };

    const selectItem = (item: SplitButtonMenuItem) => {
      if (item.disabled) return;
      onMenuSelect?.(item);
      setOpen(false);
    };

    const sharedBtnClasses =
      'inline-flex items-center justify-center h-full cursor-pointer select-none ' +
      'transition-colors duration-150 outline-none ' +
      'focus-visible:ring-2 focus-visible:ring-inset ' +
      'disabled:opacity-50 disabled:pointer-events-none';

    return (
      <div
        ref={wrapperRef}
        className={cn('relative inline-flex', wrapperClassName)}
      >
        <div
          className={cn(
            splitButtonVariants({ variant, size }),
            disabled && 'opacity-50 pointer-events-none',
            className
          )}
        >
          {/* Primary action */}
          <button
            ref={ref}
            type="button"
            className={cn(
              sharedBtnClasses,
              sizeActionPadding[s],
              actionClasses[v],
              'gap-2 font-medium rounded-l-[inherit]'
            )}
            disabled={disabled || loading}
            onClick={onAction}
            {...props}
          >
            {loading ? (
              <svg
                className={cn(sizeIconClasses[s], 'animate-spin')}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="60"
                  strokeDashoffset="15"
                  strokeLinecap="round"
                  className="opacity-40"
                />
              </svg>
            ) : icon ? (
              <span className={cn(sizeIconClasses[s], 'shrink-0')}>
                {icon}
              </span>
            ) : null}
            {label}
          </button>

          {/* Divider */}
          <span
            className={cn('w-px self-stretch', dividerClasses[v])}
            aria-hidden="true"
          />

          {/* Dropdown toggle */}
          <button
            type="button"
            className={cn(
              sharedBtnClasses,
              sizeTogglePadding[s],
              actionClasses[v],
              'rounded-r-[inherit]'
            )}
            disabled={disabled}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="More options"
            onClick={() => {
              setOpen(!open);
              if (!open) setFocusedIndex(0);
            }}
          >
            <ChevronDown
              className={cn(
                sizeIconClasses[s],
                'transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </button>
        </div>

        {/* Dropdown menu */}
        {open && (
          <ul
            ref={menuRef}
            role="menu"
            onKeyDown={handleMenuKeyDown}
            className={cn(
              'absolute top-full right-0 mt-1 z-50 min-w-[180px]',
              'rounded-xl overflow-hidden py-1',
              'backdrop-blur-xl border',
              'bg-white/80 border-white/40',
              'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset]',
              'dark:bg-black/60 dark:border-white/10',
              'dark:shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]',
              'animate-in fade-in-0 zoom-in-95 duration-150'
            )}
          >
            {menuItems.map((item) => {
              const enabledIdx = menuItems
                .filter((i) => !i.disabled)
                .indexOf(item);
              const isFocused = enabledIdx === focusedIndex;

              return (
                <li
                  key={item.key}
                  role="menuitem"
                  tabIndex={isFocused ? 0 : -1}
                  aria-disabled={item.disabled || undefined}
                  className={cn(
                    'flex items-center gap-3 w-full px-4 py-2.5 text-sm',
                    'cursor-pointer select-none outline-none',
                    'transition-colors duration-150',
                    item.danger
                      ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white',
                    isFocused &&
                      (item.danger
                        ? 'bg-red-50 dark:bg-red-500/10'
                        : 'bg-black/[0.04] dark:bg-white/10'),
                    item.disabled && 'opacity-50 pointer-events-none'
                  )}
                  onClick={() => selectItem(item)}
                >
                  {item.icon && (
                    <span className="h-4 w-4 shrink-0">{item.icon}</span>
                  )}
                  {item.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

SplitButton.displayName = 'SplitButton';

export { SplitButton, splitButtonVariants };
