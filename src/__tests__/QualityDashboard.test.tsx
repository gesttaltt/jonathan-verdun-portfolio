import { render, screen } from '@testing-library/react'
import { QualityDashboard } from '@/components/QualityDashboard'
import { I18nProvider } from '@/lib/i18n/context'
import type { AuditEntry } from '@/lib/services/AuditRepository'

const mockAudits: AuditEntry[] = [
  {
    id: 'TEST_PLAN',
    slug: 'TEST_PLAN',
    title: 'Test Plan',
    date: '2026-05-01',
    content: 'Plan content',
    excerpt: 'Plan...',
  },
  {
    id: 'audit-1',
    slug: 'audit-1',
    title: 'General Audit',
    date: '2026-05-02',
    content: 'Audit content',
    excerpt: 'Audit...',
  },
]

describe('QualityDashboard', () => {
  const renderDashboard = (audits = mockAudits) =>
    render(
      <I18nProvider>
        <QualityDashboard audits={audits} />
      </I18nProvider>
    )

  it('renders formal quality artifacts separately', () => {
    renderDashboard()
    expect(screen.getByText('Formal Quality Artifacts')).toBeInTheDocument()
    expect(screen.getByText('Test Plan')).toBeInTheDocument()
  })

  it('renders chronological audit history', () => {
    renderDashboard()
    expect(screen.getByText('Chronological Audit History')).toBeInTheDocument()
    expect(screen.getByText('General Audit')).toBeInTheDocument()
  })

  it('displays correct counts and status', () => {
    renderDashboard()
    // 1 general audit in mock
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Audits Published')).toBeInTheDocument()
    expect(screen.getByText('LOCKED')).toBeInTheDocument()
  })
})
