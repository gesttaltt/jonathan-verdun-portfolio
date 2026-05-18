import { Translations } from './types'
import { generateLsOutput } from '@/lib/contracts/TerminalContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import { siteConfig } from '@/lib/siteConfig'

const ES_HELP_OUTPUT =
  'Comandos disponibles: ayuda, sobre, proyectos, contacto, habilidades, version, quiensoy, limpiar, ls, cd, cat, pwd'

// ── Overrides for Work History ──────────────────────────────────────────────
const ES_WORK_OVERRIDES: Record<string, { role?: string; period?: string; description?: string }> =
  {
    'Ai-Whisperers': {
      role: 'Cofundador y Líder de QA',
      period: 'Sep 2025 – Abril 2026',
      description:
        'Lideré la estrategia de QA como Cofundador y Líder de QA, implementando más de 350 pruebas automatizadas en capas Web, Mobile y API. Establecí la gestión de defectos del ciclo completo en Azure DevOps y endurecí los pipelines de CI/CD con gates de cobertura al 100%.',
    },
  }

const esWorkHistoryDescriptions: Record<string, string> = {}
const esWorkHistoryRoles: Record<string, string> = {}
const esWorkHistoryPeriods: Record<string, string> = {}

// Guard against undefined siteConfig during early module loading in tests
siteConfig.workHistory?.forEach((job) => {
  const override = ES_WORK_OVERRIDES[job.organization]
  esWorkHistoryDescriptions[job.organization] = override?.description ?? ''
  esWorkHistoryRoles[job.organization] = override?.role ?? job.role
  esWorkHistoryPeriods[job.organization] = override?.period ?? job.period
})

// ── Overrides for QA Philosophy ─────────────────────────────────────────────
const ES_QA_CONSTRAINTS = [
  'Planificación de pruebas basada en riesgos priorizada por impacto de negocio y complejidad técnica',
  'Pruebas basadas en propiedades aplicadas a los invariantes centrales del dominio vía fast-check',
  'Validación estricta de entradas aplicada en todos los límites del sistema',
  'Compromiso Shift-left: involucramiento de QA desde el levantamiento de requerimientos hasta el despliegue final',
]

const ES_QA_OBJECTIVES: Record<string, string> = {
  strategy: 'Definir planes de prueba integrales, matrices de riesgo y objetivos de calidad',
  'api/contract': 'Validar la integridad de interfaces y consistencia de datos entre servicios',
  automation: 'Suites escalables para navegador y móvil vía Playwright, Appium y pytest',
  exploratory: 'Pruebas no estructuradas para descubrir casos de borde y fricción de usabilidad',
  regression: 'Verificación automatizada de funcionalidad existente después de cada build',
  accessibility:
    'Garantizar el cumplimiento de WCAG 2.1 AA mediante auditorías automáticas y manuales',
}

const ES_QA_LAYERS: Record<string, string> = {
  strategy: 'estrategia',
  'api/contract': 'api/contratos',
  automation: 'automatización',
  exploratory: 'exploratorio',
  regression: 'regresión',
  accessibility: 'accesibilidad',
}

