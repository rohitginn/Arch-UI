'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { GlassButton, type GlassButtonProps } from './glass-button';

const positionClasses = {
  'bottom-right': 'fixed bottom-6 right-6',
  'bottom-left': 'fixed bottom-6 left-6',
  'bottom-center': 'fixed bottom-6 left-1/2 -translate-x-1/2',
};

export interface FloatingActionButtonProps
  extends Omit<GlassButtonProps, 'size' | 'fullWidth' | 'children'> {
  /** The icon element */
  icon: React.ReactNode;
  /** Optional label — when present renders an extended FAB with text */
  label?: string;
  /** Screen position */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /** Pulsing attention animation */
  pulse?: boolean;
  /** Accessible label — REQUIRED */
  'aria-label': string;
}

/**
 * FloatingActionButton (FAB) — A large circular button fixed to a viewport corner.
 *
 * Primary mobile action button. Supports an optional `label` for extended FAB mode.
 * Features elevated shadow for floating appearance and optional pulse animation.
 *
 * @example
 * ```tsx
 * <FloatingActionButton
 *   icon={<Plus />}
 *   aria-label="Create new item"
 *   variant="primary"
 * />
 *
 * <FloatingActionButton
 *   icon={<Plus />}
 *   label="New task"
 *   aria-label="Create new task"
 *   variant="primary"
 *   position="bottom-right"
 * />
 * ```
 */
const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  (
    {
      icon,
      label,
      position = 'bottom-right',
      pulse = false,
      variant = 'primary',
      className,
      ...props
    },
    ref
  ) => {
    const isExtended = Boolean(label);

    return (
      <GlassButton
        ref={ref}
        variant={variant}
        size={isExtended ? 'lg' : 'icon-lg'}
        className={cn(
          positionClasses[position],
          'z-50',
          // Circular or pill shape
          isExtended ? 'rounded-full px-6' : 'rounded-full',
          // Elevated floating shadow
          'shadow-[0_8px_24px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1)]',
          'dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_8px_rgba(0,0,0,0.3)]',
          'hover:shadow-[0_12px_32px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.12)]',
          'dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_6px_12px_rgba(0,0,0,0.35)]',
          // Pulse keyframe animation
          pulse && 'animate-[fab-pulse_2s_ease-in-out_infinite]',
          className
        )}
        {...props}
      >
        <span className={cn(
          'shrink-0',
          isExtended ? 'h-5 w-5' : 'h-6 w-6'
        )}>
          {icon}
        </span>
        {label && (
          <span className="ml-2 font-semibold">{label}</span>
        )}
      </GlassButton>
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';

export { FloatingActionButton };
