import PAccessoryPanel from '@/components/accessoryPanel/PAccessoryPanel.vue'
import { createUnitValue } from '@/utilities'

const baseClass = '.polly-accessory-panel'
const backdropClass = '.polly-accessory-panel__backdrop'

describe('PAccessoryPanel', () => {
  const createContainer = () => {
    const container = document.createElement('div')
    container.style.position = 'relative'
    container.style.width = '100%'
    container.style.height = '600px'
    container.style.overflow = 'auto'

    cy.document().then((doc) => {
      doc.body.appendChild(container)
    })

    return container
  }

  it('renders basic panel with content', () => {
    const container = createContainer()
    cy.mount(PAccessoryPanel, {
      props: {
        container,
      },
      slots: {
        default: 'Panel Content',
      },
    })
    cy.get(baseClass).should('exist')
    cy.get(baseClass).should('contain.text', 'Panel Content')
  })

  it('renders footer when footer slot is provided', () => {
    const container = createContainer()
    cy.mount(PAccessoryPanel, {
      props: {
        container,
      },
      slots: {
        default: 'Panel Content',
        footer: 'Footer Content',
      },
    })
    cy.get(`${baseClass}__footer`).should('exist')
    cy.get(`${baseClass}__footer`).should('contain.text', 'Footer Content')
  })

  it('handles initial width prop correctly', () => {
    const container = createContainer()
    const initialWidth = createUnitValue(400, 'px')
    cy.mount(PAccessoryPanel, {
      props: {
        container,
        initialWidth,
      },
    })
    cy.get(baseClass).should('have.css', 'width', '400px')
  })

  it('sets correct width on desktop (80vw)', () => {
    const container = createContainer()
    container.style.width = '1280px'

    cy.mount(PAccessoryPanel, {
      props: {
        container,
      },
      slots: {
        default: 'Panel Content',
      },
    }).then(({ wrapper }) => {
      cy.wrap(wrapper).as('wrapper')
    })

    cy.get('@wrapper').invoke('setProps', { expanded: true })

    cy.get(baseClass).should('have.css', 'width', '1024px')
  })

  it('sets correct width on laptop (100vw)', () => {
    const container = createContainer()
    container.style.width = '1024px'

    cy.mount(PAccessoryPanel, {
      props: {
        container,
      },
      slots: {
        default: 'Panel Content',
      },
    }).then(({ wrapper }) => {
      cy.wrap(wrapper).as('wrapper')
    })

    cy.get('@wrapper').invoke('setProps', { expanded: true })

    cy.get(baseClass).should('have.css', 'width', '1024px')
  })

  it('responds to ESC key to collapse panel', () => {
    const container = createContainer()
    cy.mount(PAccessoryPanel, {
      props: {
        container,
        expanded: true,
      },
    })

    cy.get('body').type('{esc}')
    cy.get(baseClass).should('not.have.class', 'polly-accessory-panel--expanded')
  })

  it('exposes slot props correctly', () => {
    const container = createContainer()
    cy.mount(PAccessoryPanel, {
      props: {
        container,
        expanded: false,
      },
      slots: {
        default: `
          <button class="expand-btn" @click="expand">Expand</button>
          <button class="close-btn" @click="close">Close</button>
          <button class="open-btn" @click="open">Open</button>
        `,
      },
    })

    // Test expand function
    cy.get('.expand-btn').click({ force: true })
    cy.get(baseClass).should('have.class', 'polly-accessory-panel--expanded')

    // Test close function
    cy.get('.close-btn').click({ force: true })
    cy.get(baseClass).should('not.have.class', 'polly-accessory-panel--expanded')

    // Test open function
    cy.get('.open-btn').click({ force: true })
    cy.get(baseClass).should('have.class', 'polly-accessory-panel--expanded')
  })

  it('shows backdrop when expanded', () => {
    const container = createContainer()
    cy.mount(PAccessoryPanel, {
      props: {
        container,
        expanded: true,
      },
    })
    cy.get(backdropClass).should('have.class', 'polly-accessory-panel__backdrop--visible')
  })

  // Test responsive behavior
  it('adapts to mobile viewport', () => {
    const container = createContainer()
    cy.useMobileViewport()
    cy.mount(PAccessoryPanel, {
      props: {
        container,
      },
    })
    cy.get(baseClass).should('have.css', 'position', 'relative')
    cy.get(backdropClass).should('have.css', 'display', 'none')
  })
})
