# Jonathan Verdun — Portfolio

[![CI](https://github.com/gesttaltt/jonathan-verdun-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/gesttaltt/jonathan-verdun-portfolio/actions/workflows/ci.yml)

QA Automation Engineer portfolio. Built with Next.js 16 static export, Three.js, and a strict TDD architecture. Every quality claim on the site is backed by a gate running in CI.

**Live:** [jonathanverdun.com](https://jonathanverdun.com) · **API Docs:** [jonathanverdun.com/docs/api](https://jonathanverdun.com/docs/api/)

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

### LAN / mobile testing

```bash
npm run dev -- -H 0.0.0.0
# Open http://<your-ip>:3000
```

---

## Scripts

| Script                | Description                                    |
| :-------------------- | :--------------------------------------------- |
| `npm run dev`         | Dev server with HMR                            |
| `npm run build`       | Static export → `out/`                         |
| `npm run lint`        | ESLint                                         |
| `npm run check-types` | TypeScript type check                          |
| `npm run format`      | Prettier                                       |
| `npm test`            | Jest (unit · integration · property-based)     |
| `npm run test:watch`  | Jest in watch mode                             |
| `npm run e2e`         | Playwright E2E + WCAG axe scans                |
| `npm run lhci`        | Lighthouse CI against `out/` (build first)     |
| `npm run docs`        | TypeDoc → `docs/api/` (gitignored, local only) |

---

## Docker

### Development

```bash
docker compose up --build          # dev service, http://localhost:3000
```

### Production simulation

```bash
docker compose --profile prod up --build runner   # nginx serving out/, http://localhost:8080
```

The runner stage is `nginx:alpine` serving the static export. `nginx.conf` sets 1-year immutable cache on `_next/static/` chunks and enables gzip.

---

## CI pipeline

| Job     | What it does                                                                            |
| :------ | :-------------------------------------------------------------------------------------- |
| `build` | Format · lint · security audit · types · Jest (273 tests, 100% coverage) · Node 22 & 24 |
| `e2e`   | Playwright suite (38 tests) + WCAG 2.1 AA axe scans (full coverage)                     |
| `lhci`  | Lighthouse CI gate: a11y ≥ 95, best-practices ≥ 90, SEO ≥ 90                            |

The `out/` artifact produced by the `build (22.x)` run is shared with `lhci` to avoid a duplicate build. Build caching is implemented to optimize performance.

---

## Technical Hardening (Deep Resilience)

Every architectural decision is optimized for **Deterministic Future-Proofing**:

- **Offline Autonomy:** Custom Service Worker (PWA) handles asset caching for functional offline viewing.
- **Fail-Safe UX:** Deterministic 3s timeout for WebGL with a high-fidelity CSS gradient fallback.
- **Security Gates:** `npm audit --audit-level=high` integrated into CI to block vulnerable dependencies.
- **Config Resilience:** Build-time environment validation script prevents misconfigured deployments.
- **Semantic SEO:** Full JSON-LD implementation (Person, WebSite, BreadcrumbList) for lead-gen discovery.

---

## Tech stack

Deployments to GitHub Pages are triggered separately via `deploy.yml`, which also generates TypeDoc into `out/docs/api/`.

---

## Tech stack

- **Next.js 16** — App Router, static export (`output: 'export'`)
- **React 19 / TypeScript 5** — strict mode, zero `any`
- **Tailwind CSS v4** — OKLCH colour space, CSS-variable tokens
- **Framer Motion 12** — centralised animation variants
- **Three.js / React Three Fiber** — WebGL topology visualisation
- **Jest 30 + fast-check** — unit, integration, property-based testing
- **Playwright + @axe-core/playwright** — E2E + WCAG 2.1 AA
- **Lighthouse CI** — automated performance/a11y/SEO gating
- **TypeDoc** — API docs auto-generated on every deploy

---

## Architecture

```
src/
  app/             Next.js App Router routes ((en)/ and (es)/es/)
  components/      Thin UI layer; hooks/ for state + DI
  lib/
    contracts/     Domain data models (.types.ts separated)
    services/      Business logic (CommandProcessor, ProjectRepository)
    i18n/          EN/ES translations keyed to contracts
    animations.ts  Centralised Framer Motion variants
    metadata.ts    buildMetadata() shared by both locales
    siteConfig.ts  Single source of truth for all site-wide values
```

SOLID principles throughout: contracts own data shapes, services own logic, components own presentation. No business logic in components.

---

## Repository

[github.com/gesttaltt/jonathan-verdun-portfolio](https://github.com/gesttaltt/jonathan-verdun-portfolio)
