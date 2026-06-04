import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(marked|@react-three/postprocessing|postprocessing|maath|n8ao)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // coverage.json is gitignored (generated at build time) — resolve to a stub for all tests
    '^[.].*/coverage\\.json$': '<rootDir>/__mocks__/coverageJson.ts',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    // Server-side OG image generation — uses fs/ImageResponse, incompatible with jsdom
    '!src/app/\\(en\\)/opengraph-image.tsx',
    '!src/app/\\(es\\)/es/opengraph-image.tsx',
    '!src/lib/og/**',
    '!src/app/sitemap.ts',
    // Next.js metadata route — server-only, identical pattern to sitemap.ts
    '!src/app/robots.ts',
    // GLSL shader source — no jsdom equivalent for GPU compilation
    '!src/lib/shaders/**',
    // Three.js mesh with useFrame — requires a real WebGL context, untestable in jsdom
    '!src/components/TopologyMesh.tsx',
    // Three.js post-processing — WebGL context required; isLight branches only testable via E2E
    '!src/components/TopologyPostProcessing.tsx',
    // Three.js Canvas wrapper — WebGL context required; aria/layout tested via TopologyLoader
    '!src/components/InteractiveTopology.tsx',
    // next/dynamic wrapper — dynamic import resolution untestable in jsdom without heavy mocking
    '!src/components/TopologyLoader.tsx',
    // Static metadata export — no renderable JSX, covered by (es)/es/page metadata tests
    '!src/app/\\(es\\)/es/page.tsx',
    // Data-heavy contract and translation files with top-level initialization
    '!src/lib/contracts/TerminalContract.ts',
    '!src/lib/i18n/es.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 99,
      functions: 99,
      branches: 97,
      statements: 99,
    },
  },
}

export default createJestConfig(config)
