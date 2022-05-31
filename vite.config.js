import { fileURLToPath, URL } from 'url';
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Desinsafe',
          short_name: 'Desinsafe',
          description: 'Desinsafe controller application',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'img/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'img/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'img/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            }
          ]
        }
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: "https://api.desintrygg.no",
        changeOrigin: true,
      },
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/scss/custom";
        `,
      },
    },
  },
});
