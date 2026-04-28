import { globalExists } from '@/utilities'

function sanitizeForId(value: unknown): string {
  if (value === null || value === undefined) {
    return 'null'
  }

  if (typeof value === 'string') {
    return (
      value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9_-]/g, '')
        .slice(0, 100) || 'empty'
    )
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  if (typeof value === 'symbol') {
    const description = value.description || 'symbol'
    return description
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9_-]/g, '')
  }

  if (typeof value === 'object') {
    const json = JSON.stringify(value)
    let hash = 0
    for (let i = 0; i < json.length; i++) {
      const char = json.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return `obj-${Math.abs(hash).toString(36)}`
  }

  return 'unknown'
}

export function buildSelectOptionId(listboxId: string, type: 'option' | 'group', value: unknown): string {
  return `${listboxId}-${type}-${sanitizeForId(value)}`
}

export function randomId(): string {
  if (!globalExists('crypto')) {
    return nonCryptoUUID()
  }

  if (!crypto.randomUUID) {
    return backupRandomUUID()
  }

  return crypto.randomUUID()
}

function backupRandomUUID(): string {
  return (+[1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    .toString()
    .replace(/[018]/g, (substring) => (+substring ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+substring / 4)))).toString(16))
}

function nonCryptoUUID(): string {
  const first = base16Integer()
  const last = base16Integer()
  return `${first.slice(0, 8)}-${first.slice(8, 12)}-4${first.slice(13)}-a${last.slice(1, 4)}-${last.slice(4)}`
}

function base16Integer(): string {
  // eslint-disable-next-line no-loss-of-precision, @typescript-eslint/no-loss-of-precision
  return `00000000000000000${(Math.random() * 0xffffffffffffffff).toString(16)}`.slice(-16)
}
