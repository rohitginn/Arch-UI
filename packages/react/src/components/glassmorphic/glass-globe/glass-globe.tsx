'use client';

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '@archui/core';

export interface Marker {
    location: [number, number];
    size: number;
}

export interface Connection {
    start: [number, number];
    end: [number, number];
}

export interface GlassGlobeProps extends React.HTMLAttributes<HTMLDivElement> {
    markers?: Marker[];
    connections?: Connection[];
    /**
     * Visual variant of the container
     * @default "glass"
     */
    variant?: 'glass' | 'plain';
    globeConfig?: {
        width?: number;
        height?: number;
        delta?: number;
        onRender?: (state: Record<string, any>) => void;
        devicePixelRatio?: number;
        phi?: number;
        theta?: number;
        dark?: number;
        diffuse?: number;
        mapSamples?: number;
        mapBrightness?: number;
        baseColor?: [number, number, number];
        markerColor?: [number, number, number];
        glowColor?: [number, number, number];
        opacity?: number;
        offset?: [number, number];
    };
}

const getIntercalatedPoints = (start: [number, number], end: [number, number], steps: number) => {
    const [lat1, lon1] = start;
    const [lat2, lon2] = end;
    const points: [number, number][] = [];

    // Convert to radians
    const rLat1 = (lat1 * Math.PI) / 180;
    const rLon1 = (lon1 * Math.PI) / 180;
    const rLat2 = (lat2 * Math.PI) / 180;
    const rLon2 = (lon2 * Math.PI) / 180;

    const d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((rLat1 - rLat2) / 2), 2) +
        Math.cos(rLat1) * Math.cos(rLat2) * Math.pow(Math.sin((rLon1 - rLon2) / 2), 2)));

    for (let i = 0; i <= steps; i++) {
        const f = i / steps;
        const A = Math.sin((1 - f) * d) / Math.sin(d);
        const B = Math.sin(f * d) / Math.sin(d);

        const x = A * Math.cos(rLat1) * Math.cos(rLon1) + B * Math.cos(rLat2) * Math.cos(rLon2);
        const y = A * Math.cos(rLat1) * Math.sin(rLon1) + B * Math.cos(rLat2) * Math.sin(rLon2);
        const z = A * Math.sin(rLat1) + B * Math.sin(rLat2);

        const newLat = Math.atan2(z, Math.sqrt(x * x + y * y));
        const newLon = Math.atan2(y, x);

        points.push([(newLat * 180) / Math.PI, (newLon * 180) / Math.PI]);
    }
    return points;
};

export const GlassGlobe: React.FC<GlassGlobeProps> = ({
    className,
    markers = [],
    connections = [],
    variant = 'glass',
    globeConfig = {},
    ...props
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [r, setR] = React.useState(0);

    const defaultConfig = {
        width: 600,
        height: 600,
        onRender: () => { },
        devicePixelRatio: 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1] as [number, number, number],
        markerColor: [0.1, 0.8, 1] as [number, number, number],
        glowColor: [1, 1, 1] as [number, number, number],
        opacity: 1,
        offset: [0, 0] as [number, number],
    };

    const config = { ...defaultConfig, ...globeConfig };

    // Generate line markers from connections
    const lineMarkers = React.useMemo(() => {
        return connections.flatMap(connection => {
            const steps = 30;
            const points = getIntercalatedPoints(connection.start, connection.end, steps);
            return points.map((point, i) => {
                // Taper the size to create a "comet" look
                // Middle is thickest, ends are thinnest (or single direction)
                // Let's do a single direction taper: start -> end
                // i / steps is 0 to 1
                const progress = i / steps;
                // Create a curve for size: sin(progress * PI)
                // or just linear fade if we want directionality.
                // Let's try a parabolic size for "arc" feel.
                const size = Math.sin(progress * Math.PI) * 0.05 + 0.01;
                return {
                    location: point,
                    size: size,
                };
            });
        });
    }, [connections]);

    const allMarkers = [...markers, ...lineMarkers];

    useEffect(() => {
        let phi = 0;
        let width = 0;

        const onResize = () => {
            if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
                // width captured
            }
        };

        // Use ResizeObserver to detect size changes of the canvas container
        const resizeObserver = new ResizeObserver(() => {
            onResize();
        });

        if (canvasRef.current) {
            resizeObserver.observe(canvasRef.current);
            onResize(); // Initial check
        }

        const globe = createGlobe(canvasRef.current!, {
            ...config,
            width: config.width * 2,
            height: config.height * 2,
            markers: allMarkers,
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                if (!pointerInteracting.current) {
                    phi += 0.005;
                }
                state.phi = phi + r;
                // Update width/height based on current container size
                if (width > 0) {
                    state.width = width * 2;
                    state.height = width * 2;
                } else if (canvasRef.current && canvasRef.current.offsetWidth) {
                    // Fallback if width wasn't captured by resize event yet but is available
                    width = canvasRef.current.offsetWidth;
                    state.width = width * 2;
                    state.height = width * 2;
                }
            },
        });

        setTimeout(() => (canvasRef.current!.style.opacity = '1'));
        return () => {
            globe.destroy();
            resizeObserver.disconnect();
        };
    }, [allMarkers, globeConfig]);

    const variants = {
        glass: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl',
        plain: 'bg-transparent border-none shadow-none',
    };

    return (
        <div
            className={cn(
                'relative flex items-center justify-center overflow-hidden rounded-3xl',
                variants[variant],
                className
            )}
            {...props}
        >
            <div
                className="w-full relative aspect-square max-w-[600px]"
            >
                <canvas
                    ref={canvasRef}
                    onPointerDown={(e) => {
                        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                        canvasRef.current!.style.cursor = 'grabbing';
                    }}
                    onPointerUp={() => {
                        pointerInteracting.current = null;
                        canvasRef.current!.style.cursor = 'grab';
                    }}
                    onPointerOut={() => {
                        pointerInteracting.current = null;
                        canvasRef.current!.style.cursor = 'grab';
                    }}
                    onMouseMove={(e) => {
                        if (pointerInteracting.current !== null) {
                            const delta = e.clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                            setR(delta / 200);
                        }
                    }}
                    onTouchMove={(e) => {
                        if (pointerInteracting.current !== null && e.touches[0]) {
                            const delta = e.touches[0].clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                            setR(delta / 200);
                        }
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'grab',
                        contain: 'layout paint size',
                        opacity: 0,
                        transition: 'opacity 1s ease',
                    }}
                />
            </div>
        </div>
    );
};
