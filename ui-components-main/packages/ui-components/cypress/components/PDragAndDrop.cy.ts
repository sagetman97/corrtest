import PDragAndDrop from '@/components/dragAndDrop/PDragAndDrop.vue'

describe('PDragAndDrop', () => {
  const itemClass = '.polly-drag-and-drop__item'

  it('renders with default items', () => {
    cy.mount(PDragAndDrop, {
      props: {
        items: ['Item 1', 'Item 2', 'Item 3'],
      },
    })

    cy.get(itemClass).should('have.length', 3)
    cy.get(itemClass).eq(0).should('contain.text', 'Item 1')
    cy.get(itemClass).eq(1).should('contain.text', 'Item 2')
    cy.get(itemClass).eq(2).should('contain.text', 'Item 3')
  })

  it('renders with custom slot content', () => {
    cy.mount(PDragAndDrop, {
      props: {
        items: [
          { id: 1, text: 'First' },
          { id: 2, text: 'Second' },
        ],
      },
      slots: {
        default: `<template #default="{ item }">
          <div data-cy="custom-item">{{ item.text }}</div>
        </template>`,
      },
    })

    cy.get('[data-cy=custom-item]').should('have.length', 2)
    cy.get('[data-cy=custom-item]').eq(0).should('contain.text', 'First')
    cy.get('[data-cy=custom-item]').eq(1).should('contain.text', 'Second')
  })

  it('reorders items on drag and drop', () => {
    cy.mount(PDragAndDrop, {
      props: {
        items: ['Item 1', 'Item 2', 'Item 3'],
      },
    })

    // Simulate drag from first item to third position
    cy.get(itemClass).eq(0).as('firstItem')
    cy.get(itemClass).eq(2).as('thirdItem')

    cy.get('@firstItem').trigger('dragstart')
    cy.get('@thirdItem').trigger('dragover')
    cy.get('@thirdItem').trigger('drop')

    // Check the new order
    cy.get(itemClass).eq(0).should('contain.text', 'Item 2')
    cy.get(itemClass).eq(1).should('contain.text', 'Item 3')
    cy.get(itemClass).eq(2).should('contain.text', 'Item 1')
  })

  it('reorders complex objects correctly', () => {
    const items = [
      { id: 1, name: 'First item' },
      { id: 2, name: 'Second item' },
      { id: 3, name: 'Third item' },
    ]

    cy.mount(PDragAndDrop, {
      props: {
        items: items,
      },
      slots: {
        default: `<template #default="{ item }">
          <div data-cy="item-name">{{ item.name }}</div>
        </template>`,
      },
    })

    // Drag second item to first position
    cy.get(itemClass).eq(1).as('secondItem')
    cy.get(itemClass).eq(0).as('firstItem')

    cy.get('@secondItem').trigger('dragstart')
    cy.get('@firstItem').trigger('dragover')
    cy.get('@firstItem').trigger('drop')

    // Check the new order
    cy.get('[data-cy=item-name]').eq(0).should('contain.text', 'Second item')
    cy.get('[data-cy=item-name]').eq(1).should('contain.text', 'First item')
    cy.get('[data-cy=item-name]').eq(2).should('contain.text', 'Third item')
  })

  it('has the correct styling for draggable items', () => {
    cy.mount(PDragAndDrop, {
      props: {
        items: ['Item 1', 'Item 2'],
      },
    })

    cy.get(itemClass).should('have.css', 'cursor', 'grab')
    cy.get(itemClass).should('have.attr', 'draggable', 'true')
  })
})
