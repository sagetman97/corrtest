import PAvatar from '@/components/avatar/PAvatar.vue'

const baseClass = '.polly-avatar'
const initialsClass = '.polly-avatar__initials'
const statusClass = '.polly-avatar__status'
const iconWrapperClass = '.polly-avatar__icon-wrapper'

describe('PAvatar', () => {
  it('renders basic avatar', () => {
    cy.mount(PAvatar)
    cy.get(baseClass).should('exist')
  })

  it('displays correct initials from fullName', () => {
    const testCases = [
      { input: 'John Doe', expected: 'JD' },
      { input: 'Alice Bob Charles', expected: 'AC' },
      { input: 'Single', expected: 'S' },
      { input: '  Padded  Name  ', expected: 'PN' },
      { input: '', expected: '' },
    ]

    testCases.forEach(({ input, expected }) => {
      cy.mount(PAvatar, {
        props: { fullName: input },
      })
      cy.get(initialsClass).should('have.text', expected)
    })
  })

  it('supports different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    sizes.forEach((size) => {
      cy.mount(PAvatar, {
        props: { size },
      })
      cy.get(baseClass).should('have.class', `polly-avatar--${size}`)
    })
  })

  it('supports different variants', () => {
    const variants = ['default', 'ai'] as const

    variants.forEach((variant) => {
      cy.mount(PAvatar, {
        props: { variant },
      })
      cy.get(baseClass).should('have.class', `polly-avatar--${variant}`)
    })
  })

  it('shows status indicator when enabled', () => {
    // Without status
    cy.mount(PAvatar)
    cy.get(statusClass).should('not.exist')

    // With status
    cy.mount(PAvatar, {
      props: { showStatus: true },
    })
    cy.get(statusClass).should('exist')
    cy.get(baseClass).should('have.class', 'polly-avatar--with-status')
  })

  it('renders custom image content when provided', () => {
    cy.mount(PAvatar, {
      slots: {
        image: '<img src="test.jpg" alt="Custom Avatar" />',
      },
    })
    cy.get(`${baseClass} img`).should('exist')
    cy.get(initialsClass).should('not.exist')
  })

  it('maintains proper structure with icon wrapper', () => {
    cy.mount(PAvatar)
    cy.get(iconWrapperClass).should('exist')
    cy.get(`${iconWrapperClass} .polly-icon`).should('exist')
  })

  it('handles empty or whitespace-only fullName', () => {
    const emptyNames = ['', ' ', '  ']

    emptyNames.forEach((name) => {
      cy.mount(PAvatar, {
        props: { fullName: name },
      })
      cy.get(initialsClass).should('have.text', '')
    })
  })

  it('preserves content layout and positioning', () => {
    cy.mount(PAvatar, {
      props: { fullName: 'John Doe' },
    })
    cy.get('.polly-avatar__content').should('have.css', 'position', 'absolute')
    cy.get(baseClass).should('have.css', 'display', 'inline-flex')
  })
})
