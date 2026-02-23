export interface CodonAnalysis {
  sequence: string
  translation: string[]
  isAntigenic: boolean
}

export interface ResearchSpec {
  id: string
  focus: 'HIV' | 'Arthritis'
  methodology: 'VAE' | 'p-adic' | 'ResNet'
  invariants: string[]
}
