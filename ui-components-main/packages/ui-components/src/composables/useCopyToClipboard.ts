import { ref } from 'vue'

export function useCopyToClipboard() {
  const copiedLabels = ref<Set<string>>(new Set())
  const copiedTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

  async function copyToClipboard(label: string): Promise<void> {
    try {
      // Copy the var() format to clipboard
      await navigator.clipboard.writeText(`var(--${label})`)

      // Clear any existing timeout for this label
      const existingTimeout = copiedTimeouts.get(label)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }

      // Show the copied overlay
      copiedLabels.value.add(label)

      // Set new timeout to hide the overlay
      const timeout = setTimeout(() => {
        copiedLabels.value.delete(label)
        copiedTimeouts.delete(label)
      }, 1500)

      copiedTimeouts.set(label, timeout)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return {
    copiedLabels,
    copyToClipboard,
  }
}
