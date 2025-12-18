import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/auth', 'firebase/app'],
          'ui-vendor': ['lucide-react', 'gsap', 'lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
});
