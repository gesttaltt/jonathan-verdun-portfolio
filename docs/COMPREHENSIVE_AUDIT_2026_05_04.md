# Comprehensive Portfolio Audit — 2026-05-04

## 1. Executive Summary

The portfolio of **Jonathan Verdun** is in excellent structural health. All 232 tests pass, the full coverage threshold is met (100% statements / branches / functions / lines across all modules), and the framer-motion animation pipeline has been refactored to the correct R3F pattern. The QA identity is well-communicated and the codebase is tightly typed.

This audit reviews every source file as of **2026-05-04** and captures remaining inconsistencies, maintenance risks, and improvement opportunities.

### Overall Health: **Excellent**

| Dimension      | Status    | Notes                                                     |
| -------------- | --------- | --------------------------------------------------------- |
| Test coverage  | ✅ 100%   | 232 tests, 34 suites                                      |
| TypeScript     | ✅ Strict | Minimal unsafe casts                                      |
| Animations     | ✅ Clean  | Stable uniform pipeline, LazyMotion throughout            |
| a11y           | ✅ Strong | Skip-nav, landmarks, live regions, reduced-motion         |
| SEO / Metadata | ✅ Good   | JSON-LD, OG, hreflang, sitemap                            |
| i18n           | ⚠️ Risk   | ES data duplicated inline; metadata drift between layouts |
| Dead code      | ⚠️ Minor  | `fadeUpVariants` and `fadeInVariants` are identical       |
| Config hygiene | ⚠️ Minor  | CI URL, prompt, tech stack string hardcoded in components |

---

## 2. Animation & Motion System

### 2.1 Framer Motion

All animated components use the `m.*` alias rather than the full `motion.*` import, preserving the `LazyMotion` tree-shaking contract. `MotionConfig reducedMotion="user"` is set at the root, and the CSS `prefers-reduced-motion` media query in `globals.css` disables all CSS transitions and animations system-wide as a fallback layer.

| Component          | Mechanism  | Trigger                | Variant source                |
| ------------------ | ---------- | ---------------------- | ----------------------------- |
| `HeroHeader`       | `m.header` | page-load (`animate`)  | `slideDownVariants`           |
| `FadeInSection`    | `m.div`    | scroll (`whileInView`) | `fadeInVariants(delay)`       |
| `SectionHeader`    | `m.div`    | scroll (`whileInView`) | **inline**                    |
| `ProjectCard`      | `m.div`    | scroll (`whileInView`) | `fadeUpVariants(index×0.1)`   |
| `QAPhilosophyGrid` | `m.div`    | scroll (`whileInView`) | `staggerItemVariants(i×0.12)` |
| `SiteFooter`       | `m.footer` | scroll (`whileInView`) | **inline**                    |

**Remaining issues:**

- `SectionHeader` and `SiteFooter` define their animations inline rather than importing from `animations.ts`. `SectionHeader` uses `duration: 0.35` which falls between the documented timing-scale values (micro 0.3 · enter 0.45 · hero 0.55) and is inconsistent.
- `SCROLL_VIEWPORT` is exported from `animations.ts` but only used in zero components — every component hardcodes `{ once: true, margin: '-40px' }` independently.
- `FadeInSection` also hardcodes the same viewport value instead of importing `SCROLL_VIEWPORT`.

### 2.2 `animations.ts` Exports

| Export                | Status                                                     |
| --------------------- | ---------------------------------------------------------- |
| `SCROLL_VIEWPORT`     | Defined, tested; **not imported anywhere**                 |
| `fadeUpVariants`      | Used in `ProjectCard`                                      |
| `fadeInVariants`      | Used in `FadeInSection`; **identical to `fadeUpVariants`** |
| `slideDownVariants`   | Used in `HeroHeader`                                       |
| `containerVariants`   | Defined, tested; **not imported anywhere**                 |
| `staggerItemVariants` | Used in `QAPhilosophyGrid`                                 |

`fadeUpVariants` and `fadeInVariants` share the exact same implementation. One should alias the other to eliminate silent drift risk.

### 2.3 WebGL / Three.js (TopologyMesh)

The `TopologyMesh` refactor (2026-05-04) replaced the `useState` color → `useMemo` rebuild cycle with a stable `useMemo(…, [])` uniforms object. Colors are now applied via `mat.uniforms` in `useEffect` after first paint; `time` and `mouse` are mutated through `mat.uniforms` in `useFrame`. The uniforms object is never rebuilt mid-session, eliminating the previous bug where a color state change would reset `time` and `mouse` to zero.

**Outstanding item:** `useFrame` contains `meshRef.current.material as THREE.ShaderMaterial` — a cast without a runtime guard. If the material is not yet compiled (race during initial frames), this cast is safe but undiscoverable. A `instanceof THREE.ShaderMaterial` guard would make it explicit.

