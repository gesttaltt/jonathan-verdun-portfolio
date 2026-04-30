import { Translations } from './types'
import { INTERACTIVE_COMMANDS, BOOT_COMMANDS } from '@/lib/contracts/TerminalContract'

export const en: Translations = {
  lang: 'en',
  tagline: 'QA Engineer · Bioinformatics Researcher',
  workHistoryLabel: 'Work History',
  sections: {
    projects: 'Projects',
    architecture: 'Architecture',
    qa: 'QA Philosophy',
    bioinformatics: 'Bioinformatics Research',
    sidebar: { constraintsTitle: 'Engineering Constraints' },
    qaContact: {
      title: 'Open to work',
      description: 'Open to QA and Research opportunities.',
      ctaLabel: 'Get in Touch',
    },
  },
  qa: {
    constraints: [
      'Test suites gate every merge — coverage thresholds enforced in CI',
      'Property-based fuzzing applied to core domain invariants via fast-check',
      'Strict input validation enforced at all system boundaries',
    ],
    specifications: [
      {
        layer: 'unit',
        objective: 'Enforce isolated domain logic correctness to prevent regression',
        status: 'locked',
      },
      {
        layer: 'property-based',
        objective: 'Fuzz domain contracts with fast-check to surface unknown failure modes',
        status: 'evolving',
      },
      {
        layer: 'component',
        objective: 'Verify rendered behaviour and user interactions via React Testing Library',
        status: 'evolving',
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
  ],
  terminal: {
    title: 'bash — interactive',
    helpCmd: 'help',
    boot: BOOT_COMMANDS,
    interactive: INTERACTIVE_COMMANDS,
  },
}
