import { render, screen, fireEvent } from '@testing-library/react'
import GlobalError from '@/app/error'

const baseError = new Error('Something broke') as Error & { digest?: string }

describe('GlobalError', () => {
  it('renders the 500 heading', () => {
    render(<GlobalError error={baseError} reset={() => {}} />)
    expect(screen.getByRole('heading', { name: '500' })).toBeInTheDocument()
  })

  it('renders the "Runtime Error" label', () => {
    render(<GlobalError error={baseError} reset={() => {}} />)
    expect(screen.getByText('Runtime Error')).toBeInTheDocument()
  })

  it('calls reset when the Try again button is clicked', () => {
    const reset = jest.fn()
    render(<GlobalError error={baseError} reset={reset} />)
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(reset).toHaveBeenCalledTimes(1)
  })

  it('renders the Return home link with href="/"', () => {
    render(<GlobalError error={baseError} reset={() => {}} />)
    expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/')
  })

  it('renders the digest when present', () => {
    const errorWithDigest = Object.assign(new Error('broke'), { digest: 'abc-123' })
    render(<GlobalError error={errorWithDigest} reset={() => {}} />)
    expect(screen.getByText('abc-123')).toBeInTheDocument()
  })

  it('does not render a digest line when digest is absent', () => {
    render(<GlobalError error={baseError} reset={() => {}} />)
    expect(screen.queryByText(/digest/i)).not.toBeInTheDocument()
  })
})
