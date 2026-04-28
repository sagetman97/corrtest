/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue'

import { useMutationObserver } from '@/composables/useMutationObserver'

describe('useMutationObserver', () => {
  const buttonStyles = 'width: 100px; height: 40px; margin: 5px; padding: 8px; background: #eee; display: block;'
  const elementStyles = 'width: 200px; height: 100px; padding: 16px; border: 1px solid #ccc; margin: 10px; display: block;'

  const createTestComponent = () =>
    defineComponent({
      setup() {
        const elementRef = ref<HTMLDivElement>()
        const callbackSpy = cy.spy().as('mutationCallback')
        const { observe, disconnect, check } = useMutationObserver(callbackSpy)

        return () =>
          h('div', { class: 'test-container', style: 'padding: 20px;' }, [
            h(
              'div',
              {
                ref: elementRef,
                'data-cy': 'observed-element',
                style: elementStyles,
              },
              [
                h(
                  'div',
                  {
                    'data-cy': 'child-element',
                    style: 'min-height: 20px;',
                  },
                  'Initial content'
                ),
              ]
            ),
            h(
              'button',
              {
                'data-cy': 'observe-btn',
                style: buttonStyles,
                onClick: () => observe(elementRef, { childList: true, subtree: true }),
              },
              'Observe'
            ),
            h(
              'button',
              {
                'data-cy': 'disconnect-btn',
                style: buttonStyles,
                onClick: () => disconnect(),
              },
              'Disconnect'
            ),
            h(
              'button',
              {
                'data-cy': 'check-btn',
                style: buttonStyles,
                onClick: () => check(elementRef),
              },
              'Check'
            ),
          ])
      },
    })

  it('observes DOM mutations', () => {
    // Mount component using the factory function
    cy.mount(createTestComponent())

    // Wait for the component to be ready
    cy.get('[data-cy=observed-element]').should('exist').should('be.visible')

    // Start observing
    cy.get('[data-cy=observe-btn]').should('be.visible').click()

    // Modify content and verify callback
    cy.get('[data-cy=child-element]')
      .should('be.visible')
      .then(($el) => {
        $el.text('Modified content')
      })

    cy.get('@mutationCallback').should('have.been.called')
  })

  it('stops observing after disconnect', () => {
    cy.mount(createTestComponent())

    cy.get('[data-cy=observed-element]').should('exist').should('be.visible')

    // Start observing
    cy.get('[data-cy=observe-btn]').should('be.visible').click()

    // Disconnect observer
    cy.get('[data-cy=disconnect-btn]').should('be.visible').click()

    // Modify the observed element
    cy.get('[data-cy=child-element]')
      .should('be.visible')
      .then(($el) => {
        $el.text('Modified after disconnect')
      })

    // Verify callback was not called
    cy.get('@mutationCallback').should('not.have.been.called')
  })

  it('performs one-time check', () => {
    cy.mount(createTestComponent())

    // Trigger check
    cy.get('[data-cy=check-btn]').should('be.visible').click()

    // Modify the observed element immediately
    cy.get('[data-cy=child-element]')
      .should('be.visible')
      .then(($el) => {
        $el.text('Modified during check')
      })

    // Verify callback was called once
    cy.get('@mutationCallback').should('have.been.calledOnce')

    // Wait more than 100ms and modify again
    cy.wait(150).then(() => {
      cy.get('[data-cy=child-element]')
        .should('be.visible')
        .then(($el) => {
          $el.text('Modified after check timeout')
        })
    })

    // Verify callback wasn't called again
    cy.get('@mutationCallback').should('have.been.calledOnce')
  })

  it('handles undefined element refs', () => {
    const TestComponent = defineComponent({
      setup() {
        const elementRef = ref<HTMLDivElement>()
        const callbackSpy = cy.spy().as('mutationCallback')
        const { observe, check } = useMutationObserver(callbackSpy)

        // Try to observe before element is defined
        observe(elementRef, { childList: true })
        check(elementRef)

        return () =>
          h('div', {
            ref: elementRef,
            style: elementStyles,
          })
      },
    })

    cy.mount(TestComponent)

    // Verify no errors occurred
    cy.get('@mutationCallback').should('not.have.been.called')
  })

  it('observes different mutation types', () => {
    cy.mount(
      defineComponent({
        setup() {
          const elementRef = ref<HTMLDivElement>()
          const callbackSpy = cy.spy().as('mutationCallback')
          const { observe } = useMutationObserver(callbackSpy)

          return () =>
            h('div', { style: 'padding: 20px;' }, [
              h(
                'div',
                {
                  ref: elementRef,
                  'data-cy': 'observed-element',
                  title: 'initial',
                  style: elementStyles,
                },
                [
                  h(
                    'div',
                    {
                      'data-cy': 'child-element',
                      style: 'min-height: 20px;',
                    },
                    'Initial content'
                  ),
                ]
              ),
              h(
                'button',
                {
                  'data-cy': 'observe-btn',
                  style: buttonStyles,
                  onClick: () =>
                    observe(elementRef, {
                      attributes: true,
                      childList: true,
                      characterData: true,
                      subtree: true,
                    }),
                },
                'Observe'
              ),
            ])
        },
      })
    )

    // Start observing
    cy.get('[data-cy=observe-btn]').should('be.visible').click()

    // Test attribute mutation
    cy.get('[data-cy=observed-element]')
      .should('be.visible')
      .then(($el) => {
        $el.attr('title', 'modified')
      })
    cy.get('@mutationCallback').should('have.been.called')

    // Test childList mutation
    cy.get('[data-cy=observed-element]')
      .should('be.visible')
      .then(($el) => {
        $el.append('<div style="min-height: 20px;">New child</div>')
      })
    cy.get('@mutationCallback').should('have.been.called')

    // Test characterData mutation
    cy.get('[data-cy=child-element]')
      .should('be.visible')
      .then(($el) => {
        $el.text('Modified text content')
      })
    cy.get('@mutationCallback').should('have.been.called')
  })

  it('cleans up observer on component unmount', () => {
    const TestComponent = defineComponent({
      setup() {
        const elementRef = ref<HTMLDivElement>()
        const callbackSpy = cy.spy().as('mutationCallback')
        const { observe } = useMutationObserver(callbackSpy)

        observe(elementRef, { childList: true })

        return () =>
          h('div', {
            ref: elementRef,
            style: elementStyles,
          })
      },
    })

    cy.mount(TestComponent)

    // Unmount component
    cy.get('div')
      .should('be.visible')
      .then(($el) => {
        $el.remove()
      })

    // Verify no errors occurred during cleanup
    cy.get('@mutationCallback').should('not.have.been.called')
  })
})
