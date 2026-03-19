'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface LinkButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button content */
  children: React.ReactNode;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Icon before text */
  leftIcon?: React.ReactNode;
  /** Icon after text */
  rightIcon?: React.ReactNode;
}

const sizeClasses = {
  sm: 'text-xs gap-1',
  md: 'text-sm gap-1.5',
  lg: 'text-base gap-2',
};

/**
 * LinkButton — Visually rendered as a hyperlink but semantically a `<button>`.
 *
 * No background, no border, no shadow. Text with underline-on-hover.
 * Use for non-navigation actions that should look like links.
 *
 * Follows the Interactive State Contract:
 * - Hover: underline + accent color
 * - Active: scale-[0.97]
 * - Focus: ring-2 ring-offset-2
 * - Disabled: opacity-40, no hover
 *
 * @example
 * ```tsx
 * <LinkButton onClick={handleCancel}>Cancel</LinkButton>
 * <LinkButton size="sm" leftIcon={<ArrowLeft />} onClick={goBack}>Go back</LinkButton>
 * ```
 */
const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ children, size = 'md', leftIcon, rightIcon, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-medium',
          'bg-transparent border-none shadow-none',
          'cursor-pointer select-none',
          // Underline behaviour
          'underline-offset-4 decoration-1',
          'hover:underline',
          // Color — accent aware
          'text-[var(--glass-accent,#3b82f6)]',
          'hover:text-[var(--glass-accent-hover,#2563eb)]',
          // Transition
          'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
          // Active press
          'active:scale-[0.97] active:transition-transform active:duration-75',
          // Focus ring
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-offset-2',
          'focus-visible:ring-[var(--glass-accent,#3b82f6)]',
          'focus-visible:ring-offset-[var(--surface-bg,#ffffff)]',
          'dark:focus-visible:ring-offset-[var(--surface-bg,#09090b)]',
          // Disabled
          'disabled:opacity-40',
          'disabled:pointer-events-none',
          'disabled:cursor-not-allowed',
          // Size
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

LinkButton.displayName = 'LinkButton';

export { LinkButton };
