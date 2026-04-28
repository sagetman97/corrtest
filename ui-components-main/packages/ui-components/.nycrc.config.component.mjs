import nycrcDefaultConfig from './.nycrc.config.mjs'

/*
Add any ".ts" files covered explicitly by Cypress here.
These files can be excluded from Vitest unit test code coverage as well.
 */
export const TS_FILES_COVERED_BY_CYPRESS = [
  'src/composables/useComputedStyle.ts',
  'src/composables/useDragAndResize.ts',
  'src/composables/useElementRect.ts',
  'src/composables/useEventListener.ts',
  'src/composables/useIntersectionObserver.ts',
  'src/composables/useMedia.ts',
  'src/composables/useMobile.ts',
  'src/composables/useMutationObserver.ts',
  'src/composables/useOutsideClick.ts',
  'src/composables/useResizeObserver.ts',
]

const coverageConfig = {
  ...nycrcDefaultConfig,
  include: ['src/components/**', ...TS_FILES_COVERED_BY_CYPRESS],
}

export default coverageConfig
