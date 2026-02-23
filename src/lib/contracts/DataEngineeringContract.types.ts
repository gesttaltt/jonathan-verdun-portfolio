export interface SpecAnalysis {
  id: string
  sequence: string
  reliabilityScore: number
  isAnomaly: boolean
}

export interface SystemSpec {
  id: string
  focus: 'Distributed Event Processing' | 'Predictive Modeling Engine'
  methodology: 'Generative AI' | 'Anomaly Detection' | 'ResNet'
  invariants: string[]
}
