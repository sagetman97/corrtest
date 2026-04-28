import PTimelineItem from '@/components/timeline/PTimelineItem.vue'

const itemClass = '.polly-timeline-item'
const headerClass = '.polly-timeline-item__header'
const contentClass = '.polly-timeline-item__content'

describe('PTimelineItem', () => {
  describe('Basic Rendering', () => {
    it('renders with header slot only', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div class="test-header">Header Content</div>',
        },
      })

      cy.get(itemClass).should('exist')
      cy.get(headerClass).should('exist').and('contain.text', 'Header Content')
      cy.get(contentClass).should('not.exist')
    })

    it('renders with both header and content slots', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header</div>',
          content: '<div class="test-content">Content</div>',
        },
      })

      cy.get(itemClass).should('exist')
      cy.get(headerClass).should('exist').and('contain.text', 'Header')
      cy.get(contentClass).should('exist')
    })

    it('renders header as button when content exists', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).should('match', 'button')
      cy.get(headerClass).should('have.class', 'polly-timeline-item__header--has-content')
    })

    it('renders header as span when no content exists', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header</div>',
        },
      })

      cy.get(headerClass).should('match', 'span')
      cy.get(headerClass).should('not.have.class', 'polly-timeline-item__header--has-content')
    })
  })

  describe('Toggle Behavior', () => {
    it('opens and closes when clicked', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')

      cy.get(headerClass).click()
      cy.wait(200)
      cy.get(itemClass).should('have.class', 'polly-timeline-item--open')
      cy.get(contentClass).should('be.visible')

      cy.get(headerClass).click()
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')
    })

    it('does not toggle when clicking header without content', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header Only</div>',
        },
      })

      cy.get(headerClass).click()
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')
    })
  })

  describe('Disabled State', () => {
    it('applies aria-disabled attribute when disabled', () => {
      cy.mount(PTimelineItem, {
        props: {
          disabled: true,
        },
        slots: {
          header: '<div>Disabled Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).should('have.attr', 'aria-disabled', 'true')
    })

    it('does not toggle when disabled', () => {
      cy.mount(PTimelineItem, {
        props: {
          disabled: true,
        },
        slots: {
          header: '<div>Disabled Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).click({ force: true })
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')
    })
  })

  describe('v-model:open', () => {
    it('respects initial open state', () => {
      cy.mount(PTimelineItem, {
        props: {
          open: true,
        },
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(itemClass).should('have.class', 'polly-timeline-item--open')
      cy.get(contentClass).should('be.visible')
    })

    it('emits update:open event when toggled', () => {
      const onUpdateOpen = cy.stub().as('updateOpen')

      cy.mount(PTimelineItem, {
        props: {
          'onUpdate:open': onUpdateOpen,
        },
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).click()
      cy.get('@updateOpen').should('have.been.calledWith', true)

      cy.get(headerClass).click()
      cy.get('@updateOpen').should('have.been.calledWith', false)
    })
  })

  describe('Keyboard Accessibility', () => {
    it('toggles with Enter key', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).focus().type('{enter}')
      cy.wait(200)
      cy.get(itemClass).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).type('{enter}')
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')
    })

    it('toggles with Space key', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).focus().trigger('keydown', { key: ' ', code: 'Space' })
      cy.wait(200)
      cy.get(itemClass).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).trigger('keydown', { key: ' ', code: 'Space' })
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')
    })

    it('does not toggle disabled item with keyboard', () => {
      cy.mount(PTimelineItem, {
        props: {
          disabled: true,
        },
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).focus().type('{enter}')
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')

      cy.get(headerClass).trigger('keydown', { key: ' ', code: 'Space', force: true })
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')
    })

    it('shows focus-visible outline', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header</div>',
          content: '<div>Content</div>',
        },
      })

      cy.get(headerClass).focus()
      cy.get(headerClass).should('have.focus')
    })
  })

  describe('Items Without Content', () => {
    it('does not respond to keyboard when no content', () => {
      cy.mount(PTimelineItem, {
        slots: {
          header: '<div>Header Only</div>',
        },
      })

      cy.get(headerClass).should('match', 'span')
      cy.get(headerClass).click()
      cy.wait(200)
      cy.get(itemClass).should('not.have.class', 'polly-timeline-item--open')
    })
  })
})
