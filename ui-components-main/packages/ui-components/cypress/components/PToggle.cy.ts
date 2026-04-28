import { createStateWrapper } from '@cySupport/createStateWrapper'

import PToggle from '@/components/toggle/PToggle.vue'

const baseClass = '.polly-toggle'
const inputClass = '.polly-toggle__hidden-input'
const sliderClass = '.polly-toggle__slider'
const containerClass = '.polly-toggle__input-container'
const iconClass = '.polly-toggle__icon'

describe('PToggle', () => {
  describe('Basic Rendering', () => {
    it('renders toggle component', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
        },
      })

      cy.get(baseClass).should('exist')
      cy.get(inputClass).should('exist')
      cy.get(sliderClass).should('exist')
    })

    it('renders with label', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          label: 'Test Label',
        },
      })

      cy.get(baseClass).should('contain.text', 'Test Label')
    })

    it('renders with custom label slot', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
        },
        slots: {
          label: '<span class="custom-label">Custom Label</span>',
        },
      })

      cy.get('.custom-label').should('exist')
      cy.get('.custom-label').should('contain.text', 'Custom Label')
    })
  })

  describe('State Management', () => {
    it('updates value when clicked', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
        },
      })

      cy.get(inputClass).click({ force: true })
      cy.get('@update').should('have.been.calledWith', true)
    })

    it('shows check icon when checked', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: true,
          'onUpdate:modelValue': cy.stub().as('update'),
        },
      })

      cy.get(iconClass).should('exist')
      cy.get(containerClass).should('have.class', 'polly-toggle__input-container--checked')
    })

    it('supports custom icon slot', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: true,
          'onUpdate:modelValue': cy.stub().as('update'),
        },
        slots: {
          icon: '<span class="custom-icon">✓</span>',
        },
      })

      cy.get('.custom-icon').should('exist')
      cy.get('.custom-icon').should('contain.text', '✓')
    })
  })

  describe('Disabled State', () => {
    it('prevents interaction when disabled', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          disabled: true,
        },
      })

      cy.get(baseClass).click()
      cy.get('@update').should('not.have.been.called')
    })

    it('has correct aria attributes when disabled', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          disabled: true,
        },
      })

      cy.get(inputClass).should('have.attr', 'aria-disabled', 'true')
    })
  })

  describe('Validation States', () => {
    it('shows error state', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          state: 'errored',
        },
      })

      cy.get(containerClass).should('have.class', 'polly-toggle__input-container--errored')
      cy.get(sliderClass).should('have.class', 'polly-toggle__slider--errored')
    })

    it('shows validation message', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          message: 'This field is required',
        },
      })

      cy.get(baseClass).should('contain.text', 'This field is required')
    })

    it('handles required state', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          required: true,
        },
      })

      cy.get(inputClass).should('have.attr', 'aria-required', 'true')
    })
  })

  describe('Label Position', () => {
    it('supports right label position', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          label: 'Right Label',
          labelPosition: 'right',
        },
      })

      cy.get(baseClass).should('contain.text', 'Right Label')
      cy.get('.polly-label__label').should('have.class', 'polly-label__label--right')
    })

    it('supports left label position', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub().as('update'),
          label: 'Left Label',
          labelPosition: 'left',
        },
      })

      cy.get(baseClass).should('contain.text', 'Left Label')
      cy.get('.polly-label__label').should('have.class', 'polly-label__label--left')
    })
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PToggle, { modelValue: false, label: 'Toggle Option' }))

      cy.get(inputClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('shows errored state styling', () => {
      cy.mount(PToggle, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': cy.stub(),
          state: 'errored',
          label: 'Toggle Option',
        },
      })

      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')
      cy.get(containerClass).should('have.class', 'polly-toggle__input-container--errored')
    })
  })
})
