import { h } from 'vue'
import { createMemoryHistory, createRouter, Router } from 'vue-router'

import { Crumb } from '@/types'

import PBreadCrumbs from '@/components/breadCrumbs/PBreadCrumbs.vue'

const baseClass = '.polly-bread-crumbs'
const listClass = '.polly-bread-crumbs__list'
const itemClass = '.polly-bread-crumbs__list-item'
const crumbClass = '.polly-bread-crumbs__crumb'
const dividerClass = '.polly-bread-crumbs__divider'

const createTestRouter = () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'Home', component: () => h(null) },
      { path: '/products', name: 'Products', component: () => h(null) },
      { path: '/products/:id', name: 'ProductDetails', component: () => h(null) },
    ],
  })
  return router
}

describe('PBreadCrumbs', () => {
  let router: Router

  beforeEach(() => {
    router = createTestRouter()
  })

  it('renders basic breadcrumbs with string array', () => {
    const crumbs = ['Home', 'Category', 'Product']

    cy.mount(PBreadCrumbs, {
      props: {
        crumbs,
      },
      router,
    }).then(() => {
      cy.get(baseClass).should('exist')
      cy.get(itemClass).should('have.length', 3)
      cy.get(dividerClass).should('have.length', 2)
      crumbs.forEach((crumb) => {
        cy.get(crumbClass).contains(crumb)
      })
    })
  })

  it('renders breadcrumbs with complex objects', () => {
    const crumbs: Crumb[] = [{ label: 'Home', path: '/', icon: 'home' }, { label: 'Products', path: '/products' }, { label: 'Details' }]

    cy.mount(PBreadCrumbs, {
      props: {
        crumbs,
      },
      router,
    }).then(() => {
      cy.get(itemClass).should('have.length', 3)
      cy.get(`${itemClass}:first-child .polly-icon`).should('exist')
      cy.get(`${itemClass}:first-child ${crumbClass}`).should('have.class', 'polly-bread-crumbs__crumb--link')
      cy.get(`${itemClass}:last-child`).should('have.attr', 'aria-current', 'true')
    })
  })

  it('handles router links correctly', () => {
    const crumbs: Crumb[] = [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
    ]

    cy.mount(PBreadCrumbs, {
      props: {
        crumbs,
      },
      router,
    }).then(() => {
      cy.get('.polly-bread-crumbs__crumb').should('have.length', 2)
    })
  })

  it('renders non-link items as spans', () => {
    const crumbs: Crumb[] = [{ label: 'Home', path: '/' }, { label: 'Current Page' }]

    cy.mount(PBreadCrumbs, {
      props: {
        crumbs,
      },
      router,
    }).then(() => {
      cy.get('.polly-bread-crumbs__crumb').should('have.length', 2)
      cy.get(`${itemClass}:last-child span`).should('exist').and('have.textTrimmed', 'Current Page')
    })
  })

  it('supports custom slots for crumb content', () => {
    const crumbs: Crumb[] = [{ label: 'custom-home', path: '/' }, { label: 'custom-page' }]

    cy.mount(PBreadCrumbs, {
      props: {
        crumbs,
      },
      router,
      slots: {
        'custom-home': '<div class="custom-home">Home Custom</div>',
        'custom-page': '<div class="custom-page">Page Custom</div>',
      },
    }).then(() => {
      cy.get('.custom-home').should('exist').and('have.text', 'Home Custom')
      cy.get('.custom-page').should('exist').and('have.text', 'Page Custom')
    })
  })

  it('renders icons with correct props', () => {
    const crumbs: Crumb[] = [
      { label: 'Home', icon: 'home', size: 'sm' },
      { label: 'Products', icon: 'box', size: 'xs' },
    ]

    cy.mount(PBreadCrumbs, {
      props: {
        crumbs,
      },
      router,
    }).then(() => {
      cy.get(`${itemClass}:first-child .polly-icon`).should('have.class', 'fa-home').and('have.class', 'polly-icon--sm')
      cy.get(`${itemClass}:last-child .polly-icon`).should('have.class', 'fa-box').and('have.class', 'polly-icon--xs')
    })
  })

  it('maintains proper styling and layout', () => {
    cy.mount(PBreadCrumbs, {
      props: {
        crumbs: ['Home', 'Page'],
      },
      router,
    }).then(() => {
      cy.get(listClass).should('have.css', 'display', 'flex').should('have.css', 'align-items', 'center')
      cy.get(dividerClass).should('have.class', 'fa-chevron-right').and('have.class', 'polly-icon--xs')
    })
  })

  it('applies correct classes to last item', () => {
    const crumbs: Crumb[] = [{ label: 'Home', path: '/' }, { label: 'Current' }]

    cy.mount(PBreadCrumbs, {
      props: {
        crumbs,
      },
      router,
    }).then(() => {
      cy.get(`${itemClass}:last-child`).should('have.attr', 'aria-current', 'true').find(crumbClass).should('have.class', 'polly-bread-crumbs__crumb--last')
    })
  })

  it('handles empty or single crumb arrays', () => {
    // Empty array
    cy.mount(PBreadCrumbs, {
      props: {
        crumbs: [],
      },
      router,
    }).then(() => {
      cy.get(itemClass).should('have.length', 0)
      cy.get(dividerClass).should('have.length', 0)
    })

    // Single crumb
    cy.mount(PBreadCrumbs, {
      props: {
        crumbs: ['Home'],
      },
      router,
    }).then(() => {
      cy.get(itemClass).should('have.length', 1)
      cy.get(dividerClass).should('have.length', 0)
    })
  })
})
