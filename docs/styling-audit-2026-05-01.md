# Styling Audit — 2026-05-01

Comprehensive inventory of typography, color, spacing, and responsive patterns across the portfolio codebase.

---

## 1. Font Family

| Variable                | Value                                         | Applied via                       |
| ----------------------- | --------------------------------------------- | --------------------------------- |
| `--font-jetbrains-mono` | JetBrains Mono (Google Fonts, `latin` subset) | `src/lib/fonts.ts` → both layouts |

Both `(en)/layout.tsx` and `(es)/layout.tsx` inject `${jetbrainsMono.variable} font-mono antialiased` on `<body>`. Every component inherits monospace type — this is intentional for the terminal/hacker aesthetic.

`globals.css` also defines `--font-mono: var(--font-jetbrains-mono)` under `@theme inline`.

---

## 2. Font Sizes

### Full inventory by component

| Component                                        | Sizes                                                                                | Responsive variants                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **HeroHeader**                                   | `text-[10px]`, `text-4xl`, `text-5xl`, `text-6xl`, `text-8xl`, `text-9xl`, `text-sm` | `sm:text-5xl`, `md:text-6xl`, `lg:text-8xl`, `2xl:text-9xl`, `md:text-xs`, `md:text-[0.4em]` |
| **SectionHeader**                                | `text-2xl`                                                                           | —                                                                                            |
| **SiteFooter**                                   | `text-base`, `text-xs`, `text-[11px]`                                                | —                                                                                            |
| **ProjectCard**                                  | `text-[10px]`, `text-xl`, `text-sm`, `text-xs`                                       | —                                                                                            |
| **Terminal**                                     | `text-[10px]`, `text-xs`, `text-sm`, `text-base`                                     | `sm:text-xs`, `md:text-sm`, `lg:text-base`                                                   |
| **SystemSpecCard**                               | `text-[10px]`, `text-xs`, `text-sm`                                                  | —                                                                                            |
| **BioinformaticsResearchCard**                   | `text-[10px]`, `text-xs`, `text-sm`                                                  | —                                                                                            |
| **QAPhilosophyGrid**                             | `text-[10px]`, `text-xs`, `text-sm`                                                  | —                                                                                            |
| **PortfolioPage**                                | `text-lg`, `text-xs`                                                                 | —                                                                                            |
| **LanguageSelector**                             | `text-xs`                                                                            | —                                                                                            |
| **RootShell**                                    | `text-sm`                                                                            | —                                                                                            |
| **ErrorBoundary**                                | `text-xs`, `text-sm`                                                                 | —                                                                                            |
| **error.tsx / global-error.tsx / not-found.tsx** | `text-[10px]`, `text-xs`, `text-sm`, `text-8xl`                                      | —                                                                                            |

### Small text without responsive override

`text-[10px]` appears in 8+ places with no scale-up on mobile. These are all technically below the recommended minimum (16 px for body, 12 px for supplemental):

| Location                                  | Context                                       |
| ----------------------------------------- | --------------------------------------------- |
| HeroHeader tagline                        | Hero section — escalates to `md:text-xs` only |
| ProjectCard status badge                  | "Deployed / QA / Prototype" label             |
| Terminal window title                     | Window chrome                                 |
| SystemSpecCard section labels             | "INVARIANTS:", "METHODOLOGY:"                 |
| BioinformaticsResearchCard section labels | Same pattern                                  |
| QAPhilosophyGrid badges                   | Constraint indicators                         |
| Error pages (process info, digest)        | Secondary metadata — acceptable               |

`text-[11px]` in `SiteFooter` copyright line — also fixed, no responsive variant.

---

## 3. Font Weights

| Class            | Usage                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| `font-extrabold` | `h1` in HeroHeader; name in SiteFooter; constraints title in PortfolioPage |
| `font-bold`      | All `h2` (SectionHeader), most `h3`, labels, terminal prompt, badge text   |
| `font-semibold`  | Buttons, links, data display (ProjectCard meta, error page buttons)        |
| `font-medium`    | Social links (HeroHeader), QA body text, PortfolioPage sidebar text        |

