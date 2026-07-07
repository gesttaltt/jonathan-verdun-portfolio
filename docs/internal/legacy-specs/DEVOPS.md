# DevOps & Deployment Specification

Reference for the CI/CD pipeline, Docker setup, and code quality tooling.

---

## GitHub Actions CI

**File:** `.github/workflows/ci.yml`

### Trigger

Runs on `push` and `pull_request` to `main`, `master`, and `dev` branches.

### Matrix

| Node.js | OS            |
| ------- | ------------- |
| 20.x    | ubuntu-latest |
| 22.x    | ubuntu-latest |

### Pipeline Steps

```
1. Checkout code
2. Setup Node.js with npm cache
3. npm ci (clean install)
4. Prettier --check (formatting)
5. ESLint (linting)
6. tsc --noEmit (type checking)
7. Jest --ci (testing)
8. TypeDoc (documentation generation)
9. next build (production build)
```

All steps must pass. Failure at any step blocks the build.

---

## Docker

### Dockerfile (Multi-Stage Production Build)

| Stage     | Base             | Purpose                                               |
| --------- | ---------------- | ----------------------------------------------------- |
| `deps`    | `node:22-alpine` | Install dependencies with `npm ci`                    |
| `builder` | `node:22-alpine` | Copy deps, run `npm run build`                        |
| `runner`  | `node:22-alpine` | Copy standalone output, run as non-root `nextjs` user |

**Security:** Runs as UID 1001 (`nextjs` user), not root.

**Output:** Next.js standalone mode — `node server.js` on port 3000, bound to `0.0.0.0`.

### docker-compose.yml (Development)

```yaml
services:
  web:
    build:
      context: .
      target: builder # Uses builder stage, not production runner
    ports:
      - '3000:3000'
    volumes:
      - .:/app # Bind mount for live code changes
      - /app/node_modules # Preserve container's node_modules
      - /app/.next # Preserve build cache
    environment:
      - NODE_ENV=development
      - HOSTNAME=0.0.0.0
    command: npm run dev # Overrides Dockerfile CMD
```

LAN access works automatically since `HOSTNAME=0.0.0.0`.

---

## Code Quality Tooling

### ESLint

**Config:** `eslint.config.mjs` (flat config format for ESLint 9)

**Extends:**

- `eslint-config-next/core-web-vitals` — Next.js best practices + Core Web Vitals rules
- `eslint-config-next/typescript` — TypeScript-specific rules
- `eslint-config-prettier` — Disables rules that conflict with Prettier

**Ignores:** `.next/`, `out/`, `build/`, `node_modules/`, `coverage/`, `docs/`

### Prettier

Integrated via `prettier-plugin-tailwindcss` for automatic class sorting.

### Husky + lint-staged

**Pre-commit hook** runs on staged files:

| Pattern                         | Actions                                |
| ------------------------------- | -------------------------------------- |
| `*.{js,jsx,ts,tsx}`             | `eslint --fix` then `prettier --write` |
| `*.{json,md,css,scss,yml,yaml}` | `prettier --write`                     |

---

## TypeScript

**Config:** `tsconfig.json`

| Setting            | Value       | Note                       |
| ------------------ | ----------- | -------------------------- |
| `strict`           | `true`      | Full strict mode           |
| `target`           | `ES2017`    | Modern JS output           |
| `module`           | `esnext`    | ESM modules                |
| `moduleResolution` | `bundler`   | Next.js bundler resolution |
| `jsx`              | `react-jsx` | Automatic JSX transform    |
| `incremental`      | `true`      | Faster rebuilds            |

**Path alias:** `@/*` maps to `./src/*`.

**React Compiler:** Enabled in `next.config.ts` via `reactCompiler: true` with `babel-plugin-react-compiler`.

---

## Documentation Generation

TypeDoc generates API docs from contract files:

```bash
npm run docs
# Output: /docs directory
```

**Scope:** `BioinformaticsContract.ts` and `QAContract.ts` entry points.
