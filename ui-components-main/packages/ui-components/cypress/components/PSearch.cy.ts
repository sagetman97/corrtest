import { createStateWrapper } from '@cySupport/createStateWrapper'

import PSearch from '@/components/search/PSearch.vue'

const baseClass = '.polly-search'
const inputControlClass = '.polly-input__control'
const iconClass = '.polly-icon'
const labelClass = '.polly-label'

describe('PSearch', () => {
  describe('Basic Rendering', () => {
    it('renders basic search input', () => {
      cy.mount(PSearch)
      cy.get(baseClass).should('exist')
      cy.get(inputControlClass).should('exist').should('have.attr', 'placeholder', 'Search...')
    })

    it('renders search icon in prefix slot', () => {
      cy.mount(PSearch)
      cy.get(iconClass).should('exist').should('have.class', 'fa-search')
    })
  })

  describe('Value Binding', () => {
    it('handles value binding', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: 'test search',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })
      cy.get(inputControlClass).should('have.value', 'test search')

      // Test input update
      cy.get(inputControlClass).clear().type('new search')
      cy.get('@updateSpy').should('have.been.calledWith', 'new search')
    })

    it('handles null value correctly', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: null,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })
      cy.get(inputControlClass).should('have.value', '')
    })
  })

  describe('Props Forwarding', () => {
    it('forwards input props to PInput component', () => {
      cy.mount(PSearch, {
        props: {
          disabled: true,
          required: true,
          placeholder: 'Custom placeholder',
        },
      })

      cy.get(inputControlClass).should('have.attr', 'aria-disabled')
      cy.get(inputControlClass).should('have.attr', 'placeholder', 'Custom placeholder')
      cy.get(inputControlClass).should('have.attr', 'aria-required')
    })

    it('handles error state', () => {
      cy.mount(PSearch, {
        props: {
          state: 'errored',
          message: 'Error message',
        },
      })

      cy.get(baseClass).should('contain.text', 'Error message')
      cy.get(labelClass).should('have.class', 'polly-label--errored')
    })
  })

  describe('User Interactions', () => {
    it('handles search clearing', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: 'initial value',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(inputControlClass).clear()
      cy.get('@updateSpy').should('have.been.calledWith', '')
    })
  })

  describe('Clear Button', () => {
    const clearButtonClass = '.polly-search__clear-button'

    it('shows clear button when input has value', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: 'search text',
        },
      })

      cy.get(clearButtonClass).should('exist').should('be.visible')
    })

    it('hides clear button when input is empty', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: '',
        },
      })

      cy.get(clearButtonClass).should('not.exist')
    })

    it('hides clear button when input is null', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: null,
        },
      })

      cy.get(clearButtonClass).should('not.exist')
    })

    it('clears input value when clear button is clicked', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: 'search text',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(clearButtonClass).click()
      cy.get('@updateSpy').should('have.been.calledWith', null)
    })

    it('hides clear button when disabled', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: 'search text',
          disabled: true,
        },
      })

      cy.get(clearButtonClass).should('not.exist')
    })
  })

  describe('Accessibility', () => {
    it('maintains proper aria attributes', () => {
      cy.mount(PSearch, {
        props: {
          required: true,
        },
      })

      cy.get(inputControlClass).should('have.attr', 'aria-required', 'true')
      cy.get(inputControlClass).should('have.attr', 'role', 'searchbox')
    })
  })

  describe('Edge Cases', () => {
    it('handles long input values', () => {
      const longText = 'a'.repeat(100)
      cy.mount(PSearch, {
        props: {
          modelValue: longText,
        },
      })

      cy.get(inputControlClass).should('have.value', longText).should('be.visible')
    })
  })

  describe('Focus Behavior', () => {
    it('selects all text when search input is focused', () => {
      const testValue = 'search query text'
      cy.mount(PSearch, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Verify initial value
      cy.get(inputControlClass).should('have.value', testValue)

      // Focus the input and verify all text is selected
      cy.get(inputControlClass).focus()

      // Wait for nextTick and check that text is selected
      cy.get(inputControlClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(testValue.length)
      })
    })

    it('selects all text when empty search input is focused', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus the input
      cy.get(inputControlClass).focus()

      // Check that selection properties are set correctly for empty input
      cy.get(inputControlClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(0)
      })
    })

    it('selects all text when search input with special characters is focused', () => {
      const testValue = 'search: "special chars" & symbols!'
      cy.mount(PSearch, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus the input and verify all text including special characters is selected
      cy.get(inputControlClass).focus()

      cy.get(inputControlClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(testValue.length)
      })
    })

    it('selects all text when search input is focused multiple times', () => {
      const testValue = 'persistent search query'
      cy.mount(PSearch, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus, blur, then focus again
      cy.get(inputControlClass).focus().blur().focus()

      // Verify all text is still selected after multiple focus events
      cy.get(inputControlClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(testValue.length)
      })
    })

    it('handles focus behavior with long search queries', () => {
      const testValue = 'this is a very long search query that contains many words and should still be fully selected when focused'
      cy.mount(PSearch, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus the input and verify all text is selected
      cy.get(inputControlClass).focus()

      cy.get(inputControlClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(testValue.length)
      })
    })
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PSearch, { modelValue: '', placeholder: 'Search...' }))

      cy.get('.polly-input-base').should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get('.polly-input-base').should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get('.polly-input-base').should('have.attr', 'aria-invalid', 'false')
    })

    it('shows errored state styling', () => {
      cy.mount(PSearch, {
        props: {
          modelValue: '',
          state: 'errored',
          message: 'Search query is invalid',
        },
      })

      cy.get('.polly-input-base').should('have.attr', 'aria-invalid', 'true')
      cy.get(baseClass).should('contain.text', 'Search query is invalid')
    })
  })
})
