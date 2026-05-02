# Improvement Audit — 2026-05-02

Previous audits: animation, QA identity/credibility, accessibility/SEO/code-correctness.
This audit sweeps the full codebase for residual bugs, content gaps, test coverage holes, and architectural debt.

---

## Overall Scorecard

| Dimension       | Issues | High | Medium | Low |
| --------------- | ------ | ---- | ------ | --- |
| Correctness     | 3      | 3    | 0      | 0   |
| Content & Copy  | 4      | 2    | 2      | 0   |
| Test Coverage   | 4      | 1    | 3      | 0   |
| Architecture/DX | 4      | 0    | 2      | 2   |
| Accessibility   | 1      | 1    | 0      | 0   |
| Polish          | 2      | 0    | 1      | 1   |

---

## Issues — Prioritized

### HIGH

**X1 — `limpiar` advertised in ES help but never executes**

- File: `src/components/hooks/useTerminal.ts:54`, `src/lib/i18n/es.ts:167`, `src/lib/contracts/TerminalContract.ts:6`
- `useTerminal.execute` hard-codes `if (cmd.toLowerCase() === 'clear')` — only the English word clears the terminal. Spanish help output (`ES_HELP_OUTPUT`) lists `limpiar` as a valid command, but typing it returns "bash: limpiar: command not found." An advertised command that silently fails is a real UX bug.
- Fix: extend the `clear` guard: `if (['clear', 'limpiar'].includes(cmd.toLowerCase()))`.

**X2 — `3-Adic ML` missing from `LS_PROJECTS_OUTPUT`**

- File: `src/lib/contracts/TerminalContract.ts:2–3`
- The terminal's `ls projects` / `ls proyectos` output lists three projects (`QA-Arxiv-Mobile`, `Functionome-Atlas`, `Gene-Functional-Pipeline`). The portfolio has four projects — `3-Adic ML` (proj-04) was added during the credibility refactor but `LS_PROJECTS_OUTPUT` was never updated. Both EN and ES terminal boot sequences share this constant, so the omission affects both locales.
- Fix: add `3-Adic-ML` to the `LS_PROJECTS_OUTPUT` string.

**X3 — `research` ghost command responds but is not in help text**

- File: `src/lib/contracts/TerminalContract.ts:12`, `src/lib/services/CommandProcessor.ts`
- `INTERACTIVE_COMMANDS` contains a `research` key. The help output does **not** list it. A user typing `research` gets a response; a user reading help has no way to discover it. More importantly, after the QA-first identity refactor the response still directs to "Technical Background" — a section being downplayed at 60% opacity. The command contradicts the current brand positioning.
- Fix: remove `research` from `INTERACTIVE_COMMANDS`. The Technical Background section is reachable by scrolling; no terminal route needed.

**X4 — JSON-LD `knowsAbout` leads with bioinformatics after QA-first rebrand**

- File: `src/components/RootShell.tsx:16–21`
- Schema.org `knowsAbout` array is `['QA Automation', 'Bioinformatics', 'Computational Biology', 'Test-Driven Development']`. Bioinformatics is listed second and third. Search engine knowledge panels read this array in order. After the QA-identity refactor, this still signals bioinformatics as a primary expertise.
- Fix: reorder to `['QA Automation', 'Test-Driven Development', 'Automation Engineering', 'Property-Based Testing', 'Bioinformatics']`.

---

### MEDIUM

**Y1 — Hero work-history ping dot signals "currently active" for a past role**

- File: `src/components/HeroHeader.tsx:59–61`
- The animated ping (`animate-ping`, blue dot) is a common UI convention for "live" or "currently working here." The single work history entry has `period: 'Sep 2025 – Apr 2026'` — it ended one month ago. The pulse animation is misleading to visitors who may infer current employment.
- Fix: either remove the ping animation from the work history card and replace with a static dot, or add an "Available" badge / indicator to the hero to clearly signal open-to-work status (which is already in the sidebar contact section but absent from the most visible part of the page).

**Y2 — `metadata.test.ts` does not verify OG/Twitter images**

- File: `src/__tests__/metadata.test.ts`
- The OpenGraph `images` array and Twitter `images` array were added in the last session (A1/A2 fixes) but no test asserts their presence or correct URL structure. A future refactor of `metadata.ts` could silently remove them.
- Fix: add assertions for `(m.openGraph as { images: Array<{url: string}> }).images[0].url` and `(m.twitter as { images: string[] }).images[0]`.

**Y3 — `contracts.test.tsx` does not assert `objective` is populated**

- File: `src/__tests__/contracts.test.tsx`
- `TestSuiteSpecification.objective` was added as a required field in the last session, but `contracts.test.tsx` only checks `status` and `constraints`. No test asserts that every specification has a non-empty `objective`. The portfolio's QA-first positioning depends on these objectives being readable — a blank string would render silently.
- Fix: add a test iterating `QA_PHILOSOPHY.specifications` and asserting `spec.objective.length > 0`.

**Y4 — Property-based test `knownCommands` exclusion set is incomplete**

- File: `src/__tests__/property-based.test.ts:22`
- The test for "unknown commands always echo the original input back" excludes `['help', 'about', 'projects', 'contact', 'ls projects', 'sudo']` from fast-check generation. However, `research` exists in `INTERACTIVE_COMMANDS` and is not excluded. If fast-check generates `research`, the processor returns the `research` output string which happens to contain the substring `research` — so the test passes by coincidence rather than correctness. Once `research` is removed (X3), this becomes moot; if kept, `research` must be added to the exclusion set.
- Fix: resolve after X3. If `research` is removed, the exclusion set is complete. If kept, add `'research'` to `knownCommands`.

**Y5 — `ErrorBoundary` fallback has no `aria-live` region**

