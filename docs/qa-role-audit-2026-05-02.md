# QA Role Application Audit — 2026-05-02

Evaluates the portfolio strictly from the perspective of a QA hiring manager scanning for a mid-senior QA Automation Engineer or Test Architect.

---

## 5-Second Recruiter Test

**What a recruiter sees immediately:**

- Tagline: "Test Architecture · Automation Engineering" — QA-coded, good
- Hero section has work history: Co-Founder, Ai-Whisperers — no QA title visible
- One green "QA" badge on QA Arxiv Mobile — three "Research" badges

**Verdict:** First impression is credible but thin. One project with a QA badge against a founder title creates friction. A recruiter who stops at the fold will question whether this is a QA candidate or a researcher trying to pivot.

---

## Findings

### H1 — Work History Has No QA Title (BLOCKING)

**Current:** `Co-Founder, Ai-Whisperers, Sep 2025–Apr 2026`  
**Problem:** No QA title is visible anywhere in the work history. ATS parsers and recruiters both scan for role titles. "Co-Founder" doesn't map to QA experience in any automated or human filter.  
**Fix options:**

1. Add subtitle: `Co-Founder & QA Lead, Ai-Whisperers` — if you owned QA at Ai-Whisperers, this is accurate
2. Add a second entry for any prior QA employment if it exists
3. Add a one-liner under the Ai-Whisperers entry that names the QA work done there

**Requires user input.** What QA work did you do at Ai-Whisperers specifically?

---

### H2 — Only 1 of 4 Projects Signals QA (HIGH)

**Current:** 1 QA badge (QA Arxiv Mobile), 3 Research badges  
**Problem:** The Research projects are at full opacity and take up 75% of the projects section. A QA hiring manager will spend all their time on QA Arxiv Mobile and skim the rest as background noise — but visually the ratio suggests a research portfolio with a QA side project.  
**Fix options:**

1. Reframe one Research project to surface its QA/reliability aspects — e.g. Functionome Atlas has schema validation and 120× pipeline throughput; that is pipeline reliability engineering
2. Add a second QA-badged project (Playwright web automation, API testing suite, CI pipeline ownership)
3. Add a `Reliability` badge variant and reclassify the data pipeline projects under it

**Partially actionable.** Items (1) and (3) can be done now. Item (2) requires a real project.

---

### H3 — No Defect Lifecycle Signal (HIGH)

**Current:** QA Arxiv Mobile mentions ADO in tech stack but the description focuses on test counts and CI gates — not defect management.  
**Problem:** QA roles, especially at mid-senior level, expect evidence of defect lifecycle ownership: finding bugs, writing defect reports, tracking to closure, regression verification. The portfolio shows test automation but not the QA process artifact layer.  
**Fix:** Expand the QA Arxiv description to mention ADO work items / bug reports. Even one sentence like "defect reports filed in Azure DevOps work items with reproduction steps and severity classification" signals the full QA lifecycle.

**Immediately actionable.**

---

### M1 — No Web Automation Evidence (MEDIUM)

**Current:** Appium (mobile) is the only automation framework shown in a QA context.  
**Problem:** Most QA job listings require Playwright, Cypress, or Selenium for web E2E. Mobile-only automation is a niche signal.  
**Fix:** If you have any Playwright or Cypress work — even a small test suite — add a second QA project. If not, the terminal `about` command could mention awareness of web automation tooling.

**Requires user input.**

---

### M2 — ADO Not Elaborated Enough (MEDIUM)

**Current:** `Azure DevOps` appears in tech stack badge only.  
**Problem:** For QA roles, ADO (or Jira) proficiency is a core expectation — test plans, test suites, test runs, traceability matrices, work items. Listing it as a badge without description understates the experience.  
**Fix:** The QA Arxiv description already mentions "ADO-style traceability" — this is good. Add specificity: "test cases linked to user stories via Azure DevOps Test Plans, traceability matrix maintained across 4 stories."

**Immediately actionable.**

---

### M3 — No Test Reporting / Coverage Artifacts Linked (MEDIUM)

