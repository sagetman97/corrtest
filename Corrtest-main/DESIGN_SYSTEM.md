# Polly Design System

Complete design system guidelines for the Polly mortgage capital markets portal.

## Drop Shadows

Polly uses a standardized set of drop shadows for depth and hierarchy:

### Shadow Sizes

**S (Small)**
- Value: `0px 0px 2px 0px rgba(0, 0, 0, 0.1)`
- CSS Variable: `var(--shadow-s)`
- Usage: Minimal depth, subtle elements

**M (Medium)**
- Value: `0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)`
- CSS Variable: `var(--shadow-m)`
- Usage: **Default for cards, tables, stat cards** - primary shadow for content containers

**L (Large)**
- Value: `0px 2px 4px -2px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)`
- CSS Variable: `var(--shadow-l)`
- Usage: Elevated content, dropdowns

**XL (Extra Large)**
- Value: `0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)`
- CSS Variable: `var(--shadow-xl)`
- Usage: **Modals, toasts** - highest elevation for overlays

**HOVER**
- Value: `0px 2px 6px 0px rgba(0, 0, 0, 0.3)`
- CSS Variable: `var(--shadow-hover)`
- Usage: Hover states for newly visible form fields, interactive elements

**UPSHADOW**
- Value: `0px -4px 8px 0px rgba(30, 30, 30, 0.1)`
- CSS Variable: `var(--shadow-up)`
- Usage: Mobile bottom sheets

## Border Radii

Polly uses specific border radius values for different UI elements:

### Radius Sizes

**XXS**
- Value: `2px`
- CSS Variable: `var(--radius-xxs)`
- Usage: **Checkboxes**

**XS**
- Value: `4px`
- CSS Variable: `var(--radius-xs)`
- Usage: **Badges, status indicators** (StatusBadge, ProductBadge)

**SM**
- Value: `8px`
- CSS Variable: `var(--radius-sm)`
- Usage: **Navigation items**, small components

**BASE**
- Value: `16px`
- CSS Variable: `var(--radius-base)`
- Usage: **Cards, tables, chart containers** - primary radius for content containers

**MD**
- Value: `24px`
- CSS Variable: `var(--radius-md)`
- Usage: Larger cards, modals

**LG**
- Value: `32px`
- CSS Variable: `var(--radius-lg)`
- Usage: Extra large containers

**XL**
- Value: `99px`
- CSS Variable: `var(--radius-xl)`
- Usage: **Buttons, form fields** - pill-shaped elements

## Focus & Interaction States

### Focus Rings

**XS Focus Ring** (Small Components)
- Border: `0px 0px 0px 4px colors:highlight-yellow`
- Inner: `0px 0px 0px 1.5px colors:neutral-white`
- Usage: Focus state for small components like standalone checkboxes

**M Focus Ring** (Standard)
- Border: `0px 0px 0px 4px colors:highlight-yellow`
- Inner: `0px 0px 0px 1.5px colors:neutral-white`
- Usage: Focus state for most components (buttons, inputs, etc.)

### Hover State
- Shadow: `0px 2px 6px 0px rgba(0, 0, 0, 0.3)` (var(--shadow-hover))
- Usage: Newly visible form fields, interactive elements

### Highlighted State
- Border: `0px 0px 0px 3px colors/border/status/info-dark`
- Inner: `0px 0px 0px 1px colors:neutral-white`
- Usage: Info state for newly visible form fields

## Spacing Scale

Polly uses a consistent spacing scale for margins, padding, and gaps:

| Name   | Pixels | Rem       | Tailwind | Usage                           |
|--------|--------|-----------|----------|---------------------------------|
| XXXS   | 2px    | 0.125rem  | 0.5      | Minimal spacing                 |
| XXS    | 4px    | 0.25rem   | 1        | Tight spacing                   |
| XS     | 8px    | 0.5rem    | 2        | Compact spacing                 |
| SM     | 12px   | 0.75rem   | 3        | Small spacing                   |
| BASE   | 16px   | 1rem      | 4        | Default spacing                 |
| LG     | 24px   | 1.5rem    | 6        | Large spacing                   |
| XL     | 32px   | 2rem      | 8        | Extra large spacing             |
| XXL    | 40px   | 2.5rem    | 10       | Section spacing                 |
| XXXL   | 48px   | 3rem      | 12       | Major section spacing           |

## Component Application

### Cards (StatCard, DataTable, Chart Containers)
```tsx
<div
  className="bg-card border border-border p-3"
  style={{
    borderRadius: 'var(--radius-base)',  // 16px
    boxShadow: 'var(--shadow-m)'         // Medium shadow
  }}
>
  {/* Card content */}
</div>
```

### Badges (StatusBadge, ProductBadge)
```tsx
<span
  className="inline-flex items-center px-2 py-0.5 text-xs"
  style={{ borderRadius: 'var(--radius-xs)' }}  // 4px
>
  {label}
</span>
```

### Buttons
```tsx
<button
  className="px-3 py-1.5 bg-primary text-primary-foreground text-sm"
  style={{ borderRadius: 'var(--radius-xl)' }}  // 99px - pill shape
>
  Click me
</button>
```

### Navigation Items
```tsx
<Link
  className="flex items-center gap-2 px-2.5 py-1.5 text-sm"
  style={{ borderRadius: 'var(--radius-sm)' }}  // 8px
>
  {label}
</Link>
```

## Usage Examples

### Stat Card with Proper Shadow & Radius
```tsx
<div
  className="bg-card border border-border p-3"
  style={{
    borderRadius: 'var(--radius-base)',
    boxShadow: 'var(--shadow-m)'
  }}
>
  <div className="text-xs text-muted-foreground mb-1.5">Active Locks</div>
  <div className="text-lg">847</div>
  <div className="text-xs text-success">+12.4% vs prior day</div>
</div>
```

### Modal with XL Shadow
```tsx
<div
  className="bg-card border border-border p-6"
  style={{
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-xl)'
  }}
>
  {/* Modal content */}
</div>
```

### Interactive Element with Hover Shadow
```tsx
<div
  className="bg-card border border-border p-4 transition-shadow cursor-pointer"
  style={{
    borderRadius: 'var(--radius-base)',
    boxShadow: 'var(--shadow-m)'
  }}
  onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-m)'}
>
  {/* Hoverable content */}
</div>
```

## Design Principles

### Consistency
- Use the standardized shadow and radius values consistently across all components
- Never use arbitrary values - always reference CSS variables
- Maintain visual hierarchy through proper shadow application

### Hierarchy
- **S/M shadows**: Standard content (cards, tables)
- **L shadow**: Elevated content (dropdowns, popovers)
- **XL shadow**: Overlays (modals, toasts)

### Component-Specific Rules
1. **All cards** (StatCard, DataTable, chart containers) use:
   - `border-radius: var(--radius-base)` (16px)
   - `box-shadow: var(--shadow-m)`

2. **All badges** (StatusBadge, ProductBadge) use:
   - `border-radius: var(--radius-xs)` (4px)

3. **All buttons** use:
   - `border-radius: var(--radius-xl)` (99px for pill shape)

4. **Navigation items** use:
   - `border-radius: var(--radius-sm)` (8px)

### Iframe Optimization
All design system values are optimized for the primary iframe viewport (1000px × 800px) while maintaining visual quality at desktop resolution (1280px × 720px).
