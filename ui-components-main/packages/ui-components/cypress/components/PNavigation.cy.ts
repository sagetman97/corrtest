import { createRouter, createWebHistory } from 'vue-router'

import PNavigation from '@/components/navigation/PNavigation.vue'

const barClass = '.polly-navigation-bar'
const asideClass = '.polly-navigation-aside'

describe('PNavigation', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: {} },
      { path: '/about', name: 'about', component: {} },
    ],
  })

  const defaultNavItems = [
    {
      label: 'Home',
      to: '/',
      icon: 'home',
    },
    {
      label: 'About',
      to: '/about',
      icon: 'info',
    },
  ]

  describe('Mobile/Tablet View', () => {
    beforeEach(() => {
      cy.useMobileViewport()
    })

    it('renders navigation bar', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        router,
      })
      cy.get(barClass).should('be.visible')
      cy.get(asideClass).should('exist')
    })

    it('renders logo in navigation bar', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        slots: {
          logo: '<div class="test-logo">Logo</div>',
        },
        router,
      })
      cy.get(`${barClass} .test-logo`).should('be.visible')
      cy.get(`${barClass} .test-logo`).should('contain.text', 'Logo')
    })

    it('renders right slot content in navigation bar', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        slots: {
          right: '<div class="test-right">Right Content</div>',
        },
        router,
      })
      cy.get(`${barClass} .test-right`).should('be.visible')
      cy.get(`${barClass} .test-right`).should('contain.text', 'Right Content')
    })

    it('toggles aside visibility when menu button is clicked', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        router,
      })

      cy.get(asideClass).should('not.have.class', 'polly-navigation-aside--expanded')
      cy.get(`${barClass} .polly-navigation-bar__menu-button`).click()
      cy.get(asideClass).should('have.class', 'polly-navigation-aside--expanded')

      cy.get(asideClass).should('have.class', 'polly-navigation-aside--expanded')
      cy.get(`${barClass} .polly-navigation-bar__menu-button`).click()
      cy.get(asideClass).should('not.have.class', 'polly-navigation-aside--expanded')
    })

    it('collapses navigation on route change', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        router,
      })

      cy.get(`${barClass} .polly-navigation-bar__menu-button`).click()
      cy.get(asideClass).contains('About').click()
      cy.get(asideClass).should('not.have.class', 'polly-navigation-aside--expanded')
    })

    it('handles nested navigation items', () => {
      const nestedNavItems = [
        ...defaultNavItems,
        {
          label: 'Settings',
          icon: 'cog',
          items: [
            { label: 'Profile', to: '/settings/profile' },
            { label: 'Security', to: '/settings/security' },
          ],
        },
      ]

      cy.mount(PNavigation, {
        props: {
          items: nestedNavItems,
        },
        router,
      })
      cy.get(`${barClass} .polly-navigation-bar__menu-button`).click()
      cy.get(asideClass).contains('Settings').should('be.visible')
      cy.get(asideClass).contains('Profile').should('not.be.visible')
      cy.get(asideClass).contains('Security').should('not.be.visible')
      cy.get(asideClass).contains('Settings').click()
      cy.get(asideClass).contains('Profile').should('be.visible')
      cy.get(asideClass).contains('Security').should('be.visible')
    })
  })

  describe('Desktop View', () => {
    beforeEach(() => {
      cy.useDesktopViewport()
    })

    it('does not render navigation bar', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        router,
      })
      cy.get(barClass).should('not.exist')
      cy.get(asideClass).should('be.visible')
    })

    it('renders logo in aside navigation', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        slots: {
          logo: '<div class="test-logo">Logo</div>',
        },
        router,
      })
      cy.get(`${asideClass} .test-logo`).should('be.visible')
      cy.get(`${asideClass} .test-logo`).should('contain.text', 'Logo')
    })

    it('renders navigation items in aside', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        router,
      })
      defaultNavItems.forEach((item) => {
        cy.get(asideClass).should('contain.text', item.label)
      })
    })

    it('renders footer slot content in aside', () => {
      cy.mount(PNavigation, {
        props: {
          items: defaultNavItems,
        },
        slots: {
          footer: '<div class="test-footer">Footer Content</div>',
        },
        router,
      })
      cy.get(`${asideClass} .test-footer`).should('be.visible')
      cy.get(`${asideClass} .test-footer`).should('contain.text', 'Footer Content')
    })

    it('handles nested navigation items', () => {
      const nestedNavItems = [
        ...defaultNavItems,
        {
          label: 'Settings',
          icon: 'cog',
          items: [
            { label: 'Profile', to: '/settings/profile' },
            { label: 'Security', to: '/settings/security' },
          ],
        },
      ]

      cy.mount(PNavigation, {
        props: {
          items: nestedNavItems,
        },
        router,
      })

      cy.get(asideClass).contains('Settings').should('be.visible')
      cy.get(asideClass).contains('Profile').should('not.be.visible')
      cy.get(asideClass).contains('Security').should('not.be.visible')
      cy.get(asideClass).contains('Settings').click()
      cy.get(asideClass).contains('Profile').should('be.visible')
      cy.get(asideClass).contains('Security').should('be.visible')
    })
  })
})