- File: `src/components/ErrorBoundary.tsx:44`
- When the error fallback replaces a component, screen readers are not notified. The fallback `<div>` has no `role="alert"` or `aria-live="assertive"`, so keyboard and AT users only discover the error state by tabbing into it. This was noted in a prior session summary but not yet fixed.
- Fix: add `role="alert"` to the outer fallback `<div>`.

**Y6 — Footer copyright missing `©` symbol**

- File: `src/components/SiteFooter.tsx:77–78`
- Copyright line renders as `2026 Jonathan Verdun @gesttaltt on GitHub.` without the `©` character. Every professional portfolio uses the symbol; its absence looks like an oversight.
- Fix: change to `© {year} {siteConfig.name}`.

---

### LOW

**Z1 — `CURRENT_YEAR` captured at module load (build time) in SiteFooter**

- File: `src/components/SiteFooter.tsx:10`
- `const CURRENT_YEAR = new Date().getFullYear()` is evaluated once at module initialization — for a static export this means build time. If the site is deployed and not rebuilt after Jan 1, the footer shows the wrong year. Low risk since deployment likely runs on changes, but the pattern is fragile.
- Fix: move to a dynamic expression inside the component (`const year = new Date().getFullYear()`), or derive from `siteConfig` with a build-year constant.

**Z2 — `uiConfig.ts` is a single-use module with no abstraction value**

- File: `src/lib/uiConfig.ts`, `src/components/ProjectCard.tsx`
- `uiConfig.ts` exports only `STATUS_COLOR_MAP`, which is imported in exactly one component (`ProjectCard`). It provides no shared behavior, no reusable logic, and no interface boundary. The indirection adds file-system noise with no benefit.
- Fix: inline `STATUS_COLOR_MAP` directly into `ProjectCard.tsx` as a local `const`.

**Z3 — Data architecture: contract classes exist only for tests, mirroring i18n data**

- Files: `src/lib/contracts/QAContract.ts`, `DataEngineeringContract.ts`, `BioinformaticsContract.ts`, `ProjectContract.ts`
- Components consume data exclusively via `useTranslation()`. The contract classes (`QA_PHILOSOPHY`, `DataEngineeringService`, `BioinformaticsService`, `ProjectService`) are referenced only in tests. They hold English-only data that is a manual copy of what lives in `en.ts` and `es.ts`. Any update to i18n data can silently diverge from contract data, and contract tests will still pass while the live site shows different content.
- This is a structural risk, not an active bug. The fix requires a decision:
  - **Option A (preferred):** Make contracts the single source of truth; i18n layers translate the contracts' data. Components still use `useTranslation()` but the translation files import from contracts rather than re-declaring data.
  - **Option B:** Remove the service classes and rewrite contract tests against i18n data directly.
- No immediate action required, but the divergence risk grows with every content update.

**Z4 — `Terminal.prompt` i18n field is always the same string**

- Files: `src/lib/i18n/en.ts:163`, `src/lib/i18n/es.ts:168`
- `prompt: 'gestalt@portfolio:'` is identical in both locales. Since it's a hostname, it was correct to i18n-ify it (A4 fix), but it adds noise to the `Translations` type for zero localization benefit today. If the prompt never changes per locale, it could be a constant in the Terminal component instead of a translation field.
- This is low impact; leave as-is unless a locale-specific prompt is planned.

---

## What Passed ✅

- All 198 tests green post-a11y-fix session.
- `tsc --noEmit` exits clean (confirmed after `.next` removal).
- Build produces 9 correct static routes including EN + ES OG images.
- `limpiar` ES help output format is consistent (just the command handling is broken — X1).
- `clear` command in EN terminal works correctly.
- `sudo` easter egg correctly excluded from help but still functional.
- OG + Twitter images now populated (A1/A2 — previous session).
- `workHistory[0]` guard in JSON-LD (A3 — previous session).
- All WCAG/a11y issues from previous audit resolved.
- Heading hierarchy (h1→h2→h3) correct throughout.
- Focus ring consistency across all interactive elements.

---

## Summary Table

| ID  | Priority | File(s)                       | Change                                                       |
| --- | -------- | ----------------------------- | ------------------------------------------------------------ |
| X1  | High     | useTerminal.ts                | Handle `limpiar` as alias for `clear`                        |
| X2  | High     | TerminalContract.ts           | Add `3-Adic-ML` to `LS_PROJECTS_OUTPUT`                      |
| X3  | High     | TerminalContract.ts           | Remove `research` ghost command from INTERACTIVE_COMMANDS    |
| X4  | High     | RootShell.tsx                 | Reorder `knowsAbout` to lead with QA skills                  |
| Y1  | Medium   | HeroHeader.tsx                | Remove misleading ping animation from past work entry        |
| Y2  | Medium   | metadata.test.ts              | Add OG + Twitter images assertions                           |
| Y3  | Medium   | contracts.test.tsx            | Assert objective is non-empty for all QA specs               |
| Y4  | Medium   | property-based.test.ts        | Add `research` to knownCommands exclusion (resolves with X3) |
| Y5  | Medium   | ErrorBoundary.tsx             | Add `role="alert"` to error fallback container               |
| Y6  | Medium   | SiteFooter.tsx                | Add `©` copyright symbol                                     |
| Z1  | Low      | SiteFooter.tsx                | Move CURRENT_YEAR inside component                           |
| Z2  | Low      | uiConfig.ts → ProjectCard.tsx | Inline STATUS_COLOR_MAP into its only consumer               |
| Z3  | Low      | contracts/\*.ts               | Decide on contracts-vs-i18n single source of truth           |
| Z4  | Low      | en.ts, es.ts, i18n/types.ts   | Consider removing prompt from Translations if always static  |
