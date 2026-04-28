import { getCurrentInstance, inject, InjectionKey } from 'vue'

export function injectFromSelfOrAncestor<T>(key: InjectionKey<T>): T | undefined {
  const value = getValueForInjectedKey(key as symbol)

  if (value !== undefined) {
    return value as T
  }

  return inject(key, undefined)
}

export function getValueForInjectedKey(key: symbol): unknown {
  const vm = getCurrentInstance()

  if (hasProvides(vm)) {
    return vm.provides[key]
  }
}

function hasProvides(value: unknown): value is { provides: Record<symbol, unknown> } {
  return !!value && typeof value === 'object' && 'provides' in value && typeof value.provides === 'object'
}
