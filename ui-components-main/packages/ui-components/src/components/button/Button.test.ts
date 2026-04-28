import Button from './PButton.vue'
import { mount } from '@vue/test-utils'

describe('Button', () => {
  test('Button Renders', () => {
    const button = mount(Button)
    expect(button)
  })
})
