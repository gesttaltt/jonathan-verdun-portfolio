import { ProjectSpec } from './ProjectContract.types'

export const PROJECT_DATA: ProjectSpec[] = [
  {
    id: 'proj-01',
    title: 'QA Arxiv Mobile',
    description:
      '26 automated pytest + Appium tests and 10 manual test cases across 4 User Stories (Search, Favorites, PDF, Network), linked to ADO Test Plans for full traceability. Defect reports logged as work items in Azure DevOps with severity classification and reproduction steps. Validation of API, mobile smoke flows, and data integrity verification — all managed via GitHub Actions CI. Validates the test-first and quality-gate constraints described in the QA Philosophy section.',
    techStack: ['Appium', 'pytest', 'Azure DevOps', 'GitHub Actions'],
    link: 'https://github.com/gesttaltt/qa-arxiv-mobile',
    status: 'QA',
    specLink: '/quality/specs/TESTING',
    stats: [
      { label: 'Automated', value: '26' },
      { label: 'Manual Cases', value: '10' },
    ],
  },
  {
    id: 'proj-05',
    title: 'Functional Genome API',
    description:
      '96-test suite covering all REST endpoints via FastAPI TestClient and async httpx — encoding paths, batch encoding, clustering, visualization, and synonymous variants. CI gate requires lint, type-check, security analysis (bandit + pip-audit), Docker smoke test, and coverage before merge. Implements black-box functional testing techniques to ensure API contract compliance.',
    techStack: ['FastAPI', 'pytest', 'Docker', 'Security Audit'],
    link: 'https://github.com/gesttaltt/codon-encoding-api',
    status: 'Deployed',
    specLink: '/quality/specs/CONTRACTS',
    stats: [
      { label: 'Tests', value: '96' },
      { label: 'Endpoints', value: '8' },
    ],
  },
  {
    id: 'proj-06',
    title: 'Transcription Engine QA',
    description:
      '230+ tests across unit (Jest), integration, and E2E Playwright layers for a headless YouTube transcript extraction service. Stealth mode A/B campaign — 100 automated runs, 89.4% success rate across edge cases; leveraged Root Cause Analysis (RCA) to categorize failure patterns and drive stability improvements. Focused on non-functional stability and regression testing.',
    techStack: ['Playwright', 'Jest', 'CI/CD', 'RCA'],
    link: 'https://github.com/gesttaltt/yt-transcript-api',
    status: 'Deployed',
    specLink: '/quality/specs/ARCHITECTURE',
    stats: [
      { label: 'Tests', value: '230+' },
      { label: 'Layers', value: '3' },
    ],
  },
  {
    id: 'proj-07',
    title: 'Portfolio QA Hardened',
    description:
      'QA reference implementation featuring 100% logic coverage and automated WCAG 2.1 AA compliance gates. Includes 239 Jest tests (unit, integration, property-based via fast-check) and 14 Playwright E2E tests. Every quality claim in the QA Philosophy section is backed by a CI gate. Demonstrates structural test design and automated quality gates.',
    techStack: ['Next.js', 'Playwright', 'Jest', 'fast-check'],
    link: 'https://github.com/gesttaltt/jonathan-verdun-portfolio',
    status: 'QA',
    specLink: '/quality/specs/TESTING',
    stats: [
      { label: 'Tests', value: '239' },
      { label: 'Coverage', value: '100%' },
    ],
  },
  {
    id: 'proj-02',
    title: 'Variant Analysis Pipeline',
    description:
      'Data engineering pipeline for genomic variant analysis — ~120× VCF throughput via NumPy vectorization over native Python. Integrates LOEUF evolutionary constraints and Gene Ontology annotations against gnomAD at scale. Pipeline outputs validated against known gnomAD reference sets via parameterized regression tests.',
    techStack: ['Python', 'NumPy', 'GnomAD', 'Genomics'],
    link: 'https://github.com/gesttaltt/variant-analysis-pipeline',
    status: 'Research',
    specLink: '/quality/specs/ARCHITECTURE',
    stats: [
      { label: 'vs Native Python', value: '~120×' },
      { label: 'Functionomes', value: 'Yes' },
    ],
  },
  {
    id: 'proj-04',
    title: '3-Adic ML Engine',
    description:
      'ML pipeline engineering with 280-test suite covering VAE correctness, geometric invariants, and clustering stability (ARI 0.844). Dual VAEs in Poincaré ball geometry — hierarchy enforced by 3-adic valuation, not memorization. Focuses on verification of mathematical invariants in neural architectures.',
    techStack: ['PyTorch', '3-Adic Analysis', 'Geometric DL'],
    link: 'https://github.com/gesttaltt/3-adic-valuation-vae',
    status: 'Research',
    specLink: '/quality/specs/SHADERS',
    stats: [
      { label: 'Tests', value: '280' },
      { label: 'ARI', value: '0.844' },
    ],
  },
  {
    id: 'proj-03',
    title: 'Gene Functional Pipeline',
    description:
      'Multi-implementation pipeline engineering: C++ DAG engine (5–25× over Python baseline), Apache Spark for cloud-scale execution, and Python for development workflows. Processes 10M+ gene annotations. C++, Spark, and Python implementations cross-verified for functional equivalence via shared reference outputs.',
    techStack: ['Python', 'C++', 'Apache Spark', 'Gene Ontology'],
    link: 'https://github.com/gesttaltt/gene-ontology-functionomes',
    status: 'Research',
    specLink: '/quality/specs/ARCHITECTURE',
    stats: [
      { label: 'C++ vs Python', value: '5-25×' },
      { label: 'Scale', value: '10M+ annotations' },
    ],
  },
]

export class ProjectService {
  static getProjects(): ProjectSpec[] {
    return PROJECT_DATA
  }
}
