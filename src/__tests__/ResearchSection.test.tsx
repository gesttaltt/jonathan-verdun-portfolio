import { render, screen } from '@testing-library/react'
import { ResearchSection } from '@/components/ResearchSection'
import { useTranslation } from '@/lib/i18n/context'
import { en } from '@/lib/i18n/en'

jest.mock('@/components/FadeInSection', () => ({
  FadeInSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/lib/i18n/context', () => ({
  useTranslation: jest.fn(),
}))

const mockUseTranslation = useTranslation as jest.Mock

describe('ResearchSection', () => {
  it('renders architecture specs plus bioinformatics specs, when present', () => {
    mockUseTranslation.mockReturnValue({
      ...en,
      bioinformatics: {
        ...en.bioinformatics,
        specs: [
          {
            id: 'spec-test',
            focus: 'HIV',
            methodology: 'p-adic',
            invariants: ['Numerical Stability'],
            link: 'https://github.com/example/repo',
          },
        ],
        focusLabels: { HIV: 'HIV Antigen AI' },
        focusDescriptions: { HIV: 'Antigen candidate screening.' },
      },
    })

    render(<ResearchSection />)

    en.architecture.specs.forEach((spec) => {
      expect(screen.getByText(spec.focus)).toBeInTheDocument()
    })
    expect(screen.getByText('HIV Antigen AI')).toBeInTheDocument()
  })

  it('renders only architecture specs when bioinformatics has none', () => {
    mockUseTranslation.mockReturnValue(en)

    render(<ResearchSection />)

    en.architecture.specs.forEach((spec) => {
      expect(screen.getByText(spec.focus)).toBeInTheDocument()
    })
  })
})
