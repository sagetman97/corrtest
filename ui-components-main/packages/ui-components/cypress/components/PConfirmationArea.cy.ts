import { Confirmation } from '@/types'

import PConfirmationArea from '@/components/confirmation/PConfirmationArea.vue'
import { confirmations } from '@/composables'

const baseClass = '.polly-confirmation-area'
const modalClass = '.polly-modal'
const contentClass = '.polly-confirmation-area__content'
const footerClass = '.polly-modal-content__footer'

describe('PConfirmationArea', () => {
  beforeEach(() => {
    // Clear any existing confirmations
    confirmations.clear()
  })

  it('renders empty when no confirmations exist', () => {
    cy.mount(PConfirmationArea)
    cy.get(baseClass).should('exist')
    cy.get(modalClass).should('not.exist')
  })

  it('renders confirmation modal with basic content', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test Confirmation',
      message: 'Are you sure?',
      resolve: cy.stub().as('resolve'),
      showClose: true,
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(modalClass).should('exist')
    cy.get(modalClass).should('contain.text', 'Test Confirmation')
    cy.get(contentClass).should('contain.text', 'Are you sure?')
  })

  it('shows default cancel and confirm buttons', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(footerClass).within(() => {
      cy.get('button').should('have.length', 2)
      cy.get('button').first().should('contain.text', 'Cancel')
      cy.get('button').last().should('contain.text', 'Confirm')
    })
  })

  it('supports custom button text', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      cancelText: 'No way',
      confirmText: 'Yes please',
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(footerClass).within(() => {
      cy.get('button').first().should('contain.text', 'No way')
      cy.get('button').last().should('contain.text', 'Yes please')
    })
  })

  it('handles cancel button click', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(footerClass).contains('Cancel').click()
    cy.get('@resolve').should('have.been.calledWith', false)
  })

  it('handles confirm button click', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(footerClass).contains('Confirm').click()
    cy.get('@resolve').should('have.been.calledWith', true)
  })

  it('shows close button when showClose is true', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      showClose: true,
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get('.polly-button').filter(':has(.fa-xmark)').should('exist')
  })

  it('handles close button click', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      showClose: true,
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get('.polly-button').filter(':has(.fa-xmark)').click()
    cy.get('@resolve').should('have.been.calledWith', false)
  })

  it('supports custom button variants', () => {
    const confirmation: Confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      cancelVariant: 'error',
      confirmVariant: 'primary',
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(footerClass).within(() => {
      cy.get('button').first().should('have.class', 'polly-button--error')
      cy.get('button').last().should('have.class', 'polly-button--primary')
    })
  })

  it('handles outside click', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      resolve: cy.stub().as('resolve'),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(modalClass).should('exist')
    cy.get(modalClass).parent().click()
    cy.get('@resolve').should('have.been.calledWith', false)
  })

  it('renders multiple confirmations', () => {
    const confirmation1 = {
      id: '1',
      isOpen: true,
      title: 'First',
      message: 'Message 1',
      resolve: cy.stub(),
    }

    const confirmation2 = {
      id: '2',
      isOpen: true,
      title: 'Second',
      message: 'Message 2',
      resolve: cy.stub(),
    }

    confirmations.set(confirmation1.id, confirmation1)
    confirmations.set(confirmation2.id, confirmation2)

    cy.mount(PConfirmationArea)
    cy.get(modalClass).should('have.length', 2)
  })

  it('has correct accessibility attributes', () => {
    const confirmation = {
      id: '1',
      isOpen: true,
      title: 'Test',
      message: 'Message',
      resolve: cy.stub(),
    }

    confirmations.set(confirmation.id, confirmation)

    cy.mount(PConfirmationArea)
    cy.get(baseClass).should('have.attr', 'aria-live', 'assertive')
  })
})
