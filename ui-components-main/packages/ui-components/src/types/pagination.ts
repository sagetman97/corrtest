export type PaginationProps = {
  start?: number
  page: number
  totalPages: number
  pagesShown?: number | null
  pageSizes?: number[]
  showPageSize?: boolean
  fullWidth?: boolean
  pageSizeLabel?: string
}

export type PaginationEmits = {
  (event: 'update:page', value: number): void
}
