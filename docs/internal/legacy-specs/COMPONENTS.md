# Component Specification

Reference for every React component in `src/components/`.

---

## Component Map

```
components/
├── hooks/
│   ├── useTerminal.ts       # Terminal state machine
│   └── useProjects.tsx      # Project data context + hook (IoC)
├── Terminal.tsx              # Interactive CRT terminal
├── ProjectGallery.tsx        # Project grid layout
├── ProjectCard.tsx           # Individual project card
├── SectionHeader.tsx         # Reusable section heading
├── SystemSpecCard.tsx        # Data architecture card
├── InteractiveTopology.tsx   # R3F canvas + post-processing
├── TopologyMesh.tsx          # Custom shader point cloud
├── BioinformaticsGraphic.tsx # Animated DNA helix SVG
├── PAdicBackground.tsx       # Alternate CSS/SVG background
└── ErrorBoundary.tsx         # Class-based error boundary
```

---

## Terminal

**File:** `Terminal.tsx`
**Pattern:** Dumb component + injected processor

| Prop        | Type                | Default                   | Description              |
| ----------- | ------------------- | ------------------------- | ------------------------ |
| `commands`  | `CommandEntry[]`    | required                  | Boot sequence commands   |
| `className` | `string`            | `''`                      | Additional CSS classes   |
| `processor` | `ICommandProcessor` | `DefaultCommandProcessor` | Injected command handler |

**Behavior:**

1. On mount, the boot sequence plays through `commands` with timed delays.
2. After boot completes, a live input prompt appears (`gestalt@portfolio:~$`).
3. User input is routed to `processor.process(cmd)` — the component has no knowledge of available commands.
4. `clear` is handled natively (resets history).

**Visual features:** CRT scanline overlay, traffic-light title bar dots, `glass-dark` backdrop.

**Hook:** `useTerminal(commands, processor)` manages `history`, `isBooting`, and `execute`.

---

## ProjectGallery + ProjectCard

**Files:** `ProjectGallery.tsx`, `ProjectCard.tsx`

### ProjectGallery

Thin grid wrapper. Consumes `useProjects()` hook and maps to `ProjectCard` instances.

```
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### ProjectCard

| Prop      | Type          | Description                            |
| --------- | ------------- | -------------------------------------- |
| `project` | `ProjectSpec` | Project data from contract             |
| `index`   | `number`      | Position for staggered animation delay |

**Rendering logic:**

- Status badge color comes from `uiConfig.projectStatusStyles[project.status]` — no inline color mapping.
- Tech stack tags render from `project.techStack[]`.
- Optional `project.stats[]` renders below a divider.
- External link icon shown only if `project.link` exists.
- Animation: `fadeUpVariants(index * 0.1)` from the centralized registry.

---

## SectionHeader

**File:** `SectionHeader.tsx`

| Prop               | Type                                      | Default  | Description                              |
| ------------------ | ----------------------------------------- | -------- | ---------------------------------------- |
| `icon`             | `LucideIcon`                              | required | Icon rendered in color badge             |
| `title`            | `string`                                  | required | Section heading text                     |
| `color`            | `'blue' \| 'purple' \| 'cyan' \| 'green'` | `'blue'` | Theme color for badge and accent         |
| `showAccentLine`   | `boolean`                                 | `false`  | Vertical glow line on the left (lg only) |
| `showBorderBottom` | `boolean`                                 | `false`  | Bottom border separator                  |

Uses `COLOR_MAP` to resolve Tailwind classes from the color token.

---

## SystemSpecCard

**File:** `SystemSpecCard.tsx`

| Prop   | Type         | Description                         |
| ------ | ------------ | ----------------------------------- |
| `spec` | `SystemSpec` | Data engineering spec from contract |

Renders `spec.focus`, `spec.methodology`, and `spec.invariants` in a hover-interactive card.

---

## InteractiveTopology + TopologyMesh

**Files:** `InteractiveTopology.tsx`, `TopologyMesh.tsx`

### InteractiveTopology

Fixed full-screen R3F `<Canvas>` with:

- **Post-processing:** Bloom (luminance threshold 0.2) + Vignette
- **GL config:** `alpha: true`, no antialiasing/stencil/depth for performance
- **Grid overlay:** CSS background-image using `--grid-line` token
- **Z-index:** `z-0` (sits behind all content)

### TopologyMesh

| Prop      | Type     | Description                                                |
| --------- | -------- | ---------------------------------------------------------- |
| `quality` | `number` | Controls icosahedron detail level (>0.8 = 16 subdivisions) |

**Shader pipeline:**

- Reads `--node-color` and `--interaction-glow` from CSS custom properties on mount.
- Passes `time`, `mouse`, `color`, `hoverColor` as uniforms.
- Geometry: `IcosahedronGeometry(4, detail)` rendered as `<points>`.
- Blending: `THREE.AdditiveBlending`, transparent, no depth write.

See [SHADERS.md](./SHADERS.md) for GLSL details.

---

## BioinformaticsGraphic

**File:** `BioinformaticsGraphic.tsx`

Animated SVG double-helix with pulsing data points and hoverable codon labels (`ATG`, `GCT`, etc.). Pure presentational — no external data dependencies.

---

## PAdicBackground

**File:** `PAdicBackground.tsx`

Alternative background (not currently used in `page.tsx`). Contains:

- **TopographFlow:** Slowly rotating SVG grid with intersection circles.
- **ShapeshiftingEmbeddings:** 60 animated particles that cycle between `random`, `circle`, `line`, and `clusters` formations every 8 seconds.

---

## ErrorBoundary

**File:** `ErrorBoundary.tsx`

Class-based React error boundary wrapping WebGL components.

| Prop       | Type        | Default             | Description           |
| ---------- | ----------- | ------------------- | --------------------- |
| `children` | `ReactNode` | required            | Components to protect |
| `fallback` | `ReactNode` | Built-in error card | Custom fallback UI    |

Catches render errors via `getDerivedStateFromError`. Logs to console via `componentDidCatch`.

---

## Hooks

### useTerminal

```typescript
useTerminal(initialCommands, processor) → { history, isBooting, execute }
```

- `history`: Array of `CommandEntry` (text + output + metadata).
- `isBooting`: `true` while boot sequence is playing.
- `execute(input)`: Processes user command through injected `ICommandProcessor`.

### useProjects

```typescript
useProjects() → ProjectSpec[]
```

Reads from `ProjectRepositoryContext`. Must be inside a `<ProjectProvider>`.

**ProjectProvider** wraps the app in `layout.tsx`. Accepts optional `adapter` prop for testing or future CMS integration. Defaults to `StaticProjectAdapter`.
