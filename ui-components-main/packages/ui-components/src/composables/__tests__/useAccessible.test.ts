import { describe, it, expect, vi } from 'vitest'
import { useAccessible } from '../useAccessible'
import { unref, ref, type Ref } from 'vue'

// Mock the useMedia composable
vi.mock('../useMedia', () => ({
  useMedia: vi.fn().mockImplementation(() => {
    // Default implementation returns false for all queries
    return { value: false }
  }),
}))

// Import after mocking
import { useMedia } from '../useMedia'

describe('useAccessible', () => {
  it('returns false when no accessibility features are enabled', () => {
    const accessible = useAccessible()
    expect(accessible.value).toBe(false)
  })

  it('returns true when reduced motion is enabled', () => {
    vi.mocked(useMedia).mockImplementation((query: string | Ref<string>) => ref(unref(query) === '(prefers-reduced-motion: reduce)'))

    const accessible = useAccessible()
    expect(accessible.value).toBe(true)
  })

  it('returns true when extra contrast is enabled', () => {
    vi.mocked(useMedia).mockImplementation((query: string | Ref<string>) => ref(unref(query) === '(prefers-contrast: more)'))

    const accessible = useAccessible()
    expect(accessible.value).toBe(true)
  })

  it('returns true when both features are enabled', () => {
    vi.mocked(useMedia).mockImplementation(() => ref(true))

    const accessible = useAccessible()
    expect(accessible.value).toBe(true)
  })
})
