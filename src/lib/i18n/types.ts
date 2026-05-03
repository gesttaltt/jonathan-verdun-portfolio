import type { ProjectSpec } from '@/lib/contracts/ProjectContract.types'

export type Lang = 'en' | 'es'

export interface I18nQASpec {
  layer: string
  objective: string
  status: string
}

export interface I18nSystemSpec {
  id: string
  focus: string
  methodology: string
  invariants: string[]
  link?: string
}

export interface I18nResearchSpec {
  id: string
  focus: string
  methodology: string
  invariants: string[]
  link?: string
}

export interface Translations {
  lang: Lang
  tagline: string
  workHistoryLabel: string
  workHistoryDescriptions: string[]
  sections: {
    projects: string
    architecture: string
    qa: string
    bioinformatics: string
    sidebar: { constraintsTitle: string }
    qaContact: { title: string; description: string; ctaLabel: string }
  }
  qa: {
    constraints: string[]
    specifications: I18nQASpec[]
  }
  architecture: {
    specs: I18nSystemSpec[]
    methodologyLabel: string
    invariantsLabel: string
  }
  bioinformatics: {
    specs: I18nResearchSpec[]
    focusLabels: Record<string, string>
    focusDescriptions: Record<string, string>
    graphicLabel: string
    methodologyLabel: string
    invariantsLabel: string
  }
  projects: ProjectSpec[]
  terminal: {
    title: string
    helpCmd: string
    boot: readonly { text: string; output: string; delay?: number }[]
    interactive: Record<string, string>
  }
}
