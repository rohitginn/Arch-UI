import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // If using React, usually helpful
// import vue from '@vitejs/plugin-vue'; // If using Vue, needed

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/visual/**', 'node_modules/**'],
  },
});
