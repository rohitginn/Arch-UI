import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * ZenUI Tailwind CSS Preset
 * 
 * Includes all the necessary configurations for glassmorphic components
 * and premium animations.
 * 
 * @example
 * // tailwind.config.ts
 * import zenui from '@zenui/core/tailwind.preset';
 * 
 * export default {
 *   presets: [zenui],
 *   content: ['./src/**\/*.{js,ts,jsx,tsx}'],
 * };
 */
const zenUIPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      // Glass blur values
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },

      // Glass background colors
      backgroundColor: {
        glass: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(255, 255, 255, 0.05)',
          'light-hover': 'rgba(255, 255, 255, 0.8)',
          'dark-hover': 'rgba(255, 255, 255, 0.08)',
        },
      },

      // Glass border colors
      borderColor: {
        glass: {
          light: 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.2)',
        },
      },

      // Box shadows for glass effects
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'glass-md': '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
        'glass-xl': '0 16px 48px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.12)',
        'glass-glow': '0 0 30px rgba(255, 255, 255, 0.1)',
        'glass-glow-lg': '0 0 40px rgba(255, 255, 255, 0.15)',
        // Color glows
        'glow-blue': '0 0 30px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.3)',
        'glow-green': '0 0 30px rgba(34, 197, 94, 0.3)',
        'glow-red': '0 0 30px rgba(239, 68, 68, 0.3)',
        'glow-amber': '0 0 30px rgba(245, 158, 11, 0.3)',
      },

      // Semantic Colors
      colors: {
        form: {
          bg: {
            DEFAULT: 'var(--form-bg)',
            hover: 'var(--form-bg-hover)',
            focus: 'var(--form-bg-focus)',
            disabled: 'var(--form-bg-disabled)',
          },
          text: 'var(--form-text)',
          label: 'var(--form-label)',
          placeholder: 'var(--form-placeholder)',
          helper: 'var(--form-helper)',
          border: {
            DEFAULT: 'var(--form-border)',
            hover: 'var(--form-border-hover)',
            focus: 'var(--form-border-focus)',
            disabled: 'var(--form-border-disabled)',
          },
          error: {
            text: 'var(--form-error-text)',
            border: 'var(--form-error-border)',
            ring: 'var(--form-error-ring)',
          },
        },
        surface: {
          bg: {
            DEFAULT: 'var(--surface-bg)',
            subtle: 'var(--surface-bg-subtle)',
            hover: 'var(--surface-bg-hover)',
            active: 'var(--surface-bg-active)',
          },
          border: {
            DEFAULT: 'var(--surface-border)',
            strong: 'var(--surface-border-strong)',
            hover: 'var(--surface-border-hover)',
          },
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        // Interactive surface tokens (used by tabs, avatar, nav, progress)
        interactive: {
          bg: {
            DEFAULT: 'var(--surface-bg-hover)',
            hover: 'var(--surface-bg-active)',
          },
        },
        ring: {
          focus: 'var(--ring-focus)',
          offset: 'var(--ring-offset)',
        },
      },

      // Animations
      animation: {
        // Ripple effect
        ripple: 'ripple 0.6s ease-out forwards',
        // Shine effect
        shine: 'shine 0.7s ease-out forwards',
        // Float effect
        float: 'float 3s ease-in-out infinite',
        // Pulse glow
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        // Fade in
        'fade-in': 'fade-in 0.3s ease-out',
        // Scale in
        'scale-in': 'scale-in 0.3s ease-out',
        // Slide up
        'slide-up': 'slide-up 0.3s ease-out',
      },

      keyframes: {
        ripple: {
          '0%': { width: '0', height: '0', opacity: '0.5' },
          '100%': { width: '200px', height: '200px', opacity: '0' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // GlassAlert entrance
        'slideIn': {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // GlassInput shake on error
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 50%, 90%': { transform: 'translateX(-4px)' },
          '30%, 70%': { transform: 'translateX(4px)' },
        },
        // GlassToast progress bar
        'toast-progress': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        // GlassProgress indeterminate
        'indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        // GlassProgress gradient shift
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // GlassProgress striped animation
        'progress-stripes': {
          '0%': { backgroundPosition: '1rem 0' },
          '100%': { backgroundPosition: '0 0' },
        },
        // GlassAvatar status pulse
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.9)' },
        },
      },

      // Transition timing functions
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    // Custom plugin for glass utilities
    plugin(function ({ addUtilities, addComponents }) {
      // Glass utility classes
      addUtilities({
        '.glass': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background-color': 'rgba(255, 255, 255, 0.05)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-light': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background-color': 'rgba(255, 255, 255, 0.7)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
        },
        '.glass-strong': {
          'backdrop-filter': 'blur(24px)',
          '-webkit-backdrop-filter': 'blur(24px)',
          'background-color': 'rgba(255, 255, 255, 0.08)',
          'border': '1px solid rgba(255, 255, 255, 0.15)',
        },
      });

      // Glass component classes
      addComponents({
        '.glass-card': {
          'position': 'relative',
          'border-radius': '1rem',
          'overflow': 'hidden',
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background-color': 'rgba(255, 255, 255, 0.05)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.12)',
          'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            'background-color': 'rgba(255, 255, 255, 0.08)',
          },
        },
        '.glass-button': {
          'position': 'relative',
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'border-radius': '0.75rem',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'color': 'white',
          'font-weight': '500',
          'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            'background-color': 'rgba(255, 255, 255, 0.15)',
          },
          '&:active': {
            'transform': 'scale(0.98)',
          },
        },
        '.glass-input': {
          'width': '100%',
          'border-radius': '0.75rem',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'background-color': 'rgba(255, 255, 255, 0.05)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'color': 'white',
          'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&::placeholder': {
            'color': 'rgba(255, 255, 255, 0.4)',
          },
          '&:focus': {
            'outline': 'none',
            'border-color': 'rgba(255, 255, 255, 0.3)',
            'box-shadow': '0 0 0 2px rgba(255, 255, 255, 0.1)',
          },
        },
      });
    }),
  ],
};

export default zenUIPreset;
