# DevOps & Deployment Specification

Reference for the CI/CD pipeline, Docker setup, and code quality tooling.

---

## GitHub Actions — CI (`.github/workflows/ci.yml`)

Triggers on `push`/`pull_request` to `main`, `master`, `dev`.

### `build` job — matrix `[22.x, 24.x]`

22.x runs the full suite and produces the build artifact; 24.x runs a lighter type-check + test pass only.

```
checkout → setup-node (npm cache) → npm ci
→ cache .next/cache
→ [22.x only] Check formatting (prettier --check)
→ [22.x only] Linting (eslint)
→ [22.x only] Security audit (npm audit --audit-level=high)
→ Type checking (tsc --noEmit)
→ Run Tests (jest --ci --coverage --json --outputFile=coverage.json)
→ [22.x only] Build (npm run build:ci)
→ [22.x only] Check bundle size budget (npm run size)
→ [22.x only] Upload build artifact "next-out" (out/, 1-day retention)
```

### `e2e` job (needs `build`)

Downloads the `next-out` artifact, installs Playwright browsers, runs `npm run e2e` with `MOCK_CI=true` (serves the static export via `serve` instead of running a dev server), uploads the Playwright report on failure. `MOCK_CI` doesn't stop the app itself from making real network calls — see the `mock-ci` cookie note in `TESTING.md` for how the tests that need a deterministic Sidebar CI-status badge handle that.

### `lhci` job (needs `build`)

Downloads the `next-out` artifact, runs `npm run lhci` (Lighthouse CI against the static export).

---

## GitHub Actions — Deploy (`.github/workflows/deploy.yml`)

Triggers when the CI workflow completes successfully on `main` (via `workflow_run`), a daily cron (`0 0 * * *`), and manual `workflow_dispatch`. Gated on `workflow_run` so a commit that fails CI is never deployed — `main` has no branch protection, so an ungated `push` trigger here would race CI instead of waiting on it. Concurrency group `pages`, doesn't cancel in-progress runs.

```
build: checkout → setup-node 22 → configure-pages
     → npm ci → Generate API docs (npm run docs)
     → Build (npm run build, with BASE_PATH / NEXT_PUBLIC_BASE_PATH /
       NEXT_PUBLIC_SITE_URL supplied by configure-pages)
     → upload-pages-artifact (./out)
deploy (needs build): deploy-pages
```

The site deploys to the GitHub Pages project URL (`gesttaltt.github.io/jonathan-verdun-portfolio`) — there is no custom domain attached.

---

## Docker

Three-stage `Dockerfile`, all stages on `node:22-alpine` except the final one:

| Stage     | Base                  | Purpose                                                    |
| --------- | --------------------- | ---------------------------------------------------------- |
| `deps`    | `node:22-alpine`      | `npm ci`                                                   |
| `builder` | `node:22-alpine`      | `npm run build` — produces the static export in `/app/out` |
| `runner`  | `nginx:stable-alpine` | Serves `/app/out` as static files via nginx, non-root      |

This is a **static export served by nginx** — there is no Node.js server process in the production image. `docker-compose.yml` defines a `dev` service (target `builder`, runs `npm run dev`, bind-mounts the repo for live reload) and a `runner` service (target `runner`, port `8080:80`, `prod` profile) for local production simulation.

---

## Code Quality Tooling

**ESLint** (`eslint.config.mjs`, flat config): extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`, then `eslint-config-prettier` to disable formatting rules. Ignores `.next/`, `out/`, `build/`, `coverage/`, `docs/`, `public/`, `next-env.d.ts`.

**Prettier**: integrated with `prettier-plugin-tailwindcss` for class sorting.

**Husky + lint-staged**: pre-commit hook runs `eslint --fix` + `prettier --write` on staged `*.{js,jsx,ts,tsx}`, and `prettier --write` on staged `*.{json,md,css,scss,yml,yaml}`.

**TypeScript**: `strict: true`, static export via `output: 'export'` in `next.config.ts`, `reactCompiler: true`.

---

## Documentation Generation

`npm run docs` runs `typedoc --out public/docs/api --entryPointStrategy expand src/lib` — entry points are everything under `src/lib` (not the whole `src/` tree), expanded rather than treated as a single module. No `typedoc.json`; all config is passed via CLI flags. Output is committed to the deploy artifact as `/docs/api`.
