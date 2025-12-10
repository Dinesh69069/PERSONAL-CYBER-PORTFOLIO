import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import compression from 'vite-plugin-compression';

const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  base: "/PERSONAL-CYBER-PORTFOLIO/",
  plugins: [
    react(),
    // keep gzip for broad compatibility
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // add Brotli compressed assets for clients that support it
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      compressionOptions: {
        level: 11
      },
      threshold: 1024
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      "@projects": path.resolve(import.meta.dirname, "client", "public", "Projects"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://server-2-sijx.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  assetsInclude: ['**/*.png'],
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    sourcemap: !isProd,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-avatar',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
            '@radix-ui/react-progress',
            'framer-motion'
          ],
          'utils': ['axios', 'zod'],
          'animations': ['gsap']
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  }
});
