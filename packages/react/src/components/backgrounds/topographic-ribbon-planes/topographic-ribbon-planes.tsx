'use client';

import * as React from 'react';
import { BackgroundBaseProps, cn, pseudoRandom } from '@archui/core';
import { useBackground, BackgroundContainer } from '../shared';
import { usePointerInteraction } from '../shared/use-pointer-interaction';

export interface TopographicRibbonPlanesProps extends BackgroundBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /**
     * Number of ribbon layers
     */
    layers?: number;
}

const defaultTokens = {
    '--bg-ribbon-density': 6,
    '--bg-ribbon-offset': '40px',
    '--bg-ribbon-speed': '20s',
};

/**
 * Topographic Ribbon Planes Background
 * Layered iso-contour ribbons that flow and shift.
 */
export function TopographicRibbonPlanes(props: TopographicRibbonPlanesProps) {
    const { className, layers = 6, ...restProps } = props;

    const { cssVars, isReducedMotion } = useBackground({
        ...restProps,
        defaultTokens
    });

    const containerRef = React.useRef<HTMLDivElement>(null);
    const pointer = usePointerInteraction(
        props.interactions?.pointer === 'parallax' && !isReducedMotion,
        containerRef
    );

    // Generate deterministic paths
    const rand = pseudoRandom(props.seed || 1234);
    const ribbonPaths = React.useMemo(() => {
        return Array.from({ length: layers }).map((_, i) => {
            const step = i / layers;
            // create a smooth bezier path
            const p1y = 20 + rand() * 20 + step * 40;
            const c1x = 25 + rand() * 10;
            const c1y = 0 + rand() * 40 + step * 40;
            const c2x = 75 - rand() * 10;
            const c2y = 100 - rand() * 40 - step * 40;
            const p2y = 80 - rand() * 20 - step * 40;

            return `M 0,${p1y} C ${c1x},${c1y} ${c2x},${c2y} 100,${p2y} L 100,100 L 0,100 Z`;
        });
    }, [layers, props.seed, rand]);

    return (
        <BackgroundContainer
            ref={containerRef}
            cssVars={cssVars}
            overlay={props.overlay}
            isReducedMotion={isReducedMotion}
            className={cn(
                'bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-700',
                className
            )}
            {...restProps}
        >
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="ribbon-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--bg-ribbon-base, #f8fafc)" />
                        <stop offset="100%" stopColor="var(--bg-ribbon-accent, #e2e8f0)" />
                    </linearGradient>
                    <linearGradient id="ribbon-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--bg-ribbon-base, #0f172a)" />
                        <stop offset="100%" stopColor="var(--bg-ribbon-accent, #1e293b)" />
                    </linearGradient>
                    <filter id="ribbon-shadow">
                        <feDropShadow dx="0" dy="-1" stdDeviation="1" floodOpacity="0.1" floodColor="var(--bg-ribbon-edge)" />
                    </filter>
                </defs>

                <g className="origin-center transition-transform duration-100 ease-out"
                    style={{
                        transform: props.interactions?.pointer === 'parallax'
                            ? `translate(${pointer.x * -2}%, ${pointer.y * -2}%) scale(1.05)`
                            : 'none'
                    }}>
                    {ribbonPaths.map((path, i) => {
                        const delay = (i / layers) * -20;
                        const duration = 20 * (props.speed || 1);
                        const scaleY = 1 + (i / layers) * 0.2;

                        return (
                            <path
                                key={i}
                                d={path}
                                className="mix-blend-normal dark:mix-blend-screen transition-opacity duration-1000"
                                fill="url(#ribbon-gradient-light)"
                                style={{
                                    fill: 'var(--ribbon-fill)',
                                    filter: 'url(#ribbon-shadow)',
                                    opacity: `calc(var(--bg-ribbon-opacity) * ${1 - i * 0.1})`,
                                    animation: isReducedMotion ? 'none' : `ribbon-wave ${duration}s ease-in-out infinite alternate`,
                                    animationDelay: `${delay}s`,
                                    transformOrigin: '50% 100%',
                                } as React.CSSProperties}
                            >
                                {/* Fallback to CSS animation via style injected keyframes if possible, or inline animateTransform */}
                                {!isReducedMotion && (
                                    <animateTransform
                                        attributeName="transform"
                                        type="scale"
                                        values={`1 ${1}; 1 ${scaleY}; 1 ${1}`}
                                        dur={`${duration}s`}
                                        repeatCount="indefinite"
                                    />
                                )}
                                {!isReducedMotion && (
                                    <animateTransform
                                        attributeName="transform"
                                        type="translate"
                                        values={`0 0; 0 ${i * 2}; 0 0`}
                                        dur={`${duration * 1.5}s`}
                                        repeatCount="indefinite"
                                        additive="sum"
                                    />
                                )}
                            </path>
                        );
                    })}
                </g>
            </svg>
            {/* Inline styles for light/dark gradient toggle based on theme class inheritance */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .dark path { fill: url(#ribbon-gradient-dark); }
        :root:not(.dark) path { fill: url(#ribbon-gradient-light); }
      `}} />
        </BackgroundContainer>
    );
}
