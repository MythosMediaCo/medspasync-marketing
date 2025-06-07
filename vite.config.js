// medspasync-frontend/vite.config.js
import { defineConfig } from 'vite'; // <<-- THIS LINE IS THE FIX
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // This plugin is crucial for React and JSX transformation
  ],
  css: {
    postcss: './postcss.config.js', // Explicitly tell Vite where to find PostCSS config
  },
  build: {
    outDir: 'dist', // Default build output directory for Vite
    emptyOutDir: true, // Clears the output directory before building
  },
  // You can add other configurations here if needed, e.g., for server port, host:
  // server: {
  //   port: 5173, // Ensure this matches the port you expect
  //   host: true, // For Codespaces, helps expose to network
  // }
});