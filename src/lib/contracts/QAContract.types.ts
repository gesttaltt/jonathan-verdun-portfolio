export interface TestSuiteSpecification {
  layer: 'unit' | 'integration' | 'property-based' | 'regression' | 'component' | 'E2E' | 'api'
  status: 'stable' | 'maturing'
}

export interface QAPhilosophy {
  constraints: string[]
  specifications: TestSuiteSpecification[]
}
