'use client'

import React from 'react'
import { m } from 'framer-motion'
import {
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  Terminal,
  Code2,
  BarChart3,
  Lightbulb,
  Workflow,
  Link2,
} from 'lucide-react'
import Link from 'next/link'
import {
  PROJECT_STATUS_STYLES,
  PROJECT_STATUS_STYLE_FALLBACK,
} from '@/lib/contracts/ProjectContract'
import { containerVariants, staggerItemVariants } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'
import { localizedHref } from '@/lib/i18n/localizedHref'

interface ProjectDetailProps {
  projectId: string
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const t = useTranslation()
  const project = t.projects.find((p) => p.id === projectId)

  if (!project) {
    console.warn(`[ProjectDetail] Project not found for id: ${projectId}`)
    return null
  }

  return (
    <m.main
      id="main-content"
      variants={containerVariants()}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24"
    >
      <m.div variants={staggerItemVariants()}>
        <Link
          href={localizedHref(t.lang, '/#projects-section-title')}
          className="text-text-muted hover:text-text-primary group mb-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          {t.sections.projectDetail.backToProjects}
        </Link>
      </m.div>

      <m.header
        variants={staggerItemVariants()}
        className="border-border-subtle space-y-6 border-b border-white/10 pb-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded px-3 py-1 text-[11px] font-black tracking-wider uppercase sm:text-xs ${PROJECT_STATUS_STYLES[project.status] ?? /* istanbul ignore next — all known statuses in STYLES */ PROJECT_STATUS_STYLE_FALLBACK}`}
          >
            {project.status}
          </span>
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="bg-bg-badge text-text-tertiary rounded border border-white/5 px-2 py-0.5 text-[10px] font-bold sm:text-xs"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-text-muted text-[10px] font-bold sm:text-xs">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <h1 className="text-text-primary text-3xl font-extrabold tracking-tighter sm:text-5xl">
          {project.title}
        </h1>
      </m.header>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <m.div variants={staggerItemVariants()} className="space-y-6 lg:col-span-2">
          <div className="space-y-4">
            <h2 className="text-text-primary flex items-center gap-2 text-lg font-bold">
              <Code2 className="h-5 w-5 text-blue-400" />
              {t.sections.projectDetail.overview}
            </h2>
            <p className="text-text-tertiary text-sm leading-relaxed">{project.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-text-primary flex items-center gap-2 text-lg font-bold">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              {t.sections.projectDetail.techStack}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="bg-bg-badge text-text-secondary border-border-subtle rounded-lg border px-3 py-1.5 text-sm font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-text-primary flex items-center gap-2 text-lg font-bold">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                {t.sections.projectDetail.keyResults}
              </h2>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-text-tertiary flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.architecture && (
            <div className="space-y-4">
              <h2 className="text-text-primary flex items-center gap-2 text-lg font-bold">
                <Workflow className="h-5 w-5 text-violet-400" />
                {t.sections.projectDetail.architecture}
              </h2>
              <p className="text-text-tertiary text-sm leading-relaxed">{project.architecture}</p>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-text-primary flex items-center gap-2 text-lg font-bold">
                <Link2 className="h-5 w-5 text-emerald-400" />
                {t.sections.projectDetail.relatedLinks}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.links.map((link, index) => (
                  <a
                    key={`${link.label}-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border-subtle text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold transition-all hover:border-blue-500/30"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </m.div>

        <m.div variants={staggerItemVariants()} className="space-y-4 lg:col-span-1">
          {project.stats && (
            <div className="bg-bg-card border-border-subtle space-y-4 rounded-2xl border border-white/10 p-5">
              <h3 className="text-text-secondary flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <Terminal className="h-4 w-4" />
                {t.sections.projectDetail.metrics}
              </h3>
              <div className="space-y-3">
                {project.stats.map((stat, index) => (
                  <div key={`${stat.label}-${index}`}>
                    <div className="text-text-muted text-[11px] font-black uppercase">
                      {stat.label}
                    </div>
                    <div className="text-text-primary font-mono text-2xl font-black tracking-tight">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="light:bg-zinc-950 light:hover:bg-black light:text-white focus-visible:ring-offset-background group flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black transition-all hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
              >
                <ExternalLink className="h-4 w-4" />
                {t.sections.projectDetail.viewOnGithub}
              </a>
            )}
            {project.specLink && (
              <Link
                href={project.specLink}
                className="text-text-tertiary hover:text-text-primary group flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold transition-all hover:border-blue-500/30"
              >
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                {t.sections.projectDetail.viewQaSpecs}
              </Link>
            )}
          </div>
        </m.div>
      </div>
    </m.main>
  )
}
