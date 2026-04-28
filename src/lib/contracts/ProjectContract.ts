import { ProjectSpec } from './ProjectContract.types'

export const PROJECT_DATA: ProjectSpec[] = [
  {
    id: 'proj-01',
    title: 'QA Arxiv Mobile',
    description:
      'Manual test cases with user story traceability, cross-platform coverage (iOS/Android), and a Python/pytest automation suite against the open-source arxiv-papers-mobile app.',
    techStack: ['Python', 'pytest', 'Azure DevOps'],
    link: 'https://github.com/gesttaltt/qa-arxiv-mobile',
    status: 'QA',
    stats: [
      { label: 'Test Suites', value: '3' },
      { label: 'Platform', value: 'iOS · Android' },
    ],
  },
  {
    id: 'proj-02',
    title: 'Functionome Atlas',
    description:
      'Pipeline computing Functionome Perturbation Scores to map functional fragility across the human genome. Integrates VCF variant density, evolutionary constraint (LOEUF), and Gene Ontology annotations.',
    techStack: ['Python', 'NumPy', 'Pandas', 'gnomAD'],
    link: 'https://github.com/gesttaltt/Functionome-Atlas',
    status: 'Research',
    stats: [
      { label: 'VCF Speed', value: '120×' },
      { label: 'Functionomes', value: '1,622' },
    ],
  },
  {
    id: 'proj-04',
    title: '3-Adic ML',
    description:
      'Deep learning pipelines for p-adic variational autoencoders. Dual VAEs whose latent spaces live in a Poincaré ball — radial position determined by 3-adic valuation, direction by digit prefix structure. Hierarchy emerges from geometry, not memorization.',
    techStack: ['Python', 'PyTorch'],
    link: 'https://github.com/gesttaltt/3-adic-ml',
    status: 'Research',
    stats: [
      { label: 'Tests', value: '280' },
      { label: 'ARI', value: '0.844' },
    ],
  },
  {
    id: 'proj-03',
    title: 'Gene Functional Pipeline',
    description:
      'GO annotation pipeline for human genome functional analysis. Three implementations: C++ DAG engine for local throughput, Apache Spark for cloud scale, and Python for development workflows.',
    techStack: ['Python', 'C++', 'Apache Spark', 'Gene Ontology'],
    link: 'https://github.com/gesttaltt/gene-ontology-functionomes',
    status: 'Research',
    stats: [
      { label: 'C++ vs Python', value: '5-25×' },
      { label: 'Scale', value: '10M+ genes' },
    ],
  },
]

export class ProjectService {
  static getProjects(): ProjectSpec[] {
    return PROJECT_DATA
  }
}
