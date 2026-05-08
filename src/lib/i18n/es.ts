import { Translations } from './types'
import { generateLsOutput } from '@/lib/contracts/TerminalContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'

const ES_HELP_OUTPUT =
  'Comandos disponibles: ayuda, sobre, proyectos, contacto, habilidades, version, quiensoy, limpiar'

// ── Overrides for Project Data ────────────────────────────────────────────────
const ES_PROJECT_OVERRIDES: Record<string, { description: string; statLabels: string[] }> = {
  'proj-01': {
    description:
      '26 tests automatizados con pytest + Appium y 10 casos de prueba manuales en 4 historias de usuario (búsqueda, favoritos, PDF, red), vinculados a ADO Test Plans para trazabilidad completa. Reportes de defectos registrados como work items en Azure DevOps con clasificación de severidad y pasos de reproducción. Validación de API, flujos de smoke móvil y verificación de integridad de datos — todo gestionado vía GitHub Actions CI. Valida las restricciones de test-first y quality-gate descritas en la sección de Filosofía QA.',
    statLabels: ['Automatizados', 'Casos Manuales'],
  },
  'proj-05': {
    description:
      'Suite de 96 pruebas que cubre todos los endpoints REST vía FastAPI TestClient and async httpx — rutas de codificación, codificación por lotes, clustering, visualización y variantes sinónimas. El CI gate requiere lint, type-check, análisis de seguridad (bandit + pip-audit), smoke test de Docker y cobertura antes de hacer merge.',
    statLabels: ['Pruebas', 'Endpoints'],
  },
  'proj-06': {
    description:
      'Más de 230 pruebas en capas de unit (Jest), integración y E2E con Playwright para un servicio headless de extracción de transcripciones de YouTube. Campaña A/B en modo stealth — 100 ejecuciones automatizadas, tasa de éxito del 89.4%, análisis de patrones de fallo por video y documentación de causa raíz como artefactos de reporte.',
    statLabels: ['Pruebas', 'Capas'],
  },
  'proj-07': {
    description:
      'Implementación de referencia QA: 239 pruebas Jest con 100% de cobertura (unit, integración, basadas en propiedades via fast-check), 14 pruebas E2E con Playwright (12 smoke + 2 escaneos axe WCAG 2.1 AA) en rutas EN y ES, y un Lighthouse CI gate que exige a11y ≥95, SEO ≥90. Cada afirmación de calidad en la sección de Filosofía QA está respaldada por un gate ejecutándose en CI.',
    statLabels: ['Pruebas', 'Cobertura'],
  },
  'proj-02': {
    description:
      'Ingeniería de pipeline de datos para análisis de variantes genómicas — rendimiento VCF ~120× vía vectorización NumPy frente a Python nativo. Integra restricciones evolutivas LOEUF y anotaciones Gene Ontology contra gnomAD a escala. Salidas del pipeline validadas contra conjuntos de referencia gnomAD conocidos mediante pruebas de regresión parametrizadas.',
    statLabels: ['vs Python Nativo', 'Funcionomas'],
  },
  'proj-04': {
    description:
      'Ingeniería de pipeline ML con suite de 280 pruebas que cubre correctitud del VAE, invariantes geométricos y estabilidad de clustering (ARI 0.844). VAEs duales en geometría de bola de Poincaré — jerarquía enforced por valuación 3-ádica, no memorización.',
    statLabels: ['Pruebas', 'ARI'],
  },
  'proj-03': {
    description:
      'Ingeniería de pipeline multi-implementación: motor DAG en C++ (5–25× sobre Python base), Apache Spark para ejecución a escala en la nube y Python para flujos de desarrollo. Procesa 10M+ anotaciones génicas. Implementaciones en C++, Spark y Python verificadas cruzadamente para equivalencia funcional mediante salidas de referencia compartidas.',
    statLabels: ['C++ vs Python', 'Escala'],
  },
}

// ── Overrides for Architecture Specs ──────────────────────────────────────────
const ES_ARCH_OVERRIDES: Record<
  string,
  { focus: string; methodology: string; invariants: string[] }
