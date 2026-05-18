import { BlogService } from '@/lib/services/BlogService'
import { BlogList } from '@/components/BlogList'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.name}`,
  description: `Artículos sobre ingeniería QA, pruebas y automatización por ${siteConfig.name}.`,
}

export default function BlogListingPage() {
  const posts = BlogService.getAllPosts()
  return <BlogList posts={posts} />
}
