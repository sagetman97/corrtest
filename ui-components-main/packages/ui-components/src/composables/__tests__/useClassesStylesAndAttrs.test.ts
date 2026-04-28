import { describe, it, expect } from 'vitest'
import { useClassesStylesAndAttrs } from '../useClassesStylesAndAttrs'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const TestComponent = defineComponent({
  setup() {
    const { classes, styles, attrs } = useClassesStylesAndAttrs()
    return { classes, styles, attrs }
  },
  render() {
    return h('div', {
      class: this.classes,
      style: this.styles,
      ...this.attrs,
    })
  },
})

describe('useClassesStylesAndAttrs', () => {
  describe('Classes Handling', () => {
    it('handles string classes', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          class: 'test-class another-class',
        },
      })

      expect(wrapper.classes()).toContain('test-class')
      expect(wrapper.classes()).toContain('another-class')
    })

    it('handles array classes', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          class: ['test-class', 'another-class'],
        },
      })

      expect(wrapper.classes()).toContain('test-class')
      expect(wrapper.classes()).toContain('another-class')
    })

    it('handles object classes', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          class: {
            'test-class': true,
            'disabled-class': false,
            'active-class': true,
          },
        },
      })

      expect(wrapper.classes()).toContain('test-class')
      expect(wrapper.classes()).toContain('active-class')
      expect(wrapper.classes()).not.toContain('disabled-class')
    })
  })

  describe('Styles Handling', () => {
    it('handles string styles', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          style: 'color: red; background-color: blue',
        },
      })

      expect(wrapper.attributes('style')).toContain('color: red')
      expect(wrapper.attributes('style')).toContain('background-color: blue')
    })

    it('handles object styles', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          style: {
            color: 'red',
            backgroundColor: 'blue',
          },
        },
      })

      expect(wrapper.attributes('style')).toContain('color: red')
      expect(wrapper.attributes('style')).toContain('background-color: blue')
    })

    it('handles array styles', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          style: [
            { color: 'red' },
            { backgroundColor: 'blue' },
          ],
        },
      })

      expect(wrapper.attributes('style')).toContain('color: red')
      expect(wrapper.attributes('style')).toContain('background-color: blue')
    })
  })

  describe('Attributes Handling', () => {
    it('handles regular attributes', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          id: 'test-id',
          'data-testid': 'test-element',
          role: 'button',
        },
      })

      expect(wrapper.attributes('id')).toBe('test-id')
      expect(wrapper.attributes('data-testid')).toBe('test-element')
      expect(wrapper.attributes('role')).toBe('button')
    })

    it('handles boolean attributes', () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          disabled: true,
          hidden: false,
        },
      })

      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.attributes('hidden')).toBeUndefined()
    })
  })

  describe('Dynamic Updates', () => {
    it('updates when classes change', async () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          class: 'initial-class',
        },
      })

      expect(wrapper.classes()).toContain('initial-class')

      await wrapper.setProps({
        class: 'updated-class',
      })

      expect(wrapper.classes()).toContain('updated-class')
      expect(wrapper.classes()).not.toContain('initial-class')
    })

    it('updates when styles change', async () => {
      const wrapper = mount(TestComponent, {
        attrs: {
          style: { color: 'red' },
        },
      })

      expect(wrapper.attributes('style')).toContain('color: red')

      await wrapper.setProps({
        style: { color: 'blue' },
      })

      expect(wrapper.attributes('style')).toContain('color: blue')
      expect(wrapper.attributes('style')).not.toContain('color: red')
    })
  })
})
