import { Translations } from './types'
import { INTERACTIVE_COMMANDS, BOOT_COMMANDS } from '@/lib/contracts/TerminalContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'

export const en: Translations = {
  lang: 'en',
  tagline: 'Test Architecture · Automation Engineering',
  workHistoryLabel: 'Work History',
  workHistoryDescriptions: [
    'Owned QA across 3 production repos — 153+ automated tests, 7 CI workflows, ADO defect tracking.',
  ],
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
    helpCmd: 'help',
    boot: BOOT_COMMANDS,
    interactive: INTERACTIVE_COMMANDS,
  },
}