No `font-light` or `font-thin` is used anywhere.

---

## 4. Letter Spacing & Text Transform

### Letter spacing

| Class               | Used in                                                                            |
| ------------------- | ---------------------------------------------------------------------------------- |
| `tracking-tighter`  | HeroHeader `h1` — dramatic tight display heading                                   |
| `tracking-tight`    | SiteFooter, error pages                                                            |
| `tracking-wide`     | SystemSpecCard `h3`, BioinformaticsResearchCard `h3`                               |
| `tracking-wider`    | Status badge text                                                                  |
| `tracking-widest`   | HeroHeader tagline, Terminal title, QAPhilosophyGrid labels, SystemSpecCard labels |
| `tracking-[0.25em]` | HeroHeader tagline (mobile)                                                        |
| `tracking-[0.4em]`  | HeroHeader tagline at `md:` breakpoint                                             |

### Text transform

`uppercase` is the dominant transform — applied to all badge/label elements, section sub-headings, and window titles. `capitalize` and `lowercase` are not used anywhere.

### Line heights

`leading-relaxed` is the only explicit variant, used in card description paragraphs (`ProjectCard`, `SystemSpecCard`, `BioinformaticsResearchCard`, `QAPhilosophyGrid`). Everything else falls through to Tailwind's default `leading-normal` (1.5).

---

## 5. Color Palette

### Text colors

**Zinc hierarchy (neutral)**

| Class           | Role                                                      |
| --------------- | --------------------------------------------------------- |
| `text-white`    | Primary headings, card titles, button labels, data values |
| `text-zinc-300` | Body text default                                         |
| `text-zinc-400` | Secondary descriptions, terminal output, card body        |
| `text-zinc-500` | Muted tertiary — taglines, labels, hints                  |
| `text-zinc-600` | Very muted — error page metadata, footer secondary        |
| `text-zinc-700` | Near-invisible — footer stack description                 |

**Accent colors**

| Class               | Semantic role                                     |
| ------------------- | ------------------------------------------------- |
| `text-blue-500`     | Primary action — prompts, links, focus indicators |
| `text-blue-400`     | Secondary / hover state                           |
| `text-blue-200`     | Tech stack badge text on hover                    |
| `text-cyan-400`     | Architecture section, SystemSpecCard              |
| `text-cyan-500`     | Cyan focus rings                                  |
| `text-purple-400`   | Bioinformatics / research headings                |
| `text-purple-500`   | Purple focus rings                                |
| `text-green-400`    | "Deployed" project status                         |
| `text-green-500`    | QA check icon                                     |
| `text-amber-300`    | Error recovery ("Try again") button               |
| `text-amber-500/80` | Warning icon in error pages                       |
| `text-red-400`      | ErrorBoundary fallback                            |
| `text-red-500/80`   | Error icon                                        |

### Background colors

| Class              | Role                                               |
| ------------------ | -------------------------------------------------- |
| `bg-white/5`       | Default card and input background                  |
| `bg-white/10`      | Hover card background                              |
| `bg-white/20`      | Strong hover / CTA                                 |
| `bg-black/20`      | Tech stack badge background                        |
| `bg-black/40`      | QAPhilosophyGrid container                         |
| `bg-blue-500/10`   | Badge and constraint list bg                       |
| `bg-blue-500/20`   | "QA" status badge                                  |
| `bg-green-500/10`  | QA check circle                                    |
| `bg-green-500/20`  | "Deployed" status badge                            |
| `bg-amber-500/10`  | "Prototype" status badge; error "Try again" button |
| `bg-amber-500/20`  | Error button hover                                 |
| `bg-purple-500/10` | "Research" status badge                            |
| `bg-purple-500/20` | "Research" hover state                             |
| `bg-zinc-500/20`   | "Archived" status badge                            |
| `bg-red-500/5`     | ErrorBoundary fallback panel                       |

### Hard-coded color values

`[#0a0a0a]` appears in every `focus-visible:ring-offset-[#0a0a0a]` rule and in `bg-[#0a0a0a]` in error pages. This is the site background color and should ideally be a CSS variable.

