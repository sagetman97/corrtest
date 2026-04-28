# Polly UX Guidelines (AI-Optimized, Derived from Figma Exports)

Last reviewed: 2026-04-27  
Source directory: `C:\AIProjects\Polly\Figma`  
Total discovered assets: 211 PNG files

## Purpose

Provide a single, usable document for AI systems to produce UI that is consistent with Polly's master Figma guidance exports.

This document is optimized for:
- Generating net-new screens/components.
- Evaluating if a design/code change matches Polly UX.
- Applying component/state/token conventions consistently.

This document is not a replacement for design review. Treat it as a high-signal operational spec.

## AI Usage Contract

When an AI system generates UI for Polly:
- Use the tokens and constraints in this doc before inventing new patterns.
- Prefer existing component families (`p-*`) over bespoke controls.
- Preserve accessibility states and focus indicators.
- Keep chart patterns within provided palette and anatomy.
- If a requirement conflicts with this doc, surface a "design exception" note.

## System Model

Based on the exports, the design system separates concerns into:
- Foundations: colors, typography, spacing, border radii, shadows, states.
- Components: `p-*` controls and composed patterns.
- Layout/navigation: page structure, tabs, pagination, table/grid, responsive breakpoints.
- Data visualization: chart anatomy, chart primitives, and color semantics.
- Governance: house rules, notes, WIP/experimental surfaces.

## Foundational Tokens

## Color Tokens (confirmed)

From `Polly Colors.png`:
- `light-brand`: `#FFFFFF`
- `light-gray-brand`: `#EFEFEF`
- `med-gray-brand`: `#BBB6B6`
- `dark-brand`: `#252525`
- `teal-brand`: `#01FFF0`
- `blue-pricing`: `#1DD6FF`
- `yellow-exchange`: `#FFD601`
- `purple-ai`: `#A089FD`
- `magenta-analytics`: `#FF54D9`
- `green-hedge`: present, but hex not fully legible in export (resolve in Figma token source).

Operational guidance:
- Use neutral grayscale for structure and text hierarchy.
- Use product vertical colors (Pricing/Hedge/Exchange/AI/Analytics) for semantic accents, not full-surface backgrounds unless intentionally thematic.

## Data-viz Color Semantics (confirmed)

From `Data Viz Colors.png`:
- Base palette family exists under `colors/data-viz/*`.
- Semantic usage:
  - `primary`: default chart series.
  - `secondary`: projections/comparison context.
  - `basic`: lines, averages, simple markers.
- Palette modes:
  - `categorical` for multiple discrete series.
  - `sequential` for scale progression/time comparison.
  - `actual` vs `projection` for forecast comparisons.

AI rule:
- If chart has >2 peer series, default to categorical palette.
- If chart mixes actual + projection, reserve secondary tones for projection.

## Typography (confirmed)

From `Text Styles.png`:
- Distinct groups exist for:
  - headings (`h1` to `h6` scale),
  - body,
  - body/link,
  - body/decorative,
  - nav,
  - grid-body,
  - button text.
- Font family appears to use Inter (with explicit size/weight variants).
- Letter spacing tokens are normalized per style family.

AI rule:
- Never use ad hoc text sizing.
- Pick from style families by semantic role (screen heading vs body vs nav vs grid).

## Spacing Scale (confirmed)

From `Spacing.png`:
- `xxxs`: 2px (0.125rem)
- `xxs`: 4px (0.25rem)
- `xs`: 8px (0.5rem)
- `sm`: 12px (0.75rem)
- `base`: 16px (1rem)
- `lg`: 24px (1.5rem)
- `xl`: 32px (2rem)
- `xxl`: 40px (2.5rem)
- `xxxl`: 48px (3rem)

AI rule:
- Use this scale only; avoid off-scale values unless explicitly required for data-viz axis precision.

## Border Radius (confirmed)

From `Border Radii.png`:
- `xxs`: 2px (checkboxes)
- `xs`: 4px (badges)
- `sm`: 8px
- `base`: 16px (cards)
- `md`: 24px
- `lg`: 32px
- `xl`: 99px (pills/buttons/fields)

AI rule:
- Inputs/buttons/pills default to fully rounded/pill treatment.
- Cards/modals use medium-large corner rounds, not sharp rectangles.

## Shadows and States (confirmed)

