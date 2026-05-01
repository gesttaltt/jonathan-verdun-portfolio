# Credibility Audit — QA Focus — 2026-05-01

## Goal

Identify everything that weakens credibility as a QA Automation Engineer and everything
that could be added or improved to strengthen it. Jonathan Verdun is positioned as a
QA Automation Engineer. All findings are from a hiring-manager perspective.

---

## Overall Scorecard

| Dimension                   | Score  | Notes                                        |
| --------------------------- | ------ | -------------------------------------------- |
| QA Signal Strength          | 4.5/10 | Only 3 test layers; 1 QA project; weak stats |
| Project Credibility         | 3.5/10 | "3 test suites" is the headline stat         |
| Identity & Positioning      | 4/10   | Generic tagline; no QA employment history    |
| Missing Credibility Signals | 3/10   | No certifications, no QA tools ecosystem     |
| Section Structure           | 2.5/10 | QA Philosophy buried below Architecture      |

**Overall: 3.5 / 10 — Weak**

---

## Issues — Prioritized

### HIGH

**H1 — 75% of portfolio is non-QA**

- File: `src/lib/i18n/en.ts:93–146`, `src/components/PortfolioPage.tsx:48`
- 4 projects displayed: 1 labeled QA, 3 labeled Research.
- Hiring manager reads: "Researcher with side QA interest, not a QA engineer."
- Fix: Add 1–2 more QA projects OR move research projects fully out of the main Projects gallery.

**H2 — QA Philosophy covers only 3 of 7+ expected test layers**

- File: `src/lib/contracts/QAContract.ts:8–31`
- Current layers: unit, property-based, component.
- Missing layers a hiring manager expects: integration, E2E, API/contract, performance.
- The type union already allows `'integration'` and `'regression'` — they're just not used.
- Fix: Add at minimum integration and E2E layers with specific tool callouts (Playwright, REST Assured, etc.).

**H3 — QA constraints are generic; no proof or metrics**

- File: `src/lib/i18n/en.ts:21–25`
- "Test suites gate every merge" is a claim, not evidence. What threshold? 80%? 95%?
- No link to any CI/CD pipeline or coverage report.
- Fix: Make specific — "≥80% unit coverage enforced in CI via GitHub Actions; merge blocked below threshold."

**H4 — "Test Suites: 3" is the flagship QA stat**

- File: `src/lib/i18n/en.ts:102–105`
- "3" with no context is the weakest possible metric for a QA project.
- The ML research project (3-Adic ML) shows "280 Tests" — making the actual QA project look thinner than a research side project.
- Fix: Replace with real metrics from the QA Arxiv repo: test case count, coverage %, execution time, automation rate.

**H5 — Tagline "QA Automation Engineer" is undifferentiated**

- File: `src/lib/siteConfig.ts:43`, `src/lib/i18n/en.ts:6`
- This is the most common QA title; it communicates nothing about level or specialization.
- Fix: Narrow to a positioning statement — "Test Architecture & CI/CD Automation" or "Senior QA Engineer — Automation Infrastructure."

**H6 — Work history: only "Co-Founder" role, no QA titles**

- File: `src/lib/siteConfig.ts:29–35`
- Only 1 entry: "Co-Founder at Ai-Whisperers, Sep 2025 – Apr 2026" (8 months).
- No QA Engineer, QA Lead, SDET, or Test Architect title appears anywhere.
- Hiring managers ask: "Where did they actually do QA professionally?"
- Fix: Add prior QA roles if they exist. If "Co-Founder" involved QA leadership, add a subtitle: "Co-Founder & QA Lead."

**H7 — QA Arxiv description is vague on tools and strategy**

- File: `src/lib/i18n/en.ts:97–98`
- "Manual test cases with user story traceability" — how many? Stored where?
- "cross-platform coverage (iOS/Android)" — using what? Appium? Detox? XCUITest?
- "Python/pytest automation suite" — what's being tested: UI? API? Both?
- Fix: Rewrite with specifics: tool names, test case count, coverage %, CI integration.

**H8 — Section order buries QA Philosophy**

