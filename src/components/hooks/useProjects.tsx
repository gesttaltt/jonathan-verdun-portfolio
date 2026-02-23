'use client'

import React, { createContext, useContext, useState } from 'react'
import { IProjectRepository, StaticProjectAdapter } from '@/lib/services/ProjectRepository'

// Create the context containing the repository instance
const ProjectRepositoryContext = createContext<IProjectRepository | null>(null)

interface ProjectProviderProps {
  children: React.ReactNode
  adapter?: IProjectRepository // Allows injecting a mock/test adapter or future CMS adapter
}

/**
 * Provides the Project Repository (Data Adapter) to the React component tree.
 * Defaults to the StaticProjectAdapter if none is provided.
 */
export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children, adapter }) => {
  // Use state initializer to ensure adapter is only created once per provider lifecycle
  const [repo] = useState<IProjectRepository>(() => adapter || new StaticProjectAdapter())

  return (
    <ProjectRepositoryContext.Provider value={repo}>{children}</ProjectRepositoryContext.Provider>
  )
}

/**
 * Hook to consume projects from the injected repository.
 */
export const useProjects = () => {
  const context = useContext(ProjectRepositoryContext)

  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }

  return context.getProjects()
}
