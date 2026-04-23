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
    '!src/lib/shaders/**',
  ],
  coverageThreshold: {
    global: {
      lines: 30,
      functions: 25,
      branches: 20,
      statements: 30,
    },
  },
}

export default createJestConfig(config)
