import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    // Server-side OG image generation — uses fs/ImageResponse, incompatible with jsdom
    '!src/app/(en)/opengraph-image.tsx',
    '!src/app/(es)/es/opengraph-image.tsx',
    '!src/app/sitemap.ts',
    // GLSL shader source — no jsdom equivalent for GPU compilation
    '!src/lib/shaders/**',
    // Three.js mesh with useFrame — requires a real WebGL context, untestable in jsdom
    '!src/components/TopologyMesh.tsx',
    // Three.js Canvas wrapper — WebGL context required; aria/layout tested via TopologyLoader
    '!src/components/InteractiveTopology.tsx',
    // next/dynamic wrapper — dynamic import resolution untestable in jsdom without heavy mocking
    '!src/components/TopologyLoader.tsx',
    // Static metadata export — no renderable JSX, covered by (es)/es/page metadata tests
    '!src/app/(es)/es/page.tsx',
  ],
  coverageThreshold: {
    global: {
      lines: 72,
      functions: 70,
      branches: 65,
      statements: 72,
    },
  },
}

export default createJestConfig(config)
