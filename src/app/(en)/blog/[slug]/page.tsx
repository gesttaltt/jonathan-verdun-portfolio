import { BlogService } from '@/lib/services/BlogService'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

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
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
      <Link
        href="/blog/"
        className="group mb-8 flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-400 uppercase transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      <article className="space-y-8">
        <header className="space-y-4 border-b border-white/10 pb-8">
          <div className="text-text-muted flex items-center gap-2 text-[10px] font-bold tracking-tighter uppercase sm:text-xs">
            <Calendar className="h-3 w-3" />
            {post.meta.date}
          </div>

          <h1 className="text-text-primary text-3xl font-extrabold tracking-tighter sm:text-5xl">
            {post.meta.title}
          </h1>

          {post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.meta.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-bg-badge text-text-muted rounded px-2 py-0.5 text-[10px] font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-zinc prose-headings:tracking-tighter prose-headings:font-bold prose-headings:text-white prose-p:leading-relaxed prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-amber-400 prose-code:text-cyan-300 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-th:p-4 prose-td:p-4 max-w-none">
          {content}
        </div>
      </article>
    </main>
  )
}
