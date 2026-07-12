import type { ReactNode } from 'react'
import { DetailArticleLayout } from './DetailArticleLayout'

interface BlogPostMeta {
  title: string
  date: string
  tags: string[]
}

interface BlogDetailContentProps {
  post: BlogPostMeta
  content: ReactNode
  backHref: string
  backLabel: string
}

export function BlogDetailContent({ post, content, backHref, backLabel }: BlogDetailContentProps) {
  return (
    <DetailArticleLayout
      backHref={backHref}
      backLabel={backLabel}
      date={post.date}
      title={post.title}
      meta={
        post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-bg-badge text-text-muted rounded px-2 py-0.5 text-[10px] font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        )
      }
    >
      {content}
    </DetailArticleLayout>
  )
}
