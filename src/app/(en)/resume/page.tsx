import { ResumeTimeline } from '@/components/ResumeTimeline'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `Professional resume and career timeline of ${siteConfig.name} — ${siteConfig.jobTitle}.`,
}

const RESUME_PDF_PATH = path.join(process.cwd(), 'public', 'resume-jonathan-verdun.pdf')

export default function ResumePage() {
  const hasResumePdf = fs.existsSync(RESUME_PDF_PATH)
  return <ResumeTimeline hasResumePdf={hasResumePdf} />
}
