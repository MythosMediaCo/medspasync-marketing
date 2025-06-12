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
  plugins: [react(), stripUseClient(), visualizer()],
  build: {
    sourcemap: true,
    minify: 'terser'
  },
  define: {
    'process.env': process.env
  },
  base: '/medspasync-frontend/'
});
