'use client';

import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface HeroVideoProps {
  /** Main headline */
  heading: string;
  /** Supporting copy */
  subheading?: string;
  /** Video source URL */
  videoSrc: string;
  /** Video poster image */
  poster?: string;
  /** Primary CTA */
  primaryCta?: { label: string; href: string; onClick?: () => void };
  /** Secondary CTA */
  secondaryCta?: { label: string; href: string; onClick?: () => void };
  /** Overlay opacity (0-100, default 50) */
  overlayOpacity?: number;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function HeroVideo({
  heading,
  subheading,
  videoSrc,
  poster,
  primaryCta,
  secondaryCta,
  overlayOpacity = 50,
  className,
}: HeroVideoProps) {
  return (
    <section
      className={cn(
        'relative w-full min-h-screen flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity / 100 }}
        aria-hidden="true"
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          className={cn(
            'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]',
            'text-white'
          )}
        >
          {heading}
        </h1>

        {subheading && (
          <p className="mt-6 text-lg lg:text-xl leading-relaxed max-w-2xl text-white/80">
            {subheading}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {primaryCta && (
            <a
              href={primaryCta.href}
              onClick={primaryCta.onClick}
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'rounded-xl px-8 py-3.5 text-sm font-medium',
                'bg-white text-slate-900',
                'hover:bg-white/90 hover:-translate-y-[1px]',
                'active:scale-[0.97] active:transition-transform active:duration-75',
                'shadow-[0_4px_20px_-4px_rgba(255,255,255,0.3)]',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
              )}
            >
              {primaryCta.label}
            </a>
          )}

          {secondaryCta && (
            <a
              href={secondaryCta.href}
              onClick={secondaryCta.onClick}
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'rounded-xl px-8 py-3.5 text-sm font-medium',
                'bg-transparent border border-white/30 text-white',
                'hover:bg-white/10 hover:border-white/50 hover:-translate-y-[1px]',
                'active:scale-[0.97] active:transition-transform active:duration-75',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
              )}
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

HeroVideo.displayName = 'HeroVideo';

export { HeroVideo };
