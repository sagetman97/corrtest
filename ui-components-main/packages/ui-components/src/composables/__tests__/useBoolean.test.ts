import { ref } from 'vue'
import { useBoolean } from '../useBoolean'
import { describe, it, expect } from 'vitest'

describe('useBoolean', () => {
  describe('initialization', () => {
    it('defaults to false when no initial value is provided', () => {
      const { state } = useBoolean()
      expect(state.value).toBe(false)
    })

    it('accepts initial boolean value', () => {
      const { state } = useBoolean(true)
      expect(state.value).toBe(true)
    })

    it('accepts ref as initial value', () => {
      const initialRef = ref(true)
      const { state } = useBoolean(initialRef)
      expect(state.value).toBe(true)
    })

    it('handles undefined initial value by defaulting to false', () => {
      const { state } = useBoolean(undefined)
      expect(state.value).toBe(false)
    })
  })

  describe('state management', () => {
    it('updates state when using toggle', () => {
      const { state, toggle } = useBoolean(false)

      toggle()
      expect(state.value).toBe(true)

      toggle()
      expect(state.value).toBe(false)
    })

    it('sets state to true using setTrue', () => {
      const { state, setTrue } = useBoolean(false)

      setTrue()
      expect(state.value).toBe(true)

      // Should remain true when called again
      setTrue()
      expect(state.value).toBe(true)
    })

    it('sets state to false using setFalse', () => {
      const { state, setFalse } = useBoolean(true)

      setFalse()
      expect(state.value).toBe(false)

      // Should remain false when called again
      setFalse()
      expect(state.value).toBe(false)
    })
  })

  describe('reactivity', () => {
    it('maintains reactivity with ref initial value', () => {
      const initialRef = ref(false)
      const { state } = useBoolean(initialRef)

      initialRef.value = true
      expect(state.value).toBe(true)
    })

    it('allows direct state modification', () => {
      const { state } = useBoolean(false)

      state.value = true
      expect(state.value).toBe(true)
    })
  })

  describe('method independence', () => {
    it('methods do not interfere with each other', () => {
      const { state, toggle, setTrue, setFalse } = useBoolean(false)

      setTrue()
      expect(state.value).toBe(true)

      toggle()
      expect(state.value).toBe(false)

      setTrue()
      expect(state.value).toBe(true)

      setFalse()
      expect(state.value).toBe(false)
    })
  })
})
