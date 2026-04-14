import { configureAxe } from 'jest-axe';

// Extend accessibility configurations to handle any custom UI roles from the library
// For example, if you build complex Combobox or Modals that require temporary
// a11y overrides or custom rulesets:

export const axeConfigured = configureAxe({
  rules: {
    // Override rules if specific internal behaviors are intentional
    // 'color-contrast': { enabled: true }
  },
  impactLevels: ['critical', 'serious', 'moderate']
});
