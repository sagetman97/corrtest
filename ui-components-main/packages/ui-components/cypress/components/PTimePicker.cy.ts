import { createStateWrapper } from '@cySupport/createStateWrapper'
import { UTCDate } from '@date-fns/utc'

import PTimePicker from '@/components/timePicker/PTimePicker.vue'

const baseClass = '.polly-time-picker'
const controlClass = '.polly-time-picker__control'
const mobileControlClass = '.polly-time-picker__control-mobile'
const contentClass = '.polly-time-picker__content'
const actionsClass = '.polly-time-picker__actions'
const labelClass = '.polly-label__label'
const messageClass = '.polly-label__message'

describe('PTimePicker', () => {
  describe('Basic Rendering', () => {
    it('renders basic time picker', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(controlClass).should('exist')
    })

    it('renders with label', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          label: 'Select Time',
        },
      })
      cy.get(labelClass).should('contain.text', 'Select Time')
    })

    it('renders custom label via slot', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
        slots: {
          label: '<span class="custom-label">Custom Time Label</span>',
        },
      })
      cy.get('.custom-label').should('contain.text', 'Custom Time Label')
    })
  })

  describe('Value Handling', () => {
    it('displays formatted time value', () => {
      const testDate = new UTCDate('2024-01-15T14:30:00Z')

      cy.mount(PTimePicker, {
        props: {
          modelValue: testDate,
        },
      })
      cy.get(controlClass).should('have.value', '14:30')
    })

    it('handles null value', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
      })
      cy.get(controlClass).should('have.value', '')
    })

    it('updates value on manual input', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(controlClass).type('14:30')
      cy.get('@updateSpy').should(
        'have.been.called.with',
        Cypress.sinon.match((date: Date) => date.getHours() === 14 && date.getMinutes() === 30)
      )
    })

    it('handles tuple format', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: [14, 30],
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })
      cy.get(controlClass).should('have.value', '14:30')
    })
  })

  describe('Picker Interaction', () => {
    it('opens picker on button click', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
      })

      cy.get('.polly-time-picker__target').click()
      cy.get(contentClass).should('be.visible')
    })

    it('closes picker on "Close" button click', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
      })

      cy.get('.polly-time-picker__target').click()
      cy.get(actionsClass).contains('Close').click()
      cy.get(contentClass).should('not.be.visible')
    })

    it('applies selected time on "Ok" button click', () => {
      const testDate = new UTCDate('2024-01-15T14:30:00Z')

      cy.mount(PTimePicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get('.polly-time-picker__target').click()
      cy.get('.polly-hour-picker__hour').contains('10').click()
      cy.get(actionsClass).contains('Ok').click()
      cy.get('@updateSpy').should(
        'have.been.called.with',
        Cypress.sinon.match((date: Date) => date.getHours() === 10)
      )
    })
  })

  describe('Mobile View', () => {
    beforeEach(() => {
      cy.useMobileViewport()
    })

    it('renders mobile control format', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: new UTCDate('2024-01-15T14:30:00Z'),
        },
      })
      cy.get(mobileControlClass).should('exist')
      cy.get(mobileControlClass).should('contain.text', '02:30 PM')
    })

    it('displays placeholder when no value selected', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
      })
      cy.get(mobileControlClass).should('contain.text', '-- : -- --')
    })

    it('opens in modal on mobile', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
      })

      cy.get('.polly-time-picker__target').click()
      cy.get('.polly-modal').should('be.visible')
    })
  })

  describe('States', () => {
    it('handles disabled state', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          disabled: true,
        },
      })
      cy.get(controlClass).should('be.disabled')
      cy.get('button').should('have.attr', 'aria-disabled', 'true')
    })

    it('handles required state', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          required: true,
        },
      })
      cy.get(controlClass).should('have.attr', 'aria-required', 'true')
    })

    it('handles invalid state', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          state: 'errored',
          message: 'Time is required',
        },
      })
      cy.get(messageClass).should('contain.text', 'Time is required')
      cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')
    })
  })

  describe('Custom Slots', () => {
    it('renders prefix slot', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
        slots: {
          prefix: '<span class="custom-prefix">⏰</span>',
        },
      })
      cy.get('.custom-prefix').should('exist')
    })

    it('renders suffix slot', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
        },
        slots: {
          suffix: '<span class="custom-suffix">Custom</span>',
        },
      })
      cy.get('.custom-suffix').should('exist')
    })

    it('renders message slot', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          state: 'errored',
        },
        slots: {
          message: '<span class="custom-message">Custom Error</span>',
        },
      })
      cy.get('.custom-message').should('exist')
    })
  })

  describe('Accessibility', () => {
    it('maintains proper focus management', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          label: 'Time Selection',
        },
      })

      cy.get(controlClass).focus().should('be.focused')
    })

    it('provides proper aria attributes', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          label: 'Time Selection',
          required: true,
        },
      })

      cy.get(controlClass).should('have.attr', 'aria-required', 'true').and('have.attr', 'type', 'time')
    })
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PTimePicker, { modelValue: null, label: 'Time' }))

      cy.get(controlClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(controlClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('shows errored state styling', () => {
      cy.mount(PTimePicker, {
        props: {
          modelValue: null,
          state: 'errored',
          message: 'Time is required',
        },
      })

      cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')
      cy.get('.polly-label').should('have.class', 'polly-label--errored')
    })
  })
})
