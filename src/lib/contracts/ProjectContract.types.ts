export interface ProjectSpec {
  id: string
  title: string
  description: string
  techStack: string[]
  link?: string
  status: 'Deployed' | 'QA' | 'Prototype' | 'Research' | 'Archived'
  stats?: {
    label: string
    value: string
  }[]
  specLink?: string
  /** Key results or achievements displayed as bullet points on the detail page */
  highlights?: string[]
  /** Architecture overview — trade-offs, design decisions, system context */
  architecture?: string
  /** Additional context links beyond the main repo */
  links?: { label: string; url: string }[]
}
