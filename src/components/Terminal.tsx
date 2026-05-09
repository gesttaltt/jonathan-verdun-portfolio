'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTerminal, CommandEntry } from './hooks/useTerminal'
import { ICommandProcessor, DefaultCommandProcessor } from '@/lib/services/CommandProcessor'
import { TERMINAL_PROMPT } from '@/lib/contracts/TerminalContract'

interface TerminalProps {
  commands: CommandEntry[] | readonly CommandEntry[]
  className?: string
  processor?: ICommandProcessor
  title?: string
  prompt?: string
  hintCmd?: string
}

export const Terminal: React.FC<TerminalProps> = ({
  commands,
  className = '',
  processor = new DefaultCommandProcessor(),
  title = 'bash — interactive',
  prompt = TERMINAL_PROMPT,
  hintCmd = 'help',
}) => {
  const { history, isBooting, execute, navigateHistory } = useTerminal(commands, processor)
  const [inputVal, setInputVal] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    /* istanbul ignore next -- scrollTop is a no-op in jsdom; null ref unreachable in practice */
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, isBooting])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isBooting) return

    if (e.key === 'Enter') {
      execute(inputVal)
      setInputVal('')
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      execute('clear')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault() // prevent cursor jumping to input start
      setInputVal(navigateHistory('up', inputVal))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault() // prevent cursor jumping to input end
      setInputVal(navigateHistory('down', inputVal))
    }
  }

  return (
    <div
      role="group"
      className={`flex w-full max-w-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-black/80 font-mono text-xs shadow-2xl backdrop-blur-lg md:text-sm lg:text-base ${className}`}
      onClick={() => !isBooting && inputRef.current?.focus()}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-amber-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-cyan-500/50"></div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-300 uppercase sm:text-xs">
          {title}
          <div className="relative flex h-2 w-2">
            <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40 opacity-75"></div>
            <div className="relative inline-flex h-2 w-2 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <div className="w-12"></div>
      </div>
      <p id="terminal-hint" className="sr-only">
        Type &apos;{hintCmd}&apos; for available commands
      </p>

      <div
        ref={scrollRef}
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        aria-busy={isBooting}
        tabIndex={0}
        className="custom-scrollbar relative h-[240px] w-full overflow-x-hidden overflow-y-auto p-4 focus:outline-none sm:h-[280px] md:h-[400px] md:p-6"
      >
        <div className="space-y-4 pb-2">
          {history.map((entry, index) => (
            <div key={entry.id ?? index} className="space-y-2 break-words">
              <div className="flex gap-2">
                <span className="shrink-0 font-bold text-blue-500">
                  <span className="hidden sm:inline">{prompt}</span>~$
                </span>
                <span className="min-w-0 text-zinc-100">{entry.text}</span>
              </div>
              {entry.output && (
                <div className="border-l-2 border-blue-500/20 py-1 pl-4 whitespace-pre-wrap text-zinc-300">
                  {entry.output}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className={`flex items-center gap-2 pt-2 transition-opacity duration-300 ${isBooting ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          <span className="shrink-0 font-bold text-blue-500">
            <span className="hidden sm:inline">{prompt}</span>~$
          </span>
          <div className="relative min-w-0 flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              disabled={isBooting}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              /* font-size ≥ 16px on mobile prevents iOS Safari from zooming the viewport on focus */
              className="w-full bg-transparent text-base text-zinc-100 outline-none placeholder:text-zinc-700 disabled:cursor-not-allowed sm:text-xs md:text-sm lg:text-base"
              aria-label="Terminal command input"
              aria-describedby="terminal-hint"
              inputMode="text"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
