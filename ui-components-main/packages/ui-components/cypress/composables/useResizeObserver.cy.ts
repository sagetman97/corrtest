/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue'

import { useResizeObserver } from '@/composables/useResizeObserver'

describe('useResizeObserver', () => {
  const containerStyles = 'padding: 20px; background: #f0f0f0;'
  const elementStyles = 'width: 200px; height: 100px; padding: 16px; border: 1px solid #ccc; background: #fff; resize: both; overflow: auto;'

  it('observes element resize', () => {
    const resizeSpy = cy.spy().as('resizeCallback')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()
          const { observe, disconnect } = useResizeObserver(resizeSpy)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'resizable-element',
                  style: elementStyles,
                },
                'Resizable Element'
              ),
              h(
                'button',
                {
                  'data-cy': 'observe-btn',
                  onClick: () => elementRef.value && observe(elementRef.value),
                },
                'Start Observing'
              ),
              h(
                'button',
                {
                  'data-cy': 'disconnect-btn',
                  onClick: () => disconnect(),
                },
                'Stop Observing'
              ),
            ])
        },
      })
    )

    // Start observing
    cy.get('[data-cy=observe-btn]').click()

    // Trigger resize by changing element style
    cy.get('[data-cy=resizable-element]').invoke('css', 'width', '300px').invoke('css', 'height', '150px')

    // Verify callback was called
    cy.get('@resizeCallback').should('have.been.called')
  })

  it('handles unobserve correctly', () => {
    const resizeSpy = cy.spy().as('resizeCallback')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()
          const { observe, unobserve } = useResizeObserver(resizeSpy)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'resizable-element',
                  style: elementStyles,
                },
                'Resizable Element'
              ),
              h(
                'button',
                {
                  'data-cy': 'observe-btn',
                  onClick: () => elementRef.value && observe(elementRef.value),
                },
                'Start Observing'
              ),
              h(
                'button',
                {
                  'data-cy': 'unobserve-btn',
                  onClick: () => elementRef.value && unobserve(elementRef.value),
                },
                'Stop Observing'
              ),
            ])
        },
      })
    )

    // Start observing
    cy.get('[data-cy=observe-btn]').click()

    // Trigger first resize
    cy.get('[data-cy=resizable-element]').invoke('css', 'width', '300px')

    // Verify callback was called
    cy.get('@resizeCallback').should('have.been.called')

    // Stop observing
    cy.get('[data-cy=unobserve-btn]').click()

    // Reset spy count
    cy.get('@resizeCallback').invoke('resetHistory')

    // Trigger second resize
    cy.get('[data-cy=resizable-element]').invoke('css', 'width', '400px')

    // Verify callback was not called after unobserve
    cy.get('@resizeCallback').should('not.have.been.called')
  })

  it('handles check method correctly', () => {
    const resizeSpy = cy.spy().as('resizeCallback')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()
          const { check } = useResizeObserver(resizeSpy)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'resizable-element',
                  style: elementStyles,
                },
                'Resizable Element'
              ),
              h(
                'button',
                {
                  'data-cy': 'check-btn',
                  onClick: () => elementRef.value && check(elementRef.value),
                },
                'Check Size'
              ),
            ])
        },
      })
    )

    // Trigger check
    cy.get('[data-cy=check-btn]').click()
    cy.wait(100)

    // Verify callback was called
    cy.get('@resizeCallback').should('have.been.called')
  })

  it('handles multiple elements independently', () => {
    const resizeSpy1 = cy.spy().as('resizeCallback1')
    const resizeSpy2 = cy.spy().as('resizeCallback2')

    cy.mount(
      defineComponent({
        setup() {
          const element1Ref = ref<HTMLDivElement>()
          const element2Ref = ref<HTMLDivElement>()
          const { observe: observe1 } = useResizeObserver(resizeSpy1)
          const { observe: observe2 } = useResizeObserver(resizeSpy2)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: element1Ref,
                  'data-cy': 'resizable-element-1',
                  style: elementStyles + 'margin-bottom: 20px;',
                },
                'Resizable Element 1'
              ),
              h(
                'div',
                {
                  ref: element2Ref,
                  'data-cy': 'resizable-element-2',
                  style: elementStyles,
                },
                'Resizable Element 2'
              ),
              h(
                'button',
                {
                  'data-cy': 'observe-btn-1',
                  onClick: () => element1Ref.value && observe1(element1Ref.value),
                },
                'Observe Element 1'
              ),
              h(
                'button',
                {
                  'data-cy': 'observe-btn-2',
                  onClick: () => element2Ref.value && observe2(element2Ref.value),
                },
                'Observe Element 2'
              ),
            ])
        },
      })
    )

    // Start observing first element only
    cy.get('[data-cy=observe-btn-1]').click()

    // Test first element
    cy.get('[data-cy=resizable-element-1]')
      .invoke('css', 'width', '300px')
      .wait(100)
      .then(() => {
        cy.get('@resizeCallback1').should('have.been.called')
        cy.get('@resizeCallback2').should('not.have.been.called')
      })

    // Reset spies and start observing second element
    cy.get('@resizeCallback1').invoke('resetHistory')
    cy.get('@resizeCallback2').invoke('resetHistory')
    cy.get('[data-cy=observe-btn-2]').click()
    cy.wait(100)

    // Test second element
    cy.get('[data-cy=resizable-element-2]')
      .invoke('css', 'width', '300px')
      .wait(100)
      .then(() => {
        cy.get('@resizeCallback1').should('not.have.been.called')
        cy.get('@resizeCallback2').should('have.been.called')
      })
  })

  it('cleans up observers on unmount', () => {
    const resizeSpy = cy.spy().as('resizeCallback')

    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()
          const { observe } = useResizeObserver(resizeSpy)

          return () =>
            h('div', { style: containerStyles }, [
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'resizable-element',
                  style: elementStyles,
                },
                'Resizable Element'
              ),
              h(
                'button',
                {
                  'data-cy': 'observe-btn',
                  onClick: () => elementRef.value && observe(elementRef.value),
                },
                'Start Observing'
              ),
            ])
        },
      })
    )

    // Start observing
    cy.get('[data-cy=observe-btn]').click()

    // Unmount component
    cy.get('[data-cy=resizable-element]').then(($el) => {
      $el.remove()
    })

    // Reset spy count
    cy.get('@resizeCallback').invoke('resetHistory')

    // Verify no callbacks after unmount
    cy.get('@resizeCallback').should('not.have.been.called')
  })
})
