/**
 * ZenUI Design Tokens - Premium Edition
 * Core design values for consistent styling across all components
 * 
 * Design Philosophy:
 * - Layered depth for realistic glassmorphism
 * - Multi-layer shadows for natural depth perception
 * - Refined opacity values for visible but elegant glass
 * - Spring-based animations for organic feel
 */

// ============================================================================
// GLASSMORPHIC TOKENS - ENHANCED
// ============================================================================

export const glassTokens = {
  // Enhanced blur scale with more granular options
  blur: {
    none: '0',
    subtle: '4px',    // Micro UI elements, tooltips
    sm: '8px',        // Buttons, badges, small cards
    md: '12px',       // Standard cards, dropdowns
    lg: '20px',       // Modal content, panels
    xl: '32px',       // Modal overlays, sidebars
    '2xl': '48px',    // Full-screen backdrops, hero sections
  },

  // Background colors - Light mode (Refined for Apple-like visibility)
  bgLight: {
    subtle: 'rgba(255, 255, 255, 0.4)',    // Hover states
    default: 'rgba(255, 255, 255, 0.6)',   // Standard glass - Needs to be visible
    elevated: 'rgba(255, 255, 255, 0.75)', // Modals, cards
    solid: 'rgba(255, 255, 255, 0.9)',     // Inputs, solid buttons
  },

  // Background colors - Dark mode
  bgDark: {
    subtle: 'rgba(255, 255, 255, 0.05)',
    default: 'rgba(255, 255, 255, 0.08)', 
    elevated: 'rgba(255, 255, 255, 0.12)',
    solid: 'rgba(255, 255, 255, 0.18)',
  },

  // Dual-layer border system
  border: {
    // Light mode - Visible but subtle
    light: {
      subtle: 'rgba(0, 0, 0, 0.04)',
      default: 'rgba(0, 0, 0, 0.08)',
      strong: 'rgba(0, 0, 0, 0.12)',
    },
    // Dark mode
    dark: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      default: 'rgba(255, 255, 255, 0.12)',
      strong: 'rgba(255, 255, 255, 0.2)',
    },
    hover: {
      light: 'rgba(0, 0, 0, 0.12)',
      dark: 'rgba(255, 255, 255, 0.2)',
    },
  },

  // Multi-layer shadows - Apple style soft shadows
  shadow: {
    // Subtle shadow for buttons
    sm: [
      '0 1px 2px rgba(0, 0, 0, 0.05)', // Key light
      '0 2px 4px rgba(0, 0, 0, 0.05)', // Fill light
    ].join(', '),
    // Standard shadow for cards
    md: [
      '0 2px 8px rgba(0, 0, 0, 0.04)',
      '0 6px 12px rgba(0, 0, 0, 0.04)',
      '0 12px 24px rgba(0, 0, 0, 0.03)',
    ].join(', '),
    // Elevated shadow
    lg: [
      '0 8px 16px rgba(0, 0, 0, 0.04)',
      '0 16px 32px rgba(0, 0, 0, 0.05)',
      '0 32px 64px rgba(0, 0, 0, 0.05)',
    ].join(', '),
    // Dramatic shadow
    xl: [
      '0 12px 24px rgba(0, 0, 0, 0.06)',
      '0 24px 48px rgba(0, 0, 0, 0.08)',
      '0 48px 96px rgba(0, 0, 0, 0.08)',
    ].join(', '),
  },

  // Inner highlights for glass realism
  innerHighlight: {
    subtle: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
    default: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
    strong: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    // Dark mode variants
    darkSubtle: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
    darkDefault: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
  },

  // Glow effects (refined)
  glow: {
    sm: '0 0 16px rgba(255, 255, 255, 0.08)',
    md: '0 0 24px rgba(255, 255, 255, 0.12)',
    lg: '0 0 40px rgba(255, 255, 255, 0.16)',
    // Colored glows
    primary: '0 0 24px rgba(59, 130, 246, 0.3)',
    success: '0 0 24px rgba(34, 197, 94, 0.3)',
    danger: '0 0 24px rgba(239, 68, 68, 0.3)',
  },

  // Noise texture for premium feel
  noise: {
    subtle: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
    opacity: '0.02',
  },
} as const;

// ============================================================================
// ANIMATION TOKENS - REFINED
// ============================================================================

export const animationTokens = {
  // Timing functions (refined for premium feel)
  easing: {
    // Standard Material Design curves
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Premium spring curves
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    springGentle: 'cubic-bezier(0.22, 1.2, 0.36, 1)',
    // Elegant smooth curves
    smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
    emphasized: 'cubic-bezier(0.4, 0, 0, 1)',
  },

  // Durations (refined scale)
  duration: {
    instant: '75ms',    // Color changes, opacity
    fast: '150ms',      // Hover states, micro-interactions
    default: '200ms',   // Standard transitions
    slow: '300ms',      // Modal entry, overlay fade
    slower: '400ms',    // Page transitions
    glacial: '500ms',   // Complex animations
  },

  // Pre-composed transitions
  hover: {
    lift: 'transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    glow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'background-color 75ms ease-out, border-color 75ms ease-out',
  },
} as const;

// ============================================================================
// SPACING TOKENS - 8PX GRID SYSTEM
// ============================================================================

export const spacingTokens = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
} as const;

// ============================================================================
// RADIUS TOKENS - REFINED
// ============================================================================

export const radiusTokens = {
  none: '0',
  sm: '0.375rem',   // 6px - subtle rounding
  md: '0.5rem',     // 8px - buttons, inputs
  lg: '0.75rem',    // 12px - cards
  xl: '1rem',       // 16px - modals
  '2xl': '1.25rem', // 20px - large cards
  '3xl': '1.5rem',  // 24px - hero elements
  full: '9999px',   // Pills
} as const;

// ============================================================================
// COLOR TOKENS - ENHANCED
// ============================================================================

export const colorTokens = {
  // Primary colors (refined blue)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Success colors (refined green)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Warning colors (refined amber)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Danger colors (refined red)
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Neutral colors (refined zinc scale)
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS - NEW
// ============================================================================

export const typographyTokens = {
  // Font families
  fontFamily: {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },

  // Font sizes with line heights
  fontSize: {
    xs: { size: '0.75rem', lineHeight: '1rem' },       // 12px
    sm: { size: '0.875rem', lineHeight: '1.25rem' },   // 14px
    base: { size: '1rem', lineHeight: '1.5rem' },      // 16px
    lg: { size: '1.125rem', lineHeight: '1.75rem' },   // 18px
    xl: { size: '1.25rem', lineHeight: '1.75rem' },    // 20px
    '2xl': { size: '1.5rem', lineHeight: '2rem' },     // 24px
    '3xl': { size: '1.875rem', lineHeight: '2.25rem' },// 30px
    '4xl': { size: '2.25rem', lineHeight: '2.5rem' },  // 36px
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
  },
} as const;

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================

export const tokens = {
  glass: glassTokens,
  animation: animationTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  color: colorTokens,
  typography: typographyTokens,
} as const;

export type GlassTokens = typeof glassTokens;
export type AnimationTokens = typeof animationTokens;
export type SpacingTokens = typeof spacingTokens;
export type RadiusTokens = typeof radiusTokens;
export type ColorTokens = typeof colorTokens;
export type TypographyTokens = typeof typographyTokens;
export type Tokens = typeof tokens;