// ── Overrides for Project Data ────────────────────────────────────────────────
const ES_PROJECT_OVERRIDES: Record<string, { description: string; statLabels: string[] }> = {
  'proj-01': {
    description:
      '26 pruebas automatizadas con pytest + Appium y 10 casos de prueba manuales en 4 Historias de Usuario (Búsqueda, Favoritos, PDF, Red), vinculados a ADO Test Plans para trazabilidad completa. Reportes de defectos registrados como work items en Azure DevOps con clasificación de severidad y pasos de reproducción. Validación de API, flujos de smoke móvil y verificación de integridad de datos — todo gestionado vía GitHub Actions CI. Valida las restricciones de test-first y quality-gate descritas en la sección de Filosofía QA.',
    statLabels: ['Automatizados', 'Casos Manuales'],
  },
  'proj-05': {
    description:
      'Suite de 96 pruebas que cubre todos los endpoints REST vía FastAPI TestClient and async httpx — rutas de codificación, clustering y visualización. El CI gate requiere lint, type-check, análisis de seguridad (bandit + pip-audit), smoke test de Docker y cobertura antes de hacer merge. Implementa técnicas de prueba funcional de caja negra para asegurar el cumplimiento del contrato de la API.',
    statLabels: ['Pruebas', 'Endpoints'],
  },
  'proj-06': {
    description:
      'Más de 230 pruebas en capas de unit (Jest), integración y E2E con Playwright para un servicio headless de extracción de transcripciones. Campaña A/B en modo stealth — 100 ejecuciones automatizadas, tasa de éxito del 89.4% en casos de borde; aprovechamiento del Análisis de Causa Raíz (RCA) para categorizar patrones de fallo e impulsar mejoras de estabilidad. Enfocado en estabilidad no funcional y pruebas de regresión.',
    statLabels: ['Pruebas', 'Capas'],
  },
  'proj-07': {
    description:
      'Implementación de referencia QA con 100% de cobertura lógica y gates automatizados de cumplimiento WCAG 2.1 AA. Incluye 239 pruebas Jest y 14 pruebas E2E con Playwright. Cada afirmación en la sección de Filosofía QA está respaldada por un gate en CI, demostrando un diseño de pruebas estructural y automatizado.',
    statLabels: ['Pruebas', 'Cobertura'],
  },
  'proj-02': {
    description:
      'Pipeline de ingeniería de datos para análisis genómico — rendimiento ~120× vía vectorización NumPy. Integra restricciones evolutivas LOEUF y anotaciones Gene Ontology. Salidas del pipeline validadas contra conjuntos de referencia conocidos mediante pruebas de regresión parametrizadas.',
    statLabels: ['vs Python Nativo', 'Funcionomas'],
  },
  'proj-04': {
    description:
      'Ingeniería de pipeline ML con suite de 280 pruebas que cubre la correctitud del VAE e invariantes geométricos. VAEs duales en geometría de bola de Poincaré — jerarquía impuesta por valuación 3-ádica. Se enfoca en la verificación de invariantes matemáticos en arquitecturas neuronales.',
    statLabels: ['Pruebas', 'ARI'],
  },
  'proj-03': {
    description:
      'Ingeniería de pipeline multi-implementación: motor DAG en C++ (5–25× sobre Python), Apache Spark y Python. Implementaciones verificadas cruzadamente para equivalencia funcional mediante salidas de referencia compartidas.',
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
  if (!override && process.env.NODE_ENV === 'development') {
    console.warn(`[i18n:es] Missing Project override for ${p.id}`)
  }
  const stats = p.stats
    ? p.stats.map((stat, i) => {
        return {
          ...stat,
          label: override?.statLabels[i] ?? stat.label,
        }
      })
    : /* istanbul ignore next */ undefined
  return {
    ...p,
    description: override?.description ?? p.description,
    stats,
  }
})

const esLsOutput = generateLsOutput(projects)

const esArchSpecs = DataEngineeringService.getSystemSpecs().map((s) => {
  const override = ES_ARCH_OVERRIDES[s.id]
  /* istanbul ignore next */
  if (!override && process.env.NODE_ENV === 'development') {
    console.warn(`[i18n:es] Missing Architecture override for ${s.id}`)
  }
  return {
    ...s,
    ...(override ?? {}),
  }
})

const esBioSpecs = BioinformaticsService.getResearchSpecs().map((s) => {
  const override = ES_BIO_OVERRIDES[s.id]
  /* istanbul ignore next */
  if (!override && process.env.NODE_ENV === 'development') {
    console.warn(`[i18n:es] Missing Bioinformatics override for ${s.id}`)
  }
  return {
    ...s,
    ...(override ?? {}),
  }
})

const esQaPhilosophy = {
  manifesto:
    'Veo la calidad como un invariante estructural. Mi misión es construir software que sea correcto por construcción mediante el compromiso shift-left y gates de verificación automatizados.',
  constraints: ES_QA_CONSTRAINTS,
  specifications: QA_PHILOSOPHY.specifications.map((spec) => ({
    ...spec,
    layer: ES_QA_LAYERS[spec.layer] ?? spec.layer,
    objective: ES_QA_OBJECTIVES[spec.layer] ?? spec.objective,
  })),
}

