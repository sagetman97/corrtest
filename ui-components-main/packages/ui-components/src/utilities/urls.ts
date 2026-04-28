import { RouteLocationRaw } from 'vue-router'

export function isRouteExternal(route: RouteLocationRaw): boolean {
  if (typeof route !== 'string') {
    return false
  }

  try {
    const url = new URL(route)
    return url.host !== window.location.host
  } catch {
    return false
  }
}
