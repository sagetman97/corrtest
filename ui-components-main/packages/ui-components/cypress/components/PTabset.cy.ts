import PTabset from '@/components/tabset/PTabset.vue'

const baseClass = '.polly-tabset'
const headerClass = '.polly-tabset__header'
const tabClass = '.polly-tabset__tab'
const contentClass = '.polly-tabset__content'
const cursorClass = '.polly-tabset__cursor'

describe('PTabset', () => {
  const sampleTabs = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3', disabled: true },
  ]

  describe('Basic Rendering', () => {
    it('renders basic tabset structure', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
        },
        slots: {
          tab1: 'Content 1',
          tab2: 'Content 2',
          tab3: 'Content 3',
        },
      })

      cy.get(baseClass).should('exist')
      cy.get(headerClass).should('exist')
      cy.get(tabClass).should('have.length', 3)
      cy.get(cursorClass).should('exist')
    })

    it('renders correct tab labels', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
        },
      })

      sampleTabs.forEach((tab) => {
        cy.get(tabClass).contains(tab.label)
      })
    })

    it('shows correct content for selected tab', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
        },
        slots: {
          'tab-1': 'Content 1',
          'tab-2': 'Content 2',
          'tab-3': 'Content 3',
        },
      })

      cy.get(contentClass).contains('Content 1').should('be.visible')
      cy.get(contentClass).contains('Content 2').should('not.be.visible')
    })

    it('supports secondary variant', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
          secondary: true,
        },
      })

      cy.get(baseClass).should('have.class', 'polly-tabset--secondary')
      cy.get(headerClass).should('have.class', 'polly-tabset__header--secondary')
      cy.get(cursorClass).should('have.class', 'polly-tabset__cursor--secondary')
    })
  })

  describe('Tab Selection', () => {
    it('handles tab click', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
          'onUpdate:selected': cy.spy().as('updateSpy'),
        },
      })

      cy.get(tabClass).eq(1).click()
      cy.get('@updateSpy').should('have.been.calledWith', 'tab2')
    })

    it('prevents clicking disabled tabs', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
          'onUpdate:selected': cy.spy().as('updateSpy'),
        },
      })

      cy.get(tabClass).eq(2).click()
      cy.get('@updateSpy').should('not.have.been.called')
    })

    it('applies correct selected state classes', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
        },
      })

      cy.get(tabClass).eq(0).should('have.class', 'polly-tabset__tab--selected')
      cy.get(tabClass).eq(1).should('not.have.class', 'polly-tabset__tab--selected')
    })
  })

  describe('Custom Tab Headers', () => {
    it('renders custom header content', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
        },
        slots: {
          'tab-1-header': '<div class="custom-header">Custom Tab 1</div>',
        },
      })

      cy.get('.custom-header').should('exist')
      cy.get('.custom-header').should('contain', 'Custom Tab 1')
    })
  })

  describe('Tab Counts', () => {
    it('shows count when enabled', () => {
      const tabsWithCount = [
        { label: 'Tab 1', value: 'tab1', count: 5 },
        { label: 'Tab 2', value: 'tab2', count: 10 },
      ]

      cy.mount(PTabset, {
        props: {
          tabs: tabsWithCount,
          selected: 'tab1',
          showCounts: true,
        },
      })

      cy.get(tabClass).eq(0).should('contain', '5')
      cy.get(tabClass).eq(1).should('contain', '10')
    })
  })

  describe('Cursor Animation', () => {
    it('updates cursor position on tab selection', () => {
      cy.mount(PTabset, {
        attrs: {
          style: 'width: 500px;',
        },
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
        },
      })

      // Get initial positions
      cy.get(headerClass).then(($header) => {
        const headerRect = $header[0].getBoundingClientRect()

        cy.get(tabClass)
          .eq(1)
          .then(($tab) => {
            const tabRect = $tab[0].getBoundingClientRect()
            const expectedOffset = tabRect.left - headerRect.left

            // Click second tab
            cy.get(tabClass).eq(1).click()

            // Verify cursor position matches tab position
            cy.get(cursorClass)
              .should('have.css', 'transform')
              .and((transform) => {
                const match = transform.match(/translateX\(([^)]+)\)/)
                if (match) {
                  const cursorOffset = parseFloat(match[1])
                  expect(Math.abs(cursorOffset - expectedOffset)).to.be.lessThan(1)
                }
              })
          })
      })
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      cy.mount(PTabset, {
        props: {
          tabs: sampleTabs,
          selected: 'tab1',
        },
      })

      cy.get(headerClass).should('have.attr', 'role', 'tablist').and('have.attr', 'aria-orientation', 'horizontal')

      cy.get(tabClass).first().should('have.attr', 'role', 'tab').and('have.attr', 'aria-selected', 'true')

      cy.get(contentClass).first().should('have.attr', 'role', 'tabpanel')
    })
  })
})
