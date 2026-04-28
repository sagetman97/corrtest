import { getCurrentInstance, getCurrentScope, onScopeDispose, onUnmounted } from 'vue'

export function tryOnScopeDispose(callback: () => void): boolean {
  if (getCurrentScope()) {
    onScopeDispose(callback)

    return true
  }

  if (getCurrentInstance()) {
    onUnmounted(callback)
    return true
  }

  return false
}
