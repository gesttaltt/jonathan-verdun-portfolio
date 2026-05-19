import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { slugify, slugToId } from '@/lib/projectSlugify'

describe('projectSlugify', () => {
  it('slugifies punctuation and casing correctly', () => {
    expect(slugify('My Awesome Project!')).toBe('my-awesome-project')
    expect(slugify('  QA   Arxiv   Mobile  ')).toBe('qa-arxiv-mobile')
    expect(slugify('C++ & Spark')).toBe('c-spark')
  })

  it('creates slug-to-id map for all projects', () => {
    expect(slugToId.size).toBe(PROJECT_DATA.length)
  })

  it('maps each project title slug to its project id', () => {
    for (const project of PROJECT_DATA) {
      expect(slugToId.get(slugify(project.title))).toBe(project.id)
    }
  })
})
