'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ───────────────── Context ───────────────── */
interface CarouselContextValue {
    currentIndex: number;
    totalSlides: number;
    goTo: (index: number) => void;
    goNext: () => void;
    goPrev: () => void;
    isAnimating: boolean;
    autoPlay: boolean;
    loop: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
    const context = React.useContext(CarouselContext);
    if (!context) {
        throw new Error('Carousel components must be used within a GlassCarousel');
    }
    return context;
}

/* ───────────────── Arrow Icons ───────────────── */
const ChevronLeftIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}>
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}>
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

/* ───────────────── Root ───────────────── */
export interface GlassCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Starting slide index (0-based) */
    defaultIndex?: number;
    /** Controlled index */
    index?: number;
    /** Callback when index changes */
    onIndexChange?: (index: number) => void;
    /** Auto-advance slides */
    autoPlay?: boolean;
    /** Auto-advance interval in ms */
    interval?: number;
    /** Loop back to beginning */
    loop?: boolean;
    /** Show navigation arrows */
    showArrows?: boolean;
    /** Show dot indicators */
    showDots?: boolean;
}

const GlassCarousel = React.forwardRef<HTMLDivElement, GlassCarouselProps>(
    (
        {
            className,
            children,
            defaultIndex = 0,
            index: controlledIndex,
            onIndexChange,
            autoPlay = false,
            interval = 5000,
            loop = true,
            showArrows = true,
            showDots = true,
            ...props
        },
        ref
    ) => {
        const slides = React.Children.toArray(children);
        const totalSlides = slides.length;

        const isControlled = controlledIndex !== undefined;
        const [uncontrolledIndex, setUncontrolledIndex] = React.useState(defaultIndex);
        const currentIndex = isControlled ? controlledIndex : uncontrolledIndex;

        const [isAnimating, setIsAnimating] = React.useState(false);
        const timerRef = React.useRef<ReturnType<typeof setInterval> | undefined>();

        const goTo = React.useCallback(
            (idx: number) => {
                if (isAnimating) return;
                let next = idx;
                if (loop) {
                    next = ((idx % totalSlides) + totalSlides) % totalSlides;
                } else {
                    next = Math.max(0, Math.min(idx, totalSlides - 1));
                }
                setIsAnimating(true);
                if (!isControlled) setUncontrolledIndex(next);
                onIndexChange?.(next);
                setTimeout(() => setIsAnimating(false), 500);
            },
            [isAnimating, loop, totalSlides, isControlled, onIndexChange]
        );

        const goNext = React.useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
        const goPrev = React.useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

        // Auto-play
        React.useEffect(() => {
            if (!autoPlay || totalSlides <= 1) return;
            timerRef.current = setInterval(goNext, interval);
            return () => clearInterval(timerRef.current);
        }, [autoPlay, interval, goNext, totalSlides]);

        // Keyboard
        const handleKeyDown = React.useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
                if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
            },
            [goNext, goPrev]
        );

        return (
            <CarouselContext.Provider
                value={{ currentIndex, totalSlides, goTo, goNext, goPrev, isAnimating, autoPlay, loop }}
            >
                <div
                    ref={ref}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Image carousel"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        'group relative w-full overflow-hidden rounded-2xl',
                        'border border-surface-border bg-surface-bg-subtle/50 backdrop-blur-md dark:bg-surface-bg-subtle/10',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus',
                        className
                    )}
                    {...props}
                >
                    {/* Slide track */}
                    <div
                        className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {slides.map((slide, i) => (
                            <div
                                key={i}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Slide ${i + 1} of ${totalSlides}`}
                                className="w-full flex-shrink-0"
                            >
                                {slide}
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {showArrows && totalSlides > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={goPrev}
                                disabled={!loop && currentIndex === 0}
                                aria-label="Previous slide"
                                className={cn(
                                    'absolute left-3 top-1/2 -translate-y-1/2 z-20',
                                    'flex items-center justify-center w-10 h-10 rounded-full',
                                    'bg-surface-bg/70 backdrop-blur-md border border-surface-border',
                                    'text-text-primary shadow-lg',
                                    'transition-all duration-200',
                                    'hover:bg-surface-bg hover:scale-110',
                                    'opacity-0 group-hover:opacity-100',
                                    'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus'
                                )}
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                disabled={!loop && currentIndex === totalSlides - 1}
                                aria-label="Next slide"
                                className={cn(
                                    'absolute right-3 top-1/2 -translate-y-1/2 z-20',
                                    'flex items-center justify-center w-10 h-10 rounded-full',
                                    'bg-surface-bg/70 backdrop-blur-md border border-surface-border',
                                    'text-text-primary shadow-lg',
                                    'transition-all duration-200',
                                    'hover:bg-surface-bg hover:scale-110',
                                    'opacity-0 group-hover:opacity-100',
                                    'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus'
                                )}
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Dot Indicators */}
                    {showDots && totalSlides > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {Array.from({ length: totalSlides }).map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={cn(
                                        'rounded-full transition-all duration-300',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus',
                                        i === currentIndex
                                            ? 'w-6 h-2 bg-text-primary'
                                            : 'w-2 h-2 bg-text-muted hover:bg-text-secondary'
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </CarouselContext.Provider>
        );
    }
);

GlassCarousel.displayName = 'GlassCarousel';

/* ───────────────── Slide ───────────────── */
export interface GlassCarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> { }

const GlassCarouselSlide = React.forwardRef<HTMLDivElement, GlassCarouselSlideProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn('w-full', className)} {...props}>
            {children}
        </div>
    )
);

GlassCarouselSlide.displayName = 'GlassCarouselSlide';

export { GlassCarousel, GlassCarouselSlide, useCarouselContext };
