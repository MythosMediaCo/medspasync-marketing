import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

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
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        fastRefresh: true,
        include: /\.(jsx|tsx)$/,
      }), 
      stripUseClient(), 
      visualizer()
    ],
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@context': resolve(__dirname, 'src/contexts'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@services': resolve(__dirname, 'src/services'),
      },
    },
    
    build: {
      sourcemap: mode !== 'production',
      minify: 'terser',
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2015',
      
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      } : {},
      
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['react-helmet-async', 'react-hot-toast'],
            charts: ['recharts'],
            utils: ['date-fns', 'axios'],
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId 
              ? chunkInfo.facadeModuleId.split('/').pop().replace('.js', '') 
              : 'chunk';
            return `js/${facadeModuleId}-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'media';
            } else if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'images';
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts';
            }
            
            return `${extType}/[name]-[hash][extname]`;
          },
        },
      },
      manifest: true,
      chunkSizeWarningLimit: 500,
    },
    
    define: {
      __API_BASE_URL__: JSON.stringify(apiBase),
      __AI_API_BASE_URL__: JSON.stringify(aiApiBase),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __IS_PRODUCTION__: isProduction,
      __PLATFORM_NAME__: JSON.stringify('MedSpaSync Pro'),
    },
    
    base: basePath,
    
    server: {
      port: 3000,
      open: true,
      host: true,
      cors: true,
      proxy: {
        '/api': {
          target: apiBase,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },
    
    preview: {
      port: 4173,
      host: true,
      cors: true,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    
    test: {
      include: ['src/**/*.test.{js,jsx,ts,tsx}', '__tests__/**/*.{js,jsx,ts,tsx}'],
      setupFiles: 'src/test/setup.js',
      exclude: ['**/backup/**', '**/medspasync-backend/**', '**/medspasync-ai-api/**', '**/node_modules/**', '**/dist/**'],
      environment: 'jsdom',
      globals: true
    }
  };
});
