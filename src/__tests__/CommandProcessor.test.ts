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
})
