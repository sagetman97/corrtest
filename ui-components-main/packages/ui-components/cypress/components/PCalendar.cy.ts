import { UTCDate } from '@date-fns/utc'
import { addDays, addMonths, format } from 'date-fns'

import PCalendar from '@/components/calendar/PCalendar.vue'

const baseClass = '.polly-calendar'
const monthClass = '.polly-calendar__month'
const navigationClass = '.polly-calendar__navigation'
const dateButtonClass = '.polly-calendar-date-button'
const monthHeadingClass = '.polly-calendar__month-heading'
const overlayClass = '.polly-calendar__overlay-component'

const actionsClass = '.polly-calendar__actions'

describe('PCalendar', () => {
  const baseDate = new UTCDate('2024-01-15T12:00:00Z')

  beforeEach(() => {
    // Set system time to a fixed value
    cy.clock(baseDate.getTime(), ['Date'])
  })

  it('renders basic calendar', () => {
    cy.mount(PCalendar)
    cy.get(baseClass).should('exist')
    cy.get(monthClass).should('exist')
    cy.get(`${navigationClass}--previous`).should('exist')
    cy.get(`${navigationClass}--next`).should('exist')
  })

  it('displays correct month and year in heading', () => {
    cy.mount(PCalendar)
    cy.get(monthHeadingClass).should('have.textTrimmed', 'January2024')
  })

  it('supports multiple months view', () => {
    const monthsShown = 2
    cy.mount(PCalendar, {
      props: { monthsShown },
    })
    cy.get(monthClass).should('have.length', monthsShown)

    // Verify second month is correctly offset
    const nextMonth = addMonths(baseDate, 1)
    cy.get(`${monthClass}:nth-child(2) ${monthHeadingClass}`).should('have.text', format(nextMonth, 'MMMMyyyy'))
  })

  it('handles month navigation', () => {
    cy.mount(PCalendar)

    // Navigate forward
    cy.get(`${navigationClass}--next`).click()
    cy.get(monthHeadingClass).should('have.text', 'February2024')

    // Navigate back
    cy.get(`${navigationClass}--previous`).click()
    cy.get(monthHeadingClass).should('have.text', 'January2024')

    // Navigate back again
    cy.get(`${navigationClass}--previous`).click()
    cy.get(monthHeadingClass).should('have.text', 'December2023')
  })

  it('handles date selection', () => {
    cy.mount(PCalendar, {
      props: {
        modelValue: baseDate,
      },
    })

    // Base date should be selected
    cy.get(`${dateButtonClass}--selected`).should('exist')
    cy.get(`${dateButtonClass}--selected`).should('have.text', '15')

    // Click another date
    cy.get(dateButtonClass).contains('17').parent().click()
    cy.get(`${dateButtonClass}--selected`).should('have.text', '17')
  })

  it('shows month/year picker overlay when heading is clicked', () => {
    cy.mount(PCalendar)
    cy.get(overlayClass).should('not.exist')
    cy.get(monthHeadingClass).click()
    cy.get(overlayClass).should('exist')
  })

  it('handles date constraints (min/max)', () => {
    const min = baseDate
    const max = addDays(baseDate, 5)

    cy.mount(PCalendar, {
      props: { min, max },
    })

    // Dates before min should be disabled
    cy.get(dateButtonClass).contains('14').parent().should('have.attr', 'aria-disabled', 'true')

    // Dates after max should be disabled
    cy.get(dateButtonClass).contains('21').parent().should('have.attr', 'aria-disabled', 'true')

    // Dates within range should be enabled
    cy.get(dateButtonClass).contains('17').parent().should('have.attr', 'aria-disabled', 'false')
  })

  it('shows/hides action buttons based on props', () => {
    // Default view (both buttons visible)
    cy.mount(PCalendar)
    cy.get(actionsClass).should('exist')
    cy.get('.polly-calendar__clear-button').should('not.exist')
    cy.get('.polly-calendar__today-button').should('exist')

    // Hide today button
    cy.mount(PCalendar, {
      props: { hideToday: true },
    })
    cy.get('.polly-calendar__today-button').should('not.exist')

    // Show clear button
    cy.mount(PCalendar, {
      props: { clearable: true },
    })
    cy.get('.polly-calendar__clear-button').should('exist')
  })

  it('handles today button functionality', () => {
    cy.mount(PCalendar, {
      props: {
        modelValue: addDays(baseDate, 5),
      },
    })

    cy.get('.polly-calendar__today-button').click()
    cy.get(`${dateButtonClass}--selected`).should('have.text', '15')
  })

  it('handles clear button functionality', () => {
    cy.mount(PCalendar, {
      props: {
        modelValue: baseDate,
        clearable: true,
      },
    })

    cy.get(`${dateButtonClass}--selected`).should('exist')
    cy.get('.polly-calendar__clear-button').click()
    cy.get(`${dateButtonClass}--selected`).should('not.exist')
  })

  it('supports custom date rendering through slots', () => {
    cy.mount(PCalendar, {
      slots: {
        date: `
          <template #date="{ date, isSelected, isToday }">
            <div class="custom-date" :class="{ 'is-selected': isSelected, 'is-today': isToday }">
              {{ new Date(date).getDate() }}
            </div>
          </template>
        `,
      },
    })

    cy.get('.custom-date').should('exist')
    cy.get('.custom-date.is-today').should('exist')
  })
})
