import { BlogService } from '@/lib/services/BlogService'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'
import { BlogDetailContent } from '@/components/BlogDetailContent'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'

export function generateStaticParams() {
  return BlogService.getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = BlogService.getPost(slug)
  if (!post) return {}
  return {
    title: `${post.meta.title} — ${siteConfig.name}`,
    description: post.meta.description,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BlogService.getPost(slug)
  if (!post) notFound()
  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  })
  return (
    <BlogDetailContent
      post={{ title: post.meta.title, date: post.meta.date, tags: post.meta.tags }}
      content={content}
      backHref="/blog/"
      backLabel="Back to Blog"
    />
  )
}
