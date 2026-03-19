import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    glassmorphic: 'src/components/glassmorphic/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'framer-motion', 'tailwindcss', '@archui/core', 'lucide-react'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
