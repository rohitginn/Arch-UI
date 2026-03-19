'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { Mail, Lock, User } from 'lucide-react';
import { GlassCard } from '../glass-card';
import { GlassButton } from '../glass-button';
import { GlassInput } from '../glass-input';
import { GlassCheckbox } from '../../foundation/glass-checkbox';
import { GlassSeparator } from '../glass-separator';
import { GitHubIcon, GoogleIcon } from '../glass-login-form/icons';

export interface GlassSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Callback when form is submitted */
    onSubmit?: (data: any) => void;
    /** Callback for sign in click */
    onSignIn?: () => void;
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
 * GlassSignupForm - A premium glassmorphic sign up form
 */
export function GlassSignupForm({
    className,
    onSubmit,
    onSignIn,
    title = "Create an account",
    subtitle = "Enter your details to get started",
    logo,
    socialLayout = 'horizontal',
    loading = false,
    ...props
}: GlassSignupFormProps) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [agreeTerms, setAgreeTerms] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.({ name, email, password, agreeTerms });
    };

    return (
        <GlassCard
            className={cn(
                "w-full max-w-[420px] mx-auto p-8 sm:p-10",
                "bg-white/60 dark:bg-black/40",
                "border-white/40 dark:border-white/10",
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
                <h2 className="text-3xl font-bold tracking-tight text-form-text mb-3">
                    {title}
                </h2>
                <p className="text-base text-form-helper max-w-[280px]">
                    {subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <GlassInput
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        leftIcon={<User className="w-4 h-4 text-form-placeholder" />}
                        className="bg-form-bg focus:bg-form-bg-focus dark:bg-white/5 dark:focus:bg-white/10"
                    />
                    <GlassInput
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        leftIcon={<Mail className="w-4 h-4 text-form-placeholder" />}
                        className="bg-form-bg focus:bg-form-bg-focus dark:bg-white/5 dark:focus:bg-white/10"
                    />
                    <GlassInput
                        id="password"
                        type="password"
                        placeholder="********"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        leftIcon={<Lock className="w-4 h-4 text-form-placeholder" />}
                        className="bg-form-bg focus:bg-form-bg-focus dark:bg-white/5 dark:focus:bg-white/10"
                    />
                    <div className="pt-2">
                        <GlassCheckbox
                            id="terms"
                            checked={agreeTerms}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreeTerms(e.target.checked)}
                            label="I agree to the Terms of Service and Privacy Policy"
                        />
                    </div>
                </div>

                <GlassButton
                    type="submit"
                    variant="primary"
                    className="w-full font-semibold tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform active:scale-[0.98]"
                    size="lg"
                    glow
                    disabled={loading || !agreeTerms}
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </GlassButton>
            </form>

            <div className="my-8 flex items-center gap-4">
                <GlassSeparator className="flex-1 opacity-50" />
                <span className="text-xs font-medium text-form-placeholder uppercase tracking-wider">Or register with</span>
                <GlassSeparator className="flex-1 opacity-50" />
            </div>

            <div className={cn(
                "grid gap-4",
                socialLayout === 'horizontal' ? "grid-cols-2" : "grid-cols-1"
            )}>
                <GlassButton
                    variant="outline"
                    className="w-full border-form-border/50 hover:bg-form-bg-hover dark:hover:bg-white/5 transition-colors"
                    leftIcon={<GitHubIcon />}
                >
                    GitHub
                </GlassButton>
                <GlassButton
                    variant="outline"
                    className="w-full border-form-border/50 hover:bg-form-bg-hover dark:hover:bg-white/5 transition-colors"
                    leftIcon={<GoogleIcon />}
                >
                    Google
                </GlassButton>
            </div>

            {onSignIn && (
                <div className="mt-8 flex items-center justify-center gap-1 text-sm">
                    <span className="text-form-helper">Already have an account? </span>
                    <button
                        type="button"
                        onClick={onSignIn}
                        className="font-semibold text-form-text hover:text-primary transition-colors hover:underline"
                    >
                        Sign in
                    </button>
                </div>
            )}
        </GlassCard>
    );
}
