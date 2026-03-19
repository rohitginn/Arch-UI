'use client';

import { useEffect, useState } from 'react';
import { cn } from '@archui/core';

interface MeteorsProps {
    number?: number;
    className?: string;
    color?: string;
}

interface MeteorStyle {
    left: string;
    animationDelay: string;
    animationDuration: string;
}

export const GlassMeteors = ({ number = 20, className, color }: MeteorsProps) => {
    const [meteors, setMeteors] = useState<MeteorStyle[]>([]);

    useEffect(() => {
        const meteorStyles = new Array(number).fill(true).map(() => ({
            left: Math.floor(Math.random() * 100) + '%',
            animationDelay: Math.random() * 1 + 0.2 + 's',
            animationDuration: Math.floor(Math.random() * 8 + 2) + 's',
        }));
        setMeteors(meteorStyles);
    }, [number]);

    return (
        <>
            {meteors.map((style, idx) => (
                <span
                    key={idx}
                    className={cn(
                        'pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor opacity-0 shadow-[0_0_0_1px_#ffffff10]',
                        className
                    )}
                    style={{
                        ...style,
                        backgroundColor: color || '#64748b'
                    }}
                >
                    {/* Trail */}
                    <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
                </span>
            ))}
        </>
    );
};