- File: `src/components/PortfolioPage.tsx:46–138`
- Current order: Projects → Architecture → QA Philosophy → Technical Background.
- QA Philosophy is the strongest signal for a QA hire; it should appear early.
- Fix: Move QA Philosophy above the Projects gallery, or at minimum above Architecture.

**H9 — Architecture section is data engineering, not QA**

- File: `src/components/PortfolioPage.tsx:100–114`, `src/lib/i18n/en.ts:44–62`
- Shows ETL pipeline and additive modeling capacity control — both data engineering.
- No mention of how invariants are tested; no connection to QA practice.
- Hiring managers skip this as "not relevant to QA."
- Fix: Remove, rename to "QA Infrastructure & Test Pipelines," or move to Technical Background.

**H10 — Only pytest mentioned; no QA tool ecosystem**

- File: `src/lib/i18n/en.ts:99`
- Tech stack: Python, pytest, Azure DevOps. That's it.
- A QA automation portfolio should show: web UI tools (Playwright, Cypress, Selenium), API tools (Postman, REST Assured), mobile (Appium), reporting (Allure), CI (GitHub Actions).
- Fix: Expand QA Arxiv tech stack with actual tools used.

---

### MEDIUM

**M1 — "locked" / "evolving" status labels are decorative**

- File: `src/components/QAPhilosophyGrid.tsx:32`
- No definition of what these mean. "Evolving" on component testing raises questions.
- Fix: Replace with clearer labels ("Stable" / "Maturing") or remove entirely.

**M2 — No evidence of QA leadership, mentoring, or process improvement**

- All files
- Portfolio reads as individual contributor only. No "led migration from manual to automated," no "established coverage thresholds," no "reduced regression count by X%."
- Fix: Add a QA impact section or expand work history to include influence metrics.

**M3 — Terminal `about` command is generic**

- File: `src/lib/contracts/TerminalContract.ts:8`
- Current: "Specializing in TDD, test automation, and engineering quality."
- "Engineering quality" is meaningless filler. Nothing here differentiates from any junior QA.
- Fix: Rewrite with specificity — what kind of automation, what scale, what philosophy.

**M4 — Contact CTA is passive**

- File: `src/lib/siteConfig.ts:56`, `src/lib/i18n/en.ts:16`
- "Open to QA opportunities" is needy phrasing; sounds junior.
- Fix: "Available for QA architecture and automation roles" or "Seeking senior QA opportunities in automation infrastructure."

**M5 — Only Azure DevOps mentioned as CI/CD; no breadth**

- File: `src/lib/i18n/en.ts:99`
- One CI/CD platform is a limitation signal for senior roles.
- Fix: Add GitHub Actions or others if used; describe how the CI pipeline is structured.

**M6 — No manual testing details**

- File: `src/lib/i18n/en.ts:97–98`
- "Manual test cases" mentioned but not elaborated. No test management tool, no RTM, no exploratory testing note.
- Fix: Add specifics — where cases are stored, how traceability works, how exploratory sessions are documented.

**M7 — Sidebar "Engineering Constraints" duplicates QA Philosophy**

- File: `src/components/PortfolioPage.tsx:59–79`
- Same 3 constraints appear in the sidebar AND the QA Philosophy section.
- Fix: Make sidebar unique — e.g., show live QA metrics ("Test Coverage: 82%, Automation Rate: 73%") rather than repeating the same text.

**M8 — Research projects labeled "Research" still in main Projects gallery**

- File: `src/lib/i18n/en.ts:93–146`
- They were reframed but not relocated. They sit alongside the QA project in the same grid with equal visual weight.
- Fix: Either remove from the Projects array and show only in Technical Background, or visually demote them within the gallery.

---

### LOW

**L1 — No certifications (ISTQB, CTFL, etc.)**

- No credentials visible anywhere.
- If certified, add; if not, low priority for senior roles.

**L2 — No shift-left philosophy mentioned**

- TDD is mentioned once but not connected to a test strategy.
- Fix: Add one constraint about test-first or shift-left approach.

**L3 — No QA–project traceability**

- QA Philosophy constraints float without connecting to any project.
- Fix: Note in QA Arxiv description which constraints it demonstrates (e.g., "enforces the property-based fuzzing constraint above").

**L4 — "Technical Background" section title is vague**

