# Polly Screen Size Guidelines

This document outlines the screen size constraints and responsive design strategy for the Polly mortgage capital markets portal.

## Overview

The Polly platform is designed to support multiple viewport sizes, with **iframe embedding** as the primary use case for 80%+ of users.

## Screen Size Targets

### 1. iFrame (Primary - 80%+ of users)
**Dimensions:** 1000px × 800px

**Context:** Most Polly users access the platform embedded within their own mortgage origination system via iframe. They log into their own site and see the Polly pricing engine embedded in their screen.

**Design Constraints:**
- Total width: 1000px
- Sidebar: 224px (w-56)
- Content area: ~776px
- Total height: 800px
- All content must be scrollable within this viewport

**Optimization:**
- Compact padding (p-4 instead of p-6)
- Reduced gaps (gap-2.5 instead of gap-3)
- Smaller stat cards (p-3 instead of p-4)
- Compact table cells (py-2 instead of py-2.5)
- Smaller page headers (text-xl h1 instead of text-2xl)

### 2. Desktop (Secondary)
**Dimensions:** 1280px × 720px

**Context:** Standalone desktop access to Polly's platform.

**Design Constraints:**
- More breathing room than iframe
- Same compact design for consistency
- Sidebar: 224px (w-56)
- Content area: ~1056px

### 3. Tablet
**Dimensions:** 672px × 800px

**Context:** Tablet access (less common for enterprise fintech).

**Design Constraints:**
- Potential for sidebar collapse or responsive behavior
- Stacked layouts for complex grids

### 4. Mobile
**Dimensions:** 360px × 800px

**Context:** Mobile access (rare for mortgage capital markets operations).

**Design Constraints:**
- Sidebar should collapse to hamburger menu
- Single column layouts
- Prioritize critical information

## Current Implementation

### Layout Structure
```tsx
<div className="h-screen w-screen flex bg-background overflow-hidden">
  <Navigation /> {/* 224px width, dark sidebar */}
  <main className="flex-1 overflow-auto min-w-0">
    {/* Page content - scrollable */}
  </main>
</div>
```

### Component Spacing
- **Page padding:** `p-4` (16px)
- **Grid gaps:** `gap-2.5` (10px)
- **Stat card padding:** `p-3` (12px)
- **Table cell padding:** `px-2.5 py-2` (10px horizontal, 8px vertical)
- **Section margins:** `mb-4` (16px)

### Navigation (Sidebar)
- **Width:** 224px (w-56) - optimized for iframe
- **Logo size:** 24px
- **Nav item padding:** `px-2.5 py-1.5`
- **Icon size:** 14px
- **Scrollable:** nav section scrolls if items exceed height

### Typography
- **H1 (Page titles):** text-xl (20px) - compact for iframe
- **H2 (Section titles):** text-lg (18px)
- **Body text:** text-sm (14px)
- **Stat card values:** text-lg (18px) - reduced from text-xl
- **Labels/metadata:** text-xs (12px)

## Design Principles

### 1. Iframe-First Design
- Optimize for 1000px × 800px viewport as primary target
- Ensure all critical functionality fits without excessive scrolling
- Dense, information-rich layouts appropriate for enterprise users

### 2. Vertical Scrolling
- Accept vertical scrolling as necessary
- Ensure horizontal scrolling is never required (except for wide tables)
- Use `overflow-auto` on main content area

### 3. Responsive Breakpoints
While not currently implemented, future responsive behavior should use:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1280px
- iFrame: 1000px fixed

### 4. Enterprise Density
- Compact spacing preserves enterprise fintech aesthetic
- Dense tables show more data rows without scrolling
- Reduced whitespace increases information density
- Professional, operational feel over spacious consumer UI

## Testing Checklist

When adding new pages or features:

- [ ] Test in 1000px × 800px viewport (iframe)
- [ ] Verify no horizontal scrolling required
- [ ] Check stat cards fit in grid layouts (4 columns max in iframe)
- [ ] Ensure tables are readable with compact cell padding
- [ ] Verify navigation items don't overflow sidebar height
- [ ] Test page header with product logo doesn't wrap
- [ ] Confirm vertical scrolling works smoothly
- [ ] Validate content fits within ~776px content width

## Browser Support

Target browsers for mortgage capital markets professionals:
- Chrome 90+ (primary)
- Edge 90+
- Safari 14+
- Firefox 88+

No IE11 support required.
