import PForm from '@/components/form/PForm.vue'

const baseClass = '.polly-form'

describe('PForm', () => {
  it('renders basic form', () => {
    cy.mount(PForm)
    cy.get(baseClass).should('exist')
  })

  it('renders form content from slot', () => {
    cy.mount(PForm, {
      slots: {
        default: '<div class="test-content">Form Content</div>',
      },
    })
    cy.get('.test-content').should('exist')
    cy.get('.test-content').should('contain.text', 'Form Content')
  })

  it('prevents default form submission', () => {
    const onSubmit = cy.stub().as('onSubmit')
    cy.mount(PForm, {
      props: {
        onSubmit,
      },
      slots: {
        default: '<button type="submit">Submit</button>',
      },
    })

    cy.get('button[type="submit"]').click()
    cy.get('@onSubmit').should('have.been.calledOnce')
  })

  it('emits submit event with form data', () => {
    cy.mount(PForm, {
      props: {
        onSubmit: cy.stub().as('onSubmit'),
      },
      slots: {
        default: `
          <input type="text" name="username" value="testuser" />
          <button type="submit">Submit</button>
        `,
      },
    })

    cy.get('button[type="submit"]').click()
    cy.get('@onSubmit').should('have.been.calledOnce')
    cy.get('@onSubmit').should((stub) => {
      //@ts-expect-error should be fine
      const event = stub.firstCall.args[0]
      expect(event).to.be.instanceOf(Event)
      expect(event.type).to.equal('submit')
    })
  })

  it('handles nested form elements', () => {
    cy.mount(PForm, {
      slots: {
        default: `
          <div class="form-group">
            <input type="text" name="field1" />
            <input type="text" name="field2" />
          </div>
          <button type="submit">Submit</button>
        `,
      },
    })

    cy.get(baseClass).within(() => {
      cy.get('input').should('have.length', 2)
      cy.contains('button[type="submit"]', 'Submit').should('exist')
    })
  })
})
