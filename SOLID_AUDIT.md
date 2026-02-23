# Architectural & Visual Audit - SOLID Compliance & Rendering

## 1. Background Rendering Issue: Root Cause Analysis

The background (InteractiveTopology) is currently not rendering or is obscured.

### 1.1 Technical Findings

- **Z-Index Conflict:** The main layout in `src/app/page.tsx` has `InteractiveTopology` at `z-0` and the main content at `z-10`. However, the background div in `InteractiveTopology.tsx` also uses `fixed inset-0 z-0`.
- **CSS Variable Loading:** The Three.js points rely on CSS variables (`--node-color`, `--interaction-glow`) fetched via `getComputedStyle`. In Next.js/React 19, there can be a race condition between style injection and the `useEffect` trigger in `TopologyMesh`.
- **Canvas Transparency:** The `Canvas` in `InteractiveTopology` has `alpha: false`. This might prevent the underlying background colors/gradients from being visible if the canvas doesn't clear to transparency correctly.
- **Occlusion:** `src/app/page.tsx` has a final "Background Gradient" div at the bottom with `z-0`. This might be overlaying the `InteractiveTopology` depending on stack order.

### 1.2 Proposed Fixes

- Move `InteractiveTopology` to a dedicated layer.
- Set `alpha: true` on the Three.js Canvas.
- Ensure CSS variables are available or provide robust fallbacks.

## 2. SOLID Principle Violations

The codebase currently exhibits several violations that hinder long-term maintainability.

### 2.1 Single Responsibility Principle (SRP)

- **`Terminal.tsx`**: This component is overloaded. It handles:
  1. Terminal UI rendering (Header, Body, Input).
  2. Logic for the "Boot Sequence".
  3. Command processing/parsing logic.
  4. State management for history.
     **Fix:** Extract `useTerminalLogic` hook and a `CommandProcessor` class/service.
- **`InteractiveTopology.tsx`**: Handles Three.js setup, Shader code (as strings), and mouse interaction logic.
  **Fix:** Move Shader strings to separate files or a constants object. Extract the "Mesh" logic.

### 2.2 Open/Closed Principle (OCP)

- **`Terminal.tsx` (processCommand)**: The command processing is hardcoded to use `INTERACTIVE_COMMANDS`. Adding a new command source (e.g., from an API or a different contract) would require modifying the component.
  **Fix:** The Terminal should accept a `CommandProcessor` interface.

### 2.3 Liskov Substitution Principle (LSP)

- _No major violations found_, but the `Command` interface in `Terminal.tsx` is slightly inconsistent between the boot sequence and user input.

### 2.4 Interface Segregation Principle (ISP)

- **Contracts**: Some contracts like `DataEngineeringContract.ts` contain both interfaces and implementation classes (`DataEngineeringService`).
  **Fix:** Separate interfaces into `.types.ts` files and services into `.service.ts` files.

### 2.5 Dependency Inversion Principle (DIP)

- **Components depending on Concrete Implementations**: `ProjectGallery` depends directly on `ProjectService`. `Terminal` depends directly on `INTERACTIVE_COMMANDS`.
  **Fix:** Use Dependency Injection or props to pass services/data into components.

## 3. Action Plan

1.  **Refactor Contracts**: Separate types from services.
2.  **Extract Terminal Logic**: Create a custom hook and service for command processing.
3.  **Fix Rendering**: Update `InteractiveTopology` and `page.tsx` layering.
4.  **Shader Modularization**: Move Shaders out of the component file.
