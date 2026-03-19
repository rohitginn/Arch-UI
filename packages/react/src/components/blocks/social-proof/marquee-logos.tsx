'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface LogoItem {
  /** Logo image source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional link */
  href?: string;
}

export interface MarqueeLogosProps {
  /** Array of logos */
  logos: LogoItem[];
  /** Scroll speed */
  speed?: 'slow' | 'normal' | 'fast';
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Scroll direction */
  direction?: 'left' | 'right';
  /** Section heading (usually "Trusted by") */
  heading?: string;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const speedMap = { slow: '60s', normal: '40s', fast: '20s' };

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function MarqueeLogos({
  logos,
  speed = 'normal',
  pauseOnHover = true,
  direction = 'left',
  heading,
  background,
  className,
}: MarqueeLogosProps) {
  const duration = speedMap[speed];

  return (
    <SectionWrapper padding="compact" background={background} className={className}>
      {heading && (
        <p className="text-center text-sm font-medium text-[var(--glass-text)]/50 mb-8 uppercase tracking-wider">
          {heading}
        </p>
      )}

      <div
        className={cn(
          'relative overflow-hidden',
          // Gradient fade edges
          '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'
        )}
      >
        <div
          className={cn(
            'flex w-max gap-12 items-center',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={{
            animation: `marquee-scroll ${duration} linear infinite`,
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...logos, ...logos].map((logo, i) => {
            const img = (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
                loading="lazy"
              />
            );
            return logo.href ? (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                {img}
              </a>
            ) : (
              <div key={i} className="shrink-0">{img}</div>
            );
          })}
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </SectionWrapper>
  );
}

MarqueeLogos.displayName = 'MarqueeLogos';
export { MarqueeLogos };
