import { render, screen } from '@testing-library/react'
import { DetailArticleLayout } from '@/components/DetailArticleLayout'

describe('DetailArticleLayout', () => {
  const baseProps = {
    backHref: '/quality/',
    backLabel: 'Back',
    date: '2026-01-01',
    title: 'Test Title',
  }

  it('renders raw HTML content via the html prop', () => {
    render(<DetailArticleLayout {...baseProps} html="<p>hello world</p>" />)
    expect(screen.getByText('hello world')).toBeInTheDocument()
  })

  it('renders pre-rendered content via children', () => {
    render(
      <DetailArticleLayout {...baseProps}>
        <p data-testid="child">mdx content</p>
      </DetailArticleLayout>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders optional meta content in the header', () => {
    render(
      <DetailArticleLayout {...baseProps} meta={<span data-testid="meta">tag</span>}>
        <p>body</p>
      </DetailArticleLayout>
    )
    expect(screen.getByTestId('meta')).toBeInTheDocument()
  })

  it('renders the back link and date', () => {
    render(<DetailArticleLayout {...baseProps} html="<p>x</p>" />)
    expect(screen.getByRole('link', { name: /Back/i })).toHaveAttribute('href', '/quality')
    expect(screen.getByText('2026-01-01')).toBeInTheDocument()
  })

  it('uses theme-aware text tokens for the title and back link, not hardcoded dark-mode colors', () => {
    // Regression guard: AuditDetailContent previously hardcoded text-white/text-zinc-400
    // with no light: variant, so the title and back link were nearly invisible
    // (white-on-#fafafa) once the light theme shipped. Both must use the
    // theme-aware tokens (which do adapt) instead of literal white/zinc classes.
    render(<DetailArticleLayout {...baseProps} html="<p>x</p>" />)

    const heading = screen.getByRole('heading', { name: 'Test Title' })
    expect(heading.className).toMatch(/\btext-text-primary\b/)
    expect(heading.className).not.toMatch(/\btext-white\b/)

    const backLink = screen.getByRole('link', { name: /Back/i })
    expect(backLink.className).toMatch(/\btext-text-muted\b/)
    expect(backLink.className).not.toMatch(/\btext-zinc-400\b/)
  })
})
