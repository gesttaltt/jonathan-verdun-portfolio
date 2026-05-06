'use client'

import React from 'react'
import { m } from 'framer-motion'
import { useProjects } from '@/components/hooks/useProjects'
import { ProjectCard } from './ProjectCard'
import { containerVariants, SCROLL_VIEWPORT } from '@/lib/animations'

export const ProjectGallery: React.FC = () => {
  const projects = useProjects()

  return (
    <m.div
      role="list"
      variants={containerVariants(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </m.div>
  )
}
