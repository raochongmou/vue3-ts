import { fileURLToPath, URL } from 'node:url'
// const path = require('path');

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://152.136.185.210:5000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     },
  //   },
  // },
  resolve: {
    alias: {
      // '@': path.join(__dirname, './src'),
      // views: '@/views'
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'views': fileURLToPath(new URL('@/views', import.meta.url))
      // entries: [
      //   { find: '@', replacement: './src' },
      //   { find: 'views', replacement: './src/views' },
      // ]
    }
  },
  // build: {
  //   rollupOptions: {
  //     external: ['vue'],
  //     output: {
  //       globals: {
  //         vue:'Vue'
  //       }
  //     }
  //   }
  // }
  // module
})
