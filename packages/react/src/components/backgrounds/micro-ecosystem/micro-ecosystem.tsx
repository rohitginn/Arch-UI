'use client';

import * as React from 'react';
import { BackgroundBaseProps, cn, pseudoRandom } from '@archui/core';
import { useBackground, BackgroundContainer } from '../shared';

export interface MicroEcosystemProps extends BackgroundBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> { }

const defaultTokens = {
    '--bg-eco-density': 50,
    '--bg-eco-scale': 1,
    '--bg-eco-growth-speed': '8s',
};

/**
 * Micro-Ecosystem Background
 * Tiny stylized flora/cell shapes that grow, shrink, and breathe in place.
 * Uses SVG sprite instancing (<use>) for performance.
 */
export function MicroEcosystem(props: MicroEcosystemProps) {
    const { className, ...restProps } = props;

    const { cssVars, isReducedMotion } = useBackground({
        ...restProps,
        defaultTokens
    });

    const rand = pseudoRandom(props.seed || 888);
    const density = props.density ? props.density * 50 : 50;

    // Generate random positions and types for our "ecosystem" entities
    const entities = React.useMemo(() => {
        const list = [];
        for (let i = 0; i < density; i++) {
            const type = Math.floor(rand() * 4) + 1; // 1 to 4 styles
            list.push({
                id: i,
                x: rand() * 100, // percentage
                y: rand() * 100,
                scale: 0.5 + rand() * 1.5,
                rotation: rand() * 360,
                type: `eco-shape-${type}`,
                delay: rand() * 10,
                colorVar: rand() > 0.5 ? 'var(--bg-eco-base)' : 'var(--bg-eco-accent)',
            });
        }
        return list;
    }, [density, rand]);

    return (
        <BackgroundContainer
            cssVars={cssVars}
            overlay={props.overlay}
            isReducedMotion={isReducedMotion}
            className={cn(
                'bg-[#f8fafc] dark:bg-[#022c22] transition-colors duration-700',
                className
            )}
            {...restProps}
        >
            <svg className="absolute inset-0 w-full h-full text-current">
                <defs>
                    {/* Shape 1: Simple leaf */}
                    <path id="eco-shape-1" d="M 0,0 C 10,-10 20,0 20,10 C 10,20 0,10 0,0 Z" />
                    {/* Shape 2: Cell circle */}
                    <circle id="eco-shape-2" cx="10" cy="10" r="8" />
                    {/* Shape 3: Spore */}
                    <path id="eco-shape-3" d="M 10,0 A 10,10 0 1,1 9.9,0 M 10,5 A 5,5 0 1,0 10.1,5" />
                    {/* Shape 4: Microbe */}
                    <rect id="eco-shape-4" x="2" y="5" width="16" height="10" rx="5" />
                </defs>

                <g className="mix-blend-multiply dark:mix-blend-screen opacity-60">
                    {entities.map(ent => (
                        <use
                            key={ent.id}
                            href={`#${ent.type}`}
                            x={`${ent.x}%`}
                            y={`${ent.y}%`}
                            fill={ent.colorVar}
                            className="origin-center"
                            style={{
                                transform: `rotate(${ent.rotation}deg) scale(${ent.scale * (props.speed || 1)})`,
                                transformOrigin: `${ent.x}% ${ent.y}%`,
                                animation: isReducedMotion
                                    ? 'none'
                                    : `eco-breathe ${10 * (props.speed || 1)}s ease-in-out infinite alternate`,
                                animationDelay: `${-ent.delay}s`,
                                opacity: isReducedMotion ? 0.3 : undefined,
                            } as React.CSSProperties}
                        >
                            {!isReducedMotion && (
                                <animate
                                    attributeName="opacity"
                                    values="0.1; 0.6; 0.1"
                                    dur={`${10 * (props.speed || 1)}s`}
                                    repeatCount="indefinite"
                                    begin={`${-ent.delay}s`}
                                />
                            )}
                        </use>
                    ))}
                </g>
            </svg>
            {/* Fallback CSS animations for transform if stroke-based scaling is preferred */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes eco-breathe {
          0% { transform: scale(0.8) translateY(0); }
          100% { transform: scale(1.1) translateY(-5px); }
        }
      `}} />
        </BackgroundContainer>
    );
}