> = {
  'spec-01': {
    focus: 'Reportes Automatizados',
    methodology: 'ETL',
    invariants: ['Ejecución Idempotente', 'Validación de Esquema', 'Despliegues con CI Gate'],
  },
  'spec-02': {
    focus: 'Control Predictivo de Capacidad',
    methodology: 'Modelado Aditivo',
    invariants: ['Restricciones Monótonas', 'Predicciones Acotadas'],
  },
  'spec-03': {
    focus: 'Constructor de Sitios con IA',
    methodology: 'Entrega Progresiva',
    invariants: ['CI Gate con Lighthouse', 'Despliegues de Vista Previa', 'Regresión Nocturna'],
  },
}

// ── Overrides for Bioinformatics Specs ────────────────────────────────────────
const ES_BIO_OVERRIDES: Record<string, { methodology: string; invariants: string[] }> = {
  'spec-01': {
    methodology: 'p-ádico',
    invariants: ['Estabilidad Numérica', 'Prevención de Fuga de Representación'],
  },
  'spec-02': {
    methodology: 'VAE Hiperbólico',
    invariants: ['Determinismo de Incrustación', 'Consistencia de Aminoácidos'],
  },
}

const projects = PROJECT_DATA.map((p) => {
  const override = ES_PROJECT_OVERRIDES[p.id]
  /* istanbul ignore next */
  if (!override) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n:es] Missing Project override for ${p.id}`)
    }
    return p
  }
  return {
    ...p,
    description: override.description,
    /* istanbul ignore next */
    stats: p.stats?.map((stat, i) => ({
      ...stat,
      /* istanbul ignore next */
      label: override.statLabels[i] ?? stat.label,
    })),
  }
})

const esLsOutput = generateLsOutput(projects)

const esArchSpecs = DataEngineeringService.getSystemSpecs().map((s) => {
  const override = ES_ARCH_OVERRIDES[s.id]
  /* istanbul ignore next */
  if (!override) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n:es] Missing Architecture override for ${s.id}`)
    }
  }
  return {
    ...s,
    ...override,
  }
})

