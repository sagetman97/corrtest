export type CardProps = {
  title?: string
  subtitle?: string
  showBack?: boolean
  backText?: string
  variant?: 'default' | 'ai'
}

export type CardSlots = {
  default?(): unknown
  back?(): unknown
  title?(): unknown
  actions?(): unknown
  footer?(): unknown
  subtitle?(): unknown
}
