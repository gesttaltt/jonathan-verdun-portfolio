/**
 * @file uiConfig.ts
 * Centralized UI configurations, such as consistent color mappings,
 * styling tokens, and layout variables that don't belong in CSS variables.
 */

export const uiConfig = {
  projectStatusStyles: {
    Deployed: 'bg-green-500/20 text-green-400',
    Research: 'bg-purple-500/20 text-purple-400',
    Prototype: 'bg-amber-500/20 text-amber-400',
    Archived: 'bg-zinc-500/20 text-zinc-400',
  } as Record<string, string>,
} as const
