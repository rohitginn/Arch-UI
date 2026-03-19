'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassSpinnerVariants = cva(
  [
    'inline-flex items-center justify-center',
  ],
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface GlassSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassSpinnerVariants> {
  variant?: 'ring' | 'dots' | 'pulse' | 'bars' | 'orbit';
  color?: 'default' | 'primary' | 'white' | 'current';
  label?: string;
}

const spinnerColorClasses = {
  default: 'text-text-secondary',
  primary: 'text-blue-600 dark:text-blue-400',
  white: 'text-white',
  current: 'text-current',
};

const GlassSpinner = React.forwardRef<HTMLDivElement, GlassSpinnerProps>(
  ({
    className,
    size,
    variant = 'ring',
    color = 'primary',
    label = 'Loading...',
    ...props
  }, ref) => {
    const colorClass = spinnerColorClasses[color];

    // Ring spinner (default)
    if (variant === 'ring') {
      return (
        <div
          ref={ref}
          role="status"
          aria-label={label}
          className={cn(glassSpinnerVariants({ size }), className)}
          {...props}
        >
          <svg
            className={cn('animate-spin', colorClass)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="sr-only">{label}</span>
        </div>
      );
    }

    // Dots spinner
    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          role="status"
          aria-label={label}
          className={cn(glassSpinnerVariants({ size }), 'gap-1', className)}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'w-1.5 h-1.5 rounded-full animate-bounce',
                colorClass,
                'bg-current'
              )}
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.6s',
              }}
            />
          ))}
          <span className="sr-only">{label}</span>
        </div>
      );
    }

    // Pulse spinner
    if (variant === 'pulse') {
      return (
        <div
          ref={ref}
          role="status"
          aria-label={label}
          className={cn(glassSpinnerVariants({ size }), className)}
          {...props}
        >
          <span
            className={cn(
              'w-full h-full rounded-full animate-ping',
              colorClass,
              'bg-current opacity-75'
            )}
          />
          <span className="sr-only">{label}</span>
        </div>
      );
    }

    // Bars spinner
    if (variant === 'bars') {
      return (
        <div
          ref={ref}
          role="status"
          aria-label={label}
          className={cn(glassSpinnerVariants({ size }), 'gap-0.5 items-end', className)}
          {...props}
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                'w-1 rounded-sm',
                colorClass,
                'bg-current',
                'animate-[bars_1.2s_ease-in-out_infinite]'
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
                height: '60%',
              }}
            />
          ))}
          <span className="sr-only">{label}</span>
        </div>
      );
    }

    // Orbit spinner
    if (variant === 'orbit') {
      return (
        <div
          ref={ref}
          role="status"
          aria-label={label}
          className={cn(
            glassSpinnerVariants({ size }),
            'relative',
            className
          )}
          {...props}
        >
          <span
            className={cn(
              'absolute w-full h-full rounded-full border-2 border-current opacity-20',
              colorClass
            )}
          />
          <span
            className={cn(
              'absolute w-2 h-2 rounded-full',
              colorClass,
              'bg-current',
              'animate-[orbit_1s_linear_infinite]',
              'top-0 left-1/2 -translate-x-1/2 origin-[50%_calc(50%+var(--spinner-size)/2)]'
            )}
            style={{
              '--spinner-size': '100%',
            } as React.CSSProperties}
          />
          <span className="sr-only">{label}</span>
        </div>
      );
    }

    return null;
  }
);

GlassSpinner.displayName = 'GlassSpinner';

// Loading overlay component
export interface GlassLoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  blur?: boolean;
  spinnerProps?: GlassSpinnerProps;
  message?: string;
}

const GlassLoadingOverlay = React.forwardRef<HTMLDivElement, GlassLoadingOverlayProps>(
  ({ visible = true, blur = true, spinnerProps, message, className, ...props }, ref) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-0 z-50 flex flex-col items-center justify-center gap-3',
          blur ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm' : 'bg-white/80 dark:bg-slate-900/80',
          'transition-opacity duration-300',
          className
        )}
        {...props}
      >
        <GlassSpinner size="lg" {...spinnerProps} />
        {message && (
          <p className="text-sm font-medium text-text-secondary animate-pulse">
            {message}
          </p>
        )}
      </div>
    );
  }
);

GlassLoadingOverlay.displayName = 'GlassLoadingOverlay';

// Button loading spinner (inline)
export interface GlassButtonSpinnerProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const GlassButtonSpinner = ({ size = 'sm', className }: GlassButtonSpinnerProps) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  };

  return (
    <svg
      className={cn('animate-spin', sizeClasses[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

GlassButtonSpinner.displayName = 'GlassButtonSpinner';

// @keyframes bars {
//   0%, 40%, 100% { transform: scaleY(0.4); }
//   20% { transform: scaleY(1); }
// }
// @keyframes orbit {
//   0% { transform: translateX(-50%) rotate(0deg) translateY(-50%); }
//   100% { transform: translateX(-50%) rotate(360deg) translateY(-50%); }
// }

export { GlassSpinner, GlassLoadingOverlay, GlassButtonSpinner, glassSpinnerVariants };
