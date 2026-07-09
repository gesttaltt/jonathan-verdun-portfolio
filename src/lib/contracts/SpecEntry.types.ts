export interface SpecEntry<TFocus extends string = string, TMethodology extends string = string> {
  id: string
  focus: TFocus
  methodology: TMethodology
  invariants: string[]
  link?: string
}
