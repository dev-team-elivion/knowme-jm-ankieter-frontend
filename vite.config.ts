import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material'],
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    dedupe: ['@emotion/react', '@emotion/styled'],
  },
  server: {
    // 3001, zeby front Ankietera mogl stac obok frontu jAIn (3000).
    port: 3001,
  },
});
