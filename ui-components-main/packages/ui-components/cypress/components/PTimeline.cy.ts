import PTimeline from '@/components/timeline/PTimeline.vue'

const baseClass = '.polly-timeline'
const itemClass = '.polly-timeline-item'
const headerClass = '.polly-timeline-item__header'
const contentClass = '.polly-timeline-item__content'

describe('PTimeline', () => {
  describe('Basic Rendering', () => {
    it('renders timeline with basic items', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(itemClass).should('have.length', 2)
      cy.get(headerClass).first().should('contain.text', 'Event 1')
      cy.get(headerClass).last().should('contain.text', 'Event 2')
    })

    it('renders timeline with empty items array', () => {
      cy.mount(PTimeline, {
        props: {
          items: [],
        },
      })
      cy.get(baseClass).should('exist')
      cy.get(itemClass).should('have.length', 0)
    })
  })

  describe('Multiple Items Open (Default Behavior)', () => {
    it('allows multiple items to be open simultaneously', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: false,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
            { title: 'Event 3', subtitle: 'Third milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).click()
      cy.wait(200)
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).click()
      cy.wait(200)
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')

      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')
    })

    it('allows closing an open item without affecting others', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: false,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).click()
      cy.wait(200)
      cy.get(headerClass).eq(1).click()
      cy.wait(200)
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(0).click()
      cy.wait(200)
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')
    })
  })

  describe('Single Open Mode', () => {
    it('only allows one item to be open at a time', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: true,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
            { title: 'Event 3', subtitle: 'Third milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).click()
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).click()
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(2).click()
      cy.get(itemClass).eq(1).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(2).should('have.class', 'polly-timeline-item--open')
    })

    it('closes the open item when clicked again', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: true,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).click()
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(0).click()
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
    })
  })

  describe('Disabled Items', () => {
    it('does not open disabled items', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone', disabled: true },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).click({ force: true })
      cy.wait(200)
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).click()
      cy.wait(200)
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')
    })

    it('does not open disabled items with custom slots', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone', disabled: true },
            { title: 'Event 2', subtitle: 'Second milestone', disabled: false },
          ],
        },
        slots: {
          default: `
            <template #default="{ items }">
              <p-timeline-item
                v-for="item in items"
                :key="item.title"
                :disabled="item.disabled"
              >
                <template #header>
                  <div>{{ item.title }}</div>
                </template>
                <template #content>
                  <div>{{ item.subtitle }}</div>
                </template>
              </p-timeline-item>
            </template>
          `,
        },
      })

      cy.get(headerClass).eq(0).should('have.attr', 'aria-disabled', 'true')
      cy.get(headerClass).eq(0).click({ force: true })
      cy.wait(200)
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).click()
      cy.wait(200)
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')
    })

    it('handles single-open with disabled items', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: true,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone', disabled: true },
            { title: 'Event 3', subtitle: 'Third milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).click()
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).click({ force: true })
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('not.have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(2).click()
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(2).should('have.class', 'polly-timeline-item--open')
    })
  })

  describe('Custom Slotted Items', () => {
    it('renders with custom slotted items', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
        slots: {
          default: `
            <template #default="{ items }">
              <p-timeline-item
                v-for="item in items"
                :key="item.title"
              >
                <template #header>
                  <div class="custom-header">{{ item.title }}</div>
                </template>
                <template #content>
                  <div class="custom-content">{{ item.subtitle }}</div>
                </template>
              </p-timeline-item>
            </template>
          `,
        },
      })

      cy.get('.custom-header').should('have.length', 2)
      cy.get('.custom-header').first().should('contain.text', 'Event 1')

      cy.get(headerClass).first().click()
      cy.get('.custom-content').first().should('be.visible')
    })

    it('allows multiple open items with custom slots when singleOpen is false', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
        slots: {
          default: `
            <template #default="{ items }">
              <p-timeline-item
                v-for="item in items"
                :key="item.title"
              >
                <template #header>
                  <div>{{ item.title }}</div>
                </template>
                <template #content>
                  <div>{{ item.subtitle }}</div>
                </template>
              </p-timeline-item>
            </template>
          `,
        },
      })

      cy.get(headerClass).eq(0).click()
      cy.get(headerClass).eq(1).click()

      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')
    })

    it('uses isOpen and setOpen for single-open with custom slots', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: true,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
            { title: 'Event 3', subtitle: 'Third milestone' },
          ],
        },
        slots: {
          default: `
            <template #default="{ items, isOpen, setOpen }">
              <p-timeline-item
                v-for="(item, index) in items"
                :key="item.title"
                :open="isOpen(index)"
                @update:open="(value) => setOpen(index, value)"
              >
                <template #header>
                  <div>{{ item.title }}</div>
                </template>
                <template #content>
                  <div>{{ item.subtitle }}</div>
                </template>
              </p-timeline-item>
            </template>
          `,
        },
      })

      cy.get(headerClass).eq(0).click()
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).click()
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(2).click()
      cy.get(itemClass).eq(1).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(2).should('have.class', 'polly-timeline-item--open')
    })
  })

  describe('Items Without Content', () => {
    it('renders non-interactive items without content slot', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
        slots: {
          default: `
            <template #default="{ items }">
              <p-timeline-item
                v-for="item in items"
                :key="item.title"
              >
                <template #header>
                  <div>{{ item.title }}</div>
                </template>
              </p-timeline-item>
            </template>
          `,
        },
      })

      cy.get(itemClass).should('have.length', 2)
      cy.get(headerClass).eq(0).should('match', 'span')
      cy.get(headerClass).eq(0).click()
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
      cy.get(contentClass).should('not.exist')
    })

    it('handles mixed content and no-content items in single-open mode', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: true,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
            { title: 'Event 3', subtitle: 'Third milestone' },
          ],
        },
        slots: {
          default: `
            <template #default="{ items, isOpen, setOpen }">
              <p-timeline-item
                v-for="(item, index) in items"
                :key="item.title"
                :open="isOpen(index)"
                @update:open="(value) => setOpen(index, value)"
              >
                <template #header>
                  <div>{{ item.title }}</div>
                </template>
                <template v-if="index !== 1" #content>
                  <div>{{ item.subtitle }}</div>
                </template>
              </p-timeline-item>
            </template>
          `,
        },
      })

      cy.get(headerClass).eq(0).should('match', 'button')
      cy.get(headerClass).eq(1).should('match', 'span')
      cy.get(headerClass).eq(2).should('match', 'button')

      cy.get(headerClass).eq(0).click()
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).click()
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('not.have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(2).click()
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(2).should('have.class', 'polly-timeline-item--open')
    })
  })

  describe('Keyboard Accessibility', () => {
    it('allows toggling items with Enter key', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).focus().type('{enter}')
      cy.wait(200)
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(0).type('{enter}')
      cy.wait(200)
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
    })

    it('allows toggling items with Space key', () => {
      cy.mount(PTimeline, {
        props: {
          singleOpen: true,
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).focus().trigger('keydown', { key: ' ', code: 'Space' })
      cy.wait(200)
      cy.get(itemClass).eq(0).should('have.class', 'polly-timeline-item--open')

      cy.get(headerClass).eq(1).focus().trigger('keydown', { key: ' ', code: 'Space' })
      cy.wait(200)
      cy.get(itemClass).eq(0).should('not.have.class', 'polly-timeline-item--open')
      cy.get(itemClass).eq(1).should('have.class', 'polly-timeline-item--open')
    })

    it('shows focus outline on keyboard navigation', () => {
      cy.mount(PTimeline, {
        props: {
          items: [
            { title: 'Event 1', subtitle: 'First milestone' },
            { title: 'Event 2', subtitle: 'Second milestone' },
          ],
        },
      })

      cy.get(headerClass).eq(0).focus()
      cy.get(headerClass).eq(0).should('have.focus')
    })
  })
})
