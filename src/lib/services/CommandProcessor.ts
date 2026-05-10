import { INTERACTIVE_COMMANDS } from '../contracts/TerminalContract'
import { VirtualFileSystem } from './VirtualFileSystem'

export type CommandSignal = 'clear' | 'redirect' | 'vfs_update'

export interface CommandResponse {
  output: string
  signal?: CommandSignal
  payload?: string
}

export interface ICommandProcessor {
  process(cmd: string): CommandResponse
  getCurrentPath?(): string
}

interface ProjectMinimal {
  title: string
}

export class DefaultCommandProcessor implements ICommandProcessor {
  private readonly commands: Record<string, string>
  private readonly helpCmd: string
  private readonly vfs: VirtualFileSystem

  constructor(
    customCommands?: Record<string, string>,
    helpCmd?: string,
    projects?: ProjectMinimal[]
  ) {
    this.commands = customCommands ?? INTERACTIVE_COMMANDS
    this.helpCmd = helpCmd ?? 'help'
    this.vfs = new VirtualFileSystem()

    if (projects) {
      projects.forEach((p) => {
        const id = p.title.toLowerCase().replace(/\s+/g, '-')
        this.vfs.addProject(id, p.title)
      })
    }
  }

  process(cmd: string): CommandResponse {
    const parts = cmd.trim().split(/\s+/)
    const mainCmd = parts[0]?.toLowerCase() || ''
    const arg = parts[1]

    if (mainCmd === 'clear' || mainCmd === 'limpiar') {
      return { output: '', signal: 'clear' }
    }

    if (mainCmd === 'ls') {
      return { output: this.vfs.ls(arg) }
    }

    if (mainCmd === 'cd') {
      const error = this.vfs.cd(arg || '/')
      return { output: error || '', signal: error ? undefined : 'vfs_update' }
    }

    if (mainCmd === 'cat') {
      return { output: this.vfs.cat(arg || '') }
    }

    if (mainCmd === 'pwd') {
      return { output: this.vfs.pwd() }
    }

    if (mainCmd === 'contact' || mainCmd === 'contacto' || mainCmd === 'email') {
      return {
        output: 'Opening email client...',
        signal: 'redirect',
        payload: `mailto:jonathan.verdun707@gmail.com`,
      }
    }

    // Object.hasOwn guards against prototype keys like __proto__ being treated as commands.
    if (Object.hasOwn(this.commands, mainCmd)) {
      return { output: this.commands[mainCmd]! }
    }

    return {
      output: `bash: ${cmd}: command not found. Type '${this.helpCmd}' for available commands.`,
    }
  }

  getCurrentPath(): string {
    return this.vfs.pwd()
  }
}
