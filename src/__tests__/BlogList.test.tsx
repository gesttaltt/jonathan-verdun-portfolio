import React from 'react'
import { render, screen } from '@testing-library/react'
import { BlogList } from '@/components/BlogList'
import { useTranslation } from '@/lib/i18n/context'
import type { BlogPostMeta } from '@/lib/services/BlogService'

jest.mock('@/lib/i18n/context', () => ({
  useTranslation: jest.fn(),
}))

const mockPosts: BlogPostMeta[] = [
  {
    slug: 'post-1',
    title: 'Test Post One',
    date: '2025-01-15',
    tags: ['QA', 'Automation'],
    description: 'First test post description.',
  },
  {
    slug: 'post-2',
    title: 'Test Post Two',
    date: '2025-03-22',
    tags: ['CI/CD'],
    description: 'Second test post description.',
  },
]

beforeEach(() => {
  ;(useTranslation as jest.Mock).mockReturnValue({
    lang: 'en',
    sections: {
      blog: {
        title: 'Blog',
        noPosts: 'No posts yet.',
        readMore: 'Read More',
        backToHome: 'Back to Home',
      },
    },
  })
})

describe('BlogList', () => {
  it('renders the blog title and description', () => {
    render(<BlogList posts={mockPosts} />)
    expect(screen.getByRole('heading', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByText(/articles on qa engineering/i)).toBeInTheDocument()
  })

  it('renders a list of blog posts', () => {
    render(<BlogList posts={mockPosts} />)
    expect(screen.getByText('Test Post One')).toBeInTheDocument()
    expect(screen.getByText('Test Post Two')).toBeInTheDocument()
  })

  it('renders post dates', () => {
    render(<BlogList posts={mockPosts} />)
    expect(screen.getByText('2025-01-15')).toBeInTheDocument()
    expect(screen.getByText('2025-03-22')).toBeInTheDocument()
  })

  it('renders post descriptions', () => {
    render(<BlogList posts={mockPosts} />)
    expect(screen.getByText('First test post description.')).toBeInTheDocument()
    expect(screen.getByText('Second test post description.')).toBeInTheDocument()
  })

  it('renders tags for each post', () => {
    render(<BlogList posts={mockPosts} />)
    expect(screen.getByText('QA')).toBeInTheDocument()
    expect(screen.getByText('Automation')).toBeInTheDocument()
    expect(screen.getByText('CI/CD')).toBeInTheDocument()
  })

  it('renders links to individual blog posts', () => {
    render(<BlogList posts={mockPosts} />)
    const links = screen.getAllByRole('link')
    const blogLinks = links.filter((l) => l.getAttribute('href')?.startsWith('/blog/'))
    expect(blogLinks).toHaveLength(2)
    expect(blogLinks[0]).toHaveAttribute('href', '/blog/post-1')
    expect(blogLinks[1]).toHaveAttribute('href', '/blog/post-2')
  })

  it('renders "read more" link for each post', () => {
    render(<BlogList posts={mockPosts} />)
    const readMoreLinks = screen.getAllByText('Read More')
    expect(readMoreLinks).toHaveLength(2)
  })

  it('renders the back to home link', () => {
    render(<BlogList posts={mockPosts} />)
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('shows empty state when no posts', () => {
    render(<BlogList posts={[]} />)
    expect(screen.getByText('No posts yet.')).toBeInTheDocument()
  })

  it('renders Spanish locale links with /es prefix', () => {
    ;(useTranslation as jest.Mock).mockReturnValue({
      lang: 'es',
      sections: {
        blog: {
          title: 'Blog',
          noPosts: 'No hay artículos aún.',
          readMore: 'Leer Más',
          backToHome: 'Volver al Inicio',
        },
      },
    })
    render(<BlogList posts={mockPosts} />)
    const links = screen.getAllByRole('link')
    const blogLinks = links.filter((l) => l.getAttribute('href')?.startsWith('/es/blog/'))
    expect(blogLinks).toHaveLength(2)
    expect(blogLinks[0]).toHaveAttribute('href', '/es/blog/post-1')
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument()
  })
})
