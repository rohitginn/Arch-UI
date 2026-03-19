'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassOTPInputProps {
    /** Number of OTP digits */
    length?: number;
    /** Callback when OTP is complete */
    onComplete?: (otp: string) => void;
    /** Callback on value change */
    onChange?: (value: string) => void;
    /** Error state */
    error?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * GlassOTPInput - Premium glassmorphic OTP verification input
 * 
 * Features:
 * - Auto-focus next input on type
 * - Paste support for full OTP
 * - Smooth focus animations
 * - Error shake micro-interaction
 */
export function GlassOTPInput({
    length = 6,
    onComplete,
    onChange,
    error = false,
    disabled = false,
    className,
}: GlassOTPInputProps) {
    const [values, setValues] = React.useState<string[]>(Array(length).fill(''));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const handleChange = (index: number, value: string) => {
        if (disabled) return;

        // Only allow single digit
        const digit = value.replace(/\D/g, '').slice(-1);
        const newValues = [...values];
        newValues[index] = digit;
        setValues(newValues);

        const otp = newValues.join('');
        onChange?.(otp);

        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (otp.length === length && !otp.includes('')) {
            onComplete?.(otp);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            const newValues = [...values];
            newValues[index - 1] = '';
            setValues(newValues);
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        const newValues = [...values];
        for (let i = 0; i < pasted.length; i++) {
            newValues[i] = pasted[i];
        }
        setValues(newValues);
        onChange?.(newValues.join(''));

        if (pasted.length === length) {
            onComplete?.(pasted);
            inputRefs.current[length - 1]?.focus();
        } else {
            inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
        }
    };

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-2 sm:gap-3",
                error && "animate-[shake_0.5s_ease-in-out]",
                className
            )}
        >
            {values.map((value, index) => (
                <React.Fragment key={index}>
                    {/* Divider after 3rd digit for 6-length OTPs */}
                    {index === Math.floor(length / 2) && length >= 6 && (
                        <div className="w-3 h-px bg-form-border mx-1" />
                    )}
                    <input
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(-1)}
                        className={cn(
                            "w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-semibold",
                            "rounded-xl",
                            "bg-form-bg border-2 border-form-border",
                            "dark:bg-white/5 dark:border-white/10",
                            "text-form-text placeholder:text-form-placeholder",
                            "outline-none",
                            "transition-all duration-200 ease-out",
                            // Focus styles
                            "focus:border-primary focus:ring-2 focus:ring-ring-focus/20",
                            "dark:focus:border-white/30 dark:focus:ring-white/10",
                            // Filled styles
                            value && "border-primary/50 dark:border-white/20 bg-primary/5 dark:bg-white/8",
                            // Error styles
                            error && "border-red-500/50 dark:border-red-400/50 focus:ring-red-500/20",
                            // Scale micro-interaction on focus
                            focusedIndex === index && "scale-110 shadow-lg shadow-primary/10",
                            // Disabled
                            disabled && "opacity-50 cursor-not-allowed",
                        )}
                        aria-label={`Digit ${index + 1}`}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}
