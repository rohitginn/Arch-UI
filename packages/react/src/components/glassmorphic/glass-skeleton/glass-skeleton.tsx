'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

const glassSkeletonVariants = cva(
  [
    'relative overflow-hidden',
    'bg-interactive-bg',
  ],
  {
    variants: {
      variant: {
        default: 'bg-interactive-bg',
        glass: 'bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20',
      },
      animation: {
        pulse: 'animate-pulse',
        shimmer: '',
        wave: '',
        none: '',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      animation: 'shimmer',
      rounded: 'md',
    },
  }
);

export interface GlassSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassSkeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const GlassSkeleton = React.forwardRef<HTMLDivElement, GlassSkeletonProps>(
  ({ className, variant, animation, rounded, width, height, style, ...props }, ref) => {
    const shimmerClass = animation === 'shimmer'
      ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent'
      : '';

    const waveClass = animation === 'wave'
      ? 'before:absolute before:inset-0 before:animate-[wave_1.5s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/5 before:to-transparent'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          glassSkeletonVariants({ variant, animation, rounded }),
          shimmerClass,
          waveClass,
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

GlassSkeleton.displayName = 'GlassSkeleton';

// Preset skeleton components for common use cases
export interface SkeletonTextProps extends Omit<GlassSkeletonProps, 'height' | 'rounded'> {
  lines?: number;
  lastLineWidth?: string;
  spacing?: 'tight' | 'normal' | 'relaxed';
}

const GlassSkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineWidth = '70%', spacing = 'normal', className, ...props }, ref) => {
    const spacingClasses = {
      tight: 'space-y-1',
      normal: 'space-y-2',
      relaxed: 'space-y-3',
    };

    return (
      <div ref={ref} className={cn(spacingClasses[spacing], className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <GlassSkeleton
            key={i}
            height={16}
            rounded="sm"
            style={{
              width: i === lines - 1 ? lastLineWidth : '100%',
            }}
            {...props}
          />
        ))}
      </div>
    );
  }
);

GlassSkeletonText.displayName = 'GlassSkeletonText';

export interface SkeletonAvatarProps extends Omit<GlassSkeletonProps, 'rounded'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const GlassSkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', className, ...props }, ref) => {
    const sizeClasses = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    };

    return (
      <GlassSkeleton
        ref={ref}
        rounded="full"
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

GlassSkeletonAvatar.displayName = 'GlassSkeletonAvatar';

export interface SkeletonCardProps extends GlassSkeletonProps {
  hasImage?: boolean;
  hasTitle?: boolean;
  hasDescription?: boolean;
  hasFooter?: boolean;
}

const GlassSkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({
    hasImage = true,
    hasTitle = true,
    hasDescription = true,
    hasFooter = false,
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-4 rounded-xl border border-surface-border space-y-4',
          'bg-surface-bg',
          className
        )}
      >
        {hasImage && (
          <GlassSkeleton height={200} rounded="lg" {...props} />
        )}
        {hasTitle && (
          <GlassSkeleton height={24} width="60%" rounded="md" {...props} />
        )}
        {hasDescription && (
          <GlassSkeletonText lines={2} {...props} />
        )}
        {hasFooter && (
          <div className="flex items-center gap-3 pt-2">
            <GlassSkeletonAvatar size="sm" {...props} />
            <GlassSkeleton height={16} width={120} rounded="sm" {...props} />
          </div>
        )}
      </div>
    );
  }
);

GlassSkeletonCard.displayName = 'GlassSkeletonCard';

// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
// @keyframes wave {
//   0% { transform: translateX(-100%) skewX(-15deg); }
//   100% { transform: translateX(100%) skewX(-15deg); }
// }

export {
  GlassSkeleton,
  GlassSkeletonText,
  GlassSkeletonAvatar,
  GlassSkeletonCard,
  glassSkeletonVariants
};
