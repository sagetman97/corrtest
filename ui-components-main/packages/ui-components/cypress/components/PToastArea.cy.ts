import { defineComponent, h } from 'vue'

import PToastArea from '@/components/toast/PToastArea.vue'
import { useToast } from '@/composables'

const baseClass = '.polly-toast-area'
const toastClass = '.polly-toast'

beforeEach(() => {
  // Clear any existing toasts
  const { clearToasts } = useToast()
  clearToasts()
})

describe('PToastArea', () => {
  describe('Basic Rendering', () => {
    it('renders toast area container', () => {
      cy.mount(PToastArea)
      cy.get(baseClass).should('exist').and('have.attr', 'aria-live', 'assertive')
    })
  })

  describe('Toast Management', () => {
    it('renders standard toast messages', () => {
      const { notify } = useToast()

      cy.mount(PToastArea).then(() => {
        notify({
          message: 'Test Toast Message',
          icon: 'info',
        })
      })

      cy.get(toastClass).should('exist').and('contain.text', 'Test Toast Message')
    })

    it('supports multiple toasts', () => {
      const { notify } = useToast()

      cy.mount(PToastArea).then(() => {
        notify({
          message: 'First Toast',
          icon: 'info',
        })
        notify({
          message: 'Second Toast',
          icon: 'check',
        })
      })

      cy.get(toastClass).should('have.length', 2)
      cy.get(toastClass).first().should('contain.text', 'First Toast')
      cy.get(toastClass).last().should('contain.text', 'Second Toast')
    })

    it('renders custom component toasts', () => {
      const { notify } = useToast()
      const CustomComponent = defineComponent({
        name: 'CustomToast',
        props: {
          id: {
            type: String,
            required: true,
          },
        },
        setup() {
          return () => h('div', { class: 'custom-toast' }, 'Custom Component Toast')
        },
      })

      cy.mount(PToastArea).then(() => {
        notify({
          message: CustomComponent,
        })
      })

      cy.get('.custom-toast').should('exist').and('contain.text', 'Custom Component Toast')
    })
  })

  describe('Layout', () => {
    it('stacks toasts in correct order', () => {
      const { notify } = useToast()

      cy.mount(PToastArea).then(() => {
        notify({
          message: 'First Toast',
        })
        notify({
          message: 'Second Toast',
        })
      })

      // Verify vertical stacking (bottom to top)
      cy.get(toastClass).then(($toasts) => {
        const firstToastPosition = $toasts[0].getBoundingClientRect()
        const secondToastPosition = $toasts[1].getBoundingClientRect()
        expect(firstToastPosition.bottom).to.not.be.greaterThan(secondToastPosition.bottom)
      })
    })
  })
})
