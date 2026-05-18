'use client'

import React from 'react'
import { m } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/services/BlogService'
import { containerVariants, staggerItemVariants } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'

interface BlogListProps {
  posts: BlogPostMeta[]
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const t = useTranslation()
  const prefix = t.lang === 'es' ? '/es' : ''

  return (
    <m.main
      variants={containerVariants()}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24"
    >
      <header className="mb-12">
        <h1 className="text-text-primary text-3xl font-extrabold tracking-tighter sm:text-5xl">
          {t.sections.blog.title}
        </h1>
        <p className="text-text-tertiary mt-3 text-sm">
          {t.lang === 'es'
            ? 'Artículos sobre ingeniería QA, automatización y calidad de software.'
            : 'Articles on QA engineering, automation, and software quality.'}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-text-muted text-sm">{t.sections.blog.noPosts}</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <m.article
              key={post.slug}
              variants={staggerItemVariants()}
              className="bg-bg-card hover:bg-bg-card-hover border-border-subtle group relative rounded-2xl border border-white/10 p-6 transition-all hover:border-blue-500/30 sm:p-8"
            >
              <Link
                href={`${prefix}/blog/${post.slug}`}
                className="focus-visible:ring-offset-background block rounded-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <div className="text-text-muted mb-3 flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>
                <h2 className="text-text-primary mb-2 text-lg font-bold transition-colors group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="text-text-tertiary mb-4 text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-bg-badge text-text-muted rounded px-2 py-0.5 text-[10px] font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-text-muted group-hover:text-text-primary ml-auto inline-flex items-center gap-1 text-xs font-bold transition-colors">
                    {t.sections.blog.readMore}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </m.article>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link
          href={`${prefix}/`}
          className="text-text-tertiary hover:text-text-primary flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
        >
          &larr; {t.sections.blog.backToHome}
        </Link>
      </div>
    </m.main>
  )
}
