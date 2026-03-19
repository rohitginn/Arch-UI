import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Resolve workspace packages directly from source so turbo parallel dev
      // works without requiring a prior build step. More-specific entries first.
      {
        find: '@archui/core/styles',
        replacement: path.resolve(__dirname, '../../packages/core/src/styles/glass-tokens.css'),
      },
      {
        find: '@archui/react',
        replacement: path.resolve(__dirname, '../../packages/react/src/index.ts'),
      },
      {
        find: '@archui/core',
        replacement: path.resolve(__dirname, '../../packages/core/src/index.ts'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
});
