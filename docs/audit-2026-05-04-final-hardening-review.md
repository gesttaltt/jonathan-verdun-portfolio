# Final Hardening & Comprehensive Review — May 2026

Consolidated from 4 dated audits (2026-05-01 → 2026-05-04) covering a cross-cutting
accessibility/SEO/performance sweep, a full functional bug hunt, and a capstone review that
closed out the audit sequence. All findings below are resolved.

---

## Accessibility, SEO & performance sweep (2026-05-01)

- OG image and Twitter card `images` arrays were missing from `metadata.ts` despite the OG
  image routes already existing.
- `workHistory[0]` was accessed unguarded in JSON-LD — would have broken if the array ever
  emptied.
- The terminal prompt (`gestalt@portfolio:~$`) was hardcoded in English and never
  internationalized.
- `LanguageSelector` was missing `focus-visible:ring-offset-2`.
- A fairly long "What Passed" list confirmed skip-nav, canvas `aria-hidden`, hreflang,
  canonical URLs, and the 404/500/global-error pages were all already correct.

## Functional bug hunt (2026-05-02)

Real, previously-undocumented functional defects found post QA-identity rebrand:

- The Spanish `limpiar` command was advertised in the terminal's help text but silently did
  nothing — only the English `clear` actually worked.
- The 4th project ("3-Adic ML") was missing from the terminal's `ls projects` output.
- A ghost `research` terminal command still worked but was undocumented, contradicting the
  post-rebrand de-emphasis of the research section.
- JSON-LD `knowsAbout` still led with "Bioinformatics" after the site had rebranded QA-first.
- Flagged that contract classes (`QAContract`, etc.) were only referenced by tests —
  components consumed data via the i18n layer instead, so contract data could silently drift
  from what visitors actually saw. This risk was confirmed as real two audits later (see
  below).

## Deep iteration pass (2026-05-03)

Most items in this pass were already marked "Implemented" in the audit itself:

- Raw `<img>` tag triggered an ESLint warning on the CI badge.
- Work-history description wasn't localized, and text contrast was too low
  (`zinc-600` → `zinc-500`).
- **`worksFor` in JSON-LD implied current employment for a role that had already ended in
  April 2026** — removed entirely rather than leaving misleading structured data live.
- Added a new `accessibility.test.tsx` suite (landmarks, heading hierarchy, link safety, alt
  text).
- Enabled `noUnusedLocals` / `noUnusedParameters` in `tsconfig.json`; stripped a stale
  `import React` from 18 files.

## Capstone review (2026-05-04) — 232 tests, 100% coverage at the time

- Confirmed `fadeUpVariants` and `fadeInVariants` had ended up byte-identical (dead
  duplication from the animation-timing pass); `SCROLL_VIEWPORT` and `containerVariants`
  were exported but never imported.
- `delay || 800` treated `delay: 0` as falsy — a nullish-coalescing bug, fixed to `?? 800`.
- **Confirmed the i18n-drift risk flagged on 2026-05-02**: `es.ts` was found to duplicate
  ~231 lines of contract data inline rather than deriving from the contracts.
- The Spanish page was exporting its own metadata object instead of calling
  `buildMetadata('es')`, letting page titles diverge between locales.
- The WebGL `TopologyMesh` still ignored `prefers-reduced-motion` — only the CSS and Framer
  Motion layers respected it at the time.
