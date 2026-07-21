# QA Credibility & Positioning Audit — May 2026

Consolidated from 2 dated audits (2026-05-01 → 2026-05-02) that treated the portfolio's own
content and narrative as a QA subject — auditing personal-brand copy from a hiring-manager's
perspective rather than reviewing code. All findings below are resolved; kept in full
because the recruiter-lens framing and the before/after copy it produced are genuinely
distinctive artifacts, not boilerplate.

---

## Credibility audit (2026-05-01) — Overall 3.5 / 10 ("Weak")

A hiring-manager read of the site as it stood at the time:

- 75% of displayed projects were non-QA (3 research projects vs. 1 QA-badged one).
- The QA Philosophy section covered only 3 of 7+ expected test layers (missing
  integration, E2E, API/contract, and performance testing).
- The flagship QA stat was "Test Suites: 3" — weaker than the ML research project's own
  "280 Tests" callout sitting right next to it.
- The tagline "QA Automation Engineer" read as generic and undifferentiated.
- Work history showed only "Co-Founder" — no QA title appeared anywhere on the site.

The audit's appendix supplied concrete replacement copy that was later implemented,
including the tagline rewrite ("Test Architecture · Automation Engineering") and rewritten
QA constraints with real, checkable thresholds instead of vague claims.

## QA role audit — the "5-second recruiter test" (2026-05-02)

A follow-up simulating how a QA hiring manager scans the page in the first few seconds:

- **Blocking finding:** work history still showed zero QA title ("Co-Founder" only) — flagged
  as a real risk for both human reviewers and ATS keyword scans.
- Only 1 of 4 projects was QA-badged; proposed either reframing a research project under a
  "Reliability" lens or adding a distinct badge variant for it.
- No defect-lifecycle signal anywhere (bug reports, severity classification, regression
  verification) — something a QA-specific portfolio would be expected to show.
- No web automation evidence (Playwright/Cypress/Selenium) was visible at the time — only
  mobile automation (Appium) was shown.
- Split findings explicitly into "immediately implementable" vs. "deferred — needs real
  input" (prior QA employment history, certifications, a second QA-flagged project), rather
  than proposing to fabricate any of it.

---

Both audits converged on the same root problem — the site was truthful but under-signaled
its QA focus — and both were resolved through the same mechanism: rewriting copy to be more
specific and QA-forward, never by adding unverifiable claims.
