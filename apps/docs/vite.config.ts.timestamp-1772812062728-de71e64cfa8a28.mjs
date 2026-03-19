// vite.config.ts
import { defineConfig } from "file:///D:/Programming/React/Project/ZenLab/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.30/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Programming/React/Project/ZenLab/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///D:/Programming/React/Project/ZenLab/node_modules/.pnpm/@tailwindcss+vite@4.1.18_vite@5.4.21/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\Programming\\React\\Project\\ZenLab\\apps\\docs";
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Resolve workspace packages directly from source so turbo parallel dev
      // works without requiring a prior build step. More-specific entries first.
      {
        find: "@archui/core/styles",
        replacement: path.resolve(__vite_injected_original_dirname, "../../packages/core/src/styles/glass-tokens.css")
      },
      {
        find: "@archui/react",
        replacement: path.resolve(__vite_injected_original_dirname, "../../packages/react/src/index.ts")
      },
      {
        find: "@archui/core",
        replacement: path.resolve(__vite_injected_original_dirname, "../../packages/core/src/index.ts")
      },
      {
        find: "@",
        replacement: path.resolve(__vite_injected_original_dirname, "./src")
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9ncmFtbWluZ1xcXFxSZWFjdFxcXFxQcm9qZWN0XFxcXFplbkxhYlxcXFxhcHBzXFxcXGRvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2dyYW1taW5nXFxcXFJlYWN0XFxcXFByb2plY3RcXFxcWmVuTGFiXFxcXGFwcHNcXFxcZG9jc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUHJvZ3JhbW1pbmcvUmVhY3QvUHJvamVjdC9aZW5MYWIvYXBwcy9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgdGFpbHdpbmRjc3MoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAgLy8gUmVzb2x2ZSB3b3Jrc3BhY2UgcGFja2FnZXMgZGlyZWN0bHkgZnJvbSBzb3VyY2Ugc28gdHVyYm8gcGFyYWxsZWwgZGV2XHJcbiAgICAgIC8vIHdvcmtzIHdpdGhvdXQgcmVxdWlyaW5nIGEgcHJpb3IgYnVpbGQgc3RlcC4gTW9yZS1zcGVjaWZpYyBlbnRyaWVzIGZpcnN0LlxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0BhcmNodWkvY29yZS9zdHlsZXMnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvc3R5bGVzL2dsYXNzLXRva2Vucy5jc3MnKSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6ICdAYXJjaHVpL3JlYWN0JyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3BhY2thZ2VzL3JlYWN0L3NyYy9pbmRleC50cycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0BhcmNodWkvY29yZScsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9pbmRleC50cycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0AnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVUsU0FBUyxvQkFBb0I7QUFDcFcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztBQUFBLEVBQ2hDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQTtBQUFBO0FBQUEsTUFHTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsaURBQWlEO0FBQUEsTUFDeEY7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxtQ0FBbUM7QUFBQSxNQUMxRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGtDQUFrQztBQUFBLE1BQ3pFO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
