import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Helpful for debugging production builds
    outDir: 'dist',  // Explicit output directory for Netlify or static hosting
    emptyOutDir: true,
  },
  server: {
    port: 3000, // Optional: adjust as needed
    open: true,
  }
});
