import { TS_FILES_COVERED_BY_CYPRESS } from './.nycrc.config.component.mjs'
import nycrcDefaultConfig from './.nycrc.config.mjs'

const coverageConfig = {
  reporter: nycrcDefaultConfig.reporter,
  'check-coverage': false,
  // Include only .ts files in src, excluding .vue files (Cypress tests those)
  include: ['src/**/*.ts'],
  exclude: [...nycrcDefaultConfig.exclude, '**/*.vue'],
  provider: 'istanbul',
  reportsDirectory: './.nyc_output',
}

export default coverageConfig
