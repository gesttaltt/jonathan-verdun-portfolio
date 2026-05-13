export interface ResearchSpec {
  id: string
  focus: 'HIV' | 'Codon Encoding'
  methodology: 'p-adic' | 'Hyperbolic VAE'
  invariants: string[]
  link?: string
}

export interface BioinformaticsResearch {
  bridge: string
  specs: ResearchSpec[]
}
