import PProgressBar from '@/components/progressBar/PProgressBar.vue'

const baseClass = '.polly-progress-bar'
const progressBarClass = '.polly-progress-bar__progress-bar'
const percentageClass = '.polly-progress-bar__percentage'

describe('PProgressBar', () => {
  describe('Basic Rendering', () => {
    it('renders basic progress bar', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 50,
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(progressBarClass).should('exist')
    })

    it('sets correct progress value', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 75,
        },
      })
      cy.get(progressBarClass).should('have.attr', 'value', '75')
    })

    it('enforces minimum value of 1', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 0,
        },
      })
      cy.get(progressBarClass).should('have.attr', 'value', '1')
    })

    it('respects custom max value', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 50,
          max: 200,
        },
      })
      cy.get(progressBarClass).should('have.attr', 'max', '200')
    })

    it('uses default max value of 100', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 50,
        },
      })
      cy.get(progressBarClass).should('have.attr', 'max', '100')
    })
  })

  describe('Percentage Display', () => {
    it('shows percentage when enabled', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 65,
          showPercentage: true,
        },
      })
      cy.get(percentageClass).should('exist')
      cy.get(percentageClass).should('contain.text', '65%')
    })

    it('hides percentage when disabled', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 65,
          showPercentage: false,
        },
      })
      cy.get(percentageClass).should('not.exist')
    })

    it('updates percentage display when value changes', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 30,
          showPercentage: true,
        },
      })
      cy.get(percentageClass).should('contain.text', '30%')

      // Remount with new value
      cy.mount(PProgressBar, {
        props: {
          value: 80,
          showPercentage: true,
        },
      })
      cy.get(percentageClass).should('contain.text', '80%')
    })
  })

  describe('Styling', () => {
    it('applies correct base styles', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 50,
        },
        attrs: {
          style: 'width: 500px',
        },
      })
      cy.get(baseClass).should('have.css', 'display', 'inline-flex').should('have.css', 'align-items', 'center').should('have.css', 'width', '500px')
    })

    it('applies correct progress bar styles', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 50,
        },
        attrs: {
          style: 'width: 500px',
        },
      })
      cy.get(progressBarClass)
        .should('have.css', 'width', '500px')
        .should('have.css', 'min-width', '130px')
        .should('have.css', 'height', '4px')
        .should('have.css', 'border-radius', '4px')
    })
  })

  describe('Edge Cases', () => {
    it('handles very small values', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 0.1,
        },
      })
      cy.get(progressBarClass).should('have.attr', 'value', '1') // Should be minimum 1
    })

    it('handles values greater than max', () => {
      cy.mount(PProgressBar, {
        props: {
          value: 150,
          max: 100,
        },
      })
      cy.get(progressBarClass).should('have.attr', 'value', '150').should('have.attr', 'max', '100')
    })

    it('handles negative values', () => {
      cy.mount(PProgressBar, {
        props: {
          value: -20,
        },
      })
      cy.get(progressBarClass).should('have.attr', 'value', '1') // Should be minimum 1
    })
  })
})