---

## 6. Spacing Scale

### Padding

| Value           | Frequency | Usage                                                                           |
| --------------- | --------- | ------------------------------------------------------------------------------- |
| `p-6`           | High      | Standard card padding — ProjectCard, SystemSpecCard, BioinformaticsResearchCard |
| `p-5`           | Moderate  | QAPhilosophyGrid, footer inner                                                  |
| `p-8`           | Moderate  | QAPhilosophyGrid at `sm:`, sidebar                                              |
| `px-4`          | High      | Terminal, error pages                                                           |
| `px-6`          | High      | SiteFooter, PortfolioPage main                                                  |
| `py-2`          | High      | Buttons, selectors, Terminal chrome                                             |
| `py-3`          | Moderate  | CTA buttons                                                                     |
| `px-1.5 py-0.5` | Badges    | Status badge pattern across all cards                                           |

### Margin

| Value             | Usage                        |
| ----------------- | ---------------------------- |
| `mb-2`            | Tight label spacing          |
| `mb-4`            | Standard content spacing     |
| `mb-6`            | Section sub-divisions        |
| `mb-8`            | Section separations          |
| `mb-10`           | Major section spacing        |
| `mb-14` / `mt-14` | Footer wrapper               |
| `mx-auto`         | PortfolioPage main container |

### Gap

| Value               | Usage                                          |
| ------------------- | ---------------------------------------------- |
| `gap-1`             | Terminal window circles                        |
| `gap-2`             | Icon-text pairs, link items                    |
| `gap-3`             | Heading-icon in SectionHeader, constraint list |
| `gap-4`             | Card content, HeroHeader rows                  |
| `gap-6`             | ProjectGallery, SystemSpecCard grid            |
| `gap-8`             | PortfolioPage main layout, QA grid             |
| `gap-x-16 gap-y-14` | PortfolioPage Projects + Sidebar grid          |
| `gap-y-24`          | PortfolioPage at `lg:`                         |

### Border radius

| Class          | Usage                                                                     |
| -------------- | ------------------------------------------------------------------------- |
| `rounded`      | Inline links, error page buttons                                          |
| `rounded-lg`   | Buttons, interactive controls                                             |
| `rounded-xl`   | Cards (ProjectCard, SystemSpecCard, BioinformaticsResearchCard), Terminal |
| `rounded-2xl`  | Footer, QAPhilosophyGrid, sidebar containers                              |
| `rounded-full` | LanguageSelector, progress dots                                           |

---

## 7. Responsive Breakpoints

| Breakpoint       | Properties affected                                                            |
| ---------------- | ------------------------------------------------------------------------------ |
| `sm:` (640 px)   | Typography scale, flex direction, inline display for truncated labels, padding |
| `md:` (768 px)   | Major layout shifts, column grids, heading scale, Terminal height              |
| `lg:` (1024 px)  | 12-column grid activation, large heading scale, vertical padding               |
| `2xl:` (1536 px) | Maximum heading size (`text-9xl`), max-width container cap                     |

Mobile-first strategy is consistent throughout: base styles target small viewports, breakpoints add breathing room.

---

## 8. Typographic Component Reference

### SectionHeader

```
icon badge:  h-10 w-10 rounded-lg (color varies by section)
heading:     text-2xl font-bold text-white
accent line: hidden md:block (blue-500 4px×48px)
```

Used for: Projects, Architecture, QA, Bioinformatics sections.

### HeroHeader

```
h1:      text-4xl → lg:text-8xl → 2xl:text-9xl  |  font-extrabold tracking-tighter text-transparent (gradient)
tagline: text-[10px] tracking-[0.25em] → md:text-xs md:tracking-[0.4em]  |  font-bold uppercase
```

### Status badges (all card types)

```
px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase
bg-{color}/10 text-{color}-400 border border-{color}/20
```

### Terminal prompt

```
font-bold text-blue-500
```

Output block:

```
border-l-2 border-blue-500/20 py-1 pl-4 whitespace-pre-wrap text-zinc-400
```

---

## 9. Glassmorphism Implementation

