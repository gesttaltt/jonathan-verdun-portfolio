'use client'

import { m } from 'framer-motion'
import React from 'react'
import { fadeUpVariants, SCROLL_VIEWPORT } from '@/lib/animations'

interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
  id?: string
  color?: 'blue' | 'purple' | 'cyan' | 'green' | 'amber'
  showAccentLine?: boolean
  showBorderBottom?: boolean
}

const COLOR_MAP = {
  blue: {
    badge: 'bg-blue-500/10 text-blue-400 light:text-blue-800 light:bg-blue-100',
    line: 'via-blue-500/20 light:via-blue-500/10',
  },
  purple: {
    badge: 'bg-purple-500/10 text-purple-400 light:text-purple-800 light:bg-purple-100',
    line: 'via-purple-500/20 light:via-purple-500/10',
  },
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-400 light:text-cyan-800 light:bg-cyan-100',
    line: 'via-cyan-500/20 light:via-cyan-500/10',
  },
  green: {
    badge: 'bg-green-500/10 text-green-400 light:text-green-800 light:bg-green-100',
    line: 'via-green-500/20 light:via-green-500/10',
  },
  amber: {
    badge: 'bg-amber-500/10 text-amber-400 light:text-amber-800 light:bg-amber-100',
    line: 'via-amber-500/20 light:via-amber-500/10',
  },
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  id,
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
      <m.div
        variants={fadeUpVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={SCROLL_VIEWPORT}
        className={`group shimmer-scan mb-6 flex items-center gap-4 ${showBorderBottom ? 'light:border-zinc-100 border-b border-white/10 pb-4' : ''}`}
      >
        <div
          aria-hidden="true"
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.badge}`}
        >
          {icon}
        </div>
        <h2
          id={id}
          className="light:text-text-primary light:font-extrabold text-2xl font-bold text-white"
        >
          {title}
        </h2>
      </m.div>
    </>
  )
}
