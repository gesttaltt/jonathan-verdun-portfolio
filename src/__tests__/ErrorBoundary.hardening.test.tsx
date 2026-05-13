import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const BrokenComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Explosion!')
  }
  return <div>Safe Content</div>
}

describe('ErrorBoundary Hardening', () => {
  // Prevent console.error from cluttering test output for expected errors
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe Content')).toBeInTheDocument()
  })

  it('catches errors and renders default fallback', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent shouldThrow />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Component Error')).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom Error UI</div>}>
        <BrokenComponent shouldThrow />
      </ErrorBoundary>
    )
    expect(screen.getByText('Custom Error UI')).toBeInTheDocument()
    expect(screen.queryByText('Component Error')).not.toBeInTheDocument()
  })

  it('resets state when Retry button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <BrokenComponent shouldThrow />
      </ErrorBoundary>
    )

    expect(screen.getByText('Component Error')).toBeInTheDocument()

    // Update props to NOT throw
    rerender(
      <ErrorBoundary>
        <BrokenComponent shouldThrow={false} />
      </ErrorBoundary>
    )

    // Now click retry
    fireEvent.click(screen.getByText('Retry'))

    expect(screen.getByText('Safe Content')).toBeInTheDocument()
    expect(screen.queryByText('Component Error')).not.toBeInTheDocument()
  })
})
