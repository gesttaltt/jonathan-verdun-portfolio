# Requirements Traceability Matrix (RTM)

| Req ID     | Requirement Description                                        | Test Level  | Test Case / File                                              | Status      |
| :--------- | :------------------------------------------------------------- | :---------- | :------------------------------------------------------------ | :---------- |
| **REQ-01** | Core logic must have 100% statement/branch coverage            | Unit        | `jest --coverage`                                             | ✅ Passed   |
| **REQ-02** | Site must be accessible (WCAG 2.1 AA)                          | System/A11y | `e2e/a11y.spec.ts`                                            | ✅ Passed   |
| **REQ-03** | Terminal must correctly process 'clear' and 'redirect' signals | Integration | `src/__tests__/useTerminal.test.ts`                           | ✅ Passed   |
| **REQ-04** | Metadata and JSON-LD must support EN and ES locales            | Unit/System | `src/__tests__/metadata.test.ts`, `e2e/comprehensive.spec.ts` | ✅ Passed   |
| **REQ-05** | Site must remain functional offline (PWA)                      | System      | `public/sw.js` (Manual Verification)                          | ✅ Passed   |
| **REQ-06** | WebGL must gracefully fail back to CSS gradient in 3s          | System      | `src/components/TopologyLoader.tsx`                           | ✅ Verified |
| **REQ-07** | Build must fail if high-severity vulnerabilities are found     | Security    | `npm audit` gate in CI                                        | ✅ Active   |
| **REQ-08** | Page structure must be semantically linked (aria-describedby)  | System      | `src/components/PortfolioPage.tsx`                            | ✅ Verified |

---

_Generated 2026-05-09 — Automated Quality Sync_
