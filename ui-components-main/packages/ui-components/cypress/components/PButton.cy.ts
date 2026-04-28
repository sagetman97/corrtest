import { ButtonProps } from '@/types'

import PButton from '@/components/button/PButton.vue'

const baseClass = '.polly-button'

describe('PButton', () => {
  it('renders basic button with text', () => {
    cy.mount(PButton, {
      slots: {
        default: 'Click me',
      },
    })
    cy.get(baseClass).should('exist').and('contain.text', 'Click me')
  })

  it('supports different variants', () => {
    const variants: ButtonProps['variant'][] = ['primary', 'accent', 'error', 'ai']

    variants.forEach((variant) => {
      cy.mount(PButton, {
        props: { variant },
        slots: { default: variant },
      })
      cy.get(`${baseClass}--${variant}`).should('exist')
    })
  })

  it('handles disabled state', () => {
    cy.mount(PButton, {
      props: { disabled: true },
      slots: { default: 'Disabled Button' },
    })
    cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
  })

  it('shows loading state', () => {
    cy.mount(PButton, {
      props: {
        isLoading: true,
        loadingText: 'Loading...',
      },
    })
    cy.get(baseClass).should('contain.text', 'Loading...').find('.polly-icon').should('exist').and('have.class', 'fa-spin')
  })

  it('supports different sizes', () => {
    const sizes: ButtonProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl']

    sizes.forEach((size) => {
      cy.mount(PButton, {
        props: { size },
        slots: { default: size },
      })
      cy.get(`${baseClass}--${size}`).should('exist')
    })
  })

  it('renders icons in correct position', () => {
    // Test left icon
    cy.mount(PButton, {
      props: {
        icon: 'raccoon',
        iconPosition: 'left',
      },
      slots: { default: 'Left Icon' },
    })
    cy.get(baseClass).find(`${baseClass}__icon--left`).should('exist')

    // Test right icon
    cy.mount(PButton, {
      props: {
        icon: 'raccoon',
        iconPosition: 'right',
      },
      slots: { default: 'Right Icon' },
    })
    cy.get(baseClass).find(`${baseClass}__icon--right`).should('exist')
  })

  it('handles click events when not disabled', () => {
    const onClick = cy.stub().as('onClick')
    cy.mount(PButton, {
      props: { onClick },
      slots: { default: 'Click me' },
    })
    cy.get(baseClass).click()
    cy.get('@onClick').should('have.been.called')
  })

  it('prevents click events when disabled', () => {
    const onClick = cy.stub().as('onClick')
    cy.mount(PButton, {
      props: {
        onClick,
        disabled: true,
      },
      slots: { default: 'Click me' },
    })
    cy.get(baseClass).click({ force: true })
    cy.get('@onClick').should('not.have.been.called')
  })

  it('renders as router-link when "to" prop is provided', () => {
    cy.mount(PButton, {
      props: {
        to: '/some-route',
      },
      slots: { default: 'Router Link' },
    })
    cy.get('router-link').should('exist')
    cy.get(baseClass).should('have.attr', 'role', 'button')
  })

  it('renders as anchor tag for external links', () => {
    cy.mount(PButton, {
      props: {
        to: 'https://example.com',
      },
      slots: { default: 'External Link' },
    })
    cy.get('a').should('exist')
    cy.get(baseClass).should('have.attr', 'role', 'button').and('have.attr', 'href', 'https://example.com')
  })
})
