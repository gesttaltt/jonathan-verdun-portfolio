'use client'

import { m } from 'framer-motion'
import React from 'react'
import { fadeUpVariants, SCROLL_VIEWPORT } from '@/lib/animations'

interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
  id?: string
  color?: 'blue' | 'purple' | 'cyan' | 'green'
  showAccentLine?: boolean
  showBorderBottom?: boolean
}

const COLOR_MAP = {
  blue: {
    badge: 'bg-blue-500/10 text-blue-500 light:text-blue-700 light:bg-blue-50',
    line: 'via-blue-500/20 light:via-blue-500/10',
  },
  purple: {
    badge: 'bg-purple-500/10 text-purple-500 light:text-purple-700 light:bg-purple-50',
    line: 'via-purple-500/20 light:via-purple-500/10',
  },
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-500 light:text-cyan-700 light:bg-cyan-50',
    line: 'via-cyan-500/20 light:via-cyan-500/10',
  },
  green: {
    badge: 'bg-green-500/10 text-green-500 light:text-green-700 light:bg-green-50',
    line: 'via-green-500/20 light:via-green-500/10',
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
        className={`mb-6 flex items-center gap-4 ${showBorderBottom ? 'light:border-zinc-100 border-b border-white/10 pb-4' : ''}`}
      >
        <div
          aria-hidden="true"
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.badge}`}
        >
          {icon}
        </div>
        <h2 id={id} className="light:text-zinc-950 text-2xl font-bold text-white">
          {title}
        </h2>
      </m.div>
    </>
  )
}
