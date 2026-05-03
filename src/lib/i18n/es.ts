import { Translations } from './types'
import { LS_PROJECTS_OUTPUT } from '@/lib/contracts/TerminalContract'

const ES_HELP_OUTPUT = 'Comandos disponibles: ayuda, sobre, proyectos, contacto, limpiar'

export const es: Translations = {
  lang: 'es',
  tagline: 'Arquitectura de Pruebas · Ingeniería de Automatización',
  workHistoryLabel: 'Experiencia',
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
    specs: [
      {
        id: 'spec-01',
        focus: 'Reportes Automatizados',
        methodology: 'ETL',
        invariants: ['Ejecución Idempotente', 'Validación de Esquema', 'Despliegues con CI Gate'],
        link: 'https://github.com/Ai-Whisperers/work-hours-automated-reports',
      },
      {
        id: 'spec-02',
        focus: 'Control Predictivo de Capacidad',
        methodology: 'Modelado Aditivo',
        invariants: ['Restricciones Monótonas', 'Predicciones Acotadas'],
      },
      {
        id: 'spec-03',
        focus: 'Constructor de Sitios con IA',
        methodology: 'Entrega Progresiva',
        invariants: ['CI Gate con Lighthouse', 'Despliegues de Vista Previa', 'Regresión Nocturna'],
        link: 'https://github.com/Ai-Whisperers/paragu-ai-builder',
      },
    ],
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
    specs: [
      {
        id: 'spec-01',
        focus: 'HIV',
        methodology: 'p-ádico',
        invariants: ['Estabilidad Numérica', 'Prevención de Fuga de Representación'],
        link: 'https://github.com/Ai-Whisperers/hiv-antigen-ai',
      },
      {
        id: 'spec-02',
        focus: 'Codon Encoding',
        methodology: 'VAE Hiperbólico',
        invariants: ['Determinismo de Incrustación', 'Consistencia de Aminoácidos'],
        link: 'https://github.com/Ai-Whisperers/codon-encoder-api',
      },
    ],
  },
  projects: [
    {
      id: 'proj-01',
      title: 'QA Arxiv Mobile',
      description:
        '26 tests automatizados con pytest + Appium y 10 casos de prueba manuales en 4 historias de usuario (búsqueda, favoritos, PDF, red), vinculados a ADO Test Plans para trazabilidad completa. Reportes de defectos registrados como work items en Azure DevOps con clasificación de severidad y pasos de reproducción. Validación de API, flujos de smoke móvil y verificación de integridad de datos — todo gestionado vía GitHub Actions CI. Valida las restricciones de test-first y quality-gate descritas en la sección de Filosofía QA.',
      techStack: ['Python', 'pytest', 'Appium', 'Azure DevOps', 'Docker', 'Postman'],
      link: 'https://github.com/gesttaltt/qa-arxiv-mobile',
      status: 'QA',
      stats: [
        { label: 'Automatizados', value: '26' },
        { label: 'Casos Manuales', value: '10' },
      ],
    },
    {
      id: 'proj-05',
      title: 'Codon Encoder API',
      description:
        'Suite de 96 pruebas que cubre todos los endpoints REST vía FastAPI TestClient y async httpx — rutas de codificación, codificación por lotes, clustering, visualización y variantes sinónimas. El CI gate requiere lint, type-check, análisis de seguridad (bandit + pip-audit), smoke test de Docker y cobertura antes de hacer merge.',
      techStack: ['Python', 'pytest', 'FastAPI', 'Docker', 'PyTorch'],
      link: 'https://github.com/Ai-Whisperers/codon-encoder-api',
      status: 'QA',
      stats: [
        { label: 'Pruebas', value: '96' },
        { label: 'Endpoints', value: '13' },
      ],
    },
    {
      id: 'proj-06',
      title: 'YT Transcriptor',
      description:
        'Más de 230 pruebas en capas de unit (Jest), integración y E2E con Playwright para un servicio headless de extracción de transcripciones de YouTube. Campaña A/B en modo stealth — 100 ejecuciones automatizadas, tasa de éxito del 89.4%, análisis de patrones de fallo por video y documentación de causa raíz como artefactos de reporte.',
      techStack: ['TypeScript', 'Playwright', 'Jest', 'Node.js', 'SQLite', 'RAG'],
      link: 'https://github.com/gesttaltt/yt-transcriptor',
      status: 'QA',
      stats: [
        { label: 'Pruebas', value: '230+' },
        { label: 'Capas', value: '3' },
      ],
    },
    {
      id: 'proj-02',
      title: 'Functionome Atlas',
      description:
        'Ingeniería de pipeline de datos para análisis de variantes genómicas — rendimiento VCF 120× vía vectorización NumPy. Integra restricciones evolutivas LOEUF y anotaciones Gene Ontology contra gnomAD a escala. Salidas del pipeline validadas contra conjuntos de referencia gnomAD conocidos mediante pruebas de regresión parametrizadas.',
      techStack: ['Python', 'NumPy', 'Pandas', 'gnomAD'],
      link: 'https://github.com/gesttaltt/Functionome-Atlas',
      status: 'Research',
      stats: [
        { label: 'Velocidad VCF', value: '120×' },
        { label: 'Funccionomas', value: '1,622' },
      ],
    },
    {
      id: 'proj-04',
      title: '3-Adic ML',
      description:
        'Ingeniería de pipeline ML con suite de 280 pruebas que cubre correctitud del VAE, invariantes geométricos y estabilidad de clustering (ARI 0.844). VAEs duales en geometría de bola de Poincaré — jerarquía enforced por valuación 3-ádica, no memorización.',
      techStack: ['Python', 'PyTorch'],
      link: 'https://github.com/gesttaltt/3-adic-ml',
      status: 'Research',
      stats: [
        { label: 'Pruebas', value: '280' },
        { label: 'ARI', value: '0.844' },
      ],
    },
    {
      id: 'proj-03',
      title: 'Gene Functional Pipeline',
      description:
        'Ingeniería de pipeline multi-implementación: motor DAG en C++ (5–25× sobre Python base), Apache Spark para ejecución a escala en la nube y Python para flujos de desarrollo. Procesa 10M+ anotaciones génicas. Implementaciones en C++, Spark y Python verificadas cruzadamente para equivalencia funcional mediante salidas de referencia compartidas.',
      techStack: ['Python', 'C++', 'Apache Spark', 'Gene Ontology'],
      link: 'https://github.com/gesttaltt/gene-ontology-functionomes',
      status: 'Research',
      stats: [
        { label: 'C++ vs Python', value: '5-25×' },
        { label: 'Escala', value: '10M+ genes' },
      ],
    },
  ],
  terminal: {
    title: 'bash — interactivo',
    helpCmd: 'ayuda',
    boot: [
      {
        text: 'whoami',
        output: 'jonathan.verdun — Ingeniero de Automatización QA',
        delay: 500,
      },
      {
        text: 'ls proyectos',
        output: LS_PROJECTS_OUTPUT,
        delay: 700,
      },
      {
        text: 'ayuda',
        output: ES_HELP_OUTPUT,
        delay: 600,
      },
    ],
    interactive: {
      ayuda: ES_HELP_OUTPUT,
      sobre:
        'Jonathan Verdun. Ingeniero QA y arquitecto de pruebas. Planes de prueba, matrices de trazabilidad, testing basado en propiedades y pipelines de automatización — quality gates aplicados via pre-commit hooks, GitHub Actions CI y umbrales de cobertura.',
      proyectos: 'Ver la sección de Proyectos abajo, o escribe "ls proyectos" para ver la lista.',
      contacto: 'Contáctame por LinkedIn o GitHub enlazados arriba.',
      'ls proyectos': LS_PROJECTS_OUTPUT,
      investigacion:
        'Consulta la sección de Antecedentes Técnicos abajo para ver el trabajo de investigación.',
      sudo: 'El usuario no está en el archivo sudoers. Este incidente será reportado.',
    },
  },
}
