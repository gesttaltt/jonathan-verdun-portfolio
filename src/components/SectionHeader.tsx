'use client'

import { m } from 'framer-motion'
import React from 'react'

interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
  color?: 'blue' | 'purple' | 'cyan' | 'green'
  showAccentLine?: boolean
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
  icon,
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
      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`mb-6 flex items-center gap-4 ${showBorderBottom ? 'border-b border-white/10 pb-4' : ''}`}
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.badge}`}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </m.div>
    </>
  )
}