- File: `src/lib/siteConfig.ts:62`
- Visitors don't know what the section contains before reading it.
- Fix: "Bioinformatics & Data Engineering Research."

**L5 — No accessibility or security testing mentioned**

- Missing for completeness; low priority unless targeting those-specific roles.

---

## What's Working (Keep)

- Portfolio website itself is technically strong: TypeScript, 198 tests, 100% coverage, CI hooks — this demonstrates QA discipline in practice.
- QA Philosophy section exists and is formalized with constraints + test layers — the foundation is there, it just needs depth.
- Git history shows polish and rigor (conventional commits, audits, structured refactors).
- Social links, LinkedIn, and GitHub are visible and well-placed.
- fast-check property-based testing is a non-obvious, credible signal — keep and highlight more.
- Bioinformatics section is appropriately downgraded to secondary appendix.

---

## Priority Action Plan

### Phase 1 — Critical (Do now)

1. Rewrite QA Arxiv stats with real numbers (H4)
2. Add integration + E2E test layers to QA Philosophy (H2)
3. Make QA constraints specific with actual thresholds (H3)
4. Expand QA Arxiv tech stack and description with tool names (H7, H10)
5. Reorder sections: QA Philosophy before Projects (H8)

### Phase 2 — High Impact (Next sprint)

6. Update tagline to differentiated positioning (H5)
7. Clarify "Co-Founder" role or add prior QA work history (H6)
8. Remove or reframe Architecture section (H9)
9. Rewrite terminal `about` command (M3)
10. Move/demote research projects out of main Projects gallery (M8)

### Phase 3 — Polish (When time allows)

11. Update sidebar to show live QA metrics instead of duplicating constraints (M7)
12. Replace "locked/evolving" labels with clearer model (M1)
13. Update contact CTA phrasing (M4)
14. Add manual testing details to QA Arxiv (M6)
15. Add shift-left constraint to QA Philosophy (L2)

---

## Summary Table

| ID  | Priority | File                     | Change                                               |
| --- | -------- | ------------------------ | ---------------------------------------------------- |
| H1  | High     | en.ts, PortfolioPage.tsx | Add QA projects or remove research from main gallery |
| H2  | High     | QAContract.ts, en.ts     | Add integration + E2E test layers                    |
| H3  | High     | en.ts                    | Make constraints specific with real thresholds       |
| H4  | High     | en.ts                    | Replace "3 test suites" with real QA metrics         |
| H5  | High     | siteConfig.ts, en.ts     | Differentiate tagline with level/specialization      |
| H6  | High     | siteConfig.ts            | Add QA employment history / clarify Co-Founder role  |
| H7  | High     | en.ts                    | Rewrite QA Arxiv with tool names and coverage %      |
| H8  | High     | PortfolioPage.tsx        | Move QA Philosophy before Projects in section order  |
| H9  | High     | PortfolioPage.tsx, en.ts | Remove or reframe Architecture section               |
| H10 | High     | en.ts                    | Expand tech stack beyond pytest + Azure DevOps       |
| M1  | Medium   | QAPhilosophyGrid.tsx     | Replace locked/evolving labels                       |
| M2  | Medium   | All                      | Add QA leadership / impact evidence                  |
| M3  | Medium   | TerminalContract.ts      | Rewrite `about` command with specific expertise      |
| M4  | Medium   | siteConfig.ts, en.ts     | Strengthen contact CTA phrasing                      |
| M5  | Medium   | en.ts                    | Add GitHub Actions or other CI/CD breadth            |
| M6  | Medium   | en.ts                    | Add manual testing details to QA Arxiv               |
| M7  | Medium   | PortfolioPage.tsx        | Make sidebar show metrics, not duplicate constraints |
| M8  | Medium   | en.ts                    | Demote research projects out of main gallery         |
| L1  | Low      | All                      | Add certifications if available (ISTQB, etc.)        |
| L2  | Low      | en.ts                    | Add shift-left / test-first constraint               |
| L3  | Low      | en.ts                    | Link QA Philosophy constraints to QA Arxiv project   |
| L4  | Low      | siteConfig.ts            | Rename "Technical Background" to be more specific    |
| L5  | Low      | All                      | Add a11y / security testing if applicable            |
