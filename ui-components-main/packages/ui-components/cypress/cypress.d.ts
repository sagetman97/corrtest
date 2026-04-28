import { ComponentProps } from 'vue-component-type-helpers'

declare global {
  namespace Cypress {
    interface Chainable {
      useMobileViewport(): Chainable<void>
      useLaptopViewport(): Chainable<void>
      useDesktopViewport(): Chainable<void>
      mount<Component>(
        component: Component,
        options?: {
          slots?: Record<string, unknown>
          props?: ComponentProps<Component>
          attrs?: Record<string, unknown>
          router?: unknown
          global?: unknown
        }
      ): Chainable<unknown>
    }
  }
}
