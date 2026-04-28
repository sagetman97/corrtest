/// <reference types="cypress" />

import { Router } from 'vue-router'

import { mount } from 'cypress/vue'

import PollyComponents from '@/main'

import './commands'
import '@cypress/code-coverage/support'
import '@/styles/main.css'
import '../../../ui-demo/src/styles/main.css'

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1] & { router?: Router }

Cypress.Commands.add('mount', (component, options: OptionsParam = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.stubs = options.global.stubs || {}
  options.global.components = options.global.components || {}
  options.global.plugins = options.global.plugins || []

  options.global.stubs['transition'] = false

  /* Add any global plugins */
  options.global.plugins.push(PollyComponents)
  if (options.router) {
    options.global.plugins.push(options.router)
  }

  return mount(component, options)
})

const useMobileViewport = () => cy.viewport(669, 720)
const useLaptopViewport = () => cy.viewport(1024, 720)
const useDesktopViewport = () => cy.viewport(1280, 720)

Cypress.Commands.add('useMobileViewport', useMobileViewport)
Cypress.Commands.add('useLaptopViewport', useLaptopViewport)
Cypress.Commands.add('useDesktopViewport', useDesktopViewport)
