/**
 * Generates CSS custom properties from an object of overrides.
 * Prefixes keys with '--bg-' if they don't already have it.
 */
export function tokensToCSSVars(tokens?: Record<string, string | number> | null): Record<string, string> {
  if (!tokens) return {};

  return Object.entries(tokens).reduce((acc, [key, value]) => {
    const cssVar = key.startsWith('--') ? key : `--bg-${key}`;
    // @ts-ignore
    acc[cssVar] = typeof value === 'number' ? value.toString() : value;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Resolves the active theme based on the system '.dark' class and prop overrides.
 * Returns 'dark' or 'light'.
 */
export function resolveTheme(
  themeOverride: 'light' | 'dark' | 'auto' = 'auto',
  systemIsDark: boolean = false
): 'light' | 'dark' {
  if (themeOverride !== 'auto') {
    return themeOverride;
  }
  return systemIsDark ? 'dark' : 'light';
}

/**
 * Deterministic PRNG based on a seed
 * Used so that random clouds/particles are stable across renders
 */
export function pseudoRandom(seed: number) {
  return function () {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646; /* return [0, 1) */
  };
}

/**
 * Clamps intensity to a safe range [0, 1]
 */
export function clampIntensity(val: number): number {
  return Math.max(0, Math.min(1, val));
}
