'use client';

import * as React from 'react';
import { BackgroundBaseProps, cn, pseudoRandom } from '@archui/core';
import { useBackground, BackgroundContainer } from '../shared';
import { usePointerInteraction } from '../shared/use-pointer-interaction';

export interface KineticTessellationProps extends BackgroundBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Size of each hexagonal/triangular tile */
    tileSize?: number;
}

const defaultTokens = {
    '--bg-tile-size': '80px',
    '--bg-tile-speed': '10s',
};

/**
 * Kinetic Tessellation Background
 * A geometric grid of tiles that subtly shift scale and opacity to create kinetic illusions.
 */
export function KineticTessellation(props: KineticTessellationProps) {
    const { className, tileSize = 80, ...restProps } = props;

    const { cssVars, isReducedMotion } = useBackground({
        ...restProps,
        defaultTokens
    });

    const containerRef = React.useRef<HTMLDivElement>(null);
    const pointer = usePointerInteraction(
        props.interactions?.pointer === 'parallax',
        containerRef
    );

    // We'll render a fixed grid of SVG polygons (triangles making up hexagons or just a simple isometric grid)
    // For simplicity and performance, we'll use a responsive pattern of diamonds/rhombuses.

    // Since we want it to cover the screen fluidly, we can build a repeating <pattern> in SVG,
    // but animating individual tiles in a pattern is hard in plain SVG without JS updating them.
    // Instead, we can generate a large enough grid of `<path>` elements that overflow typical screens.
    // 20x20 grid of tiles.
    const columns = 16;
    const rows = 12;
    const rand = pseudoRandom(props.seed || 123);

    const tiles = React.useMemo(() => {
        const arr = [];
        const widthOffset = tileSize * Math.sqrt(3);
        const heightOffset = tileSize * 1.5;

        for (let r = -2; r < rows + 2; r++) {
            for (let c = -2; c < columns + 2; c++) {
                // Hexagon center coordinates
                const x = c * widthOffset + (r % 2 === 0 ? 0 : widthOffset / 2);
                const y = r * heightOffset;

                // Create 3 diamonds to form a hexagon
                // Diamond 1 (Top)
                arr.push({
                    x, y,
                    path: `M 0,0 L ${widthOffset / 2},${-tileSize / 2} L 0,${-tileSize} L ${-widthOffset / 2},${-tileSize / 2} Z`,
                    delay: rand() * 10,
                    colorVar: 'var(--bg-tile-base)',
                    opacity: 0.3 + rand() * 0.7,
                });
                // Diamond 2 (Bottom Right)
                arr.push({
                    x, y,
                    path: `M 0,0 L ${widthOffset / 2},${-tileSize / 2} L ${widthOffset / 2},${tileSize / 2} L 0,${tileSize} Z`,
                    delay: rand() * 10,
                    colorVar: 'var(--bg-tile-accent)',
                    opacity: 0.3 + rand() * 0.7,
                });
                // Diamond 3 (Bottom Left)
                arr.push({
                    x, y,
                    path: `M 0,0 L 0,${tileSize} L ${-widthOffset / 2},${tileSize / 2} L ${-widthOffset / 2},${-tileSize / 2} Z`,
                    delay: rand() * 10,
                    colorVar: 'var(--bg-tile-edge)',
                    opacity: 0.3 + rand() * 0.7,
                });
            }
        }
        return arr;
    }, [tileSize, rand]);

    return (
        <BackgroundContainer
            ref={containerRef}
            cssVars={cssVars}
            overlay={props.overlay}
            isReducedMotion={isReducedMotion}
            className={cn(
                'bg-[#f1f5f9] dark:bg-[#020617] transition-colors duration-700',
                className
            )}
            {...restProps}
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: props.interactions?.pointer === 'parallax'
                        ? `translate(${pointer.x * -3}%, ${pointer.y * -3}%) scale(1.1)`
                        : 'scale(1.1)',
                    transition: 'transform 0.1s ease-out',
                }}
            >
                <svg
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                    // Set viewbox large enough to encompass the generated grid, scaled to 100% width
                    viewBox={`0 0 ${columns * tileSize * Math.sqrt(3)} ${rows * tileSize * 1.5}`}
                >
                    <g className="origin-center">
                        {tiles.map((tile, i) => (
                            <path
                                key={i}
                                d={tile.path}
                                fill={tile.colorVar}
                                className="transition-all duration-1000 origin-center mix-blend-multiply dark:mix-blend-screen"
                                style={{
                                    transform: `translate(${tile.x}px, ${tile.y}px)`,
                                    opacity: isReducedMotion ? tile.opacity * 0.5 : tile.opacity,
                                    animation: isReducedMotion
                                        ? 'none'
                                        : `tessellation-pulse ${10 * (props.speed || 1)}s infinite alternate`,
                                    animationDelay: `${-tile.delay}s`,
                                } as React.CSSProperties}
                            >
                                {!isReducedMotion && (
                                    <animate
                                        attributeName="opacity"
                                        values={`${tile.opacity * 0.3}; ${tile.opacity}; ${tile.opacity * 0.3}`}
                                        dur={`${8 * (props.speed || 1)}s`}
                                        repeatCount="indefinite"
                                        begin={`${-tile.delay}s`}
                                    />
                                )}
                            </path>
                        ))}
                    </g>
                </svg>
            </div>
        </BackgroundContainer>
    );
}
