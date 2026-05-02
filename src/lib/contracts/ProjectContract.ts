import { ProjectSpec } from './ProjectContract.types'

export const PROJECT_DATA: ProjectSpec[] = [
  {
    id: 'proj-01',
    title: 'QA Arxiv Mobile',
    description:
      '26 automated pytest + Appium tests and 10 manual test cases with full ADO-style traceability across 4 user stories (search, favorites, PDF, network). API validation, mobile smoke flows, and data-integrity checks — all gated through GitHub Actions CI. Validates the test-first and coverage-gate constraints shown in the QA Philosophy section.',
    techStack: ['Python', 'pytest', 'Appium', 'Azure DevOps', 'Docker', 'Postman'],
    link: 'https://github.com/gesttaltt/qa-arxiv-mobile',
    status: 'QA',
    stats: [
      { label: 'Automated', value: '26' },
      { label: 'Manual TC', value: '10' },
    ],
  },
  {
    id: 'proj-02',
    title: 'Functionome Atlas',
    description:
      'Data pipeline engineering for genomic variant analysis — 120× VCF throughput via NumPy vectorization. Integrates LOEUF evolutionary constraints and Gene Ontology annotations against gnomAD at scale.',
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
      'ML pipeline engineering with 280-test suite covering VAE correctness, geometric invariants, and clustering stability (ARI 0.844). Dual VAEs in Poincaré ball geometry — hierarchy enforced by 3-adic valuation, not memorization.',
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
      'Multi-implementation pipeline engineering: C++ DAG engine (5–25× over Python baseline), Apache Spark for cloud-scale execution, and Python for development workflows. Processes 10M+ gene annotations.',
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
