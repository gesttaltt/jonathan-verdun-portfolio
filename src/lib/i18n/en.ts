import { Translations } from './types'
import { INTERACTIVE_COMMANDS, BOOT_COMMANDS } from '@/lib/contracts/TerminalContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'

export const en: Translations = {
  lang: 'en',
  skipToContent: 'Skip to content',
  title: 'Jonathan Verdun | QA Automation Engineer',
  tagline: 'Test Architecture · Automation Engineering',
  description:
    'Portfolio of Jonathan Verdun — QA Automation Engineer specializing in Test Architecture, Playwright, Appium, and Azure DevOps. Expert in building deterministic quality gates and scalable automation suites.',
  workHistoryLabel: 'Work History',
  workHistoryDescriptions: {
    'Ai-Whisperers':
      'Led the QA strategy as Co-Founder & QA Lead, implementing 350+ automated tests across Web, Mobile, and API layers. Established full-lifecycle defect management in Azure DevOps and hardened CI/CD pipelines with 100% coverage gates.',
  },
  workHistoryRoles: {
    'Ai-Whisperers': 'Co-Founder & QA Lead',
  },
  workHistoryPeriods: {
    'Ai-Whisperers': 'Sep 2025 – Present',
  },
  sections: {
    projects: 'Projects',
    architecture: 'Architecture',
    qa: 'QA Philosophy',
    bioinformatics: 'Prior Research & Engineering',
    quality: 'Quality Transparency',
    testPlan: 'Master Test Plan',
    traceabilityMatrix: 'Traceability Matrix',
    searchPlaceholder: 'Search audits...',
    noResults: 'No audits match your search query.',
    sidebar: {
      qualityGatesTitle: 'Engineering Quality Gates',
      constraintsTitle: 'Engineering Constraints',
      unitCoverageLabel: 'Logic Coverage',
      automationRateLabel: 'Automation Rate',
      securityScanLabel: 'Security Audit',
      livePipelineLabel: 'Live CI Pipeline',
      certificationTitle: 'Professional Development',
      certificationStatusLabel: 'Status',
      certificationExpectedLabel: 'Expected',
      copyEmailLabel: 'Copy Email',
      copiedLabel: 'Copied!',
    },
    qaContact: {
      title: 'Open to work',
      description: 'Available for QA engineering and automation architecture roles.',
      ctaLabel: 'Get in Touch',
    },
  },
  visualTestSummary: {
    title: 'Live Verification Evidence',
    statusLabel: 'Status',
    activeProtocol: 'CI Protocol: Active',
    executionStatus: 'Execution Status',
    passed: 'PASSED',
    failed: 'FAILED',
    testPayload: 'Test Payload',
    assertions: 'VERIFICATIONS',
    verificationRate: 'Verification Rate',
    lastVerified: 'Last Verified',
    regressionDetected:
      'REGRESSION DETECTED: {count} test(s) failed. System integrity compromised.',
  },
  qa: QA_PHILOSOPHY,
  architecture: {
    methodologyLabel: 'Methodology',
    invariantsLabel: 'Invariants',
    specs: DataEngineeringService.getSystemSpecs(),
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
    specs: BioinformaticsService.getResearchSpecs(),
  },
  projects: PROJECT_DATA,
  terminal: {
    title: 'bash — interactive',
    prompt: 'gestalt@portfolio:',
    helpCmd: 'help',
    boot: BOOT_COMMANDS,
    interactive: INTERACTIVE_COMMANDS,
  },
}
