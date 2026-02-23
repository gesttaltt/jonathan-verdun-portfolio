export interface ProjectSpec {
  id: string
  title: string
  description: string
  techStack: string[]
  link?: string
  status: 'Deployed' | 'Prototype' | 'Research' | 'Archived'
  stats?: {
    label: string
    value: string
  }[]
}
