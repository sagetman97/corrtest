/* eslint-disable vue/one-component-per-file */
import { defineComponent, h } from 'vue'

import { useMedia } from '@/composables/useMedia'

describe('useMedia', () => {
  it('correctly detects viewport width changes', () => {
    const matchSpy = cy.spy().as('matchSpy')

    cy.mount(
      defineComponent({
        setup() {
          const matches = useMedia('(max-width: 600px)')
          return () =>
            h('div', {
              'data-testid': 'media-test',
              style: 'width: 100px; height: 100px; background: #eee;',
              onClick: () => matchSpy(matches.value),
            })
        },
      })
    )

    // Should be false at desktop width
    cy.viewport(1024, 768)
    cy.wait(100) // Give time for media query to update
    cy.get('[data-testid=media-test]').click()
    cy.get('@matchSpy').should('have.been.calledWith', false)

    // Should be true at mobile width
    cy.viewport(375, 667)
    cy.wait(100) // Give time for media query to update
    cy.get('[data-testid=media-test]').click()
    cy.get('@matchSpy').should('have.been.calledWith', true)
  })

  it('correctly detects orientation changes', () => {
    const matchSpy = cy.spy().as('matchSpy')

    cy.mount(
      defineComponent({
        setup() {
          const matches = useMedia('(orientation: portrait)')
          return () =>
            h('div', {
              'data-testid': 'media-test',
              style: 'width: 100px; height: 100px; background: #eee;',
              onClick: () => matchSpy(matches.value),
            })
        },
      })
    )

    // Should be false in landscape
    cy.viewport(1024, 768)
    cy.wait(100) // Give time for media query to update
    cy.get('[data-testid=media-test]').click()
    cy.get('@matchSpy').should('have.been.calledWith', false)

    // Should be true in portrait
    cy.viewport(375, 667)
    cy.wait(100) // Give time for media query to update
    cy.get('[data-testid=media-test]').click()
    cy.get('@matchSpy').should('have.been.calledWith', true)
  })
})
