/* eslint-disable vue/one-component-per-file */
import { defineComponent, h } from 'vue'

import PPopover from '@/components/popover/PPopover.vue'
import { createUnitValue } from '@/utilities'

const baseClass = '.polly-popover'
const targetClass = '.polly-popover__target'
const contentContainerClass = '.polly-popover__content-container'
const headerClass = '.polly-popover-content__header'
const bodyClass = '.polly-popover-content__body'
const actionsClass = '.polly-popover-content__actions'
const footerClass = '.polly-popover-content__footer'
const pointerClass = '.polly-popover__content-pointer'

describe('PPopover', () => {
  // Define constants for drag and resize tests
  const dragHandleClass = '.polly-popover__grabber'
  const dragHandleIconClass = '.polly-popover__grabber-handle'

  describe('Basic Rendering', () => {
    it('renders basic popover structure', () => {
      cy.mount(PPopover, {
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(targetClass).should('exist')
      cy.get(contentContainerClass).should('exist')
    })

    it('renders target slot content', () => {
      cy.mount(PPopover, {
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').should('contain.text', 'Click me')
    })

    it('supports all slot content', () => {
      cy.mount(PPopover, {
        slots: {
          target: '<button>Click me</button>',
          header: 'Header content',
          default: 'Body content',
          actions: 'Action buttons',
          footer: 'Footer content',
        },
      })

      cy.get(targetClass).find('button').click()
      cy.get(headerClass).should('contain.text', 'Header content')
      cy.get(bodyClass).should('contain.text', 'Body content')
      cy.get(actionsClass).should('contain.text', 'Action buttons')
      cy.get(footerClass).should('contain.text', 'Footer content')
    })
  })

  describe('Positioning', () => {
    const positions = [
      'bottom-left',
      'bottom-right',
      'bottom-stretch',
      'top-left',
      'top-right',
      'top-stretch',
      'left-center',
      'right-center',
      'bottom-center',
      'top-center',
    ] as const

    positions.forEach((position) => {
      it(`supports ${position} position`, () => {
        cy.mount(PPopover, {
          props: {
            position,
          },
          slots: {
            target: '<button>Click me</button>',
            default: 'Popover content',
          },
        })
        cy.get(targetClass).find('button').click()
        cy.get(contentContainerClass).should('have.class', `polly-popover__content-container--${position}`)
      })
    })

    it('supports custom positioning function', () => {
      const customPosition = () => ({
        left: '100px',
        top: '100px',
      })

      cy.mount(PPopover, {
        props: {
          position: customPosition,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('have.css', 'left', '100px')
      cy.get(contentContainerClass).should('have.css', 'top', '100px')
    })
  })

  describe('Triggers', () => {
    it('supports click trigger', () => {
      cy.mount(PPopover, {
        props: {
          triggers: ['click'],
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(contentContainerClass).should('not.be.visible')
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('be.visible')
    })

    it('supports hover trigger', () => {
      cy.mount(PPopover, {
        props: {
          triggers: ['hover'],
        },
        slots: {
          target: '<button>Hover me</button>',
          default: 'Popover content',
        },
      })
      cy.get(contentContainerClass).should('not.be.visible')
      cy.get(targetClass).find('button').trigger('mouseenter')
      cy.get(contentContainerClass).should('be.visible')
      cy.get(targetClass).find('button').trigger('mouseleave')
      cy.get(contentContainerClass).should('not.be.visible')
    })

    it('supports focus trigger', () => {
      cy.mount(PPopover, {
        props: {
          triggers: ['focus'],
        },
        slots: {
          target: '<button>Focus me</button>',
          default: 'Popover content',
        },
      })
      cy.get(contentContainerClass).should('not.be.visible')
      cy.get(targetClass).find('button').focus()
      cy.get(contentContainerClass).should('be.visible')
      cy.get(targetClass).find('button').blur()
      cy.get(contentContainerClass).should('not.be.visible')
    })
  })

  describe('Variants', () => {
    it('supports dark variant', () => {
      cy.mount(PPopover, {
        props: {
          variant: 'dark',
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('have.class', 'polly-popover__content-container--dark')
    })

    it('supports light variant', () => {
      cy.mount(PPopover, {
        props: {
          variant: 'light',
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('have.class', 'polly-popover__content-container--light')
    })
  })

  describe('Pointer', () => {
    it('shows pointer when enabled', () => {
      cy.mount(PPopover, {
        props: {
          showPointer: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(pointerClass).should('exist')
    })

    it('hides pointer when disabled', () => {
      cy.mount(PPopover, {
        props: {
          showPointer: false,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(pointerClass).should('not.exist')
    })
  })

  describe('Manual Mode', () => {
    it('supports manual control', () => {
      cy.mount(PPopover, {
        props: {
          isOpen: false,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(contentContainerClass).should('not.be.visible')

      cy.mount(PPopover, {
        props: {
          isOpen: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(contentContainerClass).should('be.visible')
    })

    it('emits update:isOpen event', () => {
      const onUpdate = cy.spy().as('onUpdate')
      cy.mount(PPopover, {
        props: {
          manual: true,
          isOpen: true,
          'onUpdate:isOpen': onUpdate,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get('body').click()
      cy.get('@onUpdate').should('have.been.calledWith', false)
    })
  })

  describe('Target Element Configuration', () => {
    it('uses targetElement prop when provided', () => {
      // Create an external button element
      cy.document().then((doc) => {
        const externalButton = doc.createElement('button')
        externalButton.id = 'external-button'
        externalButton.textContent = 'External Button'
        doc.body.appendChild(externalButton)

        cy.mount(PPopover, {
          props: {
            targetElement: externalButton,
            triggers: ['click'],
          },
          slots: {
            default: 'Popover content',
          },
        })

        // Verify popover opens when clicking external button
        cy.get('#external-button').click()
        cy.get(contentContainerClass).should('be.visible')

        // Clean up
        cy.then(() => {
          doc.body.removeChild(externalButton)
        })
      })
    })

    it('uses targetId when targetElement is not provided', () => {
      // Create an external button element with ID
      cy.document().then((doc) => {
        const externalButton = doc.createElement('button')
        externalButton.id = 'target-by-id'
        externalButton.textContent = 'Target by ID'
        doc.body.appendChild(externalButton)

        cy.mount(PPopover, {
          props: {
            targetId: 'target-by-id',
            triggers: ['click'],
          },
          slots: {
            default: 'Popover content',
          },
        })

        // Verify popover opens when clicking external button by ID
        cy.get('#target-by-id').click()
        cy.get(contentContainerClass).should('be.visible')

        // Clean up
        cy.then(() => {
          doc.body.removeChild(externalButton)
        })
      })
    })

    it('falls back to internal target when neither targetElement nor targetId is provided', () => {
      cy.mount(PPopover, {
        props: {
          triggers: ['click'],
        },
        slots: {
          target: '<button>Internal Button</button>',
          default: 'Popover content',
        },
      })

      // Verify popover opens when clicking internal button
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('be.visible')
    })

    it('prioritizes targetElement over targetId when both are provided', () => {
      cy.document().then((doc) => {
        // Create two external buttons
        const targetElementButton = doc.createElement('button')
        targetElementButton.id = 'target-element-button'
        targetElementButton.textContent = 'Target Element Button'
        doc.body.appendChild(targetElementButton)

        const targetIdButton = doc.createElement('button')
        targetIdButton.id = 'target-id-button'
        targetIdButton.textContent = 'Target ID Button'
        doc.body.appendChild(targetIdButton)

        cy.mount(PPopover, {
          props: {
            targetElement: targetElementButton,
            targetId: 'target-id-button',
            triggers: ['click'],
          },
          slots: {
            default: 'Popover content',
          },
        })

        // Verify popover opens only for targetElement and not for targetId
        cy.get('#target-id-button').click()
        cy.get(contentContainerClass).should('not.be.visible')

        cy.get('#target-element-button').click()
        cy.get(contentContainerClass).should('be.visible')

        // Clean up
        cy.then(() => {
          doc.body.removeChild(targetElementButton)
          doc.body.removeChild(targetIdButton)
        })
      })
    })

    it('handles hover trigger with targetElement', () => {
      cy.document().then((doc) => {
        const externalButton = doc.createElement('button')
        externalButton.id = 'hover-target'
        externalButton.textContent = 'Hover Target'
        doc.body.appendChild(externalButton)

        cy.mount(PPopover, {
          props: {
            targetElement: externalButton,
            triggers: ['hover'],
          },
          slots: {
            default: 'Popover content',
          },
        })

        // Verify popover opens on hover
        cy.get('#hover-target').trigger('mouseenter')
        cy.get(contentContainerClass).should('be.visible')

        // Verify popover closes on mouse leave
        cy.get('#hover-target').trigger('mouseleave')
        cy.get(contentContainerClass).should('not.be.visible')

        // Clean up
        cy.then(() => {
          doc.body.removeChild(externalButton)
        })
      })
    })

    it('handles focus trigger with targetElement', () => {
      cy.document().then((doc) => {
        const externalInput = doc.createElement('input')
        externalInput.id = 'focus-target'
        externalInput.type = 'text'
        externalInput.placeholder = 'Focus Target'
        doc.body.appendChild(externalInput)

        cy.mount(PPopover, {
          props: {
            targetElement: externalInput,
            triggers: ['focus'],
          },
          slots: {
            default: 'Popover content',
          },
        })

        // Verify popover opens on focus
        cy.get('#focus-target').focus()
        cy.get(contentContainerClass).should('be.visible')

        // Verify popover closes on blur
        cy.get('#focus-target').blur()
        cy.get(contentContainerClass).should('not.be.visible')

        // Clean up
        cy.then(() => {
          doc.body.removeChild(externalInput)
        })
      })
    })
  })

  describe('Accessibility', () => {
    it('uses provided popover ID', () => {
      const popoverId = 'custom-popover-id'
      cy.mount(PPopover, {
        props: {
          popoverId,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(contentContainerClass).should('have.attr', 'id', popoverId)
    })

    it('generates random ID when not provided', () => {
      cy.mount(PPopover, {
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(contentContainerClass)
        .should('have.attr', 'id')
        .and('match', /^[a-z0-9-]+$/)
    })

    it('positions correctly relative to targetElement', () => {
      cy.document().then((doc) => {
        const externalButton = doc.createElement('button')
        externalButton.id = 'positioned-target'
        externalButton.textContent = 'Positioned Target'
        externalButton.style.position = 'absolute'
        externalButton.style.top = '100px'
        externalButton.style.left = '200px'
        externalButton.style.width = '100px'
        externalButton.style.height = '40px'
        doc.body.appendChild(externalButton)

        cy.mount(PPopover, {
          props: {
            targetElement: externalButton,
            position: 'bottom-left',
            triggers: ['click'],
          },
          slots: {
            default: 'Popover content',
          },
        })

        // Open popover
        cy.get('#positioned-target').click()
        cy.get(contentContainerClass).should('be.visible')

        // Verify positioning relative to external element
        cy.get(contentContainerClass).then(($content) => {
          cy.get('#positioned-target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // For bottom-left position, content should be below and aligned to left of target
            expect(contentRect.top).to.be.greaterThan(targetRect.bottom - 10) // Allow some margin
            expect(contentRect.left).to.be.closeTo(targetRect.left, 10)
          })
        })

        // Clean up
        cy.then(() => {
          doc.body.removeChild(externalButton)
        })
      })
    })

    it('handles custom position function with targetElement', () => {
      cy.document().then((doc) => {
        const externalButton = doc.createElement('button')
        externalButton.id = 'custom-position-target'
        externalButton.textContent = 'Custom Position Target'
        externalButton.style.position = 'absolute'
        externalButton.style.top = '150px'
        externalButton.style.left = '250px'
        doc.body.appendChild(externalButton)

        const customPosition = (target: HTMLElement) => {
          const targetRect = target.getBoundingClientRect()
          return {
            position: 'fixed',
            top: `${targetRect.top - 50}px`,
            left: `${targetRect.right + 10}px`,
          }
        }

        cy.mount(PPopover, {
          props: {
            targetElement: externalButton,
            position: customPosition,
            triggers: ['click'],
          },
          slots: {
            default: 'Popover content',
          },
        })

        // Open popover
        cy.get('#custom-position-target').click()
        cy.get(contentContainerClass).should('be.visible')

        // Verify custom positioning
        cy.get(contentContainerClass).then(($content) => {
          cy.get('#custom-position-target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // Content should be positioned according to custom function
            // Allow for some variance due to popover positioning logic
            expect(contentRect.top).to.be.closeTo(targetRect.top - 50, 25)
            expect(contentRect.left).to.be.closeTo(targetRect.right + 10, 25)
          })
        })

        // Clean up
        cy.then(() => {
          doc.body.removeChild(externalButton)
        })
      })
    })

    it('handles null targetElement gracefully', () => {
      cy.mount(PPopover, {
        props: {
          targetElement: null,
          triggers: ['click'],
        },
        slots: {
          target: '<button>Internal Button</button>',
          default: 'Popover content',
        },
      })

      // Should fall back to internal target (internal slot works only because targetElement is null)
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('be.visible')
    })

    it('handles undefined targetElement gracefully', () => {
      cy.mount(PPopover, {
        props: {
          targetElement: undefined,
          triggers: ['click'],
        },
        slots: {
          target: '<button>Internal Button</button>',
          default: 'Popover content',
        },
      })

      // Should fall back to internal target
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('be.visible')
    })

    it('handles targetElement that is not in DOM', () => {
      // Create element but don't add to DOM
      const orphanElement = document.createElement('button')
      orphanElement.textContent = 'Orphan Button'

      cy.mount(PPopover, {
        props: {
          targetElement: orphanElement,
          triggers: ['click'],
        },
        slots: {
          target: '<button>Internal Button</button>',
          default: 'Popover content',
        },
      })

      // Should still work with the orphan element
      // Note: This tests that the component doesn't crash, positioning might not work correctly
      cy.get('.polly-popover').should('exist')
    })

    it('works with targetElement that has no dimensions', () => {
      cy.document().then((doc) => {
        const hiddenElement = doc.createElement('div')
        hiddenElement.id = 'hidden-target'
        hiddenElement.style.display = 'none'
        doc.body.appendChild(hiddenElement)

        cy.mount(PPopover, {
          props: {
            targetElement: hiddenElement,
            triggers: ['click'],
            manual: true, // Use manual mode since hidden elements can't be clicked
            isOpen: true,
          },
          slots: {
            target: '<button>Internal Button</button>',
            default: 'Popover content',
          },
        })

        // Popover should still render even with hidden target
        cy.get(contentContainerClass).should('be.visible')

        // Clean up
        cy.then(() => {
          doc.body.removeChild(hiddenElement)
        })
      })
    })

    it('updates triggers when targetElement changes', () => {
      cy.document().then((doc) => {
        const button1 = doc.createElement('button')
        button1.id = 'button-1'
        button1.textContent = 'Button 1'
        doc.body.appendChild(button1)

        const button2 = doc.createElement('button')
        button2.id = 'button-2'
        button2.textContent = 'Button 2'
        doc.body.appendChild(button2)

        // Mount with first button as target
        cy.mount(PPopover, {
          props: {
            targetElement: button1,
            triggers: ['click'],
          },
          slots: {
            target: '<button>Internal Button</button>',
            default: 'Popover content',
          },
        })

        // Verify first button works
        cy.get('#button-1').click()
        cy.get(contentContainerClass).should('be.visible')

        // Close popover
        cy.get('body').click()
        cy.get(contentContainerClass).should('not.be.visible')

        // Update targetElement prop to second button
        cy.get('.polly-popover').then(() => {
          // This simulates updating the prop - in a real app this would be done by the parent component
          // For testing purposes, we'll remount with the new target
          cy.mount(PPopover, {
            props: {
              targetElement: button2,
              triggers: ['click'],
            },
            slots: {
              target: '<button>Internal Button</button>',
              default: 'Popover content',
            },
          })

          // Verify first button no longer works
          cy.get('#button-1').click()
          cy.get(contentContainerClass).should('not.be.visible')

          // Verify second button now works
          cy.get('#button-2').click()
          cy.get(contentContainerClass).should('be.visible')

          // Clean up
          cy.then(() => {
            doc.body.removeChild(button1)
            doc.body.removeChild(button2)
          })
        })
      })
    })
  })

  describe('Dragging and Resizing', () => {
    it('adds draggable class when draggable prop is true', () => {
      cy.mount(PPopover, {
        props: {
          draggable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('have.class', 'polly-popover__content-container--draggable')
    })

    it('shows drag handle when draggable is true', () => {
      cy.mount(PPopover, {
        props: {
          draggable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(dragHandleClass).should('exist')
      cy.get(dragHandleIconClass).should('exist')
    })

    it('adds resizable class when resizable prop is true', () => {
      cy.mount(PPopover, {
        props: {
          resizable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(contentContainerClass).should('have.class', 'polly-popover__content-container--resizable')
    })

    it('supports dragging functionality', () => {
      cy.mount(PPopover, {
        props: {
          draggable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Get initial position
      cy.get(contentContainerClass).then(($el) => {
        const initialRect = $el[0].getBoundingClientRect()

        // Start drag from the center of the drag handle
        cy.get(dragHandleClass).trigger('mousedown', {
          button: 0,
          clientX: initialRect.left,
          clientY: initialRect.top,
        })

        // Move mouse relative to initial position
        cy.get(dragHandleClass).trigger('mousemove', {
          clientX: initialRect.left + 100,
          clientY: initialRect.top + 100,
        })

        cy.get(dragHandleClass).trigger('mouseup')

        // Verify position changed
        cy.get(contentContainerClass).then(($newEl) => {
          const newRect = $newEl[0].getBoundingClientRect()
          expect(newRect.left).to.not.equal(initialRect.left)
          expect(newRect.top).to.not.equal(initialRect.top)
        })
      })
    })

    it('supports resizing functionality', () => {
      cy.mount(PPopover, {
        props: {
          resizable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Get initial size
      cy.get(contentContainerClass).then(($el) => {
        const initialRect = $el[0].getBoundingClientRect()
        const initialWidth = initialRect.width
        const initialHeight = initialRect.height

        // Resize from the bottom-right corner (se direction)
        cy.get(contentContainerClass)
          .trigger('mousedown', { clientX: initialRect.right - 5, clientY: initialRect.bottom - 5 })
          .trigger('mousemove', { clientX: initialRect.right + 50, clientY: initialRect.bottom + 30 })
          .trigger('mouseup')

        // Verify size changed
        cy.get(contentContainerClass).then(($newEl) => {
          const newRect = $newEl[0].getBoundingClientRect()
          expect(newRect.width).to.be.greaterThan(initialWidth)
          expect(newRect.height).to.be.greaterThan(initialHeight)
        })
      })
    })

    it('adds dragging class during drag operations', () => {
      cy.mount(PPopover, {
        props: {
          draggable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Start dragging but don't release yet
      cy.get(dragHandleClass).trigger('mousedown', { button: 0 })

      // Check for dragging class
      cy.get(contentContainerClass).should('have.class', 'polly-popover__content-container--dragging')

      // Complete the drag operation
      cy.get(dragHandleClass).trigger('mouseup')
    })

    it('adds resizing class during resize operations', () => {
      cy.mount(PPopover, {
        props: {
          resizable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Get the element's position
      cy.get(contentContainerClass).then(($el) => {
        const rect = $el[0].getBoundingClientRect()

        // Start resizing from the bottom-right corner
        cy.get(contentContainerClass).trigger('mousedown', { clientX: rect.right - 5, clientY: rect.bottom - 5 })

        // Check for resizing class
        cy.get(contentContainerClass).should('have.class', 'polly-popover__content-container--resizing')

        // Complete the resize operation
        cy.get(contentContainerClass).trigger('mouseup')
      })
    })

    it('hides pointer when draggable is true', () => {
      cy.mount(PPopover, {
        props: {
          draggable: true,
          showPointer: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()
      cy.get(pointerClass).should('not.exist')
    })

    it('prevents closing immediately after drag operation', () => {
      cy.mount(PPopover, {
        props: {
          draggable: true,
          triggers: ['click'],
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Perform drag operation
      cy.get(dragHandleClass).trigger('mousedown', { button: 0 }).trigger('mousemove', { clientX: 100, clientY: 100 }).trigger('mouseup')

      // Verify the popover is still open
      cy.get(contentContainerClass).should('be.visible')

      // Click outside immediately after drag ends - this should be prevented
      cy.get('body').click({ force: true })

      // Popover should still be visible (not closed)
      cy.get(contentContainerClass).should('be.visible')

      // Wait for the delay to pass and then click again
      cy.wait(300)
      cy.get('body').click({ force: true })

      // Popover should now be closed
      cy.get(contentContainerClass).should('not.be.visible')
    })

    it('disables dragging during resize operations', () => {
      cy.mount(PPopover, {
        props: {
          draggable: true,
          resizable: true,
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Get the element's position
      cy.get(contentContainerClass).then(($el) => {
        const rect = $el[0].getBoundingClientRect()
        const initialPosition = { left: rect.left, top: rect.top }

        // Start resizing from the bottom-right corner
        cy.get(contentContainerClass).trigger('mousedown', { clientX: rect.right - 5, clientY: rect.bottom - 5 })

        // Try to drag while resizing is active
        cy.get(dragHandleClass).trigger('mousedown', { button: 0, force: true })
        cy.get(dragHandleClass).trigger('mousemove', { clientX: initialPosition.left + 100, clientY: initialPosition.top + 50, force: true })
        cy.get(dragHandleClass).trigger('mouseup', { force: true })

        // Complete the resize operation
        cy.get(contentContainerClass).trigger('mouseup')

        // Verify position hasn't changed significantly (dragging was disabled during resize)
        cy.get(contentContainerClass).then(($newEl) => {
          const newRect = $newEl[0].getBoundingClientRect()
          // Allow for small variations due to resize operation
          expect(Math.abs(newRect.left - initialPosition.left)).to.be.lessThan(50)
          expect(Math.abs(newRect.top - initialPosition.top)).to.be.lessThan(50)
        })
      })
    })

    it('respects minWidth and maxWidth resize options', () => {
      cy.mount(PPopover, {
        props: {
          resizable: true,
          resizeOptions: {
            minWidth: createUnitValue(200, 'px'),
            maxWidth: createUnitValue(400, 'px'),
            minHeight: createUnitValue(200, 'px'),
            maxHeight: createUnitValue(400, 'px'),
          },
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Get initial size
      cy.get(contentContainerClass).then(($el) => {
        const initialRect = $el[0].getBoundingClientRect()

        // Try to resize smaller than minWidth
        cy.get(contentContainerClass)
          .trigger('mousedown', { clientX: initialRect.right - 5, clientY: initialRect.bottom - 5 })
          .trigger('mousemove', { clientX: initialRect.left + 100, clientY: initialRect.bottom })
          .trigger('mouseup')

        // Verify width is not smaller than minWidth
        cy.get(contentContainerClass).invoke('width').should('be.gte', 200)

        // Try to resize larger than maxWidth
        cy.get(contentContainerClass)
          .trigger('mousedown', { clientX: initialRect.right - 5, clientY: initialRect.bottom - 5 })
          .trigger('mousemove', { clientX: initialRect.left + 500, clientY: initialRect.bottom })
          .trigger('mouseup')

        // Verify width is not larger than maxWidth
        cy.get(contentContainerClass).invoke('width').should('be.lte', 400)
      })
    })

    it('respects minHeight and maxHeight resize options', () => {
      cy.mount(PPopover, {
        props: {
          resizable: true,
          resizeOptions: {
            minWidth: createUnitValue(200, 'px'),
            maxWidth: createUnitValue(400, 'px'),
            minHeight: createUnitValue(200, 'px'),
            maxHeight: createUnitValue(400, 'px'),
          },
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Get initial size
      cy.get(contentContainerClass).then(($el) => {
        const initialRect = $el[0].getBoundingClientRect()

        // Try to resize smaller than minHeight
        cy.get(contentContainerClass)
          .trigger('mousedown', { clientX: initialRect.right - 5, clientY: initialRect.bottom - 5 })
          .trigger('mousemove', { clientX: initialRect.right, clientY: initialRect.top + 50 })
          .trigger('mouseup')

        // Verify height is not smaller than minHeight
        cy.get(contentContainerClass).invoke('height').should('be.gte', 100)

        // Try to resize larger than maxHeight
        cy.get(contentContainerClass)
          .trigger('mousedown', { clientX: initialRect.right - 5, clientY: initialRect.bottom - 5 })
          .trigger('mousemove', { clientX: initialRect.right, clientY: initialRect.top + 400 })
          .trigger('mouseup')

        // Verify height is not larger than maxHeight
        cy.get(contentContainerClass).invoke('height').should('be.lte', 300)
      })
    })

    it('applies all resize constraints simultaneously', () => {
      cy.mount(PPopover, {
        props: {
          resizable: true,
          resizeOptions: {
            minWidth: createUnitValue(200, 'px'),
            maxWidth: createUnitValue(400, 'px'),
            minHeight: createUnitValue(100, 'px'),
            maxHeight: createUnitValue(300, 'px'),
          },
        },
        slots: {
          target: '<button>Click me</button>',
          default: 'Popover content',
        },
      })
      cy.get(targetClass).find('button').click()

      // Get initial size
      cy.get(contentContainerClass).then(($el) => {
        const initialRect = $el[0].getBoundingClientRect()

        // Try to resize beyond all constraints
        cy.get(contentContainerClass)
          .trigger('mousedown', { clientX: initialRect.right - 5, clientY: initialRect.bottom - 5 })
          .trigger('mousemove', { clientX: initialRect.left + 500, clientY: initialRect.top + 400 })
          .trigger('mouseup')

        // Verify all constraints are respected
        cy.get(contentContainerClass).then(($newEl) => {
          expect($newEl.width()).to.be.lte(400)
          expect($newEl.width()).to.be.gte(200)
          expect($newEl.height()).to.be.lte(300)
          expect($newEl.height()).to.be.gte(100)
        })
      })
    })
  })

  describe('Auto Positioning', () => {
    it('flips from bottom-left to top when near bottom of viewport', () => {
      // Use a small viewport
      cy.viewport(500, 300)

      // Mount using render function with h()
      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'height: 400px; padding-top: 250px;' }, [
              h(
                PPopover,
                { props: { position: 'bottom-left' } },
                {
                  target: () => h('button', 'Click me'),
                  default: () => h('div', { style: 'width: 200px; height: 100px;' }, 'Popover content'),
                }
              ),
            ])
          },
        })
      )

      // Wait for component to be rendered
      cy.get('.polly-popover').should('exist')

      // Click to open the popover
      cy.get('.polly-popover__target').find('button').click()

      cy.scrollTo(0, 0)

      // Check that the content is positioned above the target instead of below
      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          cy.get('.polly-popover__target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // If flipped, content bottom should be near target top
            // or content should be above target
            expect(contentRect.bottom).to.be.lessThan(targetRect.bottom)
            expect(contentRect.top).to.be.lessThan(targetRect.top)
          })
        })
    })

    it('flips from bottom-right to top when near bottom of viewport', () => {
      cy.viewport(500, 300)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'height: 400px; padding-top: 250px;' }, [
              h(
                PPopover,
                { props: { position: 'bottom-right' } },
                {
                  target: () => h('button', 'Click me'),
                  default: () => h('div', { style: 'width: 200px; height: 100px;' }, 'Popover content'),
                }
              ),
            ])
          },
        })
      )

      // Wait for component to be rendered
      cy.get('.polly-popover').should('exist')

      cy.get('.polly-popover__target').find('button').click()

      cy.scrollTo(0, 0)
      // Check that the content is positioned above the target instead of below
      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          cy.get('.polly-popover__target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // If flipped, content should be above target
            expect(contentRect.bottom).to.be.lessThan(targetRect.bottom)
            expect(contentRect.top).to.be.lessThan(targetRect.top)
          })
        })
    })

    it('flips from top-left to bottom when near top of viewport', () => {
      cy.viewport(500, 300)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-top: 5px;' }, [
              h(
                PPopover,
                { props: { position: 'top-left' } },
                {
                  target: () => h('button', 'Click me'),
                  default: () => h('div', { style: 'width: 200px; height: 100px;' }, 'Popover content'),
                }
              ),
            ])
          },
        })
      )

      // Wait for component to be rendered
      cy.get('.polly-popover').should('exist')

      cy.get('.polly-popover__target').find('button').click()

      // Check that the content is positioned below the target instead of above
      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          cy.get('.polly-popover__target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // If flipped, content should be below target
            expect(contentRect.top).to.be.greaterThan(targetRect.top)
            expect(contentRect.bottom).to.be.greaterThan(targetRect.bottom)
          })
        })
    })

    it('flips from top-right to bottom when near top of viewport', () => {
      cy.viewport(500, 300)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-top: 5px;' }, [
              h(
                PPopover,
                { props: { position: 'top-right' } },
                {
                  target: () => h('button', 'Click me'),
                  default: () => h('div', { style: 'width: 200px; height: 100px;' }, 'Popover content'),
                }
              ),
            ])
          },
        })
      )

      // Wait for component to be rendered
      cy.get('.polly-popover').should('exist')

      cy.get('.polly-popover__target').find('button').click()

      // Check that the content is positioned below the target instead of above
      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          cy.get('.polly-popover__target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // If flipped, content should be below target
            expect(contentRect.top).to.be.greaterThan(targetRect.top)
            expect(contentRect.bottom).to.be.greaterThan(targetRect.bottom)
          })
        })
    })

    it('when the popover is near the bottom of the screen, flips from bottom to top', () => {
      cy.viewport(500, 300)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', [
              h(
                PPopover,
                { props: { position: 'bottom-left' }, style: 'bottom: 50px; position: absolute;' },
                {
                  target: () => h('button', 'Click me'),
                  default: () => h('div', { style: 'width: 200px; height: 100px;' }, 'Popover content'),
                }
              ),
            ])
          },
        })
      )

      // Wait for component to be rendered
      cy.get('.polly-popover').should('exist')

      cy.get('.polly-popover__target').find('button').click()

      // Check that the content is positioned above the target instead of below
      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          cy.get('.polly-popover__target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // If flipped, content should be above target
            expect(contentRect.bottom).to.be.lessThan(targetRect.bottom)
            expect(contentRect.top).to.be.lessThan(targetRect.top)
          })
        })
    })

    it('flips from bottom-center to top when near bottom of viewport', () => {
      cy.viewport(500, 300)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'height: 400px; padding-top: 250px;' }, [
              h(
                PPopover,
                { props: { position: 'bottom-center' } },
                {
                  target: () => h('button', 'Click me'),
                  default: () => h('div', { style: 'width: 200px; height: 100px;' }, 'Popover content'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover').should('exist')
      cy.get('.polly-popover__target').find('button').click()
      cy.scrollTo(0, 0)

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          cy.get('.polly-popover__target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // If flipped, content should be above target
            expect(contentRect.bottom).to.be.lessThan(targetRect.bottom)
            expect(contentRect.top).to.be.lessThan(targetRect.top)
          })
        })
    })

    it('flips from top-center to bottom when near top of viewport', () => {
      cy.viewport(500, 300)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-top: 5px;' }, [
              h(
                PPopover,
                { props: { position: 'top-center' } },
                {
                  target: () => h('button', 'Click me'),
                  default: () => h('div', { style: 'width: 200px; height: 100px;' }, 'Popover content'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover').should('exist')
      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          cy.get('.polly-popover__target').then(($target) => {
            const contentRect = $content[0].getBoundingClientRect()
            const targetRect = $target[0].getBoundingClientRect()

            // If flipped, content should be below target
            expect(contentRect.top).to.be.greaterThan(targetRect.top)
            expect(contentRect.bottom).to.be.greaterThan(targetRect.bottom)
          })
        })
    })
  })

  describe.only('Viewport Containment', () => {
    it('prevents popover from overflowing left edge of viewport', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-left: 5px; padding-top: 100px;' }, [
              h(
                PPopover,
                { position: 'bottom-left' },
                {
                  target: () => h('button', { style: 'width: 50px;' }, 'Click'),
                  default: () => h('div', { style: 'width: 300px; height: 100px;' }, 'Wide popover content'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.left).to.be.at.least(0)
        })
    })

    it('prevents popover from overflowing right edge of viewport', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-left: 750px; padding-top: 100px;' }, [
              h(
                PPopover,
                { position: 'bottom-left' },
                {
                  target: () => h('button', { style: 'width: 50px;' }, 'Click'),
                  default: () => h('div', { style: 'width: 300px; height: 100px;' }, 'Wide popover content'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.right).to.be.at.most(800)
        })
    })

    it('prevents popover from overflowing top edge of viewport', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-top: 5px; padding-left: 100px;' }, [
              h(
                PPopover,
                { position: 'top-left' },
                {
                  target: () => h('button', 'Click'),
                  default: () => h('div', { style: 'width: 200px; height: 150px;' }, 'Tall popover content'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.top).to.be.at.least(0)
        })
    })

    it('prevents popover from overflowing bottom edge of viewport', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-top: 500px; padding-left: 100px;' }, [
              h(
                PPopover,
                { position: 'bottom-left' },
                {
                  target: () => h('button', 'Click'),
                  default: () => h('div', { style: 'width: 200px; height: 150px;' }, 'Tall popover content'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.bottom).to.be.at.most(600)
        })
    })

    it('prevents center-positioned popover from overflowing left edge', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-left: 50px; padding-top: 100px;' }, [
              h(
                PPopover,
                { position: 'bottom-center' },
                {
                  target: () => h('button', { style: 'width: 50px;' }, 'Click'),
                  default: () => h('div', { style: 'width: 400px; height: 100px;' }, 'Wide centered popover'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.left).to.be.at.least(0)
          expect(contentRect.right).to.be.at.most(800)
        })
    })

    it('prevents center-positioned popover from overflowing right edge', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-left: 750px; padding-top: 100px;' }, [
              h(
                PPopover,
                { position: 'top-center' },
                {
                  target: () => h('button', { style: 'width: 50px;' }, 'Click'),
                  default: () => h('div', { style: 'width: 400px; height: 100px;' }, 'Wide centered popover'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.left).to.be.at.least(0)
          expect(contentRect.right).to.be.at.most(800)
        })
    })

    it('prevents left-center popover from overflowing top and bottom edges', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-left: 400px; padding-top: 50px;' }, [
              h(
                PPopover,
                { position: 'left-center' },
                {
                  target: () => h('button', { style: 'height: 50px;' }, 'Click'),
                  default: () => h('div', { style: 'width: 200px; height: 500px;' }, 'Tall left popover'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.top).to.be.at.least(0)
          expect(contentRect.bottom).to.be.at.most(600)
        })
    })

    it('keeps popover fully visible when target is at viewport corner', () => {
      cy.viewport(800, 600)

      cy.mount(
        defineComponent({
          components: { PPopover },
          render() {
            return h('div', { style: 'padding-left: 5px; padding-top: 5px;' }, [
              h(
                PPopover,
                { position: 'bottom-left' },
                {
                  target: () => h('button', { style: 'width: 30px; height: 30px;' }, 'X'),
                  default: () => h('div', { style: 'width: 300px; height: 200px;' }, 'Corner popover'),
                }
              ),
            ])
          },
        })
      )

      cy.get('.polly-popover__target').find('button').click()

      cy.get('.polly-popover__content-container')
        .should('be.visible')
        .then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          expect(contentRect.left).to.be.at.least(0)
          expect(contentRect.right).to.be.at.most(800)
          expect(contentRect.top).to.be.at.least(0)
          expect(contentRect.bottom).to.be.at.most(600)
        })
    })
  })
})
