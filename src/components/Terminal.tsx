'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Command {
  text: string
  output: string | React.ReactNode
  delay?: number
}

interface TerminalProps {
  commands: Command[]
  className?: string
}

export const Terminal: React.FC<TerminalProps> = ({ commands, className = '' }) => {
  const [visibleCommands, setVisibleCommands] = useState<number>(0)

  useEffect(() => {
    if (visibleCommands < commands.length) {
      const timer = setTimeout(() => {
        setVisibleCommands((prev) => prev + 1)
      }, commands[visibleCommands].delay || 1000)
      return () => clearTimeout(timer)
    }
  }, [visibleCommands, commands])

  return (
    <div
      className={`glass-dark overflow-hidden rounded-xl font-mono text-sm shadow-2xl md:text-base ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-amber-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-cyan-500/50"></div>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          bash — 80x24
        </div>
        <div className="w-12"></div>
      </div>

      {/* Terminal Body */}
      <div className="custom-scrollbar crt relative max-h-[500px] space-y-4 overflow-y-auto p-6">
        <div className="scanline"></div>

        <AnimatePresence>
          {commands.slice(0, visibleCommands + 1).map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex gap-2">
                <span className="font-bold text-blue-500">gestalt@portfolio:~$</span>
                <span className="text-zinc-100">
                  {index === visibleCommands ? <TypingText text={cmd.text} speed={50} /> : cmd.text}
                </span>
              </div>

              {visibleCommands > index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-l border-blue-500/20 py-1 pl-4 text-zinc-400"
                >
                  {cmd.output}
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        {visibleCommands === commands.length && (
          <div className="flex gap-2">
            <span className="font-bold text-blue-500">gestalt@portfolio:~$</span>
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-5 w-2 bg-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  )
}

const TypingText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1))
      i++
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return <span>{displayedText}</span>
}
