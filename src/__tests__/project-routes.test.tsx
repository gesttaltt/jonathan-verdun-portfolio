import { render, screen } from '@testing-library/react'
import EnProjectPage, {
  generateMetadata as generateEnMetadata,
  generateStaticParams as generateEnStaticParams,
} from '@/app/(en)/projects/[slug]/page'
import EsProjectPage, {
  generateMetadata as generateEsMetadata,
  generateStaticParams as generateEsStaticParams,
} from '@/app/(es)/es/projects/[slug]/page'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { notFound } from 'next/navigation'

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation')
  return {
    ...actual,
    notFound: jest.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
  }
})

jest.mock('@/components/ProjectDetail', () => ({
  ProjectDetail: ({ projectId }: { projectId: string }) => (
    <div data-testid="project-detail">{projectId}</div>
  ),
}))

describe('Project slug route wrappers', () => {
  const first = (() => {
    const project = PROJECT_DATA[0]
    if (!project) {
      throw new Error('Expected at least one project in PROJECT_DATA')
    }
    return project
  })()

  const requireFirstSlug = (params: Array<{ slug: string }>): string => {
    const firstSlug = params[0]?.slug
    if (!firstSlug) {
      throw new Error('Expected at least one generated project slug')
    }
    return firstSlug
  }

  it('generates static params for EN project route', () => {
    const params = generateEnStaticParams()
    expect(params.length).toBe(PROJECT_DATA.length)
    expect(params[0]).toHaveProperty('slug')
  })

  it('generates static params for ES project route', () => {
    const params = generateEsStaticParams()
    expect(params.length).toBe(PROJECT_DATA.length)
    expect(params[0]).toHaveProperty('slug')
  })

  it('generates metadata for EN project route when slug exists', async () => {
    const params = generateEnStaticParams()
    const metadata = await generateEnMetadata({
      params: Promise.resolve({ slug: requireFirstSlug(params) }),
    })
    expect(metadata).toMatchObject({
      title: expect.stringContaining(first.title),
      description: first.description,
    })
  })

  it('returns empty metadata for EN project route when slug is missing', async () => {
    const metadata = await generateEnMetadata({ params: Promise.resolve({ slug: 'missing-slug' }) })
    expect(metadata).toEqual({})
  })

  it('generates metadata for ES project route when slug exists', async () => {
    const params = generateEsStaticParams()
    const metadata = await generateEsMetadata({
      params: Promise.resolve({ slug: requireFirstSlug(params) }),
    })
    expect(metadata).toMatchObject({
      title: expect.stringContaining(first.title),
      description: first.description,
    })
  })

  it('returns empty metadata for ES project route when slug is missing', async () => {
    const metadata = await generateEsMetadata({ params: Promise.resolve({ slug: 'missing-slug' }) })
    expect(metadata).toEqual({})
  })

  it('renders EN project detail page for a valid slug', async () => {
    const params = generateEnStaticParams()
    const page = await EnProjectPage({
      params: Promise.resolve({ slug: requireFirstSlug(params) }),
    })
    render(page)
    expect(screen.getByTestId('project-detail')).toHaveTextContent(first.id)
  })

  it('renders ES project detail page for a valid slug', async () => {
    const params = generateEsStaticParams()
    const page = await EsProjectPage({
      params: Promise.resolve({ slug: requireFirstSlug(params) }),
    })
    render(page)
    expect(screen.getByTestId('project-detail')).toHaveTextContent(first.id)
  })

  it('calls notFound for EN project page when slug is invalid', async () => {
    await expect(
      EnProjectPage({ params: Promise.resolve({ slug: 'invalid-slug' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalled()
  })

  it('calls notFound for ES project page when slug is invalid', async () => {
    await expect(
      EsProjectPage({ params: Promise.resolve({ slug: 'invalid-slug' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalled()
  })
})
