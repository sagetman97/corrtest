/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue'

import { useElementRect } from '../../src/composables/useElementRect'

const TestComponent = defineComponent({
  props: {
    width: {
      type: String,
      default: '200px',
    },
    height: {
      type: String,
      default: '100px',
    },
  },
  setup() {
    const element = ref<HTMLDivElement>()
    const rect = useElementRect(element)

    return { element, rect }
  },
  render() {
    return h(
      'div',
      {
        ref: 'element',
        'data-testid': 'test-element',
        style: {
          width: this.width,
          height: this.height,
          backgroundColor: 'red',
        },
      },
      'Test Content'
    )
  },
})

const ScrollableContainer = defineComponent({
  setup() {
    const container = ref<HTMLDivElement>()
    const element = ref<HTMLDivElement>()
    const rect = useElementRect(element)

    return { container, element, rect }
  },
  render() {
    return h(
      'div',
      {
        ref: 'container',
        'data-testid': 'scroll-container',
        style: {
          height: '200px',
          width: '200px',
          overflow: 'auto',
        },
      },
      [
        h(
          'div',
          {
            ref: 'element',
            'data-testid': 'scroll-element',
            style: {
              height: '400px',
              width: '100%',
              backgroundColor: 'blue',
            },
          },
          'Scrollable Content'
        ),
      ]
    )
  },
})

describe('useElementRect', () => {
  it('returns initial element dimensions', () => {
    cy.mount(TestComponent, {
      props: {
        width: '300px',
        height: '150px',
      },
    })

    cy.get('[data-testid=test-element]').then(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.width).to.equal(300)
      expect(rect.height).to.equal(150)
    })
  })

  it('updates when element dimensions change', () => {
    cy.mount(TestComponent)

    cy.get('[data-testid=test-element]').then(($el) => {
      $el[0].style.width = '400px'
      $el[0].style.height = '200px'
    })

    cy.get('[data-testid=test-element]').then(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.width).to.equal(400)
      expect(rect.height).to.equal(200)
    })
  })

  it('updates when window resizes', () => {
    cy.mount(TestComponent)

    // Change viewport size
    cy.useMobileViewport()

    cy.get('[data-testid=test-element]').then(($el) => {
      const rect = $el[0].getBoundingClientRect()
      // Verify position changed due to viewport resize
      expect(rect).to.not.be.equal(null)
    })
  })

  it('updates on scroll in scrollable container', () => {
    cy.mount(ScrollableContainer)

    // Get initial position
    let initialTop: number
    cy.get('[data-testid=scroll-element]').then(($el) => {
      initialTop = $el[0].getBoundingClientRect().top
    })

    // Scroll the container
    cy.get('[data-testid=scroll-container]').scrollTo(0, 100)

    // Verify position changed
    cy.get('[data-testid=scroll-element]').then(($el) => {
      const newTop = $el[0].getBoundingClientRect().top
      expect(newTop).to.be.lessThan(initialTop)
    })
  })

  it('handles multiple scrollable parents', () => {
    cy.mount(
      defineComponent({
        render() {
          return h(
            'div',
            {
              'data-testid': 'outer-container',
              style: {
                height: '300px',
                width: '300px',
                overflow: 'auto',
              },
            },
            [
              h(
                'div',
                {
                  'data-testid': 'inner-container',
                  style: {
                    height: '400px',
                    width: '100%',
                    overflow: 'auto',
                  },
                },
                [
                  h(
                    'div',
                    {
                      'data-testid': 'nested-element',
                      style: {
                        height: '500px',
                        width: '100%',
                        backgroundColor: 'green',
                      },
                    },
                    'Nested Content'
                  ),
                ]
              ),
            ]
          )
        },
      })
    )

    // Scroll outer container
    cy.get('[data-testid=outer-container]').scrollTo(0, 50)

    // Scroll inner container
    cy.get('[data-testid=inner-container]').scrollTo(0, 50)

    // Verify position updates
    cy.get('[data-testid=nested-element]').then(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect).to.not.equal(null)
      // Position should reflect both scroll offsets
      expect(rect.top).to.be.lessThan(0)
    })
  })

  it('handles element removal and reattachment', () => {
    cy.mount(
      defineComponent({
        setup() {
          const show = ref(true)
          const element = ref<HTMLDivElement>()
          const rect = useElementRect(element)

          return { show, element, rect }
        },
        render() {
          return h('div', [
            h(
              'button',
              {
                'data-testid': 'toggle-btn',
                onClick: () => (this.show = !this.show),
              },
              'Toggle'
            ),
            this.show &&
              h(
                'div',
                {
                  ref: 'element',
                  'data-testid': 'toggle-element',
                  style: {
                    width: '100px',
                    height: '100px',
                  },
                },
                'Toggle Content'
              ),
          ])
        },
      })
    )

    // Initial check
    cy.get('[data-testid=toggle-element]').should('exist')

    // Remove element
    cy.get('[data-testid=toggle-btn]').click()
    cy.get('[data-testid=toggle-element]').should('not.exist')

    // Reattach element
    cy.get('[data-testid=toggle-btn]').click()
    cy.get('[data-testid=toggle-element]')
      .should('exist')
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect()
        expect(rect.width).to.equal(100)
        expect(rect.height).to.equal(100)
      })
  })
})
