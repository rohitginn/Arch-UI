import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithTheme, simulateReducedMotion } from '../shared/react-utils';

// Mock Animated background component
const AnimatedBackground = ({ animate = true }: any) => {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div data-testid="bg" data-animated={animate && !isReduced} className="animated-bg">
      Content
    </div>
  );
};

describe('AnimatedBackground Component (React)', () => {
  it('enables animation by default', () => {
    simulateReducedMotion(false);
    renderWithTheme(<AnimatedBackground />);
    const bg = screen.getByTestId('bg');
    expect(bg.getAttribute('data-animated')).toBe('true');
  });

  it('respects prefers-reduced-motion media query', () => {
    simulateReducedMotion(true);
    renderWithTheme(<AnimatedBackground />);
    const bg = screen.getByTestId('bg');
    expect(bg.getAttribute('data-animated')).toBe('false');
  });

  it('stops animation when explicitly disabled', () => {
    simulateReducedMotion(false);
    renderWithTheme(<AnimatedBackground animate={false} />);
    const bg = screen.getByTestId('bg');
    expect(bg.getAttribute('data-animated')).toBe('false');
  });
});
