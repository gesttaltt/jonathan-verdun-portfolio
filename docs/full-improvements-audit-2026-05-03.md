# Full Improvements Audit — 2026-05-03

---

## Findings

### H1 — ESLint warning: `<img>` in PortfolioPage (HIGH)

**File:** `src/components/PortfolioPage.tsx:92`
**Problem:** CI badge uses a raw `<img>` tag. Next.js flags this as `@next/next/no-img-element`. Warning only (not a CI error) but should be clean.
**Fix:** Add `eslint-disable-next-line` comment. The badge is a tiny external SVG — next/image optimization adds no value here.

---

### H2 — Work history description not localized (HIGH)

**File:** `src/components/HeroHeader.tsx:80`, `src/lib/siteConfig.ts`
**Problem:** `entry.description` comes from `siteConfig` (English-only). Switching to Spanish locale still shows English text in the work history card.
**Fix:** Move to `Translations` — add `workHistoryDescriptions: string[]` to the interface, provide EN and ES values, render from `t.workHistoryDescriptions[i]` in HeroHeader.

---

### H3 — Work history description text contrast (HIGH)

**File:** `src/components/HeroHeader.tsx:80`
**Problem:** `text-zinc-600` (#52525b) on a `bg-white/8` dark card — significantly darker than surrounding `text-zinc-500` role/period line. Low contrast on dark backgrounds.
**Fix:** `text-zinc-600` → `text-zinc-500`.

---

### M1 — siteConfig meta description too generic (MEDIUM)

**File:** `src/lib/siteConfig.ts:11`
**Current:** "focused on test-driven development, automation pipelines, and engineering quality"
**Problem:** Vague for QA role search SEO. Doesn't mention any specific tooling.
**Fix:** Mention pytest, Playwright, Appium, property-based testing.

---

### M2 — No QA project count assertion in tests (MEDIUM)

**File:** `src/__tests__/ProjectContract.test.ts`
**Problem:** Tests verify project shape (required fields, unique IDs) but don't assert that the QA projects exist as a group. Adding 3 QA projects in this session has no test guardrail — removing one would go undetected.
**Fix:** Add `expect(qaProjects.length).toBeGreaterThanOrEqual(3)`.

---

### M3 — `siteConfig.sections` — test coupling smell (MEDIUM)

**File:** `src/__tests__/page.test.tsx:31-33`
**Problem:** `page.test.tsx` asserts rendered headings using `siteConfig.sections.qa.title` and `siteConfig.sections.projects.title`, but the rendered values come from `t.sections.qa` (translations). If the translation diverges from siteConfig, the test silently asserts the wrong thing. `siteConfig.sections` is not used by any component — it only exists as a test reference.
**Fix (deferred):** Update page.test.tsx to assert against translation values directly, then remove `siteConfig.sections`. Deferred because it requires verifying all `page.test.tsx` assertions and is low risk as-is.

---

### L1 — CI badge `<img>` has no explicit width (LOW)

**File:** `src/components/PortfolioPage.tsx:92`
**Problem:** `h-5` sets height but no width. GitHub SVG badges report intrinsic dimensions so browsers handle this correctly, but adding `w-auto` makes the intent explicit.
**Fix:** Add `w-auto` to className.

---

### L2 — No property-based test for ES locale commands (LOW)

**File:** `src/__tests__/property-based.test.ts`
**Problem:** Property-based test only runs against `DefaultCommandProcessor` (EN locale). ES interactive commands (ayuda, sobre, proyectos, etc.) have no fuzzing coverage.
**Fix (deferred):** Add a second `fc.property` block using ES interactive map. Low priority since ES commands are covered by unit tests.

---

## Summary Table

| ID  | Issue                                   | Priority | Status      |
| --- | --------------------------------------- | -------- | ----------- |
| H1  | `<img>` ESLint warning                  | HIGH     | Implemented |
| H2  | Work history description not localized  | HIGH     | Implemented |
| H3  | Work history description text contrast  | HIGH     | Implemented |
| M1  | siteConfig meta description too generic | MEDIUM   | Implemented |
| M2  | No QA project count assertion           | MEDIUM   | Implemented |
| M3  | siteConfig.sections test coupling       | MEDIUM   | Implemented |
| L1  | CI badge no explicit width              | LOW      | Implemented |
| L2  | No ES property-based test               | LOW      | Implemented |

---

## Deep Iteration — 2026-05-03

### D1 — ES_DESCRIPTION in metadata.ts not updated to match EN (HIGH)

**File:** `src/lib/metadata.ts:7`
**Problem:** Spanish meta description still used the old generic text ("enfocado en desarrollo guiado por pruebas, pipelines de automatización y calidad de ingeniería") after EN was updated to mention pytest, Playwright, Appium, and property-based testing. Spanish SEO was less specific than English.
**Fix:** Updated to mirror EN specificity — mentions pytest, Playwright, Appium, and property-based testing with GitHub Actions CI.
**Status:** Implemented

---

### D2 — `worksFor` in Schema.org JSON-LD implies current employer (HIGH)

**File:** `src/components/RootShell.tsx:23`
**Problem:** JSON-LD `worksFor` property implies a current employment relationship. The Ai-Whisperers role ended April 2026. Including it sends incorrect structured data to search engines.
**Fix:** Removed the `worksFor` spread entirely. The work history is still visible in the UI via HeroHeader; Schema.org structured data no longer implies a current role that ended.
**Status:** Implemented

---

### D3 — `knowsAbout` in Schema.org JSON-LD missing key tooling (MEDIUM)

**File:** `src/components/RootShell.tsx:16`
**Problem:** `knowsAbout` listed generic terms ('QA Automation', 'Test-Driven Development') but omitted the specific tools now featured in the meta description and project cards (Playwright, pytest, Appium, GitHub Actions CI).
**Fix:** Added 'Playwright', 'pytest', 'Appium', 'GitHub Actions CI' to the array.
**Status:** Implemented

---

### D4 — External links in card components missing `aria-label` (MEDIUM)

**Files:** `src/components/BioinformaticsResearchCard.tsx:38`, `src/components/SystemSpecCard.tsx:37`
**Problem:** Both cards render external GitHub links whose visible text is the repo path (e.g. `gesttaltt/codon-encoder`). The `ExternalLink` icon has no alt text and the link has no `aria-label`, making the accessible name terse and context-free for screen readers.
**Fix:** Added `aria-label={`View ${repo} on GitHub (opens in new tab)`}` to both link elements.
**Status:** Implemented

---

### D5 — `PROJECT_STATUS_STYLES` uses loose `Record<string, string>` type (LOW)

**File:** `src/components/ProjectCard.tsx:10`
**Problem:** The status-to-className map used `Record<string, string>`, allowing any string key. TypeScript provided no exhaustiveness checking — adding a new status value to `ProjectSpec['status']` would silently fall through to the `?? 'bg-zinc-500/20 text-zinc-400'` fallback with no compile-time warning.
**Fix:** Changed to `Record<ProjectSpec['status'], string>` — TypeScript now requires all five status values to be present and rejects unknown keys.
**Status:** Implemented

---

### D6 — No accessibility test suite (MEDIUM)

**File:** `src/__tests__/accessibility.test.tsx` (new)
**Problem:** No test file asserted core a11y invariants: single `<main>` landmark, skip-nav target `#main-content`, single `<h1>`, external links having `rel="noopener"`, images having `alt` text. These guarantees existed by construction but were unguarded.
**Fix:** Created `src/__tests__/accessibility.test.tsx` with four describe blocks covering landmarks, heading hierarchy, external link safety, and image alt text.
**Status:** Implemented

---

### D7 — `noUnusedLocals` / `noUnusedParameters` not enabled in tsconfig (LOW)

**File:** `tsconfig.json`
**Problem:** TypeScript strict mode does not include `noUnusedLocals` or `noUnusedParameters`. Dead code (unused imports, declared-but-unused variables) can accumulate without compiler feedback.
**Fix (deferred):** Adding these flags is straightforward but requires a clean `tsc --noEmit` pass to confirm no existing violations before enabling. Defer to next CI-verified iteration.
**Status:** Deferred

---

## Deep Iteration Summary

| ID  | Issue                                              | Priority | Status      |
| --- | -------------------------------------------------- | -------- | ----------- |
| D1  | ES_DESCRIPTION generic text                        | HIGH     | Implemented |
| D2  | `worksFor` implies active role that ended Apr 2026 | HIGH     | Implemented |
| D3  | `knowsAbout` missing Playwright/pytest/Appium      | MEDIUM   | Implemented |
| D4  | External card links missing `aria-label`           | MEDIUM   | Implemented |
| D5  | `PROJECT_STATUS_STYLES` loose `Record<string>`     | LOW      | Implemented |
| D6  | No accessibility test suite                        | MEDIUM   | Implemented |
| D7  | `noUnusedLocals`/`noUnusedParameters` not enabled  | LOW      | Deferred    |
