import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    excerpt: 'Audit excerpt text',
  },
  {
    id: 'audit-2',
    slug: 'audit-2',
    title: 'Visual Regression',
    date: '2026-05-03',
    content: 'Visual content',
    excerpt: 'Snapshots...',
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
    expect(screen.getByText('Visual Regression')).toBeInTheDocument()
  })

  it('filters audits based on search query in title', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    await user.type(input, 'Visual')

    expect(screen.getByText('Visual Regression')).toBeInTheDocument()
    expect(screen.queryByText('General Audit')).not.toBeInTheDocument()
    // Core artifacts should be hidden during search
    expect(screen.queryByText('Test Plan')).not.toBeInTheDocument()
  })

  it('filters audits based on search query in excerpt', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    await user.type(input, 'excerpt')

    expect(screen.getByText('General Audit')).toBeInTheDocument()
    expect(screen.queryByText('Visual Regression')).not.toBeInTheDocument()
  })

  it('shows no results message when no audits match', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    await user.type(input, 'nonexistent')

    expect(screen.getByText(/no audits match your search query/i)).toBeInTheDocument()
    expect(screen.queryByText('General Audit')).not.toBeInTheDocument()
  })

  it('clears search results when clicking the clear button', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    await user.type(input, 'Visual')
    expect(screen.queryByText('General Audit')).not.toBeInTheDocument()

    const clearButton = screen.getByRole('button') // The X button
    await user.click(clearButton)

    expect(input).toHaveValue('')
    expect(screen.getByText('General Audit')).toBeInTheDocument()
    expect(screen.getByText('Visual Regression')).toBeInTheDocument()
  })

  it('displays correct counts and status', () => {
    renderDashboard()
    // 2 general audits in mock
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Audits Published')).toBeInTheDocument()
    expect(screen.getByText('LOCKED')).toBeInTheDocument()
  })
})
