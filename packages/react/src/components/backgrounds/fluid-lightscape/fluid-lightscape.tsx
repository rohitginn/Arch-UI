'use client';

import * as React from 'react';
import { BackgroundBaseProps, cn } from '@archui/core';
import { useBackground, BackgroundContainer } from '../shared';

export interface FluidLightscapeProps extends BackgroundBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Granularity of the caustic noise (0 to 1) */
    grain?: number;
}

const defaultTokens = {
    '--bg-fluid-speed': '15s',
    '--bg-fluid-contrast': '1',
};

/**
 * Fluid Lightscape Background
 * Broad, slow-moving light flows resembling oil-on-water caustics.
 * Uses CSS radial gradients animated via CSS keyframes with an SVG turbulence overlay for grain/caustics.
 */
export function FluidLightscape(props: FluidLightscapeProps) {
    const { className, grain = 0.05, ...restProps } = props;

    const { cssVars, isReducedMotion } = useBackground({
        ...restProps,
        defaultTokens
    });

    return (
        <BackgroundContainer
            cssVars={cssVars}
            overlay={props.overlay}
            isReducedMotion={isReducedMotion}
            className={cn(
                'bg-[#0f172a] transition-colors duration-700',
                className
            )}
            {...restProps}
        >
            {/* SVG Filter for Caustic Noise */}
            <svg className="hidden">
                <defs>
                    <filter id="fluid-noise">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={grain}
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Base Gradients Container */}
            <div
                className={cn(
                    "absolute inset-0 w-full h-full opacity-80 mix-blend-screen",
                    !isReducedMotion && "animate-fluid-flow"
                )}
                style={{
                    background: `
            radial-gradient(circle at 10% 20%, var(--bg-fluid-color1, rgba(30, 58, 138, 0.4)) 0%, transparent 50%),
            radial-gradient(circle at 80% 90%, var(--bg-fluid-color2, rgba(88, 28, 135, 0.5)) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, var(--bg-fluid-highlight, rgba(125, 211, 252, 0.3)) 0%, transparent 60%)
          `,
                    backgroundSize: '200% 200%',
                    animation: isReducedMotion ? 'none' : `fluid-flow ${15 * (props.speed || 1)}s ease-in-out infinite alternate`,
                }}
            />

            {/* Secondary Flow Layer for Complexity */}
            <div
                className={cn(
                    "absolute inset-0 w-full h-full opacity-60 mix-blend-screen",
                )}
                style={{
                    background: `
            radial-gradient(circle at 90% 10%, var(--bg-fluid-color2, rgba(88, 28, 135, 0.5)) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, var(--bg-fluid-color1, rgba(30, 58, 138, 0.4)) 0%, transparent 40%)
          `,
                    backgroundSize: '150% 150%',
                    animation: isReducedMotion ? 'none' : `fluid-flow-reverse ${20 * (props.speed || 1)}s ease-in-out infinite alternate`,
                }}
            />

            {/* Noise Overlay applied via CSS filter pointing to SVG, creating the "caustic" feel */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-30"
                style={{
                    filter: 'url(#fluid-noise)',
                }}
            />

            {/* Global Style for Keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fluid-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes fluid-flow-reverse {
          0% { background-position: 100% 0%; }
          100% { background-position: 0% 100%; }
        }
      `}} />
        </BackgroundContainer>
    );
}
