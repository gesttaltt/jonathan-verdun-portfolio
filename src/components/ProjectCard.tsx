'use client'

import React from 'react'
import { m } from 'framer-motion'
import { ExternalLink, Terminal } from 'lucide-react'
import Link from 'next/link'
import { ProjectSpec } from '@/lib/contracts/ProjectContract.types'
import { fadeUpVariants } from '@/lib/animations'
import { uiConfig } from '@/lib/uiConfig'

interface ProjectCardProps {
  project: ProjectSpec
  index: number
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <m.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeUpVariants(index * 0.1)}
      role="listitem"
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_var(--glow-blue)]"
    >
      {/* Glowing Corner */}
      <div className="absolute top-0 right-0 h-16 w-16 translate-x-8 -translate-y-8 rotate-45 bg-blue-500/10 blur-xl transition-all duration-500 group-hover:bg-blue-500/20" />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-blue-500" />
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase sm:text-xs ${uiConfig.projectStatusStyles[project.status] ?? 'bg-zinc-500/20 text-zinc-400'}`}
            >
              {project.status}
            </span>
          </div>
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub (opens in new tab)`}
              className="focus-visible:ring-offset-background flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/5 p-2.5 text-zinc-400 transition-colors hover:bg-blue-500/20 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-zinc-400">{project.description}</p>
      </div>

      <div className="space-y-4">
        {project.stats && (
          <div className="flex gap-4 border-t border-white/5 pt-4">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-[10px] font-bold text-zinc-500 uppercase sm:text-xs">
                  {stat.label}
                </div>
                <div className="font-mono text-xs font-semibold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/5 bg-black/20 px-2 py-1 text-[10px] text-zinc-400 transition-colors group-hover:border-blue-500/20 group-hover:text-blue-200 sm:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </m.div>
  )
}
