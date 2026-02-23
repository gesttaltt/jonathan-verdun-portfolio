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

export const PROJECT_DATA: ProjectSpec[] = [
  {
    id: 'proj-01',
    title: 'Ai-Whisperers',
    description:
      'Orchestration layer for multi-agent LLM systems. Focuses on consensus mechanisms and hallucination reduction via cross-model verification.',
    techStack: ['Next.js', 'Python', 'LangChain', 'VectorDB'],
    link: 'https://github.com/Ai-Whisperers',
    status: 'Deployed',
    stats: [
      { label: 'Agents', value: '12+' },
      { label: 'Latency', value: '<200ms' },
    ],
  },
  {
    id: 'proj-02',
    title: 'Epitope-Scanner',
    description:
      'High-throughput sequence analyzer for detecting antigenic regions in viral proteins using variational autoencoders.',
    techStack: ['PyTorch', 'FastAPI', 'React', 'Three.js'],
    status: 'Research',
    stats: [
      { label: 'Accuracy', value: '98.2%' },
      { label: 'Sequences', value: '10k+' },
    ],
  },
  {
    id: 'proj-03',
    title: 'Chaos-Kube',
    description:
      'Kubernetes operator that introduces controlled failure states to verify system resilience and recovery protocols.',
    techStack: ['Go', 'Kubernetes', 'Prometheus', 'Grafana'],
    status: 'Prototype',
    stats: [
      { label: 'Recovery', value: 'Auto' },
      { label: 'Coverage', value: '100%' },
    ],
  },
]

export class ProjectService {
  static getProjects(): ProjectSpec[] {
    return PROJECT_DATA
  }
}
