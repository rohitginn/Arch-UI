import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { vi } from 'vitest';

// Replace this with your actual ThemeProvider from the library
interface ThemeProviderProps {
  theme?: 'light' | 'dark' | 'system';
  children: React.ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme = 'light', children }) => (
  // Example proxy provider injection
  <div data-theme={theme} className={`theme-${theme}`}>
    {children}
  </div>
);

// Helper for rendering with ThemeProvider
export const renderWithTheme = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult => {
  return rtlRender(ui, { wrapper: ThemeProvider, ...options });
};

// Helper for rendering identically across themes to verify classes
export const testAllThemes = (Component: React.FC<any>, props: any = {}) => {
  const { rerender, container } = rtlRender(
    <ThemeProvider theme="light">
      <Component {...props} />
    </ThemeProvider>
  );
  
  const lightStyles = window.getComputedStyle(container.firstChild as Element);
  
  rerender(
    <ThemeProvider theme="dark">
      <Component {...props} />
    </ThemeProvider>
  );
  
  const darkStyles = window.getComputedStyle(container.firstChild as Element);
  
  return { lightStyles, darkStyles };
};

// Simulate prefers-reduced-motion
export const simulateReducedMotion = (matches = true) => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: query.includes('prefers-reduced-motion') ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};
