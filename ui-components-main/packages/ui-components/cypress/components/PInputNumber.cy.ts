import { defineComponent, h, ref } from 'vue'

import { createStateWrapper } from '@cySupport/createStateWrapper'
import * as v from 'valibot'

import { stringToNumberSchema } from '@/types'

import PInputNumber from '@/components/inputNumber/PInputNumber.vue'
import { useValidation, useValidationField } from '@/composables'

const baseClass = '.polly-input-number'
const baseLabelClass = '.polly-label'
const inputClass = '.polly-input__control'
const inputBaseClass = '.polly-input-base'
const messageClass = '.polly-label__message'

describe('PInputNumber', () => {
  it('renders basic number input', () => {
    cy.mount(PInputNumber)
    cy.get(baseClass).should('exist')
    cy.get(inputClass).should('exist')
    cy.get(inputClass).should('have.attr', 'inputmode', 'decimal')
  })

  it('handles value binding', () => {
    cy.mount(PInputNumber, {
      props: {
        modelValue: '42.5',
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })
    cy.get(inputClass).should('have.value', '42.5')

    // Test input update
    cy.get(inputClass).clear().type('123.45')
    cy.get('@updateSpy').should('have.been.calledWith', '123.45')
  })

  it('handles null value', () => {
    cy.mount(PInputNumber, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })
    cy.get(inputClass).should('have.value', '')

    // Test clearing input
    cy.get(inputClass).type('123').clear()
    cy.get('@updateSpy').should('have.been.calledWith', null)
  })

  it('renders with placeholder', () => {
    cy.mount(PInputNumber, {
      props: {
        placeholder: 'Enter a number',
      },
    })
    cy.get(inputClass).should('have.attr', 'placeholder', 'Enter a number')
  })

  it('formats value on blur', () => {
    cy.mount(PInputNumber, {
      props: {
        modelValue: '1234.5',
        format: true,
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })

    // Check initial formatted value
    cy.get(inputClass).should('have.value', '1,234.5')

    // Check raw value on focus
    cy.get(inputClass).focus()
    cy.get(inputClass).should('have.value', '1234.5')

    // Check formatted value after blur
    cy.get(inputClass).blur()
    cy.get(inputClass).should('have.value', '1,234.5')
  })

  it('supports custom format function', () => {
    const customFormat = (value: number) => `$${value.toFixed(2)}`

    cy.mount(PInputNumber, {
      props: {
        modelValue: '42.5',
        format: customFormat,
      },
    })

    cy.get(inputClass).should('have.value', '$42.50')
  })

  describe('Keyboard Navigation', () => {
    it('increments value with up arrow', () => {
      cy.mount(PInputNumber, {
        props: {
          modelValue: '42',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(inputClass).type('{upArrow}')
      cy.get('@updateSpy').should('have.been.calledWith', '43')
    })

    it('decrements value with down arrow', () => {
      cy.mount(PInputNumber, {
        props: {
          modelValue: '42',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(inputClass).type('{downArrow}')
      cy.get('@updateSpy').should('have.been.calledWith', '41')
    })

    it('does not increment/decrement non-integer values', () => {
      cy.mount(PInputNumber, {
        props: {
          modelValue: '42.5',
          'onUpdate:modelValue': cy.spy().as('updateSpy'),
        },
      })

      cy.get(inputClass).type('{upArrow}')
      cy.get('@updateSpy').should('not.have.been.called')

      cy.get(inputClass).type('{downArrow}')
      cy.get('@updateSpy').should('not.have.been.called')
    })
  })

  describe('Slots', () => {
    it('renders prefix slot', () => {
      cy.mount(PInputNumber, {
        slots: {
          prefix: '<div class="prefix-content">$</div>',
        },
      })
      cy.get('.prefix-content').should('exist').and('contain.text', '$')
    })

    it('renders suffix slot', () => {
      cy.mount(PInputNumber, {
        slots: {
          suffix: '<div class="suffix-content">%</div>',
        },
      })
      cy.get('.suffix-content').should('exist').and('contain.text', '%')
    })

    it('renders label slot', () => {
      cy.mount(PInputNumber, {
        slots: {
          label: '<div class="label-content">Amount:</div>',
        },
      })
      cy.get('.label-content').should('exist').and('contain.text', 'Amount:')
    })

    it('renders message slot', () => {
      cy.mount(PInputNumber, {
        slots: {
          message: '<div class="message-content">Enter a valid number</div>',
        },
      })
      cy.get('.message-content').should('exist').and('contain.text', 'Enter a valid number')
    })
  })

  describe('Validation', () => {
    it('displays validation error from useValidationField', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a valid number'), v.minValue(10, 'Amount must be at least 10')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('5')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputNumber, {
              modelValue: this.amount,
              'onUpdate:modelValue': (val: string | null) => (this.amount = val ?? ''),
              label: 'Amount',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ amount: this.amount }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--errored')
      cy.get(messageClass).should('contain.text', 'Amount must be at least 10')
    })

    it('clears error state when user types', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a valid number'), v.minValue(10, 'Amount must be at least 10')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('5')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputNumber, {
              modelValue: this.amount,
              'onUpdate:modelValue': (val: string | null) => (this.amount = val ?? ''),
              label: 'Amount',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ amount: this.amount }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--errored')
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'true')

      cy.get(inputClass).clear().type('15')
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('validates number format correctly', () => {
      const schema = v.object({
        amount: stringToNumberSchema('Please enter a valid number'),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('abc')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputNumber, {
              modelValue: this.amount,
              'onUpdate:modelValue': (val: string | null) => (this.amount = val ?? ''),
              label: 'Amount',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ amount: this.amount }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(messageClass).should('contain.text', 'Please enter a valid number')

      cy.get(inputClass).clear().type('42.5')
      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--normal')
    })

    it('validates min and max values', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a number'), v.minValue(0, 'Must be at least 0'), v.maxValue(100, 'Must be at most 100')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('-5')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputNumber, {
              modelValue: this.amount,
              'onUpdate:modelValue': (val: string | null) => (this.amount = val ?? ''),
              label: 'Amount',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ amount: this.amount }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(messageClass).should('contain.text', 'Must be at least 0')

      cy.get(inputClass).clear().type('150')
      cy.get('.validate-btn').click()
      cy.get(messageClass).should('contain.text', 'Must be at most 100')

      cy.get(inputClass).clear().type('50')
      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--normal')
    })

    it('shows pending state during validation', () => {
      cy.mount(PInputNumber, {
        props: {
          state: 'pending',
          message: 'Validating...',
        },
      })

      cy.get(baseLabelClass).should('have.class', 'polly-label--pending')
      cy.get(messageClass).should('contain.text', 'Validating...')
    })

    it('clears validation with clear method', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a number'), v.minValue(10, 'Amount must be at least 10')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('5')
          const { validate, clear, isValid } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, clear, state, message, isValid }
        },
        render() {
          return h('div', [
            h(PInputNumber, {
              modelValue: this.amount,
              'onUpdate:modelValue': (val: string | null) => (this.amount = val ?? ''),
              label: 'Amount',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ amount: this.amount }) }, 'Validate'),
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

    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PInputNumber, { modelValue: '', label: 'Amount' }))

      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')
    })
  })
})
