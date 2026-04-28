import { PAccessoryPanel } from './accessoryPanel'
import { PAccordion } from './accordion'
import { PAvatar } from './avatar'
import { PBadge } from './badge'
import { PBanner } from './banner'
import { PBasePage, PBasePageHeader } from './basePage'
import { PBreadCrumbs } from './breadCrumbs'
import { PButton, PIconButton } from './button'
import { PCalendar, PCalendarDateButton } from './calendar'
import { PCard } from './card'
import { PCheckbox } from './checkbox'
import { PChip } from './chip'
import { PConfirmationArea } from './confirmation'
import { PDatePicker } from './datePicker'
import { PDragAndDrop } from './dragAndDrop'
import { PForm } from './form'
import { PIcon } from './icon'
import { PInput } from './input'
import { PInputBase } from './inputBase'
import { PInputCurrency } from './inputCurrency'
import { PInputFile } from './inputFile'
import { PInputNumber } from './inputNumber'
import { PLabel } from './label'
import { PLink } from './link'
import { PModal, PModalContent } from './modal'
import { PNavigation, PNavigationAction, PNavigationGroup, PNavigationItem } from './navigation'
import { POverflow } from './overflow'
import { PPagination } from './pagination'
import { PPopover, PPopoverContent } from './popover'
import { PProgressBar } from './progressBar'
import { PRadio } from './radio'
import { PSearch } from './search'
import { POption, POptionLabel, POptions, PSelect } from './select'
import { PSplitButton } from './splitButton'
import { PStickyNote } from './stickyNote'
import { PTable } from './table'
import { PTabset } from './tabset'
import { PTextarea } from './textarea'
import { PTimeline, PTimelineItem } from './timeline'
import { PTimePicker } from './timePicker'
import { PToast, PToastArea } from './toast'
import { PToggle } from './toggle'
import { RequiredComponents, TransitionExpand } from './utilities'
import { PVirtualScroller } from './virtualScroller'
import { PWalkthrough } from './walkthrough'

export {
  PAvatar,
  PAccessoryPanel,
  PAccordion,
  PBadge,
  PBanner,
  PBasePage,
  PBasePageHeader,
  PBreadCrumbs,
  PButton,
  PCalendar,
  PCalendarDateButton,
  PCard,
  PCheckbox,
  PChip,
  PConfirmationArea,
  PDragAndDrop,
  PDatePicker,
  PForm,
  PIcon,
  PIconButton,
  PInput,
  PInputBase,
  PInputCurrency,
  PInputFile,
  PInputNumber,
  PLabel,
  PLink,
  PModal,
  PModalContent,
  PNavigation,
  PNavigationAction,
  PNavigationGroup,
  PNavigationItem,
  POption,
  POptionLabel,
  POptions,
  POverflow,
  PPagination,
  PPopover,
  PPopoverContent,
  PProgressBar,
  PRadio,
  PSearch,
  PSelect,
  PSplitButton,
  PStickyNote,
  PTable,
  PTabset,
  PTextarea,
  PTimeline,
  PTimelineItem,
  PTimePicker,
  PToast,
  PToastArea,
  PToggle,
  PWalkthrough,
  PVirtualScroller,
  RequiredComponents,
  TransitionExpand,
}

declare module 'vue' {
  export interface GlobalComponents {
    PAvatar: typeof PAvatar
    PAccessoryPanel: typeof PAccessoryPanel
    PAccordion: typeof PAccordion
    PBadge: typeof PBadge
    PBanner: typeof PBanner
    PBasePage: typeof PBasePage
    PBasePageHeader: typeof PBasePageHeader
    PBreadCrumbs: typeof PBreadCrumbs
    PButton: typeof PButton
    PCalendar: typeof PCalendar
    PCalendarDateButton: typeof PCalendarDateButton
    PCard: typeof PCard
    PCheckbox: typeof PCheckbox
    PChip: typeof PChip
    PConfirmationArea: typeof PConfirmationArea
    PDragAndDrop: typeof PDragAndDrop
    PDatePicker: typeof PDatePicker
    PIcon: typeof PIcon
    PIconButton: typeof PIconButton
    PInput: typeof PInput
    PInputBase: typeof PInputBase
    PInputCurrency: typeof PInputCurrency
    PInputFile: typeof PInputFile
    PInputNumber: typeof PInputNumber
    PLabel: typeof PLabel
    PLink: typeof PLink
    PModal: typeof PModal
    PModalContent: typeof PModalContent
    PNavigation: typeof PNavigation
    PNavigationAction: typeof PNavigationAction
    PNavigationGroup: typeof PNavigationGroup
    PNavigationItem: typeof PNavigationItem
    POption: typeof POption
    POptionLabel: typeof POptionLabel
    POptions: typeof POptions
    POverflow: typeof POverflow
    PPagination: typeof PPagination
    PPopover: typeof PPopover
    PRadio: typeof PRadio
    PSearch: typeof PSearch
    PSelect: typeof PSelect
    PSplitButton: typeof PSplitButton
    PStickyNote: typeof PStickyNote
    PTable: typeof PTable
    PTabset: typeof PTabset
    PTextarea: typeof PTextarea
    PTimeline: typeof PTimeline
    PTimelineItem: typeof PTimelineItem
    PTimePicker: typeof PTimePicker
    PToast: typeof PToast
    PToastArea: typeof PToastArea
    PToggle: typeof PToggle
    PWalkthrough: typeof PWalkthrough
    PVirtualScroller: typeof PVirtualScroller
    RequiredComponents: typeof RequiredComponents
    TransitionExpand: typeof TransitionExpand
  }
}
