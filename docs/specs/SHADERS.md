# Shader Specification

Reference for the WebGL/GLSL point-cloud background in `src/lib/shaders/` and `src/components/TopologyMesh.tsx`.

---

## Overview

The background renders an animated point cloud whose _geometry_ (not just its shader) changes with `mode`:

- **`p-adic` mode** — `generatePAdicPoints(p=3, levels, scale=3)` (`PAdicGenerator.ts`) recursively branches a p-ary Cantor-like tree: each node spawns `p` children arranged around it at shrinking radius, down to `levels` deep (6 at `quality > 0.8`, else 4). Point color is interpolated (blue → violet) by tree depth.
- **`hyperbolic` mode** — `generateHyperbolicPoints(count, radius=4)` (`HyperbolicGenerator.ts`) samples a Poincaré-disk-style polar distribution (`r = sqrt(random()) * 0.95`) with 1500–3000 points depending on `quality`. Point color is interpolated by radial distance from center.

Both generators return `{ points: Float32Array, colors: Float32Array }`, which `TopologyMesh.tsx` loads into a plain `THREE.BufferGeometry()` — there is no primitive geometry (icosahedron, sphere, etc.) involved.

---

## Uniforms (`TopologyShaders.ts`)

| Uniform          | Type    | Source                                                                                               |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `time`           | `float` | Elapsed seconds since first frame (`performance.now()`), frozen at `0` when `uReducedMotion` is true |
| `mouse`          | `vec2`  | NDC cursor position, lerped toward `state.mouse` each frame (factor `0.2`)                           |
| `uReducedMotion` | `bool`  | `matchMedia('(prefers-reduced-motion: reduce)')`, kept live via a change listener                    |
| `uNodeColor`     | `vec3`  | `--node-color` CSS custom property, re-read on theme change                                          |
| `hoverColor`     | `vec3`  | `--interaction-glow` CSS custom property, re-read on theme change                                    |
| `uLightMode`     | `float` | `0.0` dark / `1.0` light, toggled by a `MutationObserver` watching the `.light` class on `<html>`    |

Per-vertex color comes from an `aColor` attribute (set from the generator's `colors` array), not from a uniform — `uNodeColor` is kept in sync with the CSS token but the fragment shader's base color is actually `vColor` (the per-vertex attribute).

---

## Vertex Shader

Full 3D Simplex noise (Stefan Gustavson / Ashima Arts `snoise`) drives two effects:

- **Displacement:** `snoise(position * 0.5, effectiveTime * 0.2)` offsets each vertex along Z.
- **Pulse:** `snoise(position * 2.0, effectiveTime * 2.0)`, thresholded at `0.8` (`vPulse = step(0.8, pulseNoise)`) — a sparse subset of vertices "spark."

Mouse interaction projects the displaced vertex to screen-space NDC and computes `vHover = smoothstep(0.5, 0.0, distance(screenPos, mouse))`. Hover-proximate vertices get an additional Z-shift (`sin(x*2 + y*2 + time) * 1.5`, scaled by `vHover`) described in-source as an "Ultrametric Shift" simulating p-adic distance contraction near the cursor.

`gl_PointSize = (4.0 + noise*2.0 + vPulse*8.0 + vHover*6.0) * (1.0 / -mvPosition.z)` — base size 4px, boosted by noise/pulse/hover, perspective-divided for depth attenuation.

---

## Fragment Shader

Each point renders as a soft circle (`discard` outside radius 0.5, exponential glow falloff). Behavior branches on `uLightMode`:

- **Light mode:** base color (`vColor`) darkened `*0.8` for contrast on a white background, mixed toward `hoverColor` on hover, sharper edge mask (`smoothstep(0.5, 0.45, r)`), `NormalBlending`.
- **Dark mode:** base color mixed toward near-white on hover, pushed toward pure white on pulse, alpha built from `glow * (0.15 + pulse*0.8 + hover*0.85)`, `AdditiveBlending`.

---

## Reduced Motion

`prefers-reduced-motion` is respected at two levels, not just CSS: `TopologyMesh` freezes the shader's `time` uniform at `0` (so noise-driven displacement/pulse stop) **and** skips the per-frame mesh rotation/breathing (`rotation.y`, `rotation.x`, `position.z`) in its `useFrame` loop.

---

## Mesh Config (`TopologyMesh.tsx`)

| Property      | Value                                                              |
| ------------- | ------------------------------------------------------------------ |
| `transparent` | `true`                                                             |
| `depthWrite`  | `false`                                                            |
| `blending`    | `AdditiveBlending` (dark) / `NormalBlending` (light, swapped live) |

Ambient motion when not reduced: `rotation.y = elapsed * 0.08`, `rotation.x = sin(elapsed * 0.15) * 0.15`, `position.z = cos(elapsed * 0.2) * 0.5`. Geometry is disposed on unmount/mode change.

## Canvas Config (`InteractiveTopology.tsx`)

| Property        | Value                                                                           |
| --------------- | ------------------------------------------------------------------------------- |
| `alpha`         | `true`                                                                          |
| `antialias`     | `false`                                                                         |
| `dpr`           | `[1, 1.5]` mobile / `[1, 2]` desktop                                            |
| Post-processing | `Bloom` + `Vignette`, desktop only — skipped entirely on mobile for performance |

Handles WebGL context loss by remounting the canvas (key bump) on `webglcontextrestored`, and shows a scanline overlay for the duration the context is lost.
