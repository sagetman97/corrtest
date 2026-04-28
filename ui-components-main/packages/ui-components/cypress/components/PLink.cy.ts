import { h } from 'vue'
import { createMemoryHistory, createRouter, Router } from 'vue-router'

import PLink from '@/components/link/PLink.vue'

const baseClass = '.polly-link'
const iconClass = '.polly-link__icon'

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

describe('PLink', () => {
  let router: Router

  beforeEach(() => {
    router = createTestRouter()
  })

  describe('Basic Rendering', () => {
    it('renders basic link with content', () => {
      cy.mount(PLink, {
        slots: {
          default: 'Link Text',
        },
      })
      cy.get(baseClass).should('exist').and('contain.text', 'Link Text')
    })

    it('renders as anchor tag by default', () => {
      cy.mount(PLink)
      cy.get(`${baseClass}`).should('match', 'a')
    })
  })

  describe('External Links', () => {
    it('renders external link with correct attributes', () => {
      cy.mount(PLink, {
        props: {
          to: 'https://example.com',
        },
        slots: {
          default: 'External Link',
        },
      })
      cy.get(baseClass).should('have.attr', 'href', 'https://example.com').and('have.attr', 'target', '_blank').and('have.attr', 'rel', 'noopener noreferrer')
    })

    it('automatically adds external link icon', () => {
      cy.mount(PLink, {
        props: {
          to: 'https://example.com',
        },
      })
      cy.get(iconClass).should('have.class', 'fa-external-link')
    })
  })

  describe('Internal Router Links', () => {
    it('renders as router-link for internal paths', () => {
      cy.mount(PLink, {
        props: {
          to: '/internal-path',
        },
        router,
      })
      cy.get(baseClass).should('match', 'a') // router-link renders as <a>
      cy.get(baseClass).should('not.have.attr', 'target')
      cy.get(baseClass).should('not.have.attr', 'rel')
    })
  })

  describe('Download Links', () => {
    it('shows download icon when download prop is true', () => {
      cy.mount(PLink, {
        props: {
          download: true,
          to: '/download-file',
        },
      })
      cy.get(iconClass).should('have.class', 'fa-download')
    })
  })

  describe('Custom Icons', () => {
    it('renders custom icon when provided', () => {
      cy.mount(PLink, {
        props: {
          icon: 'star',
        },
      })
      cy.get(iconClass).should('have.class', 'fa-star')
    })

    it('applies custom icon styles', () => {
      cy.mount(PLink, {
        props: {
          icon: 'star',
          faStyle: 'light',
          size: 'lg',
        },
      })
      cy.get(iconClass).should('have.class', 'fa-light').and('have.class', 'fa-star')
    })
  })

  describe('Disabled State', () => {
    it('prevents click when disabled', () => {
      cy.mount(PLink, {
        props: {
          disabled: true,
          onClick: cy.spy().as('onClick'),
        },
        slots: {
          default: 'Disabled Link',
        },
      })
      cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
      cy.get(baseClass).should('have.attr', 'tabindex', '-1').click()
      cy.get('@onClick').should('not.have.been.called')
    })

    it('applies disabled styling', () => {
      cy.mount(PLink, {
        props: {
          disabled: true,
        },
      })
      cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
    })
  })

  describe('Accessibility', () => {
    it('maintains focus outline on focus-visible', () => {
      cy.mount(PLink, {
        slots: {
          default: 'Focusable Link',
        },
      })
      cy.get(baseClass).focus()
      cy.get(baseClass).should('have.css', 'outline-color')
    })

    it('sets correct tabindex', () => {
      cy.mount(PLink)
      cy.get(baseClass).should('have.attr', 'tabindex', '0')
    })
  })

  describe('Visual Styling', () => {
    it('applies base styling', () => {
      cy.mount(PLink, {
        slots: {
          default: 'Styled Link',
        },
      })
      cy.get(baseClass).should('have.css', 'cursor', 'pointer')
    })

    it('maintains proper alignment with icon', () => {
      cy.mount(PLink, {
        props: {
          icon: 'star',
        },
        slots: {
          default: 'Icon Link',
        },
      })
      cy.get(baseClass).should('have.css', 'display', 'inline-flex')
      cy.get(baseClass).should('have.css', 'align-items', 'baseline')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty content gracefully', () => {
      cy.mount(PLink)
      cy.get(baseClass).should('exist')
    })

    it('handles long content without breaking layout', () => {
      cy.mount(PLink, {
        slots: {
          default: 'This is a very long link text that could potentially cause layout issues if not handled properly',
        },
      })
      cy.get(baseClass).should('exist')
    })
  })
})
