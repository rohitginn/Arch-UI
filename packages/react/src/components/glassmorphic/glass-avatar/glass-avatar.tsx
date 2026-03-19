'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassAvatarVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'overflow-hidden',
    'select-none',
    'shrink-0',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-interactive-bg text-text-secondary',
        ],
        glass: [
          'backdrop-blur-md',
          'bg-white/50 text-slate-700',
          'dark:bg-white/10 dark:text-gray-200',
          'border border-white/40 dark:border-white/10',
          'shadow-sm',
        ],
        gradient: [
          'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
        ],
      },
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
      ring: {
        true: 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900',
        false: '',
      },
      ringColor: {
        default: 'ring-surface-border-strong',
        primary: 'ring-blue-500 dark:ring-blue-400',
        success: 'ring-emerald-500 dark:ring-emerald-400',
        warning: 'ring-amber-500 dark:ring-amber-400',
        error: 'ring-red-500 dark:ring-red-400',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'circle',
      ring: false,
      ringColor: 'default',
    },
  }
);

export interface GlassAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassAvatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  fallbackIcon?: React.ReactNode;
  status?: 'online' | 'offline' | 'busy' | 'away';
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  busy: 'bg-red-500',
  away: 'bg-amber-500',
};

const statusPositions = {
  'top-right': 'top-0 right-0',
  'bottom-right': 'bottom-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-left': 'bottom-0 left-0',
};

const GlassAvatar = React.forwardRef<HTMLDivElement, GlassAvatarProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      ring,
      ringColor,
      src,
      alt = '',
      fallback,
      fallbackIcon,
      status,
      statusPosition = 'bottom-right',
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      setHasError(false);
      setIsLoading(true);
    }, [src]);

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const showFallback = !src || hasError;

    return (
      <div
        ref={ref}
        className={cn(
          glassAvatarVariants({ variant, size, shape, ring, ringColor }),
          className
        )}
        {...props}
      >
        {!showFallback && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            className={cn(
              'h-full w-full object-cover',
              isLoading && 'opacity-0',
              !isLoading && 'opacity-100 transition-opacity duration-200'
            )}
          />
        )}
        {showFallback && (
          <>
            {fallbackIcon ? (
              <span className="flex items-center justify-center">
                {fallbackIcon}
              </span>
            ) : fallback ? (
              <span className="font-medium">{getInitials(fallback)}</span>
            ) : (
              <svg
                className="h-[60%] w-[60%] text-current opacity-60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </>
        )}

        {status && (
          <span
            className={cn(
              'absolute block rounded-full ring-2 ring-surface-bg',
              statusColors[status],
              statusPositions[statusPosition],
              status === 'online' && 'animate-[pulse-soft_2s_ease-in-out_infinite]',
              size === 'xs' && 'h-1.5 w-1.5',
              size === 'sm' && 'h-2 w-2',
              size === 'md' && 'h-2.5 w-2.5',
              size === 'lg' && 'h-3 w-3',
              size === 'xl' && 'h-3.5 w-3.5',
              size === '2xl' && 'h-4 w-4'
            )}
          />
        )}
      </div>
    );
  }
);

GlassAvatar.displayName = 'GlassAvatar';

// Avatar Group Component
export interface GlassAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  children: React.ReactNode;
}

const GlassAvatarGroup = React.forwardRef<HTMLDivElement, GlassAvatarGroupProps>(
  ({ className, max, size = 'md', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const displayCount = max ? Math.min(max, childArray.length) : childArray.length;
    const extraCount = childArray.length - displayCount;

    const overlapClasses = {
      xs: '-ml-2',
      sm: '-ml-2.5',
      md: '-ml-3',
      lg: '-ml-4',
      xl: '-ml-5',
      '2xl': '-ml-6',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', className)}
        {...props}
      >
        {childArray.slice(0, displayCount).map((child, index) => (
          <div
            key={index}
            className={cn(index !== 0 && overlapClasses[size])}
            style={{ zIndex: displayCount - index }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<GlassAvatarProps>, {
                size,
                ring: true,
                ringColor: 'default',
              })
              : child}
          </div>
        ))}
        {extraCount > 0 && (
          <div className={cn(overlapClasses[size])} style={{ zIndex: 0 }}>
            <GlassAvatar
              size={size}
              ring
              ringColor="default"
              fallback={`+${extraCount}`}
            />
          </div>
        )}
      </div>
    );
  }
);

GlassAvatarGroup.displayName = 'GlassAvatarGroup';

export { GlassAvatar, GlassAvatarGroup, glassAvatarVariants };
