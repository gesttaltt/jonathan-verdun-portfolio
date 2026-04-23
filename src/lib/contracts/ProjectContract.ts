import { ProjectSpec } from './ProjectContract.types'

export const PROJECT_DATA: ProjectSpec[] = [
  {
    id: 'proj-01',
    title: 'Ai-Whisperers',
    description:
      'Open research organization building AI tooling and infrastructure. Publishes agentic design patterns, local model serving (GGUF/ONNX), and bioinformatics pipelines.',
    techStack: ['Next.js', 'TypeScript', 'Python', 'Supabase'],
    link: 'https://github.com/Ai-Whisperers',
    status: 'Deployed',
    stats: [
      { label: 'Patterns', value: '20' },
      { label: 'Repos', value: '20+' },
    ],
  },
  {
    id: 'proj-02',
    title: 'HIV Antigen AI',
    description:
      'Open-source bioinformatics package for HIV sequence analysis using p-adic geometry and hyperbolic manifolds. Multiple alignment pipeline with conservation scoring and MAFFT integration.',
    techStack: ['Python', 'NumPy', 'Biopython', 'MAFFT'],
    link: 'https://github.com/Ai-Whisperers/hiv-antigen-ai',
    status: 'Research',
  },
  {
    id: 'proj-03',
    title: 'Paragu-AI',
    description:
      'Multi-tenant SaaS platform powering websites for service businesses in Paraguay. Single Next.js 15 + Supabase codebase with per-tenant CMS, custom domain routing, and row-level security.',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'React'],
    link: 'https://github.com/Ai-Whisperers/Vete',
    status: 'Deployed',
    stats: [{ label: 'Tenants', value: '6' }],
  },
]

export class ProjectService {
  static getProjects(): ProjectSpec[] {
    return PROJECT_DATA
  }
}
