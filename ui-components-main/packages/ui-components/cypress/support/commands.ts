/// <reference types="cypress" />

import textTrimmed from './textTrimmed'

chai.use(textTrimmed)

Cypress.automation('remote:debugger:protocol', {
  command: 'Emulation.setTouchEmulationEnabled',
  params: {
    enabled: false,
  },
})

Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop'))
