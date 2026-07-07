# Architecture & Audit Report

**Last Updated:** February 23, 2026

---

## 1. Technical Stack

| Layer            | Technology                 | Notes                                   |
| :--------------- | :------------------------- | :-------------------------------------- |
| **Framework**    | Next.js 16.1.6             | App Router, React 19                    |
| **Language**     | TypeScript 5.x             | Strict mode                             |
| **Styling**      | Tailwind CSS v4            | CSS-variable driven `@theme` setup      |
| **Animations**   | Framer Motion 12.x         | Centralized variants in `animations.ts` |
| **Graphics**     | Three.js / R3F             | Custom GLSL shaders, modularized        |
| **Testing**      | Jest 30 + RTL + fast-check | Unit, integration, property-based       |
| **Architecture** | SOLID / Service-Oriented   | Contracts, hooks, dependency injection  |

---

## 2. Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Main page (layout-driven, content from siteConfig)
├── components/
│   ├── hooks/
│   │   └── useProjects.tsx     # Data hook with repository injection (IoC)
│   ├── BioinformaticsGraphic.tsx
│   ├── ErrorBoundary.tsx       # React error boundary for WebGL resilience
│   ├── InteractiveTopology.tsx # R3F canvas wrapper
│   ├── PAdicBackground.tsx     # P-adic/ultrametric background visualization
│   ├── ProjectCard.tsx         # Extracted glassmorphic project card
│   ├── ProjectGallery.tsx      # Gallery grid using useProjects hook
│   ├── SectionHeader.tsx       # Reusable section header component
│   ├── SystemSpecCard.tsx      # Data architecture display card
│   ├── Terminal.tsx            # Interactive CRT terminal (dumb component)
│   └── TopologyMesh.tsx        # Extracted R3F mesh with custom shaders
├── lib/
│   ├── contracts/              # Domain data & type definitions
│   │   ├── BioinformaticsContract.ts / .types.ts
│   │   ├── DataEngineeringContract.ts / .types.ts
│   │   ├── ProjectContract.ts / .types.ts
│   │   ├── QAContract.ts / .types.ts
│   │   └── TerminalContract.ts
│   ├── services/
│   │   ├── CommandProcessor.ts # Terminal command logic (ICommandProcessor)
│   │   └── ProjectRepository.ts # Repository pattern adapter
│   ├── shaders/
│   │   └── TopologyShaders.ts  # Modularized GLSL vertex/fragment shaders
│   ├── animations.ts           # Centralized Framer Motion variants
│   ├── siteConfig.ts           # Site metadata, social links, contact info
│   └── uiConfig.ts             # Status colors, UI token mappings
```

---

## 3. SOLID Compliance

### Single Responsibility (SRP)

- **Terminal:** UI is a "dumb" component. Logic lives in `useTerminal` (hook) and `CommandProcessor` (service).
- **Topology:** `TopologyMesh` is extracted; GLSL shaders are in `src/lib/shaders/`.
- **ProjectGallery:** Grid layout only. Card rendering extracted to `ProjectCard`.
- **Page layout:** Section headers abstracted to `SectionHeader`, spec cards to `SystemSpecCard`.

### Open/Closed (OCP)

- **Terminal:** Accepts `ICommandProcessor` via props. New commands are injectable without modifying the component.
- **ProjectGallery:** Consumes data from `useProjects` hook, decoupled from the data source.

### Interface Segregation (ISP)

- **Contracts:** Interfaces live in `.types.ts` files, separated from service implementations. Services import only the types they need.

### Dependency Inversion (DIP)

- **Repository Pattern:** `useProjects` hook accepts an `IProjectRepository`, enabling adapter swaps (static, CMS, API) without UI changes.
- **Command Processing:** Terminal depends on the `ICommandProcessor` interface, not the concrete `CommandProcessor`.

---

## 4. Centralization & Tokenization

### Completed

- **CSS Variables:** Semantic tokens (`--color-bg-deep`, `--grid-line`, `--particle`, `--node-color`, `--interaction-glow`) define the bounded aesthetic.
- **Site Config:** `siteConfig.ts` centralizes metadata, social links, and contact info.
- **UI Config:** `uiConfig.ts` holds project status color mappings and UI tokens.
- **Animations:** `animations.ts` provides shared Framer Motion variants (stagger, fade-in, float).
- **Glassmorphism Utilities:** `.glass`, `.glass-dark`, `.scanline`, `.crt` defined in `globals.css`.

### Remaining

- Audit any inline magic hex values (`bg-[#...]`, `text-[#...]`) and migrate to CSS variable tokens.
- Expand `siteConfig.ts` with page-level content dictionaries to make `page.tsx` fully data-driven.

---

## 5. Quality Assurance

- **Linting:** ESLint 9 + Prettier, enforced via Husky pre-commit hooks and lint-staged.
- **Type Safety:** `tsc --noEmit` check available via `npm run check-types`.
- **Testing:** Jest 30 + React Testing Library + fast-check for property-based tests.
- **Error Boundaries:** `ErrorBoundary` component wraps WebGL/Three.js for graceful degradation.
- **CI:** GitHub Actions pipeline (lint, type-check, test, build).

---

## 6. Remaining Action Items

- [ ] Replace remaining inline magic hex colors with CSS variable tokens
- [ ] Expand `siteConfig.ts` with page content dictionaries
- [ ] Add terminal easter eggs and higher-fidelity simulation commands
- [ ] Integrate p-adic "Shapeshifting Embeddings" into the main R3F topology
- [ ] Replace placeholder strings in `BioinformaticsContract` with real research metadata
- [ ] Implement ultrametric clustering visualizations (fractal p-adic distance)
- [ ] Increase automated test coverage across all components

---

## Audit History

| Version | Date         | Focus                                           |
| :------ | :----------- | :---------------------------------------------- |
| V1      | Feb 22, 2026 | Initial architecture review, component analysis |
| V2      | Feb 22, 2026 | SOLID compliance, Tailwind tokenization audit   |
| V3      | Feb 23, 2026 | Centralization, adapters, repository pattern    |
| SOLID   | Feb 23, 2026 | Rendering fixes, full SOLID verification        |
