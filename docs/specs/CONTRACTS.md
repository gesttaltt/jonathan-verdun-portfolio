# Domain Contracts Specification

Reference for the data layer in `src/lib/contracts/` and `src/lib/services/`.

---

## Design Principles

Every domain is split into two files:

| File Pattern         | Purpose                                                 |
| -------------------- | ------------------------------------------------------- |
| `*Contract.types.ts` | Pure TypeScript interfaces — no runtime code            |
| `*Contract.ts`       | Static data + service class implementing business logic |

This enforces **Interface Segregation** (consumers import only types they need) and **Single Responsibility** (types and logic don't share a module boundary).

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
  status: 'Deployed' | 'Prototype' | 'Research' | 'Archived'
  stats?: { label: string; value: string }[]
}
```

### Data (`ProjectContract.ts`)

`PROJECT_DATA: ProjectSpec[]` — static array of portfolio projects.

`ProjectService.getProjects()` — returns the static data. Consumed by `StaticProjectAdapter`, not directly by components.

### Current entries

| ID        | Title           | Status    | Stack                                |
| --------- | --------------- | --------- | ------------------------------------ |
| `proj-01` | Ai-Whisperers   | Deployed  | Next.js, Python, LangChain, VectorDB |
| `proj-02` | Epitope-Scanner | Research  | PyTorch, FastAPI, React, Three.js    |
| `proj-03` | Chaos-Kube      | Prototype | Go, Kubernetes, Prometheus, Grafana  |

---

## BioinformaticsContract

### Types (`BioinformaticsContract.types.ts`)

```typescript
interface CodonAnalysis {
  sequence: string
  translation: string[]
  isAntigenic: boolean
}

interface ResearchSpec {
  id: string
  focus: 'HIV' | 'Arthritis'
  methodology: 'VAE' | 'p-adic' | 'ResNet'
  invariants: string[]
}
```

### Service (`BioinformaticsContract.ts`)

- `validateEpitope(sequence)` — deterministic check (currently placeholder: returns `true` if sequence contains `'ATG'`).
- `getResearchSpecs()` — returns two research specs:
  - **HIV** — p-adic methodology, invariants: Numerical Stability, Representation Leakage Prevention
  - **Arthritis** — VAE methodology, invariants: Deterministic Latent Space, PTM-Awareness

---

## DataEngineeringContract

### Types (`DataEngineeringContract.types.ts`)

```typescript
interface SpecAnalysis {
  id: string
  sequence: string
  reliabilityScore: number
  isAnomaly: boolean
}

interface SystemSpec {
  id: string
  focus: 'Distributed Event Processing' | 'Predictive Modeling Engine'
  methodology: 'Generative AI' | 'Anomaly Detection' | 'ResNet'
  invariants: string[]
}
```

### Service (`DataEngineeringContract.ts`)

- `validatePattern(sequence)` — deterministic pattern check (same ATG placeholder).
- `getSystemSpecs()` — returns two system specs rendered by `SystemSpecCard` on the main page.

---

## QAContract

### Types (`QAContract.types.ts`)

```typescript
interface TestSuiteSpecification {
  layer: 'unit' | 'integration' | 'property-based' | 'regression'
  objective: string
  status: 'locked' | 'evolving'
}

interface QAPhilosophy {
  constraints: string[]
  specifications: TestSuiteSpecification[]
}
```

### Data (`QAContract.ts`)

`QA_PHILOSOPHY` — exported constant consumed directly by `page.tsx` for the QA sidebar and verification protocols section.

**Constraints:**

1. Correctness as a Competitive Advantage
2. Zero-Downtime Reproducibility
3. Automated Failure-Mode Analysis

**Specifications:**

- Unit layer (locked) — isolated domain logic correctness
- Property-based layer (evolving) — fuzzing architectural boundaries

---

## TerminalContract

**File:** `TerminalContract.ts` (no separate types file — simple constant exports)

### Boot sequence (`TOP_SECRET_TERMINAL_DATA`)

Three commands that auto-play on terminal mount:

1. `./audit_infrastructure.sh --safety=max`
2. `grep -r "risk_mitigation" ./strategies`
3. `cat engineering_principles.txt`

### Interactive commands (`INTERACTIVE_COMMANDS`)

| Command       | Response                    |
| ------------- | --------------------------- |
| `help`        | Lists available commands    |
| `about`       | Bio summary                 |
| `projects`    | Directs to gallery          |
| `contact`     | Contact info                |
| `status`      | System nominal              |
| `ls projects` | Simulated `ls -l` output    |
| `sudo`        | "Not in sudoers" easter egg |

---

## Services (Adapter Layer)

### CommandProcessor (`services/CommandProcessor.ts`)

```typescript
interface ICommandProcessor {
  process(cmd: string): string
}
```

`DefaultCommandProcessor` — looks up command in `INTERACTIVE_COMMANDS` map. Returns "command not found" for unknowns. Accepts optional `customCommands` in constructor for testing.

### ProjectRepository (`services/ProjectRepository.ts`)

```typescript
interface IProjectRepository {
  getProjects(): ProjectSpec[]
}
```

`StaticProjectAdapter` — wraps `ProjectService.getProjects()`. Injected into `ProjectProvider` context.

**Swap pattern:** To migrate to a CMS, implement `IProjectRepository` with a new adapter (e.g., `SanityProjectAdapter`) and pass it to `<ProjectProvider adapter={new SanityProjectAdapter()}>`.
