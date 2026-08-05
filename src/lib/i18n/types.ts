import type { ProjectSpec } from '@/lib/contracts/ProjectContract.types'
import type { SpecEntry } from '@/lib/contracts/SpecEntry.types'

export type Lang = 'en' | 'es'

export interface I18nQASpec {
  layer: string
  objective: string
  status: string
}

// Translated specs relax focus/methodology to plain strings — the literal
// unions from SystemSpec/ResearchSpec only make sense pre-translation.
export type I18nSystemSpec = SpecEntry
export type I18nResearchSpec = SpecEntry

export interface Translations {
  lang: Lang
  skipToContent: string
  title: string
  tagline: string
  description: string
  workHistoryLabel: string
  workHistoryDescriptions: Record<string, string>
  workHistoryRoles: Record<string, string>
  workHistoryPeriods: Record<string, string>
  sections: {
    projects: string
    architecture: string
    qa: string
    bioinformatics: string
    quality: string
    testPlan: string
    traceabilityMatrix: string
    searchPlaceholder: string
    noResults: string
    qualityDashboard: {
      auditsPublished: string
      architectureSpecs: string
      handbookTitle: string
      auditHistoryTitle: string
      clearSearchLabel: string
      verifiedModulesTitle: string
      assertionsLabel: string
      readFullAuditLabel: string
    }
    sidebar: {
      qualityGatesTitle: string
      constraintsTitle: string
      unitCoverageLabel: string
      automationRateLabel: string
      securityScanLabel: string
      livePipelineLabel: string
      certificationTitle: string
      certificationStatusLabel: string
      certificationExpectedLabel: string
      copyEmailLabel: string
      copiedLabel: string
      ciStatusSuccess: string
      ciStatusFailure: string
      ciStatusLoading: string
      ciStatusError: string
      ciPipelineAriaLabel: string
    }
    errorBoundary: {
      title: string
      description: string
      retryLabel: string
    }
    heroHeader: {
      githubAriaLabel: string
      linkedinAriaLabel: string
      // Template — replace '{organization}' with the work-history entry name.
      workHistoryLinkAriaLabel: string
    }
    specCard: {
      // Template — replace '{repo}' with the "owner/repo" path.
      viewGithubAriaLabel: string
    }
    siteFooter: {
      apiDocsLabel: string
      sourceLabel: string
      sitemapLabel: string
      offlineReadyLabel: string
      offlineReadyTooltip: string
      footerAriaLabel: string
      emailAriaLabel: string
      // Trailing text after the "@handle" link in the copyright line —
      // e.g. "on GitHub." / "en GitHub."
      copyrightSuffix: string
    }
    qaContact: { title: string; description: string; ctaLabel: string }
    resume: {
      title: string
      experienceTitle: string
      skillsTitle: string
      expertiseTitle: string
      certificationsTitle: string
      downloadLabel: string
      backToHome: string
    }
    blog: {
      title: string
      readMore: string
      backToBlog: string
      backToHome: string
      publishedOn: string
      tags: string
      noPosts: string
    }
    projectCard: {
      caseStudyLabel: string
      viewSpecAriaLabel: string
      viewGithubAriaLabel: string
    }
    projectDetail: {
      backToProjects: string
      overview: string
      techStack: string
      keyResults: string
      architecture: string
      relatedLinks: string
      metrics: string
      viewOnGithub: string
      viewQaSpecs: string
    }
    contactForm: {
      nameLabel: string
      namePlaceholder: string
      emailLabel: string
      emailPlaceholder: string
      subjectLabel: string
      subjectPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      submitLabel: string
      submittingLabel: string
      successTitle: string
      successMessage: string
      errorTitle: string
      errorMessage: string
      validationRequired: string
      validationEmail: string
      formDisabled: string
    }
  }
  visualTestSummary: {
    title: string
    statusLabel: string
    activeProtocol: string
    executionStatus: string
    passed: string
    failed: string
    testPayload: string
    assertions: string
    verificationRate: string
    lastVerified: string
    regressionDetected: string
  }
  qa: {
    manifesto: string
    constraints: string[]
    specifications: I18nQASpec[]
  }
  architecture: {
    specs: I18nSystemSpec[]
    methodologyLabel: string
    invariantsLabel: string
  }
  bioinformatics: {
    bridge: string
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
    prompt: string
    helpCmd: string
    boot: readonly { text: string; output: string; delay?: number }[]
    interactive: Record<string, string>
  }
}
