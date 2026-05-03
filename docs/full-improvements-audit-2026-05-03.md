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
| M3  | siteConfig.sections test coupling       | MEDIUM   | Deferred    |
| L1  | CI badge no explicit width              | LOW      | Implemented |
| L2  | No ES property-based test               | LOW      | Deferred    |
