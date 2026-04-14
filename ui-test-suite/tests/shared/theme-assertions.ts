import { expect } from 'vitest';

export const assertTokenStyles = (element: Element, expectedTokens: Record<string, string>) => {
  const computedStyle = window.getComputedStyle(element);
  
  Object.entries(expectedTokens).forEach(([cssPropery, cssVarToken]) => {
    // Check if the actual matched CSS value uses the exact var(--token-name) string
    // Works well if you can assert on the inline styles or mocked class styles
    expect(computedStyle.getPropertyValue(cssPropery)).toContain(`var(${cssVarToken})`);
  });
};

export const assertHasNoHardcodedColors = (element: Element) => {
  const styles = window.getComputedStyle(element);
  const colorProps = ['color', 'background-color', 'border-color'];
  
  colorProps.forEach(prop => {
    const val = styles.getPropertyValue(prop);
    if (val) {
      // Very basic rudimentary check, expect them to use css variables
      expect(val.includes('var(') || val === 'transparent' || val === 'inherit').toBeTruthy();
    }
  });
};