From `Drop shadows.png` and `States.png`:
- Shadow scale: `s`, `m`, `l`, `xl`, `upshadow`.
- `xl` specifically noted for modals/toasts.
- Focus rings are explicit and visible:
  - `xs focus ring` for small controls.
  - `m focus ring` for most controls.
- Additional states include `hover` and `highlighted`.

AI rule:
- Keyboard focus must always be visually obvious.
- Apply state styling consistently across all interactive components.

## Component Guidance

## Core component families (`p-*`)

The exports strongly indicate reusable component families:
- Inputs: `p-input*`, `p-textarea*`, `p-select*`, `p-search`, `p-field-display*`.
- Selection controls: `p-checkbox`, `p-radiobutton`, `p-toggle-switch`.
- Navigation: `p-tab`, `p-tabset`, `p-breadcrumb-group`, `p-pagination`, `p-nav*`.
- Containers/overlays: `p-card*`, `p-modal*`, `p-popover`, `p-toast*`, `p-accordion`, `p-sticky-note`.
- Feedback/progress: `p-toast*`, `P-progress-bar`.

AI rule:
- Start with these families before introducing new components.
- Preserve variant model: default, hover, active/focus, unavailable/disabled, read-only, error.

## Buttons (confirmed pattern)

From `Buttons.png` and `Button Demo*`:
- Multiple semantic button categories exist (including neutral, destructive, approval/success, and purple AI-themed variants).
- Buttons include icon-only and icon+text treatments.
- Pill radius is a recurring motif.

AI rule:
- Encode intent via semantic button style, not random color overrides.
- Keep button size/radius/icon spacing tied to token scale.

## Form behavior

From `p-select.png`, `p-input*`, `p-textarea*`, and related notes:
- Single and multi-select behaviors are defined.
- Error/active/error-active states are explicit.
- Read-only/unavailable states are distinct from disabled visuals.
- Label and helper-text behavior is intentionally specified.

AI rule:
- Always include label, helper, and validation slot logic in generated forms.
- Keep state transitions explicit (default -> hover -> active/focus -> error -> disabled/read-only).

## Modal / AI assistant surfaces

From `p-modal.png` and modal variant exports:
- Modal usage includes conversational AI assistant patterns.
- Modal action areas and chat prompt strips are integrated.
- Toasts and modals share elevated layering conventions.

AI rule:
- For assistant UIs, use established modal/chat shell and suggestion-chip patterns.
- Use `xl` shadow class for elevated overlays.

## Toast patterns

From `p-toast.png` and `p-toast-*`:
- Toast supports title+message and message-only variants.
- Semantic statuses include info/success/warning/error/loading/neutral message.
- Link support in body copy is explicitly shown.

AI rule:
- For loading toasts, avoid close affordance until complete.
- Keep icon + content alignment consistent across long/short text.

## Navigation and information structure

From nav/tab/breadcrumb/table/layout exports:
- Tabs support segmented and underline styles.
- Breadcrumb groups are available.
- Grid/table systems include body/header/expanded-content variants.
- Pagination patterns are explicitly present.

AI rule:
- Choose one tab style per context (do not mix segmented + underline in same immediate surface).
- Maintain consistent table typography with `grid-body` style tokens.

## Data Visualization Guidance

From `chart basics*`, `Chart Layout.png`, `Line chart.png`, `Combination chart.png`, `Bar/column chart.png`, and `Multiple bar/column chart.png`:
- Chart implementation is currently card-based (`p-card`) rather than a standalone chart component.
- Chart anatomy includes: title, actions, plot content, legend.
- Minimum chart width indicated: 816px (for desktop card baseline).
- Primitive patterns include:
  - line (single/multi/area),
  - vertical/horizontal bar,
  - grouped/multi-bar,
  - combination bar+line.
- Legend marker styles and point marker variants are standardized.

AI rule:
- Wrap chart in card anatomy with clear action zone + legend placement.
- Use semantic data-viz colors instead of product-brand palette by default.

## Accessibility and Interaction

From `Accessibility.png` and related behavior files:
- Keyboard focus exposure is required across interactive controls.
- Date-picker examples show clear focus/selected controls and action affordances.

AI rule:
- Every interactive control must have a visible focus state and state contrast.
- Never rely on color-only distinction; preserve iconography/text cues for statuses.

## Responsive and Layout Guidance

From `Screen Sizes.png`, `breakpoints.png`, `Mobile (Post-MVP).png`, `Mobile Nav for LOs.png`, and `Desktop/Mobile MVP.png`:
- Mobile and post-MVP layout paths are explicitly separated.
- Navigation adaptation for loan officer workflows is represented.

