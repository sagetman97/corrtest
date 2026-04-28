import PCard from '@/components/card/PCard.vue'

const baseClass = '.polly-card'
const headerClass = '.polly-card__header'
const titleClass = '.polly-card__title'
const subtitleClass = '.polly-card__subtitle'
const contentClass = '.polly-card__content'
const footerClass = '.polly-card__footer'
const actionsClass = '.polly-card__actions'
const backButtonClass = '.polly-card__back-button'

describe('PCard', () => {
  it('renders basic card with content', () => {
    cy.mount(PCard, {
      slots: {
        default: 'Card Content',
      },
    })
    cy.get(baseClass).should('exist')
    cy.get(contentClass).should('contain.text', 'Card Content')
  })

  it('supports different variants', () => {
    const variants = ['default', 'ai'] as const

    variants.forEach((variant) => {
      cy.mount(PCard, {
        props: { variant },
        slots: {
          default: `${variant} variant`,
        },
      })
      cy.get(baseClass).should('have.class', `polly-card--${variant}`)
    })
  })

  it('renders title and subtitle from props', () => {
    cy.mount(PCard, {
      props: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
      },
    })

    cy.get(headerClass).should('exist')
    cy.get(titleClass).should('contain.text', 'Card Title')
    cy.get(subtitleClass).should('contain.text', 'Card Subtitle')
  })

  it('renders title and subtitle from slots', () => {
    cy.mount(PCard, {
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
        subtitle: '<span class="custom-subtitle">Custom Subtitle</span>',
      },
    })

    cy.get('.custom-title').should('exist').and('contain.text', 'Custom Title')
    cy.get('.custom-subtitle').should('exist').and('contain.text', 'Custom Subtitle')
  })

  it('does not render header when no title or subtitle provided', () => {
    cy.mount(PCard, {
      slots: {
        default: 'Content only',
      },
    })

    cy.get(headerClass).should('not.exist')
  })

  it('renders back button in header', () => {
    cy.mount(PCard, {
      props: {
        title: 'Card with Back Button',
        showBack: true,
      },
    })

    cy.get(backButtonClass).should('exist').and('contain.text', 'Go Back')
  })

  it('renders actions in header', () => {
    cy.mount(PCard, {
      props: {
        title: 'Card with Actions',
      },
      slots: {
        actions: '<button class="action-button">Action</button>',
      },
    })

    cy.get(actionsClass).should('exist')
    cy.get('.action-button').should('exist').and('contain.text', 'Action')
  })

  it('renders footer when footer slot is provided', () => {
    cy.mount(PCard, {
      slots: {
        footer: '<button class="footer-button">Footer Action</button>',
      },
    })

    cy.get(footerClass).should('exist')
    cy.get('.footer-button').should('exist').and('contain.text', 'Footer Action')
  })

  it('does not render footer when no footer slot is provided', () => {
    cy.mount(PCard)
    cy.get(footerClass).should('not.exist')
  })

  it('applies AI variant specific styles', () => {
    cy.mount(PCard, {
      props: {
        variant: 'ai',
        title: 'AI Card',
      },
      slots: {
        footer: 'Footer',
      },
    })

    cy.get(baseClass).should('have.class', 'polly-card--ai')
  })
})
