export interface TestSuiteSpecification {
  layer: 'unit' | 'integration' | 'property-based' | 'regression'
  objective: string
  status: 'locked' | 'evolving'
}

export interface QAPhilosophy {
  constraints: string[]
  specifications: TestSuiteSpecification[]
}
