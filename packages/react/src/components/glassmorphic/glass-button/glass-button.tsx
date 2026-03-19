'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

/**
 * Glass Button Variants - Premium Edition
 * Enhanced with refined padding, hover elevation, and premium interactions
 */
const glassButtonVariants = cva(
  // Base styles - Premium glassmorphism with solid light theme fallback
  [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-xl',
    'border',
    'cursor-pointer',
    'select-none',
    // Transition for all properties
    'transition-all',
    'duration-200',
    // Refined easing curve (0.4, 0, 0.2, 1) per design spec
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
    // Dark theme gets glassmorphism
    'dark:backdrop-blur-md',
    // Focus styles - WCAG AA compliant ring (3:1 contrast minimum)
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    // Disabled styles
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
    // Active press effect
    'active:scale-[0.97]',
    'active:transition-transform',
    'active:duration-75',
  ],
  {
    variants: {
      variant: {
        // DEFAULT: Frosted glass in light, glass in dark
        default: [
          // Light theme - Frosted glass with refined borders
          'bg-white/80',
          'backdrop-blur-md',
          'border-black/[0.08]',
          'text-slate-900',
          'shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.5)_inset]',
          'hover:bg-white/90',
          'hover:border-black/[0.12]',
          'hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.6)_inset]',
          'hover:-translate-y-[1px]',
          'active:bg-white',

          'focus-visible:ring-slate-500/30',
          'focus-visible:ring-offset-white',
          // Dark theme - Glass effect with explicit white text
          'dark:bg-white/[0.08]',
          'dark:border-white/[0.12]',
          'dark:text-white',
          'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
          'dark:hover:bg-white/[0.12]',
          'dark:hover:border-white/[0.2]',
          'dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]',
          'dark:focus-visible:ring-white/70',
          'dark:focus-visible:ring-offset-slate-900',
        ],
        // PRIMARY: Semantic primary color
        primary: [
          // Light theme - Vibrant with inner highlight
          'bg-primary',
          'border-primary',
          'text-primary-foreground',
          'shadow-[0_2px_8px_rgba(var(--primary),0.25),0_1px_0_rgba(255,255,255,0.2)_inset]',
          'hover:bg-primary/90',
          'hover:border-primary',
          'hover:shadow-[0_4px_16px_rgba(var(--primary),0.4),0_1px_0_rgba(255,255,255,0.25)_inset]',
          'hover:-translate-y-[1px]',
          'active:bg-primary',

          'focus-visible:ring-primary',
          'focus-visible:ring-offset-background',
          // Dark theme - Translucent primary
          'dark:bg-primary/80',
          'dark:border-primary/50',
          'dark:text-primary-foreground',
          'dark:hover:bg-primary/90',
          'dark:hover:border-primary/60',
          'dark:hover:shadow-[0_4px_16px_rgba(var(--primary),0.3)]',
          'dark:focus-visible:ring-primary',
          'dark:focus-visible:ring-offset-background',
        ],
        // SECONDARY: Semantic secondary color
        secondary: [
          'bg-secondary/80',
          'backdrop-blur-sm',
          'border-secondary/20',
          'text-secondary-foreground',
          'shadow-sm',
          'hover:bg-secondary/90',
          'hover:border-secondary/30',
          'hover:shadow-md',
          'hover:-translate-y-[1px]',
          'active:bg-secondary',

          'focus-visible:ring-secondary',
          'focus-visible:ring-offset-background',
          // Dark theme - Glass style
          'dark:bg-secondary/40',
          'dark:border-secondary/50',
          'dark:text-secondary-foreground',
          'dark:hover:bg-secondary/60',
          'dark:hover:border-secondary/60',
        ],
        // DESTRUCTIVE (Danger): Semantic destructive color
        danger: [
          'bg-destructive',
          'border-destructive',
          'text-destructive-foreground',
          'shadow-[0_2px_8px_rgba(var(--destructive),0.25)]',
          'hover:bg-destructive/90',
          'hover:border-destructive',
          'hover:shadow-[0_4px_16px_rgba(var(--destructive),0.4)]',
          'hover:-translate-y-[1px]',
          'active:bg-destructive',

          'focus-visible:ring-destructive',
          'focus-visible:ring-offset-background',
          // Dark theme - Glass style
          'dark:bg-destructive/40',
          'dark:border-destructive/50',
          'dark:text-destructive-foreground',
          'dark:hover:bg-destructive/60',
          'dark:hover:border-destructive/60',
          'dark:hover:shadow-[0_4px_16px_rgba(var(--destructive),0.3)]',
        ],
        // SUCCESS: Semantic green
        success: [
          'bg-emerald-600',
          'border-emerald-700',
          'text-white',
          'shadow-[0_2px_8px_rgba(16,185,129,0.25)]',
          'hover:bg-emerald-700',
          'hover:border-emerald-800',
          'hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)]',
          'hover:-translate-y-[1px]',
          'active:bg-emerald-800',

          'focus-visible:ring-emerald-500',
          'focus-visible:ring-offset-white',
          'dark:bg-emerald-500/20',
          'dark:border-emerald-400/30',
          'dark:text-emerald-50',
          'dark:hover:bg-emerald-500/30',
          'dark:hover:border-emerald-400/40',
          'dark:focus-visible:ring-emerald-400',
          'dark:focus-visible:ring-offset-slate-900',
        ],
        // WARNING: Semantic amber
        warning: [
          'bg-amber-500',
          'border-amber-600',
          'text-white',
          'shadow-[0_2px_8px_rgba(245,158,11,0.25)]',
          'hover:bg-amber-600',
          'hover:border-amber-700',
          'hover:shadow-[0_4px_16px_rgba(245,158,11,0.4)]',
          'hover:-translate-y-[1px]',
          'active:bg-amber-700',

          'focus-visible:ring-amber-500',
          'focus-visible:ring-offset-white',
          'dark:bg-amber-500/20',
          'dark:border-amber-400/30',
          'dark:text-amber-50',
          'dark:hover:bg-amber-500/30',
          'dark:hover:border-amber-400/40',
          'dark:focus-visible:ring-amber-400',
          'dark:focus-visible:ring-offset-slate-900',
        ],
        // GHOST: Minimal styling
        ghost: [
          'bg-transparent',
          'border-transparent',
          'text-slate-700',
          'dark:text-slate-300',
          'shadow-none',
          'hover:bg-black/[0.05]',
          'hover:text-slate-900',
          'dark:hover:bg-white/[0.1]',
          'dark:hover:text-white',
          'active:bg-black/[0.1]',

          'focus-visible:ring-slate-400',
          'focus-visible:ring-offset-0',
        ],
        // OUTLINE: Clear border with refined interactions
        outline: [
          'bg-transparent',
          'border-black/[0.15]',
          'text-slate-900',
          'hover:bg-black/[0.04]',
          'hover:border-black/[0.3]',
          'hover:-translate-y-[1px]',
          'active:bg-black/[0.08]',

          'focus-visible:ring-slate-400',
          'focus-visible:ring-offset-0',
          // Dark
          'dark:border-white/[0.2]',
          'dark:text-white',
          'dark:hover:bg-white/[0.1]',
          'dark:hover:border-white/[0.3]',
        ],
        // SOLID (Custom)
        solid: [
          'bg-slate-900',
          'border-slate-900',
          'text-white',
          'shadow-md',
          'hover:bg-slate-800',
          'hover:shadow-lg',
          'hover:-translate-y-[1px]',

          'focus-visible:ring-slate-900',
          'focus-visible:ring-offset-white',
          'dark:bg-white',
          'dark:border-white',
          'dark:text-slate-900',
          'dark:hover:bg-slate-200',
        ],
      },
      size: {
        sm: ['h-8', 'px-3.5', 'text-xs', 'font-semibold', 'gap-1.5', 'rounded-lg'],
        md: ['h-10', 'px-5', 'text-sm', 'font-medium', 'gap-2', 'rounded-xl'],
        lg: ['h-12', 'px-7', 'text-base', 'font-medium', 'gap-2.5', 'rounded-xl'],
        xl: ['h-14', 'px-9', 'text-lg', 'font-medium', 'gap-3', 'rounded-2xl'],
        icon: ['h-10', 'w-10', 'rounded-xl', 'p-0', 'justify-center'],
        'icon-sm': ['h-8', 'w-8', 'rounded-lg', 'p-0', 'justify-center'],
        'icon-lg': ['h-12', 'w-12', 'rounded-xl', 'p-0', 'justify-center'],
      },
      glow: {
        true: [
          'shadow-[0_0_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]',
          'hover:shadow-[0_0_30px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]',
          'dark:shadow-[0_0_20px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]',
          'dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.15)]',
        ],
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        glow: true,
        className: [
          'shadow-[0_0_20px_rgba(var(--primary),0.3)]',
          'hover:shadow-[0_0_30px_rgba(var(--primary),0.5),0_4px_16px_rgba(var(--primary),0.3)]',
        ],
      },
      {
        variant: 'success',
        glow: true,
        className: [
          'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
          'hover:shadow-[0_0_30px_rgba(16,185,129,0.5),0_4px_16px_rgba(16,185,129,0.3)]',
        ],
      },
      {
        variant: 'danger',
        glow: true,
        className: [
          'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
          'hover:shadow-[0_0_30px_rgba(239,68,68,0.5),0_4px_16px_rgba(239,68,68,0.3)]',
        ],
      },
      {
        variant: 'secondary',
        glow: true,
        className: [
          'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
          'hover:shadow-[0_0_30px_rgba(168,85,247,0.5),0_4px_16px_rgba(168,85,247,0.3)]',
        ],
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      glow: false,
      fullWidth: false,
    },
  }
);

/**
 * Loading Spinner Component - Refined
 */
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="presentation"
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      className="opacity-80"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof glassButtonVariants> {
  /** Show loading spinner */
  loading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Enable magnetic cursor effect */
  magnetic?: boolean;
  /** Enable ripple effect on click */
  ripple?: boolean;
  /** Enable shimmer border animation on hover */
  shimmer?: boolean;
}

/**
 * GlassButton - A premium glassmorphic button component
 * 
 * Features:
 * - Visible frosted glass effect
 * - Hover elevation with lift
 * - Multiple color variants
 * - Loading state with spinner
 * - Magnetic cursor effect
 * - Ripple click effect
 * - Shimmer border animation
 * 
 * @example
 * ```tsx
 * <GlassButton variant="primary" glow>
 *   Click me
 * </GlassButton>
 * ```
 */
const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      fullWidth,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      magnetic = false,
      ripple = false,
      shimmer = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
    const rippleTimeoutsRef = React.useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

    // Merge refs properly
    const mergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Cleanup ripple timeouts on unmount
    React.useEffect(() => {
      const timeouts = rippleTimeoutsRef.current;
      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
        timeouts.clear();
      };
    }, []);

    // Magnetic effect
    React.useEffect(() => {
      if (!magnetic) return;

      const button = buttonRef.current;
      if (!button) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      };

      const handleMouseLeave = () => {
        button.style.transform = 'translate(0, 0)';
        button.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      };

      const handleMouseEnter = () => {
        button.style.transition = 'transform 0.1s ease-out';
      };

      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('mouseenter', handleMouseEnter);
      };
    }, [magnetic]);

    // Ripple effect handler with proper cleanup
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);

        const timeout = setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
          rippleTimeoutsRef.current.delete(timeout);
        }, 600);
        rippleTimeoutsRef.current.add(timeout);
      }

      onClick?.(e);
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={mergedRef}
        className={cn(
          glassButtonVariants({ variant, size, glow, fullWidth }),
          // Stacking context isolation - ensures z-index works correctly
          'isolate',
          magnetic && 'will-change-transform',
          ripple && 'overflow-hidden',
          shimmer && 'group overflow-hidden',
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        onClick={handleClick}
        {...props}
      >
        {/* Decorative Layer: Ripple effects - z-0 to render below content */}
        {ripple &&
          ripples.map((r) => (
            <span
              key={r.id}
              className={cn(
                'absolute',
                'z-0',
                'rounded-full',
                'bg-black/10',
                'dark:bg-white/30',
                'animate-[ripple_0.6s_ease-out]',
                'pointer-events-none'
              )}
              style={{
                left: r.x,
                top: r.y,
                width: 0,
                height: 0,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

        {/* Decorative Layer: Shimmer border effect - z-0 to render below content */}
        {shimmer && (
          <div
            className={cn(
              'absolute',
              'z-0',
              'inset-0',
              'rounded-xl',
              'opacity-0',
              'group-hover:opacity-100',
              'transition-opacity',
              'duration-300',
              'pointer-events-none',
              'overflow-hidden'
            )}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite linear',
              }}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Content Layer: z-10 wrapper ensures all content renders above decorative layers */}
        <span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">
          {/* Loading spinner */}
          {loading && (
            <Spinner
              className={cn(
                'h-4 w-4',
                children && 'mr-2'
              )}
            />
          )}

          {/* Left icon */}
          {!loading && leftIcon && (
            <span className="shrink-0 -ml-0.5">{leftIcon}</span>
          )}

          {/* Button content */}
          <span className="truncate">{children}</span>

          {/* Right icon */}
          {!loading && rightIcon && (
            <span className="shrink-0 -mr-0.5">{rightIcon}</span>
          )}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export { GlassButton, glassButtonVariants };
