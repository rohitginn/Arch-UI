'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FeaturesCompareProps {
  heading?: string;
  subheading?: string;
  badge?: string;
  /** "Before" content */
  before: { label: string; image: { src: string; alt: string } };
  /** "After" content */
  after: { label: string; image: { src: string; alt: string } };
  /** Initial slider position (0-100, default 50) */
  defaultPosition?: number;
  background?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function FeaturesCompare({
  heading,
  subheading,
  badge,
  before,
  after,
  defaultPosition = 50,
  background,
  className,
}: FeaturesCompareProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(defaultPosition);
  const [isDragging, setIsDragging] = React.useState(false);

  const updatePosition = React.useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newPos = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100)
      );
      setPosition(newPos);
    },
    []
  );

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX =
        'touches' in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };

    const handleEnd = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <SectionWrapper background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading!} subheading={subheading} badge={badge} />
      )}

      <div className="max-w-4xl mx-auto">
        <div
          ref={containerRef}
          className={cn(
            'relative rounded-2xl overflow-hidden select-none',
            'border border-black/[0.06] dark:border-white/[0.08]',
            'shadow-[0_16px_50px_-12px_rgba(0,0,0,0.12)]',
            'dark:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.4)]',
            isDragging && 'cursor-col-resize'
          )}
          onMouseDown={(e) => {
            setIsDragging(true);
            updatePosition(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            updatePosition(e.touches[0].clientX);
          }}
        >
          {/* After image (full width, underneath) */}
          <img
            src={after.image.src}
            alt={after.image.alt}
            className="w-full h-auto object-cover block"
            draggable={false}
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              src={before.image.src}
              alt={before.image.alt}
              className="w-full h-full object-cover block"
              style={{
                width: containerRef.current
                  ? `${containerRef.current.offsetWidth}px`
                  : '100%',
              }}
              draggable={false}
            />
          </div>

          {/* Slider handle */}
          <div
            className="absolute inset-y-0 z-20"
            style={{ left: `${position}%` }}
          >
            <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
            <div
              className={cn(
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
                'w-10 h-10 rounded-full',
                'bg-white border-2 border-white',
                'shadow-[0_2px_10px_rgba(0,0,0,0.2)]',
                'flex items-center justify-center',
                'cursor-col-resize'
              )}
            >
              <svg
                className="h-5 w-5 text-slate-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18-6-6 6-6" />
                <path d="m15 6 6 6-6 6" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute top-3 left-3 z-10 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {before.label}
          </span>
          <span className="absolute top-3 right-3 z-10 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {after.label}
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}

FeaturesCompare.displayName = 'FeaturesCompare';

export { FeaturesCompare };
