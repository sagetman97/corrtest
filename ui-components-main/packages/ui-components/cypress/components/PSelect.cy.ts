import { createStateWrapper } from '@cySupport/createStateWrapper'

import PSelect from '@/components/select/PSelect.vue'

const baseClass = '.polly-select'
const controlClass = '.polly-select__control'
const optionsClass = '.polly-options'
const optionClass = '.polly-option--option'
const groupOption = '.polly-option--nested'
const chipClass = '.polly-select__multiple-chip'
const placeholderClass = '.polly-select__placeholder'
const searchInputClass = '.polly-select__search'
const optionGroupClass = '.polly-option--group'
const toggleButtonClass = '.polly-select__target-icon'

describe('PSelect', () => {
  beforeEach(() => {
    cy.wrap([
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ]).as('sampleOptions')

    cy.wrap([
      {
        label: 'Group 1',
        options: [
          { label: 'Option 1.1', value: '1.1' },
          { label: 'Option 1.2', value: '1.2' },
        ],
      },
      {
        label: 'Group 2',
        options: [
          { label: 'Option 2.1', value: '2.1' },
          { label: 'Option 2.2', value: '2.2' },
        ],
      },
      {
        label: 'Group 3',
        options: [
          { label: 'Option 3.1', value: '3.1' },
          { label: 'Option 3.2', value: '3.2' },
        ],
      },
      {
        label: 'Group 4',
        options: [
          { label: 'Option 4.1', value: '4.1' },
          { label: 'Option 4.2', value: '4.2' },
        ],
      },
      {
        label: 'Group 5',
        options: [
          { label: 'Option 5.1', value: '5.1' },
          { label: 'Option 5.2', value: '5.2' },
        ],
      },
      {
        label: 'Group 6',
        options: [
          { label: 'Option 6.1', value: '6.1' },
          { label: 'Option 6.2', value: '6.2' },
        ],
      },
      {
        label: 'Group 7',
        options: [
          { label: 'Option 7.1', value: '7.1' },
          { label: 'Option 7.2', value: '7.2' },
        ],
      },
      {
        label: 'Group 8',
        options: [
          { label: 'Option 8.1', value: '8.1' },
          { label: 'Option 8.2', value: '8.2' },
        ],
      },
      {
        label: 'Group 9',
        options: [
          { label: 'Option 9.1', value: '9.1' },
          { label: 'Option 9.2', value: '9.2' },
        ],
      },
      {
        label: 'Group 10',
        options: [
          { label: 'Option 10.1', value: '10.1' },
          { label: 'Option 10.2', value: '10.2' },
        ],
      },
      {
        label: 'Group 11',
        options: [
          { label: 'Option 11.1', value: '11.1' },
          { label: 'Option 11.2', value: '11.2' },
        ],
      },
    ]).as('groupedOptions')

    cy.wrap([
      {
        label: 'Group 1',
        options: [
          { label: 'Option 1.1', value: '1.1' },
          { label: 'Option 1.2', value: '1.2' },
          { label: 'Option 1.3', value: '1.3' },
          { label: 'Option 1.4', value: '1.4' },
          { label: 'Option 1.5', value: '1.5' },
          { label: 'Option 1.6', value: '1.6' },
        ],
      },
      {
        label: 'Group 2',
        options: [
          { label: 'Option 2.1', value: '2.1' },
          { label: 'Option 2.2', value: '2.2' },
          { label: 'Option 2.3', value: '2.3' },
          { label: 'Option 2.4', value: '2.4' },
          { label: 'Option 2.5', value: '2.5' },
          { label: 'Option 2.6', value: '2.6' },
          { label: 'Option 2.7', value: '2.7' },
        ],
      },
    ]).as('groupedOptionsWithManyOptions')

    cy.wrap([
      {
        label: 'Group 1',
        options: [
          { label: 'Option 1.1', value: '1.1' },
          { label: 'Option 1.2', value: '1.2' },
        ],
      },
      {
        label: 'Option 2',
        value: '2',
      },
      {
        label: 'Option 3',
        value: '3',
      },
    ]).as('ungroupedOptions')

    cy.wrap([
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
      { label: 'Option 6', value: '6' },
      { label: 'Option 7', value: '7' },
      { label: 'Option 8', value: '8' },
      { label: 'Option 9', value: '9' },
      { label: 'Option 10', value: '10' },
    ]).as('manyOptions')

    cy.wrap([
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4', disabled: true },
      { label: 'Option 5', value: '5' },
    ]).as('optionsWithDisabled')

    cy.wrap([
      {
        label: 'Group with Disabled Options',
        options: [
          { label: 'Group Option 1', value: 'g1' },
          { label: 'Group Option 2', value: 'g2', disabled: true },
          { label: 'Group Option 3', value: 'g3' },
          { label: 'Group Option 4', value: 'g4', disabled: true },
        ],
      },
      {
        label: 'Disabled Group',
        disabled: true,
        options: [
          { label: 'Disabled Group Option 1', value: 'dg1' },
          { label: 'Disabled Group Option 2', value: 'dg2' },
        ],
      },
    ]).as('groupedOptionsWithDisabled')
  })

  describe('Basic Rendering', () => {
    it('renders basic select', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
          },
        })
        cy.get(baseClass).should('exist')
        cy.get(controlClass).should('exist')
      })
    })

    it('renders with placeholder', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            placeholder: 'Select an option',
          },
        })
        cy.get(placeholderClass).should('contain.text', 'Select an option')
      })
    })

    it('renders with label', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            label: 'Test Label',
          },
        })
        cy.get('.polly-label').should('contain.text', 'Test Label')
      })
    })
  })

  describe('Single Select Functionality', () => {
    it('selects option on click', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).eq(1).click()
        cy.get('@updateSpy').should('have.been.calledWith', '1')
        cy.get(controlClass).should('contain.text', 'Option 1')
      })
    })

    it('closes options after selection', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().click()
        cy.get('.polly-popover-content').should('not.be.visible')
      })
    })
  })

  describe('Multiple Select Functionality', () => {
    it('renders selected options as chips', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: true,
            modelValue: ['1', '2'],
          },
        })
        cy.get(chipClass).should('have.length', 2)
        cy.get(chipClass).first().should('contain.text', 'Option 1')
        cy.get(chipClass).last().should('contain.text', 'Option 2')
      })
    })

    it('allows multiple selections', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: true,
            modelValue: [],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).eq(1).click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['1'])
        cy.get(optionClass).eq(2).click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['2'])
      })
    })

    it('grouped options all get selected if you click the group header', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            multiple: true,
            modelValue: [],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionGroupClass).first().click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['1.1', '1.2'])
      })
    })

    it('grouped options all get deselected if you click the group header', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            multiple: true,
            modelValue: ['1.1', '1.2'],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionGroupClass).first().click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', [])
      })
    })

    it('disabled groups are not selectable', () => {
      cy.get('@groupedOptionsWithDisabled').then((groupedOptionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptionsWithDisabled,
            multiple: true,
            modelValue: [],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionGroupClass).eq(1).click({ force: true })
        cy.get('@updateSpy').should('not.have.been.called')
      })
    })

    it('selecting a group header does not select nested disabled options', () => {
      cy.get('@groupedOptionsWithDisabled').then((groupedOptionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptionsWithDisabled,
            multiple: true,
            modelValue: [],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionGroupClass).first().click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['g1', 'g3'])
      })
    })

    it('removes chip on click', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: true,
            modelValue: ['1', '2'],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(chipClass).first().find('.polly-chip__dismiss-button').click()
        cy.get('@updateSpy').should('have.been.calledWith', ['2'])
      })
    })
  })

  describe('Select All Functionality', () => {
    it('renders select all option in multiple mode', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: true,
            modelValue: [],
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get('.polly-option--select-all').should('exist')
        cy.get('.polly-option--select-all').should('contain.text', 'Select all')
      })
    })

    it('does not render select all option in single mode', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: false,
            modelValue: null,
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get('.polly-option--select-all').should('not.exist')
      })
    })

    it('selects all enabled options when clicked', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: true,
            modelValue: [],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get('.polly-option--select-all').click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['1', '2', '3'])
      })
    })

    it('deselects all enabled options when all are selected', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: true,
            modelValue: ['1', '2', '3'],
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get('.polly-option--select-all').should('have.class', 'polly-option--selected')
        cy.get('.polly-option--select-all').click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', [])
      })
    })

    it('preserves selected disabled options when using select all', () => {
      cy.get('@optionsWithDisabled').then((optionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: optionsWithDisabled,
            multiple: true,
            modelValue: ['2', '4'], // Pre-select disabled options
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()

        // Verify disabled options are already selected
        cy.get(chipClass).should('have.length', 2)
        cy.get(chipClass).eq(0).should('contain.text', 'Option 2')
        cy.get(chipClass).eq(1).should('contain.text', 'Option 4')

        // Click select all
        cy.get('.polly-option--select-all').click()

        // Should select all enabled options AND preserve disabled selected options
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['1', '3', '5', '2', '4'])
      })
    })

    it('preserves selected disabled options when deselecting all', () => {
      cy.get('@optionsWithDisabled').then((optionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: optionsWithDisabled,
            multiple: true,
            modelValue: ['1', '2', '3', '4', '5'], // All options selected
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()

        // Verify all options are selected
        cy.get(chipClass).should('have.length', 5)
        cy.get('.polly-option--select-all').should('have.class', 'polly-option--selected')

        // Click select all to deselect
        cy.get('.polly-option--select-all').click()

        // Should only preserve disabled selected options
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['2', '4'])
      })
    })

    it('shows indeterminate state when some but not all enabled options are selected', () => {
      cy.get('@optionsWithDisabled').then((optionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: optionsWithDisabled,
            multiple: true,
            modelValue: ['1', '2'], // One enabled, one disabled
            showInputIcons: true,
          },
        })
        cy.get(toggleButtonClass).click()

        // Select all checkbox should be indeterminate
        cy.get('.polly-option--select-all .polly-checkbox input').should('have.prop', 'indeterminate', true)
      })
    })

    it('works correctly with grouped options containing disabled items', () => {
      cy.get('@groupedOptionsWithDisabled').then((groupedOptionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptionsWithDisabled,
            multiple: true,
            modelValue: ['g2', 'g4'], // Pre-select disabled options from first group
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()

        // Click select all
        cy.get('.polly-option--select-all').click()

        // Should select all enabled options and preserve disabled selected options
        // The order should be: enabled options first, then disabled options
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['g1', 'g3', 'g2', 'g4'])
      })
    })

    it('preserves selected disabled options when deselecting a group', () => {
      cy.get('@groupedOptionsWithDisabled').then((groupedOptionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptionsWithDisabled,
            multiple: true,
            modelValue: ['g1', 'g2', 'g3', 'g4'], // All options from first group selected (including disabled)
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()

        // Verify the group shows as selected (since all enabled options are selected)
        cy.get(optionGroupClass).first().should('have.class', 'polly-option--selected')

        // Click the group header to deselect
        cy.get(optionGroupClass).first().click()

        // Should only deselect enabled options (g1, g3) and preserve disabled selected options (g2, g4)
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['g2', 'g4'])
      })
    })

    it('group header shows selected state correctly with normal groups', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            multiple: true,
            modelValue: ['1.1', '1.2'], // Pre-select all options in first group
          },
        })
        cy.get(toggleButtonClass).click()

        // Group should show as selected since all its options are selected
        cy.get(optionGroupClass).first().should('have.class', 'polly-option--selected')
      })
    })

    it('group header shows selected state when all enabled options are selected', () => {
      cy.get('@groupedOptionsWithDisabled').then((groupedOptionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptionsWithDisabled,
            multiple: true,
            modelValue: ['g1', 'g3'], // Pre-select the enabled options
          },
        })
        cy.get(toggleButtonClass).click()

        // Group should show as selected since all enabled options are selected
        cy.get(optionGroupClass).first().should('have.class', 'polly-option--selected')
      })
    })

    it('group header does not show selected state when only some enabled options are selected', () => {
      cy.get('@groupedOptionsWithDisabled').then((groupedOptionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptionsWithDisabled,
            multiple: true,
            modelValue: ['g1'], // Only select one enabled option
          },
        })
        cy.get(toggleButtonClass).click()

        // Group should not show as selected since not all enabled options are selected
        cy.get(optionGroupClass).first().should('not.have.class', 'polly-option--selected')
      })
    })

    it('group header ignores disabled options when determining selected state', () => {
      cy.get('@groupedOptionsWithDisabled').then((groupedOptionsWithDisabled) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptionsWithDisabled,
            multiple: true,
            modelValue: ['g1', 'g3', 'g2'], // Select enabled options + one disabled option
          },
        })
        cy.get(toggleButtonClass).click()

        // Group should show as selected since all enabled options are selected (disabled g2 is ignored)
        cy.get(optionGroupClass).first().should('have.class', 'polly-option--selected')
      })
    })
  })

  describe('Grouped Options', () => {
    it('renders option groups', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionGroupClass).should('have.length', 11)
        cy.get(optionGroupClass).first().should('contain.text', 'Group 1')
      })
    })

    it('Ungrouped options are rendered at the end not in a group', () => {
      cy.get('@ungroupedOptions').then((ungroupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: ungroupedOptions,
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).eq(4).should('contain.text', 'Option 3')
      })
    })

    it('selects grouped option', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(groupOption).first().click()
        cy.get('@updateSpy').should('have.been.calledWith', '1.1')
      })
    })

    it('group headers are not selectable when not in multiple mode', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            multiple: false,
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()

        // Click on the group header
        cy.get(optionGroupClass).first().click()

        // Should not trigger any selection
        cy.get('@updateSpy').should('not.have.been.called')

        // The select should remain open (not closed by selection)
        cy.get('.polly-popover-content').should('be.visible')

        // No value should be selected
        cy.get(controlClass).should('not.contain.text', 'Group 1')
      })
    })
  })

  describe('States and Validation', () => {
    it('handles disabled state', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            disabled: true,
          },
        })
        cy.get(controlClass).should('have.attr', 'aria-disabled', 'true')
        cy.get(controlClass).click()
        cy.get(optionsClass).should('not.be.visible')
      })
    })

    it('handles error state', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            state: 'errored',
            message: 'Error message',
          },
        })
        cy.get(baseClass).should('contain.text', 'Error message')
      })
    })

    it('handles required state', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            required: true,
          },
        })
        cy.get(controlClass).should('have.attr', 'aria-required', 'true')
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('opens options with space', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
          },
        })
        cy.get(controlClass).focus().type(' ')
        cy.get('.polly-popover-content').should('be.visible')
      })
    })

    it('opens options with enter', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
          },
        })
        cy.get(controlClass).focus().type('{enter}')
        cy.get('.polly-popover-content').should('be.visible')
      })
    })
  })

  describe('Custom Slots', () => {
    it('renders custom option slot', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            required: true,
          },
          slots: {
            option: `
              <template #option="{ option }">
                <div class="custom-option">{{ option.label }}</div>
              </template>
            `,
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get('.custom-option').should('have.length', 3)
      })
    })

    it('renders custom icon slot', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
          },
          slots: {
            optionIcon: '<div class="custom-icon">★</div>',
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionsClass).get('.custom-icon').should('exist')
        cy.get('.custom-icon').should('contain.text', '★')
      })
    })

    it('renders custom target icon slot', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
          },
          slots: {
            targetIcon: '<div class="custom-icon">▼</div>',
          },
        })
        cy.get('.custom-icon').should('exist')
        cy.get('.custom-icon').should('contain.text', '▼')
      })
    })

    it('provides correct scope to slots', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            modelValue: '1',
            required: true,
          },
          slots: {
            option: `
              <template #option="{ option, selected, disabled }">
                <div class="scoped-option" :class="{ 'is-selected': selected, 'is-disabled': disabled }">
                  Option: {{ option.label }}
                </div>
              </template>
            `,
            footer: `
              <template #footer="{ value }">
                <div class="options-footer">
                  Selected: {{ value }}
                </div>
              </template>
            `,
          },
        })

        cy.get(toggleButtonClass).click()
        cy.get('.scoped-option').first().should('have.class', 'is-selected')
        cy.get('.scoped-option').should('contain.text', 'Option: Option 1')
        cy.get('.options-footer').should('contain.text', 'Selected: 1')
      })
    })

    it('provides working setSelected function in footer slot', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            modelValue: '1',
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
          slots: {
            footer: `
              <template #footer="{ setSelected, value }">
                <div class="options-footer">
                  <button
                    class="select-option-btn"
                    @click="setSelected('2')"
                  >
                    Select Option 2
                  </button>
                  <span class="selected-value">Value: {{ value }}</span>
                </div>
              </template>
            `,
          },
        })

        cy.get(toggleButtonClass).click()
        cy.get('.select-option-btn').click()
        cy.get('@updateSpy').should('have.been.calledWith', '2')
      })
    })

    it('provides working setSelected function in footer slot for multiple select', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            modelValue: ['1'],
            multiple: true,
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
          slots: {
            footer: `
              <template #footer="{ setSelected, value }">
                <div class="options-footer">
                  <button
                    class="select-option-btn"
                    @click="setSelected('2')"
                  >
                    Toggle Option 2
                  </button>
                  <span class="selected-value">Values: {{ value }}</span>
                </div>
              </template>
            `,
          },
        })

        cy.get(toggleButtonClass).click()
        cy.get('.select-option-btn').click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['1', '2'])
      })
    })

    it('setSelected multiple toggles off', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            modelValue: ['1', '2'],
            multiple: true,
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
          slots: {
            footer: `
              <template #footer="{ setSelected, value }">
                <div class="options-footer">
                  <button
                    class="select-option-btn"
                    @click="setSelected('2')"
                  >
                    Toggle Option 2
                  </button>
                  <span class="selected-value">Values: {{ value }}</span>
                </div>
              </template>
            `,
          },
        })

        cy.get(toggleButtonClass).click()
        cy.get('.select-option-btn').click()
        cy.get('@updateSpy').its('lastCall.args.0').should('deep.equal', ['1'])
      })
    })
  })

  describe('filtering', () => {
    it('filters options based on search text', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            filter: true,
            required: true,
          },
        })
        cy.get(toggleButtonClass).click()

        // Initial state - all options visible
        cy.get(optionClass).should('have.length', sampleOptions.length)

        // Filter by "Option 2"
        cy.get(searchInputClass).type('Option 2')
        cy.get(optionClass).should('have.length', 1)
        cy.get(optionClass).should('contain.text', 'Option 2')
      })
    })

    it('filters grouped options based on option text', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            filter: true,
            required: true,
          },
        })
        cy.get(toggleButtonClass).click()

        // Filter by specific option - use "Option 1.1" to avoid matching "11.1"
        cy.get(searchInputClass).type('Option 1.1')
        cy.get(optionGroupClass).should('have.length', 1)
        cy.get(optionClass).should('have.length', 1)
        cy.get(optionClass).first().should('contain.text', 'Option 1.1')
      })
    })

    it('filters grouped options based on group header', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            filter: true,
            required: true,
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionGroupClass).should('have.length', 11)
        // Filter by group name
        cy.get(searchInputClass).type('Group 5')

        // Should show the matching group with all its options
        cy.get(optionGroupClass).should('have.length', 1)
        cy.get('.polly-option--group').should('contain.text', 'Group 5')
        cy.get(optionClass).should('have.length', 2)
        cy.get(optionClass).first().should('contain.text', 'Option 5.1')
        cy.get(optionClass).last().should('contain.text', 'Option 5.2')
        cy.get(optionClass).should('not.contain.text', 'Option 1')
      })
    })

    it('applies custom filter function correctly', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        const customFilter = (option) => option.label?.includes('Group 5')
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            filter: customFilter,
            required: true,
          },
        })
        cy.get(toggleButtonClass).click()

        // Should only show Group 5 and its options
        cy.get(optionGroupClass).should('have.length', 1)
        cy.get('.polly-option--group').should('contain.text', 'Group 5')
        cy.get(optionClass).should('have.length', 2)
        cy.get(optionClass).first().should('contain.text', 'Option 5.1')
        cy.get(optionClass).last().should('contain.text', 'Option 5.2')
      })
    })

    describe('filter threshold', () => {
      it('does not show search input with less than 10 options', () => {
        cy.get('@manyOptions').then((manyOptions) => {
          cy.mount(PSelect, {
            props: {
              options: manyOptions.slice(0, 9),
            },
          })
          cy.get(toggleButtonClass).click()
          cy.get('.polly-select__search').should('not.exist')
        })
      })

      it('shows search input with exactly 10 options', () => {
        cy.get('@manyOptions').then((manyOptions) => {
          cy.mount(PSelect, {
            props: {
              options: manyOptions.slice(0, 10),
              required: true,
            },
          })
          cy.get(toggleButtonClass).click()
          cy.get('.polly-select__search').should('exist')
          cy.get('.polly-select__search').type('Option 5')
          cy.get(optionClass).should('have.length', 1)
          cy.get(optionClass).should('contain.text', 'Option 5')
        })
      })

      it('shows search input with more than 10 options', () => {
        cy.get('@manyOptions').then((manyOptions) => {
          cy.mount(PSelect, {
            props: {
              options: manyOptions,
              required: true,
            },
          })
          cy.get(toggleButtonClass).click()
          cy.get('.polly-select__search').should('exist')
          cy.get('.polly-select__search').type('Option 5')
          cy.get(optionClass).should('have.length', 1)
          cy.get(optionClass).should('contain.text', 'Option 5')
        })
      })

      it('shows search input with groups that have more than 10 options', () => {
        cy.get('@groupedOptionsWithManyOptions').then((groupedOptionsWithManyOptions) => {
          cy.mount(PSelect, {
            props: {
              options: groupedOptionsWithManyOptions,
              required: true,
            },
          })
          cy.get(toggleButtonClass).click()
          cy.get(searchInputClass).should('exist')
          cy.get(searchInputClass).type('Option 1.5')
          cy.get(optionClass).should('have.length', 1)
          cy.get(optionClass).should('contain.text', 'Option 1.5')
        })
      })
    })

    it('clears filter value when select is closed and reopened', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            filter: true,
            required: true,
          },
        })

        cy.get(toggleButtonClass).click()
        cy.get(searchInputClass).type('Option 2')
        cy.get(optionClass).should('have.length', 1)

        cy.get(toggleButtonClass).click()
        cy.get(optionsClass).should('not.be.visible')

        cy.get(toggleButtonClass).click()
        cy.get(searchInputClass).find('input').should('have.value', '')
        cy.get(optionClass).should('have.length', sampleOptions.length)
      })
    })

    it('clears filter value when option is selected', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            filter: true,
            required: true,
          },
        })

        cy.get(toggleButtonClass).click()
        cy.get(searchInputClass).type('Option 2')
        cy.get(optionClass).should('have.length', 1)

        cy.get(optionClass).first().click()
        cy.get(optionsClass).should('not.be.visible')

        cy.get(toggleButtonClass).click()
        cy.get(searchInputClass).find('input').should('have.value', '')
        cy.get(optionClass).should('have.length', sampleOptions.length)
      })
    })
  })

  describe('No Selection Option', () => {
    it('renders "No Selection" option in single select mode when not required', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: false,
            modelValue: '1',
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().should('contain.text', 'No Selection')
      })
    })

    it('does not render "No Selection" option in single select mode when required', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: false,
            required: true,
            modelValue: '1',
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().should('not.contain.text', 'No Selection')
        cy.get(optionClass).first().should('contain.text', 'Option 1')
      })
    })

    it('does not render "No Selection" option in multiple select mode', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: true,
            modelValue: [],
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).should('not.contain.text', 'No Selection')
      })
    })

    it('clears selection when "No Selection" is clicked', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: false,
            modelValue: '2',
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(controlClass).should('contain.text', 'Option 2')
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().should('contain.text', 'No Selection')
        cy.get(optionClass).first().click()
        cy.get('@updateSpy').should('have.been.calledWith', null)
      })
    })

    it('closes options after selecting "No Selection"', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: false,
            modelValue: '1',
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().click()
        cy.get('.polly-popover-content').should('not.be.visible')
      })
    })

    it('shows placeholder when no selection is made', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: false,
            modelValue: null,
            placeholder: 'Choose an option',
          },
        })
        cy.get(placeholderClass).should('contain.text', 'Choose an option')
      })
    })

    it('allows selecting an option after clearing with "No Selection"', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            multiple: false,
            modelValue: '1',
            'onUpdate:modelValue': cy.spy().as('updateSpy'),
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().click()
        cy.get('@updateSpy').should('have.been.calledWith', null)

        cy.get(toggleButtonClass).click()
        cy.get(optionClass).eq(1).click()
        cy.get('@updateSpy').should('have.been.calledWith', '1')
      })
    })

    it('renders "No Selection" option with grouped options', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            multiple: false,
            modelValue: '1.1',
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().should('contain.text', 'No Selection')
      })
    })

    it('does not render "No Selection" option with grouped options when required', () => {
      cy.get('@groupedOptions').then((groupedOptions) => {
        cy.mount(PSelect, {
          props: {
            options: groupedOptions,
            multiple: false,
            required: true,
            modelValue: '1.1',
          },
        })
        cy.get(toggleButtonClass).click()
        cy.get(optionClass).first().should('not.contain.text', 'No Selection')
      })
    })
  })

  describe('Validation', () => {
    it('updates aria-invalid reactively when state prop changes', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(
          createStateWrapper(PSelect, {
            options: sampleOptions,
            label: 'Select Option',
          })
        )

        cy.get(controlClass).should('have.attr', 'aria-invalid', 'false')

        cy.get('.toggle-state').click()
        cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')

        cy.get('.toggle-state').click()
        cy.get(controlClass).should('have.attr', 'aria-invalid', 'false')
      })
    })

    it('shows errored state styling', () => {
      cy.get('@sampleOptions').then((sampleOptions) => {
        cy.mount(PSelect, {
          props: {
            options: sampleOptions,
            state: 'errored',
            message: 'Please select an option',
          },
        })

        cy.get(controlClass).should('have.attr', 'aria-invalid', 'true')
        cy.get(baseClass).should('contain.text', 'Please select an option')
      })
    })
  })
})
