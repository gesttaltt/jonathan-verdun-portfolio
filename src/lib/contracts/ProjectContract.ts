import { ProjectSpec } from './ProjectContract.types'

export const PROJECT_DATA: ProjectSpec[] = [
  {
    id: 'proj-01',
    title: 'QA Arxiv Mobile',
    description:
      '26 automated pytest + Appium tests and 10 manual cases across 4 user stories, traced to ADO Test Plans. Defect workflow, API validation, and mobile smoke flows — all gated in GitHub Actions CI.',
    techStack: ['Appium', 'pytest', 'Azure DevOps', 'GitHub Actions'],
    link: 'https://github.com/gesttaltt/qa-arxiv-mobile',
    status: 'QA',
    specLink: '/quality/specs/TESTING',
    stats: [
      { label: 'Automated', value: '26' },
      { label: 'Manual Cases', value: '10' },
    ],
    highlights: [
      '100% requirement coverage across 4 user stories, traced to ADO test plans',
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
    id: 'proj-05',
    title: 'Functional Genome API',
    description:
      '96-test suite covering every REST endpoint via FastAPI TestClient and async httpx. CI gate requires lint, type-check, security scan (bandit + pip-audit), Docker smoke test, and coverage before merge.',
    techStack: ['FastAPI', 'pytest', 'Docker', 'Security Audit'],
    link: 'https://github.com/gesttaltt/codon-encoding-api',
    status: 'Deployed',
    specLink: '/quality/specs/CONTRACTS',
    stats: [
      { label: 'Tests', value: '96' },
      { label: 'Endpoints', value: '8' },
    ],
    highlights: [
      '96-test black-box suite covers every endpoint with edge-case payloads',
      'Multi-layer CI gate: lint → type-check → security → Docker smoke → coverage',
      'Found 3 API contract violations during integration testing, pre-deployment',
      'Async httpx client verifies all endpoints concurrently in under 30s',
    ],
    architecture:
      'Black-box tests over FastAPI TestClient for speed, plus httpx integration tests against a live Docker container. Security scanning runs in parallel with functional tests; test data is generated programmatically.',
    links: [
      { label: 'API Docs', url: 'https://github.com/gesttaltt/codon-encoding-api' },
      { label: 'CI Pipeline', url: 'https://github.com/gesttaltt/codon-encoding-api/actions' },
    ],
  },
  {
    id: 'proj-06',
    title: 'Transcription Engine QA',
    description:
      '230+ tests across unit (Jest), integration, and E2E (Playwright) for a headless YouTube transcript extraction service. A 100-run resilience campaign used Root Cause Analysis to categorize failures and drive stability improvements.',
    techStack: ['Playwright', 'Jest', 'CI/CD', 'RCA'],
    link: 'https://github.com/gesttaltt/yt-transcript-api',
    status: 'Deployed',
    specLink: '/quality/specs/ARCHITECTURE',
    stats: [
      { label: 'Tests', value: '230+' },
      { label: 'Layers', value: '3' },
    ],
    highlights: [
      'High success rate across 100 resilience-campaign runs, fully RCA-categorized',
      'Three-layer test architecture catches regressions at the cheapest stage',
      'RCA-driven fixes steadily improved stability across iterations',
      'Headless suite validates extraction across 50+ real YouTube URLs per run',
    ],
    architecture:
      'Test pyramid: Jest for extraction logic, integration tests for API middleware, Playwright E2E for full browser flows. RCA taxonomy tags each failure (network, parsing, rate-limit, timeout) for trend analysis.',
    links: [
      { label: 'RCA Dashboard', url: 'https://github.com/gesttaltt/yt-transcript-api' },
      {
        label: 'A/B Campaign Results',
        url: 'https://github.com/gesttaltt/yt-transcript-api/actions',
      },
    ],
  },
  {
    id: 'proj-07',
    title: 'Portfolio QA Hardened',
    description:
      'QA reference implementation: 100% logic coverage, automated WCAG 2.1 AA gates, 570+ Jest tests, and 66 Playwright E2E tests. Every claim in the QA Philosophy section is backed by a CI gate.',
    techStack: ['Next.js', 'Playwright', 'Jest', 'fast-check'],
    link: 'https://github.com/gesttaltt/jonathan-verdun-portfolio',
    status: 'QA',
    specLink: '/quality/specs/TESTING',
    stats: [
      { label: 'Tests', value: '570+' },
      { label: 'Coverage', value: '100%' },
    ],
    highlights: [
      '100% statement/branch/function/line coverage enforced as a CI gate',
      'Automated WCAG 2.1 AA scans on every E2E run — zero violations in production',
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
    id: 'proj-02',
    title: 'Variant Analysis Pipeline',
    description:
      'Genomic variant analysis pipeline — faster VCF throughput via NumPy vectorization over naive Python. Integrates LOEUF constraints and Gene Ontology annotations, validated against known gnomAD reference sets.',
    techStack: ['Python', 'NumPy', 'GnomAD', 'Genomics'],
    link: 'https://github.com/gesttaltt/variant-analysis-pipeline',
    status: 'Research',
    specLink: '/quality/specs/ARCHITECTURE',
    stats: [
      { label: 'vs Native Python', value: 'NumPy' },
      { label: 'Functionomes', value: 'Yes' },
    ],
    highlights: [
      'Faster VCF throughput via NumPy vectorization over naive Python',
      'Parameterized regression tests cross-validate outputs against gnomAD reference sets',
      'LOEUF integration enables evolutionary-aware variant prioritization',
      'Built for batch processing of population-scale (100K+ samples) VCF files',
    ],
    architecture:
      'NumPy-vectorized VCF parser with chunked I/O for memory-bound datasets. LOEUF scores merge via interval tree join with gnomAD constraint tracks; GO annotations cache in SQLite. Regression tests compare output distributions against published gnomAD statistics.',
    links: [
      { label: 'Dataset Docs', url: 'https://github.com/gesttaltt/variant-analysis-pipeline' },
    ],
  },
  {
    id: 'proj-04',
    title: '3-Adic ML Engine',
    description:
      'ML pipeline with a 280-test suite covering VAE correctness and geometric invariants (ARI 0.844). Dual VAEs in Poincaré ball geometry, with hierarchy enforced by 3-adic valuation — not memorization.',
    techStack: ['PyTorch', '3-Adic Analysis', 'Geometric DL'],
    link: 'https://github.com/gesttaltt/3-adic-valuation-vae',
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
    links: [{ label: 'Research Paper', url: 'https://github.com/gesttaltt/3-adic-valuation-vae' }],
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