AI rule:
- Generate desktop and mobile variants when requested; do not assume desktop-only behavior transfers.
- Preserve touch target affordances in mobile nav and controls.

## Governance and Quality Rules

From `Welcome Home.png`, `House Rules.png`, notes, and WIP files:
- System emphasizes communication of changes, naming hygiene, and organized component migration.
- Distinction between stable production-ready components and exploratory/WIP surfaces.

AI rule:
- Prefer stable assets over WIP/experimental references when generating production UI.
- If only WIP guidance exists for a feature, include explicit "provisional design" note.

## AI Authoring Template

For generated UI specs, follow this structure:
- `intent`: user/business outcome.
- `layout`: page or card structure.
- `components`: exact `p-*` components and variants.
- `tokens`: color/type/spacing/radius/shadow references.
- `states`: default/hover/focus/active/error/disabled/read-only.
- `accessibility`: keyboard focus + semantic cues.
- `data-viz` (if applicable): chart type, palette mode, legend strategy.
- `open-questions`: any unresolved spec pulled from WIP/ambiguous assets.

## Known Ambiguities

- Some exported filenames include special characters and truncated control characters from zip extraction; these should be normalized if re-exported.
- `green-hedge` token value is not fully legible in current `Polly Colors.png` export.
- Several files are explicitly marked WIP/Notes/Exploration and should not be treated as final defaults.

## Complete Source Inventory (all discovered files)

The following files were included in the synthesis pass:

