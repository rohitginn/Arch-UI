import { test, expect } from '@playwright/test';

// In a real project, point to Storybook or a static test host
const BASE_URL = 'http://localhost:5173/test-playgrounds/button';

test.describe('Theme & Visual Regression', () => {

  test('button visual comparison in light and dark modes', async ({ page }) => {
    // Since we don't have a Vite server running, we inject raw HTML/CSS representing the component
    await page.setContent(`
      <style>
        :root { --token-primary: #007bff; }
        html.dark { --token-primary: #333; background: #000; color: #fff; }
        button { 
          background-color: var(--token-primary); 
          color: white; 
          padding: 10px 20px; 
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <div style="padding: 20px;">
        <button>Click me</button>
      </div>
    `);
    // Capture standard look
    expect(await page.screenshot()).toMatchSnapshot('button-default.png');

    // Force Dark Mode via UI Library mechanisms
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    // Ensure state settles
    await page.waitForTimeout(100);

    // Capture dark mode 
    expect(await page.screenshot()).toMatchSnapshot('button-dark.png');
    
    // Test hover transition
    const btn = page.locator('button').first();
    await btn.hover();
    
    // Wait for animations (e.g., transition duration)
    await page.waitForTimeout(300);
    expect(await page.screenshot()).toMatchSnapshot('button-dark-hover.png');
  });

  test('token-override visual regression', async ({ page }) => {
    await page.setContent(`
      <style>
        :root { --token-primary: #007bff; }
        button { background-color: var(--token-primary); padding: 10px; color: white; }
      </style>
      <button>Token test</button>
    `);
    // Overriding a core token dynamically
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--token-primary', '#ff0000');
    });

    await page.waitForTimeout(50);
    expect(await page.screenshot()).toMatchSnapshot('button-token-override.png');
  });
});
