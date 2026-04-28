import PBadge from '@/components/badge/PBadge.vue'

const baseClass = '.polly-badge'

describe('PBadge', () => {
  it('renders basic badge with label', () => {
    cy.mount(PBadge, {
      props: {
        label: 'Test Badge',
      },
    })
    cy.get(baseClass).should('exist').and('contain.text', 'Test Badge')
  })

  it('supports different variants', () => {
    const variants = ['primary', 'medium', 'basic', 'positive', 'negative', 'new', 'highlight', 'unavailable', 'success', 'warning', 'error', 'info'] as const

    variants.forEach((variant) => {
      cy.mount(PBadge, {
        props: {
          variant,
          label: variant,
        },
      })
      cy.get(baseClass).should('have.class', `polly-badge--${variant}`)
    })
  })

  it('renders icon in correct position', () => {
    // Test left icon
    cy.mount(PBadge, {
      props: {
        label: 'Left Icon',
        icon: 'check',
        iconPosition: 'left',
      },
    })
    cy.get(`${baseClass} .polly-icon`).should('exist')

    // Test right icon
    cy.mount(PBadge, {
      props: {
        label: 'Right Icon',
        icon: 'check',
        iconPosition: 'right',
      },
    })
    cy.get(`${baseClass} .polly-icon`).should('exist')
  })

  it('supports custom icon through slot', () => {
    cy.mount(PBadge, {
      props: {
        label: 'Custom Icon',
      },
      slots: {
        icon: '<p-icon class="custom-icon" icon="star"/>',
      },
    })
    cy.get(`${baseClass} .custom-icon.fa-star`).should('exist')
  })

  it('handles custom content through default slot', () => {
    cy.mount(PBadge, {
      slots: {
        default: '<span class="custom-content">Custom Content</span>',
      },
    })
    cy.get(`${baseClass} .custom-content`).should('exist').and('contain.text', 'Custom Content')
  })
})
