import { Translations } from './types'
import { generateLsOutput } from '@/lib/contracts/TerminalContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import { siteConfig } from '@/lib/siteConfig'
import { COVERAGE_STATS } from '@/lib/generated/coverageStats'

const ES_HELP_OUTPUT =
  'Comandos disponibles: ayuda, sobre, proyectos, contacto, habilidades, version, quiensoy, limpiar, ls, cd, cat, pwd'

// ── Overrides for Work History ──────────────────────────────────────────────
const ES_WORK_OVERRIDES: Record<string, { role?: string; period?: string; description?: string }> =
  {
    'Ai-Whisperers': {
      role: 'Cofundador y Líder de QA',
      period: 'Sep 2025 – Abril 2026',
      description:
        'Cofundador y Líder de QA, construyendo cobertura de pruebas automatizadas en capas Web, Mobile y API. Establecí la gestión de defectos del ciclo completo en Azure DevOps y endurecí los pipelines de CI/CD con gates de cobertura.',
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
const ES_PROJECT_OVERRIDES: Record<
  string,
  { description: string; statLabels: string[]; highlights?: string[]; architecture?: string }
> = {
  'proj-01': {
    description:
      '57 pruebas automatizadas con pytest y 11 casos manuales en formato ADO, trazados a ADO Test Plans. Flujo de defectos, validación de API y smoke móvil — todo gateado en GitHub Actions CI.',
    statLabels: ['Automatizados', 'Casos Manuales'],
    highlights: [
      'Casos manuales trazados a user stories y ADO test plans',
      'Menor esfuerzo de regresión manual vía automatización móvil con Appium',
      'Flujo de defectos clasificado por severidad con pasos de reproducción en Azure DevOps',
      'Gate de CI bloquea merges ante fallos de regresión automatizada',
    ],
    architecture:
      'Page Object Model con fixtures de pytest para aislamiento de pruebas. conftest.py personalizado maneja sesiones Appium y abstracción de dispositivo. La API de ADO sincroniza resultados bidireccionalmente; las pruebas corren en paralelo, divididas por user story.',
  },
  'proj-07': {
    description: `Implementación de referencia QA: ${COVERAGE_STATS.unitCoverage} de cobertura lógica, gates automatizados de WCAG 2.1 AA, 570+ pruebas Jest y 67 pruebas E2E con Playwright. Las afirmaciones medibles de la Filosofía QA están respaldadas por un gate en CI.`,
    statLabels: ['Pruebas', 'Cobertura'],
    highlights: [
      'Umbrales de cobertura (97–99% en statements/branches/functions/lines) exigidos como gate de CI',
      'Escaneos WCAG 2.1 AA automatizados en cada ejecución E2E — cero violaciones en las rutas cubiertas',
      'Pruebas basadas en propiedades (fast-check) detectan desviaciones de i18n y casos de borde',
      'Tres jobs de CI terminan en menos de 10 minutos con matriz Node 22/24',
    ],
    architecture:
      'Exportación estática en Next.js 16 App Router. Separación SOLID: contratos poseen datos, servicios poseen lógica, componentes poseen presentación. Tres capas de prueba — Jest, Playwright, Lighthouse CI. WebGL tiene failover de 3s a gradiente CSS.',
  },
  'proj-08': {
    description:
      '19 pruebas de API con Playwright contra una API REST de terceros en vivo (restful-booker), con cada respuesta validada contra un schema de zod en vez de un par de campos verificados al voleo. Documenta 6 rarezas reales de la API — códigos de estado incorrectos, corrupción silenciosa de tipos, sin validación del lado del servidor — como tests explícitos en vez de ocultarlas.',
    statLabels: ['Pruebas', 'Rarezas Documentadas'],
    highlights: [
      'Cada respuesta validada contra un schema de zod — no solo campos verificados al voleo',
      'El test de contrato muestrea datos ya existentes en el servidor, no solo fixtures propias, para detectar drift real',
      'Ciclo de vida CRUD completo (crear/leer/PUT/PATCH/eliminar, con verificación de 404 posterior) verificado de punta a punta',
      'Seis rarezas de la API documentadas — códigos de estado inconsistentes, corrupción silenciosa de datos, validación de reglas de negocio ausente — asertadas directamente, no ocultadas',
    ],
    architecture:
      'Testing de API con el contexto request de Playwright (sin browser) y una capa de contrato con zod. Un patrón "API Object" (BookingClient, AuthClient) espeja los Page Objects del suite de UI complementario. Todo test de escritura que crea datos los limpia después — la limpieza misma se assertea, no es fire-and-forget, porque apunta a una API pública compartida.',
  },
  'proj-04': {
    description:
      'Pipeline de ML con suite de 280 pruebas que cubre la correctitud del VAE e invariantes geométricos (ARI 0.844). VAEs duales en geometría de bola de Poincaré, con jerarquía impuesta por valuación 3-ádica — no memorización.',
    statLabels: ['Pruebas', 'ARI'],
    highlights: [
      'La suite de 280 pruebas verifica matemáticamente la correctitud del VAE, no solo su precisión',
      'Un Adjusted Rand Index de 0.844 confirma clustering biológicamente significativo',
      'La valuación 3-ádica impone estructura jerárquica sin supervisión',
      'La arquitectura dual VAE permite validación cruzada entre secuencia y estructura',
    ],
    architecture:
      'Autoencoders Variacionales duales en geometría de bola de Poincaré. La jerarquía se impone por valuación 3-ádica — secuencias más cercanas en distancia p-ádica mapean a puntos latentes más cercanos. Las pruebas cubren invariantes geométricos (preservación de distancia, desigualdad triangular, comportamiento de frontera) y estabilidad de clustering entre semillas.',
  },
  'proj-03': {
    description:
      'Pipeline multi-implementación: un motor DAG en C++, Apache Spark y Python, verificados cruzadamente por equivalencia funcional contra 10M+ anotaciones génicas.',
    statLabels: ['Implementaciones', 'Escala'],
    highlights: [
      'Tres implementaciones (C++, Spark, Python) verificadas cruzadamente por equivalencia funcional',
      'El motor DAG en C++ supera a Python en procesamiento de anotaciones con dependencias ordenadas',
      'La distribución en Spark permite anotación GO a escala cloud de 10M+ productos génicos',
      'Las salidas de referencia compartidas detectan drift de implementación entre versiones',
    ],
    architecture:
      'Motor de ejecución DAG con tres backends de lenguaje, cada uno procesando el mismo grafo de dependencias contra un dataset de referencia compartido. C++ usa DAG de lista de adyacencia con orden topológico; Spark usa DataFrame lineage; Python usa NetworkX para prototipado rápido.',
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
const ES_BIO_OVERRIDES: Record<string, { methodology: string; invariants: string[] }> = {}

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
    highlights: override?.highlights ?? p.highlights,
    architecture: override?.architecture ?? p.architecture,
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
  manifesto: '',
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
  title: 'Jonathan Verdun | Ingeniero de Automatización QA',
  tagline: 'Ingeniero de Automatización QA · Arquitectura de Pruebas y Confiabilidad',
  description:
    'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA especializado en Arquitectura de Pruebas, Playwright y Confiabilidad.',
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
    qualityDashboard: {
      auditsPublished: 'Auditorías Publicadas',
      architectureSpecs: 'Especificaciones de Arquitectura',
      handbookTitle: 'El Manual de QA — Especificaciones Arquitectónicas',
      auditHistoryTitle: 'Historial Cronológico de Auditorías',
      clearSearchLabel: 'limpiar',
      verifiedModulesTitle: 'Módulos y Componentes Verificados',
      assertionsLabel: 'aserciones',
      readFullAuditLabel: 'Leer Auditoría Completa',
    },
    sidebar: {
      qualityGatesTitle: 'Garantía de Calidad',
      constraintsTitle: 'Restricciones de Ingeniería',
      unitCoverageLabel: 'Cobertura Lógica',
      mutationScoreLabel: 'Score de Mutación',
      automationRateLabel: 'Automatización QA Móvil',
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
      ciPipelineAriaLabel: 'Estado del pipeline de CI (se abre en una pestaña nueva)',
    },
    errorBoundary: {
      title: 'Error de Componente',
      description: 'Ocurrió un error de renderizado.',
      retryLabel: 'Reintentar',
    },
    heroHeader: {
      githubAriaLabel: 'Perfil de GitHub (se abre en una pestaña nueva)',
      linkedinAriaLabel: 'Perfil de LinkedIn (se abre en una pestaña nueva)',
      workHistoryLinkAriaLabel: '{organization} (se abre en una pestaña nueva)',
    },
    specCard: {
      viewGithubAriaLabel: 'Ver {repo} en GitHub (se abre en una pestaña nueva)',
    },
    siteFooter: {
      apiDocsLabel: 'Documentación API',
      sourceLabel: 'Código Fuente',
      sitemapLabel: 'Mapa del Sitio',
      offlineReadyLabel: 'Disponible sin Conexión',
      offlineReadyTooltip: 'PWA Reforzada: Disponible sin Conexión',
      footerAriaLabel: 'Pie de página del sitio',
      emailAriaLabel: 'Correo electrónico',
      copyrightSuffix: 'en GitHub.',
    },
    qaContact: {
      title: 'Disponible',
      description: 'Disponible para roles de ingeniería QA y arquitectura de automatización.',
      ctaLabel: 'Contáctame',
    },
    resume: {
      title: 'Currículum',
      experienceTitle: 'Experiencia',
      skillsTitle: 'Habilidades y Tecnologías',
      expertiseTitle: 'Áreas de Especialización',
      certificationsTitle: 'Certificaciones',
      downloadLabel: 'Descargar PDF',
      backToHome: 'Volver al inicio',
    },
    blog: {
      title: 'Blog',
      readMore: 'Leer artículo',
      backToBlog: 'Volver al Blog',
      backToHome: 'Volver al inicio',
      publishedOn: 'Publicado el',
      tags: 'Etiquetas',
      noPosts: 'Aún no hay artículos.',
    },
    projectCard: {
      caseStudyLabel: 'Caso de Estudio',
      viewSpecAriaLabel: 'Ver especificación de {title}',
      viewGithubAriaLabel: 'Ver {title} en GitHub (se abre en una pestaña nueva)',
    },
    projectDetail: {
      backToProjects: 'Volver a Proyectos',
      overview: 'Resumen del Proyecto',
      techStack: 'Tecnologías',
      keyResults: 'Resultados Clave',
      architecture: 'Arquitectura',
      relatedLinks: 'Enlaces Relacionados',
      metrics: 'Métricas',
      viewOnGithub: 'Ver en GitHub',
      viewQaSpecs: 'Ver Especificaciones QA',
    },
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
    bridge: '',
    methodologyLabel: 'Metodología',
    invariantsLabel: 'Invariantes',
    graphicLabel: 'Análisis de Datos: [Pipeline de Descubrimiento de Epítopos]',
    focusLabels: {},
    focusDescriptions: {},
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
        'Soy Jonathan, ingeniero de QA construyendo gates de calidad deterministas — desde pruebas basadas en propiedades hasta pipelines de automatización. Endurecí sistemas en Ai-Whisperers; sigo cursando la certificación ISTQB.',
      proyectos: 'Ver la sección de Proyectos abajo, o escribe "ls proyectos" para ver la lista.',
      contacto: 'Contáctame por LinkedIn o GitHub enlazados arriba.',
      emailClientOpening: 'Abriendo cliente de correo...',
      habilidades:
        'Stack principal: Next.js, TypeScript, Tailwind CSS, Three.js. Pruebas: pytest, Playwright, Appium, Jest, fast-check.',
      version: `v${siteConfig.versions.portfolio}-audit-hardened (Next.js ${siteConfig.versions.nextjs})`,
      quiensoy: 'jonathan.verdun — Ingeniero de Automatización QA',
      'ls proyectos': esLsOutput,
      sudo: 'El usuario no está en el archivo sudoers. Este incidente será reportado.',
    },
  },
}
