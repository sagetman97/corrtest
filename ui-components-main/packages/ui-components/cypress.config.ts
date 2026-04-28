import cypressCodeCoverage from '@cypress/code-coverage/task'
import { defineConfig } from 'cypress'
import { addCypressLoadBalancerPlugin } from 'cypress-load-balancer'

export default defineConfig({
  component: {
    setupNodeEvents(on, config) {
      cypressCodeCoverage(on, config)
      addCypressLoadBalancerPlugin(on, config, 'component')
      return config
    },
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  port: 5174,
  experimentalMemoryManagement: true,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: './cypress/results/mocha-report-[hash].xml',
    testsuitesTitle: 'ui-components',
    rootSuiteTitle: 'Component tests',
  },
})
