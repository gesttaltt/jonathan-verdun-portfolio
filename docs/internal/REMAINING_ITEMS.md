# Remaining Open Items

Last updated: 2026-07-22

## Recently Resolved

| Item                                                                                                                                 | Status | Notes                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LHCI `categories:performance` gate tightened `0.5` → `0.6`                                                                           | ✅     | Actual median scores from CI run `29914733897`: `/` 0.69, `/es/` 0.68, `/quality/` 0.87. `0.6` is meaningfully tighter than the old no-op `0.5` floor while keeping ~8pt buffer below the worst page (`/es/`) to avoid CI flakiness from runner variance       |
| `sharp` high-severity advisory (CVE-2026-33327/33328/35590/35591, libvips)                                                           | ✅     | New advisory since 2026-07-21 pass; `sharp` unused at runtime (`images.unoptimized: true`) but still flagged by `npm audit --omit=dev`. Fixed via `overrides.sharp: ^0.35.3` instead of the breaking `next@14.2.35` downgrade `npm audit fix --force` proposed |
| Dependency bumps: next 16.2.10→16.2.11, react/react-dom 19.2.7→19.2.8, eslint-config-next 16.2.10→16.2.11, lint-staged 17.0.8→17.1.1 | ✅     | Patch/minor only; lint/types/584 tests/build/size-limit all green after bump                                                                                                                                                                                   |
| 8 stale dated audit docs in `docs/internal/` consolidated into one archive                                                           | ✅     | See `AUDIT_HISTORY.md` — public `/quality` audits under `docs/` untouched                                                                                                                                                                                      |
| 14 public `/quality` audit docs (`docs/*.md`) consolidated into 4 themed documents                                                   | ✅     | e2e slugs/search term updated, VFS regenerated, quality-dashboard visual snapshots re-baselined                                                                                                                                                                |
| Content credibility pass — removed unverifiable projects/rhetoric/metrics                                                            | ✅     | `10bc991`, `4a3a85c`, `23cf13f`, resume PDF genericized `33b5341`                                                                                                                                                                                              |
| Manifesto/bridge sections removed from homepage                                                                                      | ✅     | `4c99c49`                                                                                                                                                                                                                                                      |
| E2E visual baselines de-flaked (no live GitHub API dependency)                                                                       | ✅     | `bcfaecb`, `a18ce48`, `d550134`, `04b7131`                                                                                                                                                                                                                     |
| Skip-nav target — `id` added to every page `<main>`                                                                                  | ✅     | `051ccc4`                                                                                                                                                                                                                                                      |
| Formspree ID baked into e2e build artifact                                                                                           | ✅     | `60ff96b`                                                                                                                                                                                                                                                      |
| CI Node matrix split (22.x full suite / 24.x compat-only check)                                                                      | ✅     | Already in `ci.yml` — halves redundant work vs. running everything twice                                                                                                                                                                                       |
| TypeDoc generation isolated to `deploy.yml` only, not in `ci.yml`                                                                    | ✅     | Confirmed current `ci.yml` has no `docs` step                                                                                                                                                                                                                  |
| Dependency bumps: eslint/prettier/fast-check/lucide-react/marked                                                                     | ✅     | `9bc4236`                                                                                                                                                                                                                                                      |
| Dependency bumps: tailwindcss/lucide-react/marked/prettier/lint-staged                                                               | ✅     | `2bc8417`                                                                                                                                                                                                                                                      |
| Silent failure audit (6 fixes)                                                                                                       | ✅     | `a0fc33d`                                                                                                                                                                                                                                                      |
| Animation timing polish                                                                                                              | ✅     | `300dc11`                                                                                                                                                                                                                                                      |
| Size-limit budgets                                                                                                                   | ✅     | `352ae41`                                                                                                                                                                                                                                                      |
| EN/ES page dedup (blog, quality, projects)                                                                                           | ✅     | `0fd5e01`, `c86893f`, `e2d1def`                                                                                                                                                                                                                                |
| JSON-LD dedup                                                                                                                        | ✅     | `832dfd2`                                                                                                                                                                                                                                                      |
| **lint-staged** → **17.1.0**, **typescript** 5.9.3 → **6.0.3**, **lucide-react** → **1.25.0**                                        | ✅     | `5b8580a`, `2bc8417`                                                                                                                                                                                                                                           |
| **eslint 9 → 10** (currently 10.7.0, compatible with eslint-config-next 16)                                                          | ✅     | Lint clean                                                                                                                                                                                                                                                     |
| **@types/node** pin caught up (was 22.x, latest available at the time)                                                               | ✅     | Bumped to `^25`, then `26.1.1` — no longer lagging                                                                                                                                                                                                             |
| Bundle chunk — lazy-loaded Three.js                                                                                                  | ✅     | Within size budget                                                                                                                                                                                                                                             |
| npm audit — prod dependencies clean                                                                                                  | ✅     | `npm audit --omit=dev` → 0 vulnerabilities                                                                                                                                                                                                                     |

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

| Package      | Current | Latest | Note                                                   |
| ------------ | ------- | ------ | ------------------------------------------------------ |
| `typescript` | 6.0.3   | 7.0.2  | Major bump, out of `^6.0.3` range — blocked, see below |

All other dependencies are on latest within their declared semver ranges as of 2026-07-22.

**TypeScript 7.0 evaluated 2026-07-21 — blocked, do not upgrade yet.** TS 7.0 (Project Corsa,
`tsgo`) is a full compiler rewrite in Go that drops the old programmatic ("Strada") API.
Verified by installing `typescript@7.0.2` locally (not committed) and running this repo's
actual checks:

| Check                                          | Result under TS 7.0.2                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| `tsc --noEmit`                                 | ✅ Passes clean                                                                    |
| `npm run lint` (ESLint)                        | ❌ Hard fails — `typescript-eslint does not support TS 7.0`                        |
| `npm run docs` (TypeDoc, used in `deploy.yml`) | ❌ Crashes — `Cannot read properties of undefined (reading 'PropertyDeclaration')` |

Root cause for both: `typescript-eslint` and `TypeDoc` depend on the Strada API, which
Microsoft has said won't be stable again until TypeScript 7.1. `typescript-eslint` tracks
support at [typescript-eslint/typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940).
Re-evaluate once that lands — don't retry with just `tsc` green as the bar.

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

- Retry the `typescript` 7.x upgrade once `typescript-eslint` ships TS 7.1 support (see above).
