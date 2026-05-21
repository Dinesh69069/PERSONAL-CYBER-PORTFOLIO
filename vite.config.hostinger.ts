import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import compression from 'vite-plugin-compression';

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  // For custom domain (yoursite.com), use "/"
  // For subdirectory (yoursite.com/portfolio), use "/portfolio/"
  base: "/",
  
  plugins: [
    react(),
    // Gzip compression for broad compatibility
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
    // Brotli compression for modern browsers
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      compressionOptions: {
        level: 11
      },
      threshold: 1024,
      deleteOriginFile: false,
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
    sourcemap: false, // Disable for production
    minify: 'terser',
    
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-progress',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          'utils': [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
          ],
          'animations': [
            'gsap',
            'framer-motion',
          ],
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          const info = name.split('.');
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          } else if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
});
