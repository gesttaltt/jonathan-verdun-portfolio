'use client'

import React from 'react'
import { m } from 'framer-motion'
import { ExternalLink, ShieldCheck, ArrowLeft, Terminal, Code2, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { ProjectSpec } from '@/lib/contracts/ProjectContract.types'
import { containerVariants, staggerItemVariants } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'

const STATUS_STYLES: Record<ProjectSpec['status'], string> = {
  Deployed: 'bg-green-500/20 text-green-400 light:text-green-800 light:bg-green-500/10',
  QA: 'bg-blue-500/20 text-blue-400 light:text-blue-800 light:bg-blue-500/10',
  Research: 'bg-purple-500/20 text-purple-400 light:text-purple-800 light:bg-purple-500/10',
  Prototype: 'bg-amber-500/20 text-amber-400 light:text-amber-800 light:bg-amber-500/10',
  Archived: 'bg-zinc-500/20 text-zinc-300 light:text-zinc-800 light:bg-zinc-500/10',
}

interface ProjectDetailProps {
  projectId: string
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const t = useTranslation()
  const project = t.projects.find((p) => p.id === projectId)

  if (!project) return null

  return (
    <m.main
      variants={containerVariants()}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24"
    >
      <m.div variants={staggerItemVariants()}>
        <Link
          href={`/${t.lang === 'es' ? 'es/' : ''}#projects-section-title`}
          className="group mb-8 flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-400 uppercase transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          {t.lang === 'es' ? 'Volver a Proyectos' : 'Back to Projects'}
        </Link>
      </m.div>

      <m.header
        variants={staggerItemVariants()}
        className="border-border-subtle space-y-6 border-b border-white/10 pb-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded px-3 py-1 text-[11px] font-black tracking-wider uppercase sm:text-xs ${STATUS_STYLES[project.status] ?? 'bg-zinc-500/20 text-zinc-300'}`}
          >
            {project.status}
          </span>
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
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
              {t.lang === 'es' ? 'Resumen del Proyecto' : 'Project Overview'}
            </h2>
            <p className="text-text-tertiary text-sm leading-relaxed">{project.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-text-primary flex items-center gap-2 text-lg font-bold">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              {t.lang === 'es' ? 'Tecnologías' : 'Tech Stack'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-bg-badge text-text-secondary border-border-subtle rounded-lg border px-3 py-1.5 text-sm font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </m.div>

        <m.div variants={staggerItemVariants()} className="space-y-4 lg:col-span-1">
          {project.stats && (
            <div className="bg-bg-card border-border-subtle space-y-4 rounded-2xl border border-white/10 p-5">
              <h3 className="text-text-secondary flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <Terminal className="h-4 w-4" />
                {t.lang === 'es' ? 'Métricas' : 'Metrics'}
              </h3>
              <div className="space-y-3">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
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
                {t.lang === 'es' ? 'Ver en GitHub' : 'View on GitHub'}
              </a>
            )}
            {project.specLink && (
              <Link
                href={project.specLink}
                className="text-text-tertiary hover:text-text-primary group flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold transition-all hover:border-blue-500/30"
              >
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                {t.lang === 'es' ? 'Ver Especificaciones QA' : 'View QA Specifications'}
              </Link>
            )}
          </div>
        </m.div>
      </div>
    </m.main>
  )
}
