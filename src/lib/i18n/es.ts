import { Translations } from './types'
import { LS_PROJECTS_OUTPUT } from '@/lib/contracts/TerminalContract'

const ES_HELP_OUTPUT = 'Comandos disponibles: ayuda, sobre, proyectos, contacto, limpiar'

export const es: Translations = {
  lang: 'es',
  tagline: 'Ingeniero de Automatización QA',
  workHistoryLabel: 'Experiencia',
  sections: {
    projects: 'Proyectos',
    architecture: 'Arquitectura',
    qa: 'Filosofía QA',
    bioinformatics: 'Antecedentes Técnicos',
    sidebar: { constraintsTitle: 'Restricciones de Ingeniería' },
    qaContact: {
      title: 'Disponible',
      description: 'Abierto a oportunidades en QA.',
      ctaLabel: 'Contáctame',
    },
  },
  qa: {
    constraints: [
      'Los conjuntos de pruebas aprueban cada integración — umbrales de cobertura aplicados en CI',
      'Fuzzing basado en propiedades aplicado a invariantes del dominio central con fast-check',
      'Validación estricta de entradas en todos los límites del sistema',
    ],
    specifications: [
      {
        layer: 'unitaria',
        objective:
          'Verificar la corrección aislada de la lógica de dominio para evitar regresiones',
        status: 'bloqueado',
      },
      {
        layer: 'basada en propiedades',
        objective:
          'Fuzzear contratos de dominio con fast-check para descubrir modos de fallo desconocidos',
        status: 'evolucionando',
      },
      {
        layer: 'componente',
        objective:
          'Verificar el comportamiento renderizado e interacciones del usuario con React Testing Library',
        status: 'evolucionando',
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
        invariants: ['Ejecución Idempotente', 'Validación de Esquema'],
        link: 'https://github.com/Ai-Whisperers/work-hours-automated-reports',
      },
      {
        id: 'spec-02',
        focus: 'Control Predictivo de Capacidad',
        methodology: 'Modelado Aditivo',
        invariants: ['Restricciones Monótonas', 'Predicciones Acotadas'],
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
        'Casos de prueba manuales con trazabilidad de historias de usuario, cobertura multiplataforma (iOS/Android) y suite de automatización Python/pytest para la app de código abierto arxiv-papers-mobile.',
      techStack: ['Python', 'pytest', 'Azure DevOps'],
      link: 'https://github.com/gesttaltt/qa-arxiv-mobile',
      status: 'QA',
      stats: [
        { label: 'Conjuntos de Pruebas', value: '3' },
        { label: 'Plataforma', value: 'iOS · Android' },
      ],
    },
    {
      id: 'proj-02',
      title: 'Functionome Atlas',
      description:
        'Ingeniería de pipeline de datos para análisis de variantes genómicas — rendimiento VCF 120× vía vectorización NumPy. Integra restricciones evolutivas LOEUF y anotaciones Gene Ontology contra gnomAD a escala.',
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
        'Ingeniería de pipeline multi-implementación: motor DAG en C++ (5–25× sobre Python base), Apache Spark para ejecución a escala en la nube y Python para flujos de desarrollo. Procesa 10M+ anotaciones génicas.',
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
        'Jonathan Verdun. Ingeniero de Automatización QA. Especializado en TDD, automatización de pruebas y calidad de ingeniería.',
      proyectos: 'Ver la sección de Proyectos abajo, o escribe "ls proyectos" para ver la lista.',
      contacto: 'Contáctame por LinkedIn o GitHub enlazados arriba.',
      'ls proyectos': LS_PROJECTS_OUTPUT,
      investigacion:
        'Consulta la sección de Antecedentes Técnicos abajo para ver el trabajo de investigación.',
      sudo: 'El usuario no está en el archivo sudoers. Este incidente será reportado.',
    },
  },
}
