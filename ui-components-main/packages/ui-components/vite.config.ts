import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul'
import { defineConfig } from 'vitest/config'

import coverageConfig from './.nycrc.config.unit.mjs'

export default defineConfig({
  plugins: [vue(), istanbul({ cypress: Boolean(process.env.CYPRESS) })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@cySupport': resolve(__dirname, 'cypress/support'),
    },
  },
  build: {
    emptyOutDir: !process.argv.includes('--watch'),
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'UiComponents',
      fileName: 'ui-components',
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: coverageConfig,
  },
})
