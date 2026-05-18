import { render, screen } from '@testing-library/react'
import { BlogDetailContent } from '@/components/BlogDetailContent'

const mockPost = {
  title: 'Test Blog Post',
  date: '2026-05-18',
  tags: ['testing', 'typescript'],
}

const mockContent = <p data-testid="mdx-content">Post content here</p>

describe('BlogDetailContent', () => {
  it('renders the back link with correct href and label', () => {
    render(
      <BlogDetailContent
        post={mockPost}
        content={mockContent}
        backHref="/blog/"
        backLabel="Back to Blog"
      />
    )
    const link = screen.getByText('Back to Blog')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/blog')
  })

  it('renders the blog post title and date', () => {
    render(
      <BlogDetailContent
        post={mockPost}
        content={mockContent}
        backHref="/blog/"
        backLabel="Back to Blog"
      />
    )
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('2026-05-18')).toBeInTheDocument()
  })

  it('renders all tags', () => {
    render(
      <BlogDetailContent
        post={mockPost}
        content={mockContent}
        backHref="/blog/"
        backLabel="Back to Blog"
      />
    )
    expect(screen.getByText('testing')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('renders the MDX content', () => {
    render(
      <BlogDetailContent
        post={mockPost}
        content={mockContent}
        backHref="/blog/"
        backLabel="Back to Blog"
      />
    )
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
    expect(screen.getByText('Post content here')).toBeInTheDocument()
  })

  it('renders Spanish back label correctly', () => {
    render(
      <BlogDetailContent
        post={mockPost}
        content={mockContent}
        backHref="/es/blog/"
        backLabel="Volver al Blog"
      />
    )
    const link = screen.getByText('Volver al Blog')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/es/blog')
  })

  it('handles empty tags gracefully', () => {
    render(
      <BlogDetailContent
        post={{ ...mockPost, tags: [] }}
        content={mockContent}
        backHref="/blog/"
        backLabel="Back to Blog"
      />
    )
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.queryByText('testing')).not.toBeInTheDocument()
  })
})
