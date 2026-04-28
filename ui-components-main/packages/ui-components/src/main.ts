import '@/styles/main.css'

import { Plugin } from 'vue'

import * as components from '@/components'

export * from '@/components'
export * from '@/composables'
export * from '@/types'
export * from '@/utilities'

const plugin: Plugin = {
  install: (app) => {
    for (const [key, component] of Object.entries(components)) {
      app.component(key, component)
    }
  },
}

export default plugin
