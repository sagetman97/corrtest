import { defineComponent, h, ref } from 'vue'

import { createStateWrapper } from '@cySupport/createStateWrapper'
import * as v from 'valibot'

import PInput from '@/components/input/PInput.vue'
import { useValidation, useValidationField } from '@/composables'

const baseClass = '.polly-input'
const baseLabelClass = '.polly-label'
const inputClass = '.polly-input__control'
const prefixClass = '.polly-input-base__prefix'
const suffixClass = '.polly-input-base__suffix'
const labelClass = '.polly-label__label'
const messageClass = '.polly-label__message'
const inputBaseClass = '.polly-input-base'

describe('PInput', () => {
  it('renders basic input', () => {
    cy.mount(PInput)
    cy.get(baseClass).should('exist')
    cy.get(inputClass).should('exist')
  })

  it('handles value binding', () => {
    cy.mount(PInput, {
      props: {
        modelValue: 'test value',
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })
    cy.get(inputClass).should('have.value', 'test value')

    // Test input update
    cy.get(inputClass).clear().type('new value')
    cy.get('@updateSpy').should('have.been.calledWith', 'new value')
  })

  it('renders with label', () => {
    cy.mount(PInput, {
      props: {
        label: 'Test Label',
      },
    })
    cy.get(labelClass).should('contain.text', 'Test Label')
  })

  it('supports custom label via slot', () => {
    cy.mount(PInput, {
      slots: {
        label: '<span class="custom-label">Custom Label</span>',
      },
    })
    cy.get('.custom-label').should('exist').and('contain.text', 'Custom Label')
  })

  it('renders with placeholder', () => {
    cy.mount(PInput, {
      props: {
        placeholder: 'Enter text here',
      },
    })
    cy.get(inputClass).should('have.attr', 'placeholder', 'Enter text here')
  })

  it('renders validation message', () => {
    cy.mount(PInput, {
      props: {
        message: 'Error message',
        state: 'errored',
      },
    })
    cy.get(messageClass).should('contain.text', 'Error message')
    cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'true')
  })

  it('supports custom message via slot', () => {
    cy.mount(PInput, {
      props: {
        state: 'errored',
      },
      slots: {
        message: '<span class="custom-message">Custom Error</span>',
      },
    })
    cy.get('.custom-message').should('exist').and('contain.text', 'Custom Error')
  })

  it('handles disabled state', () => {
    cy.mount(PInput, {
      props: {
        disabled: true,
      },
    })
    cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
  })

  it('handles required state', () => {
    cy.mount(PInput, {
      props: {
        required: true,
      },
    })
    cy.get(inputClass).should('have.attr', 'aria-required', 'true')
  })

  describe('Prefix and Suffix', () => {
    it('renders prefix from prop', () => {
      cy.mount(PInput, {
        props: {
          prefix: 'prefix-text',
        },
      })
      cy.get(prefixClass).should('contain.text', 'prefix-text')
    })

    it('renders suffix from prop', () => {
      cy.mount(PInput, {
        props: {
          suffix: 'suffix-text',
        },
      })
      cy.get(suffixClass).should('contain.text', 'suffix-text')
    })

    it('renders prefix from slot', () => {
      cy.mount(PInput, {
        slots: {
          prefix: '<span class="custom-prefix">Custom Prefix</span>',
        },
      })
      cy.get('.custom-prefix').should('exist').and('contain.text', 'Custom Prefix')
    })

    it('renders suffix from slot', () => {
      cy.mount(PInput, {
        slots: {
          suffix: '<span class="custom-suffix">Custom Suffix</span>',
        },
      })
      cy.get('.custom-suffix').should('exist').and('contain.text', 'Custom Suffix')
    })
  })

  describe('Label Position', () => {
    it('supports different label positions', () => {
      const positions = ['top', 'left'] as const
      positions.forEach((position) => {
        cy.mount(PInput, {
          props: {
            label: 'Test Label',
            labelPosition: position,
          },
        })
        cy.get(labelClass).should('have.class', `polly-label__label--${position}`)
      })
    })
  })

  describe('Validation States', () => {
    it('supports different validation states', () => {
      const states = ['success', 'warning', 'errored'] as const
      states.forEach((state) => {
        cy.mount(PInput, {
          props: {
            state,
            message: `${state} message`,
          },
        })
        cy.get(baseLabelClass).should('have.class', `polly-label--${state}`)
        cy.get(messageClass).should('contain.text', `${state} message`)
      })
    })
  })

  describe('Highlighted State', () => {
    it('applies highlighted class when highlighted prop is true', () => {
      cy.mount(PInput, {
        props: {
          highlighted: true,
        },
      })
      cy.get(inputBaseClass).should('have.class', 'polly-input-base--highlighted')
    })
  })

  describe('Focus Behavior', () => {
    it('selects all text when input is focused', () => {
      const testValue = 'Test input value'
      cy.mount(PInput, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Verify initial value
      cy.get(inputClass).should('have.value', testValue)

      // Focus the input and verify all text is selected
      cy.get(inputClass).focus()

      // Wait for nextTick and check that text is selected
      cy.get(inputClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(testValue.length)
      })
    })

    it('selects all text when input with empty value is focused', () => {
      cy.mount(PInput, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus the input
      cy.get(inputClass).focus()

      // Check that selection properties are set correctly for empty input
      cy.get(inputClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(0)
      })
    })

    it('selects all text when input is focused multiple times', () => {
      const testValue = 'Multiple focus test'
      cy.mount(PInput, {
        props: {
          modelValue: testValue,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Focus, blur, then focus again
      cy.get(inputClass).focus().blur().focus()

      // Verify all text is still selected after multiple focus events
      cy.get(inputClass).should(($input) => {
        const input = $input[0] as HTMLInputElement
        expect(input.selectionStart).to.equal(0)
        expect(input.selectionEnd).to.equal(testValue.length)
      })
    })

    it('does not select text when input is disabled', () => {
      const testValue = 'Disabled input'
      cy.mount(PInput, {
        props: {
          modelValue: testValue,
          disabled: true,
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      // Verify input is disabled and cannot be focused
      cy.get(inputClass).should('be.disabled')
      cy.get(inputClass).should('not.be.focused')
    })
  })

  describe('Validation', () => {
    it('displays validation error from useValidationField', () => {
      const schema = v.object({
        name: v.pipe(v.string(), v.minLength(3, 'Name must be at least 3 characters')),
      })

      const TestComponent = defineComponent({
        setup() {
          const name = ref('')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('name')

          return { name, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInput, {
              modelValue: this.name,
              'onUpdate:modelValue': (val: string) => (this.name = val),
              label: 'Name',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ name: this.name }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--errored')
      cy.get(messageClass).should('contain.text', 'Name must be at least 3 characters')
    })

    it('clears error state when user types', () => {
      const schema = v.object({
        name: v.pipe(v.string(), v.minLength(3, 'Name must be at least 3 characters')),
      })

      const TestComponent = defineComponent({
        setup() {
          const name = ref('')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('name')

          return { name, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInput, {
              modelValue: this.name,
              'onUpdate:modelValue': (val: string) => (this.name = val),
              label: 'Name',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ name: this.name }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--errored')
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'true')

      cy.get(inputClass).type('abc')
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('shows success state after passing validation', () => {
      const schema = v.object({
        name: v.pipe(v.string(), v.minLength(3, 'Name must be at least 3 characters')),
      })

      const TestComponent = defineComponent({
        setup() {
          const name = ref('John')
          const { validate, isValid } = useValidation(schema)
          const { state, message } = useValidationField('name')

          return { name, validate, state, message, isValid }
        },
        render() {
          return h('div', [
            h(PInput, {
              modelValue: this.name,
              'onUpdate:modelValue': (val: string) => (this.name = val),
              label: 'Name',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ name: this.name }) }, 'Validate'),
            h('span', { class: 'is-valid' }, String(this.isValid)),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get('.is-valid').should('have.text', 'true')
      cy.get(baseLabelClass).should('have.class', 'polly-label--normal')
    })

    it('validates multiple rules and shows first error', () => {
      const schema = v.object({
        email: v.pipe(v.string(), v.nonEmpty('Email is required'), v.email('Invalid email format')),
      })

      const TestComponent = defineComponent({
        setup() {
          const email = ref('')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('email')

          return { email, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInput, {
              modelValue: this.email,
              'onUpdate:modelValue': (val: string) => (this.email = val),
              label: 'Email',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ email: this.email }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(messageClass).should('contain.text', 'Email is required')

      cy.get(inputClass).type('invalid')
      cy.get('.validate-btn').click()
      cy.get(messageClass).should('contain.text', 'Invalid email format')

      cy.get(inputClass).clear().type('valid@email.com')
      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--normal')
    })

    it('handles async validation with pending state', () => {
      const asyncSchema = v.objectAsync({
        username: v.pipeAsync(
          v.string(),
          v.minLength(3),
          v.customAsync(async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 100))
            return value !== 'taken'
          }, 'Username is already taken')
        ),
      })

      const TestComponent = defineComponent({
        setup() {
          const username = ref('')
          const { validate, pending } = useValidation(asyncSchema)
          const { state, message } = useValidationField('username')

          return { username, validate, state, message, pending }
        },
        render() {
          return h('div', [
            h(PInput, {
              modelValue: this.username,
              'onUpdate:modelValue': (val: string) => (this.username = val),
              label: 'Username',
              state: this.pending ? 'pending' : this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ username: this.username }) }, 'Validate'),
            h('span', { class: 'pending-state' }, String(this.pending)),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get(inputClass).type('taken')
      cy.get('.validate-btn').click()

      cy.get('.pending-state').should('have.text', 'true')
      cy.get(baseLabelClass).should('have.class', 'polly-label--pending')

      cy.get('.pending-state').should('have.text', 'false')
      cy.get(messageClass).should('contain.text', 'Username is already taken')
    })

    it('clears validation with clear method', () => {
      const schema = v.object({
        name: v.pipe(v.string(), v.minLength(3, 'Name must be at least 3 characters')),
      })

      const TestComponent = defineComponent({
        setup() {
          const name = ref('')
          const { validate, clear, isValid } = useValidation(schema)
          const { state, message } = useValidationField('name')

          return { name, validate, clear, state, message, isValid }
        },
        render() {
          return h('div', [
            h(PInput, {
              modelValue: this.name,
              'onUpdate:modelValue': (val: string) => (this.name = val),
              label: 'Name',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ name: this.name }) }, 'Validate'),
            h('button', { class: 'clear-btn', onClick: () => this.clear() }, 'Clear'),
            h('span', { class: 'is-valid' }, String(this.isValid)),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--errored')
      cy.get('.is-valid').should('have.text', 'false')

      cy.get('.clear-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--normal')
      cy.get('.is-valid').should('have.text', 'undefined')
    })

    it('maintains aria-invalid attribute based on validation state', () => {
      cy.mount(PInput, {
        props: {
          state: 'errored',
          message: 'Field is invalid',
        },
      })

      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'true')

      cy.mount(PInput, {
        props: {
          state: 'normal',
        },
      })

      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PInput, { modelValue: '', label: 'Name' }))

      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')
    })
  })
})
