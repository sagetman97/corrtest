import { h } from 'vue'

import PVirtualScroller from '@/components/virtualScroller/PVirtualScroller.vue'
import { createUnitValue } from '@/utilities'

const baseClass = '.polly-virtual-scroller'
const chunkClass = '.polly-virtual-scroller__chunk'
const bottomClass = '.polly-virtual-scroller__bottom'

type Item = {
  id: number
  text: string
}

describe('PVirtualScroller', () => {
  describe('Basic Rendering', () => {
    const items: Item[] = Array.from({ length: 100 }, (_, i) => ({ id: i, text: `Item ${i}` }))

    it('renders virtual scroller with items', () => {
      cy.mount(PVirtualScroller, {
        props: {
          items,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 50,
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
      })

      cy.get(baseClass).should('exist')
      cy.get(chunkClass).should('exist')
      cy.get(bottomClass).should('exist')
    })

    it('renders correct number of chunks based on chunkSize', () => {
      cy.mount(PVirtualScroller, {
        props: {
          items,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 25,
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
      })

      // With 100 items and chunk size of 25, should have 4 chunks
      cy.get(chunkClass).should('have.length', 4)
    })
  })

  describe('Scrolling Behavior', () => {
    const items = Array.from({ length: 200 }, (_, i) => ({ id: i, text: `Item ${i}` }))

    it('emits scroll event when scrolling', () => {
      cy.mount(PVirtualScroller, {
        props: {
          items,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 50,
          onScroll: cy.spy().as('scrollSpy'),
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
        attrs: {
          style: 'height: 300px; max-height: 300px;', // Add fixed height to make scrollable
        },
      })

      cy.get('@scrollSpy').should('not.have.been.called')
      cy.get(baseClass).scrollTo(0, 100)
      cy.get('@scrollSpy').should('have.been.called')
    })

    it('emits top event when scrolling to top', () => {
      cy.mount(PVirtualScroller, {
        props: {
          items,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 50,
          onTop: cy.spy().as('topSpy'),
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
        attrs: {
          style: 'height: 300px; max-height: 300px;',
        },
      })

      cy.get(baseClass).scrollTo(0, 100)
      cy.get(baseClass).scrollTo(0, 0)
      cy.wait(100)
      cy.get('@topSpy').should('have.been.called')
    })

    it('emits bottom event when reaching bottom', () => {
      cy.mount(PVirtualScroller, {
        props: {
          items,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 50,
          onBottom: cy.spy().as('bottomSpy'),
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
        attrs: {
          style: 'height: 300px; max-height: 300px;',
        },
      })

      cy.get(baseClass).scrollTo('bottom')
      cy.wait(100)
      cy.get('@bottomSpy').should('have.been.called')
    })
  })

  describe('Dynamic Updates', () => {
    it('updates chunks when items change', () => {
      const initialItems = Array.from({ length: 50 }, (_, i) => ({ id: i, text: `Item ${i}` }))

      cy.mount(PVirtualScroller, {
        props: {
          items: initialItems,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 25,
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
      })

      cy.get(chunkClass).should('have.length', 2)

      const newItems = Array.from({ length: 100 }, (_, i) => ({ id: i, text: `Item ${i}` }))
      cy.mount(PVirtualScroller, {
        props: {
          items: newItems,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 25,
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
      })

      cy.get(chunkClass).should('have.length', 4)
    })
  })

  describe('Loading State', () => {
    it('emits loaded event when content is mounted', () => {
      const items = Array.from({ length: 50 }, (_, i) => ({ id: i, text: `Item ${i}` }))

      cy.mount(PVirtualScroller, {
        props: {
          items,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 25,
          onLoaded: cy.spy().as('loadedSpy'),
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
      })

      cy.get('@loadedSpy').should('have.been.called')
      cy.get('@loadedSpy').should((spy) => {
        expect(spy.firstCall.args[0]).to.have.property('containerElement')
        expect(spy.firstCall.args[0]).to.have.property('scrollTo')
      })
    })
  })

  describe('Custom Observer Options', () => {
    it('accepts custom intersection observer options', () => {
      const items = Array.from({ length: 50 }, (_, i) => ({ id: i, text: `Item ${i}` }))
      const customOptions = { rootMargin: '100px' }

      cy.mount(PVirtualScroller, {
        props: {
          items,
          itemKey: (item: Item) => `item-${item.id}`,
          itemEstimateHeight: createUnitValue(50, 'px'),
          chunkSize: 25,
          observerOptions: customOptions,
        },
        slots: {
          default: ({ item }) => h('div', item.text),
        },
      })

      cy.get(baseClass).should('exist')
    })
  })
})
