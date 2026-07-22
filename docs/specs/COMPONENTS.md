# Component Specification

Reference for the components in `src/components/`.

---

## Component Map

```
components/
├── hooks/
│   ├── useProjects.tsx        # Project data context + hook (DI boundary)
│   └── useTerminal.ts         # Terminal state machine
├── AuditCard.tsx               # Card link to one quality audit/spec
├── AuditDetailContent.tsx      # Full audit/spec detail page body
├── BioinformaticsResearchCard.tsx
├── BlogDetailContent.tsx       # Full blog post detail page body
├── BlogList.tsx                 # Blog post summary list
├── BrandIcons.tsx               # Inline GitHub/LinkedIn SVG icons
├── ContactForm.tsx              # Formspree-backed form + validation
├── ErrorBoundary.tsx            # Class-based error boundary
├── FadeInSection.tsx            # Scroll-triggered fade-in wrapper
├── HeroHeader.tsx                # Name, tagline, social links, work history
├── InteractiveTopology.tsx      # R3F canvas + post-processing
├── LanguageSelector.tsx         # EN/ES route-switch links
├── LoadingSkeleton.tsx           # PageSkeleton placeholder layout
├── MotionProvider.tsx           # LazyMotion / MotionConfig wrapper
├── PortfolioPage.tsx            # Main landing-page composition
├── ProjectCard.tsx               # One project card on the gallery
├── ProjectDetail.tsx             # Full project detail page
├── ProjectGallery.tsx            # Grid of ProjectCards via useProjects()
├── QAContact.tsx                  # Titled ContactForm wrapper
├── QAPhilosophyGrid.tsx           # Renders QA_PHILOSOPHY
├── QualityDashboard.tsx          # Search + handbook specs + audit history
├── ResearchSection.tsx            # Bioinformatics + SystemSpec cards
├── ResumeTimeline.tsx             # Resume page timeline
├── RootShell.tsx                   # Global chrome: Plausible, skip-link, SW, JSON-LD
├── SectionHeader.tsx               # Reusable colored section heading
├── ServiceWorkerRegister.tsx       # Registers sw.js in production
├── Sidebar.tsx                      # Quality gates, live CI status, contact
├── SiteFooter.tsx                    # Global footer
├── SystemSpecCard.tsx                 # One Data-Engineering SystemSpec
├── Terminal.tsx                        # Interactive faux-terminal UI
├── TestDetailedList.tsx                 # Per-suite table from coverage.json
├── ThemeScript.tsx                       # Inline pre-hydration theme sync
├── ThemeToggle.tsx                        # Sun/Moon theme toggle button
├── TopologyLoader.tsx                      # Idle-deferred WebGL loader + fallback
├── TopologyMesh.tsx                         # Shader-driven particle geometry
├── TopologyPostProcessing.tsx                # Bloom + Vignette effects
└── TopologyWrapper.tsx                        # Shared background/scanline wrapper
```

`PAdicBackground.tsx` — referenced in older project history — no longer exists; it was dead code removed in favor of the current `InteractiveTopology`/`TopologyMesh` pipeline.

---

## Data flow: useProjects / ProjectProvider

`components/hooks/useProjects.tsx` is the dependency-injection boundary between `services/ProjectRepository.ts` and the component tree:

```tsx
const ProjectRepositoryContext = createContext<IProjectRepository | null>(null)

export const ProjectProvider: React.FC<{ children: ReactNode; adapter?: IProjectRepository }> = ({
  children,
  adapter,
}) => {
  const repo = useMemo(() => adapter || new StaticProjectAdapter(), [adapter])
  return (
    <ProjectRepositoryContext.Provider value={repo}>{children}</ProjectRepositoryContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectRepositoryContext)
  if (!context) throw new Error('useProjects must be used within a ProjectProvider')
  return context.getProjects()
}
```

`ProjectGallery.tsx` and `ProjectDetail.tsx` call `useProjects()` — they never import `ProjectService` or `PROJECT_DATA` directly. Tests inject a mock adapter via the `adapter` prop instead of mocking the contract module.

---

## Terminal

**File:** `Terminal.tsx`

| Prop        | Type                                        | Default                         |
| ----------- | ------------------------------------------- | ------------------------------- |
| `commands`  | `CommandEntry[] \| readonly CommandEntry[]` | required                        |
| `className` | `string`                                    | `''`                            |
| `processor` | `ICommandProcessor`                         | `new DefaultCommandProcessor()` |
| `title`     | `string`                                    | `'bash — interactive'`          |
| `prompt`    | `string`                                    | `TERMINAL_PROMPT`               |
| `hintCmd`   | `string`                                    | `'help'`                        |

**Hook:** `useTerminal(initialCommands, processor)` returns `{ history, isBooting, execute, navigateHistory, currentPath }`. `history: CommandEntry[]`; `execute(input)` routes to `processor.process(cmd)`; `navigateHistory('up' | 'down', currentInput)` implements arrow-key command recall.

Terminal itself has no knowledge of which commands exist — that lookup lives entirely in the injected `processor`.

---

## WebGL Pipeline: TopologyLoader → InteractiveTopology → TopologyMesh

### TopologyLoader

`next/dynamic(() => loadTopology(), { ssr: false, loading: () => <TopologyWrapper /> })`. `loadTopology()` schedules the real `import('@/components/InteractiveTopology')` via `requestIdleCallback` (falling back to a 500ms `setTimeout` where unavailable — Safari, and jsdom in tests) so the heavy Three.js chunk doesn't compete with the main thread during initial paint. A separate 3-second timer resolves to a null component if the import hasn't settled, triggering the CSS-gradient fallback in `TopologyWrapper`.

### InteractiveTopology

`React.FC<{ mode?: 'p-adic' | 'hyperbolic'; quality?: number }>` (defaults `'p-adic'`, `1`). Detects mobile via `matchMedia('(max-width: 768px)')` and adjusts: DPR capped at `1.5×` on mobile vs `2×` desktop, `quality` halved on mobile, and `TopologyPostProcessing` (Bloom + Vignette) is skipped entirely on mobile. Canvas config: `alpha: true`, `antialias: false`, `preserveDrawingBuffer: true`. Handles WebGL context loss/restoration by remounting the `<Canvas>` (key bump) and shows a scanline overlay while the context is lost.

### TopologyMesh

`React.FC<{ quality: number; mode: 'p-adic' | 'hyperbolic' }>` (both required). Builds a `THREE.BufferGeometry()` from points generated by `generatePAdicPoints()` or `generateHyperbolicPoints()` (see `SHADERS.md`) — not a primitive geometry like an icosahedron. Reads `--node-color` and `--interaction-glow` from CSS custom properties, watches the `.light` class via a `MutationObserver` to swap blending mode (`AdditiveBlending` in dark mode, `NormalBlending` in light), and respects `prefers-reduced-motion` via a shader uniform.

---

## Quality Dashboard

`QualityDashboard.tsx` — `{ audits: AuditEntry[] }` — splits audits into `category === 'spec'` (the QA Handbook cards) and `category === 'audit'` (chronological history, client-side searchable by title/excerpt). `VisualTestSummary` and `TestDetailedList` both read `coverage.json` directly (no props) to render the live pass-rate summary and per-suite breakdown.

---

## Error & Loading Handling

`ErrorBoundary.tsx` — `{ children: ReactNode; fallback?: ReactNode }`, class component, wraps the WebGL topology so a render error there doesn't take down the whole page. `LoadingSkeleton.tsx` exports `PageSkeleton`, a pulse-animated placeholder used while route content streams in.
