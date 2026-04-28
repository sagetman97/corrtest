import { UTCDate } from '@date-fns/utc'
import { addYears } from 'date-fns'

import PYearPicker from '@/components/date/PYearPicker.vue'

const yearButtonClass = '.polly-year-picker__year'
const selectedYearClass = 'polly-year-picker__year--selected'

describe('PYearPicker', () => {
  beforeEach(() => {
    // Set system time to a fixed value
    cy.clock(new Date('2024-01-15T12:00:00Z').getTime(), ['Date'])
  })

  it('renders a range of years', () => {
    cy.mount(PYearPicker)
    cy.get(yearButtonClass).should('have.length.gt', 10)
  })

  it('highlights current year when no value is provided', () => {
    cy.mount(PYearPicker)
    cy.get(yearButtonClass).contains('2024').should('have.class', selectedYearClass)
  })

  it('highlights the selected year from model value', () => {
    const testDate = new UTCDate('2020-01-01T12:00:00Z')

    cy.mount(PYearPicker, {
      props: {
        modelValue: testDate,
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })

    cy.get(yearButtonClass).contains('2020').should('have.class', selectedYearClass)
  })

  describe('Year Selection', () => {
    it('updates model value when selecting year', () => {
      const testDate = new UTCDate('2024-01-15T12:00:00Z')

      cy.mount(PYearPicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(yearButtonClass).contains('2026').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getFullYear() === 2026)
      )
    })
  })

  describe('Date Constraints', () => {
    it('removes years before min date', () => {
      const baseDate = new UTCDate('2024-01-15T12:00:00Z')
      const minDate = addYears(baseDate, 1)

      cy.mount(PYearPicker, {
        props: {
          min: minDate,
        },
      })

      cy.get(yearButtonClass).contains('2026').should('exist')
      cy.get(yearButtonClass).contains('2024').should('not.exist')
    })

    it('removes years after max date', () => {
      const baseDate = new UTCDate('2024-01-15T12:00:00Z')
      const maxDate = addYears(baseDate, 1)

      cy.mount(PYearPicker, {
        props: {
          max: maxDate,
        },
      })

      cy.get(yearButtonClass).contains('2024').should('exist')
      cy.get(yearButtonClass).contains('2026').should('not.exist')
    })
  })

  describe('Accessibility', () => {
    it('has buttons with correct data-year attributes', () => {
      cy.mount(PYearPicker)
      cy.get(yearButtonClass).each(($button) => {
        const yearText = $button.text().trim()
        cy.wrap($button).should('have.attr', 'data-year', yearText)
      })
    })

    it('maintains focus outline styles', () => {
      cy.mount(PYearPicker)
      cy.get(yearButtonClass).first().focus()
      cy.get(yearButtonClass).first().should('have.css', 'outline')
    })
  })

  describe('Edge Cases', () => {
    it('handles null model value', () => {
      cy.mount(PYearPicker, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(yearButtonClass).contains('2025').click()
      cy.get('@updateSpy').should('have.been.called')
    })

    it('handles undefined model value', () => {
      cy.mount(PYearPicker, {
        props: {
          modelValue: undefined,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(yearButtonClass).contains('2025').click()
      cy.get('@updateSpy').should('have.been.called')
    })

    it('handles year range boundaries', () => {
      cy.mount(PYearPicker)

      // Should show a reasonable range of years around 2024
      cy.get(yearButtonClass).should('contain', '2014').and('contain', '2034')
    })
  })
})
