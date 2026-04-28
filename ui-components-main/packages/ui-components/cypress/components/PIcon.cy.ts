import PIcon from '@/components/icon/PIcon.vue'

const baseClass = '.polly-icon'

describe('PIcon', () => {
  it('renders basic icon', () => {
    cy.mount(PIcon, {
      props: {
        icon: 'user',
      },
    })
    cy.get(baseClass).should('exist')
    cy.get(baseClass).should('have.class', 'fa-user')
  })

  it('applies default light style', () => {
    cy.mount(PIcon, {
      props: {
        icon: 'user',
      },
    })
    cy.get(baseClass).should('have.class', 'fa-light')
  })

  it('supports different fa styles', () => {
    const styles = ['solid', 'regular', 'light', 'thin'] as const
    styles.forEach((style) => {
      cy.mount(PIcon, {
        props: {
          icon: 'user',
          faStyle: style,
        },
      })
      cy.get(baseClass).should('have.class', `fa-${style}`)
    })
  })

  it('handles duotone family variant', () => {
    cy.mount(PIcon, {
      props: {
        icon: 'user',
        family: 'duotone',
        faStyle: 'solid',
      },
    })
    cy.get(baseClass).should('have.class', 'fa-duotone')
    cy.get(baseClass).should('have.class', 'fa-solid')
  })

  it('handles sharp family variant', () => {
    cy.mount(PIcon, {
      props: {
        icon: 'user',
        family: 'sharp',
      },
    })
    cy.get(baseClass).should('have.class', 'fa-sharp')
  })

  it('supports different sizes', () => {
    const sizes = ['auto', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '2x', '2_5x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'] as const

    sizes.forEach((size) => {
      cy.mount(PIcon, {
        props: {
          icon: 'user',
          size,
        },
      })
      cy.get(baseClass).should('have.class', `polly-icon--${size}`)
    })
  })

  it('applies custom icon classes', () => {
    cy.mount(PIcon, {
      props: {
        icon: 'user',
        iconClasses: 'custom-class another-class',
      },
    })
    cy.get(baseClass).should('have.class', 'custom-class')
    cy.get(baseClass).should('have.class', 'another-class')
  })

  it('handles spin animation', () => {
    cy.mount(PIcon, {
      props: {
        icon: 'spinner',
        spin: true,
      },
    })
    cy.get(baseClass).should('have.class', 'fa-spin')
  })

  describe('CSS Properties', () => {
    it('inherits font size when size is auto', () => {
      cy.mount(PIcon, {
        props: {
          icon: 'user',
          size: 'auto',
        },
      })
      cy.get(baseClass).should('have.css', 'font-size', '16px')
    })

    it('maintains square aspect ratio', () => {
      cy.mount(PIcon, {
        props: {
          icon: 'user',
          size: 'md',
        },
      })
      cy.get(baseClass).then(($el) => {
        const width = $el.width()
        const height = $el.height()
        expect(width).to.equal(height)
      })
    })

    it('applies transition styles', () => {
      cy.mount(PIcon, {
        props: {
          icon: 'user',
        },
      })
      cy.get(baseClass).should('have.css', 'transition')
    })
  })
})
