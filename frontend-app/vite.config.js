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
        jsxRuntime: 'classic',
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
        'react': resolve(__dirname, 'node_modules/react'),
        'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      },
    },
    
    build: {
      sourcemap: mode !== 'production',
      minify: 'terser',
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2015',
      
      // Asset optimization
      assetsInlineLimit: 4096, // Inline assets smaller than 4kb
      cssCodeSplit: true,
      
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
          manualChunks: (id) => {
            // Vendor chunks for better caching
            if (id.includes('node_modules')) {
              // React ecosystem
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              // Router
              if (id.includes('react-router')) {
                return 'vendor-router';
              }
              // Charts and visualization
              if (id.includes('recharts') || id.includes('d3')) {
                return 'vendor-charts';
              }
              // HTTP and utils
              if (id.includes('axios') || id.includes('date-fns') || id.includes('lodash')) {
                return 'vendor-utils';
              }
              // UI libraries
              if (id.includes('react-hot-toast') || id.includes('react-helmet') || id.includes('lucide-react')) {
                return 'vendor-ui';
              }
              // Authentication and form libraries
              if (id.includes('react-query') || id.includes('formik') || id.includes('yup')) {
                return 'vendor-data';
              }
              // Tailwind and CSS
              if (id.includes('tailwind') || id.includes('clsx') || id.includes('tailwind-merge')) {
                return 'vendor-styles';
              }
              // Everything else
              return 'vendor-misc';
            }
            
            // App chunks by feature
            if (id.includes('/pages/')) {
              const pageName = id.split('/pages/')[1].split('/')[0].replace('.jsx', '');
              return `page-${pageName}`;
            }
            
            if (id.includes('/components/')) {
              if (id.includes('/charts/')) return 'components-charts';
              if (id.includes('/auth/')) return 'components-auth';
              if (id.includes('/reconciliation/')) return 'components-reconciliation';
              if (id.includes('/Common/')) return 'components-common';
              return 'components-misc';
            }
            
            if (id.includes('/services/')) {
              return 'services';
            }
            
            if (id.includes('/utils/')) {
              return 'utils';
            }
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
            } else if (/\.css$/i.test(assetInfo.name)) {
              extType = 'css';
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
