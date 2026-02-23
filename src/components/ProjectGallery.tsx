'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { ProjectService } from '@/lib/contracts/ProjectContract'
import { ExternalLink, Terminal, GitBranch, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export const ProjectGallery: React.FC = () => {
  const projects = ProjectService.getProjects()

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          {/* Glowing Corner */}
          <div className="absolute top-0 right-0 h-16 w-16 translate-x-8 -translate-y-8 rotate-45 bg-blue-500/10 blur-xl transition-all duration-500 group-hover:bg-blue-500/20" />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-blue-500" />
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                    project.status === 'Deployed'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'Research'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {project.status}
                </span>
              </div>
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="rounded-full bg-white/5 p-1.5 text-zinc-400 transition-colors hover:bg-blue-500/20 hover:text-white"
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
            {/* Stats (if any) */}
            {project.stats && (
              <div className="flex gap-4 border-t border-white/5 pt-4">
                {project.stats.map((stat, j) => (
                  <div key={j}>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase">
                      {stat.label}
                    </div>
                    <div className="font-mono text-xs font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-white/5 bg-black/20 px-2 py-1 text-[10px] text-zinc-400 transition-colors group-hover:border-blue-500/20 group-hover:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
