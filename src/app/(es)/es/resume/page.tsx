import { ResumeTimeline } from '@/components/ResumeTimeline'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Currículum — ${siteConfig.name}`,
  description: `Currículum profesional y línea de tiempo profesional de ${siteConfig.name} — ${siteConfig.jobTitle}.`,
}

export default function ResumePage() {
  return <ResumeTimeline />
}
