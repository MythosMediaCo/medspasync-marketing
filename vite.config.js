import { defineConfig, loadEnv } from 'vite';
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH || '/';
  const apiBase = env.VITE_API_BASE_URL || 'http://localhost:5000';

  return {
    plugins: [react(), stripUseClient(), visualizer()],
    build: {
      sourcemap: mode !== 'production',
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
          },
        },
      },
      manifest: true,
      chunkSizeWarningLimit: 500,
    },
    define: {
      __API_BASE_URL__: JSON.stringify(apiBase),
    },
    base: basePath,
  };
});
