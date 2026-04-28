import { RouteLocationRaw } from 'vue-router'

import { IconProps } from '@/types'

export type LinkProps = IconProps & {
  disabled?: boolean
  download?: boolean
  to?: RouteLocationRaw
}
