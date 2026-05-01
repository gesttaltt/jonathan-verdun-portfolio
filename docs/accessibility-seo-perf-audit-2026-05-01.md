# Accessibility, SEO, Performance & Code Correctness Audit — 2026-05-01

Previous audits covered: styling/typography, animations/glassmorphism, QA credibility/content.
This audit covers the remaining dimensions.

---

## Overall Scorecard

| Dimension        | Issues      | High | Medium | Low |
| ---------------- | ----------- | ---- | ------ | --- |
| Accessibility    | 11          | 5    | 3      | 3   |
| SEO              | 4           | 2    | 1      | 1   |
| Performance      | 1           | 1    | 0      | 0   |
| Code Correctness | 4           | 3    | 1      | 0   |
| UX Completeness  | ✅ all pass | —    | —      | —   |

---

## Issues — Prioritized

### HIGH

**A1 — OpenGraph image missing from metadata**

- File: `src/lib/metadata.ts:36–43`
- `openGraph` has type, url, title, description, siteName — but no `image`. Social platforms (LinkedIn, Twitter, Slack) won't show a rich preview on share.
- The opengraph-image.tsx files exist at both EN and ES routes but are not referenced.
- Fix: add `images: [{ url: \`${canonical}/opengraph-image\`, width: 1200, height: 630, alt: description }]`to`openGraph`and`twitter` objects.

**A2 — Twitter card image missing**

- File: `src/lib/metadata.ts:44–49`
- `twitter.card: 'summary_large_image'` but no `images` array. Twitter/X cards will render without a preview image.
- Fix: add `images: [\`${canonical}/opengraph-image\`]` to the twitter object.

**A3 — workHistory[0] access unguarded in JSON-LD**

- File: `src/components/RootShell.tsx:20–24`
- `siteConfig.workHistory[0].organization` and `.url` accessed without checking if the array has any entries. If `workHistory` is emptied, this produces invalid JSON-LD with undefined values.
- Fix: wrap in `...(siteConfig.workHistory.length > 0 && { worksFor: { ... } })`.

**A4 — Terminal prompt string hardcoded in English**

- File: `src/components/Terminal.tsx:69, 86`
- `gestalt@portfolio:~$` is hardcoded in two places and never pulled from i18n. Spanish users see an English prompt.
- Fix: add a `prompt` field to the `terminal` translation object in `en.ts` / `es.ts`, use it in the Terminal component.

**A5 — LanguageSelector missing focus ring offset**

- File: `src/components/LanguageSelector.tsx:20, 30`
- `focus-visible:ring-2 focus-visible:ring-blue-500` without `focus-visible:ring-offset-2`. Focus ring overlaps text on keyboard nav. All other focusable elements in the codebase include the offset.
- Fix: add `focus-visible:ring-offset-2` to both Link classNames in LanguageSelector.

---

### MEDIUM

**B1 — SectionHeader icon not aria-hidden**

- File: `src/components/SectionHeader.tsx:57`
- Icon is purely decorative (heading text is explicit) but has no `aria-hidden`. Screen readers may announce it as a separate unnamed element.
- Fix: add `aria-hidden="true"` to the icon container div.

**B2 — QAPhilosophyGrid uses h4 under h2 — skips h3**

- File: `src/components/QAPhilosophyGrid.tsx:30`
- `<h4>` for layer names sits under an `<h2>` section heading with no `<h3>` in between. Screen reader heading navigation will have a gap.
- Fix: change `<h4>` to `<h3>` (the grid is a direct subsection of the QA Philosophy `<h2>`).

**B3 — SiteFooter GitHub copyright link has no focus-visible styling**

- File: `src/components/SiteFooter.tsx:83`
- The GitHub link in the copyright line has no `focus-visible` ring at all. All other links in the footer do.
- Fix: add `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none`.

**B4 — JSON-LD Person schema missing image + description**

- File: `src/components/RootShell.tsx:6–25`
- Missing `image` (should point to OG image URL) and `description`. These improve search engine knowledge panel generation.
- Fix: add `image: \`${siteConfig.url}/opengraph-image\``and`description: siteConfig.description` to the schema object.

