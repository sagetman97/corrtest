import { createStateWrapper } from '@cySupport/createStateWrapper'

import PTextarea from '@/components/textarea/PTextarea.vue'

const baseClass = '.polly-textarea'
const controlClass = '.polly-textarea__control'
const labelClass = '.polly-label__label-text'
const messageClass = '.polly-label__message'

describe('PTextarea', () => {
  describe('Basic Rendering', () => {
    it('renders basic textarea', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(baseClass).should('exist')
      cy.get(controlClass).should('exist')
    })

    it('renders with label', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          label: 'Test Label',
        },
      })

      cy.get(labelClass).should('contain', 'Test Label')
    })

    it('renders with custom label slot', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
        },
        slots: {
          label: '<span class="custom-label">Custom Label</span>',
        },
      })

      cy.get('.custom-label').should('contain', 'Custom Label')
    })

    it('renders with placeholder', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          placeholder: 'Enter your text here',
        },
      })

      cy.get(controlClass).should('have.attr', 'placeholder', 'Enter your text here')
    })
  })

  describe('Value Handling', () => {
    it('updates value on input', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(controlClass).type('Hello World')
      cy.get('@updateSpy').should('have.been.calledWith', 'Hello World')
    })

    it('displays initial value', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: 'Initial Text',
        },
      })

      cy.get(controlClass).should('have.value', 'Initial Text')
    })
  })

  describe('States', () => {
    it('handles disabled state', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          disabled: true,
        },
      })

      cy.get(controlClass).should('have.attr', 'aria-disabled', 'true')
    })

    it('handles required state', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          required: true,
        },
      })

      cy.get(controlClass).should('have.attr', 'aria-required', 'true')
    })

    it('handles invalid state', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          state: 'errored',
        },
      })

      cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')
    })
  })

  describe('Validation Messages', () => {
    it('displays error message', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          state: 'errored',
          message: 'This field is required',
        },
      })

      cy.get(messageClass).should('contain', 'This field is required')
    })

    it('displays custom message slot', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          state: 'errored',
        },
        slots: {
          message: '<span class="custom-message">Custom Error</span>',
        },
      })

      cy.get('.custom-message').should('contain', 'Custom Error')
    })
  })

  describe('Prefix and Suffix', () => {
    it('renders prefix slot', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
        },
        slots: {
          prefix: '<div class="custom-prefix">Prefix</div>',
        },
      })

      cy.get('.custom-prefix').should('exist').and('contain', 'Prefix')
    })

    it('renders suffix slot', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
        },
        slots: {
          suffix: '<div class="custom-suffix">Suffix</div>',
        },
      })

      cy.get('.custom-suffix').should('exist').and('contain', 'Suffix')
    })
  })

  describe('Auto Resize', () => {
    it('resizes based on content', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Get initial height
      cy.get(controlClass).then(($textarea) => {
        const initialHeight = $textarea.height()

        // Type multiple lines
        cy.get(controlClass).type('Line 1{enter}Line 2{enter}Line 3')

        // Check if height increased
        cy.get(controlClass).should(($newTextarea) => {
          expect($newTextarea.height()).to.be.greaterThan(initialHeight)
        })
      })
    })

    it('respects height limit', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Type many lines to exceed height limit
      const longText = Array(10).fill('Line of text').join('\n')
      cy.get(controlClass).type(longText)

      // Check if height is capped at limit (200px - 32px padding)
      cy.get(controlClass).should(($textarea) => {
        expect($textarea.height()).to.be.at.most(168)
      })
    })
  })

  describe('Accessibility', () => {
    it('maintains proper focus state', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          label: 'Test Label',
        },
      })

      cy.get(controlClass).focus().should('be.focused')
    })
  })

  describe('Focus Behavior', () => {
    it('selects all text when textarea is focused', () => {
      const testValue = 'This is a test textarea value\nwith multiple lines\nof text content'
      cy.mount(PTextarea, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Verify initial value
      cy.get(controlClass).should('have.value', testValue)

      // Focus the textarea and verify all text is selected
      cy.get(controlClass).focus()

      // Wait for nextTick and check that text is selected
      cy.get(controlClass).should(($textarea) => {
        const textarea = $textarea[0] as HTMLTextAreaElement
        expect(textarea.selectionStart).to.equal(0)
        expect(textarea.selectionEnd).to.equal(testValue.length)
      })
    })

    it('selects all text when textarea with empty value is focused', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus the textarea
      cy.get(controlClass).focus()

      // Check that selection properties are set correctly for empty textarea
      cy.get(controlClass).should(($textarea) => {
        const textarea = $textarea[0] as HTMLTextAreaElement
        expect(textarea.selectionStart).to.equal(0)
        expect(textarea.selectionEnd).to.equal(0)
      })
    })

    it('selects all text when textarea is focused multiple times', () => {
      const testValue = 'Multiple focus test\nfor textarea component'
      cy.mount(PTextarea, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus, blur, then focus again
      cy.get(controlClass).focus().blur().focus()

      // Verify all text is still selected after multiple focus events
      cy.get(controlClass).should(($textarea) => {
        const textarea = $textarea[0] as HTMLTextAreaElement
        expect(textarea.selectionStart).to.equal(0)
        expect(textarea.selectionEnd).to.equal(testValue.length)
      })
    })

    it('does not select text when textarea is disabled', () => {
      const testValue = 'Disabled textarea content'
      cy.mount(PTextarea, {
        props: {
          modelValue: testValue,
          disabled: true,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Verify textarea is disabled and cannot be focused
      cy.get(controlClass).should('be.disabled')
      cy.get(controlClass).should('not.be.focused')
    })

    it('selects all text with special characters and unicode', () => {
      const testValue = 'Special chars: !@#$%^&*()\nUnicode: 🚀 🎉 ✨\nEmoji test 😀'
      cy.mount(PTextarea, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus the textarea
      cy.get(controlClass).focus()

      // Verify all text including special characters is selected
      cy.get(controlClass).should(($textarea) => {
        const textarea = $textarea[0] as HTMLTextAreaElement
        expect(textarea.selectionStart).to.equal(0)
        expect(textarea.selectionEnd).to.equal(testValue.length)
      })
    })
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PTextarea, { modelValue: '', label: 'Description' }))

      cy.get(controlClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(controlClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('shows errored state styling', () => {
      cy.mount(PTextarea, {
        props: {
          modelValue: '',
          state: 'errored',
          message: 'This field has an error',
        },
      })

      cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')
      cy.get(messageClass).should('contain', 'This field has an error')
    })
  })
})
