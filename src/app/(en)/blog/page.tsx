import { BlogService } from '@/lib/services/BlogService'
import { BlogList } from '@/components/BlogList'
import { siteConfig } from '@/lib/siteConfig'
import { buildPageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata('en', '/blog/', {
  title: `Blog — ${siteConfig.name}`,
  description: `Articles on QA engineering, testing, and automation by ${siteConfig.name}.`,
})

export default function BlogListingPage() {
  const posts = BlogService.getAllPosts()
  return <BlogList posts={posts} />
}
