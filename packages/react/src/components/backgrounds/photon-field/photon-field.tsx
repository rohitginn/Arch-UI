'use client';

import * as React from 'react';
import { BackgroundBaseProps, pseudoRandom } from '@archui/core';
import { useBackground, BackgroundContainer } from '../shared';
import { useCanvasRenderer } from '../shared/use-canvas-renderer';
import { usePointerInteraction } from '../shared/use-pointer-interaction';

export interface PhotonFieldProps extends BackgroundBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** number of particles */
    particleCount?: number;
}

const defaultTokens = {
    '--bg-photon-count': 200,
    '--bg-photon-speed': 1,
    '--bg-photon-size-min': 1,
    '--bg-photon-size-max': 4,
};

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    hue: number;
    life: number;
    maxLife: number;
}

/**
 * Photon Field Background
 * A slow drifting field of tiny light points with trails and emergent clustering.
 */
export function PhotonField(props: PhotonFieldProps) {
    const { className, particleCount = 200, ...restProps } = props;

    const { cssVars, isReducedMotion, currentTheme } = useBackground({
        ...restProps,
        defaultTokens
    });

    const containerRef = React.useRef<HTMLDivElement>(null);
    const pointer = usePointerInteraction(
        props.interactions?.pointer === 'repel' || props.interactions?.pointer === 'attract',
        containerRef
    );

    // Particle state reference
    const particlesRef = React.useRef<Particle[]>([]);
    const initializedRef = React.useRef(false);

    // Determine base colors from theme (extracted from CSS later ideally, but hardcoded fallback here)
    const isDark = currentTheme === 'dark';

    // Canvas draw loop
    const draw = React.useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Semi-transparent clear for trailing effect
        ctx.globalCompositeOperation = 'source-over';

        // Trail fading based on reduced motion and speed
        const baseAlpha = isReducedMotion ? 1.0 : 0.15 * (1 / (props.speed || 1));
        ctx.fillStyle = isDark ? `rgba(2, 6, 23, ${baseAlpha})` : `rgba(248, 250, 252, ${baseAlpha})`;
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = 'screen'; // Use additive blending (screen works well for light/dark)

        const particles = particlesRef.current;

        // Interaction coordinates
        const px = (pointer.x + 1) / 2 * width;
        const py = (pointer.y + 1) / 2 * height;
        const isInteractive = props.interactions?.pointer && pointer.isHovering;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]!;

            // Motion update if not reduced
            if (!isReducedMotion) {
                // Apply mouse interaction
                if (isInteractive) {
                    const dx = px - p.x;
                    const dy = py - p.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 20000) {
                        const force = 1000 / (distSq + 100);
                        if (props.interactions?.pointer === 'repel') {
                            p.vx -= dx * force * 0.01;
                            p.vy -= dy * force * 0.01;
                        } else if (props.interactions?.pointer === 'attract') {
                            p.vx += dx * force * 0.01;
                            p.vy += dy * force * 0.01;
                        }
                    }
                }

                // Apply friction
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Apply slight random walk
                p.vx += (Math.random() - 0.5) * 0.1 * (props.speed || 1);
                p.vy += (Math.random() - 0.5) * 0.1 * (props.speed || 1);

                p.x += p.vx;
                p.y += p.vy;

                // Screen wrap
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                p.life++;
                if (p.life > p.maxLife) {
                    p.life = 0;
                    p.x = Math.random() * width;
                    p.y = Math.random() * height;
                    p.vx = (Math.random() - 0.5) * (props.speed || 1);
                    p.vy = (Math.random() - 0.5) * (props.speed || 1);
                }
            }

            // Draw particle
            const lifeRatio = p.life / p.maxLife;
            const fade = isReducedMotion ? 1 : Math.sin(lifeRatio * Math.PI); // fade in/out

            const baseColor = isDark ? `hsla(${p.hue}, 100%, 75%, ${0.6 * fade})` : `hsla(${p.hue}, 80%, 60%, ${0.4 * fade})`;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = baseColor;
            ctx.fill();

            // Optional inner bright core
            if (p.radius > 2) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 95%, ${0.9 * fade})`;
                ctx.fill();
            }
        }
    }, [isReducedMotion, props.speed, pointer, props.interactions, isDark]);

    const canvasRef = useCanvasRenderer(draw);

    // Initialize particles
    React.useEffect(() => {
        if (initializedRef.current) return;
        const rand = pseudoRandom(props.seed || 42); // Seeded random for positions
        const newParticles: Particle[] = [];

        // Base hue depends roughly on theme, but we add variance
        const baseHue = isDark ? 200 : 210; // Blueish

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                x: rand() * window.innerWidth, // Initial scatter across wide area
                y: rand() * window.innerHeight,
                vx: (rand() - 0.5) * (props.speed || 1),
                vy: (rand() - 0.5) * (props.speed || 1),
                radius: 1 + rand() * 3, // 1 to 4 px radius
                hue: baseHue + (rand() - 0.5) * 40, // Variance +/- 20
                life: rand() * 1000,
                maxLife: 500 + rand() * 1000
            });
        }
        particlesRef.current = newParticles;
        initializedRef.current = true;
    }, [particleCount, props.seed, props.speed, isDark]);

    return (
        <BackgroundContainer
            ref={containerRef}
            cssVars={cssVars}
            overlay={props.overlay}
            isReducedMotion={isReducedMotion}
            className={className}
            {...restProps}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                style={{ opacity: props.intensity ?? 0.5 }}
            />
        </BackgroundContainer>
    );
}
