import { render, screen } from '@testing-library/react'
import { useTranslation } from '@/lib/i18n/context'
import { en } from '@/lib/i18n/en'
import { BioinformaticsResearchCard } from '@/components/BioinformaticsResearchCard'
import type { I18nResearchSpec } from '@/lib/i18n/types'

jest.mock('@/lib/i18n/context', () => ({
  useTranslation: jest.fn(),
}))

const mockUseTranslation = useTranslation as jest.Mock

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

const wrap = (spec: I18nResearchSpec) => render(<BioinformaticsResearchCard spec={spec} />)

describe('BioinformaticsResearchCard — known focus key', () => {
  // The card's label/description lookup is exercised here with a mocked focus key,
  // since production translations no longer carry any bioinformatics focus entries.
  beforeEach(() => {
    mockUseTranslation.mockReturnValue({
      ...en,
      bioinformatics: {
        ...en.bioinformatics,
        focusLabels: { HIV: 'HIV Antigen AI' },
        focusDescriptions: { HIV: 'Antigen candidate screening using p-adic metric spaces.' },
      },
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

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
  beforeEach(() => {
    mockUseTranslation.mockReturnValue(en)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('falls back to spec.focus as the label', () => {
    wrap(unknownSpec)
    expect(screen.getByRole('heading', { name: /UnknownFocusKey/i })).toBeInTheDocument()
  })

  it('renders an empty description when focus is unknown', () => {
    const { container } = wrap(unknownSpec)
    // The description paragraph falls back to '' for unknown focusDescriptions.
    // It is the only paragraph with both text-sm and leading-relaxed classes.
    const descEl = container.querySelector('p.text-sm.leading-relaxed')
    expect(descEl?.textContent).toBe('')
  })

  it('does not render a link when spec has no link', () => {
    wrap(unknownSpec)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
