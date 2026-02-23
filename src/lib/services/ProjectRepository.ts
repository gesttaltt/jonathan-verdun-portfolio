import { ProjectSpec } from '../contracts/ProjectContract.types'
import { ProjectService } from '../contracts/ProjectContract'

/**
 * Interface for decoupling UI components from static data sources.
 * Any future data source (CMS, API, Database) must implement this.
 */
export interface IProjectRepository {
  getProjects(): ProjectSpec[]
}

/**
 * Concrete implementation that fetches projects from the existing
 * static JSON-style contract (ProjectService).
 */
export class StaticProjectAdapter implements IProjectRepository {
  getProjects(): ProjectSpec[] {
    return ProjectService.getProjects()
  }
}
