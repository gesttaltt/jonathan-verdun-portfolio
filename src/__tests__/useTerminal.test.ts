import { renderHook, act } from '@testing-library/react'
import { useTerminal } from '@/components/hooks/useTerminal'
import type { ICommandProcessor } from '@/lib/services/CommandProcessor'

const makeProcessor = (): ICommandProcessor => ({
  process: jest.fn((cmd: string) => `echo: ${cmd}`),
})

describe('useTerminal', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('starts in booting state with empty history', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    expect(result.current.isBooting).toBe(true)
    expect(result.current.history).toHaveLength(0)
  })

  it('replays boot commands sequentially using accumulated delays', () => {
    const commands = [
      { text: 'whoami', output: 'gestalt', delay: 100 },
      { text: 'ls', output: 'file.txt', delay: 200 },
    ]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0].text).toBe('whoami')

    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(result.current.history).toHaveLength(2)
    expect(result.current.history[1].text).toBe('ls')
  })

  it('marks isBooting false 500ms after the last command fires', () => {
    const commands = [{ text: 'boot', output: 'ok', delay: 100 }]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    act(() => {
      jest.advanceTimersByTime(100 + 499)
    })
    expect(result.current.isBooting).toBe(true)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.isBooting).toBe(false)
  })

  it('execute() appends a user entry with processor output', () => {
    const processor = makeProcessor()
    const { result } = renderHook(() => useTerminal([], processor))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('help')
    })

    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0]).toMatchObject({ text: 'help', isUser: true })
    expect(processor.process).toHaveBeenCalledWith('help')
  })

  it('execute("clear") resets history to empty', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('help')
    })
    expect(result.current.history).toHaveLength(1)

    act(() => {
      result.current.execute('clear')
    })
    expect(result.current.history).toHaveLength(0)
  })

  it('execute("limpiar") also resets history (ES alias for clear)', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('help')
    })
    expect(result.current.history).toHaveLength(1)

    act(() => {
      result.current.execute('limpiar')
    })
    expect(result.current.history).toHaveLength(0)
  })

  it('execute() is a no-op for blank/whitespace input', () => {
    const processor = makeProcessor()
    const { result } = renderHook(() => useTerminal([], processor))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('   ')
    })

    expect(result.current.history).toHaveLength(0)
    expect(processor.process).not.toHaveBeenCalled()
  })

  it('uses the 800ms fallback when a command has delay: 0 or no delay', () => {
    // Covers the `cmd.delay || 800` fallback branch in useTerminal.ts
    const commands = [{ text: 'boot', output: 'ok', delay: 0 }]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    act(() => {
      jest.advanceTimersByTime(799)
    })
    expect(result.current.history).toHaveLength(0)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0].text).toBe('boot')
  })

  it('clears all pending timeouts on unmount', () => {
    const spy = jest.spyOn(global, 'clearTimeout')
    const commands = [{ text: 'cmd', output: 'out', delay: 500 }]
    const { unmount } = renderHook(() => useTerminal(commands, makeProcessor()))

    unmount()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
