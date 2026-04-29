import { Translations } from './types'

const LS_PROYECTOS_OUTPUT =
  'drwx------ 1 gestalt staff  QA-Arxiv-Mobile\n-rw-r--r-- 1 gestalt staff  Functionome-Atlas\n-rwxr-xr-x 1 gestalt staff  Gene-Functional-Pipeline'

export const es: Translations = {
  lang: 'es',
  tagline: 'Ingeniero QA · Investigador en Bioinformática',
  workHistoryLabel: 'Experiencia',
  sections: {
    projects: 'Proyectos',
    architecture: 'Arquitectura',
    qa: 'Filosofía QA',
    bioinformatics: 'Investigación en Bioinformática',
    sidebar: { constraintsTitle: 'Restricciones de Ingeniería' },
    qaContact: {
      title: 'Disponible',
      description: 'Abierto a oportunidades en QA e Investigación.',
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
        'Pipeline que calcula Puntuaciones de Perturbación del Funccionoma para mapear la fragilidad funcional del genoma humano. Integra densidad de variantes VCF, restricción evolutiva (LOEUF) y anotaciones de Gene Ontology.',
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
        'Pipelines de aprendizaje profundo para autoencoders variacionales p-ádicos. VAEs duales cuyos espacios latentes viven en una bola de Poincaré — posición radial determinada por la valuación 3-ádica, dirección por la estructura de prefijos de dígitos. La jerarquía emerge de la geometría, no de la memorización.',
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
        'Pipeline de anotación GO para el análisis funcional del genoma humano. Tres implementaciones: motor DAG en C++ para rendimiento local, Apache Spark para escala en la nube y Python para flujos de desarrollo.',
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
    boot: [
      {
        text: 'whoami',
        output: 'jonathan.verdun — Automatización QA · Investigación en Bioinformática',
        delay: 500,
      },
      {
        text: 'ls proyectos',
        output: LS_PROYECTOS_OUTPUT,
        delay: 700,
      },
      {
        text: 'ayuda',
        output: 'Comandos disponibles: ayuda, sobre, proyectos, contacto, limpiar',
        delay: 600,
      },
    ],
    interactive: {
      ayuda: 'Comandos disponibles: ayuda, sobre, proyectos, investigacion, contacto, limpiar',
      sobre:
        'Jonathan Verdun. Ingeniero de Automatización QA e Investigador en Bioinformática. Especializado en TDD, automatización de pruebas y biología computacional.',
      proyectos: 'Ver la sección de Proyectos abajo, o escribe "ls proyectos" para ver la lista.',
      contacto: 'Contáctame por LinkedIn o GitHub enlazados arriba.',
      'ls proyectos': LS_PROYECTOS_OUTPUT,
      investigacion:
        'Sección de Investigación en Bioinformática abajo — IA para antígenos VIH (p-ádico) y API de Codificación de Codones (VAE Hiperbólico).',
      sudo: 'El usuario no está en el archivo sudoers. Este incidente será reportado.',
    },
  },
}
