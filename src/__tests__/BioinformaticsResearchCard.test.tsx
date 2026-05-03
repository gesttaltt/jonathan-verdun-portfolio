import { render, screen } from '@testing-library/react'
import { I18nProvider } from '@/lib/i18n/context'
import { BioinformaticsResearchCard } from '@/components/BioinformaticsResearchCard'
import type { I18nResearchSpec } from '@/lib/i18n/types'

const knownSpec: I18nResearchSpec = {
  id: 'spec-01',
  focus: 'HIV',
  methodology: 'p-adic',
  invariants: ['Numerical Stability'],
  link: 'https://github.com/example/repo',
}

const unknownSpec: I18nResearchSpec = {
  id: 'spec-unknown',
  focus: 'UnknownFocusKey',
  methodology: 'Custom',
  invariants: ['Invariant A'],
}

const wrap = (spec: I18nResearchSpec) =>
  render(
    <I18nProvider>
      <BioinformaticsResearchCard spec={spec} />
    </I18nProvider>
  )

describe('BioinformaticsResearchCard — known focus key', () => {
  it('renders the translated label', () => {
    wrap(knownSpec)
    expect(screen.getByText('HIV Antigen AI')).toBeInTheDocument()
  })

  it('renders the translated description', () => {
    wrap(knownSpec)
    expect(screen.getByText(/Antigen candidate screening/)).toBeInTheDocument()
  })

  it('renders methodology', () => {
    wrap(knownSpec)
    expect(screen.getByText('p-adic')).toBeInTheDocument()
  })

  it('renders a GitHub link', () => {
    wrap(knownSpec)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', knownSpec.link)
  })
})

describe('BioinformaticsResearchCard — unknown focus key (fallback branches)', () => {
  it('falls back to spec.focus as the label', () => {
    wrap(unknownSpec)
    expect(screen.getByRole('heading', { name: /UnknownFocusKey/i })).toBeInTheDocument()
  })

  it('renders an empty description when focus is unknown', () => {
    const { container } = wrap(unknownSpec)
    const descEl = container.querySelector('p.mb-4')
    expect(descEl?.textContent).toBe('')
  })

  it('does not render a link when spec has no link', () => {
    wrap(unknownSpec)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
