import { RouteLocationRaw } from 'vue-router'

import { ButtonProps } from '@/types/button'

export type NavigationItem = ButtonProps & {
  label: string
  collapsedLabel?: string
  show?: boolean
}

export type NavigationGroup = NavigationItem & {
  items: NavigationItem[]
  color?: string
}

export type NavigationItemProps = NavigationItem

export type NavigationActionProps = ButtonProps & {
  label: string
}

export type NavigationGroupProps = NavigationItemProps &
  NavigationGroup & {
    open?: boolean
  }

export type Navigation = NavigationItem | NavigationGroup

export function isNavigationGroup(item: NavigationItem | NavigationGroup): item is NavigationGroup {
  return 'items' in item
}

export function isNamedRoute(route: RouteLocationRaw): route is { name: string } {
  return typeof route !== 'string' && 'name' in route
}

export type NavigationProps<T extends Navigation[]> = {
  items: T
}

export type NavigationSlots = {
  logo?(): unknown
  above?(): unknown
  footer?(): unknown
  right?(): unknown
}

export type PNavigationGroupSlots = {
  header?(props: { toggle: () => void; expanded: boolean }): unknown
}
