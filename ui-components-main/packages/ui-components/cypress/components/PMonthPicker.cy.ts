import { UTCDate } from '@date-fns/utc'
import { format, setMonth, startOfYear } from 'date-fns'

import PMonthPicker from '@/components/date/PMonthPicker.vue'

const monthButtonClass = '.polly-month-picker__month'
const selectedMonthClass = 'polly-month-picker__month--selected'

describe('PMonthPicker', () => {
  it('renders all 12 months', () => {
    cy.mount(PMonthPicker)
    cy.get(monthButtonClass).should('have.length', 12)

    const months = Array.from({ length: 12 }, (_, i) => format(setMonth(startOfYear(new UTCDate()), i), 'MMMM'))

    months.forEach((month) => {
      cy.get(monthButtonClass).contains(month).should('exist')
    })
  })

  it('highlights current month when no value is provided', () => {
    const now = new UTCDate()
    const currentMonth = format(now, 'MMMM')

    cy.mount(PMonthPicker)
    cy.get(monthButtonClass).contains(currentMonth).should('have.class', selectedMonthClass)
  })

  it('highlights the selected month from model value', () => {
    const testDate = setMonth(startOfYear(new UTCDate()), 6) // July

    cy.mount(PMonthPicker, {
      props: {
        modelValue: testDate,
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })

    cy.get(monthButtonClass).contains('July').should('have.class', selectedMonthClass)
  })

  describe('Month Selection', () => {
    it('updates model value when selecting month', () => {
      const testDate = startOfYear(new UTCDate())

      cy.mount(PMonthPicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(monthButtonClass).contains('March').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getMonth() === 2)
      )
    })
  })

  describe('Date Constraints', () => {
    it('disables months before min date', () => {
      const minDate = setMonth(startOfYear(new UTCDate()), 6) // July

      cy.mount(PMonthPicker, {
        props: {
          min: minDate,
        },
      })

      // Months before July should be disabled
      for (let i = 0; i < 6; i++) {
        const month = format(setMonth(startOfYear(new UTCDate()), i), 'MMMM')
        cy.get(monthButtonClass).contains(month).should('not.exist')
      }
    })

    it('disables months after max date', () => {
      const maxDate = setMonth(startOfYear(new UTCDate()), 6) // July

      cy.mount(PMonthPicker, {
        props: {
          max: maxDate,
        },
      })

      // Months after July should be disabled
      for (let i = 7; i < 12; i++) {
        const month = format(setMonth(startOfYear(new UTCDate()), i), 'MMMM')
        cy.get(monthButtonClass).contains(month).should('not.exist')
      }
    })
  })

  describe('Accessibility', () => {
    it('has buttons with correct type attribute', () => {
      cy.mount(PMonthPicker)
      cy.get(monthButtonClass).each(($button) => {
        cy.wrap($button).should('have.attr', 'type', 'button')
      })
    })

    it('has buttons with correct data-month attributes', () => {
      cy.mount(PMonthPicker)
      cy.get(monthButtonClass).each(($button, index) => {
        const month = format(setMonth(startOfYear(new UTCDate()), index), 'MMMM')
        cy.wrap($button).should('have.attr', 'data-month', month)
      })
    })

    it('maintains focus outline styles', () => {
      cy.mount(PMonthPicker)
      cy.get(monthButtonClass).first().focus()
      cy.get(monthButtonClass).first().should('have.css', 'outline')
    })
  })

  describe('Edge Cases', () => {
    it('handles null model value', () => {
      cy.mount(PMonthPicker, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(monthButtonClass).contains('June').click()
      cy.get('@updateSpy').should('have.been.called')
    })

    it('handles undefined model value', () => {
      cy.mount(PMonthPicker, {
        props: {
          modelValue: undefined,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(monthButtonClass).contains('June').click()
      cy.get('@updateSpy').should('have.been.called')
    })
  })
})
