'use client';

import * as React from 'react';
import { BackgroundBaseProps, cn, pseudoRandom } from '@archui/core';
import { useBackground, BackgroundContainer } from '../shared';
import { usePointerInteraction } from '../shared/use-pointer-interaction';

export interface TypographicAtmosProps extends BackgroundBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Array of words/characters to render */
    words?: string[];
}

const defaultTokens = {
    '--bg-typo-scale': '10vw',
    '--bg-typo-density': 10,
    '--bg-typo-blur': '2px',
    '--bg-typo-speed': '30s',
};

/**
 * Typographic Atmos Background
 * Very large, semi-transparent letterforms/word-forms arranged to form shifting textures.
 */
export function TypographicAtmos(props: TypographicAtmosProps) {
    const {
        className,
        words = ['UI', 'AESTHETIC', 'MOTION', 'GLASS', 'DEPTH', 'SPACE', 'SYSTEM', 'ZEN'],
        ...restProps
    } = props;

    const { cssVars, isReducedMotion } = useBackground({
        ...restProps,
        defaultTokens
    });

    const containerRef = React.useRef<HTMLDivElement>(null);
    const pointer = usePointerInteraction(
        props.interactions?.pointer === 'parallax' && !isReducedMotion,
        containerRef
    );

    const rand = pseudoRandom(props.seed || 101);
    const density = props.density ? props.density * 10 : 10;

    const entities = React.useMemo(() => {
        const list = [];
        for (let i = 0; i < density; i++) {
            const word = words[Math.floor(rand() * words.length)];
            list.push({
                id: i,
                word,
                x: rand() * 120 - 10, // allow bleeding off edge
                y: rand() * 120 - 10,
                scale: 0.5 + rand() * 3,
                rotation: (rand() - 0.5) * 45, // -22.5 to 22.5 deg
                weight: rand() > 0.5 ? 800 : 300, // blend of heavy/light weights
                delay: rand() * 20,
                colorVar: rand() > 0.5 ? 'var(--bg-typo-base)' : 'var(--bg-typo-accent)',
            });
        }
        return list;
    }, [density, rand, words]);

    return (
        <BackgroundContainer
            ref={containerRef}
            cssVars={cssVars}
            overlay={props.overlay}
            isReducedMotion={isReducedMotion}
            className={cn(
                'bg-[#f8fafc] dark:bg-[#09090b] transition-colors duration-700',
                className
            )}
            {...restProps}
        >
            <div
                className="absolute inset-0 w-full h-full font-sans select-none"
                style={{
                    transform: props.interactions?.pointer === 'parallax'
                        ? `translate(${pointer.x * -4}%, ${pointer.y * -4}%)`
                        : 'none',
                    transition: 'transform 0.1s ease-out',
                }}
            >
                {entities.map(ent => (
                    <div
                        key={ent.id}
                        className="absolute whitespace-nowrap leading-none tracking-tighter mix-blend-multiply dark:mix-blend-screen"
                        style={{
                            left: `${ent.x}%`,
                            top: `${ent.y}%`,
                            color: ent.colorVar,
                            fontWeight: ent.weight,
                            fontSize: `calc(var(--bg-typo-scale) * ${ent.scale})`,
                            filter: `blur(var(--bg-typo-blur))`,
                            opacity: isReducedMotion ? 0.3 : undefined,
                            transform: `rotate(${ent.rotation}deg)`,
                            animation: isReducedMotion
                                ? 'none'
                                : `typo-drift ${20 * (props.speed || 1)}s ease-in-out infinite alternate`,
                            animationDelay: `${-ent.delay}s`,
                        } as React.CSSProperties}
                    >
                        {ent.word}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes typo-drift {
          0% { transform: translateY(0) rotate(0deg) scale(0.95); opacity: 0.1; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-5vh) rotate(5deg) scale(1.05); opacity: 0.2; }
        }
      `}} />
        </BackgroundContainer>
    );
}
