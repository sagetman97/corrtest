import { h } from 'vue'

import POverflow from '@/components/overflow/POverflow.vue'

const baseClass = '.polly-overflow'
const overflowClass = '.polly-overflow__overflow'
const removedClass = 'polly-overflow__item--removed'

describe('POverflow', () => {
  describe('Basic Rendering', () => {
    it('renders base component', () => {
      cy.mount(POverflow)
      cy.get(baseClass).should('exist')
      cy.get(overflowClass).should('exist')
    })

    it('renders default slot content', () => {
      cy.mount(POverflow, {
        slots: {
          default: () => [h('div', { class: 'test-item' }, 'Item 1'), h('div', { class: 'test-item' }, 'Item 2')],
        },
      })
      cy.get('.test-item').should('have.length', 2)
    })

    it('renders overflow slot with correct count', () => {
      cy.mount(POverflow, {
        slots: {
          default: () => Array.from({ length: 5 }, (_, i) => h('div', { style: 'min-width: 100px' }, `Item ${i + 1}`)),
          overflow: ({ count }) => h('div', { class: 'overflow-counter' }, `+${count}`),
        },
      })

      cy.viewport(300, 500)
      cy.get('.overflow-counter').should('exist')
    })
  })

  describe('Overflow Behavior', () => {
    beforeEach(() => {
      cy.viewport(400, 500)
    })

    it('hides items that overflow container width', () => {
      cy.mount(POverflow, {
        slots: {
          default: () => Array.from({ length: 10 }, (_, i) => h('div', { class: 'item', style: 'min-width: 100px' }, `Item ${i + 1}`)),
          overflow: ({ count }) => `+${count}`,
        },
      })

      cy.get('.item').should('exist')
      cy.get(`.item.${removedClass}`).should('exist')
    })

    it('updates overflow count when container resizes', () => {
      cy.mount(POverflow, {
        slots: {
          default: () => Array.from({ length: 10 }, (_, i) => h('div', { class: 'item', style: 'min-width: 100px' }, `Item ${i + 1}`)),
          overflow: ({ count }) => h('div', { class: 'count' }, `+${count}`),
        },
      })

      cy.get('.count')
        .should('exist')
        .then(($count) => {
          const initialCount = $count.text()
          cy.viewport(600, 500)
          cy.get('.count').should('not.have.text', initialCount)
        })
    })

    it('handles dynamic content updates', () => {
      cy.mount(POverflow, {
        slots: {
          default: () => h('div', { class: 'item', style: 'min-width: 100px' }, 'Item 1'),
          overflow: ({ count }) => h('div', { class: 'count' }, `+${count}`),
        },
      })

      cy.get('.item').should('exist')
      cy.get('.count').should('not.be.visible')

      cy.get(baseClass).then(($el) => {
        for (let i = 2; i <= 5; i++) {
          const newItem = document.createElement('div')
          newItem.className = 'item'
          newItem.style.minWidth = '100px'
          newItem.textContent = `Item ${i}`
          $el[0].insertBefore(newItem, $el[0].querySelector(overflowClass))
        }
      })

      cy.get('.count').should('be.visible')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty content gracefully', () => {
      cy.mount(POverflow, {
        slots: {
          overflow: ({ count }) => `+${count}`,
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(overflowClass).should('exist')
    })

    it('handles single item that fits container', () => {
      cy.mount(POverflow, {
        slots: {
          default: () => h('div', { class: 'item', style: 'width: 50px' }, 'Item'),
          overflow: ({ count }) => `+${count}`,
        },
      })
      cy.get('.item').should('be.visible')
      cy.get('.item').should('not.have.class', removedClass)
    })

    it('handles extremely long items', () => {
      cy.mount(POverflow, {
        slots: {
          default: () =>
            Array.from({ length: 10 }, (_, i) =>
              h(
                'div',
                {
                  class: 'item',
                  id: `item-${i + 1}`,
                  style: 'min-width: 1000px',
                },
                `Item ${i + 1}`
              )
            ),
          overflow: ({ count }) => `+${count}`,
        },
      })
      cy.get('#item-1').should('not.have.class', removedClass)
      cy.get('#item-2').should('have.class', removedClass)
    })
  })

  describe('Accessibility', () => {
    it('maintains visibility of overflow indicator for screen readers', () => {
      cy.mount(POverflow, {
        slots: {
          default: () => Array.from({ length: 5 }, (_, i) => h('div', { class: 'item', style: 'width: 100px' }, `Item ${i + 1}`)),
          overflow: ({ count }) =>
            h(
              'div',
              {
                class: 'count',
                role: 'status',
              },
              `+${count} more items`
            ),
        },
      })
      cy.get('.count').should('have.attr', 'role', 'status')
    })
  })
})
