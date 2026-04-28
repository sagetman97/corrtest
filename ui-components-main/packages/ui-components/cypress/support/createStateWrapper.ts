import { Component, defineComponent, h, ref } from 'vue'

import { ValidationState } from '@/types'

type StateWrapperProps = Record<string, unknown>

export function createStateWrapper<T>(component: Component, props: StateWrapperProps, initialState: ValidationState = 'normal') {
  return defineComponent({
    setup() {
      const state = ref<ValidationState>(initialState)
      return { state }
    },
    render() {
      return h('div', [
        h(component, {
          ...props,
          state: this.state,
        } as T),
        h(
          'button',
          {
            class: 'toggle-state',
            onClick: () => (this.state = this.state === 'normal' ? 'errored' : 'normal'),
          },
          'Toggle'
        ),
      ])
    },
  })
}
