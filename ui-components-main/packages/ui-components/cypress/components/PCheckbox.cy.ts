import { createStateWrapper } from '@cySupport/createStateWrapper'

import PCheckbox from '@/components/checkbox/PCheckbox.vue'

const baseClass = '.polly-checkbox'
const inputClass = '.polly-checkbox__input-hidden'
const checkmarkClass = '.polly-checkbox__checkmark'
const checkIconClass = '.polly-checkbox__check-icon'

describe('PCheckbox', () => {
  it('renders basic checkbox', () => {
    cy.mount(PCheckbox)
    cy.get(baseClass).should('exist')
    cy.get(inputClass).should('exist')
    cy.get(checkmarkClass).should('exist')
  })

  it('renders with label', () => {
    cy.mount(PCheckbox, {
      props: {
        label: 'Test Checkbox',
      },
    })
    cy.get(baseClass).should('contain.text', 'Test Checkbox')
  })

  it('supports custom label via slot', () => {
    cy.mount(PCheckbox, {
      slots: {
        label: '<span class="custom-label">Custom Label</span>',
      },
    })
    cy.get('.custom-label').should('exist').and('contain.text', 'Custom Label')
  })

  it('handles checked state', () => {
    cy.mount(PCheckbox, {
      props: {
        modelValue: true,
      },
    })
    cy.get(baseClass).should('have.class', 'polly-checkbox--checked')
    cy.get(inputClass).should('be.checked')
    cy.get(checkIconClass).should('have.class', 'fa-check')
  })

  it('handles unchecked state', () => {
    cy.mount(PCheckbox, {
      props: {
        modelValue: false,
      },
    })
    cy.get(baseClass).should('have.class', 'polly-checkbox--unchecked')
    cy.get(inputClass).should('not.be.checked')
  })

  it('handles indeterminate state', () => {
    cy.mount(PCheckbox, {
      props: {
        modelValue: null,
        indeterminate: true,
      },
    })
    cy.get(baseClass).should('have.class', 'polly-checkbox--indeterminate')
    cy.get(checkIconClass).should('have.class', 'fa-minus')
    cy.get(inputClass).should('have.prop', 'indeterminate', true)
  })

  it('emits update:modelValue event on click', () => {
    const onUpdate = cy.stub().as('onUpdate')
    cy.mount(PCheckbox, {
      props: {
        'onUpdate:modelValue': onUpdate,
        modelValue: false,
      },
    })
    cy.get(inputClass).click({ force: true })
    cy.get('@onUpdate').should('have.been.calledWith', true)
  })

  it('handles disabled state', () => {
    cy.mount(PCheckbox, {
      props: {
        disabled: true,
      },
    })
    cy.get(baseClass).should('have.class', 'polly-checkbox--disabled')
    cy.get(inputClass).should('have.attr', 'disabled')
    cy.get(inputClass).should('have.attr', 'aria-disabled', 'true')
  })

  it('prevents interaction when disabled', () => {
    const onUpdate = cy.stub().as('onUpdate')
    cy.mount(PCheckbox, {
      props: {
        'onUpdate:modelValue': onUpdate,
        disabled: true,
        modelValue: false,
      },
    })
    cy.get(baseClass).click({ force: true })
    cy.get('@onUpdate').should('not.have.been.called')
  })

  it('handles required state', () => {
    cy.mount(PCheckbox, {
      props: {
        required: true,
      },
    })
    cy.get(inputClass).should('have.attr', 'aria-required', 'true')
  })

  it('handles error state', () => {
    cy.mount(PCheckbox, {
      props: {
        state: 'errored',
      },
    })
    cy.get(baseClass).should('have.class', 'polly-checkbox--errored')
    cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')
  })

  it('supports different label positions', () => {
    const positions = ['left', 'right'] as const
    positions.forEach((position) => {
      cy.mount(PCheckbox, {
        props: {
          label: `Label ${position}`,
          labelPosition: position,
        },
      })
      cy.get(baseClass).should('exist')
    })
  })

  it('displays validation message', () => {
    cy.mount(PCheckbox, {
      props: {
        message: 'Error message',
        state: 'error',
      },
    })
    cy.get(baseClass).should('contain.text', 'Error message')
  })

  it('supports custom message via slot', () => {
    cy.mount(PCheckbox, {
      slots: {
        message: '<span class="custom-message">Custom message</span>',
      },
    })
    cy.get('.custom-message').should('exist').and('contain.text', 'Custom message')
  })

  it('handles focus states', () => {
    cy.mount(PCheckbox)
    cy.get(inputClass).focus()
    cy.get(checkmarkClass).should('have.css', 'outline')
  })

  it('applies correct styling based on state', () => {
    // Test hover state
    cy.mount(PCheckbox)
    cy.get(checkmarkClass).trigger('mouseover')
    cy.get(checkmarkClass).should('have.css', 'cursor', 'pointer')

    // Test disabled state styling
    cy.mount(PCheckbox, {
      props: {
        disabled: true,
      },
    })
    cy.get(checkmarkClass).should('have.css', 'cursor', 'not-allowed')

    // Test error state styling
    cy.mount(PCheckbox, {
      props: {
        state: 'errored',
      },
    })
    cy.get(baseClass).should('have.class', 'polly-checkbox--errored')
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PCheckbox, { modelValue: false, label: 'Accept terms' }))

      cy.get(inputClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('shows errored state styling', () => {
      cy.mount(PCheckbox, {
        props: {
          modelValue: false,
          state: 'errored',
          label: 'Accept terms',
        },
      })

      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')
      cy.get(baseClass).should('have.class', 'polly-checkbox--errored')
    })
  })
})
