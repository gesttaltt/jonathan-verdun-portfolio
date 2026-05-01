import { Translations } from './types'
import { INTERACTIVE_COMMANDS, BOOT_COMMANDS } from '@/lib/contracts/TerminalContract'

export const en: Translations = {
  lang: 'en',
  tagline: 'Test Architecture · Automation Engineering',
  workHistoryLabel: 'Work History',
  sections: {
    projects: 'Projects',
    architecture: 'Architecture',
    qa: 'QA Philosophy',
    bioinformatics: 'Prior Research & Engineering',
    sidebar: { constraintsTitle: 'Engineering Constraints' },
    qaContact: {
      title: 'Open to work',
      description: 'Available for QA engineering and automation architecture roles.',
      ctaLabel: 'Get in Touch',
    },
  },
  qa: {
    constraints: [
      '≥80% unit coverage enforced in CI — merge blocked below threshold',
      'Property-based fuzzing via fast-check applied to all domain contracts and boundary conditions',
      'All system boundary inputs validated against strict schemas; invalid inputs rejected at ingestion',
      'Tests written before feature code — test-first discipline enforced at every layer',
    ],
    specifications: [
      {
        layer: 'unit',
        objective: 'Enforce isolated domain logic correctness to prevent regression',
        status: 'stable',
      },
      {
        layer: 'property-based',
        objective: 'Fuzz domain contracts with fast-check to surface unknown failure modes',
        status: 'stable',
      },
      {
        layer: 'component',
        objective: 'Verify rendered behaviour and user interactions via React Testing Library',
        status: 'maturing',
      },
      {
        layer: 'integration',
        objective: 'Verify service boundaries, data flow, and cross-module contracts in CI',
        status: 'maturing',
      },
      {
        layer: 'E2E',
        objective:
          'Cover critical user paths end-to-end via automated browser and mobile automation',
        status: 'maturing',
      },
    ],
  },
  architecture: {
    methodologyLabel: 'Methodology',
    invariantsLabel: 'Invariants',
    specs: [
      {
        id: 'spec-01',
        focus: 'Automated Reporting',
        methodology: 'ETL',
        invariants: ['Idempotent Execution', 'Schema Validation'],
        link: 'https://github.com/Ai-Whisperers/work-hours-automated-reports',
      },
      {
        id: 'spec-02',
        focus: 'Predictive Capacity Control',
        methodology: 'Additive Modeling',
        invariants: ['Monotonic Constraints', 'Bounded Predictions'],
      },
    ],
  },
  bioinformatics: {
    methodologyLabel: 'Methodology',
    invariantsLabel: 'Invariants',
    graphicLabel: 'Data Analysis: [Epitope Discovery Pipeline]',
    focusLabels: {
      HIV: 'HIV Antigen AI',
      'Codon Encoding': 'Codon Encoder API',
    },
    focusDescriptions: {
      HIV: 'Antigen candidate screening using p-adic metric spaces for numerical stability in viral sequence analysis.',
      'Codon Encoding':
        'DNA codon embedding in hyperbolic space via Variational Autoencoder for deterministic amino acid representation.',
    },
    specs: [
      {
        id: 'spec-01',
        focus: 'HIV',
        methodology: 'p-adic',
        invariants: ['Numerical Stability', 'Representation Leakage Prevention'],
        link: 'https://github.com/Ai-Whisperers/hiv-antigen-ai',
      },
      {
        id: 'spec-02',
        focus: 'Codon Encoding',
        methodology: 'Hyperbolic VAE',
        invariants: ['Embedding Determinism', 'Amino Acid Consistency'],
        link: 'https://github.com/Ai-Whisperers/codon-encoder-api',
      },
    ],
  },
  projects: [
    {
      id: 'proj-01',
      title: 'QA Arxiv Mobile',
      description:
        'Test plan and automation suite for the open-source arxiv-papers-mobile app (iOS/Android). Manual test cases with Azure DevOps traceability covering critical user stories. Python/pytest automation targeting login, article fetch, search, and navigation flows.',
      techStack: ['Python', 'pytest', 'Azure DevOps', 'Appium'],
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
  ],
  terminal: {
    title: 'bash — interactive',
    helpCmd: 'help',
    boot: BOOT_COMMANDS,
    interactive: INTERACTIVE_COMMANDS,
  },
}
