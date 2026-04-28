import { nextTick } from 'vue'

import { mount } from '@vue/test-utils'
import * as v from 'valibot'

import { useValidation } from './useValidation'
import { useValidationObserver } from './useValidationObserver'

test('given colliding fields, does not interfere with with children', async () => {
  const observerComponent = {
    template: `<div>
      <div class="child-a"><slot name="childA"/></div>
      <div class="child-b"><slot name="childB"/></div>
      <div class="observer">{{isValid}}</div>
    </div>`,
    setup() {
      const { isValid } = useValidationObserver()

      return { isValid }
    },
  }

  const childAComponent = {
    template: '{{state}}',
    setup() {
      const schema = v.object({
        name: v.string(),
      })
      const { validate } = useValidation(schema)

      return { state: validate({ name: '012345' }) }
    },
  }

  const childBComponent = {
    template: '{{state}}',
    setup() {
      const schema = v.object({
        name: v.pipe(v.string(), v.minLength(8, 'Must have length 8')),
      })
      const { validate } = useValidation(schema)

      return { state: validate({ name: '012345' }) }
    },
  }

  const app = mount(observerComponent, {
    slots: {
      childA: childAComponent,
      childB: childBComponent,
    },
  })

  await nextTick()

  expect(app.find('.child-a').text()).toBe('true')
  expect(app.find('.child-b').text()).toBe('false')
  expect(app.find('.observer').text()).toBe('false')
})
