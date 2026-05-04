import { Translations } from './types'
import { LS_PROJECTS_OUTPUT } from '@/lib/contracts/TerminalContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import type { ProjectSpec } from '@/lib/contracts/ProjectContract.types'

const ES_HELP_OUTPUT = 'Comandos disponibles: ayuda, sobre, proyectos, contacto, limpiar'

// ── Project translations ──────────────────────────────────────────────────────
// id, link, techStack, status, stats.value come from contracts.
// Only description and stats.label are locale-specific.
type EsProjectTranslation = { description: string; stats?: ProjectSpec['stats'] }

const ES_PROJECT_TRANSLATIONS: Record<string, EsProjectTranslation> = {
  'proj-01': {
    description:
      '26 tests automatizados con pytest + Appium y 10 casos de prueba manuales en 4 historias de usuario (búsqueda, favoritos, PDF, red), vinculados a ADO Test Plans para trazabilidad completa. Reportes de defectos registrados como work items en Azure DevOps con clasificación de severidad y pasos de reproducción. Validación de API, flujos de smoke móvil y verificación de integridad de datos — todo gestionado vía GitHub Actions CI. Valida las restricciones de test-first y quality-gate descritas en la sección de Filosofía QA.',
    stats: [
      { label: 'Automatizados', value: '26' },
      { label: 'Casos Manuales', value: '10' },
    ],
  },
  'proj-05': {
    description:
      'Suite de 96 pruebas que cubre todos los endpoints REST vía FastAPI TestClient y async httpx — rutas de codificación, codificación por lotes, clustering, visualización y variantes sinónimas. El CI gate requiere lint, type-check, análisis de seguridad (bandit + pip-audit), smoke test de Docker y cobertura antes de hacer merge.',
    stats: [
      { label: 'Pruebas', value: '96' },
      { label: 'Endpoints', value: '13' },
    ],
  },
  'proj-06': {
    description:
      'Más de 230 pruebas en capas de unit (Jest), integración y E2E con Playwright para un servicio headless de extracción de transcripciones de YouTube. Campaña A/B en modo stealth — 100 ejecuciones automatizadas, tasa de éxito del 89.4%, análisis de patrones de fallo por video y documentación de causa raíz como artefactos de reporte.',
    stats: [
      { label: 'Pruebas', value: '230+' },
      { label: 'Capas', value: '3' },
    ],
  },
  'proj-02': {
    description:
      'Ingeniería de pipeline de datos para análisis de variantes genómicas — rendimiento VCF 120× vía vectorización NumPy. Integra restricciones evolutivas LOEUF y anotaciones Gene Ontology contra gnomAD a escala. Salidas del pipeline validadas contra conjuntos de referencia gnomAD conocidos mediante pruebas de regresión parametrizadas.',
    stats: [
      { label: 'Velocidad VCF', value: '120×' },
      { label: 'Funccionomas', value: '1,622' },
    ],
  },
  'proj-04': {
    description:
      'Ingeniería de pipeline ML con suite de 280 pruebas que cubre correctitud del VAE, invariantes geométricos y estabilidad de clustering (ARI 0.844). VAEs duales en geometría de bola de Poincaré — jerarquía enforced por valuación 3-ádica, no memorización.',
    stats: [
      { label: 'Pruebas', value: '280' },
      { label: 'ARI', value: '0.844' },
    ],
  },
  'proj-03': {
    description:
      'Ingeniería de pipeline multi-implementación: motor DAG en C++ (5–25× sobre Python base), Apache Spark para ejecución a escala en la nube y Python para flujos de desarrollo. Procesa 10M+ anotaciones génicas. Implementaciones en C++, Spark y Python verificadas cruzadamente para equivalencia funcional mediante salidas de referencia compartidas.',
    stats: [
      { label: 'C++ vs Python', value: '5-25×' },
      { label: 'Escala', value: '10M+ genes' },
    ],
  },
}

// ── Architecture spec translations ────────────────────────────────────────────
// id and link come from contracts; focus, methodology, invariants are translated.
const ES_ARCH_TRANSLATIONS: Record<
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

