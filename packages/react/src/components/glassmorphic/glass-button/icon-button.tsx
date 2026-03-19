'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { GlassButton, type GlassButtonProps } from './glass-button';

/**
 * Size mapping from simplified IconButton sizes to GlassButton icon sizes
 */
const sizeMap = {
  xs: 'icon-sm' as const,
  sm: 'icon-sm' as const,
  md: 'icon' as const,
  lg: 'icon-lg' as const,
};

/**
 * Icon size classes per size variant
 */
const iconSizeClasses = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export interface IconButtonProps
  extends Omit<GlassButtonProps, 'size' | 'leftIcon' | 'rightIcon' | 'children' | 'fullWidth'> {
  /** The icon element to display */
  icon: React.ReactNode;
  /** Accessible label — REQUIRED for icon-only buttons */
  'aria-label': string;
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * IconButton — A square button with a single centered icon and no label.
 *
 * Built on top of `GlassButton` with icon sizing pre-applied.
 * Always requires an `aria-label` for accessibility compliance.
 *
 * @example
 * ```tsx
 * import { Search } from 'lucide-react';
 *
 * <IconButton icon={<Search />} aria-label="Search" />
 * <IconButton icon={<Search />} aria-label="Search" variant="primary" glow />
 * ```
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    return (
      <GlassButton
        ref={ref}
        size={sizeMap[size]}
        className={cn('p-0', className)}
        {...props}
      >
        <span className={cn(iconSizeClasses[size], 'shrink-0')}>
          {icon}
        </span>
      </GlassButton>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
