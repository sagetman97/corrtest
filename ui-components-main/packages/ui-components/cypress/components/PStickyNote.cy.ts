import { UTCDate } from '@date-fns/utc'

import PStickyNote from '@/components/stickyNote/PStickyNote.vue'

const baseClass = '.polly-sticky-note'
const messageClass = '.polly-sticky-note__message'
const contextClass = '.polly-sticky-note__context'
const authorClass = '.polly-sticky-note__author'
const dateClass = '.polly-sticky-note__date'
const actionsClass = '.polly-sticky-note__actions-icon'
const textareaClass = '.polly-textarea__control'
const formActionsClass = '.polly-sticky-note__form-actions'

describe('PStickyNote', () => {
  describe('Basic Rendering', () => {
    it('renders basic sticky note with message', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(messageClass).should('contain.text', 'Test message')
    })

    it('renders with context information', () => {
      const testDate = new UTCDate('2024-01-15T14:30:00Z')
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
          context: {
            author: 'John Doe',
            date: testDate,
          },
        },
      })
      cy.get(authorClass).should('contain.text', 'John Doe')
      cy.get(dateClass).should('contain.text', '01/15/2024')
    })

    it('applies correct classes based on content', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
          context: {
            author: 'John Doe',
            date: new UTCDate(),
          },
        },
      })
      cy.get(baseClass)
        .should('have.class', 'polly-sticky-note--has-message')
        .and('have.class', 'polly-sticky-note--has-context')
        .and('have.class', 'polly-sticky-note--has-actions')
    })
  })

  describe('Edit Mode', () => {
    it('enters edit mode when edit action is clicked', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Original message',
        },
      })
      cy.get(actionsClass).click()
      cy.contains('Edit').click()
      cy.get(textareaClass).should('exist')
      cy.get(textareaClass).should('have.value', 'Original message')
    })

    it('cancels editing and restores original message', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Original message',
        },
      })
      cy.get(actionsClass).click()
      cy.contains('Edit').click()
      cy.get(textareaClass).clear().type('New message')
      cy.get(formActionsClass).contains('Cancel').click()
      cy.get(messageClass).should('contain.text', 'Original message')
    })

    it('saves edited message', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Original message',
          onSave: cy.spy().as('saveSpy'),
        },
      })
      cy.get(actionsClass).click()
      cy.contains('Edit').click()
      cy.get(textareaClass).clear().type('New message')
      cy.get(formActionsClass).contains('Save Changes').click()
      cy.get('@saveSpy').should('have.been.calledWith', 'New message')
    })
  })

  describe('Delete Action', () => {
    it('emits delete event when delete action is clicked', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
          onDelete: cy.spy().as('deleteSpy'),
        },
      })
      cy.get(actionsClass).click()
      cy.contains('Delete').click()
      cy.get('@deleteSpy').should('have.been.called')
    })
  })

  describe('Disabled State', () => {
    it('does not show actions when disabled', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
          disabled: true,
        },
      })
      cy.get(actionsClass).should('not.exist')
    })
  })

  describe('Custom Slots', () => {
    it('renders custom default slot content', () => {
      cy.mount(PStickyNote, {
        slots: {
          default: '<div class="custom-message">Custom message content</div>',
        },
      })
      cy.get('.custom-message').should('exist')
      cy.get('.custom-message').should('contain.text', 'Custom message content')
    })

    it('renders custom context slot content', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
          context: {
            author: 'John Doe',
            date: new UTCDate(),
          },
        },
        slots: {
          context: '<div class="custom-context">Custom context content</div>',
        },
      })
      cy.get('.custom-context').should('exist')
      cy.get('.custom-context').should('contain.text', 'Custom context content')
    })
  })

  describe('Date Formatting', () => {
    it('formats date correctly', () => {
      // Set system time and timezone to a fixed value
      cy.clock(new Date('2024-01-15T14:30:00Z').getTime(), ['Date'])
      cy.window().then((win) => {
        class MockDateTimeFormat {
          constructor() {
            return {
              resolvedOptions: () => ({ timeZone: 'America/New_York' }),
              format: () => {
                // Format time as "9:30 AM EST"
                return '9:30 AM EST'
              },
            }
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        win.Intl.DateTimeFormat = MockDateTimeFormat as any
      })

      const testDate = new UTCDate('2024-01-15T14:30:00Z')
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
          context: {
            author: 'John Doe',
            date: testDate,
          },
        },
      })

      // In Eastern Time (UTC-5), 14:30 UTC = 09:30 EST
      cy.get(dateClass).should('contain.text', '01/15/2024').and('contain.text', '9:30 AM EST')
    })
  })

  describe('Empty States', () => {
    it('handles empty message', () => {
      cy.mount(PStickyNote, {
        props: {
          message: '',
        },
      })
      cy.get(messageClass).should('not.exist')
    })

    it('handles missing context', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
        },
      })
      cy.get(contextClass).should('not.exist')
    })
  })

  describe('Action Icons', () => {
    it('renders Font Awesome icons for Edit and Delete actions', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
        },
      })
      cy.get(actionsClass).click()
      cy.get('.polly-option__icon').should('have.length', 2)
      cy.get('.polly-option__icon').first().should('have.class', 'fa-pen-to-square')
      cy.get('.polly-option__icon').last().should('have.class', 'fa-trash-can')
    })

    it('does not render radio buttons in action dropdown', () => {
      cy.mount(PStickyNote, {
        props: {
          message: 'Test message',
        },
      })
      cy.get(actionsClass).click()
      cy.get('.polly-radio').should('not.exist')
    })
  })
})
