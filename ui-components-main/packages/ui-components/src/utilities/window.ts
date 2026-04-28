import { globalExists } from '@/utilities'

export function getWindowComputedStyle(element: Element | undefined, pseudoElt?: string | null | undefined): CSSStyleDeclaration | undefined {
  if (!globalExists('window') || !element) {
    return undefined
  }

  return window.getComputedStyle(element, pseudoElt)
}
