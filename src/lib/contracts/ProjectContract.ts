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
    highlights: [
      'Achieved 100% requirement coverage across 4 user stories with traceable ADO test plans',
      'Reduced manual regression effort by 72% through mobile automation with Appium',
      'Implemented severity-classified defect workflow with full reproduction steps in Azure DevOps',
      'Established CI gate that blocks merges on automation regression failures',
    ],
    architecture:
      'Page Object Model with pytest fixtures for test isolation. Appium session management via a custom conftest.py with device farm abstraction. ADO API integration for bi-directional test result sync. Parallel test execution split by user story boundary.',
    links: [
      { label: 'Test Plan (ADO)', url: 'https://github.com/gesttaltt/qa-arxiv-mobile' },
      { label: 'CI Pipeline', url: 'https://github.com/gesttaltt/qa-arxiv-mobile/actions' },
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
    highlights: [
      '96-test black-box suite covers every REST endpoint with edge-case payloads',
      'Multi-layer CI gate: lint → type-check → security (bandit + pip-audit) → Docker smoke → coverage',
      'Discovered 3 API contract violations during integration testing before deployment',
      'Async httpx client enables concurrent endpoint verification in under 30s',
    ],
    architecture:
      'Black-box testing layered over FastAPI TestClient for unit-level speed, with complementary httpx integration tests against a live Docker container. Security scanning runs in parallel with functional tests. Test data generated programmatically to avoid hardcoded fixtures — each run uses fresh encoding seeds.',
    links: [
      { label: 'API Docs', url: 'https://github.com/gesttaltt/codon-encoding-api' },
      { label: 'CI Pipeline', url: 'https://github.com/gesttaltt/codon-encoding-api/actions' },
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
    highlights: [
      '89.4% success rate across 100 automated A/B campaign runs with full RCA categorization',
      'Three-layer test architecture (unit → integration → E2E) catches regressions at the cheapest stage',
      'RCA-driven improvements increased stability by 12 percentage points over 6 iterations',
      'Headless Playwright suite validates extraction across 50+ real YouTube URLs per run',
    ],
    architecture:
      'Multi-layer test pyramid: Jest for isolated extraction logic, integration tests for API middleware, Playwright E2E for full browser-context flows. RCA taxonomy tags each failure by category (network, parsing, rate-limit, timeout) enabling trend analysis. Stealth campaign mode runs tests against production traffic without user impact.',
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
      'QA reference implementation featuring 100% logic coverage and automated WCAG 2.1 AA compliance gates. Includes 239 Jest tests (unit, integration, property-based via fast-check) and 14 Playwright E2E tests. Every quality claim in the QA Philosophy section is backed by a CI gate. Demonstrates structural test design and automated quality gates.',
    techStack: ['Next.js', 'Playwright', 'Jest', 'fast-check'],
    link: 'https://github.com/gesttaltt/jonathan-verdun-portfolio',
    status: 'QA',
    specLink: '/quality/specs/TESTING',
    stats: [
      { label: 'Tests', value: '239' },
      { label: 'Coverage', value: '100%' },
    ],
    highlights: [
      '100% statement/branch/function/line coverage enforced as a hard CI gate',
      'Automated WCAG 2.1 AA scans via axe-core in every E2E run — zero violations in production',
      'Property-based tests with fast-check catch i18n drift and terminal routing edge cases',
      'Three CI jobs (build, e2e, lhci) complete in under 10 minutes with Node 22 & 24 matrix',
    ],
    architecture:
      'Static export with Next.js 16 App Router. SOLID separation: contracts own data shapes, services own logic, components own presentation. Three testing layers: Jest for unit/integration/property-based, Playwright for E2E + a11y, Lighthouse CI for performance budgets. WebGL topology has a 3s failover to CSS gradient for resilience.',
    links: [
      {
        label: 'CI Pipeline',
        url: 'https://github.com/gesttaltt/jonathan-verdun-portfolio/actions',
      },
      { label: 'Quality Dashboard', url: 'https://jonathanverdun.com/quality' },
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
      'Data engineering pipeline for genomic variant analysis — ~120× VCF throughput via NumPy vectorization over native Python. Integrates LOEUF evolutionary constraints and Gene Ontology annotations against gnomAD at scale. Pipeline outputs validated against known gnomAD reference sets via parameterized regression tests.',
    techStack: ['Python', 'NumPy', 'GnomAD', 'Genomics'],
    link: 'https://github.com/gesttaltt/variant-analysis-pipeline',
    status: 'Research',
    specLink: '/quality/specs/ARCHITECTURE',
    stats: [
      { label: 'vs Native Python', value: '~120×' },
      { label: 'Functionomes', value: 'Yes' },
    ],
    highlights: [
      '~120× VCF throughput improvement via NumPy vectorization over naive Python iteration',
      'Parameterized regression tests cross-validate outputs against known gnomAD reference sets',
      'LOEUF constraint integration enables evolutionary-aware variant prioritization',
      'Pipeline designed for batch processing of population-scale (100K+ samples) VCF files',
    ],
    architecture:
      'NumPy-vectorized VCF parser with chunked I/O for memory-bound datasets. LOEUF scores merged via interval tree join with gnomAD constraint tracks. Gene Ontology annotations cached in SQLite for fast lookups. Regression test suite compares output distributions against published gnomAD summary statistics.',
    links: [
      { label: 'Dataset Docs', url: 'https://github.com/gesttaltt/variant-analysis-pipeline' },
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
    highlights: [
      '280-test suite mathematically verifies VAE correctness, not just output accuracy',
      'Adjusted Rand Index of 0.844 confirms biologically meaningful clustering',
      '3-adic valuation enforces hierarchical structure in latent space without supervision',
      'Dual VAE architecture enables cross-modal validation between sequence and structure',
    ],
    architecture:
      'Dual Variational Autoencoders operating in Poincaré ball geometry. Hierarchy is enforced by 3-adic valuation of input sequences — sequences closer in p-adic distance map to closer points in latent space. Test suite includes geometric invariant checks (distance preservation, triangle inequality, boundary behavior) plus clustering stability across random seeds.',
    links: [{ label: 'Research Paper', url: 'https://github.com/gesttaltt/3-adic-valuation-vae' }],
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
    highlights: [
      'Three implementations (C++, Spark, Python) cross-verified for functional equivalence',
      'C++ DAG engine delivers 5–25× throughput over Python for dependency-ordered annotation processing',
      'Spark distribution enables cloud-scale GO annotation of 10M+ gene products',
      'Shared reference output suite catches implementation drift between language versions',
    ],
    architecture:
      'Directed Acyclic Graph (DAG) execution engine with three language backends. Each backend processes the same annotation dependency graph and must produce identical outputs against a shared reference dataset. C++ backend uses adjacency-list DAG with topological sort; Spark backend uses DataFrame lineage; Python backend uses NetworkX for rapid prototyping.',
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
