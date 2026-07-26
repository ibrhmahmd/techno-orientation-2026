import { defineConfig } from 'vite';

export default defineConfig({
  // Root is the project root (default)
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure we don't minify to the point of breaking readability if we need to inspect
    minify: 'esbuild'
  }
});
