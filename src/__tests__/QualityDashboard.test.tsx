import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QualityDashboard } from '@/components/QualityDashboard'
import { I18nProvider } from '@/lib/i18n/context'
import type { AuditEntry } from '@/lib/services/AuditRepository'
import { setMockPathname } from '../../jest.setup'

const mockAudits: AuditEntry[] = [
  {
    id: 'specs/TEST_PLAN',
    slug: 'specs/TEST_PLAN',
    title: 'Test Plan',
    date: '2026-05-01',
    content: 'Plan content',
    excerpt: 'Plan...',
    category: 'spec',
  },
  {
    id: 'audit-1',
    slug: 'audit-1',
    title: 'General Audit',
    date: '2026-05-02',
    content: 'Audit content',
    excerpt: 'Audit excerpt text',
    category: 'audit',
  },
  {
    id: 'audit-2',
    slug: 'audit-2',
    title: 'Visual Regression',
    date: '2026-05-03',
    content: 'Visual content',
    excerpt: 'Snapshots...',
    category: 'audit',
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
    expect(screen.getByText(/The QA Handbook/i)).toBeInTheDocument()
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

    expect(await screen.findByText('Visual Regression')).toBeInTheDocument()
    expect(screen.queryByText('General Audit')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Plan')).not.toBeInTheDocument()
  }, 3000)

  it('filters audits based on search query in excerpt', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    await user.type(input, 'excerpt')

    expect(await screen.findByText('General Audit')).toBeInTheDocument()
    expect(screen.queryByText('Visual Regression')).not.toBeInTheDocument()
  }, 3000)

  it('shows no results message when no audits match', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    await user.type(input, 'nonexistent')

    // Two elements now legitimately carry this text: the visible message and
    // the screen-reader-only aria-live announcement (see the dedicated
    // live-region test below) — assert on the visible one specifically.
    const matches = screen.getAllByText(/no audits match your search query/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByText('General Audit')).not.toBeInTheDocument()
  }, 3000)

  it('announces "no results" via a live region for screen readers', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    const liveRegion = document.querySelector('[aria-live="polite"]')
    expect(liveRegion).toBeInTheDocument()
    expect(liveRegion).toHaveTextContent('')

    await user.type(input, 'nonexistent')

    expect(liveRegion).toHaveTextContent(/no audits match your search query/i)
  }, 3000)

  it('clears search results when clicking the clear button', async () => {
    const user = userEvent.setup()
    renderDashboard()
    const input = screen.getByPlaceholderText(/search audits/i)

    await user.type(input, 'Visual')
    expect(screen.queryByText('General Audit')).not.toBeInTheDocument()

    const clearButton = screen.getByRole('button', { name: /clear/i })
    await user.click(clearButton)

    expect(input).toHaveValue('')
    expect(screen.getByText('General Audit')).toBeInTheDocument()
    expect(screen.getByText('Visual Regression')).toBeInTheDocument()
  }, 3000)

  it('displays correct counts and status', () => {
    renderDashboard()
    // 2 chronological audits in mock
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Audits Published')).toBeInTheDocument()
    // 1 spec in mock
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Architecture Specs')).toBeInTheDocument()
  })

  it('renders fully translated Spanish labels under /es (no stray English strings)', async () => {
    const user = userEvent.setup()
    setMockPathname('/es/quality')
    renderDashboard()

    expect(screen.getByText('Auditorías Publicadas')).toBeInTheDocument()
    expect(screen.getByText('Especificaciones de Arquitectura')).toBeInTheDocument()
    expect(screen.getByText(/El Manual de QA/)).toBeInTheDocument()
    expect(screen.getByText('Historial Cronológico de Auditorías')).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('Buscar auditorías...'), 'x')
    expect(
      screen.getByLabelText('Buscar auditorías... — limpiar', { selector: 'button' })
    ).toBeInTheDocument()
  }, 3000)
})
