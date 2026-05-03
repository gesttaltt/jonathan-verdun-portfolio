import { render, screen } from '@testing-library/react'
import { SystemSpecCard } from '@/components/SystemSpecCard'
import type { SystemSpec } from '@/lib/contracts/DataEngineeringContract.types'

const baseSpec: SystemSpec = {
  id: 'spec-01',
  focus: 'Automated Reporting',
  methodology: 'ETL',
  invariants: ['Idempotent Execution', 'Schema Validation'],
}

describe('SystemSpecCard', () => {
  it('renders the focus as a heading', () => {
    render(<SystemSpecCard spec={baseSpec} />)
    expect(screen.getByText('Automated Reporting')).toBeInTheDocument()
  })

  it('renders the methodology', () => {
    render(<SystemSpecCard spec={baseSpec} />)
    expect(screen.getByText('ETL')).toBeInTheDocument()
  })

  it('renders all invariants joined by a dot separator', () => {
    render(<SystemSpecCard spec={baseSpec} />)
    expect(screen.getByText('Idempotent Execution · Schema Validation')).toBeInTheDocument()
  })

  it('renders the repo link when spec.link is provided', () => {
    render(
      <SystemSpecCard spec={{ ...baseSpec, link: 'https://github.com/gesttaltt/some-repo' }} />
    )
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('strips https://github.com/ from the link display text', () => {
    render(
      <SystemSpecCard spec={{ ...baseSpec, link: 'https://github.com/gesttaltt/some-repo' }} />
    )
    expect(screen.getByText('gesttaltt/some-repo')).toBeInTheDocument()
  })

  it('repo link has rel="noopener noreferrer" and target="_blank"', () => {
    render(
      <SystemSpecCard spec={{ ...baseSpec, link: 'https://github.com/gesttaltt/some-repo' }} />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('does not render a link when spec.link is absent', () => {
    render(<SystemSpecCard spec={baseSpec} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
