'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

const glassAlertVariants = cva(
  [
    'relative w-full rounded-xl',
    'flex items-start gap-3',
    'border',
    // Organic Smoothness for hover states
    'transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
    'hover:-translate-y-[1px] hover:shadow-lg',
    // Entrance animation using a snappy spring-like keyframe
    'animate-[slideInDown_0.4s_cubic-bezier(0.175,0.885,0.32,1.27)_both]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-surface-elevated border-surface-border',
          'text-text-primary',
          'border-l-4 border-l-border-strong',
        ],
        info: [
          'bg-surface-elevated border-form-info/20',
          'text-form-info',
          'border-l-4 border-l-form-info',
        ],
        success: [
          'bg-surface-elevated border-form-success/20',
          'text-form-success',
          'border-l-4 border-l-form-success',
        ],
        warning: [
          'bg-surface-elevated border-form-warning/20',
          'text-form-warning',
          'border-l-4 border-l-form-warning',
        ],
        error: [
          'bg-surface-elevated border-form-error/20',
          'text-form-error',
          'border-l-4 border-l-form-error',
        ],
        glass: [
          'bg-surface-glass backdrop-blur-2xl',
          'border-surface-glass-border',
          'text-text-primary',
          'shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]', // Luxury Minimal edge
          'border-l-4 border-l-white/40 dark:border-l-white/20',
        ],
      },
      size: {
        sm: 'p-3 text-sm gap-2',
        md: 'p-4 text-sm gap-3',
        lg: 'p-5 text-base gap-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const iconMap = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  glass: Info,
};

const iconColors = {
  default: 'text-text-secondary',
  info: 'text-form-info',
  success: 'text-form-success',
  warning: 'text-form-warning',
  error: 'text-form-error',
  glass: 'text-text-secondary',
};

export interface GlassAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassAlertVariants> {
  icon?: React.ReactNode;
  showIcon?: boolean;
  title?: string;
  description?: string;
  dismissible?: boolean;
  autoDismiss?: number;
  onDismiss?: () => void;
}

const GlassAlert = React.forwardRef<HTMLDivElement, GlassAlertProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    icon,
    showIcon = true,
    title,
    description,
    dismissible = false,
    autoDismiss = 0,
    onDismiss,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const IconComponent = iconMap[variant || 'default'];
    const iconColorClass = iconColors[variant || 'default'];

    const handleDismiss = React.useCallback(() => {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, 400); // Wait for exit animation
      return () => clearTimeout(timer);
    }, [onDismiss]);

    React.useEffect(() => {
      if (autoDismiss > 0 && isVisible) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, autoDismiss);
        return () => clearTimeout(timer);
      }
    }, [autoDismiss, isVisible, handleDismiss]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          glassAlertVariants({ variant, size }),
          // Exit animation
          isAnimating && 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
          className
        )}
        {...props}
      >
        {/* Deep ambient glow layer for glass variants */}
        {variant === 'glass' && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent mix-blend-overlay pointer-events-none rounded-xl" />
        )}

        {/* Icon */}
        {showIcon && (
          <div className={cn('shrink-0 mt-0.5 relative z-10', iconColorClass)}>
            {icon || <IconComponent className={cn(
              size === 'sm' && 'h-4 w-4',
              size === 'md' && 'h-5 w-5',
              size === 'lg' && 'h-6 w-6',
              !size && 'h-5 w-5'
            )} />}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 relative z-10">
          {title && (
            <h5 className={cn(
              'font-medium tracking-tight text-text-primary',
              size === 'sm' && 'text-sm mb-0.5',
              size === 'md' && 'text-sm mb-1',
              size === 'lg' && 'text-base mb-1',
            )}>
              {title}
            </h5>
          )}
          <div className={cn(
            'text-text-secondary leading-relaxed',
            size === 'sm' && 'text-xs',
            size === 'lg' && 'text-sm',
          )}>
            {description || children}
          </div>
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              'shrink-0 rounded-md p-1.5 -mr-1.5 -mt-1 relative z-10',
              'text-text-muted hover:text-text-primary',
              'transition-all duration-300',
              'hover:bg-interactive-bg/50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2',
              'active:scale-95'
            )}
            aria-label="Dismiss alert"
          >
            <X className={cn(
              size === 'sm' && 'h-3.5 w-3.5',
              size === 'md' && 'h-4 w-4',
              size === 'lg' && 'h-5 w-5',
              !size && 'h-4 w-4'
            )} />
          </button>
        )}
      </div>
    );
  }
);

GlassAlert.displayName = 'GlassAlert';

// Add keyframes to tailwind (needs to be in global CSS or tailwind config)
// @keyframes slideInDown {
//   0% { transform: translateY(-1rem); opacity: 0; }
//   100% { transform: translateY(0); opacity: 1; }
// }

export { GlassAlert, glassAlertVariants };
