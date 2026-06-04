import { render } from '@testing-library/react'
import manifest, { dynamic } from '@/app/manifest'
import BlogLoading from '@/app/(en)/blog/loading'
import ProjectLoading from '@/app/(en)/projects/[slug]/loading'
import { PageSkeleton, CardSkeleton } from '@/components/LoadingSkeleton'
import { siteConfig } from '@/lib/siteConfig'

describe('Loading skeletons and manifest', () => {
  it('exports static manifest mode', () => {
    expect(dynamic).toBe('force-static')
  })

  it('builds manifest with basePath-aware URLs', () => {
    const result = manifest()
    expect(result.start_url).toBe(`${siteConfig.basePath}/`)
    expect(result.icons?.[0]?.src).toBe(`${siteConfig.basePath}/icon-192.png`)
    expect(result.icons?.[1]?.src).toBe(`${siteConfig.basePath}/icon-512.png`)
  })

  it('renders PageSkeleton for blog loading route', () => {
    const { container } = render(<BlogLoading />)
    const pulseBlocks = container.querySelectorAll('.animate-pulse')
    expect(pulseBlocks.length).toBeGreaterThan(0)
  })

  it('renders PageSkeleton for project loading route', () => {
    const { container } = render(<ProjectLoading />)
    const pulseBlocks = container.querySelectorAll('.animate-pulse')
    expect(pulseBlocks.length).toBeGreaterThan(0)
  })

  it('renders PageSkeleton structural blocks', () => {
    const { container } = render(<PageSkeleton />)
    const pulseBlocks = container.querySelectorAll('.animate-pulse')
    // 6 = 3 header blocks (back-link, title, subtitle) + 3 content blocks (two full-width + one 3/4-width)
    expect(pulseBlocks.length).toBe(6)
  })

  it('renders CardSkeleton structural blocks', () => {
    const { container } = render(<CardSkeleton />)
    const pulseBlocks = container.querySelectorAll('.animate-pulse')
    // 5 = header icon + header label + title + body + footer link
    expect(pulseBlocks.length).toBe(5)
  })
})
