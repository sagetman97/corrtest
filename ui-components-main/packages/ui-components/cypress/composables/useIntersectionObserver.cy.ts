/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, onMounted, ref } from 'vue'

import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

describe('useIntersectionObserver', () => {
  describe('Basic Functionality', () => {
    it('observes element intersection', () => {
      const intersectionSpy = cy.spy().as('intersectionSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            const { observe } = useIntersectionObserver(intersectionSpy, {
              threshold: 0,
              rootMargin: '100px', // Increased margin for better detection
            })

            // Defer observation to ensure element is mounted
            onMounted(() => {
              observe(elementRef)
            })

            return () =>
              h(
                'div',
                {
                  'data-cy': 'container',
                  style: 'min-height: 200vh;',
                },
                [
                  h('div', {
                    ref: elementRef,
                    'data-cy': 'target',
                    style: 'margin-top: 150vh; height: 100px; width: 100px; background: #ccc;',
                  }),
                ]
              )
          },
        })
      )

      // Ensure element is mounted and visible
      cy.get('[data-cy=target]').should('exist').should('be.visible')

      cy.scrollTo('bottom', { duration: 100 })

      // Check intersection spy with longer timeout
      cy.get('@intersectionSpy', { timeout: 4000 }).should('have.been.called')
    })

    it('supports manual unobserve', () => {
      const intersectionSpy = cy.spy().as('intersectionSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            const { observe, unobserve } = useIntersectionObserver(intersectionSpy)

            observe(elementRef)

            return () =>
              h('div', { style: 'height: 200vh' }, [
                h('div', {
                  ref: elementRef,
                  'data-cy': 'target',
                  style: 'margin-top: 100vh; height: 100px; background: #ccc;',
                }),
                h(
                  'button',
                  {
                    'data-cy': 'unobserve',
                    onClick: () => unobserve(elementRef),
                  },
                  'Unobserve'
                ),
              ])
          },
        })
      )

      cy.get('[data-cy=unobserve]').click()
      cy.scrollTo('bottom')
      cy.get('@intersectionSpy').should('not.have.been.called')
    })

    it('supports disconnect', () => {
      const intersectionSpy = cy.spy().as('intersectionSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            const { observe, disconnect } = useIntersectionObserver(intersectionSpy)

            observe(elementRef)

            return () =>
              h('div', { style: 'height: 200vh' }, [
                h('div', {
                  ref: elementRef,
                  'data-cy': 'target',
                  style: 'margin-top: 100vh; height: 100px; background: #ccc;',
                }),
                h(
                  'button',
                  {
                    'data-cy': 'disconnect',
                    onClick: () => disconnect(),
                  },
                  'Disconnect'
                ),
              ])
          },
        })
      )

      cy.get('[data-cy=disconnect]').click()
      cy.scrollTo('bottom')
      cy.get('@intersectionSpy').should('not.have.been.called')
    })
  })

  describe('Options', () => {
    it('respects threshold option', () => {
      const intersectionSpy = cy.spy().as('intersectionSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            const { observe } = useIntersectionObserver(intersectionSpy, {
              threshold: 1.0,
              rootMargin: '0px', // Remove extra margin to make positioning more precise
            })

            onMounted(() => {
              observe(elementRef)
            })

            return () =>
              h(
                'div',
                {
                  'data-cy': 'container',
                  style: 'position: relative; height: 300vh;',
                },
                [
                  h('div', {
                    ref: elementRef,
                    'data-cy': 'target',
                    style: 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 50px; width: 50px; background: #ccc;',
                  }),
                ]
              )
          },
        })
      )

      // Element should be fully visible in the center of viewport
      cy.get('[data-cy=target]').should('exist').should('be.visible')

      cy.get('@intersectionSpy')
        .should('have.been.called')
        .should((spy) => {
          const call = spy.getCall(0)
          expect(call.args[0][0].intersectionRatio).to.be.closeTo(1, 0.1)
        })
    })

    it('supports check method', () => {
      const intersectionSpy = cy.spy().as('intersectionSpy')

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            const { check } = useIntersectionObserver(intersectionSpy)

            return () =>
              h('div', { style: 'height: 200vh' }, [
                h('div', {
                  ref: elementRef,
                  'data-cy': 'target',
                  style: 'margin-top: 100vh; height: 100px; background: #ccc;',
                }),
                h(
                  'button',
                  {
                    'data-cy': 'check',
                    onClick: () => check(elementRef),
                  },
                  'Check'
                ),
              ])
          },
        })
      )

      cy.scrollTo('bottom')
      cy.get('[data-cy=check]').click()
      cy.get('@intersectionSpy').should('have.been.called')
    })
  })

  describe('Dynamic Updates', () => {
    it('handles dynamic options updates', () => {
      const intersectionSpy = cy.spy().as('intersectionSpy')
      const options = ref({ threshold: 0 })

      cy.mount(
        defineComponent({
          setup() {
            const elementRef = ref<HTMLDivElement | null>(null)
            const { observe } = useIntersectionObserver(intersectionSpy, options)

            onMounted(() => {
              observe(elementRef)
            })

            return () =>
              h('div', { style: 'position: relative; height: 300vh;' }, [
                h('div', {
                  ref: elementRef,
                  'data-cy': 'target',
                  style: 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 50px; width: 50px; background: #ccc;',
                }),
                h(
                  'button',
                  {
                    'data-cy': 'update-options',
                    onClick: () => (options.value = { threshold: 1 }),
                  },
                  'Update Options'
                ),
              ])
          },
        })
      )

      // Wait for initial mount
      cy.get('[data-cy=target]').should('be.visible')

      // Update threshold and wait for intersection
      cy.get('[data-cy=update-options]').click()

      // Element should trigger intersection since it's fixed in viewport center
      cy.get('@intersectionSpy', { timeout: 4000 }).should('have.been.called')
    })
  })
})
