import 'vue-router'

import { IconProps } from './types'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    // Used in the useRouteBreadCrumbs composable for adding custom
    // bread crumb labels to routes
    crumb?: Partial<IconProps> & {
      label?: string
      icon?: string
      path?: string
    }
  }
}
