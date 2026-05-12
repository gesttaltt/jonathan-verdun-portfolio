import { render, screen } from '@testing-library/react'
import { AuditCard } from '@/components/AuditCard'
import { I18nProvider } from '@/lib/i18n/context'
import { setMockPathname } from '../../jest.setup'

const mockAudit = {
  id: 'test-audit',
  slug: 'test-audit',
  title: 'Test Audit Title',
  date: '2026-05-11',
  content: 'Content',
  excerpt: 'This is an excerpt...',
}

describe('AuditCard', () => {
  beforeEach(() => {
    setMockPathname('/')
  })

  it('renders audit information correctly', () => {
    render(
      <I18nProvider>
        <AuditCard audit={mockAudit} />
      </I18nProvider>
    )

    expect(screen.getByText('Test Audit Title')).toBeInTheDocument()
    expect(screen.getByText('2026-05-11')).toBeInTheDocument()
    expect(screen.getByText('This is an excerpt...')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/quality/test-audit')
  })

  it('handles Spanish locale correctly', () => {
    setMockPathname('/es/quality')
    render(
      <I18nProvider>
        <AuditCard audit={mockAudit} />
      </I18nProvider>
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/es/quality/test-audit')
  })
})
