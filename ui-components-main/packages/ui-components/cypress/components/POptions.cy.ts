import { SelectOption } from '@/types'

import POptions from '@/components/select/POptions.vue'

const baseClass = '.polly-options'
const optionClass = '.polly-option'
const listboxClass = '.polly-options__container'

describe('POptions', () => {
  const sampleOptions: SelectOption<string>[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Disabled Option', value: '4', disabled: true },
  ]

  describe('Basic Rendering', () => {
    it('renders options list', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(listboxClass).should('exist')
      cy.get(optionClass).should('have.length', 4)
    })

    it('renders with correct ARIA attributes', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      cy.get(listboxClass).should('have.attr', 'role', 'listbox')
      cy.get(listboxClass).should('have.attr', 'tabindex', '0')
    })

    it('does not set tabindex when combobox element is provided', () => {
      const comboboxElement = document.createElement('button')
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })
      cy.get(listboxClass).should('not.have.attr', 'tabindex')
    })
  })

  describe('Selection', () => {
    it('selects option on click', () => {
      const onUpdate = cy.spy().as('updateSpy')
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          'onUpdate:modelValue': onUpdate,
        },
      })
      cy.get(optionClass).first().click()
      cy.get('@updateSpy').should('have.been.calledWith', '1')
    })

    it('does not select disabled options', () => {
      const onUpdate = cy.spy().as('updateSpy')
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          'onUpdate:modelValue': onUpdate,
        },
      })
      cy.get(optionClass).eq(3).click()
      cy.get('@updateSpy').should('not.have.been.called')
    })
  })

  describe('Keyboard Navigation', () => {
    it('navigates down with ArrowDown key', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })
      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.get(optionClass).first().should('have.class', 'polly-option--focused')
    })

    it('navigates up with ArrowUp key', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })
      cy.document().trigger('keydown', { key: 'ArrowUp' })
      cy.get(optionClass).eq(2).should('have.class', 'polly-option--focused')
    })

    it('jumps to first option with Home key', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })
      cy.document().trigger('keydown', { key: 'Home' })
      cy.get(optionClass).first().should('have.class', 'polly-option--focused')
    })

    it('jumps to last enabled option with End key', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })
      cy.document().trigger('keydown', { key: 'End' })
      cy.get(optionClass).eq(2).should('have.class', 'polly-option--focused')
    })

    it('skips disabled options when navigating', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })
      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.get(optionClass).eq(2).should('have.class', 'polly-option--focused')
      cy.get(optionClass).eq(3).should('not.have.class', 'polly-option--focused')
    })

    it('selects focused option with Enter key', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)
      const onUpdate = cy.spy().as('updateSpy')

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
          'onUpdate:modelValue': onUpdate,
        },
      })
      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.document().trigger('keydown', { key: 'Enter' })
      cy.get('@updateSpy').should('have.been.calledWith', '1')
    })

    it('selects focused option with Space key', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)
      const onUpdate = cy.spy().as('updateSpy')

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
          'onUpdate:modelValue': onUpdate,
        },
      })
      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.document().trigger('keydown', { key: ' ' })
      cy.get('@updateSpy').should('have.been.calledWith', '1')
    })

    it('closes options with Escape key', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)
      const onUpdateIsOpen = cy.spy().as('isOpenSpy')

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
          'onUpdate:isOpen': onUpdateIsOpen,
        },
      })
      cy.document().trigger('keydown', { key: 'Escape' })
      cy.get('@isOpenSpy').should('have.been.calledWith', false)
    })
  })

  describe('ARIA Active Descendant', () => {
    it('sets aria-activedescendant on combobox element during keyboard navigation', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })

      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.wrap(comboboxElement).should('have.attr', 'aria-activedescendant')
    })

    it('removes aria-activedescendant when keyboard navigation is reset', () => {
      const comboboxElement = document.createElement('button')
      document.body.appendChild(comboboxElement)

      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
          comboboxElement,
        },
      })

      cy.document().trigger('keydown', { key: 'ArrowDown' })
      cy.wrap(comboboxElement).should('have.attr', 'aria-activedescendant')

      cy.get(optionClass).first().click()
      cy.wrap(comboboxElement).should('not.have.attr', 'aria-activedescendant')
    })
  })

  describe('Typeahead Search', () => {
    it('focuses option matching typed characters', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      cy.get('body').type('opt')
      cy.get(optionClass).first().should('have.class', 'polly-option--focused')
    })
  })

  describe('Option Icons', () => {
    const optionsWithIcons: SelectOption<string>[] = [
      { label: 'Edit', value: 'edit', icon: 'pen-to-square' },
      { label: 'Delete', value: 'delete', icon: 'trash-can', variant: 'destructive' },
    ]

    it('renders Font Awesome icons when option has icon property', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: optionsWithIcons,
          showInputIcons: true,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      cy.get('.polly-option__icon').should('have.length', 2)
      cy.get('.polly-option__icon').first().should('have.class', 'fa-pen-to-square')
      cy.get('.polly-option__icon').last().should('have.class', 'fa-trash-can')
    })

    it('does not render radio buttons when option has icon property', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: optionsWithIcons,
          showInputIcons: true,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      cy.get('.polly-radio').should('not.exist')
    })

    it('renders radio buttons when showInputIcons is true but option has no icon', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: null,
          options: sampleOptions,
          showInputIcons: true,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      cy.get('.polly-radio').should('have.length', 4)
      cy.get('.polly-option__icon').should('not.exist')
    })

    it('renders checkboxes in multiple mode when option has no icon', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: [],
          options: sampleOptions,
          showInputIcons: true,
          multiple: true,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      cy.get('.polly-checkbox').should('exist')
      cy.get('.polly-option__icon').should('not.exist')
    })

    it('renders icons instead of checkboxes in multiple mode when option has icon', () => {
      cy.mount(POptions, {
        props: {
          isOpen: true,
          modelValue: [],
          options: optionsWithIcons,
          showInputIcons: true,
          multiple: true,
          position: () => ({ top: 0, left: 0 }),
        },
      })
      // Should have icons for the options (not counting select all checkbox)
      cy.get('.polly-option__icon').should('have.length', 2)
      cy.get('.polly-option__icon').first().should('have.class', 'fa-pen-to-square')
    })
  })
})
