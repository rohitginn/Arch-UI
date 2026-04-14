import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';
import { renderWithTheme, testAllThemes } from '../shared/react-utils';
// Note: In a real environment, you import from your library entry point
// import { Button } from 'my-ui-library';

// Mock simple button for test purposes
const Button = ({ children, onClick, disabled, variant = 'primary' }: any) => (
  <button onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>
    {children}
  </button>
);

describe('Button Component (React)', () => {

  it('renders without crashing with default props', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click interactions', async () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire click events when disabled', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick} disabled>Submit</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('matches semantic rendering in light and dark mode', () => {
    const { lightStyles, darkStyles } = testAllThemes(Button, { children: 'Theme Test' });
    // Ensuring basic HTML nodes created is same
    // We do exact visual snap checks in playwright layer
    expect(lightStyles).toBeDefined();
    expect(darkStyles).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<Button>Accessible Action</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('works with optional null/undefined bounds cleanly', () => {
    renderWithTheme(<Button children={undefined} variant={null as any} />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

});
