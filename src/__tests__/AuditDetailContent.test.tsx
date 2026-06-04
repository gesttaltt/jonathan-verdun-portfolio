import { render, screen } from '@testing-library/react'
import { AuditDetailContent } from '@/components/AuditDetailContent'

describe('AuditDetailContent', () => {
  const defaultProps = {
    title: 'Test Audit',
    date: '2026-05-18',
    content: '<p>Audit content here</p>',
    backHref: '/quality/',
    backLabel: 'Back to Dashboard',
  }

  it('renders the back link with correct href and label', () => {
    render(<AuditDetailContent {...defaultProps} />)
    const link = screen.getByText('Back to Dashboard')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/quality')
  })

  it('renders the audit title and date', () => {
    render(<AuditDetailContent {...defaultProps} />)
    expect(screen.getByText('Test Audit')).toBeInTheDocument()
    expect(screen.getByText('2026-05-18')).toBeInTheDocument()
  })

  it('renders audit content as HTML', () => {
    render(<AuditDetailContent {...defaultProps} />)
    expect(screen.getByText('Audit content here')).toBeInTheDocument()
  })

  it('renders inline HTML markup faithfully (dangerouslySetInnerHTML contract)', () => {
    const { container } = render(
      <AuditDetailContent
        {...defaultProps}
        content='<p><strong>Formatted</strong> text with <em>emphasis</em> and <a href="#">links</a></p>'
      />
    )
    expect(container.querySelector('strong')).not.toBeNull()
    expect(container.querySelector('em')).not.toBeNull()
    expect(container.querySelector('a')).not.toBeNull()
  })

  it('does not escape HTML entities — sanitization is the responsibility of AuditRepository', () => {
    const { container } = render(
      <AuditDetailContent
        {...defaultProps}
        content='<p class="highlight">Raw &amp; HTML</p>'
      />
    )
    // Class attribute present and & entity decoded — confirms dangerouslySetInnerHTML path
    expect(container.querySelector('.highlight')).not.toBeNull()
    expect(container.querySelector('.highlight')?.textContent).toBe('Raw & HTML')
  })

  it('renders Spanish back label correctly', () => {
    render(
      <AuditDetailContent
        title="Test"
        date="2026-05-18"
        content="<p>test</p>"
        backHref="/es/quality/"
        backLabel="Volver al Panel de Calidad"
      />
    )
    const link = screen.getByText('Volver al Panel de Calidad')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/es/quality')
  })
})
