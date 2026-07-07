# Shader Specification

Reference for the WebGL/GLSL shaders in `src/lib/shaders/TopologyShaders.ts`.

---

## Overview

The topology background renders an animated point cloud using custom GLSL shaders on a subdivided icosahedron. The visual effect combines simplex noise displacement, p-adic valuation modulation, and mouse-reactive glow.

---

## Uniforms

| Uniform      | Type    | Source                       | Description                           |
| ------------ | ------- | ---------------------------- | ------------------------------------- |
| `time`       | `float` | `clock.getElapsedTime()`     | Elapsed seconds, drives all animation |
| `mouse`      | `vec2`  | Normalized pointer UV        | Lerped mouse position in 0-1 UV space |
| `color`      | `vec3`  | `--node-color` CSS var       | Base node color (blue-500 default)    |
| `hoverColor` | `vec3`  | `--interaction-glow` CSS var | Hover glow color (violet-500 default) |

---

## Vertex Shader

### Simplex Noise (`snoise`)

Full 3D simplex noise implementation (Ashima Arts). Used for:

- **Displacement:** `snoise(position * 0.5, time * 0.2)` — slow, large-scale surface deformation
- **Pulse detection:** `snoise(position * 2.0, time * 2.0)` — fast, fine-grained sparkle. Vertices where noise > 0.8 become "pulsing" nodes

### P-adic Valuation (`padicValuation`)

```glsl
float padicValuation(vec3 pos) {
    float h = fract(sin(dot(pos.xy, vec2(12.9898, 78.233))) * 43758.5453);
    float level = floor(h * 4.0) / 4.0;
    return level;
}
```

Assigns each vertex a discrete "p-adic level" (0.0, 0.25, 0.5, 0.75) based on a hash of its position. This creates a quantized, non-Euclidean structure in the response pattern.

### Mouse Interaction

```glsl
float dist = distance(uv, mouse);
float hoverStrength = smoothstep(0.4, 0.0, dist);
float primeModulator = sin(time * 2.0 + padicLevel * 10.0);
vPadicResonance = hoverStrength * step(0.5, primeModulator);
```

Vertices near the mouse cursor receive `hoverStrength`. This is modulated by a time-varying sine wave offset by the vertex's p-adic level, creating a "flickering resonance" effect where only certain p-adic levels respond at any given moment.

### Displacement

```glsl
float steppedRepulsion = floor(hoverStrength * 5.0) / 5.0;
vec3 newPos = position + normal * (noise * 0.5 + steppedRepulsion * 2.0);
```

Vertices are displaced along their normal by noise + a quantized (stepped) repulsion from the mouse cursor.

### Point Size

```glsl
gl_PointSize = (8.0 + noise * 4.0 + vPulse * 15.0 + vPadicResonance * 10.0) * (1.0 / -gl_Position.z);
```

Base size 8px, modulated by noise (subtle variation), pulse (bright sparks), and p-adic resonance (mouse glow). Perspective-divided for depth attenuation.

### Varyings Output

| Varying           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `vUv`             | UV coordinates                                      |
| `vDisplacement`   | Noise value at vertex (-1 to 1)                     |
| `vPulse`          | Binary — 1.0 for "sparking" vertices, 0.0 otherwise |
| `vPadicResonance` | 0.0-1.0 — mouse proximity modulated by p-adic level |

---

## Fragment Shader

### Point Rendering

```glsl
float r = distance(gl_PointCoord, vec2(0.5));
if (r > 0.5) discard;
float glow = pow(1.0 - r * 2.0, 1.5);
```

Each point is rendered as a soft circle. Pixels outside radius 0.5 are discarded. The `glow` falloff uses a 1.5 power curve for a smooth halo.

### Color Mixing

```glsl
vec3 baseColor = mix(color, hoverColor, vDisplacement * 0.5 + 0.5);
vec3 resonanceColor = mix(baseColor, vec3(0.8, 1.0, 1.0), vPadicResonance);
vec3 finalColor = mix(resonanceColor, vec3(1.0), vPulse * 0.8);
```

1. **Base:** Blend between `color` (blue) and `hoverColor` (violet) based on noise displacement
2. **Resonance:** Shift toward cyan-white when mouse-proximate and p-adic-active
3. **Pulse:** Push toward pure white for sparking vertices

### Alpha

```glsl
float finalAlpha = glow * (0.15 + vPulse * 0.8 + vPadicResonance * 1.0);
```

Base alpha is dim (0.15). Pulsing vertices become bright (0.95). Resonating vertices become fully opaque.

---

## Rendering Config

Set in `TopologyMesh.tsx`:

| Property      | Value              | Reason                                 |
| ------------- | ------------------ | -------------------------------------- |
| `transparent` | `true`             | Points fade via alpha                  |
| `depthWrite`  | `false`            | Points don't occlude each other        |
| `blending`    | `AdditiveBlending` | Overlapping points create glow buildup |

Set in `InteractiveTopology.tsx` canvas:

| Property    | Value    | Reason                                     |
| ----------- | -------- | ------------------------------------------ |
| `alpha`     | `true`   | Canvas background is transparent           |
| `antialias` | `false`  | Performance — points don't benefit from AA |
| `stencil`   | `false`  | Not used                                   |
| `depth`     | `false`  | Not needed for point cloud                 |
| `dpr`       | `[1, 2]` | Capped at 2x for retina                    |

---

## Geometry

`IcosahedronGeometry(radius=4, detail)` where detail is 16 (quality > 0.8) or 8 (lower quality). At detail 16, this produces ~163,842 vertices rendered as points.

The mesh rotates slowly: `rotation.y = time * 0.05`, `rotation.x = sin(time * 0.1) * 0.1`.
