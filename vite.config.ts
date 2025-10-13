import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // Позволяет импортировать SVG как компонент React:
        // import { ReactComponent as Logo } from './logo.svg'
        icon: true,
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      src: path.resolve(__dirname, 'src'),
      '@scss': path.resolve(__dirname, 'src/scss'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // чтобы можно было писать просто: @use '@scss/helpers' as *;
        includePaths: [path.resolve(__dirname, 'src')],
        // опционально — глобальные SCSS-переменные и mixins:
        // additionalData: `@use '@scss/helpers' as *;`
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
