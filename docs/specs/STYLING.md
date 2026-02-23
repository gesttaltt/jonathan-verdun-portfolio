# Styling & Theme Specification

Reference for the CSS architecture, design tokens, and animation system.

---

## Tailwind CSS v4 Setup

The project uses Tailwind v4 with the PostCSS plugin (`@tailwindcss/postcss`). There is **no `tailwind.config.ts`** — all theme extensions are defined inline in `globals.css` using the `@theme inline` directive.

### PostCSS Config (`postcss.config.mjs`)

```javascript
{ plugins: { "@tailwindcss/postcss": {} } }
```

---

## CSS Variables (`:root`)

Defined in `src/app/globals.css`:

| Variable             | Value                     | Usage                             |
| -------------------- | ------------------------- | --------------------------------- |
| `--background`       | `#0a0a0a`                 | Page background                   |
| `--foreground`       | `#ededed`                 | Default text color                |
| `--accent`           | `#3b82f6`                 | Blue-500, primary accent          |
| `--bg-deep`          | `#050510`                 | Deep background for WebGL canvas  |
| `--grid-line`        | `rgba(34, 211, 238, 0.3)` | Cyan-400 at 30% for grid overlays |
| `--particle`         | `#22d3ee`                 | Cyan-400 for particle effects     |
| `--node-color`       | `#3b82f6`                 | Blue-500 for topology nodes       |
| `--interaction-glow` | `#8b5cf6`                 | Violet-500 for hover glow         |

### Tailwind Theme Bindings

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --font-mono: var(--font-jetbrains-mono);
  --color-bg-deep: var(--bg-deep);
  --color-grid-line: var(--grid-line);
  --color-particle: var(--particle);
}
```

This allows using `bg-background`, `text-foreground`, `bg-bg-deep`, etc. as Tailwind utilities.

---

## Glassmorphism Utilities

### `.glass`

```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

Used for: header info cards, sidebar panels, semi-transparent overlays.

### `.glass-dark`

```css
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.05);
```

Used for: terminal body.

---

## CRT & Scanline Effects

### `.scanline`

A 2px horizontal bar that sweeps top-to-bottom over 6 seconds:

```css
@keyframes scanline {
  0% {
    bottom: 100%;
  }
  100% {
    bottom: 0%;
  }
}
```

### `.crt::before`

Pseudo-element overlay simulating CRT phosphor lines:

- Horizontal 2px alternating dark bands
- Vertical 3px RGB sub-pixel color bands
- `pointer-events: none` so it doesn't block interaction

---

## Typography

**Font:** JetBrains Mono (loaded via `next/font/google`).

Applied as `--font-jetbrains-mono` CSS variable and mapped to `--font-mono` in the Tailwind theme. The `font-mono` utility resolves to this font.

**Selection:** Blue-500 at 30% opacity with white text.

---

## UI Config (`src/lib/uiConfig.ts`)

Centralizes Tailwind class mappings that can't live in CSS variables:

```typescript
projectStatusStyles: {
  Deployed:  'bg-green-500/20 text-green-400',
  Research:  'bg-purple-500/20 text-purple-400',
  Prototype: 'bg-amber-500/20 text-amber-400',
  Archived:  'bg-zinc-500/20 text-zinc-400',
}
```

Consumed by `ProjectCard` for status badge styling. Adding a new status only requires updating this map.

---

## Animation Registry (`src/lib/animations.ts`)

All Framer Motion variants are centralized here instead of defined inline.

| Export                     | Type       | Description                                                         |
| -------------------------- | ---------- | ------------------------------------------------------------------- |
| `fadeUpVariants(delay)`    | `Variants` | Fade + translate-Y up. Used by `ProjectCard` with staggered delays. |
| `slideDownVariants`        | `Variants` | Slide from top. Used by the page header.                            |
| `staggerContainerVariants` | `Variants` | Parent container that staggers children by 0.1s.                    |
| `staggerChildVariants`     | `Variants` | Child variant paired with stagger container.                        |
| `floatVariants(duration)`  | `object`   | Ambient floating motion for decorative elements.                    |

### Usage Pattern

```tsx
import { fadeUpVariants } from '@/lib/animations'

;<motion.div variants={fadeUpVariants(index * 0.1)} initial="hidden" whileInView="visible" />
```

---

## Color Palette Summary

| Role       | Color           | Hex       | Tailwind            |
| ---------- | --------------- | --------- | ------------------- |
| Background | Near-black      | `#0a0a0a` | `bg-background`     |
| Deep BG    | Ultra-dark blue | `#050510` | `bg-bg-deep`        |
| Primary    | Blue            | `#3b82f6` | `blue-500`          |
| Accent     | Cyan            | `#22d3ee` | `cyan-400`          |
| Hover glow | Violet          | `#8b5cf6` | `violet-500`        |
| Text       | Light gray      | `#ededed` | `text-foreground`   |
| Muted text | Zinc            | Various   | `text-zinc-400/500` |
