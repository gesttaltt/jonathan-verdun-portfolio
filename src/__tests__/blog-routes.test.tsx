import React from 'react'
import { render, screen } from '@testing-library/react'
import EnBlogPage from '@/app/(en)/blog/page'
import EsBlogPage from '@/app/(es)/es/blog/page'
import EnBlogPostPage, {
  generateMetadata as generateEnMetadata,
  generateStaticParams as generateEnStaticParams,
} from '@/app/(en)/blog/[slug]/page'
import EsBlogPostPage, {
  generateMetadata as generateEsMetadata,
  generateStaticParams as generateEsStaticParams,
} from '@/app/(es)/es/blog/[slug]/page'
import { BlogService } from '@/lib/services/BlogService'
import { compileMDX } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

jest.mock('@/lib/services/BlogService', () => ({
  BlogService: {
    getAllPosts: jest.fn(),
    getPost: jest.fn(),
  },
}))

jest.mock('next-mdx-remote/rsc', () => ({
  compileMDX: jest.fn(),
}))

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation')
  return {
    ...actual,
    notFound: jest.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
  }
})

// BlogList is mocked here so route-wrapper tests stay fast and isolated.
// Locale-aware href generation (e.g. /es/blog/slug vs /blog/slug) is covered
// by the dedicated BlogList.test.tsx suite which exercises useTranslation directly.
jest.mock('@/components/BlogList', () => ({
  BlogList: ({ posts }: { posts: Array<{ slug: string }> }) => (
    <div data-testid="blog-list">{posts.map((p) => p.slug).join(',')}</div>
  ),
}))

jest.mock('@/components/BlogDetailContent', () => ({
  BlogDetailContent: ({
    post,
    backHref,
    backLabel,
    content,
  }: {
    post: { title: string }
    backHref: string
    backLabel: string
    content: React.ReactNode
  }) => (
    <div data-testid="blog-detail-content">
      <div>{post.title}</div>
      <div>{backHref}</div>
      <div>{backLabel}</div>
      <div data-testid="compiled-content">{content}</div>
    </div>
  ),
}))

const mockPosts = [
  {
    slug: 'qa-article',
    title: 'QA Article',
    date: '2026-05-10',
    tags: ['QA'],
    description: 'Desc',
  },
  {
    slug: 'automation-article',
    title: 'Automation Article',
    date: '2026-05-11',
    tags: ['Automation'],
    description: 'Desc 2',
  },
]

describe('Blog route wrappers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(BlogService.getAllPosts as jest.Mock).mockReturnValue(mockPosts)
    ;(BlogService.getPost as jest.Mock).mockReturnValue({
      meta: mockPosts[0],
      content: '# Hello from mdx',
    })
    ;(compileMDX as jest.Mock).mockResolvedValue({
      content: <p>Compiled MDX Content</p>,
    })
  })

  it('renders EN blog listing with posts from BlogService', () => {
    render(<EnBlogPage />)
    expect(BlogService.getAllPosts).toHaveBeenCalled()
    expect(screen.getByTestId('blog-list')).toHaveTextContent('qa-article,automation-article')
  })

  it('renders ES blog listing with posts from BlogService', () => {
    render(<EsBlogPage />)
    expect(BlogService.getAllPosts).toHaveBeenCalled()
    expect(screen.getByTestId('blog-list')).toHaveTextContent('qa-article,automation-article')
  })

  it('generates static params for EN slug route', () => {
    expect(generateEnStaticParams()).toEqual([
      { slug: 'qa-article' },
      { slug: 'automation-article' },
    ])
  })

  it('generates static params for ES slug route', () => {
    expect(generateEsStaticParams()).toEqual([
      { slug: 'qa-article' },
      { slug: 'automation-article' },
    ])
  })

  it('generates metadata for EN slug route when post exists', async () => {
    const metadata = await generateEnMetadata({ params: Promise.resolve({ slug: 'qa-article' }) })
    expect(metadata).toMatchObject({
      title: 'QA Article — Jonathan Verdun',
      description: 'Desc',
    })
  })

  it('returns empty metadata for EN slug route when post is missing', async () => {
    ;(BlogService.getPost as jest.Mock).mockReturnValue(null)
    const metadata = await generateEnMetadata({ params: Promise.resolve({ slug: 'missing' }) })
    expect(metadata).toEqual({})
  })

  it('generates metadata for ES slug route when post exists', async () => {
    const metadata = await generateEsMetadata({ params: Promise.resolve({ slug: 'qa-article' }) })
    expect(metadata).toMatchObject({
      title: 'QA Article — Jonathan Verdun',
      description: 'Desc',
    })
  })

  it('returns empty metadata for ES slug route when post is missing', async () => {
    ;(BlogService.getPost as jest.Mock).mockReturnValue(null)
    const metadata = await generateEsMetadata({ params: Promise.resolve({ slug: 'missing' }) })
    expect(metadata).toEqual({})
  })

  it('renders EN blog detail page and compiles MDX', async () => {
    const page = await EnBlogPostPage({ params: Promise.resolve({ slug: 'qa-article' }) })
    render(page)

    expect(compileMDX).toHaveBeenCalledWith({
      source: '# Hello from mdx',
      options: { parseFrontmatter: false },
    })
    expect(screen.getByTestId('blog-detail-content')).toBeInTheDocument()
    expect(screen.getByText('/blog/')).toBeInTheDocument()
    expect(screen.getByText('Back to Blog')).toBeInTheDocument()
    expect(screen.getByTestId('compiled-content')).toHaveTextContent('Compiled MDX Content')
  })

  it('renders ES blog detail page and compiles MDX', async () => {
    const page = await EsBlogPostPage({ params: Promise.resolve({ slug: 'qa-article' }) })
    render(page)

    expect(compileMDX).toHaveBeenCalledWith({
      source: '# Hello from mdx',
      options: { parseFrontmatter: false },
    })
    expect(screen.getByTestId('blog-detail-content')).toBeInTheDocument()
    expect(screen.getByText('/es/blog/')).toBeInTheDocument()
    expect(screen.getByText('Volver al Blog')).toBeInTheDocument()
  })

  it('calls notFound for EN blog detail when slug is missing', async () => {
    ;(BlogService.getPost as jest.Mock).mockReturnValue(null)
    await expect(EnBlogPostPage({ params: Promise.resolve({ slug: 'missing' }) })).rejects.toThrow(
      'NEXT_NOT_FOUND'
    )
    expect(notFound).toHaveBeenCalled()
  })

  it('calls notFound for ES blog detail when slug is missing', async () => {
    ;(BlogService.getPost as jest.Mock).mockReturnValue(null)
    await expect(EsBlogPostPage({ params: Promise.resolve({ slug: 'missing' }) })).rejects.toThrow(
      'NEXT_NOT_FOUND'
    )
    expect(notFound).toHaveBeenCalled()
  })
})
