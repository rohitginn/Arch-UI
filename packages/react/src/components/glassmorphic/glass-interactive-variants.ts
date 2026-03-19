/**
 * Glass Interactive Variants
 *
 * Shared variant class map for all interactive glassmorphic components.
 * Uses CSS custom properties from glass-tokens.css so light/dark
 * adaptation is handled at the token layer, not in each component.
 *
 * Usage:
 *   import { glassVariant } from '../glass-interactive-variants';
 *   <div className={cn(glassVariant[variant].surface, ...)}>
 */

export type GlassVariant = 'default' | 'solid' | 'bordered';

/* ──────────────────────────────────────────────────────── */
/*  Surface (backgrounds)                                   */
/* ──────────────────────────────────────────────────────── */

const surfaceClasses = {
  default: [
    'bg-[var(--glass-surface)]',
    'backdrop-blur-xl',
    'shadow-[var(--glass-depth-md)]',
  ].join(' '),
  solid: [
    'bg-[var(--glass-solid-bg)]',
    'backdrop-blur-2xl',
    'shadow-[var(--glass-solid-shadow)]',
  ].join(' '),
  bordered: [
    'bg-[var(--glass-bordered-bg)]',
    'backdrop-blur-lg',
    'shadow-[var(--glass-bordered-shadow)]',
  ].join(' '),
} as const;

const surfaceHoverClasses = {
  default: 'hover:bg-[var(--glass-surface-hover)]',
  solid: 'hover:bg-[var(--glass-solid-bg-hover)]',
  bordered: 'hover:bg-[var(--glass-bordered-bg-hover)]',
} as const;

/* ──────────────────────────────────────────────────────── */
/*  Borders                                                 */
/* ──────────────────────────────────────────────────────── */

const borderClasses = {
  default: 'border border-[var(--glass-edge)]',
  solid: 'border border-[var(--glass-solid-border)]',
  bordered: 'border border-[var(--glass-bordered-border)]',
} as const;

const borderHoverClasses = {
  default: 'hover:border-[var(--glass-edge-hover)]',
  solid: 'hover:border-[var(--glass-solid-border)]',
  bordered: 'hover:border-[var(--glass-bordered-border)]',
} as const;

/* ──────────────────────────────────────────────────────── */
/*  Text                                                    */
/* ──────────────────────────────────────────────────────── */

const textClasses = {
  primary: 'text-[var(--glass-text)]',
  secondary: 'text-[var(--glass-text-secondary)]',
  muted: 'text-[var(--glass-text-muted)]',
  placeholder: 'text-[var(--glass-text-placeholder)]',
} as const;

/* ──────────────────────────────────────────────────────── */
/*  Utility classes                                         */
/* ──────────────────────────────────────────────────────── */

const dividerClass = 'border-[var(--glass-divider)]';

const highlightClass =
  'shadow-[var(--glass-highlight)]';

const itemSurfaceClasses = {
  default: 'bg-[var(--glass-surface-hover)]/55 hover:bg-[var(--glass-surface-hover)]',
  solid: 'bg-[var(--glass-solid-bg)]/70 hover:bg-[var(--glass-solid-bg-hover)]',
  bordered: 'bg-[var(--glass-bordered-bg)] hover:bg-[var(--glass-bordered-bg-hover)]',
} as const;

const itemActiveClasses = {
  default: 'bg-[var(--glass-surface-active)]',
  solid: 'bg-[var(--glass-solid-bg-hover)]',
  bordered: 'bg-[var(--glass-bordered-bg-hover)]',
} as const;

const controlTrackClasses = {
  default: 'bg-[var(--glass-surface-hover)]/60 border border-[var(--glass-edge)]',
  solid: 'bg-[var(--glass-solid-bg)]/80 border border-[var(--glass-solid-border)]',
  bordered: 'bg-[var(--glass-bordered-bg)] border border-[var(--glass-bordered-border)]',
} as const;

const controlIndicatorClasses = {
  default: 'bg-[var(--glass-surface-elevated)] border border-[var(--glass-edge)] shadow-[var(--glass-depth-sm)]',
  solid: 'bg-[var(--glass-solid-bg-hover)] border border-[var(--glass-solid-border)] shadow-[var(--glass-solid-shadow)]',
  bordered: 'bg-[var(--glass-bordered-bg-hover)] border border-[var(--glass-bordered-border)] shadow-[var(--glass-bordered-shadow)]',
} as const;

/* ──────────────────────────────────────────────────────── */
/*  Assembled variant map                                   */
/* ──────────────────────────────────────────────────────── */

export const glassVariant = {
  default: {
    surface: surfaceClasses.default,
    surfaceHover: surfaceHoverClasses.default,
    border: borderClasses.default,
    borderHover: borderHoverClasses.default,
  },
  solid: {
    surface: surfaceClasses.solid,
    surfaceHover: surfaceHoverClasses.solid,
    border: borderClasses.solid,
    borderHover: borderHoverClasses.solid,
  },
  bordered: {
    surface: surfaceClasses.bordered,
    surfaceHover: surfaceHoverClasses.bordered,
    border: borderClasses.bordered,
    borderHover: borderHoverClasses.bordered,
  },
} as const;

/** Theme-aware text classes shared by all interactive components */
export const glassText = textClasses;

/** Theme-aware divider / separator class */
export const glassDivider = dividerClass;

/** Inset highlight for glass depth illusion */
export const glassHighlight = highlightClass;

/** Theme-aware item/card surfaces for interactive rows */
export const glassItemSurface = itemSurfaceClasses;

/** Theme-aware selected/active state surfaces */
export const glassItemActive = itemActiveClasses;

/** Theme-aware track backgrounds (segmented controls/steppers) */
export const glassControlTrack = controlTrackClasses;

/** Theme-aware indicator backgrounds (segmented controls/selected node) */
export const glassControlIndicator = controlIndicatorClasses;

/**
 * Convenience: get the full panel class set for a variant.
 * Returns a single string with surface + border + highlight.
 */
export function glassPanelClasses(variant: GlassVariant = 'default'): string {
  const v = glassVariant[variant];
  return [v.surface, v.border, highlightClass].join(' ');
}
