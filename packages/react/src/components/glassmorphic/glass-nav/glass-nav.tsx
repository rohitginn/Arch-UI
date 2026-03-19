'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

/**
 * Glass Navigation Variants with premium shiny borders
 */
const glassNavVariants = cva(
  [
    'relative',
    'transition-all',
    'duration-300',
    'ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    'rounded-2xl',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white/70',
          'dark:bg-black/60',
          'backdrop-blur-xl',
          // Shiny border effect (like GlassCard)
          'border',
          'border-t-white/60',
          'border-l-white/30',
          'border-r-white/20',
          'border-b-black/[0.06]',
          'dark:border-t-white/20',
          'dark:border-l-white/10',
          'dark:border-r-white/5',
          'dark:border-b-white/[0.06]',
          // Premium shadow with inner glow
          'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)]',
          'dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
        ],
        floating: [
          'bg-white/80',
          'dark:bg-black/80',
          'backdrop-blur-2xl',
          'border',
          'border-t-white/80',
          'border-l-white/50',
          'border-r-white/40',
          'border-b-black/[0.08]',
          'dark:border-t-white/25',
          'dark:border-l-white/15',
          'dark:border-r-white/10',
          'dark:border-b-white/[0.08]',
          'shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6)]',
          'dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]',
        ],
        solid: [
          'bg-white',
          'dark:bg-slate-900',
          'border',
          'border-slate-200 dark:border-slate-800',
          'shadow-sm',
        ],
        transparent: [
          'bg-transparent',
          'backdrop-blur-none',
          'border-transparent',
          'shadow-none',
        ],
      },
      position: {
        static: 'relative',
        sticky: 'sticky top-0 z-50',
        fixed: 'fixed top-0 left-0 right-0 z-50',
      },
      size: {
        sm: 'h-12',
        md: 'h-14',
        lg: 'h-16',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'sticky',
      size: 'md',
    },
  }
);

export interface GlassNavProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof glassNavVariants> {
  /** Logo/brand element */
  logo?: React.ReactNode;
  /** Navigation items */
  children?: React.ReactNode;
  /** Right side actions (buttons, etc.) */
  actions?: React.ReactNode;
  /** Enable blur enhancement on scroll */
  scrollBlur?: boolean;
  /** Maximum width container */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

/**
 * GlassNav - A premium glassmorphic navigation bar
 * 
 * Features:
 * - Frosted glass with shiny top border
 * - 3D inset shadows on nav links
 * - Full width with max-w-7xl inner container
 * - Rounded container design
 */
const GlassNav = React.forwardRef<HTMLElement, GlassNavProps>(
  (
    {
      className,
      variant,
      position,
      size,
      logo,
      children,
      actions,
      scrollBlur = true,
      maxWidth = '7xl',
      ...props
    },
    ref
  ) => {
    const [scrolled, setScrolled] = React.useState(false);

    // Handle scroll blur effect
    React.useEffect(() => {
      if (!scrollBlur || position === 'static') return;

      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollBlur, position]);

    const maxWidthClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
    };

    return (
      <div className={cn('w-full', position === 'sticky' && 'sticky top-0 z-50', position === 'fixed' && 'fixed top-0 left-0 right-0 z-50')}>
        <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 py-2', maxWidthClasses[maxWidth])}>
          <nav
            ref={ref}
            className={cn(
              glassNavVariants({ variant: scrolled || !scrollBlur ? variant : 'transparent', position: 'static', size }),
              className
            )}
            {...props}
          >
            <div className="flex items-center justify-between h-full px-4">
              {/* Logo */}
              {logo && (
                <div className="flex-shrink-0">{logo}</div>
              )}

              {/* Navigation Items */}
              {children && (
                <div className="hidden md:flex items-center gap-1">
                  {children}
                </div>
              )}

              {/* Actions */}
              {actions && (
                <div className="flex items-center gap-3">{actions}</div>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }
);

GlassNav.displayName = 'GlassNav';

/**
 * Glass Navigation Link with 3D effect
 */
const glassNavLinkVariants = cva(
  [
    'relative',
    'px-4',
    'py-2',
    'text-sm',
    'font-medium',
    'rounded-xl',
    'transition-all',
    'duration-200',
    'ease-out',
  ],
  {
    variants: {
      active: {
        true: [
          // Active state with 3D inset effect
          'bg-slate-900',
          'dark:bg-white',
          'text-white',
          'dark:text-slate-900',
          'shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]',
          'dark:shadow-[0_4px_12px_-2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.8)]',
        ],
        false: [
          // Inactive state with subtle 3D hover effect
          'text-text-secondary',
          'hover:bg-interactive-bg-hover',
          'hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.05)]',
          'dark:hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)]',
        ],
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface GlassNavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof glassNavLinkVariants> {
  /** Whether this link is currently active */
  active?: boolean;
}

const GlassNavLink = React.forwardRef<HTMLAnchorElement, GlassNavLinkProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(glassNavLinkVariants({ active }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

GlassNavLink.displayName = 'GlassNavLink';

export { GlassNav, GlassNavLink, glassNavVariants, glassNavLinkVariants };
