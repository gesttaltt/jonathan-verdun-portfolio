import type { SpecEntry } from './SpecEntry.types'

export type ResearchSpec = SpecEntry<'HIV' | 'Codon Encoding', 'p-adic' | 'Hyperbolic VAE'>

export interface BioinformaticsResearch {
  bridge: string
  specs: ResearchSpec[]
}
