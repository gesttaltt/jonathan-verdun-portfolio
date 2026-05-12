import { DefaultCommandProcessor, ICommandProcessor } from '@/lib/services/CommandProcessor'

describe('DefaultCommandProcessor', () => {
  let processor: ICommandProcessor
  const mockProjects = [
    { id: 'p1', title: 'QA Arxiv Mobile' },
    { id: 'p2', title: '3-Adic ML' },
  ]

  beforeEach(() => {
    processor = new DefaultCommandProcessor(undefined, 'help', mockProjects)
  })

  it('returns help text for the "help" command', () => {
    expect(processor.process('help').output).toContain('Available commands')
  })

  it('is case-insensitive', () => {
    expect(processor.process('HELP').output).toContain('Available commands')
  })

  it('trims leading and trailing whitespace', () => {
    expect(processor.process('  help  ').output).toContain('Available commands')
  })

  it('returns a "command not found" message containing the unknown command name', () => {
    const result = processor.process('unknown_xyz').output
    expect(result).toContain('command not found')
    expect(result).toContain('unknown_xyz')
  })

  it('handles multi-word commands like "ls projects"', () => {
    const result = processor.process('ls projects').output
    expect(result).toContain('qa-arxiv-mobile')
    expect(result).toContain('3-adic-ml')
  })

  it('returns correct responses for basic built-in INTERACTIVE_COMMANDS', () => {
    expect(processor.process('about').output).toContain('Jonathan Verdun')
    expect(processor.process('sudo').output).toContain('sudoers')
    expect(processor.process('projects').output).toContain('Projects')
  })

  it('returns a redirect signal for contact/email commands', () => {
    const response = processor.process('contact')
    expect(response.output).toContain('Opening email client')
    expect(response.signal).toBe('redirect')
    expect(response.payload).toContain('mailto:')
  })

  it('help output lists core commands', () => {
    const help = processor.process('help').output
    expect(help).toContain('projects')
    expect(help).toContain('contact')
  })

  it('replaces all defaults when custom commands are injected via constructor', () => {
    const custom: Record<string, string> = { ping: 'pong' }
    const customProcessor = new DefaultCommandProcessor(custom)
    expect(customProcessor.process('ping').output).toBe('pong')
    expect(customProcessor.process('help').output).toContain('command not found')
  })

  it('returns an empty output and a clear signal for the clear command', () => {
    const response = processor.process('clear')
    expect(response.output).toBe('')
    expect(response.signal).toBe('clear')
  })

  it('handles Spanish clear command (limpiar)', () => {
    const response = processor.process('limpiar')
    expect(response.output).toBe('')
    expect(response.signal).toBe('clear')
  })

  describe('VFS commands', () => {
    it('handles "pwd"', () => {
      expect(processor.process('pwd').output).toBe('/')
    })

    it('handles "ls" without arguments', () => {
      const output = processor.process('ls').output
      expect(output).toContain('README.md')
      expect(output).toContain('projects')
    })

    it('handles "ls" with a valid path', () => {
      const output = processor.process('ls docs').output
      expect(output).toContain('specs')
      expect(output).toContain('TEST_PLAN.md')
    })

    it('handles "ls" with a nested valid path', () => {
      const output = processor.process('ls /docs/specs').output
      expect(output).toContain('ARCHITECTURE.md')
    })

    it('handles "ls" for root path', () => {
      const output = processor.process('ls /').output
      expect(output).toContain('README.md')
      expect(output).toContain('docs')
    })

    it('handles "ls" with an invalid path', () => {
      const output = processor.process('ls invalid').output
      expect(output).toContain('cannot access')
    })

    it('handles "cd" to a directory', () => {
      const response = processor.process('cd docs')
      expect(response.signal).toBe('vfs_update')
      expect(processor.getCurrentPath?.()).toBe('/docs')
    })

    it('handles "cd" without arguments (goes to root)', () => {
      processor.process('cd docs')
      processor.process('cd')
      expect(processor.getCurrentPath?.()).toBe('/')
    })

    it('handles "cd .."', () => {
      processor.process('cd docs')
      processor.process('cd ..')
      expect(processor.getCurrentPath?.()).toBe('/')
    })

    it('handles "cd /"', () => {
      processor.process('cd docs')
      processor.process('cd /')
      expect(processor.getCurrentPath?.()).toBe('/')
    })

    it('handles "cd" to a file (error)', () => {
      const response = processor.process('cd README.md')
      expect(response.output).toContain('not a directory')
    })

    it('handles "cd" to non-existent path', () => {
      const response = processor.process('cd nowhere')
      expect(response.output).toContain('no such file or directory')
    })

    it('handles "cat" for a file', () => {
      const output = processor.process('cat README.md').output
      expect(output).toContain('Jonathan Verdun Portfolio')
    })

    it('handles "cat" without arguments', () => {
      const output = processor.process('cat').output
      expect(output).toContain('No such file or directory')
    })

    it('handles "cat" for a directory (error)', () => {
      const output = processor.process('cat projects').output
      expect(output).toContain('Is a directory')
    })

    it('handles "cat" for non-existent file', () => {
      const output = processor.process('cat missing.txt').output
      expect(output).toContain('No such file or directory')
    })

    it('handles "cd .." at root', () => {
      expect(processor.process('cd ..').output).toBe('Already at root')
    })

    it('handles "ls" on a file', () => {
      // ls on a file should return empty or some info, currently returns formatNodeList which returns ''
      expect(processor.process('ls README.md').output).toBe('')
    })
  })

  describe('Custom Handlers', () => {
    it('handles custom commands with arguments', () => {
      const p = new DefaultCommandProcessor(undefined, undefined, [], {
        test: (arg) => ({ output: `arg: ${arg}` }),
        undef: () => undefined,
      })
      expect(p.process('test hello').output).toBe('arg: hello')
      expect(p.process('undef').output).toContain('command not found')
    })
  })
})
