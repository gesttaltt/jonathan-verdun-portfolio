import { ProjectSpec } from './ProjectContract.types'
import { COVERAGE_STATS } from '../generated/coverageStats'

// Shared by ProjectCard and ProjectDetail — both render the same status badge.
export const PROJECT_STATUS_STYLES: Record<ProjectSpec['status'], string> = {
  Deployed: 'bg-green-500/20 text-green-400 light:text-green-800 light:bg-green-500/10',
  QA: 'bg-blue-500/20 text-blue-400 light:text-blue-800 light:bg-blue-500/10',
  Research: 'bg-purple-500/20 text-purple-400 light:text-purple-800 light:bg-purple-500/10',
  Prototype: 'bg-amber-500/20 text-amber-400 light:text-amber-800 light:bg-amber-500/10',
  Archived: 'bg-zinc-500/20 text-zinc-300 light:text-zinc-800 light:bg-zinc-500/10',
}

// Fallback for any status not covered above, shared by ProjectCard and ProjectDetail.
export const PROJECT_STATUS_STYLE_FALLBACK = 'bg-zinc-500/20 text-zinc-300'

export const PROJECT_DATA: ProjectSpec[] = [
  {
    id: 'proj-01',
    title: 'QA Arxiv Mobile',
    description:
      '57 automated pytest tests and 11 manual ADO-format test cases, traced to ADO Test Plans. Defect workflow, API validation, and mobile smoke flows — all gated in GitHub Actions CI.',
    techStack: ['Appium', 'pytest', 'Azure DevOps', 'GitHub Actions'],
    link: 'https://github.com/gesttaltt/qa-arxiv-mobile',
    status: 'QA',
    specLink: '/quality/specs/TESTING',
    stats: [
      { label: 'Automated', value: '57' },
      { label: 'Manual Cases', value: '11' },
    ],
    highlights: [
      'Manual test cases traced to user stories and ADO test plans',
      'Reduced manual regression effort via Appium mobile automation',
      'Severity-classified defect workflow with reproduction steps in Azure DevOps',
      'CI gate blocks merges on automation regression failures',
    ],
    architecture:
      'Page Object Model with pytest fixtures for test isolation. Custom conftest.py handles Appium sessions and device abstraction. ADO API syncs test outcomes bi-directionally; tests run in parallel, split by user story.',
    links: [
      { label: 'Test Plan (ADO)', url: 'https://github.com/gesttaltt/qa-arxiv-mobile' },
      { label: 'CI Pipeline', url: 'https://github.com/gesttaltt/qa-arxiv-mobile/actions' },
    ],
  },
  {
    id: 'proj-07',
    title: 'Portfolio QA Hardened',
    description: `QA reference implementation: ${COVERAGE_STATS.unitCoverage} logic coverage, automated WCAG 2.1 AA gates, 570+ Jest tests, and 67 Playwright E2E tests. The measurable claims in the QA Philosophy section are backed by a CI gate.`,
    techStack: ['Next.js', 'Playwright', 'Jest', 'fast-check'],
    link: 'https://github.com/gesttaltt/jonathan-verdun-portfolio',
    status: 'QA',
    specLink: '/quality/specs/TESTING',
    stats: [
      { label: 'Tests', value: '570+' },
      { label: 'Coverage', value: COVERAGE_STATS.unitCoverage },
    ],
    highlights: [
      'Coverage thresholds (97–99% across statements/branches/functions/lines) enforced as a CI gate',
      'Automated WCAG 2.1 AA scans on every E2E run — zero violations on the routes covered',
      'Property-based tests (fast-check) catch i18n drift and terminal edge cases',
      'Three CI jobs finish in under 10 minutes across a Node 22/24 matrix',
    ],
    architecture:
      'Static export on Next.js 16 App Router. SOLID layering: contracts own data, services own logic, components own presentation. Three test layers — Jest, Playwright, Lighthouse CI. WebGL has a 3s CSS-gradient failover.',
    links: [
      {
        label: 'CI Pipeline',
        url: 'https://github.com/gesttaltt/jonathan-verdun-portfolio/actions',
      },
      {
        label: 'Quality Dashboard',
        url: 'https://gesttaltt.github.io/jonathan-verdun-portfolio/quality',
      },
      {
        label: 'Coverage Report',
        url: 'https://github.com/gesttaltt/jonathan-verdun-portfolio/actions',
      },
    ],
  },
  {
    id: 'proj-04',
    title: '3-Adic ML Engine',
    description:
      'ML pipeline with a 280-test suite covering VAE correctness and geometric invariants (ARI 0.844). Dual VAEs in Poincaré ball geometry, with hierarchy enforced by 3-adic valuation — not memorization.',
    techStack: ['PyTorch', '3-Adic Analysis', 'Geometric DL'],
    link: 'https://github.com/gesttaltt/3-adic-ml',
    status: 'Research',
    specLink: '/quality/specs/SHADERS',
    stats: [
      { label: 'Tests', value: '280' },
      { label: 'ARI', value: '0.844' },
    ],
    highlights: [
      '280-test suite mathematically verifies VAE correctness, not just accuracy',
      'Adjusted Rand Index of 0.844 confirms biologically meaningful clustering',
      '3-adic valuation enforces hierarchical structure without supervision',
      'Dual VAE architecture enables cross-modal validation between sequence and structure',
    ],
    architecture:
      'Dual Variational Autoencoders in Poincaré ball geometry. Hierarchy is enforced by 3-adic valuation — sequences closer in p-adic distance map to closer latent points. Tests cover geometric invariants (distance preservation, triangle inequality, boundary behavior) and clustering stability across seeds.',
    links: [{ label: 'Research Paper', url: 'https://github.com/gesttaltt/3-adic-ml' }],
  },
  {
    id: 'proj-03',
    title: 'Gene Functional Pipeline',
    description:
      'Multi-implementation pipeline: a C++ DAG engine, Apache Spark, and Python, cross-verified for functional equivalence against 10M+ gene annotations.',
    techStack: ['Python', 'C++', 'Apache Spark', 'Gene Ontology'],
    link: 'https://github.com/gesttaltt/gene-ontology-functionomes',
    status: 'Research',
    specLink: '/quality/specs/ARCHITECTURE',
    stats: [
      { label: 'Implementations', value: '3' },
      { label: 'Scale', value: '10M+ annotations' },
    ],
    highlights: [
      'Three implementations (C++, Spark, Python) cross-verified for functional equivalence',
      'C++ DAG engine outperforms Python for dependency-ordered annotation processing',
      'Spark distribution enables cloud-scale GO annotation of 10M+ gene products',
      'Shared reference outputs catch implementation drift between language versions',
    ],
    architecture:
      'DAG execution engine with three language backends, each processing the same dependency graph against a shared reference dataset. C++ uses adjacency-list DAG with topological sort; Spark uses DataFrame lineage; Python uses NetworkX for rapid prototyping.',
    links: [
      {
        label: 'Reference Outputs',
        url: 'https://github.com/gesttaltt/gene-ontology-functionomes',
      },
    ],
  },
]

export class ProjectService {
  static getProjects(): ProjectSpec[] {
    return PROJECT_DATA
  }
}
