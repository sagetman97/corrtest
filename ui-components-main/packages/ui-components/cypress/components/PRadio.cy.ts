import { createStateWrapper } from '@cySupport/createStateWrapper'

import PRadio from '@/components/radio/PRadio.vue'

const baseClass = '.polly-radio'
const inputClass = '.polly-radio__input-hidden'
const radioClass = '.polly-radio__radio'

describe('PRadio', () => {
  describe('Basic Rendering', () => {
    it('renders basic radio button', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Test Radio',
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(inputClass).should('exist')
      cy.get(radioClass).should('exist')
    })

    it('renders with label text', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Test Label',
        },
      })
      cy.get(baseClass).should('contain.text', 'Test Label')
    })

    it('supports custom label via slot', () => {
      cy.mount(PRadio, {
        slots: {
          label: '<span class="custom-label">Custom Label</span>',
        },
      })
      cy.get('.custom-label').should('exist')
      cy.get('.custom-label').should('contain.text', 'Custom Label')
    })
  })

  describe('Value Binding', () => {
    it('handles v-model binding', () => {
      cy.mount(PRadio, {
        props: {
          modelValue: 'option1',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
          value: 'option1',
          label: 'Option 1',
        },
      })

      cy.get(radioClass).should('have.class', 'polly-radio__radio--checked')
      cy.get(inputClass).should('be.checked')
    })

    it('updates model value when clicked', () => {
      const onUpdateSpy = cy.spy().as('updateSpy')
      cy.mount(PRadio, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': onUpdateSpy,
          value: 'option1',
          label: 'Option 1',
        },
      })

      cy.get(inputClass).click({ force: true })
      cy.get('@updateSpy').should('have.been.calledWith', 'option1')
    })

    it('uses label as value when no value prop is provided', () => {
      const onUpdateSpy = cy.spy().as('updateSpy')
      cy.mount(PRadio, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': onUpdateSpy,
          label: 'Option 1',
        },
      })

      cy.get(inputClass).click({ force: true })
      cy.get('@updateSpy').should('have.been.calledWith', 'Option 1')
    })
  })

  describe('States and Variants', () => {
    it('handles disabled state', () => {
      cy.mount(PRadio, {
        props: {
          disabled: true,
          label: 'Disabled Radio',
        },
      })

      cy.get(baseClass).should('have.class', 'polly-radio--disabled')
      cy.get(inputClass).should('be.disabled').should('have.attr', 'aria-disabled', 'true')
    })

    it('handles error state', () => {
      cy.mount(PRadio, {
        props: {
          state: 'errored',
          label: 'Error Radio',
        },
      })

      cy.get(baseClass).should('have.class', 'polly-radio--errored')
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')
    })

    it('handles required state', () => {
      cy.mount(PRadio, {
        props: {
          required: true,
          label: 'Required Radio',
        },
      })

      cy.get(inputClass).should('have.attr', 'aria-required', 'true')
    })

    it('supports different label positions', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Left Label',
          labelPosition: 'left',
        },
      })
      // Verify label positioning based on your CSS implementation
    })
  })

  describe('Message Handling', () => {
    it('displays message when provided', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Radio with Message',
          message: 'Helper text',
        },
      })
      cy.get(baseClass).should('contain.text', 'Helper text')
    })

    it('supports custom message via slot', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Radio with Message',
        },
        slots: {
          message: '<span class="custom-message">Custom Message</span>',
        },
      })
      cy.get('.custom-message').should('exist')
      cy.get('.custom-message').should('contain.text', 'Custom Message')
    })
  })

  describe('Accessibility', () => {
    it('has proper focus handling', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Focusable Radio',
        },
      })

      cy.get(inputClass).focus()
      cy.get(radioClass).should('have.css', 'outline-offset', '2px')
      cy.get(inputClass).blur()
      cy.get(radioClass).should('not.have.css', 'outline-offset', '2px')
    })

    it('maintains proper aria attributes', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Accessible Radio',
          required: true,
          disabled: false,
          state: 'errored',
        },
      })

      cy.get(inputClass).should('have.attr', 'aria-required', 'true').should('have.attr', 'aria-disabled', 'false').should('have.attr', 'aria-invalid', 'true')
    })
  })

  describe('Style Interactions', () => {
    it('applies hover styles when not disabled', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Hoverable Radio',
        },
      })

      cy.get(radioClass).trigger('mouseover')
      cy.get(radioClass).should('have.css', 'cursor', 'pointer')
    })

    it('does not apply hover styles when disabled', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Disabled Radio',
          disabled: true,
        },
      })

      cy.get(radioClass).trigger('mouseover')
      cy.get(radioClass).should('have.css', 'cursor', 'not-allowed')
    })
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PRadio, { modelValue: null, label: 'Option 1', value: 'option1' }))

      cy.get(inputClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('shows errored state styling', () => {
      cy.mount(PRadio, {
        props: {
          label: 'Option 1',
          value: 'option1',
          state: 'errored',
        },
      })

      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')
      cy.get(baseClass).should('have.class', 'polly-radio--errored')
    })
  })
})
