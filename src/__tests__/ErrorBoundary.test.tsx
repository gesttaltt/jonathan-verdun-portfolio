import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Suppress React's expected console.error output for thrown errors in tests
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
afterAll(() => consoleSpy.mockRestore())

const Bomb = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('intentional test error')
  return <span>healthy</span>
}

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(screen.getByText('healthy')).toBeInTheDocument()
  })

  it('renders default fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Component Error')).toBeInTheDocument()
    expect(screen.getByText(/A rendering error occurred/i)).toBeInTheDocument()
  })

  it('renders a Retry button in the default fallback', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('clicking Retry re-renders children when the error resolves', async () => {
    let shouldThrow = true
    const ToggleBomb = () => {
      if (shouldThrow) throw new Error('toggle error')
      return <span>recovered</span>
    }
    render(
      <ErrorBoundary>
        <ToggleBomb />
      </ErrorBoundary>
    )
    expect(screen.getByText('Component Error')).toBeInTheDocument()
    shouldThrow = false
    await userEvent.click(screen.getByRole('button', { name: /retry/i }))
    expect(screen.getByText('recovered')).toBeInTheDocument()
    expect(screen.queryByText('Component Error')).not.toBeInTheDocument()
  })

  it('renders custom fallback prop when provided and child throws', () => {
    render(
      <ErrorBoundary fallback={<div>custom fallback</div>}>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('custom fallback')).toBeInTheDocument()
    expect(screen.queryByText('Component Error')).not.toBeInTheDocument()
  })

  it('does not show default fallback when child is healthy', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(screen.queryByText('Component Error')).not.toBeInTheDocument()
  })
})