const esBioSpecs = BioinformaticsService.getResearchSpecs().map((s) => {
  const override = ES_BIO_OVERRIDES[s.id]
  /* istanbul ignore next */
  if (!override) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n:es] Missing Bioinformatics override for ${s.id}`)
    }
  }
  return {
    ...s,
    ...override,
  }
})

export const es: Translations = {
  lang: 'es',
  title: 'Jonathan Verdun | Ingeniero de Automatización QA',
  tagline: 'Arquitectura de Pruebas · Ingeniería de Automatización',
  description:
    'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en Bioinformática, enfocado en desarrollo guiado por pruebas y biología computacional.',
  workHistoryLabel: 'Experiencia',
  workHistoryDescriptions: {
    'Ai-Whisperers':
      'Responsable de QA en 3 repos de producción — 352+ pruebas automatizadas, 7 flujos CI, seguimiento de defectos con ADO.',
  },
  workHistoryRoles: {
    'Ai-Whisperers': 'Cofundador y Líder de QA',
  },
  workHistoryPeriods: {
    'Ai-Whisperers': 'Sep 2025 – Presente',
  },
  sections: {
    projects: 'Proyectos',
    architecture: 'Arquitectura',
    qa: 'Filosofía QA',
    bioinformatics: 'Investigación y Trabajo Técnico Previo',
    sidebar: {
      qualityGatesTitle: 'Garantía de Calidad',
      constraintsTitle: 'Restricciones de Ingeniería',
      unitCoverageLabel: 'Cobertura Unitaria',
      automationRateLabel: 'Tasa de Automatización',
      securityScanLabel: 'Escaneo de Seguridad',
      livePipelineLabel: 'Pipeline de CI en Vivo',
    },
    qaContact: {
      title: 'Disponible',
      description: 'Disponible para roles de ingeniería QA y arquitectura de automatización.',
      ctaLabel: 'Contáctame',
    },
  },
  qa: {
    constraints: [
      '100% de cobertura unitaria aplicada en CI via GitHub Actions — integración bloqueada por debajo del umbral',
      'Pruebas basadas en propiedades via fast-check aplicadas a los contratos de dominio centrales y condiciones de frontera',
      'Validación estricta de entradas en todas las fronteras del sistema; entradas inválidas rechazadas en ingesta',
      'Pruebas escritas antes del código de funcionalidad — disciplina test-first aplicada en cada capa',
    ],
    specifications: [
      {
        layer: 'unit',
        objective:
          'Garantizar la corrección de la lógica de dominio aislada para evitar regresiones',
        status: 'stable',
      },
      {
        layer: 'property-based',
        objective:
          'Fuzzear contratos de dominio con fast-check para descubrir modos de fallo desconocidos',
        status: 'stable',
      },
      {
        layer: 'component',
        objective:
          'Verificar el comportamiento renderizado e interacciones del usuario con React Testing Library',
        status: 'maturing',
      },
      {
        layer: 'integration',
        objective:
          'Verificar fronteras de servicio, flujo de datos y contratos entre módulos en CI',
        status: 'stable',
      },
      {
        layer: 'E2E',
        objective:
          'Cubrir rutas críticas de usuario de extremo a extremo mediante automatización de navegador y móvil',
        status: 'maturing',
      },
      {
        layer: 'accessibility',
        objective:
          'Garantizar el cumplimiento de WCAG 2.1 AA mediante escaneos axe-core automatizados en CI',
        status: 'stable',
      },
    ],
  },
  architecture: {
    methodologyLabel: 'Metodología',
    invariantsLabel: 'Invariantes',
    specs: esArchSpecs,
  },
  bioinformatics: {
    methodologyLabel: 'Metodología',
    invariantsLabel: 'Invariantes',
    graphicLabel: 'Análisis de Datos: [Pipeline de Descubrimiento de Epítopos]',
    focusLabels: {
      HIV: 'IA para Antígenos VIH',
      'Codon Encoding': 'API de Codificación de Codones',
    },
    focusDescriptions: {
      HIV: 'Detección de candidatos antigénicos usando espacios métricos p-ádicos para estabilidad numérica en análisis de secuencias virales.',
      'Codon Encoding':
        'Incrustación de codones de ADN en espacio hiperbólico mediante Autoencoder Variacional para representación determinista de aminoácidos.',
    },
    specs: esBioSpecs,
  },
  projects,
  terminal: {
    title: 'bash — interactivo',
    prompt: 'gestalt@portafolio:',
    helpCmd: 'ayuda',
    boot: [
      { text: 'whoami', output: 'jonathan.verdun — Ingeniero de Automatización QA', delay: 500 },
      { text: 'ls proyectos', output: esLsOutput, delay: 700 },
      { text: 'ayuda', output: ES_HELP_OUTPUT, delay: 600 },
    ],
    interactive: {
      ayuda: ES_HELP_OUTPUT,
      sobre:
        'Jonathan Verdun. Ingeniero QA y arquitecto de pruebas. Planes de prueba, matrices de trazabilidad, pruebas basadas en propiedades y pipelines de automatización — quality gates aplicados via pre-commit hooks, GitHub Actions CI y umbrales de cobertura. En proceso de certificación ISTQB Foundation.',
      proyectos: 'Ver la sección de Proyectos abajo, o escribe "ls proyectos" para ver la lista.',
      contacto: 'Contáctame por LinkedIn o GitHub enlazados arriba.',
      habilidades:
        'Stack principal: Next.js, TypeScript, Tailwind CSS, Three.js. Testing: pytest, Playwright, Appium, Jest, fast-check.',
      version: 'v0.1.0-audit-hardened (Next.js 16.2.4)',
      quiensoy: 'jonathan.verdun — Ingeniero de Automatización QA',
      'ls proyectos': esLsOutput,
      sudo: 'El usuario no está en el archivo sudoers. Este incidente será reportado.',
    },
  },
}
