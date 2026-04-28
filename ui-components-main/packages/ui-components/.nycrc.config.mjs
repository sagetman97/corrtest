/*
This is the default "nyc" configuration file, but IT IS ONLY USED FOR REPORTING!
It is used as a basis for the unit and component code coverage configuration files,
and for reporting the total results after merging them from the unit and component reported results.

@example `bunx nyc report --nycrc-path=./.nycrc.config.mjs -r=text -r=html -r=json`

 */
import { coverageConfigDefaults } from 'vitest/config'

const coverageConfig = {
  extends: '@istanbuljs/nyc-config-typescript',
  reporter: ['json', 'html', 'text'],
  all: true,
  'check-coverage': false,
  include: ['src/**/*.{js,cjs,mjs,ts,tsx,jsx,vue}'],
  exclude: ['src/styles', 'src/types', '**/*.d.ts', '**/__tests__', '**/*.cy*', '**/*.test*', '**/*.spec*', '**/.DS_Store', '.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue'],
  extension: ['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.vue'],
}

export default coverageConfig