export const es: Translations = {
  lang: 'es',
  skipToContent: 'Saltar al contenido',
  title: 'Jonathan Verdun | Arquitecto de Gates de Calidad Resilientes',
  tagline: 'Arquitecto de Gates de Calidad Resilientes · Ingeniería de Automatización Determinista',
  description:
    'Arquitecto de gates de calidad resilientes e ingeniería de automatización determinista. Portafolio de Jonathan Verdun — Ingeniero de Automatización QA especializado en Arquitectura de Pruebas, Playwright y Confiabilidad.',
  workHistoryLabel: 'Experiencia',
  workHistoryDescriptions: esWorkHistoryDescriptions,
  workHistoryRoles: esWorkHistoryRoles,
  workHistoryPeriods: esWorkHistoryPeriods,
  sections: {
    projects: 'Proyectos',
    architecture: 'Arquitectura',
    qa: 'Filosofía QA',
    bioinformatics: 'Investigación y Trabajo Técnico Previo',
    quality: 'Transparencia de Calidad',
    testPlan: 'Plan Maestro de Pruebas',
    traceabilityMatrix: 'Matriz de Trazabilidad',
    searchPlaceholder: 'Buscar auditorías...',
    noResults: 'No se encontraron auditorías que coincidan con su búsqueda.',
    sidebar: {
      qualityGatesTitle: 'Garantía de Calidad',
      constraintsTitle: 'Restricciones de Ingeniería',
      unitCoverageLabel: 'Cobertura Lógica',
      automationRateLabel: 'Tasa de Automatización',
      securityScanLabel: 'Auditoría de Seguridad',
      livePipelineLabel: 'Pipeline de CI en Vivo',
      certificationTitle: 'Desarrollo Profesional',
      certificationStatusLabel: 'Estado',
      certificationExpectedLabel: 'Previsto',
      copyEmailLabel: 'Copiar Email',
      copiedLabel: '¡Copiado!',
      ciStatusSuccess: 'PASANDO',
      ciStatusFailure: 'FALLANDO',
      ciStatusLoading: 'Verificando CI...',
      ciStatusError: 'Estado no disponible',
    },
    qaContact: {
      title: 'Disponible',
      description: 'Disponible para roles de ingeniería QA y arquitectura de automatización.',
      ctaLabel: 'Contáctame',
    },
    testimonials: { title: 'Testimonios' },
    contactForm: {
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@ejemplo.com',
      subjectLabel: 'Asunto',
      subjectPlaceholder: '¿Sobre qué trata?',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntame sobre el rol u oportunidad...',
      submitLabel: 'Enviar Mensaje',
      submittingLabel: 'Enviando...',
      successTitle: '¡Mensaje enviado!',
      successMessage: 'Gracias por contactarme. Responderé dentro de 48 horas.',
      errorTitle: 'Algo salió mal',
      errorMessage: 'No pude enviar tu mensaje. Intenta de nuevo o escríbeme directamente.',
      validationRequired: 'Este campo es obligatorio',
      validationEmail: 'Ingresa un correo electrónico válido',
      formDisabled: 'El formulario no está configurado. Escríbeme directamente.',
    },
  },
  visualTestSummary: {
    title: 'Evidencia de Verificación en Vivo',
    statusLabel: 'Estado',
    activeProtocol: 'Protocolo CI: Activo',
    executionStatus: 'Estado de Ejecución',
    passed: 'PASADO',
    failed: 'FALLIDO',
    testPayload: 'Carga de Pruebas',
    assertions: 'VERIFICACIONES',
    verificationRate: 'Tasa de Verificación',
    lastVerified: 'Última Verificación',
    regressionDetected:
      'REGRESIÓN DETECTADA: {count} prueba(s) fallida(s). Integridad del sistema comprometida.',
  },
  qa: esQaPhilosophy,
  architecture: {
    methodologyLabel: 'Metodología',
    invariantsLabel: 'Invariantes',
    specs: esArchSpecs,
  },
  bioinformatics: {
    bridge:
      'Aplicando el mismo rigor matemático utilizado en el análisis de secuencias genómicas a la verificación de software y pruebas de invariantes.',
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
        'Soy Jonathan, un ingeniero de QA enfocado en construir gates de calidad deterministas. Desde pruebas basadas en propiedades hasta pipelines de automatización complejos, trato la calidad como un requisito estructural, no como algo secundario. He endurecido sistemas en Ai-Whisperers y sigo cursando la certificación ISTQB.',
      proyectos: 'Ver la sección de Proyectos abajo, o escribe "ls proyectos" para ver la lista.',
      contacto: 'Contáctame por LinkedIn o GitHub enlazados arriba.',
      habilidades:
        'Stack principal: Next.js, TypeScript, Tailwind CSS, Three.js. Pruebas: pytest, Playwright, Appium, Jest, fast-check.',
      version: `v${siteConfig.versions.portfolio}-audit-hardened (Next.js ${siteConfig.versions.nextjs})`,
      quiensoy: 'jonathan.verdun — Ingeniero de Automatización QA',
      'ls proyectos': esLsOutput,
      sudo: 'El usuario no está en el archivo sudoers. Este incidente será reportado.',
    },
  },
}
