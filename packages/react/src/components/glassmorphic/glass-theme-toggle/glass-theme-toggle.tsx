'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { Moon, Sun } from 'lucide-react';

export interface GlassThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onThemeChange?: (theme: 'light' | 'dark') => void;
    initialTheme?: 'light' | 'dark';
}

export function GlassThemeToggle({
    className,
    onThemeChange,
    initialTheme = 'light',
    ...props
}: GlassThemeToggleProps) {
    const [theme, setTheme] = React.useState<'light' | 'dark'>(initialTheme);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        onThemeChange?.(newTheme);

        // Toggle class on document
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'group relative flex h-10 w-10 items-center justify-center rounded-xl',
                'bg-white/80 dark:bg-white/[0.06]',
                'backdrop-blur-md',
                'border border-black/[0.08] dark:border-white/[0.08]',
                'shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.5)_inset]',
                'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                'hover:bg-white/90 dark:hover:bg-white/[0.1]',
                'hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]',
                'hover:-translate-y-[1px]',
                'active:scale-90',
                className
            )}
            aria-label="Toggle theme"
            {...props}
        >
            <Sun
                className={cn(
                    "h-[1.2rem] w-[1.2rem] transition-all duration-300 absolute",
                    theme === 'dark' ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100 text-amber-500"
                )}
            />
            <Moon
                className={cn(
                    "h-[1.2rem] w-[1.2rem] transition-all duration-300 absolute",
                    theme === 'light' ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100 text-blue-400"
                )}
            />
        </button>
    );
}
