# Testing Specification

Reference for the testing strategy, tooling, and CI integration.

---

## Stack

| Tool                           | Role                                    |
| ------------------------------ | --------------------------------------- |
| Jest 30                        | Test runner                             |
| @testing-library/react 16      | Component rendering                     |
| @testing-library/jest-dom 6    | DOM assertion matchers                  |
| @testing-library/user-event 14 | User interaction simulation             |
| fast-check 4                   | Property-based / fuzz testing           |
| ts-jest 29                     | TypeScript transform (where needed)     |
| Playwright                     | E2E — chromium + mobile-chrome projects |
| Lighthouse CI                  | Performance/accessibility/SEO budgets   |

---

## Jest Configuration

`jest.config.mjs` is built via `next/jest` to inherit Next.js's SWC transforms and CSS/image mocking. Key settings:

- `testEnvironment: 'jest-environment-jsdom'`
- `testPathIgnorePatterns`: `node_modules/`, `e2e/` (Playwright specs are excluded from the Jest run)
- `moduleNameMapper`: `@/*` → `src/*`, plus a stub mapping any `coverage.json` import to `__mocks__/coverageJson.ts` so component tests don't depend on a real coverage run having happened first
- `collectCoverageFrom`: all `src/**/*.{ts,tsx}` except type declarations, test files, both `opengraph-image.tsx` files, `lib/og/**`, `sitemap.ts`, `robots.ts`, the WebGL components (`shaders/**`, `TopologyMesh`, `TopologyPostProcessing`, `InteractiveTopology`, `TopologyLoader`), and a few generated/locale files that don't carry independent logic
- `coverageThreshold.global`: 99% lines, 99% functions, 97% branches, 99% statements

`jest.setup.ts` polyfills what jsdom doesn't provide: mocks `next/navigation` (`usePathname`/`useRouter`/`notFound`, with a settable `mockPathname` helper for locale-dependent tests), mocks `marked`, stubs `global.fetch`, and provides no-op `IntersectionObserver` and `matchMedia` implementations (required by Framer Motion and the responsive hooks).

---

## Test Organization

Nearly all tests live in one top-level `src/__tests__/` directory rather than being colocated next to source files — the one exception is `src/lib/__tests__/siteConfig.test.ts`, which coexists with (and is distinct from) `src/__tests__/siteConfig.test.ts`.

Naming convention:

- Unit/integration: `[Module].test.ts`
- Component: `[Component].test.tsx`
- Property-based: `[Domain].property.test.ts`

---

## Testing Strategies

### Unit & Integration

Isolated service/hook logic — e.g. `CommandProcessor.test.ts` asserts `DefaultCommandProcessor` resolves known commands and falls back cleanly for unknown ones.

### Property-Based (fast-check)

Used where an invariant matters more than any specific example — the highest-value one fuzzes every registered i18n key to assert EN and ES expose identical key structures, so a translation added to one locale and not the other fails CI instead of shipping silently.

```typescript
fc.assert(
  fc.property(fc.constantFrom(...getAllKeys(en)), (key) => {
    expect(lookup(es, key)).toBeDefined()
  })
)
```

### Component Tests

React Testing Library renders components with injected mocks (e.g. a mock `IProjectRepository` passed to `<ProjectProvider adapter={mockAdapter}>`) rather than mocking contract modules directly — the DI boundary described in `COMPONENTS.md` is what makes this possible.

### WebGL / Three.js

The R3F canvas and WebGL context aren't available in jsdom. These components are excluded from the coverage threshold (see config above) and tested at the integration boundary — props in, rendered output assertions — or mocked at the module level when testing a parent component.

---

## E2E (Playwright)

`playwright.config.ts`: `testDir: './e2e'`, two projects only — `chromium` (Desktop Chrome) and `mobile-chrome` (Pixel 5) — `fullyParallel: true`, CI retries once. `webServer` serves the static `out/` export via `serve` when `MOCK_CI=true` (used in CI, avoiding a full `npm run dev`), otherwise runs `npm run dev`. The default per-test timeout is intentionally shorter under `MOCK_CI` (30s vs 120s) to keep CI fast — tests with long, deliberate waits (e.g. the offline/PWA test) override it explicitly via `test.setTimeout()`.

`MOCK_CI` only controls which command starts the web server — it's a shell env var read by `playwright.config.ts` itself, not something that reaches the built client bundle (it isn't `NEXT_PUBLIC_`-prefixed or listed in `next.config.ts`'s `env`). The Sidebar's live CI-status badge (`fetch('api.github.com/...')`) still fires a real network request regardless of `MOCK_CI`. `verification.spec.ts` and `visual.spec.ts` set a `mock-ci=true` cookie via `context.addCookies()` before navigating (which the component checks explicitly) so that specific fetch is deterministic; other specs that touch the Sidebar don't currently need to, since they don't assert on or screenshot its CI-status text.

Spec files: `a11y`, `comprehensive`, `content-routes`, `error-states`, `infrastructure`, `layout`, `navigation`, `project-routes`, `smoke`, `verification`, `visual` (visual regression, with committed baseline screenshots in `visual.spec.ts-snapshots/`).

---

## CI Integration

Full pipeline detail lives in `DEVOPS.md`. In short: format → lint → security audit → type-check → test → build → bundle size, then E2E and Lighthouse CI run against the built static export in parallel jobs.
