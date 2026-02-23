'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INTERACTIVE_COMMANDS } from '@/lib/contracts/TerminalContract'

interface Command {
  text: string
  output: string | React.ReactNode
  delay?: number
  isUser?: boolean
}

interface TerminalProps {
  commands: Command[] | readonly Command[]
  className?: string
}

export const Terminal: React.FC<TerminalProps> = ({ commands, className = '' }) => {
  const [history, setHistory] = useState<Command[]>([])
  const [inputVal, setInputVal] = useState('')
  const [isBooting, setIsBooting] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Boot sequence effect
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    let currentDelay = 0

    const boot = async () => {
      for (const cmd of commands) {
        const delay = cmd.delay || 800
        currentDelay += delay
        const timeout = setTimeout(() => {
          setHistory((prev) => [...prev, { ...cmd, isUser: false }])
        }, currentDelay)
        timeouts.push(timeout)
      }

      const finishTimeout = setTimeout(() => {
        setIsBooting(false)
        // Auto-focus input after boot
        if (inputRef.current) inputRef.current.focus()
      }, currentDelay + 500)
      timeouts.push(finishTimeout)
    }

    boot()

    return () => timeouts.forEach(clearTimeout)
  }, [commands])

  // Auto-scroll effect
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, isBooting])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim()
      if (!cmd) return

      if (cmd.toLowerCase() === 'clear') {
        setHistory([])
        setInputVal('')
        return
      }

      // Add user command to history
      const newEntry: Command = {
        text: cmd,
        output: processCommand(cmd),
        isUser: true,
      }

      setHistory((prev) => [...prev, newEntry])
      setInputVal('')
    }
  }

  const processCommand = (cmd: string): string => {
    const lowerCmd = cmd.toLowerCase().trim()
    if (INTERACTIVE_COMMANDS[lowerCmd]) {
      return INTERACTIVE_COMMANDS[lowerCmd]
    }
    return `bash: ${cmd}: command not found. Type 'help' for available commands.`
  }

  return (
    <div
      className={`glass-dark w-full max-w-full overflow-hidden rounded-xl font-mono text-xs shadow-2xl md:text-sm lg:text-base ${className} flex flex-col`}
      onClick={() => !isBooting && inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-amber-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-cyan-500/50"></div>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          bash — interactive
        </div>
        <div className="w-12"></div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="custom-scrollbar crt relative h-[400px] w-full overflow-x-hidden overflow-y-auto p-4 md:p-6"
      >
        <div className="scanline pointer-events-none absolute inset-0 z-50"></div>

        <div className="space-y-4 pb-2">
          {history.map((entry, index) => (
            <div key={index} className="space-y-2 break-words">
              <div className="flex gap-2">
                <span className="shrink-0 font-bold text-blue-500">gestalt@portfolio:~$</span>
                <span className="text-zinc-100">{entry.text}</span>
              </div>
              {entry.output && (
                <div className="border-l-2 border-blue-500/20 py-1 pl-4 whitespace-pre-wrap text-zinc-400">
                  {entry.output}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        {!isBooting && (
          <div className="flex items-center gap-2 pt-2">
            <span className="shrink-0 font-bold text-blue-500">gestalt@portfolio:~$</span>
            <div className="relative flex-grow">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-zinc-100 outline-none placeholder:text-zinc-700"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              {/* Blinking Cursor if focused (handled by native caret mostly, but we can style) */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
