# Animation & Glassmorphism Audit — 2026-05-01

## Goal

Achieve more professionalism and elegant minimalism while avoiding maximalism. Identify inconsistencies in animation timing, scroll-trigger behavior, glassmorphism, and unused CSS.

---

## Animation Timing — Current State

| Variant               | Duration | Usage                        |
| --------------------- | -------- | ---------------------------- |
| `staggerItemVariants` | 0.35s    | QAPhilosophyGrid items       |
| `fadeInVariants`      | 0.45s    | FadeInSection (all sections) |
| `fadeUpVariants`      | 0.50s    | ProjectCard, SectionHeader   |
| `slideDownVariants`   | 0.60s    | HeroHeader                   |

Four distinct durations with no semantic naming. No shared timing token.

---

## Viewport Margins — Current State

| Component          | margin  | Notes                                                  |
| ------------------ | ------- | ------------------------------------------------------ |
| `FadeInSection`    | `-80px` | Most aggressive — fires well before element is visible |
| `SectionHeader`    | `-60px` | Moderately early                                       |
| `ProjectCard`      | `-50px` | Moderate                                               |
| `QAPhilosophyGrid` | `-40px` | Conservative — most natural                            |
| `SiteFooter`       | `-40px` | Conservative                                           |

Five different values; no standardization.

---

## Issues — Prioritized

### HIGH

**H1 — FadeInSection viewport margin too aggressive**

- File: `src/components/FadeInSection.tsx:18`
- Current: `margin: '-80px'`
- Fires animation before element enters viewport. On slow scroll the card pops in "early" — breaks the reveal effect.
- Fix: change to `-40px` to match the project's conservative baseline.

**H2 — Inconsistent animation durations (no timing scale)**

- File: `src/lib/animations.ts`
- Four durations (0.35, 0.45, 0.50, 0.60) with no semantic grouping.
- Recommended scale:
  - `enter`: 0.45s — base reveal duration (replaces 0.45 and 0.5, collapses two values)
  - `hero`: 0.55s — replaces slideDownVariants 0.6s (slightly tighter)
  - `micro`: 0.3s — replaces 0.35s for stagger items (snappier micro-interactions)
- This reduces four values to three with clear intent.

**H3 — QAPhilosophyGrid status badge missing `transition-colors`**

- File: `src/components/QAPhilosophyGrid.tsx:32`
- `group-hover:text-zinc-300` applied without `transition-colors` — color snaps on hover.
- Fix: add `transition-colors` to the badge span.

**H4 — Unused `.crt` CSS block**

- File: `src/app/globals.css:82-101`
- `.crt::before` defined but no element uses the `crt` class anywhere in the codebase.
- Fix: delete the entire block.

---

### MEDIUM

**M1 — Standardize viewport margins to two values**

- Currently: 5 distinct values (-80, -60, -50, -40, -40).
- Proposed: `-40px` for all scroll-triggered reveals. This is the most natural value (animations fire as element enters lower viewport) and already used by QAPhilosophyGrid and SiteFooter.
- SectionHeader `-60px` → `-40px`
- ProjectCard `-50px` → `-40px`
- FadeInSection `-80px` → `-40px` (covered by H1)

**M2 — Terminal `isBooting` state transitions with no opacity fade**

- File: `src/components/Terminal.tsx:82`
- The prompt area conditionally renders with `{!isBooting && (...)}` — it appears/disappears as a DOM snap, no opacity transition.
- Fix: render prompt area always, use `opacity-0` / `opacity-100` + `transition-opacity duration-300` controlled by `isBooting`.

---

### LOW

**L1 — Document `--glow-*` variable usage**

- `globals.css` defines `--glow-blue`, `--glow-cyan`, `--glow-purple` but their per-card assignment is implicit.
- Not a code bug, but a maintenance note: add inline comments next to each card's hover shadow noting which semantic color it uses.

---

## What to Keep (Elegant / Well-Done)

- All animation variants use `ease: 'easeOut'` consistently — do not change.
- `MotionProvider` uses `reducedMotion="user"` — respects OS accessibility preference.
- `LazyMotion` wraps the app — code-split animation features, good for performance.
- Stagger delays are all ≤ 150ms — not excessive, feels snappy.
- Card glassmorphism is unified after styling audit: `bg-white/5`, `backdrop-blur-md`, `border-white/10` pattern is consistent across all cards.
- Glow orbs (`bg-blue-500/6`, `bg-purple-600/10`, `blur-3xl`) are appropriately subtle — keep as-is.
- Card hover glows use CSS custom properties (`var(--glow-*)`) — clean, easy to tune globally.
- All `whileInView` animations use `once: true` — correct for a portfolio (no jarring re-triggers on scroll-up).

---

## Summary Table

| ID  | Priority | File                               | Change                                          |
| --- | -------- | ---------------------------------- | ----------------------------------------------- |
| H1  | High     | FadeInSection.tsx                  | `-80px` → `-40px`                               |
| H2  | High     | animations.ts                      | Consolidate 4 durations to 3 semantic values    |
| H3  | High     | QAPhilosophyGrid.tsx               | Add `transition-colors` to status badge         |
| H4  | High     | globals.css                        | Delete unused `.crt::before` block              |
| M1  | Medium   | SectionHeader.tsx, ProjectCard.tsx | `-60px`, `-50px` → `-40px`                      |
| M2  | Medium   | Terminal.tsx                       | Add opacity fade for isBooting → prompt reveal  |
| L1  | Low      | Card components                    | Inline comments for `--glow-*` variable mapping |
