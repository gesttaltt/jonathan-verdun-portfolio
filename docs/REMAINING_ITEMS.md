# Remaining Open Items

Last updated: 2026-05-18

## Recently Resolved (this session)

| Item                                                                           | Status | Commit                          |
| ------------------------------------------------------------------------------ | ------ | ------------------------------- |
| Silent failure audit (6 fixes)                                                 | ✅     | `a0fc33d`                       |
| Animation timing polish                                                        | ✅     | `300dc11`                       |
| Size-limit budgets                                                             | ✅     | `352ae41`                       |
| EN/ES page dedup (blog, quality, projects)                                     | ✅     | `0fd5e01`, `c86893f`, `e2d1def` |
| JSON-LD dedup                                                                  | ✅     | `832dfd2`                       |
| CI fix (coverage thresholds, action v5)                                        | ✅     | `c569497`, `2188176`            |
| **lint-staged** 16.2.7 → **17.0.5**                                            | ✅     | pending                         |
| **lucide-react** 0.563.0 → **1.16.0** (brand icons replaced with SVGs)         | ✅     | pending                         |
| **typescript** 5.9.3 → **6.0.3** (`types: ["node", "jest"]` added to tsconfig) | ✅     | pending                         |

## High Priority

### 1. Coverage Gap — App & components at ~0%

| Directory          | Statements | Branches | Functions | Lines    |
| ------------------ | ---------- | -------- | --------- | -------- |
| **lib/**           | ~91%       | ~81%     | ~100%     | ~92%     |
| **app/** (routes)  | 0%         | 0%       | 0%        | 0%       |
| **components/**    | ~16%       | ~8%      | ~17%      | ~16%     |
| **Total (global)** | **~73%**   | **~70%** | **~70%**  | **~75%** |

Thresholds (70/65/65/70) are currently met globally, but app pages and UI components have near-zero coverage. High-traffic components (ContactForm, HeroHeader, BlogList, PortfolioPage) have no tests.

### 2. eslint 9 → 10 — Blocked by eslint-config-next

`eslint-config-next@16.2.6` uses `eslint-plugin-react` with deprecated API (`contextOrFilename.getFilename`) removed in ESLint 10. Need to wait for eslint-config-next to publish a compatible version.

## Medium Priority

### 3. Bundle — Three.js chunk is 1.08 MB

The largest JS chunk (`0r~mo3~wj37w7.js` at 1.08 MB) contains Three.js + framer-motion + R3F. Loaded on every page via RootShell even when topology isn't displayed. Could be deferred with dynamic imports or route-level splitting.

Total `.next/` output is ~979 MB (includes static export).

### 4. Flaky Test — QualityDashboard search filter timeout

```
FAIL src/__tests__/QualityDashboard.test.tsx
  ● QualityDashboard › filters audits based on search query in title
    thrown: "Exceeded timeout of 5000 ms for a test."
```

Pre-existing flaky test (async rendering timeout, not a logic failure). Needs either a higher timeout or a more efficient test setup.

## Low Priority

### 5. Remaining Minor Outdated Dependencies

| Package         | Current  | Latest  | Reason not bumped                        |
| --------------- | -------- | ------- | ---------------------------------------- |
| eslint          | 9.39.4   | 10.4.0  | Blocked by eslint-config-next compat     |
| @types/node     | 20.19.41 | 25.9.0  | `^20` range, would need explicit upgrade |
| @types/three    | 0.182.0  | 0.184.1 | Exact pin in package.json                |
| react/react-dom | 19.2.5   | 19.2.6  | Exact pin in package.json                |
| three           | 0.182.0  | 0.184.0 | Exact pin in package.json                |

### 6. Dirty Generated Files

`coverage.json` and `src/lib/services/vfsData.ts` show as modified after every build/test run. These are generated artifacts that should either be `.gitignore`d or regenerated in CI only.

### 7. E2E Error-State Coverage

88 Playwright tests pass but focus on happy paths. No coverage for:

- 3D WebGL fallback behavior
- Network error states in ContactForm
- Invalid route handling beyond notFound()
- Service Worker registration failures
