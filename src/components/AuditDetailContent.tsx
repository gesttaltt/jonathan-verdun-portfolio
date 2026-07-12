import { DetailArticleLayout } from './DetailArticleLayout'

interface AuditDetailContentProps {
  title: string
  date: string
  content: string
  backHref: string
  backLabel: string
}

export function AuditDetailContent({
  title,
  date,
  content,
  backHref,
  backLabel,
}: AuditDetailContentProps) {
  return (
    <DetailArticleLayout
      backHref={backHref}
      backLabel={backLabel}
      date={date}
      title={title}
      html={content}
    />
  )
}
