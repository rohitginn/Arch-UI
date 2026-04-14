import { mount, MountingOptions } from '@vue/test-utils';
import type { Component } from 'vue';
import { vi } from 'vitest';

// Mock component or directive mimicking your ThemeProvider in Vue
const ThemeProviderMock = {
  name: 'ThemeProvider',
  props: {
    theme: { type: String, default: 'light' }
  },
  template: '<div :data-theme="theme" :class="`theme-${theme}`"><slot /></div>'
};

export const renderWithTheme = (component: Component, options: MountingOptions<any> = {}) => {
  return mount(component, {
    ...options,
    global: {
      ...options.global,
      components: {
        ...options.global?.components,
        ThemeProvider: ThemeProviderMock,
      },
      stubs: {
        ThemeProvider: false 
      }
    }
  });
};

export const testAllThemes = (component: Component, props: any = {}) => {
  const wrapper = mount(ThemeProviderMock, {
    props: { theme: 'light' },
    slots: {
      default: () => mount(component, { props }).element
    }
  });

  const lightHtml = wrapper.html();

  wrapper.setProps({ theme: 'dark' });
  const darkHtml = wrapper.html();

  return { lightHtml, darkHtml, wrapper };
};

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
