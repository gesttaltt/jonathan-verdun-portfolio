import '@testing-library/jest-dom'

// Mock next/navigation
let mockPathname = '/'
export const setMockPathname = (path: string) => {
  mockPathname = path
}

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
  notFound: jest.fn(),
}))

// Mock marked to avoid ESM export issues
jest.mock('marked', () => ({
  marked: {
    parse: jest.fn((str) => str),
  },
}))

// Polyfill fetch for components that hit external APIs (e.g. Sidebar CI status)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ workflow_runs: [] }),
  })
) as jest.Mock

// Polyfill IntersectionObserver for framer-motion
class IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor() {}

  observe() {
    return null
  }
  unobserve() {
    return null
  }
  disconnect() {
    return null
  }
  takeRecords() {
    return []
  }
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
