# Polly Logo Usage Guide

This document outlines the proper usage of Polly logos throughout the application based on Polly's brand guidelines.

**IMPORTANT:** All logo components now use actual PNG image assets from Polly's brand guidelines (src/imports/image-4.png, image-7.png, image-8.png), not recreated SVGs.

## Logo Components

### 1. PollyLogo
The main brand mark - a "P/" symbol with cyan slash available in multiple sizes.

**Image Source:** 
- Light variant: `src/imports/image-4.png` (black P with cyan slash)
- Dark variant: `src/imports/image-8.png` (white P with cyan slash on dark background)

**Sizes:** 74px, 128px, 192px, 347px, 588px
**Variants:** light (black P), dark (white P)
**Accent Color:** #01FFF0 (cyan slash - baked into PNG assets)

```tsx
import { PollyLogo } from './components/PollyLogo';

<PollyLogo size={128} variant="light" />
<PollyLogo size={192} variant="dark" />
```

### 2. PollyWordmark
Full "POLLY/" text logo with cyan accent.

**Image Source:** `src/imports/image-7.png`
**Height:** 24px (auto width)
**Note:** Currently displays the same PNG for both light and dark variants

```tsx
import { PollyWordmark } from './components/PollyLogo';

<PollyWordmark variant="light" />
```

### 3. ProductLogo
Smaller icon-only version for UI elements using real PNG assets.

**Image Source:** Same as PollyLogo (image-4.png for light, image-8.png for dark)
**Size:** Flexible (default 20px)
**Product Differentiation:** Uses subtle colored border for non-default products

**Product Colors & Accents:**
- Pricing Engine: #01FFF0 (cyan) - no border, default Polly brand
- Exchange: #FFD601 (yellow) - adds yellow border accent
- Analytics: #FF54D9 (magenta) - adds magenta border accent
- Hedge: #6FCF97 (green) - adds green border accent
- AI: #9B51E0 (purple) - adds purple border accent

**Note:** Since PNG logos have fixed cyan slashes, product colors are shown as subtle border accents around the logo.

```tsx
import { ProductLogo } from './components/PollyLogo';

// Default Polly cyan - no border
<ProductLogo 
  size={20} 
  productColor="#01FFF0" 
  variant="dark" 
/>

// Exchange product with yellow accent border
<ProductLogo 
  size={24} 
  productColor="#FFD601" 
  variant="light" 
/>
```

## Product Differentiation

Use product-specific colors to differentiate between Polly's offerings:

### ProductBadge Component
Displays product logo with optional label.

```tsx
import { ProductBadge } from './components/ProductBadge';

<ProductBadge product="pricing-engine" size="md" showLabel={true} />
<ProductBadge product="exchange" size="sm" />
<ProductBadge product="analytics" size="lg" showLabel={false} />
```

**Available Products:**
- `pricing-engine` - Cyan (#01FFF0)
- `exchange` - Yellow (#FFD601)
- `analytics` - Magenta (#FF54D9)
- `hedge` - Green (#6FCF97)
- `ai` - Purple (#9B51E0)

## Page Headers

Use PageHeader component with optional product logo:

```tsx
import { PageHeader } from './components/PageHeader';

<PageHeader
  title="Product & Pricing"
  subtitle="Pricing Engine v4.2"
  productColor="#01FFF0"
  showLogo={true}
/>
```

## Navigation

Navigation sidebar uses ProductLogo in dark variant (compact for iframe):

```tsx
<ProductLogo size={24} variant="dark" productColor="#01FFF0" />
```

## Loading States

Use LoadingLogo for branded loading indicators:

```tsx
import { LoadingLogo } from './components/LoadingLogo';

<LoadingLogo size={48} message="Loading data..." />
```

## Best Practices

1. **Size Guidelines (optimized for iframe viewport):**
   - Navigation: 24px (reduced for compact sidebar)
   - Page headers: 20px (reduced for iframe optimization)
   - Inline badges: 16-20px
   - Large displays: 128px+

2. **Variant Usage:**
   - Use `dark` variant on dark backgrounds (#333, #000)
   - Use `light` variant on light backgrounds (#fff, #f5f5f5)

3. **Product Colors:**
   - Always use official product colors for differentiation
   - Don't mix product colors randomly
   - Cyan (#01FFF0) is the default/primary product color

4. **Spacing:**
   - Maintain minimum clear space around logos
   - Use consistent gap spacing with text (2-3px typical)

5. **Don't:**
   - Distort or stretch logos
   - Change the cyan accent color (#01FFF0)
   - Use logos on busy backgrounds without proper contrast
   - Rotate logos (except the standard diagonal slash)
