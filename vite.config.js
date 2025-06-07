import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Make sure this import is here

export default defineConfig({
  plugins: [
    react(), // This plugin is crucial for JSX transformation
  ],
  // The esbuild config below was intended for .js files containing JSX,
  // but it seems it might be causing issues or not being applied correctly to .jsx.
  // For .jsx files, @vitejs/plugin-react (imported as 'react' above) should handle it natively.
  // Let's remove the explicit `esbuild` config for now,
  // and rely on `@vitejs/plugin-react`'s defaults for .jsx.
  // If errors persist after this, we can re-evaluate.
  /*
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/, // This targets .js files, not .jsx
    exclude: []
  },
  */
  optimizeDeps: {
    exclude: [], // Keep empty unless specific issues arise later
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});