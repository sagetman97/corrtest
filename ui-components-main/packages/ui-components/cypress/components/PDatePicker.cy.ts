import { createStateWrapper } from '@cySupport/createStateWrapper'
import { UTCDate } from '@date-fns/utc'
import { addDays, format, subDays } from 'date-fns'

import PDatePicker from '@/components/datePicker/PDatePicker.vue'

const baseClass = '.polly-date-picker'
const inputClass = '.polly-date-picker__control'
const baseInputClass = '.polly-input-base'
const mobileInputClass = '.polly-date-picker__control-mobile'
const calendarClass = '.p-date-picker__calendar'
const calendarToggleButtonClass = '.polly-date-picker__target'
const dateButtonClass = '.polly-calendar-date-button'

describe('PDatePicker', () => {
  const baseDate = new UTCDate('2024-01-15T12:00:00Z')

  beforeEach(() => {
    // Set system time to a fixed value
    cy.clock(baseDate.getTime(), ['Date'])
  })

  it('renders basic date picker', () => {
    cy.mount(PDatePicker)
    cy.get(baseClass).should('exist')
    cy.get(inputClass).should('exist')
    cy.get(calendarToggleButtonClass).should('exist')
  })

  it('renders with label', () => {
    cy.mount(PDatePicker, {
      props: {
        label: 'Select Date',
      },
    })
    cy.get(baseClass).should('contain.text', 'Select Date')
  })

  it('handles value binding', () => {
    const testDate = new UTCDate('2024-01-15T12:00:00Z')
    const formattedDate = format(testDate, 'yyyy-MM-dd')

    cy.mount(PDatePicker, {
      props: {
        modelValue: testDate,
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })
    cy.get(inputClass).should('have.value', formattedDate)
  })

  it('opens calendar on button click', () => {
    cy.mount(PDatePicker)
    cy.get(calendarClass).should('not.be.visible')
    cy.get(calendarToggleButtonClass).click()
    cy.get(calendarClass).should('be.visible')
  })

  it('handles disabled state', () => {
    cy.mount(PDatePicker, {
      props: {
        disabled: true,
      },
    })
    cy.get(inputClass).should('be.disabled')
    cy.get(calendarToggleButtonClass).should('have.attr', 'aria-disabled', 'true')
  })

  it('handles required state', () => {
    cy.mount(PDatePicker, {
      props: {
        required: true,
      },
    })
    cy.get(inputClass).should('have.attr', 'aria-required', 'true')
  })

  it('displays validation state', () => {
    cy.mount(PDatePicker, {
      props: {
        state: 'errored',
        message: 'Invalid date',
      },
    })
    cy.get(baseClass).should('contain.text', 'Invalid date')
    cy.get(baseInputClass).should('have.attr', 'aria-invalid', 'true')
  })

  it('supports custom prefix slot', () => {
    cy.mount(PDatePicker, {
      slots: {
        prefix: '<span class="custom-prefix">📅</span>',
      },
    })
    cy.get('.custom-prefix').should('exist')
  })

  it('supports custom suffix slot', () => {
    cy.mount(PDatePicker, {
      slots: {
        suffix: '<span class="custom-suffix">Select</span>',
      },
    })
    cy.get('.custom-suffix').should('exist')
  })

  describe('Mobile View', () => {
    beforeEach(() => {
      cy.useMobileViewport()
    })

    it('renders mobile version', () => {
      cy.mount(PDatePicker)
      cy.get(mobileInputClass).should('exist')
      cy.get(inputClass).should('not.exist')
    })

    it('displays formatted date in mobile view', () => {
      const testDate = new UTCDate('2024-01-15T12:00:00Z')

      cy.mount(PDatePicker, {
        props: {
          modelValue: testDate,
        },
      })
      cy.get(mobileInputClass).should('contain.text', '01/15/2024')
    })

    it('opens in modal on mobile', () => {
      cy.mount(PDatePicker)
      cy.get(calendarToggleButtonClass).click()
      cy.get('.polly-modal').should('exist')
      cy.get(calendarClass).should('be.visible')
    })
  })

  describe('Date Constraints', () => {
    it('respects min/max date constraints', () => {
      const testDate = new UTCDate('2024-01-15T12:00:00Z')
      const min = testDate
      const max = addDays(testDate, 5)

      cy.mount(PDatePicker, {
        props: {
          modelValue: testDate,
          min,
          max,
        },
      })
      cy.get(calendarToggleButtonClass).click()

      // Dates before min should be disabled
      cy.get(dateButtonClass)
        .contains(format(subDays(min, 1), 'd'))
        .parent()
        .should('have.attr', 'aria-disabled', 'true')

      // Dates after max should be disabled
      cy.get(dateButtonClass)
        .contains(format(addDays(max, 1), 'd'))
        .parent()
        .should('have.attr', 'aria-disabled', 'true')

      // Dates within range should be enabled
      cy.get(dateButtonClass)
        .contains(format(addDays(min, 2), 'd'))
        .parent()
        .should('have.attr', 'aria-disabled', 'false')
    })
  })

  it('closes calendar when date is selected', () => {
    cy.mount(PDatePicker)
    cy.get(calendarToggleButtonClass).click()
    cy.get(calendarClass).should('be.visible')
    cy.get(dateButtonClass).contains('15').parent().click()
    cy.get(calendarClass).should('not.be.visible')
  })

  describe('Date Selection', () => {
    it('updates value when date is selected', () => {
      cy.mount(PDatePicker, {
        props: {
          modelValue: baseDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(calendarToggleButtonClass).click()
      cy.get(dateButtonClass).contains('20').parent().click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getDate() === 20)
      )
    })

    it('handles manual input', () => {
      cy.mount(PDatePicker, {
        props: {
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(inputClass).type('2024-01-27')

      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => {
          return date instanceof Date && date.getUTCFullYear() === 2024 && date.getUTCMonth() === 0 && date.getUTCDate() === 27
        })
      )
    })
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PDatePicker, { modelValue: null, label: 'Date' }))

      cy.get(baseInputClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(baseInputClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(baseInputClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('shows errored state styling', () => {
      cy.mount(PDatePicker, {
        props: {
          modelValue: null,
          state: 'errored',
          message: 'Date is required',
        },
      })

      cy.get(baseInputClass).should('have.attr', 'aria-invalid', 'true')
      cy.get('.polly-label').should('have.class', 'polly-label--errored')
    })
  })
})