// ── Bioinformatics spec translations ──────────────────────────────────────────
// id, link, and focus come from contracts; methodology and invariants are translated.
const ES_BIO_TRANSLATIONS: Record<string, { methodology: string; invariants: string[] }> = {
  'spec-01': {
    methodology: 'p-ádico',
    invariants: ['Estabilidad Numérica', 'Prevención de Fuga de Representación'],
  },
  'spec-02': {
    methodology: 'VAE Hiperbólico',
    invariants: ['Determinismo de Incrustación', 'Consistencia de Aminoácidos'],
  },
}

export const es: Translations = {
  lang: 'es',
  tagline: 'Arquitectura de Pruebas · Ingeniería de Automatización',
  workHistoryLabel: 'Experiencia',
  workHistoryDescriptions: [
    'Responsable de QA en 3 repos de producción — 153+ pruebas automatizadas, 7 flujos CI, seguimiento de defectos con ADO.',
  ],
  sections: {
    projects: 'Proyectos',
    architecture: 'Arquitectura',
    qa: 'Filosofía QA',
    bioinformatics: 'Investigación y Trabajo Técnico Previo',
    sidebar: { constraintsTitle: 'Restricciones de Ingeniería' },
    qaContact: {
      title: 'Disponible',
      description: 'Disponible para roles de ingeniería QA y arquitectura de automatización.',
      ctaLabel: 'Contáctame',
    },
  },
  qa: {
    constraints: [
      '≥80% de cobertura unitaria aplicada en CI via GitHub Actions — integración bloqueada por debajo del umbral',
      'Fuzzing basado en propiedades via fast-check aplicado a todos los contratos de dominio y condiciones de frontera',
      'Todas las entradas en fronteras del sistema validadas contra esquemas estrictos; entradas inválidas rechazadas en ingesta',
      'Pruebas escritas antes del código de funcionalidad — disciplina test-first aplicada en cada capa',
    ],
    specifications: [
      {
        layer: 'unit',
        objective:
          'Verificar la corrección aislada de la lógica de dominio para evitar regresiones',
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
        status: 'maturing',
      },
      {
        layer: 'E2E',
        objective:
          'Cubrir rutas críticas de usuario de extremo a extremo mediante automatización de navegador y móvil',
        status: 'maturing',
      },
    ],
  },
  architecture: {
    methodologyLabel: 'Metodología',
    invariantsLabel: 'Invariantes',
    specs: DataEngineeringService.getSystemSpecs().map((s) => ({
      ...s,
      ...ES_ARCH_TRANSLATIONS[s.id],
    })),
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
    specs: BioinformaticsService.getResearchSpecs().map((s) => ({
      ...s,
      ...ES_BIO_TRANSLATIONS[s.id],
    })),
  },
  projects: PROJECT_DATA.map((p) => ({
    ...p,
    ...ES_PROJECT_TRANSLATIONS[p.id],
  })),
  terminal: {
    title: 'bash — interactivo',
    helpCmd: 'ayuda',
    boot: [
      { text: 'whoami', output: 'jonathan.verdun — Ingeniero de Automatización QA', delay: 500 },
      { text: 'ls proyectos', output: LS_PROJECTS_OUTPUT, delay: 700 },
      { text: 'ayuda', output: ES_HELP_OUTPUT, delay: 600 },
    ],
    interactive: {
      ayuda: ES_HELP_OUTPUT,
      sobre:
        'Jonathan Verdun. Ingeniero QA y arquitecto de pruebas. Planes de prueba, matrices de trazabilidad, testing basado en propiedades y pipelines de automatización — quality gates aplicados via pre-commit hooks, GitHub Actions CI y umbrales de cobertura.',
      proyectos: 'Ver la sección de Proyectos abajo, o escribe "ls proyectos" para ver la lista.',
      contacto: 'Contáctame por LinkedIn o GitHub enlazados arriba.',
      'ls proyectos': LS_PROJECTS_OUTPUT,
      sudo: 'El usuario no está en el archivo sudoers. Este incidente será reportado.',
    },
  },
}
