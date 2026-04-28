/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue'

import { useOutsideClick } from '@/composables/useOutsideClick'

describe('useOutsideClick', () => {
  const containerStyles = 'padding: 20px; background: #f0f0f0;'
  const elementStyles = 'width: 200px; height: 100px; padding: 16px; border: 1px solid #ccc; background: #fff;'
  const outsideButtonStyles = 'margin: 20px; padding: 8px; background: #eee;'

  it('detects clicks outside the target element', () => {
    const clickSpy = cy.spy().as('outsideClickSpy')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()

          useOutsideClick(elementRef, clickSpy)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'target-element',
                  style: elementStyles,
                },
                'Target Element'
              ),
              h(
                'button',
                {
                  'data-cy': 'outside-button',
                  style: outsideButtonStyles,
                },
                'Outside Button'
              ),
            ])
        },
      })
    )

    // Click outside should trigger callback
    cy.get('[data-cy=outside-button]').click()
    cy.get('@outsideClickSpy').should('have.been.calledOnce')

    // Click inside should not trigger callback
    cy.get('[data-cy=target-element]').click()
    cy.get('@outsideClickSpy').should('have.been.calledOnce')
  })

  it('handles nested elements correctly', () => {
    const clickSpy = cy.spy().as('outsideClickSpy')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()

          useOutsideClick(elementRef, clickSpy)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'target-element',
                  style: elementStyles,
                },
                [
                  h(
                    'button',
                    {
                      'data-cy': 'nested-button',
                      style: 'margin: 8px;',
                    },
                    'Nested Button'
                  ),
                ]
              ),
            ])
        },
      })
    )

    // Click on nested element should not trigger callback
    cy.get('[data-cy=nested-button]').click()
    cy.get('@outsideClickSpy').should('not.have.been.called')
  })

  it('handles undefined element refs', () => {
    const clickSpy = cy.spy().as('outsideClickSpy')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()

          useOutsideClick(elementRef, clickSpy)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'button',
                {
                  'data-cy': 'outside-button',
                  style: outsideButtonStyles,
                },
                'Outside Button'
              ),
            ])
        },
      })
    )

    // Click should not cause errors when ref is undefined
    cy.get('[data-cy=outside-button]').click()
    cy.get('@outsideClickSpy').should('have.been.called')
  })

  it('works with dynamically rendered elements', () => {
    const clickSpy = cy.spy().as('outsideClickSpy')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()
          const showElement = ref(false)

          useOutsideClick(elementRef, clickSpy)

          return () =>
            h('div', { style: containerStyles }, [
              showElement.value &&
                h(
                  'div',
                  {
                    ref: elementRef,
                    'data-cy': 'target-element',
                    style: elementStyles,
                  },
                  'Target Element'
                ),
              h(
                'button',
                {
                  'data-cy': 'toggle-button',
                  style: outsideButtonStyles,
                  onClick: () => (showElement.value = !showElement.value),
                },
                'Toggle Element'
              ),
              h(
                'button',
                {
                  'data-cy': 'outside-button',
                  style: outsideButtonStyles,
                },
                'Outside Button'
              ),
            ])
        },
      })
    )

    // Show element
    cy.get('[data-cy=toggle-button]').click()

    // Click outside should trigger callback
    cy.get('[data-cy=outside-button]').click()
    cy.get('@outsideClickSpy').should('have.been.called')

    // Hide element
    cy.get('[data-cy=toggle-button]').click()

    // Click should still work when element is hidden
    cy.get('[data-cy=outside-button]').click()
    cy.get('@outsideClickSpy').should('have.been.called')
  })

  it('handles multiple instances independently', () => {
    const clickSpy1 = cy.spy().as('outsideClickSpy1')
    const clickSpy2 = cy.spy().as('outsideClickSpy2')

    cy.mount(
      defineComponent({
        setup() {
          const element1Ref = ref<HTMLDivElement>()
          const element2Ref = ref<HTMLDivElement>()

          useOutsideClick(element1Ref, clickSpy1)
          useOutsideClick(element2Ref, clickSpy2)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: element1Ref,
                  'data-cy': 'target-element-1',
                  style: elementStyles,
                },
                'Target Element 1'
              ),
              h(
                'div',
                {
                  ref: element2Ref,
                  'data-cy': 'target-element-2',
                  style: elementStyles,
                },
                'Target Element 2'
              ),
              h(
                'button',
                {
                  'data-cy': 'outside-button',
                  style: outsideButtonStyles,
                },
                'Outside Button'
              ),
            ])
        },
      })
    )

    // Click outside should trigger both callbacks
    cy.get('[data-cy=outside-button]').click()
    cy.get('@outsideClickSpy1').should('have.been.calledOnce')
    cy.get('@outsideClickSpy2').should('have.been.calledOnce')

    // Click inside first element should only trigger second callback
    cy.get('[data-cy=target-element-1]').click()
    cy.get('@outsideClickSpy1').should('have.been.calledOnce')
    cy.get('@outsideClickSpy2').should('have.been.calledTwice')
  })
})
