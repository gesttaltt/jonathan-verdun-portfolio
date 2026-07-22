# Implementation Log — Jonathan Verdun Portfolio

> **Last updated:** 2026-07-21
> **Status:** All roadmap items implemented. File retained as a changelog reference.

---

## Implemented Items

| #   | Item                 | Status                 | Key Commits                                                      |
| --- | -------------------- | ---------------------- | ---------------------------------------------------------------- |
| 1   | Contact form         | ✅ Done                | `d415c9f`                                                        |
| 2   | Case study pages     | ✅ Done (14 routes)    | `301b5e4`                                                        |
| 3   | Analytics            | ✅ Done (Plausible)    | `d415c9f`                                                        |
| 4   | Blog                 | ✅ Done (MDX, 2 posts) | `fcfcb7d`                                                        |
| 5   | Resume timeline      | ✅ Done                | `810c592`                                                        |
| 6   | Testimonials         | ❌ Removed (mocked)    | `77b536d`                                                        |
| 7   | Image optimization   | ✅ Already configured  | —                                                                |
| 8   | Bundle budget        | ✅ Done (size-limit)   | `d3365fa`, current budgets: HTML ≤1.5 MB, JS ≤800 kB, CSS ≤50 kB |
| 9   | Loading states       | ✅ Done                | `d3365fa`                                                        |
| —   | Silent failure audit | ✅ Fixed (6 issues)    | `a0fc33d`                                                        |
| —   | Animation timing     | ✅ Standardized        | `300dc11`                                                        |
| —   | Env docs             | ✅ Updated             | `402721e`                                                        |

---

## Remaining Opportunities

| Item                           | Effort | Reason to do                                                                                                                                                  |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Write more blog posts          | Medium | Still 4 posts; thought leadership, SEO                                                                                                                        |
| Add more verified case studies | High   | Project count dropped from 7 to 4 in the 2026-06/07 credibility pass (unverifiable projects/metrics removed) — room to add more with real, checkable writeups |
| Verify CI on latest            | Low    | Ongoing — CI is currently green (lint/types/584 tests/build/bundle); Node matrix already split 22.x full / 24.x compat-only                                   |

Resolved 2026-07-22: `categories:performance` gate tightened `0.5` → `0.6` (see `REMAINING_ITEMS.md`).
