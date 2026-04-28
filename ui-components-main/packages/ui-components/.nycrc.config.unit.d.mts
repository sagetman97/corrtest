import { CoverageOptions } from 'vitest/config'

declare module './.nycrc.config.unit.mjs' {
  export default CoverageOptions
}
