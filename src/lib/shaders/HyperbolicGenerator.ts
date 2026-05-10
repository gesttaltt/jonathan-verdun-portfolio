import { Color } from 'three'

/**
 * Generates points for a Hyperbolic Poincaré Disk projection.
 * This visualizes the hyperbolic embeddings used in research.
 *
 * @param count Number of points
 * @param radius Radius of the disk
 */
export function generateHyperbolicPoints(count: number = 2000, radius: number = 4) {
  const points: number[] = []
  const colors: number[] = []
  const baseColor = new Color('#3b82f6')
  const altColor = new Color('#8b5cf6')

  for (let i = 0; i < count; i++) {
    // Poincaré disk model: distance from origin < 1
    // We'll distribute points using a hyperbolic distribution
    const r = Math.sqrt(Math.random()) * 0.95 // stay slightly inside the boundary
    const theta = Math.random() * Math.PI * 2

    // Convert polar to cartesian
    const x = r * Math.cos(theta) * radius
    const y = r * Math.sin(theta) * radius
    const z = (Math.random() - 0.5) * 0.5 // small 3D depth for effect

    points.push(x, y, z)

    // Color based on distance from center (hyperbolic depth)
    const mixRatio = r
    const color = baseColor.clone().lerp(altColor, mixRatio)
    colors.push(color.r, color.g, color.b)
  }

  return { points: new Float32Array(points), colors: new Float32Array(colors) }
}
