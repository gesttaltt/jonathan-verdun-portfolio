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
    '!src/app/opengraph-image.tsx',
    '!src/app/sitemap.ts',
    // GLSL shader source — no jsdom equivalent for GPU compilation
    '!src/lib/shaders/**',
    // Three.js mesh with useFrame — requires a real WebGL context, untestable in jsdom
    '!src/components/TopologyMesh.tsx',
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