---

### LOW

**C1 — Terminal container onClick not keyboard accessible**

- File: `src/components/Terminal.tsx:42`
- `<div onClick={() => inputRef.current?.focus()}>` has no keyboard equivalent. Keyboard users Tab into the input directly, so this is low impact, but it's a minor gap.
- Fix: add `onKeyDown` handler or `role="group"` as applicable.

**C2 — Terminal input missing aria-describedby**

- File: `src/components/Terminal.tsx:90`
- No `aria-describedby` explaining how to use the terminal (type `help` for commands). Screen reader users have no guidance on interaction model.
- Fix: add a visually-hidden `<p id="terminal-hint">Type 'help' for available commands</p>` and `aria-describedby="terminal-hint"` on the input.

**C3 — SystemSpecCard external link has no minimum touch target**

- File: `src/components/SystemSpecCard.tsx:40`
- Text-only link with no explicit `min-h-[44px]` padding. All other card external links (ProjectCard) have this.
- Fix: wrap in a container with `min-h-[44px] flex items-center` or add padding.

**C4 — MotionProvider loadFeatures defined inside component**

- File: `src/components/MotionProvider.tsx:6`
- `loadFeatures` arrow function is re-created on every render. No functional impact (LazyMotion memoises it internally) but cleaner outside.
- Fix: move `const loadFeatures = ...` outside the component definition.

---

## What Passed ✅

- Skip-to-main-content link: present, correctly targets `#main-content`, visible on focus (`focus:not-sr-only`).
- Canvas (InteractiveTopology): `aria-hidden="true"` and `tabIndex={-1}` — correctly excluded from a11y tree.
- hreflang: Next.js `alternates.languages` generates correct `<link rel="alternate">` tags.
- Canonical URLs: both EN and ES routes specify correct canonical.
- Robots.txt + sitemap: present and correctly configured.
- 404, 500, global-error pages: all have recovery actions (retry + home link).
- Favicon: present at `/src/app/favicon.ico`.
- Reduced motion: `MotionProvider` uses `reducedMotion="user"` — respects OS preference globally.
- Three.js code-splitting: `TopologyLoader` uses `next/dynamic` with `ssr: false` — correctly lazy-loaded.
- `LazyMotion` + dynamic features: framer-motion features are code-split.
- `useProjects` hook: correctly guarded by `ProjectProvider` in `PortfolioPage`.
- `spec.link` guards: both card components check `spec.link &&` before rendering the link element.
- ES page metadata: `buildMetadata('es')` called correctly; hreflang and canonical handled.

---

## Summary Table

| ID  | Priority | File                       | Change                                          |
| --- | -------- | -------------------------- | ----------------------------------------------- |
| A1  | High     | metadata.ts                | Add OG image to openGraph object                |
| A2  | High     | metadata.ts                | Add image to twitter object                     |
| A3  | High     | RootShell.tsx              | Guard workHistory[0] access in JSON-LD          |
| A4  | High     | Terminal.tsx, en.ts, es.ts | Internationalise terminal prompt string         |
| A5  | High     | LanguageSelector.tsx       | Add ring-offset-2 to focus ring                 |
| B1  | Medium   | SectionHeader.tsx          | aria-hidden on decorative icon container        |
| B2  | Medium   | QAPhilosophyGrid.tsx       | h4 → h3 for layer headings                      |
| B3  | Medium   | SiteFooter.tsx             | Add focus-visible ring to copyright GitHub link |
| B4  | Medium   | RootShell.tsx              | Add image + description to JSON-LD schema       |
| C1  | Low      | Terminal.tsx               | Add keyboard equivalent to container onClick    |
| C2  | Low      | Terminal.tsx               | Add aria-describedby hint to terminal input     |
| C3  | Low      | SystemSpecCard.tsx         | Add min touch target to external link           |
| C4  | Low      | MotionProvider.tsx         | Move loadFeatures outside component             |
