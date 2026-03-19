import plugin from 'tailwindcss/plugin';

/**
 * Experimental Tailwind Plugin for ArchUI Background System
 * Provides utility classes for background component tokens
 */
export const archUIBackgroundsPlugin = plugin(
  ({ matchUtilities, theme }) => {
    // Utility for setting overall intensity (--bg-intensity)
    matchUtilities(
      {
        'bg-intensity': (value) => ({
          '--bg-intensity': value,
        }),
      },
      { values: theme('opacity') }
    );

    // Utility for setting speed multiplier (--bg-speed)
    matchUtilities(
      {
        'bg-speed': (value) => ({
          '--bg-speed': value,
        }),
      },
      {
        values: {
          '0': '0',
          '50': '0.5',
          '75': '0.75',
          '100': '1',
          '150': '1.5',
          '200': '2',
        },
      }
    );

    // Overlay utilities
    matchUtilities(
      {
        'bg-overlay': (value) => ({
          '--bg-overlay': value,
        }),
      },
      { type: 'color', values: theme('colors') }
    );

    matchUtilities(
      {
        'bg-overlay-opacity': (value) => ({
          '--bg-overlay-opacity': value,
        }),
      },
      { values: theme('opacity') }
    );
  }
);
