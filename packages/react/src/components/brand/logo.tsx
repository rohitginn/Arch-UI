import React from 'react';
import { cn } from '@archui/core';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, className, ...props }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("inline-block drop-shadow-sm", className)}
            {...props}
        >
            <defs>
                {/* Liquid Surface Highlights */}
                <radialGradient id="liquid-specular" cx="12" cy="8" r="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="currentColor" stopOpacity="0.5" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="liquid-inner-glow" cx="16" cy="16" r="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="currentColor" stopOpacity="0.15" />
                    <stop offset="0.7" stopColor="currentColor" stopOpacity="0.05" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Liquid Body (Bezier Curved A) */}
            <path
                d="M16 4C22 4 27.5 24 28.5 28C26 28 24 28 22.5 28C21.5 24 19 12 16 12C13 12 10.5 24 9.5 28C8 28 6 28 3.5 28C4.5 24 10 4 16 4Z"
                fill="currentColor"
                fillOpacity="0.06"
            />

            {/* High-Gloss Perimeter */}
            <path
                d="M16 4C22 4 27.5 24 28.5 28M16 4C10 4 4.5 24 3.5 28"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            {/* Specular Light Reflection (Top Peak) */}
            <path
                d="M16 5.5C19.5 5.5 24.5 24 25 27M16 5.5C12.5 5.5 7.5 24 7 27"
                stroke="url(#liquid-specular)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeOpacity="0.8"
            />

            {/* Viscous Cross-Connection */}
            <path
                d="M11 19.5C11.5 19.5 16 18 20.5 19.5"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Refracted Edge Detail */}
            <path
                d="M13.5 17C14 17 16 16.5 18.5 17"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="1"
                strokeLinecap="round"
            />

            {/* Core Refraction Sphere */}
            <circle cx="16" cy="12" r="3.5" fill="url(#liquid-inner-glow)" />

            {/* Surface Tension Detail */}
            <path
                d="M16 4V6"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="0.5"
                strokeLinecap="round"
            />
        </svg>
    );
};
