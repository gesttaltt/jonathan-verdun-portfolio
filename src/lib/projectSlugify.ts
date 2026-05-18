import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const slugToId = new Map(PROJECT_DATA.map((p) => [slugify(p.title), p.id]))
