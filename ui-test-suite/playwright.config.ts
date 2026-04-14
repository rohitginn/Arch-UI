import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual', // Strictly only run files in this folder
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'dark-mode', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' } },
    { name: 'light-mode', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } }
  ],
});
