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
  
  // Environment detection for demo app
  const environment = env.VITE_APP_ENVIRONMENT || 'demo';
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';
  
  // API base URL resolution for demo
  const apiBaseUrl = env.VITE_API_BASE_URL || 
    env[`VITE_API_BASE_URL_${environment.toUpperCase()}`] ||
    (isDevelopment ? 'http://localhost:5000' : 'https://api.medspasyncpro.com');
  
  // Base path configuration for demo
  const basePath = env.VITE_BASE_PATH || '/demo/';
  
  // Build optimization settings
  const enableSourcemaps = env.VITE_ENABLE_SOURCEMAPS !== 'false' && !isProduction;
  const enableMinification = env.VITE_MINIFY !== 'false' || isProduction;
  const enableChunkSplitting = env.VITE_SPLIT_CHUNKS !== 'false' || isProduction;
  
  // Performance settings
  const chunkSizeWarningLimit = parseInt(env.VITE_CHUNK_SIZE_WARNING_LIMIT) || 500;
  
  console.log(`🚀 Building Demo App for environment: ${environment}`);
  console.log(`📡 API Base URL: ${apiBaseUrl}`);
  console.log(`🔧 Base Path: ${basePath}`);
  console.log(`🔧 Source maps: ${enableSourcemaps ? 'enabled' : 'disabled'}`);
  console.log(`⚡ Minification: ${enableMinification ? 'enabled' : 'disabled'}`);

  return {
    plugins: [
      react(), 
      stripUseClient(), 
      visualizer({
        filename: 'dist/demo-stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true
      })
    ],
    
    // Base configuration for demo
    base: basePath,
    
    // Build configuration
    build: {
      sourcemap: enableSourcemaps,
      minify: enableMinification ? 'terser' : false,
      chunkSizeWarningLimit,
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: enableChunkSplitting ? {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['lucide-react'],
            utils: ['axios', 'papaparse']
          } : undefined,
        },
      },
      manifest: true,
      // Environment-specific optimizations
      ...(isProduction && {
        target: 'es2015',
        cssCodeSplit: true,
        reportCompressedSize: true
      })
    },
    
    // Development server configuration
    server: {
      port: parseInt(env.VITE_DEV_PORT) || 3001, // Different port for demo
      host: env.VITE_DEV_HOST || 'localhost',
      open: env.VITE_DEV_OPEN === 'true',
      cors: true,
      // Hot reload configuration
      hmr: env.VITE_ENABLE_HOT_RELOAD !== 'false' ? {
        overlay: true
      } : false
    },
    
    // Preview server configuration
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT) || 3001,
      host: env.VITE_PREVIEW_HOST || '0.0.0.0',
      open: env.VITE_PREVIEW_OPEN === 'true'
    },
    
    // Environment variable definitions
    define: {
      __API_BASE_URL__: JSON.stringify(apiBaseUrl),
      __APP_ENVIRONMENT__: JSON.stringify(environment),
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __ENABLE_DEBUG__: JSON.stringify(isDevelopment),
      __ENABLE_ANALYTICS__: JSON.stringify(env.VITE_ENABLE_ANALYTICS === 'true'),
      __ENABLE_ERROR_TRACKING__: JSON.stringify(env.VITE_ENABLE_ERROR_TRACKING === 'true'),
      __IS_DEMO_APP__: JSON.stringify(true)
    },
    
    // CSS configuration
    css: {
      devSourcemap: enableSourcemaps,
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          ...(isProduction ? [require('cssnano')] : [])
        ]
      }
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        'lucide-react',
        'papaparse'
      ]
    },
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@pages': '/src/pages',
        '@services': '/src/services',
        '@utils': '/src/utils',
        '@hooks': '/src/hooks',
        '@contexts': '/src/contexts'
      }
    },
    
    // Environment-specific configurations
    ...(isDevelopment && {
      // Development optimizations
      esbuild: {
        keepNames: true
      }
    }),
    
    ...(isProduction && {
      // Production optimizations
      build: {
        ...defineConfig().build,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
              ui: ['lucide-react'],
              utils: ['axios', 'papaparse']
            }
          }
        }
      }
    })
  };
}); 