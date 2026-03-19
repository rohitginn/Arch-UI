'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { Mail, Lock } from 'lucide-react';
import { GlassCard } from '../glass-card';
import { GlassButton } from '../glass-button';
import { GlassInput } from '../glass-input';
import { GlassSeparator } from '../glass-separator';
import { GitHubIcon, GoogleIcon } from './icons';

export interface GlassLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Callback when form is submitted */
    onSubmit?: (data: any) => void;
    /** Callback for forgot password click */
    onForgotPassword?: () => void;
    /** Callback for sign up click */
    onSignUp?: () => void;
    /** Title of the form */
    title?: string;
    /** Subtitle/description */
    subtitle?: string;
    /** Optional logo element */
    logo?: React.ReactNode;
    /** Layout for social buttons */
    socialLayout?: 'horizontal' | 'vertical';
    /** Loading state */
    loading?: boolean;
}

/**
 * GlassLoginForm - A premium glassmorphic login form
 * 
 * Features:
 * - Built on GlassCard for beautiful glass effect
 * - Integrated GlassInput and GlassButton components
 * - Social login support
 * - Responsive design
 */
export function GlassLoginForm({
    className,
    onSubmit,
    onForgotPassword,
    onSignUp,
    title = "Welcome Back",
    subtitle = "Sign in to your account to continue",
    logo,
    socialLayout = 'horizontal',
    loading = false,
    ...props
}: GlassLoginFormProps) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.({ email, password });
    };

    return (
        <GlassCard
            className={cn(
                "w-full max-w-[420px] mx-auto p-8 sm:p-10",
                "bg-surface-glass backdrop-blur-3xl", // Hybrid: Organic Smoothness
                "border-surface-glass-border",
                "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.12)]", // Hybrid: Luxury Edge
                className
            )}
            variant="elevated"
            animated={false}
            shine
            {...props}
        >
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-10">
                {logo && <div className="mb-6 scale-110">{logo}</div>}
                <h2 className="text-3xl font-semibold tracking-tight text-text-primary mb-3">
                    {title}
                </h2>
                <p className="text-base text-text-secondary max-w-[280px]">
                    {subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                    <GlassInput
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        leftIcon={<Mail className="w-4 h-4 text-text-muted" />}
                        className="bg-surface-elevated focus:bg-surface-hover transition-colors duration-300"
                    />
                    <div className="space-y-2">
                        <GlassInput
                            id="password"
                            type="password"
                            placeholder="********"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            leftIcon={<Lock className="w-4 h-4 text-text-muted" />}
                            className="bg-surface-elevated focus:bg-surface-hover transition-colors duration-300"
                        />
                        {onForgotPassword && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onForgotPassword}
                                    className="text-xs font-medium text-text-secondary hover:text-interactive-primary transition-colors duration-300 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus rounded-sm"
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <GlassButton
                    type="submit"
                    variant="primary"
                    className="w-full font-semibold tracking-wide shadow-lg shadow-interactive-primary/25 hover:shadow-interactive-primary/40 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                    size="lg"
                    glow
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </GlassButton>
            </form>

            <div className="my-8 flex items-center gap-4">
                <GlassSeparator className="flex-1 opacity-50" />
                {/* Hybrid: Industrial Clarity */}
                <span className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-[0.2em]">Or continue with</span>
                <GlassSeparator className="flex-1 opacity-50" />
            </div>

            <div className={cn(
                "grid gap-4",
                socialLayout === 'horizontal' ? "grid-cols-2" : "grid-cols-1"
            )}>
                <GlassButton
                    variant="outline"
                    className="w-full border-border-subtle hover:bg-surface-hover transition-colors duration-300"
                    leftIcon={<GitHubIcon />}
                >
                    GitHub
                </GlassButton>
                <GlassButton
                    variant="outline"
                    className="w-full border-border-subtle hover:bg-surface-hover transition-colors duration-300"
                    leftIcon={<GoogleIcon />}
                >
                    Google
                </GlassButton>
            </div>

            {onSignUp && (
                <div className="mt-8 flex items-center justify-center gap-1.5 text-sm">
                    <span className="text-text-secondary">Don't have an account? </span>
                    <button
                        type="button"
                        onClick={onSignUp}
                        className="font-semibold text-text-primary hover:text-interactive-primary transition-colors duration-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus rounded-sm px-1 py-0.5"
                    >
                        Sign up
                    </button>
                </div>
            )}
        </GlassCard>
    );
}
