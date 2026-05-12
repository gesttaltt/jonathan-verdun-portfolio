import { Vector3, Color } from 'three'

/**
 * Generates points for a p-adic Cantor-like tree structure.
 * This visualizes the hierarchal/ultrametric nature of p-adic numbers.
 *
 * @param p The prime number base (e.g., 2, 3, 5)
 * @param levels The number of levels in the tree
 * @param scale The overall scale/radius of the structure
 */
export function generatePAdicPoints(p: number = 3, levels: number = 4, scale: number = 4) {
  const points: number[] = []
  const colors: number[] = []
  const baseColor = new Color('#3b82f6')
  const altColor = new Color('#8b5cf6')

  function branch(pos: Vector3, level: number, offset: number) {
    if (level > levels) return

    points.push(pos.x, pos.y, pos.z)

    // Color based on level for depth perception
    const mixRatio = level / levels
    const color = baseColor.clone().lerp(altColor, mixRatio)
    colors.push(color.r, color.g, color.b)

    const nextLevel = level + 1
    const subRadius = offset * 0.5

    for (let i = 0; i < p; i++) {
      const angle = (i / p) * Math.PI * 2
      const newPos = pos.clone().add(
        new Vector3(
          Math.cos(angle) * offset,
          Math.sin(angle) * offset,
          (Math.random() - 0.5) * offset * 0.5 // Add some 3D jitter
        )
      )
      branch(newPos, nextLevel, subRadius)
    }
  }

  branch(new Vector3(0, 0, 0), 0, scale)
  return { points: new Float32Array(points), colors: new Float32Array(colors) }
}