- `C:\AIProjects\Polly\Figma\.lineopenpoints.png`
- `C:\AIProjects\Polly\Figma\@steph.png`
- `C:\AIProjects\Polly\Figma\_Building-blocks.png`
- `C:\AIProjects\Polly\Figma\_doc-frame\text.png`
- `C:\AIProjects\Polly\Figma\_Popover-Content.png`
- `C:\AIProjects\Polly\Figma\_Popover-Footer.png`
- `C:\AIProjects\Polly\Figma\_Popover-header.png`
- `C:\AIProjects\Polly\Figma\_Value.png`
- `C:\AIProjects\Polly\Figma\?? Collection.png`
- `C:\AIProjects\Polly\Figma\Accessibility & Behavior.png`
- `C:\AIProjects\Polly\Figma\Accessibility.png`
- `C:\AIProjects\Polly\Figma\Action items_ combine p-button and p-error-button into 1 component Potential solution_ Need a property that accounts for color (primary (black\custom), error (red), ai (purple)).png`
- `C:\AIProjects\Polly\Figma\Avatars & Notifications.png`
- `C:\AIProjects\Polly\Figma\Badges & Chips.png`
- `C:\AIProjects\Polly\Figma\Bar\column chart.png`
- `C:\AIProjects\Polly\Figma\base-components.png`
- `C:\AIProjects\Polly\Figma\Behavior.png`
- `C:\AIProjects\Polly\Figma\Border Radii.png`
- `C:\AIProjects\Polly\Figma\Breadcrumb Group.png`
- `C:\AIProjects\Polly\Figma\breakpoints.png`
- `C:\AIProjects\Polly\Figma\Button Demo.png`
- `C:\AIProjects\Polly\Figma\Button Demo-1.png`
- `C:\AIProjects\Polly\Figma\Button Demo-2.png`
- `C:\AIProjects\Polly\Figma\Button Demo-3.png`
- `C:\AIProjects\Polly\Figma\Button Demo-4.png`
- `C:\AIProjects\Polly\Figma\Button Demo-5.png`
- `C:\AIProjects\Polly\Figma\Button Demo-6.png`
- `C:\AIProjects\Polly\Figma\Button Demo-7.png`
- `C:\AIProjects\Polly\Figma\button_ click return to send height max height scroll bar border radius.png`
- `C:\AIProjects\Polly\Figma\Buttons.png`
- `C:\AIProjects\Polly\Figma\Changes_ Existing tooltip  size variant = large header_ h2h3 border radius_ basesm New tooltip (size variant = default) L\R padding = sm.png`
- `C:\AIProjects\Polly\Figma\chart basics.png`
- `C:\AIProjects\Polly\Figma\chart basics-1.png`
- `C:\AIProjects\Polly\Figma\Chart Layout.png`
- `C:\AIProjects\Polly\Figma\Colors.png`
- `C:\AIProjects\Polly\Figma\Combination chart.png`
- `C:\AIProjects\Polly\Figma\Component - WIP.png`
- `C:\AIProjects\Polly\Figma\Creating New Scale.png`
- `C:\AIProjects\Polly\Figma\Data Viz Colors.png`
- `C:\AIProjects\Polly\Figma\Date Picker.png`
- `C:\AIProjects\Polly\Figma\default_ regular, 16px.png`
- `C:\AIProjects\Polly\Figma\Desktop\Mobile MVP.png`
- `C:\AIProjects\Polly\Figma\Documentation-Note-1.png`
- `C:\AIProjects\Polly\Figma\Documentation-Note-2.png`
- `C:\AIProjects\Polly\Figma\Documentation-Note-3.png`
- `C:\AIProjects\Polly\Figma\Documentation-Note-4.png`
- `C:\AIProjects\Polly\Figma\Documentation-Note-5.png`
- `C:\AIProjects\Polly\Figma\Drop shadows.png`
- `C:\AIProjects\Polly\Figma\EXAMPLES- WIP.png`
- `C:\AIProjects\Polly\Figma\examples-1.png`
- `C:\AIProjects\Polly\Figma\examples-2.png`
- `C:\AIProjects\Polly\Figma\Explorations.png`
- `C:\AIProjects\Polly\Figma\Floating Button.png`
- `C:\AIProjects\Polly\Figma\Fonts.png`
- `C:\AIProjects\Polly\Figma\Footer.png`
- `C:\AIProjects\Polly\Figma\Format.png`
- `C:\AIProjects\Polly\Figma\Frame 1.png`
- `C:\AIProjects\Polly\Figma\Frame 1857.png`
- `C:\AIProjects\Polly\Figma\Frame 2.png`
- `C:\AIProjects\Polly\Figma\Frame 427320466.png`
- `C:\AIProjects\Polly\Figma\Frame 427320633.png`
- `C:\AIProjects\Polly\Figma\Frame 427320634.png`
- `C:\AIProjects\Polly\Figma\Frame 427320635.png`
- `C:\AIProjects\Polly\Figma\Frame 427320636.png`
- `C:\AIProjects\Polly\Figma\Frame 427320637.png`
- `C:\AIProjects\Polly\Figma\Frame 427320643.png`
- `C:\AIProjects\Polly\Figma\Frame 427320663.png`
- `C:\AIProjects\Polly\Figma\Future Changes_ Unavailable grey_ #F4F4F4  #EAEAEA.png`
- `C:\AIProjects\Polly\Figma\Future considerations.png`
- `C:\AIProjects\Polly\Figma\Grid Components.png`
- `C:\AIProjects\Polly\Figma\Grid-column\Grid.png`
- `C:\AIProjects\Polly\Figma\Group 10.png`
- `C:\AIProjects\Polly\Figma\Group 2.png`
- `C:\AIProjects\Polly\Figma\Headers & Expanded Content.png`
- `C:\AIProjects\Polly\Figma\Headers, footers, body content.png`
- `C:\AIProjects\Polly\Figma\House Rules.png`
- `C:\AIProjects\Polly\Figma\HOW TO.png`
- `C:\AIProjects\Polly\Figma\iframe.png`
- `C:\AIProjects\Polly\Figma\image (21) 1.png`
- `C:\AIProjects\Polly\Figma\image 1.png`
- `C:\AIProjects\Polly\Figma\image 11.png`
- `C:\AIProjects\Polly\Figma\Inline Edit.png`
- `C:\AIProjects\Polly\Figma\Left alignment in fields.png`
- `C:\AIProjects\Polly\Figma\Line chart.png`
- `C:\AIProjects\Polly\Figma\Link_ gos somewhere (another page) inline actions Button_ does something.png`
- `C:\AIProjects\Polly\Figma\List Row.png`
- `C:\AIProjects\Polly\Figma\Loading Button.png`
- `C:\AIProjects\Polly\Figma\Lo-fi prototypes.png`
- `C:\AIProjects\Polly\Figma\Logos.png`
- `C:\AIProjects\Polly\Figma\MM.png`
- `C:\AIProjects\Polly\Figma\MM-1.png`
- `C:\AIProjects\Polly\Figma\MM-2.png`
- `C:\AIProjects\Polly\Figma\MM-3.png`
- `C:\AIProjects\Polly\Figma\MM-4.png`
- `C:\AIProjects\Polly\Figma\Mobile (Post-MVP).png`
- `C:\AIProjects\Polly\Figma\Mobile Nav for LOs.png`
- `C:\AIProjects\Polly\Figma\Most Updated.png`
- `C:\AIProjects\Polly\Figma\move to different file.png`
- `C:\AIProjects\Polly\Figma\Multiple bar\column chart.png`
- `C:\AIProjects\Polly\Figma\new-new-body-cell.png`
- `C:\AIProjects\Polly\Figma\Notable comments.png`
- `C:\AIProjects\Polly\Figma\Note.png`
- `C:\AIProjects\Polly\Figma\Notes (for designers).png`
- `C:\AIProjects\Polly\Figma\Notes\WIP.png`
- `C:\AIProjects\Polly\Figma\other changes_ cleaned up styles; added sections for shadows and states.png`
- `C:\AIProjects\Polly\Figma\Our Goal.png`
- `C:\AIProjects\Polly\Figma\p-accordion.png`
- `C:\AIProjects\Polly\Figma\Page Layout.png`
- `C:\AIProjects\Polly\Figma\pagination.png`
- `C:\AIProjects\Polly\Figma\Paint Samples - Data-viz.png`
- `C:\AIProjects\Polly\Figma\Paint Samples.png`
- `C:\AIProjects\Polly\Figma\Paint Samples-1.png`
- `C:\AIProjects\Polly\Figma\Paint Samples-2.png`
- `C:\AIProjects\Polly\Figma\Patterns.png`
- `C:\AIProjects\Polly\Figma\p-breadcrumb-group.png`
- `C:\AIProjects\Polly\Figma\p-card, p-modal, p-dialogue.png`
- `C:\AIProjects\Polly\Figma\p-card.png`
- `C:\AIProjects\Polly\Figma\p-checkbox.png`
- `C:\AIProjects\Polly\Figma\p-field-display.png`
- `C:\AIProjects\Polly\Figma\p-field-display-1.png`
- `C:\AIProjects\Polly\Figma\p-input.png`
- `C:\AIProjects\Polly\Figma\p-input-1.png`
- `C:\AIProjects\Polly\Figma\p-input-10.png`
- `C:\AIProjects\Polly\Figma\p-input-11.png`
- `C:\AIProjects\Polly\Figma\p-input-12.png`
- `C:\AIProjects\Polly\Figma\p-input-2.png`
- `C:\AIProjects\Polly\Figma\p-input-3.png`
- `C:\AIProjects\Polly\Figma\p-input-4.png`
- `C:\AIProjects\Polly\Figma\p-input-5.png`
- `C:\AIProjects\Polly\Figma\p-input-6.png`
- `C:\AIProjects\Polly\Figma\p-input-7.png`
- `C:\AIProjects\Polly\Figma\p-input-8.png`
- `C:\AIProjects\Polly\Figma\p-input-9.png`
- `C:\AIProjects\Polly\Figma\p-modal - detach + convert to slot.png`
- `C:\AIProjects\Polly\Figma\p-modal - detach + convert to slot-1.png`
- `C:\AIProjects\Polly\Figma\p-modal - detach + convert to slot-2.png`
- `C:\AIProjects\Polly\Figma\p-modal - wrap in new slot.png`
- `C:\AIProjects\Polly\Figma\p-modal - wrap in new slot-1.png`
- `C:\AIProjects\Polly\Figma\p-modal - wrap in new slot-2.png`
- `C:\AIProjects\Polly\Figma\p-modal - wrap in new slot-3.png`
- `C:\AIProjects\Polly\Figma\p-modal - wrap in new slot-4.png`
- `C:\AIProjects\Polly\Figma\p-modal - wrap in new slot-5.png`
- `C:\AIProjects\Polly\Figma\p-modal -test.png`
- `C:\AIProjects\Polly\Figma\p-modal -test-1.png`
- `C:\AIProjects\Polly\Figma\p-modal.png`
- `C:\AIProjects\Polly\Figma\p-modal-1.png`
- `C:\AIProjects\Polly\Figma\p-modal-2.png`
- `C:\AIProjects\Polly\Figma\p-modal-3.png`
- `C:\AIProjects\Polly\Figma\p-modal-4.png`
- `C:\AIProjects\Polly\Figma\p-nav.png`
- `C:\AIProjects\Polly\Figma\p-nav-1.png`
- `C:\AIProjects\Polly\Figma\Polly Colors.png`
- `C:\AIProjects\Polly\Figma\Polly Colors-1.png`
- `C:\AIProjects\Polly\Figma\position detail example.png`
- `C:\AIProjects\Polly\Figma\p-pagination.png`
- `C:\AIProjects\Polly\Figma\p-popover.png`
- `C:\AIProjects\Polly\Figma\P-progress-bar.png`
- `C:\AIProjects\Polly\Figma\p-radiobutton.png`
- `C:\AIProjects\Polly\Figma\Prioritization.png`
- `C:\AIProjects\Polly\Figma\Prototype-active-text-experiment.png`
- `C:\AIProjects\Polly\Figma\Prototype-inactive.png`
- `C:\AIProjects\Polly\Figma\Prototypes.png`
- `C:\AIProjects\Polly\Figma\p-search.png`
- `C:\AIProjects\Polly\Figma\p-select.png`
- `C:\AIProjects\Polly\Figma\p-select-options.png`
- `C:\AIProjects\Polly\Figma\p-sticky-note.png`
- `C:\AIProjects\Polly\Figma\p-tab.png`
- `C:\AIProjects\Polly\Figma\p-tabset.png`
- `C:\AIProjects\Polly\Figma\p-textarea.png`
- `C:\AIProjects\Polly\Figma\p-textarea-1.png`
- `C:\AIProjects\Polly\Figma\p-textarea-2.png`
- `C:\AIProjects\Polly\Figma\p-textarea-3.png`
- `C:\AIProjects\Polly\Figma\p-textarea-4.png`
- `C:\AIProjects\Polly\Figma\p-toast.png`
- `C:\AIProjects\Polly\Figma\p-toast-1.png`
- `C:\AIProjects\Polly\Figma\p-toast-2.png`
- `C:\AIProjects\Polly\Figma\p-toast-3.png`
- `C:\AIProjects\Polly\Figma\p-toast-4.png`
- `C:\AIProjects\Polly\Figma\p-toast-5.png`
- `C:\AIProjects\Polly\Figma\p-toast-6.png`
- `C:\AIProjects\Polly\Figma\p-toast-patterns.png`
- `C:\AIProjects\Polly\Figma\p-toggle-switch.png`
- `C:\AIProjects\Polly\Figma\Required fields.png`
- `C:\AIProjects\Polly\Figma\Screen Sizes.png`
- `C:\AIProjects\Polly\Figma\Screenshot 2024-05-03 at 2.37 1.png`
- `C:\AIProjects\Polly\Figma\Screenshot 2024-05-03 at 2.42 1.png`
- `C:\AIProjects\Polly\Figma\Screenshot 2024-06-20 at 4.37.24?PM 1.png`
- `C:\AIProjects\Polly\Figma\Section 1.png`
- `C:\AIProjects\Polly\Figma\Section 2.png`
- `C:\AIProjects\Polly\Figma\Section 3.png`
- `C:\AIProjects\Polly\Figma\Section 4.png`
- `C:\AIProjects\Polly\Figma\Simple highlight.png`
- `C:\AIProjects\Polly\Figma\SPACING - WIP.png`
- `C:\AIProjects\Polly\Figma\Spacing.png`
- `C:\AIProjects\Polly\Figma\Specs (extra).png`
- `C:\AIProjects\Polly\Figma\square.png`
- `C:\AIProjects\Polly\Figma\Star 1.png`
- `C:\AIProjects\Polly\Figma\Star 2.png`
- `C:\AIProjects\Polly\Figma\States.png`
- `C:\AIProjects\Polly\Figma\Stylized Text.png`
- `C:\AIProjects\Polly\Figma\suggested actions change as the convo continues.png`
- `C:\AIProjects\Polly\Figma\Table Components.png`
- `C:\AIProjects\Polly\Figma\TEST Body-content.png`
- `C:\AIProjects\Polly\Figma\Text Styles.png`
- `C:\AIProjects\Polly\Figma\textarea can get taller can support prefix L\R (icons, buttons).png`
- `C:\AIProjects\Polly\Figma\Texture (for accessibility).png`
- `C:\AIProjects\Polly\Figma\UI switcher WIP.png`
- `C:\AIProjects\Polly\Figma\Variable Collections __ Eng Tokens.png`
- `C:\AIProjects\Polly\Figma\Welcome Home.png`
- `C:\AIProjects\Polly\Figma\When input field is present, field should be_ underline variant indented to where the label begins.png`
- `C:\AIProjects\Polly\Figma\WIP BADGES.png`
