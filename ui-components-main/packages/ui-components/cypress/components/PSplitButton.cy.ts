import { ButtonProps } from '@/types'

import PSplitButton from '@/components/splitButton/PSplitButton.vue'

const baseClass = '.polly-split-button'
const buttonClass = '.polly-button'
const labelClass = '.polly-split-button__label'
const splitClass = '.polly-split-button__split'
const optionsClass = '.polly-options'
const optionClass = '.polly-option'

describe('PSplitButton', () => {
  const sampleOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  describe('Basic Rendering', () => {
    it('renders basic split button with label', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
        },
        slots: {
          default: 'Split Button',
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(buttonClass).should('exist')
      cy.get(labelClass).should('contain.text', 'Split Button')
      cy.get(splitClass).should('exist')
    })

    it('supports different variants', () => {
      const variants: ButtonProps['variant'][] = ['primary', 'accent', 'error'] as const
      variants.forEach((variant) => {
        cy.mount(PSplitButton, {
          props: {
            options: sampleOptions,
            variant,
          },
          slots: {
            default: variant,
          },
        })
        cy.get(buttonClass).should('have.class', `polly-button--${variant}`)
      })
    })

    it('renders custom icon when provided', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
          icon: 'star',
        },
      })
      cy.get('.polly-icon').should('have.class', 'fa-star')
    })
  })

  describe('Options Interaction', () => {
    it('toggles options panel on button click', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
        },
      })
      cy.get(optionsClass).should('not.be.visible')
      cy.get(buttonClass).click()
      cy.get(optionsClass).should('exist')
      cy.get(buttonClass).click()
      cy.get(optionsClass).should('not.be.visible')
    })

    it('emits selected event when option is chosen', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
          onSelected: cy.spy().as('selectedSpy'),
        },
      })
      cy.get(buttonClass).click()
      cy.get(optionClass).first().click()
      cy.get('@selectedSpy').should('have.been.calledWith', '1')
    })

    it('closes options panel after selection', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
        },
      })
      cy.get(buttonClass).click()
      cy.get(optionClass).first().click()
      cy.get(optionsClass).should('not.be.visible')
    })
  })

  describe('States', () => {
    it('handles disabled state', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
          disabled: true,
        },
      })
      cy.get(buttonClass).should('have.attr', 'aria-disabled', 'true')
      cy.get(buttonClass).click({ force: true })
      cy.get(optionsClass).should('not.be.visible')
    })

    it('handles loading state', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
          isLoading: true,
        },
      })
      cy.get(baseClass).should('have.class', 'polly-split-button--loading')
      cy.get('.polly-icon').should('have.class', 'fa-spin')
    })
  })

  describe('Custom Slots', () => {
    it('renders custom target slot', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
        },
        slots: {
          target: `
            <template #target="{ toggle, isOpen }">
              <p-button variant="accent" class="custom-target" @click="toggle">
                Custom Target ({{ isOpen ? 'Open' : 'Closed' }})
              </p-button>
            </template>
          `,
        },
      })
      cy.get('.custom-target').should('exist')
      cy.get('.custom-target').should('contain.text', 'Closed')
      cy.get('.custom-target').click()
      cy.get('.custom-target').should('contain.text', 'Open')
    })

    it('renders custom option slot', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
        },
        slots: {
          option: `
            <template #option="{ option }">
              <div class="custom-option">Custom {{ option.label }}</div>
            </template>
          `,
        },
      })
      cy.get(buttonClass).click()
      cy.get('.custom-option').should('have.length', 3)
      cy.get('.custom-option').first().should('contain.text', 'Custom Option 1')
    })

    it('renders custom icon slot', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
        },
        slots: {
          optionIcon: `<span class="custom-icon">★</span>`,
        },
      })
      cy.get(buttonClass).click()
      cy.get('.custom-icon').should('be.visible')
      cy.get('.custom-icon').should('contain.text', '★')
    })

    it('renders empty options slot when no options provided', () => {
      cy.mount(PSplitButton, {
        props: {
          options: [],
        },
        slots: {
          emptyOptions: 'No options available',
        },
      })
      cy.get(buttonClass).click()
      cy.get(optionsClass).should('contain.text', 'No options available')
    })
  })

  describe('Multiple Selection', () => {
    it('supports multiple selection mode', () => {
      cy.mount(PSplitButton, {
        props: {
          options: sampleOptions,
          multiple: true,
        },
      })
      cy.get(buttonClass).click()
      cy.get(optionClass).first().click()
      cy.get(optionsClass).should('exist') // Should stay open in multiple mode
    })
  })
})
