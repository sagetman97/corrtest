import { defineComponent, h, ref } from 'vue'

import { createStateWrapper } from '@cySupport/createStateWrapper'
import * as v from 'valibot'

import { InputNumberProps, minMaxDecimalCount, stringToNumberSchema } from '@/types'

import PInputCurrency from '@/components/inputCurrency/PInputCurrency.vue'
import { useValidation, useValidationField } from '@/composables'

const baseClass = '.polly-input'
const inputClass = '.polly-input__control'
const inputBaseClass = '.polly-input-base'
const prefixClass = '.polly-input-base__prefix'
const labelClass = '.polly-label__label'
const baseLabelClass = '.polly-label'
const messageClass = '.polly-label__message'

describe('PInputCurrency', () => {
  it('renders basic currency input', () => {
    cy.mount(PInputCurrency)
    cy.get(baseClass).should('exist')
    cy.get(inputClass).should('exist')
    cy.get(prefixClass).should('contain.text', '$')
  })

  it('handles value binding', () => {
    cy.mount(PInputCurrency, {
      props: {
        modelValue: '42.5',
        'onUpdate:modelValue': cy.spy().as('updateSpy'),
      },
    })
    cy.get(inputClass).should('have.value', '42.5')

    // Test input update
    cy.get(inputClass).clear().type('123.45')
    cy.get('@updateSpy').its('lastCall.args.0').should('equal', '123.45')
  })

  it('renders with placeholder', () => {
    cy.mount(PInputCurrency, {
      props: {
        placeholder: 'Enter amount',
      },
    })
    cy.get(inputClass).should('have.attr', 'placeholder', 'Enter amount')
  })

  it('handles decimal values correctly', () => {
    const testCases = [
      { input: '1234', expected: '1,234' },
      { input: '1234.5', expected: '1,234.5' },
      { input: '1234.56', expected: '1,234.56' },
      { input: '1234.567', expected: '1,234.567' },
    ]

    testCases.forEach(({ input, expected }) => {
      cy.mount(PInputCurrency, {
        props: {
          modelValue: input,
        },
      })

      // Check initial formatted value
      cy.get(inputClass).should('have.value', expected)

      // Check that input accepts raw values
      cy.get(inputClass).focus()
      cy.get(inputClass).should('have.value', input)

      // Check that value is formatted on blur
      cy.get(inputClass).blur()
      cy.get(inputClass).should('have.value', expected)
    })
  })

  it('formats decimal values correctly', () => {
    cy.mount(PInputCurrency, {
      props: {
        modelValue: '1234.5',
      },
    })
    cy.get(inputClass).should('have.value', '1,234.5')
  })

  it('handles large numbers with proper formatting', () => {
    cy.mount(PInputCurrency, {
      props: {
        modelValue: '1234567.89',
      },
    })
    cy.get(inputClass).should('have.value', '1,234,567.89')
  })

  it('renders with label', () => {
    cy.mount(PInputCurrency, {
      props: {
        label: 'Amount',
      },
    })
    cy.get(labelClass).should('contain.text', 'Amount')
  })

  it('supports custom label via slot', () => {
    cy.mount(PInputCurrency, {
      slots: {
        label: '<span class="custom-label">Custom Amount</span>',
      },
    })
    cy.get('.custom-label').should('contain.text', 'Custom Amount')
  })

  it('handles disabled state', () => {
    cy.mount(PInputCurrency, {
      props: {
        disabled: true,
        modelValue: '42.5',
      },
    })
    cy.get(inputClass).should('have.attr', 'aria-disabled', 'true')
  })

  it('displays validation message', () => {
    cy.mount(PInputCurrency, {
      props: {
        message: 'Invalid amount',
        state: 'errored',
      },
    })
    cy.get(messageClass).should('contain.text', 'Invalid amount')
    cy.get(baseClass).should('have.class', 'polly-label--errored')
  })

  describe('Custom Slots', () => {
    it('allows custom prefix override', () => {
      cy.mount(PInputCurrency, {
        slots: {
          prefix: '<span class="custom-prefix">USD</span>',
        },
      })
      cy.get('.custom-prefix').should('contain.text', 'USD')
    })

    it('supports suffix slot', () => {
      cy.mount(PInputCurrency, {
        slots: {
          suffix: '<span class="custom-suffix">.00</span>',
        },
      })
      cy.get('.custom-suffix').should('contain.text', '.00')
    })

    it('supports message slot', () => {
      cy.mount(PInputCurrency, {
        props: {
          state: 'errored',
        },
        slots: {
          message: '<span class="custom-message">Custom error message</span>',
        },
      })
      cy.get('.custom-message').should('contain.text', 'Custom error message')
    })
  })

  describe('Label Position', () => {
    it('supports different label positions', () => {
      const positions = ['top', 'left'] as const
      positions.forEach((position) => {
        cy.mount(PInputCurrency, {
          props: {
            label: 'Amount',
            labelPosition: position,
          },
        })
        cy.get(labelClass).should('have.class', `polly-label__label--${position}`)
      })
    })
  })

  describe('Validation States', () => {
    it('supports different validation states', () => {
      const states: InputNumberProps['state'][] = ['normal', 'pending', 'errored'] as const
      states.forEach((state) => {
        cy.mount(PInputCurrency, {
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

  describe('Validation', () => {
    it('displays validation error from useValidationField', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a valid currency amount'), v.minValue(100, 'Amount must be at least $100')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('50')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputCurrency, {
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
      cy.get(messageClass).should('contain.text', 'Amount must be at least $100')
    })

    it('clears error state when user types', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a valid amount'), v.minValue(100, 'Amount must be at least $100')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('50')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputCurrency, {
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

      cy.get(inputClass).clear().type('150')
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('validates decimal places for currency', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a valid number'), minMaxDecimalCount({ max: 2 }, 'Maximum 2 decimal places')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('10.999')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputCurrency, {
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
      cy.get(messageClass).should('contain.text', 'Maximum 2 decimal places')

      cy.get(inputClass).clear().type('10.99')
      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--normal')
    })

    it('validates currency range', () => {
      const schema = v.object({
        salary: v.pipe(
          stringToNumberSchema('Invalid number format'),
          v.minValue(100, 'This value is too low, should be ≥ $100'),
          v.maxValue(1_000_000, 'This value is too high, should be ≤ $1,000,000')
        ),
      })

      const TestComponent = defineComponent({
        setup() {
          const salary = ref('50')
          const { validate } = useValidation(schema)
          const { state, message } = useValidationField('salary')

          return { salary, validate, state, message }
        },
        render() {
          return h('div', [
            h(PInputCurrency, {
              modelValue: this.salary,
              'onUpdate:modelValue': (val: string | null) => (this.salary = val ?? ''),
              label: 'Salary',
              state: this.state,
              message: this.message,
            }),
            h('button', { class: 'validate-btn', onClick: () => this.validate({ salary: this.salary }) }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(messageClass).should('contain.text', 'This value is too low')

      cy.get(inputClass).clear().type('2000000')
      cy.get('.validate-btn').click()
      cy.get(messageClass).should('contain.text', 'This value is too high')

      cy.get(inputClass).clear().type('50000')
      cy.get('.validate-btn').click()
      cy.get(baseLabelClass).should('have.class', 'polly-label--normal')
    })

    it('clears validation with clear method', () => {
      const schema = v.object({
        amount: v.pipe(stringToNumberSchema('Must be a number'), v.minValue(100, 'Amount must be at least $100')),
      })

      const TestComponent = defineComponent({
        setup() {
          const amount = ref('50')
          const { validate, clear, isValid } = useValidation(schema)
          const { state, message } = useValidationField('amount')

          return { amount, validate, clear, state, message, isValid }
        },
        render() {
          return h('div', [
            h(PInputCurrency, {
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
      cy.mount(createStateWrapper(PInputCurrency, { modelValue: '', label: 'Amount' }))

      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(inputBaseClass).should('have.attr', 'aria-invalid', 'false')
    })
  })
})
