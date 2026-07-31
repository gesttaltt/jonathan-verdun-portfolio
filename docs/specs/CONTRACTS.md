# Domain Contracts Specification

Reference for the data layer in `src/lib/contracts/` and `src/lib/services/`.

---

## Design Principles

Each domain is split into two files:

| File Pattern         | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `*Contract.types.ts` | Pure TypeScript interfaces — no runtime code     |
| `*Contract.ts`       | Static data + (where applicable) a service class |

`TerminalContract.ts` is the one exception — it has no separate `.types.ts` file; its one small type (`BootCommand`) is declared inline.

---

## ProjectContract

### Types (`ProjectContract.types.ts`)

```typescript
interface ProjectSpec {
  id: string
  title: string
  description: string
  techStack: string[]
  link?: string
  status: 'Deployed' | 'QA' | 'Prototype' | 'Research' | 'Archived'
  stats?: { label: string; value: string }[]
  specLink?: string
  highlights?: string[] // Key results shown as bullet points on the detail page
  architecture?: string // Trade-offs, design decisions, system context
  links?: { label: string; url: string }[] // Additional context links beyond the main repo
}
```

### Data (`ProjectContract.ts`)

`PROJECT_DATA: ProjectSpec[]` — 5 entries. `ProjectService.getProjects()` returns the static array; nothing else consumes `PROJECT_DATA` directly (see `services/ProjectRepository.ts` below).

| ID        | Title                     | Status   |
| --------- | ------------------------- | -------- |
| `proj-01` | QA Arxiv Mobile           | QA       |
| `proj-07` | Portfolio QA Hardened     | QA       |
| `proj-08` | QA API & Contract Testing | QA       |
| `proj-04` | 3-Adic ML Engine          | Research |
| `proj-03` | Gene Functional Pipeline  | Research |

---

## QAContract

### Types (`QAContract.types.ts`)

```typescript
interface TestSuiteSpecification {
  layer:
    | 'unit'
    | 'integration'
    | 'property-based'
    | 'regression'
    | 'component'
    | 'E2E'
    | 'api'
    | 'accessibility'
    | 'strategy'
    | 'api/contract'
    | 'automation'
    | 'exploratory'
  objective: string
  status: 'stable' | 'maturing'
}

interface QAPhilosophy {
  manifesto: string
  constraints: string[]
  specifications: TestSuiteSpecification[]
}
```

### Data (`QAContract.ts`)

`QA_PHILOSOPHY: QAPhilosophy` — a plain const, no service class. 4 constraints, 6 specifications (layers: strategy, api/contract, automation, exploratory, regression, accessibility). Consumed directly by `QAPhilosophyGrid.tsx`.

---

## DataEngineeringContract

### Types (`DataEngineeringContract.types.ts`)

```typescript
interface SystemSpec {
  id: string
  focus: 'Automated Reporting' | 'Predictive Capacity Control'
  methodology: 'ETL' | 'Additive Modeling'
  invariants: string[]
  link?: string
}
```

### Service (`DataEngineeringContract.ts`)

`DataEngineeringService.getSystemSpecs()` returns 2 hardcoded specs, rendered by `SystemSpecCard`.

---

## BioinformaticsContract

### Types (`BioinformaticsContract.types.ts`)

```typescript
interface ResearchSpec {
  id: string
  focus: 'HIV' | 'Codon Encoding'
  methodology: 'p-adic' | 'Hyperbolic VAE'
  invariants: string[]
  link?: string
}

interface BioinformaticsResearch {
  bridge: string
  specs: ResearchSpec[]
}
```

### Service (`BioinformaticsContract.ts`)

`BioinformaticsService.getResearch()` returns the bridge statement + an empty `specs` array (the HIV and Codon Encoding entries were removed — their linked repos no longer exist under the `Ai-Whisperers` org). `BioinformaticsService.getResearchSpecs()` returns just the specs array.

---

## TerminalContract

**File:** `TerminalContract.ts` (no separate types file — one inline `BootCommand` interface).

Exports: `TERMINAL_PROMPT`, `generateLsOutput(projects)`, `LS_PROJECTS_OUTPUT`, `INTERACTIVE_COMMANDS: Record<string, string>`, `BOOT_COMMANDS: readonly BootCommand[]`. Imports `PROJECT_DATA` from `ProjectContract` and `siteConfig` — so `ls projects` output stays in sync with the real project list without manual duplication.

---

## Services (Adapter Layer)

### ProjectRepository (`services/ProjectRepository.ts`)

```typescript
interface IProjectRepository {
  getProjects(): ProjectSpec[]
}

class StaticProjectAdapter implements IProjectRepository {
  getProjects(): ProjectSpec[] {
    return ProjectService.getProjects()
  }
}
```

Consumed via `components/hooks/useProjects.tsx`: `ProjectProvider` puts a `StaticProjectAdapter` (or an injected `adapter` prop) into a React context; `useProjects()` reads from that context and throws if called outside a `ProjectProvider`. Components never import `ProjectService` directly — only `useProjects()`. Swapping to a future CMS/API source means writing a new `IProjectRepository` implementation and passing it as `adapter`, no component changes required.

### CommandProcessor (`services/CommandProcessor.ts`)

```typescript
interface CommandResponse {
  output: string
  signal?: 'clear' | 'redirect' | 'vfs_update'
  payload?: string
}

interface ICommandProcessor {
  process(cmd: string): CommandResponse
}
```

`DefaultCommandProcessor` looks up the command in a locale-aware commands map (`INTERACTIVE_COMMANDS` by default, or a translated map injected via the constructor — `t.terminal.interactive` for the active locale), returning a not-found message for unknowns. Beyond plain text lookups it also wires up: the `VirtualFileSystem` for `ls`/`cd`/`cat`/`pwd`; the `contact`/`contacto`/`email` aliases, which read the locale map first (falling back through `contact`/`contacto`/a built-in default, so a translation never gets shadowed by hardcoded English) and return a `redirect` signal with a `mailto:` payload; and an optional `customHandlers` map of `(arg?) => CommandResponse | undefined` functions for app-specific commands. `Terminal.tsx` accepts an optional `processor` prop (defaults to `new DefaultCommandProcessor()`), enabling test doubles.

### AuditRepository (`services/AuditRepository.ts`)

Server-side only (uses Node's `fs`). Reads every `.md` file directly under `docs/` (audits) and `docs/specs/` (specs), parses frontmatter with `gray-matter`, converts to sanitized HTML with `marked` + `sanitize-html`. Powers both the `/quality` dashboard listing and the `/quality/[...slug]` detail pages. `getAuditBySlug` rejects any slug containing `..` or an extra `/` before resolving to a file path.