Two custom CSS classes live in `globals.css`:

```css
.glass      { background: rgba(255,255,255,0.08); backdrop-filter: blur(12px); ... }
.glass-dark { background: rgba(0,0,0,0.8);        backdrop-filter: blur(20px); ... }
```

**Used on:** SiteFooter (`.glass`), HeroHeader work-history box (`.glass`), Terminal (`.glass-dark`).

Most other cards use equivalent Tailwind utilities directly (`bg-white/5 backdrop-blur-md`). This split means the same visual effect is expressed two different ways. A future cleanup pass could consolidate to pure Tailwind utilities.

---

## 10. Inconsistencies & Issues

### A. `text-[10px]` without mobile responsive scaling

Very small text on phones. The `md:text-xs` override in HeroHeader helps slightly; all other instances have no override at all. Minimum recommended: `text-[10px] sm:text-xs`.

### B. Card border opacity varies

| Card                       | Border            |
| -------------------------- | ----------------- |
| ProjectCard                | `border-white/10` |
| SystemSpecCard             | `border-white/5`  |
| BioinformaticsResearchCard | `border-white/5`  |
| QAPhilosophyGrid           | `border-white/5`  |
| Sidebar constraint box     | `border-white/10` |

Either `/5` or `/10` — pick one and apply globally.

### C. Card corner radius varies

ProjectCard, SystemSpecCard, BioinformaticsResearchCard → `rounded-xl`  
QAPhilosophyGrid, sidebar → `rounded-2xl`

A single card radius value would tighten the design system.

### D. Hard-coded background color

`[#0a0a0a]` is repeated in ~10 `ring-offset` rules and error page backgrounds. Should be a CSS variable (`--background`) so a theme change only touches one place.

### E. Focus ring width inconsistency

Most elements: `focus-visible:ring-2`  
A few: `focus-visible:ring-1`  
Standardise on `ring-2`.

### F. Heading hierarchy in cards

| Element                          | Tag  | Size      |
| -------------------------------- | ---- | --------- |
| Projects card title              | `h3` | `text-xl` |
| SystemSpecCard title             | `h3` | `text-sm` |
| BioinformaticsResearchCard title | `h3` | `text-sm` |

`text-xl` vs `text-sm` for equivalent h3-level elements in the same grid.

### G. Glassmorphism split

`.glass` / `.glass-dark` custom classes live alongside equivalent Tailwind utilities used elsewhere. See §9.

### H. WCAG contrast candidates

The following pairs may not meet WCAG AA (4.5:1) on `#0a0a0a`:

| Text color      | Approx. hex | Concern                                  |
| --------------- | ----------- | ---------------------------------------- |
| `text-zinc-500` | #71717a     | Borderline — used for taglines and hints |
| `text-zinc-600` | #52525b     | Likely fails — used for footer secondary |
| `text-zinc-700` | #3f3f46     | Fails — footer stack description         |

---

## 11. Design System at a Glance

| Property        | Primary value                                              | Variants                                                                     |
| --------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Font family     | JetBrains Mono                                             | —                                                                            |
| Body size       | `text-sm` (14 px)                                          | `text-xs` cards, `text-base` Terminal                                        |
| Display size    | `text-8xl` / `text-9xl`                                    | Scales from `text-4xl` on mobile                                             |
| Primary weight  | `font-bold`                                                | `font-extrabold` for h1, `font-semibold` for buttons                         |
| Primary accent  | `blue-500`                                                 | `cyan` (architecture), `purple` (research), `green` (QA), `amber` (warnings) |
| Card background | `bg-white/5`                                               | `bg-black/40` (QA only)                                                      |
| Card border     | `border-white/5` or `/10`                                  | Inconsistent — see §10B                                                      |
| Card radius     | `rounded-xl`                                               | `rounded-2xl` in some containers                                             |
| Spacing unit    | 4-based (gap-4, p-6)                                       | Larger on `md+`                                                              |
| Transitions     | `transition-all duration-300`                              | `transition-colors` for text-only hovers                                     |
| Focus ring      | `ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0a0a0a]` | `ring-1` in a few places                                                     |
