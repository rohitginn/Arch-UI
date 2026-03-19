'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

/**
 * Glass Card Variants - Premium Edition
 * Enhanced with visible glass effect, multi-layer shadows, and refined interactions
 */
const glassCardVariants = cva(
  // Base styles - Premium glassmorphism
  [
    'relative',
    'rounded-2xl',
    'overflow-hidden',
    'backdrop-blur-xl',
    'border',
    'transition-all',
    'duration-300',
    'ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    // Light Mode - Frosted Glass with richer shadow
    'bg-white/70',
    'border-white/40',
    'shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),0_2px_8px_-1px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.5)_inset]',
    'text-slate-900',
    'hover:bg-white/80',
    'hover:shadow-[0_10px_40px_-4px_rgba(0,0,0,0.10),0_4px_12px_-2px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.6)_inset]',
    // Dark Mode
    'dark:bg-white/[0.05]',
    'dark:border-white/[0.08]',
    'dark:text-white',
    'dark:hover:bg-white/[0.08]',
    // Inner light reflection for depth (subtle in light, invisible in dark)
    'before:absolute',
    'before:inset-0',
    'before:rounded-2xl',
    'before:pointer-events-none',
    'before:bg-gradient-to-b',
    'before:from-white/30',
    'dark:before:from-white/5',
    'before:to-transparent',
    'before:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [],
        gradient: [
          'bg-gradient-to-br',
          'from-white/80',
          'to-white/40',
          'border-white/50',
          'hover:from-white/90',
          'hover:to-white/50',
          'dark:from-white/[0.1]',
          'dark:to-white/[0.02]',
        ],
        glow: [
          'bg-white/60',
          'shadow-[0_0_24px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.6)_inset]',
          'border-white/40',
          'hover:shadow-[0_0_40px_rgba(59,130,246,0.15),0_1px_0_rgba(255,255,255,0.8)_inset]',
          'dark:bg-white/[0.06]',
        ],
        elevated: [
          'bg-white/80',
          'shadow-[0_8px_16px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.5)_inset]',
          'hover:-translate-y-1',
          'hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.6)_inset]',
          'dark:bg-white/[0.1]',
        ],
      },
      blur: {
        none: 'backdrop-blur-none',
        subtle: 'backdrop-blur-[4px]',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
        xl: 'backdrop-blur-xl',
        '2xl': 'backdrop-blur-[48px]',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      blur: 'lg',
      size: 'md',
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassCardVariants> {
  /** Enable hover scale and lift animation */
  animated?: boolean;
  /** Show shine sweep effect on hover */
  shine?: boolean;
  /** Custom gradient colors for shine effect */
  shineColor?: string;
  /** Make the card clickable/interactive */
  interactive?: boolean;
  /** Enable 3D tilt effect on hover */
  tilt?: boolean;
  /** Maximum tilt angle in degrees */
  tiltMax?: number;
  /** As child element (render as different element) */
  asChild?: boolean;
}

/**
 * GlassCard - A premium glassmorphic card component
 * 
 * Features:
 * - Visible frosted glass effect with proper opacity
 * - Multi-layer shadows for realistic depth
 * - Inner highlight for glass realism
 * - Multiple variants (default, bordered, gradient, glow, elevated)
 * - 3D tilt effect with glare
 * - Shine sweep animation
 * 
 * @example
 * ```tsx
 * <GlassCard variant="glow" animated shine>
 *   <h3>Premium Card</h3>
 *   <p>With beautiful glass effect</p>
 * </GlassCard>
 * ```
 */
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant,
      blur,
      size,
      animated = false,
      shine = false,
      shineColor = 'white',
      interactive = false,
      tilt = false,
      tiltMax = 8,
      children,
      ...props
    },
    ref
  ) => {
    // Refs for 3D tilt effect
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [tiltState, setTiltState] = React.useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = React.useState(false);
    const [glarePosition, setGlarePosition] = React.useState({ x: 50, y: 50 });

    // Merge refs
    React.useImperativeHandle(ref, () => cardRef.current!);

    // 3D Tilt effect handlers
    const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation (inverted for natural feel)
      const tiltX = (mouseY / (rect.height / 2)) * -tiltMax;
      const tiltY = (mouseX / (rect.width / 2)) * tiltMax;

      setTiltState({ x: tiltX, y: tiltY });

      // Calculate glare position
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    }, [tilt, tiltMax]);

    const handleMouseEnter = React.useCallback(() => {
      setIsHovering(true);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setIsHovering(false);
      setTiltState({ x: 0, y: 0 });
    }, []);

    // Tilt transform style
    const tiltStyle = tilt ? {
      transform: `perspective(1000px) rotateX(${tiltState.x}deg) rotateY(${tiltState.y}deg)`,
      transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    } : {};

    return (
      <div
        ref={cardRef}
        className={cn(
          glassCardVariants({ variant, blur, size }),
          // Animated hover effect
          animated && [
            'hover:scale-[1.015]',
            'hover:-translate-y-1',
            'active:scale-[0.98]',
            'transition-transform',
            'duration-200',
            'ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          ],
          // Interactive styles
          interactive && [
            'cursor-pointer',
            'select-none',
          ],
          // Shine effect group
          shine && 'group',
          // Tilt effect
          tilt && 'transform-gpu',
          className
        )}
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Shine overlay effect */}
        {shine && (
          <div
            className={cn(
              'absolute',
              'inset-0',
              'z-[2]',
              'opacity-0',
              'group-hover:opacity-100',
              'bg-gradient-to-r',
              'from-transparent',
              'via-white/15',
              'to-transparent',
              '-translate-x-full',
              'group-hover:translate-x-full',
              'transition-all',
              'duration-700',
              'ease-out',
              'pointer-events-none'
            )}
            aria-hidden="true"
          />
        )}

        {/* Inner glow effect for glow variant */}
        {variant === 'glow' && (
          <div
            className={cn(
              'absolute',
              'inset-0',
              'rounded-2xl',
              'bg-gradient-to-br',
              'from-white/8',
              'to-transparent',
              'pointer-events-none',
              'z-[1]'
            )}
            aria-hidden="true"
          />
        )}

        {/* 3D Tilt glare effect */}
        {tilt && isHovering && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-[3]"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
              opacity: isHovering ? 1 : 0,
            }}
            aria-hidden="true"
          />
        )}

        {/* Content wrapper */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard, glassCardVariants };
