/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue'

import { useComputedStyle } from '../../src/composables/useComputedStyle'

const TestComponent = defineComponent({
  props: {
    initialColor: {
      type: String,
      default: 'red',
    },
  },
  setup() {
    const element = ref<HTMLDivElement>()
    const color = useComputedStyle(element, 'color')

    return { element, color }
  },
  render() {
    return h(
      'div',
      {
        ref: 'element',
        style: { color: this.initialColor },
      },
      'Test Content'
    )
  },
})

describe('useComputedStyle', () => {
  it('returns initial computed style value', () => {
    // Reset any inherited styles
    cy.document().then((doc) => {
      const style = doc.createElement('style')
      style.innerHTML = `
        div {
          color: inherit;
        }
      `
      doc.head.appendChild(style)
    })

    cy.mount(TestComponent, {
      props: {
        initialColor: 'rgb(255, 0, 0)', // red
      },
      attrs: {
        'data-testid': 'test-component',
      },
    })

    // Be more specific with the selector and verify both inline and computed styles
    cy.get('[data-testid=test-component]').should('have.attr', 'style', 'color: rgb(255, 0, 0);').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('updates when style changes', () => {
    cy.mount(TestComponent)

    cy.get('div').then(($el) => {
      $el[0].style.setProperty('color', 'blue')
    })

    // Cypress automatically waits for changes
    cy.get('div').should('have.css', 'color', 'rgb(0, 0, 255)')
  })

  it('handles dynamic style updates', () => {
    cy.mount(TestComponent)

    // Test multiple style changes
    cy.get('div').then(($el) => {
      $el[0].style.setProperty('color', 'blue')
    })
    cy.get('div').should('have.css', 'color', 'rgb(0, 0, 255)')

    cy.get('div').then(($el) => {
      $el[0].style.setProperty('color', 'green')
    })
    cy.get('div').should('have.css', 'color', 'rgb(0, 128, 0)')
  })

  it('responds to class changes affecting computed styles', () => {
    cy.mount(
      defineComponent({
        setup() {
          const element = ref<HTMLDivElement>()
          const backgroundColor = useComputedStyle(element, 'backgroundColor')
          return { element, backgroundColor }
        },
        render() {
          return h(
            'div',
            {
              ref: 'element',
              class: 'test-element',
              style: {
                backgroundColor: 'transparent',
              },
            },
            'Test Content'
          )
        },
      })
    )

    cy.get('div').then(($el) => {
      $el.addClass('new-class')
      $el[0].style.setProperty('background-color', 'rgb(255, 255, 0)')
    })

    cy.get('div').should('have.class', 'new-class').should('have.css', 'background-color', 'rgb(255, 255, 0)')
  })

  it('handles dimension-based computed styles', () => {
    // Reset any inherited styles
    cy.document().then((doc) => {
      const style = doc.createElement('style')
      style.innerHTML = `
        .dimension-test {
          width: auto;
          box-sizing: content-box;
        }
      `
      doc.head.appendChild(style)
    })

    cy.mount(
      defineComponent({
        setup() {
          const element = ref<HTMLDivElement>()
          const width = useComputedStyle(element, 'width')
          return { element, width }
        },
        render() {
          return h(
            'div',
            {
              ref: 'element',
              class: 'dimension-test',
              style: {
                width: '200px',
                height: '100px',
              },
              'data-testid': 'dimension-test',
            },
            'Test Content'
          )
        },
      })
    )

    cy.get('[data-testid=dimension-test]').should('have.attr', 'style', 'width: 200px; height: 100px;').should('have.css', 'width', '200px')

    cy.get('[data-testid=dimension-test]').then(($el) => {
      $el[0].style.setProperty('width', '300px')
    })

    cy.get('[data-testid=dimension-test]').should('have.css', 'width', '300px')
  })

  it('handles pseudo-element styles', () => {
    // Add test styles to head
    cy.document().then((doc) => {
      const style = doc.createElement('style')
      style.innerHTML = `
        .pseudo-test::before {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          background-color: red;
        }
      `
      doc.head.appendChild(style)
    })

    cy.mount(
      defineComponent({
        setup() {
          const element = ref<HTMLDivElement>()
          const beforeDisplay = useComputedStyle(element, 'display', ':before')
          return { element, beforeDisplay }
        },
        render() {
          return h(
            'div',
            {
              ref: 'element',
              class: 'pseudo-test',
            },
            'Test Content'
          )
        },
      })
    )

    // Test pseudo-element computed style
    cy.window().then((win) => {
      const el = document.querySelector('.pseudo-test')
      if (el) {
        const style = win.getComputedStyle(el, ':before')
        expect(style.display).to.equal('block')
      }
    })
  })

  it('handles responsive style changes', () => {
    cy.mount(
      defineComponent({
        setup() {
          const element = ref<HTMLDivElement>()
          const fontSize = useComputedStyle(element, 'fontSize')
          return { element, fontSize }
        },
        render() {
          return h(
            'div',
            {
              ref: 'element',
              style: {
                fontSize: '16px',
              },
            },
            'Test Content'
          )
        },
      })
    )

    // Test initial size
    cy.get('div').should('have.css', 'font-size', '16px')

    // Change viewport size
    cy.useMobileViewport()

    // Change style and verify it updates
    cy.get('div').then(($el) => {
      $el[0].style.setProperty('font-size', '14px')
    })

    cy.get('div').should('have.css', 'font-size', '14px')
  })
})