**Current:** The portfolio asserts "≥80% unit coverage enforced" but links nowhere.  
**Problem:** QA hiring managers respond to proof, not assertions. A link to a CI run, a coverage report badge, or even a screenshot of a test run adds weight.  
**Fix options:**

1. Add a GitHub Actions badge (passing/coverage) to the sidebar or project card
2. Add a `coverage.svg` badge to the QA Arxiv project card if the CI report is public
3. Link the GitHub Actions run from the portfolio project's CI description

**Partially actionable.** Adding a CI badge to QA Arxiv card is doable if the repo is public and CI runs.

---

### M4 — Terminal `about` Command Doesn't Mention Test Plans (MEDIUM)

**Current:** `about` says "Property-based testing, automation pipelines, and quality gates — pre-commit hooks, GitHub Actions CI, coverage enforcement — that catch regressions before humans do."`  
**Problem:** "Test plans," "defect management," and "traceability" are phrases QA managers look for. The current about command reads like a developer's QA story, not a QA engineer's story.  
**Fix:** Add "test plans and traceability matrices" to the about command.

**Immediately actionable.**

---

### L1 — No Certification Signal (LOW)

**Current:** No mention of ISTQB or equivalent anywhere.  
**Problem:** Many QA job listings list ISTQB as preferred. Absence is a mild negative signal for companies that filter on it.  
**Fix:** If studying for or holding ISTQB Foundation, add it to the sidebar constraints or a separate credentials block.

**Requires user input.**

---

### L2 — Research Projects Don't Show Any QA Lens (LOW)

**Current:** Functionome Atlas, Gene Functional Pipeline, and 3-Adic ML describe their engineering accomplishments in pipeline/ML terms with no test quality signal.  
**Problem:** For a QA role application, even research projects should show test discipline. 3-Adic ML already has "280-test suite" in its description — that's good. The others don't.  
**Fix:** Add a one-line test signal to Functionome Atlas and Gene Functional Pipeline descriptions: e.g., "validated via parameterized regression tests against known gnomAD outputs."

**Immediately actionable.**

---

### L3 — QA Philosophy Section Has No Link to the QA Arxiv Project (LOW)

**Current:** The QA Philosophy section stands alone — lists constraints and test layers but doesn't ground them in a real project.  
**Problem:** Abstract philosophy without proof is unconvincing to skeptical reviewers.  
**Fix:** QA Arxiv description already contains "Validates the test-first and coverage-gate constraints shown in the QA Philosophy section." This is the right direction. Could be mirrored in reverse — add a line to QA Philosophy pointing to the live proof.

**Already partially addressed.**

---

## Summary Table

| ID  | Issue                                       | Priority | Actionable Now?   |
| --- | ------------------------------------------- | -------- | ----------------- |
| H1  | Work history has no QA title                | BLOCKING | Needs user input  |
| H2  | Only 1 of 4 projects is QA-badged           | HIGH     | Partially         |
| H3  | No defect lifecycle signal                  | HIGH     | Yes               |
| M1  | No web automation evidence                  | MEDIUM   | Needs user input  |
| M2  | ADO not elaborated enough                   | MEDIUM   | Yes               |
| M3  | No test reporting artifacts linked          | MEDIUM   | Partially         |
| M4  | Terminal `about` doesn't mention test plans | MEDIUM   | Yes               |
| L1  | No certification signal                     | LOW      | Needs user input  |
| L2  | Research projects show no QA lens           | LOW      | Yes               |
| L3  | QA Philosophy not linked back to proof      | LOW      | Already addressed |

---

## Immediately Implementable (no user data needed)

1. **H3** — Expand QA Arxiv description: add defect reporting / ADO work items sentence
2. **M2** — Add ADO test plan traceability specificity to QA Arxiv description
3. **M4** — Update terminal `about` to include "test plans and traceability matrices"
4. **L2** — Add one-line test signals to Functionome Atlas and Gene Functional Pipeline

## Deferred (user input required)

- **H1** — What was your QA role/work at Ai-Whisperers? Any prior QA employment?
- **H2 / M1** — Do you have a second QA project (web automation, Playwright, API test suite)?
- **L1** — Any certifications (ISTQB or in progress)?
