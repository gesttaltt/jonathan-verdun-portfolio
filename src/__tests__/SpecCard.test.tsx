import { render, screen } from '@testing-library/react'
import { SpecCard } from '@/components/SpecCard'

const baseProps = {
  color: 'cyan' as const,
  icon: <span data-testid="icon" />,
  title: 'Test Spec',
  methodologyLabel: 'Methodology',
  methodology: 'p-adic',
  invariantsLabel: 'Invariants',
  invariants: ['Stability'],
}

describe('SpecCard', () => {
  it('renders methodology and invariants', () => {
    render(<SpecCard {...baseProps} />)
    expect(screen.getByText('p-adic')).toBeInTheDocument()
    expect(screen.getByText('Stability')).toBeInTheDocument()
  })

  it('renders no GitHub link when no link is provided', () => {
    render(<SpecCard {...baseProps} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('uses the caller-supplied githubAriaLabel when provided', () => {
    render(
      <SpecCard
        {...baseProps}
        link="https://github.com/example/repo"
        githubAriaLabel="Ver example/repo en GitHub (se abre en una pestaña nueva)"
      />
    )
    expect(
      screen.getByRole('link', {
        name: 'Ver example/repo en GitHub (se abre en una pestaña nueva)',
      })
    ).toBeInTheDocument()
  })

  it('falls back to a default English aria-label when githubAriaLabel is omitted', () => {
    render(<SpecCard {...baseProps} link="https://github.com/example/repo" />)
    expect(
      screen.getByRole('link', { name: 'View example/repo on GitHub (opens in new tab)' })
    ).toBeInTheDocument()
  })
})
