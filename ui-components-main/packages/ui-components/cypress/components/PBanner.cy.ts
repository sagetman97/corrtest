import { BannerProps } from '@/types'

import PBanner from '@/components/banner/PBanner.vue'

const baseClass = '.polly-banner'
const headingClass = '.polly-banner__heading'
const iconClass = '.polly-banner__icon'
const titleClass = '.polly-banner__title'
const messageClass = '.polly-banner__message'
const actionsClass = '.polly-banner__actions'

describe('PBanner', () => {
  it('renders basic banner with title', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Test Banner',
      },
    })
    cy.get(baseClass).should('exist')
    cy.get(titleClass).should('contain.text', 'Test Banner')
  })

  it('supports different variants with correct styling', () => {
    const variants = ['info', 'error', 'warning', 'success', 'outline', 'neutral', 'ai', 'custom'] as const

    variants.forEach((variant) => {
      cy.mount(PBanner, {
        props: {
          variant,
          title: `${variant} Banner`,
        },
      })
      cy.get(baseClass)
        .should('have.class', `polly-banner--${variant}`)
        // Verify background color is applied
        .should('have.css', 'background-color')
    })
  })

  it('displays message when provided', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Banner Title',
        message: 'Banner Message',
      },
    })
    cy.get(messageClass).should('exist').and('contain.text', 'Banner Message')
  })

  it('renders default variant icons correctly', () => {
    const variantIconMap: Record<BannerProps['variant'], string> = {
      outline: 'info-circle',
      neutral: 'info-circle',
      info: 'info-circle',
      warning: 'exclamation-triangle',
      error: 'octagon-xmark',
      success: 'check-circle',
      ai: 'sparkles',
      custom: 'info-circle',
    }

    Object.entries(variantIconMap).forEach(([variant, expectedIcon]) => {
      cy.mount(PBanner, {
        props: {
          variant: variant as BannerProps['variant'],
          title: 'Icon Test',
        },
      })
      cy.get(`${iconClass} .polly-icon`).should('have.class', `fa-${expectedIcon}`)
    })
  })

  it('supports custom icon through prop', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Custom Icon',
        icon: 'star',
      },
    })
    cy.get(`${iconClass} .polly-icon`).should('have.class', 'fa-star')
  })

  it('handles expansion behavior correctly', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Expandable Banner',
      },
      slots: {
        expansion: '<div class="test-expansion">Expanded Content</div>',
      },
    })

    // Initially not expanded
    cy.get(baseClass).should('not.have.class', 'polly-banner--expanded')
    cy.get('.test-expansion').should('not.be.visible')

    // Click to expand
    cy.get(headingClass).click()
    cy.get(baseClass).should('have.class', 'polly-banner--expanded')
    cy.get('.test-expansion').should('be.visible')

    // Click to collapse
    cy.get(headingClass).click()
    cy.get(baseClass).should('not.have.class', 'polly-banner--expanded')
  })

  it('does not show expansion controls when no expansion slot is provided', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Non-expandable Banner',
      },
    })
    // Verify the accordion icon is not visible
    cy.get('.polly-accordion__icon').should('not.exist')
  })

  it('supports custom content through slots', () => {
    cy.mount(PBanner, {
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
        message: '<span class="custom-message">Custom Message</span>',
        icon: '<div class="custom-icon">★</div>',
      },
    })
    cy.get('.custom-title').should('exist').and('contain.text', 'Custom Title')
    cy.get('.custom-message').should('exist').and('contain.text', 'Custom Message')
    cy.get('.custom-icon').should('exist').and('contain.text', '★')
  })

  it('support actions in custom actions slot', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Banner with Actions',
      },
      slots: {
        actions: '<button class="test-action">Action</button>',
      },
    })
    cy.get(actionsClass).should('exist')
    cy.get('.test-action').should('exist')
  })

  it('supports stacked actions layout', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Banner with Stacked Actions',
        stackedActions: true,
      },
      slots: {
        actions: `
          <button class="test-action-1">Action 1</button>
          <button class="test-action-2">Action 2</button>
        `,
      },
    })
    cy.get('.polly-banner__stacked-actions')
      .should('exist')
      .within(() => {
        cy.get('.test-action-1').should('exist')
        cy.get('.test-action-2').should('exist')
      })
  })

  it('allows complete content override through content slot', () => {
    cy.mount(PBanner, {
      slots: {
        content: `
          <div class="custom-content-wrapper">
            <h2>Custom Heading</h2>
            <p>Custom Text</p>
            <button>Custom Button</button>
          </div>
        `,
      },
    })
    cy.get('.custom-content-wrapper').should('exist')
    cy.get('.custom-content-wrapper h2').should('contain.text', 'Custom Heading')
    cy.get('.custom-content-wrapper button').should('exist')
  })

  it('supports different icon sizes', () => {
    const sizes: BannerProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2x'] as const

    sizes.forEach((size) => {
      cy.mount(PBanner, {
        props: {
          title: 'Size Test',
          size,
        },
      })
      cy.get(`${iconClass} .polly-icon`).should('exist')
    })
  })

  it('handles v-model:expanded binding', () => {
    cy.mount(PBanner, {
      props: {
        title: 'Model Test',
        expanded: true,
      },
      slots: {
        expansion: '<div class="test-expansion">Expanded Content</div>',
      },
    })
    cy.get(baseClass).should('have.class', 'polly-banner--expanded')
    cy.get('.test-expansion').should('be.visible')
  })
})
