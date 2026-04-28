/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const demoPath = process.env.DEMO_PATH
const isDeployBuild = Boolean(demoPath)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), VueDevTools()],
  base: isDeployBuild ? `/${demoPath}/` : '/',
  build: {
    target: "ES2022",
    outDir: isDeployBuild ? `../../docs/${demoPath}` : 'dist',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0'
  },
  preview: {
    port: 4173
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@': resolve('../../packages/ui-components/src'),
      'vue-router': resolve('../../node_modules/vue-router'),
    },
  },
})
