# Remaining Open Items

Last updated: 2026-07-21

## Recently Resolved

| Item                                                                                          | Status | Notes                                                                    |
| --------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| Content credibility pass — removed unverifiable projects/rhetoric/metrics                     | ✅     | `10bc991`, `4a3a85c`, `23cf13f`, resume PDF genericized `33b5341`        |
| Manifesto/bridge sections removed from homepage                                               | ✅     | `4c99c49`                                                                |
| E2E visual baselines de-flaked (no live GitHub API dependency)                                | ✅     | `bcfaecb`, `a18ce48`, `d550134`, `04b7131`                               |
| Skip-nav target — `id` added to every page `<main>`                                           | ✅     | `051ccc4`                                                                |
| Formspree ID baked into e2e build artifact                                                    | ✅     | `60ff96b`                                                                |
| CI Node matrix split (22.x full suite / 24.x compat-only check)                               | ✅     | Already in `ci.yml` — halves redundant work vs. running everything twice |
| TypeDoc generation isolated to `deploy.yml` only, not in `ci.yml`                             | ✅     | Confirmed current `ci.yml` has no `docs` step                            |
| Dependency bumps: eslint/prettier/fast-check/lucide-react/marked                              | ✅     | `9bc4236`                                                                |
| Dependency bumps: tailwindcss/lucide-react/marked/prettier/lint-staged                        | ✅     | `2bc8417`                                                                |
| Silent failure audit (6 fixes)                                                                | ✅     | `a0fc33d`                                                                |
| Animation timing polish                                                                       | ✅     | `300dc11`                                                                |
| Size-limit budgets                                                                            | ✅     | `352ae41`                                                                |
| EN/ES page dedup (blog, quality, projects)                                                    | ✅     | `0fd5e01`, `c86893f`, `e2d1def`                                          |
| JSON-LD dedup                                                                                 | ✅     | `832dfd2`                                                                |
| **lint-staged** → **17.1.0**, **typescript** 5.9.3 → **6.0.3**, **lucide-react** → **1.25.0** | ✅     | `5b8580a`, `2bc8417`                                                     |
| **eslint 9 → 10** (currently 10.7.0, compatible with eslint-config-next 16)                   | ✅     | Lint clean                                                               |
| **@types/node** pin caught up (was 22.x, latest available at the time)                        | ✅     | Bumped to `^25`, then `26.1.1` — no longer lagging                       |
| Bundle chunk — lazy-loaded Three.js                                                           | ✅     | Within size budget                                                       |
| npm audit — prod dependencies clean                                                           | ✅     | `npm audit --omit=dev` → 0 vulnerabilities                               |

## High Priority

### 1. Coverage — 99.82% / 100% / 99.14% / 99.79% (statements/branches/functions/lines)

| Directory          | Statements | Branches | Functions  | Lines      |
| ------------------ | ---------- | -------- | ---------- | ---------- |
| **app/**           | 100%       | 100%     | 100%       | 100%       |
| **components/**    | 100%       | 100%     | 100%       | 100%       |
| **lib/**           | 100%       | 100%     | 100%       | 100%       |
| **Total (global)** | **99.82%** | **100%** | **99.14%** | **99.79%** |

Thresholds (70/65/65/70) far exceeded. The only two files below 100% are both the same
intentional pattern — a `getServerSnapshot()` for `useSyncExternalStore` that can't be
exercised under jsdom (no server render pass in unit tests):

| File                            | Stmts/Lines | Functions | Reason                                                       |
| ------------------------------- | ----------- | --------- | ------------------------------------------------------------ |
| `lib/i18n/useIsSpanishRoute.ts` | 83.33%      | 80%       | `getServerSnapshot` — SSR-only branch, not callable in jsdom |
| `lib/theme/context.tsx`         | 94.73%      | 85.71%    | `getServerSnapshot` — SSR-only branch, not callable in jsdom |

Neither blocks CI or affects functionality; both are platform constraints, not gaps.

### 2. Dependency status

| Package      | Current | Latest | Note                                                                          |
| ------------ | ------- | ------ | ----------------------------------------------------------------------------- |
| `typescript` | 6.0.3   | 7.0.2  | Major bump, out of `^6.0.3` range — needs deliberate eval, not a routine bump |

All other dependencies are on latest within their declared semver ranges as of 2026-07-21.

### 3. npm audit — 4 pre-existing devDependency vulnerabilities

Not introduced by recent work; surfaced because `npm audit --omit=dev` (used in CI) hides them.
All are dev-tooling-only, never shipped to production:

| Package           | Severity | Fix                                                                 |
| ----------------- | -------- | ------------------------------------------------------------------- |
| `body-parser`     | low      | `npm audit fix` (non-breaking)                                      |
| `brace-expansion` | high     | `npm audit fix` (non-breaking) — transitive via eslint/typedoc/glob |
| `uuid`            | moderate | Requires `@lhci/cli@0.6.1` — a breaking downgrade, needs care       |

## Medium Priority

_(none currently tracked — the two items previously here, TypeDoc-in-CI and the Node matrix,_
_are already resolved; see Recently Resolved.)_

## Low Priority

- Evaluate `typescript` 7.0.2 major upgrade (see above) once there's time to check for breaking changes.
