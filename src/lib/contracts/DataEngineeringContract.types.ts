export interface SystemSpec {
  id: string
  focus: 'Automated Reporting' | 'Predictive Capacity Control'
  methodology: 'ETL' | 'Additive Modeling'
  invariants: string[]
  link?: string
}
