'use client'

import React from 'react'
import { m } from 'framer-motion'
import { Briefcase, Code2, Award, Download, BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'
import { useTranslation } from '@/lib/i18n/context'
import { containerVariants, staggerItemVariants } from '@/lib/animations'

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <h2 className="text-text-primary mb-6 flex items-center gap-3 text-xl font-bold">
    <span className="light:text-blue-700 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
      {icon}
    </span>
    {title}
  </h2>
)

interface ResumeTimelineProps {
  hasResumePdf?: boolean
}

export const ResumeTimeline: React.FC<ResumeTimelineProps> = ({ hasResumePdf = false }) => {
  const t = useTranslation()

  return (
    <m.main
      variants={containerVariants()}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24"
    >
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-text-primary text-3xl font-extrabold tracking-tighter sm:text-5xl">
            {t.sections.resume.title}
          </h1>
          <p className="text-text-tertiary mt-2 text-sm">{siteConfig.jobTitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {hasResumePdf && (
            <a
              href="/resume-jonathan-verdun.pdf"
              download
              className="light:bg-zinc-950 light:hover:bg-black light:text-white focus-visible:ring-offset-background group flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
            >
              <Download className="h-4 w-4" />
              {t.sections.resume.downloadLabel}
            </a>
          )}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="light:border-zinc-300 light:hover:bg-zinc-100 light:text-zinc-800 focus-visible:ring-offset-background group flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
          >
            {
              /* istanbul ignore next — submitLabel always defined in translations */
              t.sections.contactForm.submitLabel || t.sections.resume.downloadLabel
            }
          </a>
        </div>
      </div>

      <m.section variants={containerVariants()} className="mb-16">
        <SectionTitle
          icon={<Briefcase className="h-5 w-5" />}
          title={t.sections.resume.experienceTitle}
        />
        <div className="relative space-y-0">
          {siteConfig.workHistory.map((job, i) => {
            const desc = t.workHistoryDescriptions[job.organization]
            const role = t.workHistoryRoles[job.organization] || job.role
            const period = t.workHistoryPeriods[job.organization] || job.period
            const isLast = i === siteConfig.workHistory.length - 1

            return (
              <m.div
                key={job.organization}
                variants={staggerItemVariants(i * 0.1)}
                className={`relative pb-8 pl-8 ${isLast ? '' : ''}`}
              >
                {!isLast && (
                  <div className="absolute top-3 bottom-0 left-[11px] w-px bg-gradient-to-b from-blue-500/30 to-transparent" />
                )}
                <div className="absolute top-1.5 left-0 flex h-6 w-6 items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]" />
                </div>
                <div className="bg-bg-card border-border-subtle rounded-2xl border border-white/10 p-5 backdrop-blur-md">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-text-primary text-base font-bold">{role}</h3>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-tertiary hover:text-text-primary mt-0.5 inline-flex items-center gap-1 text-sm transition-colors"
                      >
                        {job.organization}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <span className="text-text-muted shrink-0 text-xs font-bold">{period}</span>
                  </div>
                  {desc && (
                    <p className="text-text-tertiary mt-3 text-sm leading-relaxed">{desc}</p>
                  )}
                </div>
              </m.div>
            )
          })}
        </div>
      </m.section>

      <div className="grid gap-8 md:grid-cols-2">
        <m.section variants={containerVariants()} className="mb-12 md:mb-0">
          <SectionTitle
            icon={<BookOpen className="h-5 w-5" />}
            title={t.sections.resume.expertiseTitle}
          />
          <div className="space-y-2">
            {siteConfig.expertise.map((item) => (
              <m.div
                key={item}
                variants={staggerItemVariants()}
                className="bg-bg-badge text-text-secondary border-border-subtle flex items-center gap-3 rounded-xl border border-white/5 px-4 py-2.5 text-sm font-medium"
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/60" />
                {item}
              </m.div>
            ))}
          </div>
        </m.section>

        <m.section variants={containerVariants()}>
          <SectionTitle
            icon={<Code2 className="h-5 w-5" />}
            title={t.sections.resume.skillsTitle}
          />
          <div className="flex flex-wrap gap-2">
            {siteConfig.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-bg-card text-text-secondary border-border-subtle rounded-xl border border-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <SectionTitle
              icon={<Award className="h-5 w-5" />}
              title={t.sections.resume.certificationsTitle}
            />
            <div className="bg-bg-card border-border-subtle space-y-2 rounded-2xl border border-white/10 p-5 backdrop-blur-md">
              <p className="text-text-primary text-sm font-bold">{siteConfig.certification.name}</p>
              <p className="text-text-tertiary text-xs">{siteConfig.certification.provider}</p>
              <div className="flex items-center gap-2">
                <span className="light:text-amber-800 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-black text-amber-400 uppercase">
                  {siteConfig.certification.status}
                </span>
                <span className="text-text-muted text-[10px] font-bold">
                  {siteConfig.certification.expectedDate}
                </span>
              </div>
              <p className="text-text-muted text-xs font-medium">
                {siteConfig.certification.details}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`/${t.lang === 'es' ? 'es/' : ''}`}
              className="text-text-tertiary hover:text-text-primary flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              &larr; {t.lang === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>
        </m.section>
      </div>
    </m.main>
  )
}
