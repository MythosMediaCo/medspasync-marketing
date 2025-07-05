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
  const apiBase = env.VITE_API_BASE_URL || 'https://api.medspasyncpro.com';
  const aiApiBase = env.VITE_AI_API_URL || 'https://aapii-production.up.railway.app';

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
      __AI_API_BASE_URL__: JSON.stringify(aiApiBase),
    },
    base: basePath,
    test: {
      include: ['src/**/*.test.{js,jsx,ts,tsx}', '__tests__/**/*.{js,jsx,ts,tsx}'],
      setupFiles: 'src/test/setup.js',
      exclude: ['**/backup/**', '**/medspasync-backend/**', '**/medspasync-ai-api/**', '**/node_modules/**', '**/dist/**'],
      environment: 'jsdom',
      globals: true
    }
  };
});
