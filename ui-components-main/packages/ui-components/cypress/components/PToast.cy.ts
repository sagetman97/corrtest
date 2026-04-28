import PToast from '@/components/toast/PToast.vue'

const baseClass = '.polly-toast'
const titleClass = '.polly-toast__title'
const messageClass = '.polly-toast__message'
const iconClass = '.polly-toast__icon'
const dismissButtonClass = '.polly-toast__dismiss-button'

describe('PToast', () => {
  describe('Basic Rendering', () => {
    it('renders basic toast with title and message', () => {
      cy.mount(PToast, {
        props: {
          id: 'test-toast',
          title: 'Test Title',
          message: 'Test Message',
        },
      })

      cy.get(baseClass).should('exist')
      cy.get(titleClass).should('contain.text', 'Test Title')
      cy.get(messageClass).should('contain.text', 'Test Message')
    })

    it('renders with custom icon', () => {
      cy.mount(PToast, {
        props: {
          id: 'test-toast',
          icon: 'raccoon',
          title: 'Success',
        },
      })

      cy.get(iconClass).should('exist')
      cy.get('.polly-icon').should('have.class', 'fa-raccoon')
    })

    it('renders without dismiss button when dismissible is false', () => {
      cy.mount(PToast, {
        props: {
          id: 'test-toast',
          title: 'Test',
          dismissible: false,
        },
      })

      cy.get(dismissButtonClass).should('not.exist')
    })
  })

  describe('Custom Slots', () => {
    it('renders custom icon slot content', () => {
      cy.mount(PToast, {
        props: {
          id: 'test-toast',
        },
        slots: {
          icon: '<div class="custom-icon">🎉</div>',
        },
      })

      cy.get('.custom-icon').should('exist')
      cy.get('.custom-icon').should('contain.text', '🎉')
    })

    it('renders custom default slot content', () => {
      cy.mount(PToast, {
        props: {
          id: 'test-toast',
        },
        slots: {
          default: '<div class="custom-content">Custom Message</div>',
        },
      })

      cy.get('.custom-content').should('exist')
      cy.get('.custom-content').should('contain.text', 'Custom Message')
    })

    it('renders custom close button via slot', () => {
      cy.mount(PToast, {
        props: {
          id: 'test-toast',
        },
        slots: {
          close: `
            <template #close="{ close }">
              <button class="custom-close" @click="close">Close Me</button>
            </template>
          `,
        },
      })

      cy.get('.custom-close').should('exist')
      cy.get('.custom-close').should('contain.text', 'Close Me')
    })
  })

  describe('Styling', () => {
    it('applies correct size to icon', () => {
      cy.mount(PToast, {
        props: {
          id: 'test-toast',
          icon: 'info',
          size: '3x',
        },
      })

      cy.get('.polly-icon').should('have.class', 'polly-icon--3x')
    })
  })
})
