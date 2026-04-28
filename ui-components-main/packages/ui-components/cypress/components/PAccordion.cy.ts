import PAccordion from '@/components/accordion/PAccordion.vue'

const baseClass = '.polly-accordion'
const headerClass = '.polly-accordion__header'
const contentClass = '.polly-accordion__content'
const summaryClass = '.polly-accordion__summary'
const iconClass = '.polly-accordion__icon'

describe('PAccordion', () => {
  it('renders basic accordion with title', () => {
    cy.mount(PAccordion, {
      props: {
        title: 'Test Accordion',
      },
    })
    cy.get(baseClass).should('exist')
    cy.get(headerClass).should('contain.text', 'Test Accordion')
  })

  it('toggles expanded state on click', () => {
    cy.mount(PAccordion, {
      props: {
        title: 'Test Accordion',
      },
      slots: {
        default: 'Accordion Content',
      },
    })

    cy.get(baseClass).should('not.have.class', 'polly-accordion--expanded')
    cy.get(headerClass).click()
    cy.get(baseClass).should('have.class', 'polly-accordion--expanded')
    cy.get(contentClass).should('be.visible').and('contain.text', 'Accordion Content')
  })

  it('supports different variants', () => {
    const variants = ['primary', 'secondary'] as const
    variants.forEach((variant) => {
      cy.mount(PAccordion, {
        props: {
          title: `${variant} Accordion`,
          variant,
        },
      })
      cy.get(baseClass).should('have.class', `polly-accordion--${variant}`)
      cy.get(headerClass).should('have.class', `polly-accordion__header--${variant}`)
    })
  })

  it('handles disabled state', () => {
    cy.mount(PAccordion, {
      props: {
        title: 'Disabled Accordion',
        disabled: true,
      },
    })
    cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
    cy.get(headerClass).should('have.attr', 'disabled')
    cy.get(headerClass).click({ force: true })
    cy.get(baseClass).should('not.have.class', 'polly-accordion--expanded')
  })

  it('shows summary when provided', () => {
    cy.mount(PAccordion, {
      props: {
        title: 'Accordion with Summary',
      },
      slots: {
        summary: 'Summary Content',
      },
    })
    cy.get(summaryClass).should('exist').and('contain.text', 'Summary Content')
  })

  it('can hide icon', () => {
    cy.mount(PAccordion, {
      props: {
        title: 'Accordion without Icon',
        hideIcon: true,
      },
    })
    cy.get(iconClass).should('not.exist')
  })

  it('supports custom header content', () => {
    cy.mount(PAccordion, {
      slots: {
        header: '<div class="custom-header">Custom Header</div>',
      },
    })
    cy.get('.custom-header').should('exist').and('contain.text', 'Custom Header')
  })

  it('exposes slot props correctly', () => {
    cy.mount(PAccordion, {
      slots: {
        default: `
          <div class="content-status">
            Status: {{ expanded ? 'Expanded' : 'Collapsed' }}
          </div>
        `,
      },
    })

    cy.get('.content-status').should('contain.text', 'Status: Collapsed')
    cy.get(headerClass).click()
    cy.get('.content-status').should('contain.text', 'Status: Expanded')
  })

  it('maintains expanded state with v-model', () => {
    cy.mount(PAccordion, {
      props: {
        title: 'Controlled Accordion',
        expanded: true,
      },
    })
    cy.get(baseClass).should('have.class', 'polly-accordion--expanded')
  })

  it('rotates icon when expanded', () => {
    cy.mount(PAccordion, {
      props: {
        title: 'Accordion with Rotating Icon',
      },
    })
    cy.get(iconClass).should('not.have.class', 'p-rotate-90')
    cy.get(headerClass).click()
    cy.get(iconClass).should('have.class', 'p-rotate-90')
  })
})
