import PPagination from '@/components/pagination/PPagination.vue'

const baseClass = '.polly-pagination'
const listClass = '.polly-pagination__list'
const pageClass = '.polly-pagination__page'
const pageButtonClass = '.polly-pagination__page-button'
const selectedPageClass = 'polly-pagination__page--selected'
const arrowButtonClass = '.polly-pagination__arrow-button'
const pageSizeClass = '.polly-pagination__page-size'
const ellipsisClass = '.polly-pagination__ellipsis'
const optionClass = '.polly-option'

describe('PPagination', () => {
  describe('Basic Rendering', () => {
    it('renders basic pagination', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(listClass).should('exist')
      cy.get(arrowButtonClass).should('have.length', 2)
    })

    it('renders correct number of visible pages', () => {
      cy.viewport(1200, 800)
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 5,
          pagesShown: 5,
        },
      })
      cy.get(listClass).should('be.visible')
      cy.get(pageButtonClass).should('have.length', 5)
    })

    it('highlights current page', () => {
      const currentPage = 3
      cy.mount(PPagination, {
        props: {
          page: currentPage,
          totalPages: 10,
        },
      })
      cy.get(`${pageClass}.${selectedPageClass}`).should('contain.text', currentPage)
    })
  })

  describe('Navigation', () => {
    it('handles previous page navigation', () => {
      cy.mount(PPagination, {
        props: {
          page: 2,
          totalPages: 10,
          'onUpdate:page': cy.spy().as('updatePage'),
        },
      })
      cy.get(arrowButtonClass).first().click()
      cy.get('@updatePage').should('have.been.calledWith', 1)
    })

    it('handles next page navigation', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
          'onUpdate:page': cy.spy().as('updatePage'),
        },
      })
      cy.get(arrowButtonClass).last().click()
      cy.get('@updatePage').should('have.been.calledWith', 2)
    })

    it('disables previous button on first page', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
        },
      })
      cy.get(arrowButtonClass).first().should('have.attr', 'aria-disabled', 'true')
    })

    it('disables next button on last page', () => {
      cy.mount(PPagination, {
        props: {
          page: 10,
          totalPages: 10,
        },
      })
      cy.get(arrowButtonClass).last().should('have.attr', 'aria-disabled', 'true')
    })

    it('allows direct page selection', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
          'onUpdate:page': cy.spy().as('updatePage'),
        },
      })
      cy.get(pageClass).contains('3').click()
      cy.get('@updatePage').should('have.been.calledWith', 3)
    })
  })

  describe('Page Size Selector', () => {
    it('renders page size selector when enabled', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
          showPageSize: true,
          pageSize: 25,
        },
      })
      cy.get(pageSizeClass).should('exist')
    })

    it('handles page size changes', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
          showPageSize: true,
          pageSize: 25,
          'onUpdate:pageSize': cy.spy().as('updatePageSize'),
        },
      })
      cy.get(pageSizeClass).click()
      cy.get(optionClass).contains('50').click()
      cy.get('@updatePageSize').should('have.been.calledWith', 50)
    })

    it('uses custom page size options', () => {
      const customSizes = [10, 20, 30]
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
          showPageSize: true,
          pageSizes: customSizes,
          pageSize: 10,
        },
      })
      cy.get(pageSizeClass).click()
      customSizes.forEach((size) => {
        cy.get(optionClass).contains(size.toString()).should('exist')
      })
    })
  })

  describe('Ellipsis Behavior', () => {
    it('shows ellipsis for large page ranges', () => {
      cy.mount(PPagination, {
        props: {
          page: 5,
          totalPages: 20,
          pagesShown: 5,
        },
      })
      cy.get(ellipsisClass).should('exist')
    })

    it('handles ellipsis navigation', () => {
      cy.mount(PPagination, {
        props: {
          page: 5,
          totalPages: 20,
          pagesShown: 5,
          'onUpdate:page': cy.spy().as('updatePage'),
        },
      })
      cy.get(ellipsisClass).should('have.length', 2)
      cy.get(ellipsisClass).first().click()
      cy.get(ellipsisClass).should('have.length', 1)
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA labels', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 10,
        },
      })
      cy.get(baseClass).should('have.attr', 'role', 'navigation')
      cy.get(baseClass).should('have.attr', 'aria-label', 'Pagination Navigation')
    })

    it('has correct ARIA current page', () => {
      cy.mount(PPagination, {
        props: {
          page: 3,
          totalPages: 10,
        },
      })
      cy.get(pageClass).contains('3').should('have.attr', 'aria-current', 'true')
    })

    it('has accessible navigation buttons', () => {
      cy.mount(PPagination, {
        props: {
          page: 2,
          totalPages: 10,
        },
      })
      cy.get(arrowButtonClass).first().should('have.attr', 'aria-label', 'Goto Previous Page')
      cy.get(arrowButtonClass).last().should('have.attr', 'aria-label', 'Goto Next Page')
    })
  })

  describe('Edge Cases', () => {
    it('handles single page', () => {
      cy.mount(PPagination, {
        props: {
          page: 1,
          totalPages: 1,
        },
      })
      cy.get(arrowButtonClass).should('have.attr', 'aria-disabled', 'true')
      cy.get(pageClass).should('have.length', 1)
    })

    it('handles custom start page', () => {
      cy.mount(PPagination, {
        props: {
          page: 2,
          totalPages: 10,
          start: 2,
        },
      })
      cy.get(pageClass).first().should('contain.text', '2')
    })

    it('adjusts visible pages based on container width', () => {
      cy.viewport(400, 800) // Set a narrow viewport
      cy.mount(PPagination, {
        props: {
          page: 5,
          totalPages: 20,
        },
      })
      // Should show fewer pages due to space constraints
      cy.get(pageClass).should('have.length.lessThan', 20)
    })
  })
})
