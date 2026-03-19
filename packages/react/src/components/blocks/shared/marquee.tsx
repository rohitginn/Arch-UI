'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type MarqueeSpeed = 'slow' | 'normal' | 'fast';
export type MarqueeDirection = 'left' | 'right';

export interface MarqueeProps {
  /** Items to scroll */
  children: React.ReactNode;
  /** Animation speed */
  speed?: MarqueeSpeed;
  /** Scroll direction */
  direction?: MarqueeDirection;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Show gradient fade on edges */
  fade?: boolean;
  /** Number of times to duplicate the children for seamless loop */
  repeat?: number;
  /** Additional CSS classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Speed map (seconds per full cycle)                                  */
/* ------------------------------------------------------------------ */

const speedMap: Record<MarqueeSpeed, number> = {
  slow: 60,
  normal: 40,
  fast: 20,
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * Marquee — CSS-only infinite horizontal scroll animation.
 *
 * Content is duplicated inside the scroll track so the loop is seamless.
 *
 * @example
 * <Marquee speed="fast" pauseOnHover>
 *   {logos.map(l => <img key={l.alt} src={l.src} alt={l.alt} className="h-8 mx-8" />)}
 * </Marquee>
 */
function Marquee({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  fade = true,
  repeat = 2,
  className,
}: MarqueeProps) {
  const duration = speedMap[speed];
  const animDir = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden',
        className
      )}
    >
      {/* Gradient fade overlays */}
      {fade && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent"
            aria-hidden="true"
          />
        </>
      )}

      {/* Scrolling track */}
      {Array.from({ length: repeat + 1 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 items-center gap-4',
            'animate-[marquee_var(--marquee-duration)_linear_infinite]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]'
          )}
          style={{
            '--marquee-duration': `${duration}s`,
            animationDirection: animDir,
          } as React.CSSProperties}
          aria-hidden={i > 0 ? 'true' : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

Marquee.displayName = 'Marquee';

export { Marquee };
