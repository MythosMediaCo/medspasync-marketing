// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

function stripUseClient() {
  return {
    name: 'strip-use-client',
    transform(code, id) {
      if (
        id.includes('node_modules') &&
        (code.includes('"use client"') || code.includes("'use client'"))
      ) {
        return code.replace(/['"]use client['"];?/g, '');
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    stripUseClient(),
    process.env.ANALYZE && visualizer({ open: true, gzipSize: true })
  ].filter(Boolean),
  build: {
    sourcemap: true
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  base: '/medspasync-frontend/'
});
