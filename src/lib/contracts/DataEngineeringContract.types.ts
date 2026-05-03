export interface SystemSpec {
  id: string
  focus: 'Automated Reporting' | 'Predictive Capacity Control' | 'AI Site Builder'
  methodology: 'ETL' | 'Additive Modeling' | 'Progressive Delivery'
  invariants: string[]
  link?: string
}
