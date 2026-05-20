# Remaining Open Items

Last updated: 2026-05-20

## Recently Resolved

| Item                                                                           | Status | Notes                                         |
| ------------------------------------------------------------------------------ | ------ | --------------------------------------------- | --- | -------------------------------- |
| Silent failure audit (6 fixes)                                                 | ✅     | `a0fc33d`                                     |
| Animation timing polish                                                        | ✅     | `300dc11`                                     |
| Size-limit budgets                                                             | ✅     | `352ae41`                                     |
| EN/ES page dedup (blog, quality, projects)                                     | ✅     | `0fd5e01`, `c86893f`, `e2d1def`               |
| JSON-LD dedup                                                                  | ✅     | `832dfd2`                                     |
| CI fix (coverage thresholds, action v5)                                        | ✅     | `c569497`, `2188176`                          |
| **lint-staged** 16.2.7 → **17.0.5**                                            | ✅     | `5b8580a`                                     |
| **lucide-react** 0.563.0 → **1.16.0** (brand icons → SVGs)                     | ✅     | `5b8580a`                                     |
| **typescript** 5.9.3 → **6.0.3**                                               | ✅     | `5b8580a`                                     |
| Tests: BlogDetailContent, AuditDetailContent, ContactForm (11 new)             | ✅     | `9d63f2c`                                     |
| docs/REMAINING_ITEMS.md created                                                | ✅     | `9d63f2c`                                     |
| **eslint 9 → 10** (eslint@10.4.0 compatible with eslint-config-next 16)        | ✅     | Lint clean, 1 purity suppress                 |
| Bundle chunk — lazy-loaded Three.js (JS 696kB / 800kB)                         | ✅     | Within size budget                            |
| Dirty generated files — `vfsData.ts` timestamp removed; `coverage.json`        | ✅     | Already in `.gitignore`                       |
| E2E error-state coverage — 8 tests (404, ContactForm, WebGL fallback)          | ✅     | `e2e/error-states.spec.ts`                    |
| CI verified green — format, lint, type-check, 479 tests, build, bundle         | ✅     | All 3 CI stages pass                          |
| npm audit — 0 vulnerabilities                                                  | ✅     | Clean                                         |
| **THREE.Clock** deprecation → custom `performance.now()` timer                 | ✅     | Warning removed from E2E runs                 |
| Minor dep bumps: `@types/react` ^19.2.15, `marked` ^18.0.4, `ts-jest` ^29.4.10 | ✅     |                                               |
| **@types/node** ^20 → ^22, **react/react-dom** 19.2.5 → 19.2.6                 | ✅     | Cascade also bumped three + @types/three      |
| Flaky QualityDashboard search filter — switched to `findByText` for async      | ✅     | Handles framer-motion animation timing        |
| ContactForm coverage (10 tests, 33.8%→~95%)                                    | ✅     | Refactored `formEndpoint`→`getFormEndpoint()` |
| Branch gap: TestDetailedList (`                                                |        | ` fallback)                                   | ✅  | Added test with empty suite name |
| Branch gap: ResumeTimeline (`isLast` connecting line)                          | ✅     | Added connecting-line count assertion         |
| Branch gap: Sidebar clipboard catch                                            | ✅     | Added clipboard rejection test                |
| Branch gap: not-found.tsx ES locale (57%→100% branches)                        | ✅     | Added ES pathname test                        |
| Branch gap: global-error.tsx ES locale (58%→95% branches)                      | ✅     | Added ES pathname test                        |
| Branch gap: LoadingSkeleton (PageSkeleton + CardSkeleton tests)                | ✅     | New test file for exported components         |

## High Priority

### 1. Coverage — Stable at 99% / 95% / 100% / 100%

| Directory          | Statements | Branches | Functions | Lines     |
| ------------------ | ---------- | -------- | --------- | --------- |
| **lib/**           | ~99%       | ~94%     | ~100%     | ~99%      |
| **app/** (routes)  | ~96%       | ~95%     | ~100%     | ~96%      |
| **components/**    | ~99%       | ~95%     | ~99%      | ~100%     |
| **Total (global)** | **~99%**   | **~95%** | **~100%** | **~100%** |

Thresholds (70/65/65/70) well exceeded. Remaining uncovered branches are inherent constraints:

| Component              | Branch | Reason                                                      |
| ---------------------- | ------ | ----------------------------------------------------------- |
| TopologyPostProcessing | 50%    | Three.js Canvas — E2E only                                  |
| ThemeToggle            | 80% fn | `getServerSnapshot` — SSR-only, not callable in jsdom       |
| LoadingSkeleton        | 0%     | `Skeleton` internal — `className` default always overridden |
| Sidebar                | 80%    | `NODE_ENV !== 'test'` guards — production-only behavior     |
| ResumeTimeline         | 75%    | i18n key fallbacks — all orgs have translations             |
| ContactForm            | 96%    | Lines 72, 99 — edge cases in validate/handleSubmit          |
| ProjectDetail          | 97%    | Line 65 — conditional rendering edge case                   |
| BlogService            | 83%    | Lines 52-61, 83-84 — blog filtering edge cases              |
| CommandProcessor       | 98%    | Line 47 — edge case in command dispatch                     |

None block CI or affect functionality. All are defensive patterns or platform constraints.

### 2. Pinned Dependencies

| Package     | Current | Latest | Constraint       |
| ----------- | ------- | ------ | ---------------- |
| @types/node | 22.15.3 | 25.9.0 | `^22` in package |

## Medium Priority

### 4. CI Pipeline — Real-time monitoring & speed

CI takes ~10-15 min for all jobs. Potential optimizations:

- `npm run docs` generates TypeDoc only needed for deployment — could move to `deploy.yml`
- Full matrix (Node 22 + 24) doubles the `build` job; could run full suite on 22.x only and compatibility check on 24.x
- Caching strategy improvements
- Parallelizing independent jobs more aggressively

## Low Priority

_(none currently tracked)_
