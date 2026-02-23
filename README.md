# Jonathan Verdun Portfolio

[![CI Status](https://github.com/gesttaltt/jonathan-verdun-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/gesttaltt/jonathan-verdun-portfolio/actions)

A glassmorphism portfolio showcasing QA Automation, Bioinformatics, and Data Engineering. Built with Next.js 16, Three.js, and a strict TDD/SOLID architecture.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server at http://localhost:3000
npm run dev
```

### LAN Access (Mobile Testing)

```bash
npm run dev -- -H 0.0.0.0
# Open http://<your-ip>:3000 on your device
```

### Docker

```bash
docker compose up --build
```

### Production Build

```bash
npm run build && npm start
```

## Available Scripts

| Script                | Description                       |
| :-------------------- | :-------------------------------- |
| `npm run dev`         | Start development server with HMR |
| `npm run build`       | Production build                  |
| `npm start`           | Serve production build            |
| `npm run lint`        | Run ESLint                        |
| `npm test`            | Run Jest test suite               |
| `npm run test:watch`  | Run tests in watch mode           |
| `npm run check-types` | TypeScript type checking          |
| `npm run format`      | Format with Prettier              |
| `npm run docs`        | Generate TypeDoc documentation    |

## Tech Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript 5** (strict mode)
- **Tailwind CSS v4** (CSS-variable driven themes)
- **Framer Motion 12** (centralized animation variants)
- **Three.js / React Three Fiber** (custom GLSL shaders)
- **Jest 30 + fast-check** (unit, integration, property-based testing)

## Architecture

The project follows SOLID principles with a service-oriented architecture:

- **Contracts** (`src/lib/contracts/`) - Domain data models with separated `.types.ts` interfaces
- **Services** (`src/lib/services/`) - Business logic (command processing, data repositories)
- **Hooks** (`src/components/hooks/`) - State management with dependency injection
- **Components** - Thin UI layer consuming hooks and services
- **Shaders** (`src/lib/shaders/`) - Modularized GLSL code

## Documentation

Detailed specs live in [`docs/specs/`](./docs/specs/):

| Document                                        | Contents                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| [ARCHITECTURE.md](./docs/specs/ARCHITECTURE.md) | Stack overview, SOLID compliance, project structure, audit history |
| [COMPONENTS.md](./docs/specs/COMPONENTS.md)     | Every React component: props, patterns, behavior                   |
| [CONTRACTS.md](./docs/specs/CONTRACTS.md)       | Domain data layer, types, services, repository pattern             |
| [STYLING.md](./docs/specs/STYLING.md)           | CSS tokens, Tailwind v4 theme, glassmorphism, animation registry   |
| [TESTING.md](./docs/specs/TESTING.md)           | Jest config, testing strategies, mocking patterns                  |
| [DEVOPS.md](./docs/specs/DEVOPS.md)             | CI pipeline, Docker, linting, TypeScript config                    |
| [SHADERS.md](./docs/specs/SHADERS.md)           | GLSL vertex/fragment shaders, uniforms, p-adic valuation           |

## Repository

[github.com/gesttaltt/jonathan-verdun-portfolio](https://github.com/gesttaltt/jonathan-verdun-portfolio)
