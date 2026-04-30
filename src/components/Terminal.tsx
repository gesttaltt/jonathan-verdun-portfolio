'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTerminal, CommandEntry } from './hooks/useTerminal'
import { ICommandProcessor, DefaultCommandProcessor } from '@/lib/services/CommandProcessor'

interface TerminalProps {
  commands: CommandEntry[] | readonly CommandEntry[]
  className?: string
  processor?: ICommandProcessor
  title?: string
}

export const Terminal: React.FC<TerminalProps> = ({
  commands,
  className = '',
  processor = new DefaultCommandProcessor(),
  title = 'bash — interactive',
}) => {
  const { history, isBooting, execute } = useTerminal(commands, processor)
  const [inputVal, setInputVal] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    /* c8 ignore next 3 */
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, isBooting])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      execute(inputVal)
      setInputVal('')
    }
  }

  return (
    <div
      className={`glass-dark flex w-full max-w-full flex-col overflow-hidden rounded-xl font-mono text-xs shadow-2xl md:text-sm lg:text-base ${className}`}
      onClick={() => !isBooting && inputRef.current?.focus()}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-amber-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-cyan-500/50"></div>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">{title}</div>
        <div className="w-12"></div>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        className="custom-scrollbar relative h-[240px] w-full overflow-x-hidden overflow-y-auto p-4 sm:h-[280px] md:h-[400px] md:p-6"
      >
        <div className="space-y-4 pb-2">
          {history.map((entry, index) => (
            <div key={entry.id ?? index} className="space-y-2 break-words">
              <div className="flex gap-2">
                <span className="shrink-0 font-bold text-blue-500">
                  <span className="hidden sm:inline">gestalt@portfolio:</span>~$
                </span>
                <span className="min-w-0 text-zinc-100">{entry.text}</span>
              </div>
              {entry.output && (
                <div className="border-l-2 border-blue-500/20 py-1 pl-4 whitespace-pre-wrap text-zinc-400">
                  {entry.output}
                </div>
              )}
            </div>
          ))}
        </div>

        {!isBooting && (
          <div className="flex items-center gap-2 pt-2">
            <span className="shrink-0 font-bold text-blue-500">
              <span className="hidden sm:inline">gestalt@portfolio:</span>~$
            </span>
            <div className="relative min-w-0 flex-grow">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                /* font-size ≥ 16px on mobile prevents iOS Safari from zooming the viewport on focus */
                className="w-full bg-transparent text-base text-zinc-100 outline-none placeholder:text-zinc-700 sm:text-xs md:text-sm lg:text-base"
                aria-label="Terminal command input"
                inputMode="text"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
