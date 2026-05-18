import { ResumeTimeline } from '@/components/ResumeTimeline'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `Professional resume and career timeline of ${siteConfig.name} — ${siteConfig.jobTitle}.`,
}

export default function ResumePage() {
  return <ResumeTimeline />
}
