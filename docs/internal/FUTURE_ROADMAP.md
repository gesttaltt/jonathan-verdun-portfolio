# Implementation Log — Jonathan Verdun Portfolio

> **Last updated:** 2026-05-18
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

| Item                         | Effort | Reason to do                                      |
| ---------------------------- | ------ | ------------------------------------------------- |
| Write more blog posts        | Medium | Thought leadership, SEO                           |
| Tighten LHCI gates           | Low    | Push a11y/BP/SEO thresholds up                    |
| Real content in case studies | High   | The 7 case studies exist but need richer writeups |
| Verify CI on latest          | Low    | Ensure all pipelines still green                  |
