/**
 * Isolated branch tests for Terminal.tsx that require useTerminal to be mocked.
 * Kept separate from Terminal.test.tsx because jest.mock is module-scoped.
 */
import { render, screen } from '@testing-library/react'

// Return history entries without an `id` field to exercise the `entry.id ?? index` fallback.
jest.mock('@/components/hooks/useTerminal', () => ({
  useTerminal: jest.fn(() => ({
    history: [
      { text: 'boot', output: 'ready' },
      { text: 'ls', output: 'file.txt' },
    ],
    isBooting: false,
    execute: jest.fn(),
  })),
}))

import { Terminal } from '@/components/Terminal'

describe('Terminal — id ?? index key fallback', () => {
  it('renders all history entries when entries carry no id', () => {
    render(<Terminal commands={[]} />)
    expect(screen.getByText('boot')).toBeInTheDocument()
    expect(screen.getByText('ls')).toBeInTheDocument()
  })

  it('renders entry output when entries carry no id', () => {
    render(<Terminal commands={[]} />)
    expect(screen.getByText('ready')).toBeInTheDocument()
    expect(screen.getByText('file.txt')).toBeInTheDocument()
  })
})
