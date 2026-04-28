import { defineComponent, h } from 'vue'

import { useMobile } from '@/composables/useMobile'

describe('useMobile', () => {
  const createTestComponent = (propertyToTest: keyof ReturnType<typeof useMobile>) => {
    const spy = cy.spy().as('valueSpy')

    return defineComponent({
      setup() {
        const mobile = useMobile()
        return () =>
          h('div', {
            'data-testid': 'test-element',
            style: 'width: 100px; height: 100px; background: #eee;', // Add dimensions
            onClick: () => spy(mobile[propertyToTest].value),
          })
      },
    })
  }

  beforeEach(() => {
    // Reset to desktop viewport
    cy.viewport(1280, 800)
  })

  const checkValue = () => {
    cy.wait(100)
    cy.get('[data-testid=test-element]').should('be.visible').click()
  }

  describe('viewport width detection', () => {
    it('correctly detects mobile width (<670px)', () => {
      cy.mount(createTestComponent('isMobileWidth'))

      // Should be false at desktop width
      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', false)

      // Should be true at mobile width
      cy.viewport(375, 667)
      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', true)
    })

    it('correctly detects tablet width (670px-1023px)', () => {
      cy.mount(createTestComponent('isTabletWidth'))

      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', false)

      // Should be true at tablet width
      cy.viewport(800, 102)
      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', true)
    })

    it('correctly detects laptop width (1024px-1279px)', () => {
      cy.mount(createTestComponent('isLaptopWidth'))

      // Should be false at desktop width
      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', false)

      // Should be true at laptop width
      cy.viewport(1100, 800)
      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', true)
    })

    it('correctly detects desktop width (≥1280px)', () => {
      cy.mount(createTestComponent('isDesktopWidth'))

      // Should be true at desktop width
      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', true)

      // Should be false at mobile width
      cy.viewport(375, 667)
      checkValue()
      cy.get('@valueSpy').should('have.been.calledWith', false)
    })
  })
})
