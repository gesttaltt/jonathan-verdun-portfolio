export interface TestSuiteSpecification {
  layer:
    | 'unit'
    | 'integration'
    | 'property-based'
    | 'regression'
    | 'component'
    | 'E2E'
    | 'api'
    | 'accessibility'
    | 'strategy'
    | 'api/contract'
    | 'automation'
    | 'exploratory'
  objective: string
  status: 'stable' | 'maturing'
}

export interface QAPhilosophy {
  manifesto: string
  constraints: string[]
  specifications: TestSuiteSpecification[]
}
