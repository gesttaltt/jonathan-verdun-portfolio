'use client'

import React from 'react'
import { m } from 'framer-motion'
import { ExternalLink, Terminal, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ProjectSpec } from '@/lib/contracts/ProjectContract.types'
import { fadeUpVariants } from '@/lib/animations'

const PROJECT_STATUS_STYLES: Record<ProjectSpec['status'], string> = {
  Deployed: 'bg-green-500/20 text-green-400 light:text-green-800 light:bg-green-500/10',
  QA: 'bg-blue-500/20 text-blue-400 light:text-blue-800 light:bg-blue-500/10',
  Research: 'bg-purple-500/20 text-purple-400 light:text-purple-800 light:bg-purple-500/10',
  Prototype: 'bg-amber-500/20 text-amber-400 light:text-amber-800 light:bg-amber-500/10',
  Archived: 'bg-zinc-500/20 text-zinc-300 light:text-zinc-800 light:bg-zinc-500/10',
}

interface ProjectCardProps {
  project: ProjectSpec
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <m.div
      variants={fadeUpVariants()}
      role="listitem"
      data-testid={`project-card-${project.id}`}
      className="group bg-bg-card hover:bg-bg-card-hover border-border-subtle hover:border-border-strong light:hover:shadow-2xl light:hover:shadow-blue-500/10 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_var(--glow-blue)]"
    >
      {/* Glowing Corner */}
      <div className="light:bg-blue-500/10 absolute top-0 right-0 h-16 w-16 translate-x-8 -translate-y-8 rotate-45 bg-blue-500/10 blur-xl transition-all duration-500 group-hover:bg-blue-500/20" />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="light:text-blue-600 h-5 w-5 text-blue-500" />
            <span
              className={`rounded px-2 py-0.5 text-[11px] font-black tracking-wider uppercase sm:text-xs ${PROJECT_STATUS_STYLES[project.status] ?? 'text-text-primary bg-zinc-500/20'}`}
            >
              {project.status}
            </span>
          </div>
          <div className="flex gap-2">
            {project.specLink && (
              <Link
                href={project.specLink}
                aria-label={`View ${project.title} specification`}
                className="focus-visible:ring-offset-background light:bg-bg-badge light:text-text-tertiary light:hover:bg-purple-100 light:hover:text-purple-800 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/5 p-2.5 text-zinc-300 transition-colors hover:bg-purple-500/20 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <ShieldCheck className="h-4 w-4" />
              </Link>
            )}
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                className="focus-visible:ring-offset-background light:bg-bg-badge light:text-text-tertiary light:hover:bg-blue-100 light:hover:text-blue-800 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/5 p-2.5 text-zinc-300 transition-colors hover:bg-blue-500/20 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <h3 className="light:group-hover:text-blue-700 text-text-primary mb-2 text-base font-bold transition-colors group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="text-text-tertiary mb-6 text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="space-y-4">
        {project.stats && (
          <div className="light:border-border-subtle flex gap-4 border-t border-white/10 pt-4">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-text-muted text-[11px] font-black uppercase sm:text-xs">
                  {stat.label}
                </div>
                <div className="text-text-secondary font-mono text-xs font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="light:border-border-subtle light:bg-bg-card-hover text-text-tertiary light:group-hover:border-blue-200 light:group-hover:text-blue-800 bg-bg-badge rounded border border-white/5 px-2 py-1 text-[11px] font-bold transition-colors group-hover:border-blue-500/20 group-hover:text-blue-200 sm:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </m.div>
  )
}
