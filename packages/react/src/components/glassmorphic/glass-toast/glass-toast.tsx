'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const glassToastVariants = cva(
  [
    'relative flex items-start gap-3 p-4 rounded-xl shadow-lg',
    'border backdrop-blur-sm',
    'animate-in slide-in-from-right-full fade-in duration-300',
    'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out data-[state=closed]:duration-200',
    'transition-all',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-surface-bg',
          'border-surface-border',
          'text-text-primary',
        ],
        success: [
          'bg-emerald-50/90 dark:bg-emerald-900/30',
          'border-emerald-200 dark:border-emerald-800',
          'text-emerald-900 dark:text-emerald-100',
        ],
        error: [
          'bg-red-50/90 dark:bg-red-900/30',
          'border-red-200 dark:border-red-800',
          'text-red-900 dark:text-red-100',
        ],
        warning: [
          'bg-amber-50/90 dark:bg-amber-900/30',
          'border-amber-200 dark:border-amber-800',
          'text-amber-900 dark:text-amber-100',
        ],
        info: [
          'bg-blue-50/90 dark:bg-blue-900/30',
          'border-blue-200 dark:border-blue-800',
          'text-blue-900 dark:text-blue-100',
        ],
        glass: [
          'bg-white/60',
          'border-white/40',
          'text-slate-900',
          'dark:bg-black/40',
          'dark:border-white/10',
          'dark:text-white',
          'backdrop-blur-xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const toastIconVariants = {
  default: null,
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  glass: null,
};

const toastIconColorVariants = {
  default: 'text-text-muted',
  success: 'text-emerald-600 dark:text-emerald-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-amber-600 dark:text-amber-400',
  info: 'text-blue-600 dark:text-blue-400',
  glass: 'text-text-secondary',
};

export interface GlassToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassToastVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  closable?: boolean;
}

const GlassToast = React.forwardRef<HTMLDivElement, GlassToastProps>(
  ({
    className,
    variant = 'default',
    title,
    description,
    icon,
    action,
    onClose,
    duration,
    closable = true,
    ...props
  }, ref) => {
    const [state, setState] = React.useState<'open' | 'closed'>('open');
    const timerRef = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
      if (duration && duration > 0) {
        timerRef.current = setTimeout(() => {
          handleClose();
        }, duration);
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration]);

    const handleClose = () => {
      setState('closed');
      setTimeout(() => {
        onClose?.();
      }, 200);
    };

    const IconComponent = icon === undefined ? toastIconVariants[variant || 'default'] : null;

    return (
      <div
        ref={ref}
        data-state={state}
        role="alert"
        className={cn(glassToastVariants({ variant }), className)}
        {...props}
      >
        {/* Icon */}
        {(icon || IconComponent) && (
          <div className={cn('flex-shrink-0 mt-0.5', toastIconColorVariants[variant || 'default'])}>
            {icon || (IconComponent && <IconComponent className="w-5 h-5" />)}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm leading-tight">
              {title}
            </p>
          )}
          {description && (
            <p className={cn(
              'text-sm mt-1 opacity-90',
              !title && 'leading-tight'
            )}>
              {description}
            </p>
          )}
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>

        {/* Close button */}
        {closable && (
          <button
            onClick={handleClose}
            className={cn(
              'flex-shrink-0 p-1 rounded-lg',
              'hover:bg-black/5 dark:hover:bg-white/10',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900'
            )}
            aria-label="Close notification"
          >
            <X className="w-4 h-4 opacity-60" />
          </button>
        )}

        {/* Progress bar for duration */}
        {duration && duration > 0 && (
          <div
            className={cn(
              'absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-xl',
              'animate-[toast-progress_linear_forwards]'
            )}
            style={{
              animationDuration: `${duration}ms`,
            }}
          />
        )}
      </div>
    );
  }
);

GlassToast.displayName = 'GlassToast';

// Toast container with positioning
const toastContainerPositions = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

export interface ToastData extends Omit<GlassToastProps, 'onClose'> {
  id: string;
}

export interface GlassToastContainerProps {
  position?: keyof typeof toastContainerPositions;
  toasts: ToastData[];
  onRemove: (id: string) => void;
  maxVisible?: number;
}

const GlassToastContainer = ({
  position = 'bottom-right',
  toasts,
  onRemove,
  maxVisible = 5,
}: GlassToastContainerProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const visibleToasts = toasts.slice(-maxVisible);

  return createPortal(
    <div
      className={cn(
        'fixed z-[100] flex flex-col gap-2 pointer-events-none',
        toastContainerPositions[position]
      )}
      style={{
        maxWidth: 'min(420px, calc(100vw - 32px))',
      }}
    >
      {visibleToasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <GlassToast
            {...toast}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>,
    document.body
  );
};

GlassToastContainer.displayName = 'GlassToastContainer';

// Toast hook for easy state management
type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'glass';

interface UseToastOptions {
  maxToasts?: number;
  defaultDuration?: number;
}

export function useGlassToast(options: UseToastOptions = {}) {
  const { maxToasts = 5, defaultDuration = 5000 } = options;
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const toastIdCounter = React.useRef(0);

  const addToast = React.useCallback((
    props: Omit<GlassToastProps, 'onClose'> | string,
    type?: ToastType
  ) => {
    const id = `toast-${++toastIdCounter.current}`;
    const toastProps: Omit<GlassToastProps, 'onClose'> = typeof props === 'string'
      ? { description: props, variant: type || 'default', duration: defaultDuration }
      : { duration: defaultDuration, ...props, variant: props.variant || type || 'default' };

    setToasts((prev) => {
      const newToasts = [...prev, { id, ...toastProps }];
      return newToasts.slice(-maxToasts);
    });

    return id;
  }, [maxToasts, defaultDuration]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const toast = React.useMemo(() => ({
    show: (props: Omit<GlassToastProps, 'onClose'> | string) => addToast(props),
    success: (props: Omit<GlassToastProps, 'onClose' | 'variant'> | string) => addToast(props, 'success'),
    error: (props: Omit<GlassToastProps, 'onClose' | 'variant'> | string) => addToast(props, 'error'),
    warning: (props: Omit<GlassToastProps, 'onClose' | 'variant'> | string) => addToast(props, 'warning'),
    info: (props: Omit<GlassToastProps, 'onClose' | 'variant'> | string) => addToast(props, 'info'),
    dismiss: removeToast,
    dismissAll: clearAll,
  }), [addToast, removeToast, clearAll]);

  return { toasts, toast, removeToast };
}

// @keyframes toast-progress {
//   from { width: 100%; }
//   to { width: 0%; }
// }

export { GlassToast, GlassToastContainer, glassToastVariants };
