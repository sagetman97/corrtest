import { isSelectOptionGroup, SelectOption, SelectOptionGroup } from '@/types'

function matchesSearchTerm(text: string | undefined, searchTerm: string): boolean {
  return !!text?.toLowerCase().includes(searchTerm)
}

function filterOption(option: SelectOption<unknown>, searchTerm: string): boolean {
  return matchesSearchTerm(option.label, searchTerm) || matchesSearchTerm(option.subLabel, searchTerm)
}

function filterGroupOptions<T>(group: SelectOptionGroup<T>, searchTerm: string): SelectOptionGroup<T> | null {
  const groupLabelMatches = matchesSearchTerm(group.label, searchTerm)

  if (groupLabelMatches) {
    return {
      ...group,
      options: [...group.options],
    }
  }

  const matchingOptions = group.options.filter((opt) => filterOption(opt, searchTerm))

  if (matchingOptions.length === 0) {
    return null
  }

  return {
    ...group,
    options: matchingOptions,
  }
}

export function filterSelectOptions<T>(options: (SelectOption<T> | SelectOptionGroup<T>)[], filterText: string): (SelectOption<T> | SelectOptionGroup<T>)[] {
  if (!filterText) {
    return options
  }

  const searchTerm = filterText.toLowerCase()

  return options
    .map((option) => {
      if (isSelectOptionGroup(option)) {
        return filterGroupOptions(option, searchTerm)
      }

      return filterOption(option, searchTerm) ? option : null
    })
    .filter((option): option is SelectOption<T> | SelectOptionGroup<T> => option !== null)
}
