import { UTCDate } from '@date-fns/utc'
import { setMinutes, startOfDay } from 'date-fns'

import PMinutePicker from '@/components/date/PMinutePicker.vue'

const minuteButtonClass = '.polly-minute-picker__minute'
const selectedMinuteClass = 'polly-minute-picker__minute--selected'

describe('PMinutePicker', () => {
  it('renders all minute buttons', () => {
    cy.mount(PMinutePicker)
    cy.get(minuteButtonClass).should('have.length', 60) // 60 minutes / 5 steps = 12 buttons
    cy.get(minuteButtonClass).each(($el, index) => {
      const expectedMinute = index.toString().padStart(2, '0')
      cy.wrap($el).should('contain.text', expectedMinute)
    })
  })

  it('highlights the current minute when no value is provided', () => {
    const testDate = startOfDay(new UTCDate())
    const currentMinute = testDate.getMinutes()

    cy.mount(PMinutePicker)
    cy.get(minuteButtonClass).contains(currentMinute.toString()).should('have.class', selectedMinuteClass)
  })

  it('highlights the selected minute from model value', () => {
    const testDate = setMinutes(startOfDay(new UTCDate()), 25)

    cy.mount(PMinutePicker, {
      props: {
        modelValue: testDate,
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })

    cy.get(minuteButtonClass).contains('25').should('have.class', selectedMinuteClass)
  })

  describe('Minute Selection', () => {
    it('updates model value when selecting minutes', () => {
      const testDate = setMinutes(startOfDay(new UTCDate()), 0)

      cy.mount(PMinutePicker, {
        props: {
          modelValue: testDate,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(minuteButtonClass).contains('15').click()
      cy.get('@updateSpy').should(
        'have.been.calledWith',
        Cypress.sinon.match((date: Date) => date.getMinutes() === 15)
      )
    })
  })

  describe('Accessibility', () => {
    it('has buttons with correct type attribute', () => {
      cy.mount(PMinutePicker)
      cy.get(minuteButtonClass).each(($button) => {
        cy.wrap($button).should('have.attr', 'type', 'button')
      })
    })

    it('has buttons with correct data-minute attributes', () => {
      cy.mount(PMinutePicker)
      cy.get(minuteButtonClass).each(($button, index) => {
        cy.wrap($button).should('have.attr', 'data-minute', index.toString())
      })
    })

    it('maintains focus outline styles', () => {
      cy.mount(PMinutePicker)
      cy.get(minuteButtonClass).first().focus()
      cy.get(minuteButtonClass).first().should('have.css', 'outline')
    })
  })

  describe('Edge Cases', () => {
    it('handles null model value', () => {
      cy.mount(PMinutePicker, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(minuteButtonClass).contains('30').click()
      cy.get('@updateSpy').should('have.been.called')
    })

    it('handles undefined model value', () => {
      cy.mount(PMinutePicker, {
        props: {
          modelValue: undefined,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(minuteButtonClass).contains('30').click()
      cy.get('@updateSpy').should('have.been.called')
    })
  })
})
