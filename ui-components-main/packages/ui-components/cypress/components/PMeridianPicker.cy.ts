import { UTCDate } from '@date-fns/utc'
import { setHours, startOfDay } from 'date-fns'

import PMeridianPicker from '@/components/date/PMeridianPicker.vue'

const meridianButtonClass = '.polly-meridian-picker__meridian'
const selectedMeridianClass = 'polly-meridian-picker__meridian--selected'

describe('PMeridianPicker', () => {
  it('renders AM and PM buttons', () => {
    cy.mount(PMeridianPicker)
    cy.get(meridianButtonClass).should('have.length', 2)
    cy.get(meridianButtonClass).first().should('contain.text', 'AM')
    cy.get(meridianButtonClass).last().should('contain.text', 'PM')
  })

  it('highlights start of day meridian when no value is provided', () => {
    // Set a fixed time (2023-01-01 09:00:00 AM)
    const fixedDate = new Date(2023, 0, 1, 20, 0, 0)
    cy.clock(fixedDate.getTime())

    cy.mount(PMeridianPicker)
    cy.get(meridianButtonClass).contains('AM').should('have.class', selectedMeridianClass)
  })

  describe('Meridian Selection', () => {
    it('handles AM selection', () => {
      const testDate = setHours(startOfDay(new UTCDate()), 14) // 2 PM

      cy.mount(PMeridianPicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(meridianButtonClass).contains('AM').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getHours() === 2)
      )
    })

    it('handles PM selection', () => {
      const testDate = setHours(startOfDay(new UTCDate()), 10) // 10 AM

      cy.mount(PMeridianPicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(meridianButtonClass).contains('PM').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getHours() === 22)
      )
    })

    it('handles 12 AM/PM edge cases', () => {
      const updateSpy = cy.spy().as('updateSpy')
      // Test 12 AM to PM
      const midnightDate = setHours(startOfDay(new UTCDate()), 0)
      cy.mount(PMeridianPicker, {
        props: {
          modelValue: midnightDate,
          'onUpdate:modelValue': updateSpy,
        },
      })
      cy.get(meridianButtonClass).contains('PM').click()
      cy.get('@updateSpy').should('have.been.calledWith', setHours(midnightDate, 12))

      // Test 12 PM to AM
      const noonDate = setHours(startOfDay(new UTCDate()), 12)
      cy.mount(PMeridianPicker, {
        props: {
          modelValue: noonDate,
          'onUpdate:modelValue': updateSpy,
        },
      })
      cy.get(meridianButtonClass).contains('AM').click()
      cy.get('@updateSpy').should('have.been.calledWith', setHours(midnightDate, 0))
    })
  })

  describe('Accessibility', () => {
    it('has buttons with correct type attribute', () => {
      cy.mount(PMeridianPicker)
      cy.get(meridianButtonClass).each(($button) => {
        cy.wrap($button).should('have.attr', 'type', 'button')
      })
    })

    it('maintains focus outline styles', () => {
      cy.mount(PMeridianPicker)
      cy.get(meridianButtonClass).first().focus()
      cy.get(meridianButtonClass).first().should('have.css', 'outline')
    })
  })

  describe('Edge Cases', () => {
    it('handles null model value', () => {
      cy.mount(PMeridianPicker, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(meridianButtonClass).contains('PM').click()
      cy.get('@updateSpy').should('have.been.called')
    })

    it('handles undefined model value', () => {
      cy.mount(PMeridianPicker, {
        props: {
          modelValue: undefined,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(meridianButtonClass).contains('PM').click()
      cy.get('@updateSpy').should('have.been.called')
    })
  })
})
