import PChip from '@/components/chip/PChip.vue'

const baseClass = '.polly-chip'
const iconClass = '.polly-icon'

describe('PChip', () => {
  it('renders basic chip with label', () => {
    cy.mount(PChip, {
      props: {
        label: 'Test Chip',
      },
    })
    cy.get(baseClass).should('exist').and('contain.text', 'Test Chip')
  })

  it('supports different variants', () => {
    const variants = ['primary', 'white', 'gray'] as const

    variants.forEach((variant) => {
      cy.mount(PChip, {
        props: {
          variant,
          label: variant,
        },
      })
      cy.get(baseClass).should('have.class', `polly-chip--${variant}`)
    })
  })

  it('renders icon when provided', () => {
    cy.mount(PChip, {
      props: {
        label: 'Icon Chip',
        icon: 'star',
      },
    })
    cy.get(`${baseClass} ${iconClass}`).should('exist').and('have.class', 'fa-star')
  })

  it('supports custom icon via slot', () => {
    cy.mount(PChip, {
      props: {
        label: 'Custom Icon',
      },
      slots: {
        icon: '<span class="custom-icon">★</span>',
      },
    })
    cy.get('.custom-icon').should('exist').and('contain.text', '★')
  })

  it('renders dismiss icon when dismissible', () => {
    cy.mount(PChip, {
      props: {
        label: 'Dismissible Chip',
        dismissible: true,
      },
    })
    cy.get(`${baseClass} ${iconClass}.fa-xmark`).should('exist')
  })

  it('renders dismiss button as disabled when chip is disabled', () => {
    cy.mount(PChip, {
      props: {
        label: 'Disabled Chip',
        dismissible: true,
        disabled: true,
      },
    })
    cy.get(`${baseClass} .polly-chip__dismiss-button`).should('be.disabled')
  })

  it('handles disabled state', () => {
    cy.mount(PChip, {
      props: {
        label: 'Disabled Chip',
        disabled: true,
      },
    })
    cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
  })

  it('supports custom content via default slot', () => {
    cy.mount(PChip, {
      slots: {
        default: '<span class="custom-content">Custom Content</span>',
      },
    })
    cy.get('.custom-content').should('exist').and('contain.text', 'Custom Content')
  })

  it('handles focus states on dismiss button', () => {
    cy.mount(PChip, {
      props: {
        label: 'Focus Test',
        dismissible: true,
      },
    })
    cy.get('.polly-chip__dismiss-button').focus()
    cy.get('.polly-chip__dismiss-button').should('be.focused')
  })

  it('applies correct styles for variants', () => {
    const variants = ['primary', 'white', 'gray'] as const

    variants.forEach((variant) => {
      cy.mount(PChip, {
        props: {
          variant,
          label: variant,
        },
      })
      cy.get(baseClass).should('have.class', `polly-chip--${variant}`)
    })
  })

  it('passes through icon props correctly', () => {
    cy.mount(PChip, {
      props: {
        label: 'Icon Props Test',
        icon: 'star',
        faStyle: 'solid',
        size: 'lg',
      },
    })
    cy.get(iconClass).should('have.class', 'fa-solid')
    cy.get(iconClass).should('have.class', 'polly-icon--lg')
  })

  it('handles click events on dismiss button', () => {
    const onClick = cy.stub().as('onClick')
    cy.mount(PChip, {
      props: {
        label: 'Clickable Chip',
        dismissible: true,
        onClick,
      },
    })
    cy.get('.polly-chip__dismiss-button').click()
    cy.get('@onClick').should('have.been.called')
  })

  it('prevents click events when disabled', () => {
    const onClick = cy.stub().as('onClick')
    cy.mount(PChip, {
      props: {
        label: 'Disabled Chip',
        dismissible: true,
        disabled: true,
        onClick,
      },
    })
    cy.get('.polly-chip__dismiss-button').click({ force: true })
    cy.get('@onClick').should('not.have.been.called')
  })
})
