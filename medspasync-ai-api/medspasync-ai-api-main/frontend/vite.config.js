import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          analytics: ['exceljs', 'papaparse'],
          ui: ['lucide-react', 'react-dropzone']
        }
      }
    }
  },
  test: {
    environment: 'jsdom'
  },
  // Vercel deployment optimization
  preview: {
    port: 5173,
    host: true
  }
});
