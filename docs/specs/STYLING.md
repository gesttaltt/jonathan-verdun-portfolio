# Styling & Theme Specification

Reference for the CSS architecture, design tokens, and animation system.

---

## Tailwind CSS v4

There is **no `tailwind.config.ts`/`.js`** — Tailwind v4 is CSS-first. All theme configuration lives in the `@theme inline { ... }` block at the top of `src/app/globals.css`, which maps `--color-*` utility tokens to the underlying custom properties below.

---

## Theme Tokens (`src/app/globals.css`)

Two blocks — `:root` (dark, the default) and `.light` (opt-in via a class on `<html>`):

| Token                            | Dark (`:root`)                    | Light (`.light`)      |
| -------------------------------- | --------------------------------- | --------------------- |
| `--background`                   | `#0a0a0a`                         | `#fafafa`             |
| `--foreground`                   | `#ededed`                         | `#18181b`             |
| `--accent`                       | `#3b82f6`                         | `#2563eb`             |
| `--bg-card`                      | `rgba(255,255,255,0.07)`          | `#ffffff`             |
| `--bg-card-hover`                | `rgba(255,255,255,0.12)`          | `#f4f4f5`             |
| `--bg-badge`                     | `rgba(255,255,255,0.06)`          | `#e4e4e7`             |
| `--bg-deep`                      | `#050510`                         | `#e5e5e8`             |
| `--text-primary`                 | `#ffffff`                         | `#18181b`             |
| `--text-secondary`               | `#e4e4e7`                         | `#3f3f46`             |
| `--text-tertiary`                | `#a1a1aa`                         | `#71717a`             |
| `--text-muted`                   | `#8a8a92`                         | `#636366`             |
| `--border-subtle`                | `rgba(255,255,255,0.1)`           | `#e4e4e7`             |
| `--border-strong`                | `rgba(255,255,255,0.2)`           | `#a1a1aa`             |
| `--grid-line`                    | `rgba(34,211,238,0.3)`            | `rgba(82,82,91,0.08)` |
| `--particle`                     | `#22d3ee`                         | `#3b82f6`             |
| `--node-color`                   | `#3b82f6`                         | `#1d4ed8`             |
| `--interaction-glow`             | `#8b5cf6`                         | `#7c3aed`             |
| `--glow-blue/cyan/purple/strong` | translucent blue/cyan/purple RGBA | softened equivalents  |

Text tokens follow a perceptual hierarchy (primary → secondary → tertiary → muted) so contrast stays predictable across both themes. Scrollbar and shimmer effects use literal hardcoded colors in their respective rules rather than dedicated custom properties.

### Variant syntax

```css
@variant light (&:where(.light, .light *));
@variant dark (&:where(:not(.light), :not(.light) *));
```

Dark is the implicit default (no class needed); `light:` prefixed Tailwind utilities only apply under a `.light` ancestor. `ThemeScript.tsx` sets/removes this class synchronously before hydration to avoid a flash of the wrong theme; `ThemeProvider` (`lib/theme/context.tsx`) keeps React state in sync afterward and defaults to dark regardless of the OS `prefers-color-scheme` setting.

---

## Animation Registry (`src/lib/animations.ts`)

Every Framer Motion variant used in the app is centralized here:

| Export                       | Type                              | Notes                                                   |
| ---------------------------- | --------------------------------- | ------------------------------------------------------- |
| `DEFAULT_STAGGER`            | `0.1`                             | Default stagger delay between children                  |
| `SCROLL_VIEWPORT`            | `{ once: true, margin: '-20px' }` | Shared `whileInView` viewport options                   |
| `fadeUpVariants(delay)`      | `Variants`                        | Fade + translate-Y up                                   |
| `fadeInVariants`             | alias                             | Identical to `fadeUpVariants` — same function reference |
| `containerVariants(stagger)` | `Variants`                        | Parent container, staggers children                     |
| `staggerItemVariants(delay)` | `Variants`                        | Individual staggered child item                         |

`staggerContainerVariants`, `staggerChildVariants`, `floatVariants`, and `slideDownVariants` do
**not** exist — they were removed as unused dead code in cleanup passes (`slideDownVariants` had
no real call site despite a stale comment claiming the hero used it); don't re-add them without
a real call site.

---

## Glassmorphism & Custom Effects

Card "glass" surfaces are plain Tailwind utility combinations (`bg-bg-card` + `backdrop-blur-sm`/`-md` + a subtle border) applied directly at the call site — there's no dedicated `.glass` CSS class. The custom effects that _do_ live in `globals.css` as named classes:

- `.scanline` — the terminal's CRT scanline sweep (`@keyframes scanline`), with a `.light .scanline` override for the light theme.
- `.shimmer-scan` / `.shimmer-scan::after` — a hover sweep highlight (`@keyframes shimmer`, triggered via `.group:hover`).
- `.animate-hero` — the hero's entrance animation (`@keyframes hero-fade-in`), plain CSS rather than Framer Motion so it doesn't depend on the animation library loading first.
- `.easing-mechanical` / `.btn-mechanical` — a shared sharp-entry/smooth-settle cubic-bezier easing used on interactive buttons.

---

## Typography

JetBrains Mono, loaded via `next/font/google`, exposed as `--font-jetbrains-mono` and mapped to the Tailwind `font-mono` utility.
