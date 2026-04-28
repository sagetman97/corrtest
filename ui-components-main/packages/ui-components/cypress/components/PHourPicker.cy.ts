import { UTCDate } from '@date-fns/utc'
import { setHours, startOfDay } from 'date-fns'

import PHourPicker from '@/components/date/PHourPicker.vue'

const hourButtonClass = '.polly-hour-picker__hour'
const selectedHourClass = 'polly-hour-picker__hour--selected'

describe('PHourPicker', () => {
  it('renders all 12 hour buttons', () => {
    cy.mount(PHourPicker)
    cy.get(hourButtonClass).should('have.length', 12)
    cy.get(hourButtonClass).each(($el, index) => {
      cy.wrap($el).should('contain.text', (index + 1).toString())
    })
  })

  it('highlights the current hour when no value is provided', () => {
    // Set a fixed time (2023-01-01 15:00:00 - 3:00 PM)
    const fixedDate = new UTCDate(2023, 0, 1, 15, 0, 0)
    cy.clock(fixedDate.getTime())

    cy.mount(PHourPicker)
    cy.get(hourButtonClass).contains(1).should('have.class', selectedHourClass)
  })

  it('highlights the selected hour from model value', () => {
    const testDate = setHours(startOfDay(new UTCDate()), 14) // 2:00 PM

    cy.mount(PHourPicker, {
      props: {
        modelValue: testDate,
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })

    cy.get(hourButtonClass).contains('2').should('have.class', selectedHourClass)
  })

  describe('Hour Selection', () => {
    it('maintains AM/PM when selecting hours', () => {
      const testDate = setHours(startOfDay(new UTCDate()), 14) // 2:00 PM

      cy.mount(PHourPicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Click on 3 (should remain PM)
      cy.get(hourButtonClass).contains('3').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getHours() === 15) // Should be 3 PM (15:00)
      )
    })

    it('handles AM hour selection', () => {
      const testDate = setHours(startOfDay(new UTCDate()), 9) // 9:00 AM

      cy.mount(PHourPicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Click on 10 (should remain AM)
      cy.get(hourButtonClass).contains('10').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getHours() === 10) // Should be 10 AM
      )
    })

    it('handles PM hour selection', () => {
      const testDate = setHours(startOfDay(new UTCDate()), 13) // 1:00 PM

      cy.mount(PHourPicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Click on 11 (should remain PM)
      cy.get(hourButtonClass).contains('11').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getHours() === 23) // Should be 11 PM (23:00)
      )
    })
  })

  describe('Accessibility', () => {
    it('has buttons with correct type attribute', () => {
      cy.mount(PHourPicker)
      cy.get(hourButtonClass).each(($button) => {
        cy.wrap($button).should('have.attr', 'type', 'button')
      })
    })

    it('has buttons with correct data-hour attributes', () => {
      cy.mount(PHourPicker)
      cy.get(hourButtonClass).each(($button, index) => {
        cy.wrap($button).should('have.attr', 'data-hour', (index + 1).toString())
      })
    })

    it('maintains focus outline styles', () => {
      cy.mount(PHourPicker)
      cy.get(hourButtonClass).first().focus()
      cy.get(hourButtonClass).first().should('have.css', 'outline')
    })
  })

  describe('Edge Cases', () => {
    it('handles null model value', () => {
      cy.mount(PHourPicker, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(hourButtonClass).contains('3').click()
      cy.get('@updateSpy').should('have.been.called')
    })

    it('handles undefined model value', () => {
      cy.mount(PHourPicker, {
        props: {
          modelValue: undefined,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(hourButtonClass).contains('3').click()
      cy.get('@updateSpy').should('have.been.called')
    })

    it('handles 12 AM/PM edge cases', () => {
      // Test 12 AM
      const midnightDate = setHours(startOfDay(new UTCDate()), 0)
      cy.mount(PHourPicker, {
        props: {
          modelValue: midnightDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })
      cy.get(hourButtonClass).contains('12').should('have.class', selectedHourClass)

      // Test 12 PM
      const noonDate = setHours(startOfDay(new UTCDate()), 12)
      cy.mount(PHourPicker, {
        props: {
          modelValue: noonDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })
      cy.get(hourButtonClass).contains('12').should('have.class', selectedHourClass)
    })
  })
})
