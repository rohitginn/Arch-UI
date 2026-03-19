'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { GlassButton, type GlassButtonProps } from './glass-button';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface LoadingButtonProps extends GlassButtonProps {
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Text shown during loading — replaces children when spinnerPosition='replace' */
  loadingText?: string;
  /** Where to place the spinner relative to children */
  spinnerPosition?: 'left' | 'right' | 'replace';
}

/* ------------------------------------------------------------------ */
/*  Internal spinner — arc-based, no border trick                      */
/* ------------------------------------------------------------------ */

function ButtonArc({ className }: { className?: string }) {
  return (
    <svg
      className={cn('shrink-0', className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* Moving arc — stroke-dasharray creates a 35% arc */}
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="37.7"
        strokeDashoffset="28"
        style={{
          transformOrigin: '8px 8px',
          animation: 'lb-spin 0.9s linear infinite',
        }}
      />
      <style>{`
        @keyframes lb-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Size → spinner dimension map                                       */
/* ------------------------------------------------------------------ */

const spinnerSizeMap: Record<string, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-[18px] h-[18px]',
  xl: 'w-5 h-5',
  icon: 'w-4 h-4',
  'icon-sm': 'w-3.5 h-3.5',
  'icon-lg': 'w-[18px] h-[18px]',
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * LoadingButton — GlassButton with an integrated loading spinner.
 *
 * The spinner is an SVG arc (not a cheap border-trick or bounce animation).
 * Width is locked during the loading state to prevent layout shift.
 * Disabled during loading with `aria-busy`.
 *
 * Spinner positions:
 * - `left`    → spinner + children (side by side)
 * - `right`   → children + spinner (side by side)
 * - `replace` → spinner only (children swap to loadingText or hidden)
 *
 * @example
 * ```tsx
 * <LoadingButton isLoading={submitting} loadingText="Saving..." variant="solid">
 *   Save changes
 * </LoadingButton>
 *
 * <LoadingButton isLoading={uploading} spinnerPosition="right" variant="primary">
 *   Upload
 * </LoadingButton>
 * ```
 */
const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      isLoading = false,
      loadingText,
      spinnerPosition = 'left',
      size = 'md',
      disabled,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    /* Lock the button width the moment loading begins so the layout */
    /* doesn't shift when children are replaced by the spinner.       */
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLButtonElement>) ?? innerRef;

    const [lockedWidth, setLockedWidth] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
      if (isLoading && combinedRef.current) {
        const w = combinedRef.current.getBoundingClientRect().width;
        setLockedWidth(Math.ceil(w));
      } else {
        setLockedWidth(undefined);
      }
    }, [isLoading]);

    const spinnerClass = spinnerSizeMap[size ?? 'md'] ?? 'w-4 h-4';
    const isDisabled = disabled || isLoading;

    /* Spinner node */
    const spinner = isLoading ? (
      <ButtonArc
        className={cn(
          spinnerClass,
          /* Clip-based entrance — slides in from the side, no jump */
          'animate-[lb-appear_180ms_cubic-bezier(0.4,0,0.2,1)_both]',
          '[&>style]:hidden'
        )}
      />
    ) : null;

    /* Children node — hides with a clip-path exit when loading */
    const label =
      spinnerPosition === 'replace' ? (
        isLoading ? (
          loadingText ? (
            <span
              className="animate-[lb-appear_180ms_cubic-bezier(0.4,0,0.2,1)_both]"
            >
              {loadingText}
            </span>
          ) : null
        ) : (
          children
        )
      ) : (
        children
      );

    return (
      <>
        <style>{`
          @keyframes lb-appear {
            from { opacity: 0; transform: scale(0.75); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>

        <GlassButton
          ref={combinedRef}
          size={size}
          disabled={isDisabled}
          aria-busy={isLoading}
          aria-disabled={isDisabled}
          className={cn(
            /* Prevent width collapse by transitioning with a min-width hold */
            'transition-[min-width,box-shadow,transform,background-color,border-color]',
            isLoading && 'cursor-wait',
            className
          )}
          style={{
            ...(lockedWidth != null ? { minWidth: lockedWidth } : {}),
            ...style,
          }}
          {...props}
        >
          {spinnerPosition === 'left' && (
            <>
              {spinner}
              {label}
            </>
          )}

          {spinnerPosition === 'right' && (
            <>
              {label}
              {spinner}
            </>
          )}

          {spinnerPosition === 'replace' && (
            <>
              {spinner}
              {label}
            </>
          )}
        </GlassButton>
      </>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';

export { LoadingButton };
