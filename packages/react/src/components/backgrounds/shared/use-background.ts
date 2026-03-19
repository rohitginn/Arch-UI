import * as React from 'react';
import { BackgroundBaseProps, resolveTheme, tokensToCSSVars, clampIntensity } from '@archui/core';
import { usePrefersReducedMotion } from '../../../utils/motion';

/**
 * Shared hook for background components.
 * Resolves theme, motion preference, and generates CSS variables from props.
 */
export function useBackground(props: BackgroundBaseProps & { defaultTokens?: Record<string, string | number> }) {
  const {
    theme = 'auto',
    colors,
    intensity = 0.5,
    motion,
    speed = 1,
    density = 1,
    accent,
    overlay,
    defaultTokens
  } = props;

  // Reduced motion handling
  const systemPrefersReduced = usePrefersReducedMotion();
  const isReducedMotion = motion === 'reduced' || (motion === false) || systemPrefersReduced;

  // System theme handling (simplified for this hook to handle 'auto')
  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDark = document.documentElement.classList.contains('dark');
    setSystemTheme(isDark ? 'dark' : 'light');
    
    // Optional: observe class changes on html
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setSystemTheme(isDark ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const currentTheme = resolveTheme(theme, systemTheme === 'dark');

  // Compute CSS variables
  const computedTokens: Record<string, string | number> = {
    ...defaultTokens,
  };

  // Safe overrides
  if (intensity !== undefined) {
    computedTokens['--bg-intensity'] = clampIntensity(intensity);
  }
  
  if (speed !== undefined) {
    // If reduced motion, drastically slow down
    computedTokens['--bg-speed'] = isReducedMotion ? speed * 100 : speed;
  }
  
  if (density !== undefined) {
    computedTokens['--bg-density'] = density;
  }
  
  if (overlay) {
    computedTokens['--bg-overlay'] = overlay.color;
    computedTokens['--bg-overlay-opacity'] = overlay.opacity;
  }

  // Accent color override
  if (accent) {
    computedTokens['--bg-accent-1'] = accent;
    computedTokens['--bg-accent-2'] = accent;
  }
  
  // Custom colors override
  if (colors) {
    Object.entries(colors).forEach(([key, val]) => {
      computedTokens[key] = val;
    });
  }

  const cssVars = tokensToCSSVars(computedTokens);

  return {
    isReducedMotion,
    currentTheme,
    cssVars,
  };
}
