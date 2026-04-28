/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue'

import { useEventListener } from '@/composables/useEventListener'

describe('useEventListener', () => {
  describe('Element Events', () => {
    it('handles click events on elements', () => {
      const clickSpy = cy.spy().as('clickSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            useEventListener(elementRef, 'click', clickSpy)

            return () =>
              h(
                'div',
                {
                  ref: elementRef,
                  class: 'test-element',
                  'data-cy': 'test-element',
                },
                [h('button', { class: 'test-button' }, 'Click Me'), h('input', { class: 'test-input', type: 'text' })]
              )
          },
        })
      )
        .get('[data-cy=test-element]')
        .should('be.visible')
        .click()

      cy.get('@clickSpy').should('have.been.calledOnce')
    })

    it('handles input events', () => {
      const inputSpy = cy.spy().as('inputSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            useEventListener(elementRef, 'input', inputSpy)

            return () =>
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'test-element',
                },
                [h('input', { class: 'test-input', type: 'text' })]
              )
          },
        })
      )

      cy.get('.test-input').type('test')
      cy.get('@inputSpy').should('have.been.called')
    })
  })

  describe('Window Events', () => {
    it('handles window resize events', () => {
      const resizeSpy = cy.spy().as('resizeSpy')

      cy.mount(
        defineComponent({
          setup() {
            useEventListener(window, 'resize', resizeSpy)
            return () => h('div')
          },
        })
      )

      cy.window().trigger('resize')
      cy.get('@resizeSpy').should('have.been.calledOnce')
    })
  })

  describe('Document Events', () => {
    it('handles document keydown events', () => {
      const keydownSpy = cy.spy().as('keydownSpy')

      cy.mount(
        defineComponent({
          setup() {
            useEventListener(document, 'keydown', keydownSpy)
            return () => h('div')
          },
        })
      )

      cy.document().trigger('keydown')
      cy.get('@keydownSpy').should('have.been.calledOnce')
    })
  })

  describe('Event Listener Management', () => {
    it('removes event listener when component is unmounted', () => {
      const clickSpy = cy.spy().as('clickSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            useEventListener(elementRef, 'click', clickSpy)

            return () =>
              h('div', {
                ref: elementRef,
                'data-cy': 'test-element',
                style: 'width: 100px; height: 100px; background: #ccc;', // Make element visible
              })
          },
        })
      )

      // First click - should trigger the spy
      cy.get('[data-cy=test-element]').should('exist').should('be.visible').click()
      cy.get('@clickSpy').should('have.been.calledOnce')

      // Unmount the component
      cy.then(() => {
        Cypress.vueWrapper.unmount()
      })

      // Verify the spy wasn't called again
      cy.get('@clickSpy').should('have.been.calledOnce')
    })

    it('supports manual add/remove of event listeners', () => {
      const clickSpy = cy.spy().as('clickSpy')
      let listener: { add: () => void; remove: () => void }

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            listener = useEventListener(elementRef, 'click', clickSpy)

            return () =>
              h('div', {
                ref: elementRef,
                'data-cy': 'test-element',
                style: 'width: 100px; height: 100px; background: #ccc;', // Make element visible
              })
          },
        })
      )

      // Remove listener
      cy.then(() => {
        listener.remove()
      })

      cy.get('[data-cy=test-element]').should('exist').should('be.visible').click()
      cy.get('@clickSpy').should('not.have.been.called')

      // Add listener back
      cy.then(() => {
        listener.add()
      })

      cy.get('[data-cy=test-element]').should('be.visible').click()
      cy.get('@clickSpy').should('have.been.calledOnce')
    })
  })

  describe('Event Options', () => {
    it('respects capture option', () => {
      const parentSpy = cy.spy().as('parentSpy')
      const childSpy = cy.spy().as('childSpy')

      cy.mount(
        defineComponent({
          setup() {
            const parentRef = ref<HTMLDivElement | null>(null)
            const childRef = ref<HTMLDivElement | null>(null)

            useEventListener(parentRef, 'click', parentSpy, { capture: true })
            useEventListener(childRef, 'click', childSpy)

            return () =>
              h(
                'div',
                {
                  ref: parentRef,
                  class: 'parent',
                },
                [
                  h(
                    'div',
                    {
                      ref: childRef,
                      class: 'child',
                    },
                    'Click Me'
                  ),
                ]
              )
          },
        })
      )

      cy.get('.child').click()
      cy.get('@parentSpy').should('have.been.calledBefore', cy.get('@childSpy'))
    })

    it('respects once option', () => {
      const clickSpy = cy.spy().as('clickSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            useEventListener(elementRef, 'click', clickSpy, { once: true })

            return () =>
              h('div', {
                ref: elementRef,
                'data-cy': 'test-element',
                style: 'width: 100px; height: 100px; background: #ccc;', // Make element visible
              })
          },
        })
      )

      cy.get('[data-cy=test-element]').should('exist').should('be.visible').click()
      cy.get('@clickSpy').should('have.been.calledOnce')

      cy.get('[data-cy=test-element]').should('be.visible').click()
      cy.get('@clickSpy').should('have.been.calledOnce')
    })
  })
})
