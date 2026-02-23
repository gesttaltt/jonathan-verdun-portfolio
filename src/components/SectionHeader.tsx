'use client'

import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  /** The Lucide icon to display in the badge */
  icon: LucideIcon
  /** Section heading text */
  title: string
  /** Tailwind color token for the icon badge, e.g. 'blue', 'purple', 'cyan' */
  color?: 'blue' | 'purple' | 'cyan' | 'green'
  /** Whether to show the vertical left-side glow line (only in the lg grid layout) */
  showAccentLine?: boolean
  /** Whether to show a bottom border separator */
  showBorderBottom?: boolean
}

const COLOR_MAP = {
  blue: {
    badge: 'bg-blue-500/10 text-blue-500',
    line: 'via-blue-500/20',
  },
  purple: {
    badge: 'bg-purple-500/10 text-purple-500',
    line: 'via-purple-500/20',
  },
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-500',
    line: 'via-cyan-500/20',
  },
  green: {
    badge: 'bg-green-500/10 text-green-500',
    line: 'via-green-500/20',
  },
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  color = 'blue',
  showAccentLine = false,
  showBorderBottom = false,
}) => {
  const colors = COLOR_MAP[color]

  return (
    <>
      {showAccentLine && (
        <div
          className={`absolute top-0 -left-12 hidden h-full w-px bg-gradient-to-b from-transparent ${colors.line} to-transparent lg:block`}
        />
      )}
      <div
        className={`mb-6 flex items-center gap-4 ${showBorderBottom ? 'border-b border-white/10 pb-4' : ''}`}
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.badge}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
    </>
  )
}
