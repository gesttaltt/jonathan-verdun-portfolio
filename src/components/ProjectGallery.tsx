'use client'

import React from 'react'
import { useProjects } from '@/components/hooks/useProjects'
import { ProjectCard } from './ProjectCard'

export const ProjectGallery: React.FC = () => {
  const projects = useProjects()

  return (
    <div role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  )
}
