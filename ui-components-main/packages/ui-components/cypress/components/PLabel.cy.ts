import PLabel from '@/components/label/PLabel.vue'

const baseClass = '.polly-label'
const labelClass = '.polly-label__label'
const labelValueClass = '.polly-label__label-text-value'
const messageClass = '.polly-label__message'
const requiredAsteriskClass = '.polly-label__required-asterisk'

describe('PLabel', () => {
  it('renders basic label', () => {
    cy.mount(PLabel, {
      props: {
        label: 'Test Label',
      },
    })
    cy.get(baseClass).should('exist')
    cy.get(labelValueClass).should('contain.text', 'Test Label')
  })

  describe('Label Positions', () => {
    const positions = ['top', 'left', 'right'] as const

    positions.forEach((position) => {
      it(`supports ${position} position`, () => {
        cy.mount(PLabel, {
          props: {
            label: 'Test Label',
            labelPosition: position,
          },
        })
        cy.get(labelClass).should('have.class', `polly-label__label--${position}`)
      })
    })
  })

  describe('States', () => {
    const states = ['normal', 'errored'] as const

    states.forEach((state) => {
      it(`applies correct styling for ${state} state`, () => {
        cy.mount(PLabel, {
          props: {
            label: 'Test Label',
            state,
            message: 'Test message',
          },
        })
        cy.get(baseClass).should('have.class', `polly-label--${state}`)
        cy.get(messageClass).should('have.class', `polly-label__message--${state}`)
      })
    })
  })

  describe('Required Field', () => {
    it('shows required asterisk when required prop is true', () => {
      cy.mount(PLabel, {
        props: {
          label: 'Required Field',
          required: true,
        },
      })
      cy.get(requiredAsteriskClass).should('exist')
      cy.get(labelValueClass).should('have.class', 'polly-label__label-text-value--required')
    })

    it('does not show required asterisk when required prop is false', () => {
      cy.mount(PLabel, {
        props: {
          label: 'Optional Field',
          required: false,
        },
      })
      cy.get(requiredAsteriskClass).should('not.exist')
      cy.get(labelValueClass).should('not.have.class', 'polly-label__label-text-value--required')
    })
  })

  describe('Message Handling', () => {
    it('displays message when provided', () => {
      const message = 'Helper text message'
      cy.mount(PLabel, {
        props: {
          label: 'Test Label',
          message,
        },
      })
      cy.get(messageClass).should('exist').and('contain.text', message)
    })

    it('does not display message when not provided', () => {
      cy.mount(PLabel, {
        props: {
          label: 'Test Label',
        },
      })
      cy.get(messageClass).should('not.exist')
    })
  })

  describe('Disabled State', () => {
    it('applies disabled styling when disabled', () => {
      cy.mount(PLabel, {
        props: {
          label: 'Disabled Label',
          disabled: true,
        },
      })
      cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
    })

    it('does not apply disabled styling when enabled', () => {
      cy.mount(PLabel, {
        props: {
          label: 'Enabled Label',
          disabled: false,
        },
      })
      cy.get(baseClass).should('have.attr', 'aria-disabled', 'false')
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      cy.mount(PLabel, {
        props: {
          label: 'Label',
        },
        slots: {
          default: '<div class="test-content">Slot Content</div>',
        },
      })
      cy.get('.test-content').should('exist').and('contain.text', 'Slot Content')
    })

    it('renders custom label slot', () => {
      cy.mount(PLabel, {
        slots: {
          label: '<span class="custom-label">Custom Label</span>',
        },
      })
      cy.get('.custom-label').should('exist').and('contain.text', 'Custom Label')
    })

    it('renders custom message slot', () => {
      cy.mount(PLabel, {
        slots: {
          message: '<span class="custom-message">Custom Message</span>',
        },
      })
      cy.get('.custom-message').should('exist').and('contain.text', 'Custom Message')
    })
  })

  describe('Title Attribute', () => {
    it('sets title attribute to label value', () => {
      const label = 'Test Label with Title'
      cy.mount(PLabel, {
        props: {
          label,
        },
      })
      cy.get(baseClass).should('have.attr', 'title', label)
    })
  })

  describe('Text Overflow', () => {
    it('handles long text with ellipsis', () => {
      cy.mount(PLabel, {
        props: {
          label: 'This is a very long label that should trigger text overflow handling',
        },
      }).then(({ wrapper }) => {
        // Force a narrow width to trigger overflow
        wrapper.element.style.width = '100px'
      })

      cy.get(labelValueClass).should('have.css', 'text-overflow', 'ellipsis').and('have.css', 'overflow', 'hidden').and('have.css', 'white-space', 'nowrap')
    })
  })
})