**Outstanding a11y item:** `TopologyMesh` rotates and pulses unconditionally. The CSS `prefers-reduced-motion` rule cannot reach WebGL. Adding a `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check to skip rotation in `useFrame` would fully honour the user's motion preference at every layer.

---

## 3. i18n & Contracts

### 3.1 Data Architecture

The English translation (`en.ts`) delegates to typed contracts (`QAContract`, `ProjectContract`, `DataEngineeringContract`, `BioinformaticsContract`). The Spanish translation (`es.ts`) **duplicates all project and spec arrays inline**. This means:

- A change to an EN contract does not propagate to ES.
- The `i18n-sync.test.ts` suite guards against structural drift but not content drift.
- ES currently has 231 lines of inline data that mirror EN contracts.

**Recommended approach:** Add a `translate(spec, locale)` function in each contract; `es.ts` imports contracts and applies locale-specific overrides only to fields that differ (title, description, tagline). This reduces ES to ~40 lines and makes contracts the single source of truth.

### 3.2 Metadata Drift

`(es)/es/page.tsx` exports its own metadata object with a hardcoded Spanish title (`'Jonathan Verdun | Automatización QA e Bioinformática'`). The canonical Spanish title defined in `buildMetadata('es')` from `metadata.ts` is `'Jonathan Verdun | Ingeniero de Automatización QA'`. These diverge. The page should call `buildMetadata('es')` and export nothing else.

### 3.3 `useTerminal` Delay Bug

`useTerminal.ts` line ~30 computes `delay || 800`. Because `||` treats `0` as falsy, a boot command with `delay: 0` will fire after 800 ms instead of immediately. This should be `delay ?? 800` (nullish coalescing).

---

## 4. Hardcoded Values in Components

The following values are scattered across components and should be extracted to `siteConfig.ts` or a dedicated constants module:

| Value                                                              | Location              | Impact                                  |
| ------------------------------------------------------------------ | --------------------- | --------------------------------------- |
| GitHub CI workflow URL                                             | `PortfolioPage.tsx`   | Changes if repo name changes            |
| Terminal prompt `gestalt@portfolio:`                               | `Terminal.tsx`        | Duplication risk; not i18n-aware        |
| Tech stack string `Next.js · TypeScript · Tailwind CSS · Three.js` | `SiteFooter.tsx`      | Manual sync with `package.json`         |
| `LS_PROJECTS_OUTPUT` terminal string                               | `TerminalContract.ts` | Should be generated from `PROJECT_DATA` |
| Work history dates `Sep 2025 - Apr 2026`                           | `siteConfig.ts`       | Already in config — good; keep updating |

---

## 5. TypeScript Strictness

| File                       | Issue                                                                                    | Severity |
| -------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| `TopologyMesh.tsx`         | `as THREE.ShaderMaterial` cast (×2) without `instanceof` guard                           | Low      |
| `TopologyMesh.tsx`         | `meshRef.current?.material` optional chain in `useEffect` but non-optional in `useFrame` | Low      |
| `i18n/context.tsx`         | `useTranslation` falls back to `en` silently if called outside provider                  | Low      |
| `i18n/context.tsx`         | `pathname` can be `null` (guarded in provider, not in hook)                              | Low      |
| `ProjectContract.types.ts` | `status` field is a string union — correct, no issue                                     | —        |

---

## 6. Accessibility

### Strengths

- Skip-to-content link rendered in `RootShell` with correct `focus:not-sr-only` behavior.
- Terminal has `role="log"`, `aria-live="polite"`, `aria-busy` during boot, and a `sr-only` hint.
- All external links carry `aria-label` and `rel="noopener noreferrer"`.
- Interactive elements enforce `min-h-[44px]` / `min-w-[44px]` touch targets.
- `ErrorBoundary` uses `role="alert"` for assertive failure notification.
- Heading hierarchy is correct across all pages (single `h1` per page, `h2` for sections, `h3` for cards).
- `prefers-reduced-motion` respected at CSS level (`globals.css`) and Framer Motion level (`MotionProvider`).

### Gaps

- WebGL animations (`TopologyMesh`) are not gated on `prefers-reduced-motion`.
- No `aria-describedby` connecting section headers to their content regions.
- No breadcrumb or `BreadcrumbList` schema.org markup (minor for a single-page portfolio).

---

## 7. SEO & Metadata

### Strengths

- JSON-LD `Person` schema with `jobTitle`, `email`, `url`, `sameAs`, and detailed `knowsAbout` array.
- Dynamic OG images via Next.js `/opengraph-image` routes for both locales.
- Correct `hreflang` alternates in `buildMetadata`.
- `sitemap.ts` with priority weighting and optional `lastModified` env var.
- `robots.ts` with sitemap reference.

### Gaps

- ES page exports duplicate metadata instead of using `buildMetadata('es')` (see §3.2).
- EN and ES `opengraph-image.tsx` files are nearly identical — only the tagline string differs. A single shared component with a locale prop would eliminate duplication.
- `sitemap.ts` `lastModified` falls back to `undefined` when env var is absent; hardcoding the last deploy date would be more stable for search engines.
- No `BreadcrumbList`, `WebPage`, or `WebSite` schema.org types (nice-to-have, not required).

---

## 8. Performance

- `LazyMotion` with dynamic `domAnimation` import reduces the initial JS bundle by ~16 KB (full framer-motion tree not loaded on parse).
- `InteractiveTopology` loaded via `dynamic(…, { ssr: false })` — Three.js never executes server-side.
- Mobile DPR capped at 1.5× (vs 2× desktop); subdivision detail halved (8 vs 16). Correct.
- `EffectComposer` uses `multisampling={0}` — no MSAA overhead.
- `BlurSimple` is not used; Bloom uses `mipmapBlur` which is GPU-friendly.
- No `Suspense` boundary around `TopologyLoader` — the dynamic import's `loading` callback handles the skeleton, so Suspense is not needed here.

---

## 9. Test Suite Health

- **232 tests, 34 suites, 0 failures.**
- **100% statement / branch / function / line coverage** across all modules (threshold enforced in `jest.config.ts`).
- `i18n-sync.test.ts` ensures ES and EN contract arrays stay structurally in sync.
- `property-based.test.ts` uses `fast-check` for command processing and project service determinism.
- Branch tests (`HeroHeader.branches`, `Terminal.branches`) cover guard conditions that smoke tests miss.

---

## 10. Prioritised Improvement Plan

### HIGH — correctness / drift risk

| #   | Issue                                                | File(s)              | Fix                                                                   |
| --- | ---------------------------------------------------- | -------------------- | --------------------------------------------------------------------- |
| H1  | `delay \|\| 800` treats 0 as falsy                   | `useTerminal.ts:~30` | Change to `delay ?? 800`                                              |
| H2  | ES page metadata diverges from `buildMetadata('es')` | `(es)/es/page.tsx`   | Delete inline metadata; `export const metadata = buildMetadata('es')` |
| H3  | ES translations duplicate contract data              | `i18n/es.ts`         | Refactor: import contracts, apply locale overrides only               |

### MEDIUM — consistency / maintainability

| #   | Issue                                                  | File(s)                               | Fix                                                                           |
| --- | ------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------- |
| M1  | `SectionHeader` and `SiteFooter` use inline animations | `SectionHeader.tsx`, `SiteFooter.tsx` | Import named variants from `animations.ts`; fix duration to timing scale      |
| M2  | `SCROLL_VIEWPORT` never imported                       | All animated components               | Replace every `{ once: true, margin: '-40px' }` with `SCROLL_VIEWPORT` import |
| M3  | `fadeUpVariants` and `fadeInVariants` identical        | `animations.ts`                       | Alias one to the other: `export const fadeInVariants = fadeUpVariants`        |
| M4  | OG image duplicated for EN/ES                          | `opengraph-image.tsx` (both)          | Extract shared layout; inject locale tagline as prop                          |
| M5  | WebGL ignores `prefers-reduced-motion`                 | `TopologyMesh.tsx`                    | Add `matchMedia` check; skip rotation when reduce-motion set                  |

### LOW — polish / hygiene

| #   | Issue                                   | File(s)               | Fix                                                   |
| --- | --------------------------------------- | --------------------- | ----------------------------------------------------- |
| L1  | CI URL hardcoded                        | `PortfolioPage.tsx`   | Move to `siteConfig.socialLinks.github` derived field |
| L2  | Terminal prompt hardcoded               | `Terminal.tsx`        | Move to `siteConfig` or `TerminalContract`            |
| L3  | Tech stack string hardcoded in footer   | `SiteFooter.tsx`      | Move to `siteConfig` array                            |
| L4  | `LS_PROJECTS_OUTPUT` manual string      | `TerminalContract.ts` | Generate from `PROJECT_DATA` titles                   |
| L5  | `as THREE.ShaderMaterial` without guard | `TopologyMesh.tsx`    | Add `instanceof` check or type predicate              |
| L6  | `useTranslation` falls back silently    | `i18n/context.tsx`    | Add `console.warn` in dev mode when outside provider  |
| L7  | `containerVariants` never imported      | `animations.ts`       | Use it in `QAPhilosophyGrid` or remove                |

---

## 11. What Was Fixed Since 2026-05-03

| Item                                                          | Commit    | Status  |
| ------------------------------------------------------------- | --------- | ------- |
| `fadeInVariants` export added                                 | `83de379` | ✅ Done |
| `staggerItemVariants` converted to function                   | `83de379` | ✅ Done |
| `SCROLL_VIEWPORT` and `containerVariants` added and tested    | `83de379` | ✅ Done |
| `TopologyMesh` uniform pipeline stabilised (no state rebuild) | `83de379` | ✅ Done |
| `animations.ts` coverage restored to 100%                     | `83de379` | ✅ Done |

---

_Audit conducted 2026-05-04 by Claude Sonnet 4.6 against commit `83de379`._
