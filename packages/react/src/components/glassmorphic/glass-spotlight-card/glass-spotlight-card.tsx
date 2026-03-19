'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { EffectContainer } from '../../../base';

export interface GlassSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: 'after' | 'before';
    from?: string;
    size?: number;
}

export function GlassSpotlightCard({
    children,
    className,
    mode = 'before',
    from = 'rgba(255,255,255,0.2)',
    size = 300,
    ...props
}: GlassSpotlightCardProps) {
    const divRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <EffectContainer
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                'overflow-hidden rounded-xl border border-white/40 bg-white/60 dark:border-white/[0.1] dark:bg-white/[0.06]',
                'backdrop-blur-md transition-all duration-300 ease-out',
                'hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]',
                className
            )}
            effects={
                <div
                    className="transition duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${from}, transparent 80%)`,
                    }}
                />
            }
            {...props}
        >
            {children}
        </EffectContainer>
    );
}
