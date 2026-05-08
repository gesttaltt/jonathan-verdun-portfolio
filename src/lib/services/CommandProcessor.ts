import { INTERACTIVE_COMMANDS } from '../contracts/TerminalContract'

export type CommandSignal = 'clear'

export interface CommandResponse {
  output: string
  signal?: CommandSignal
}

export interface ICommandProcessor {
  process(cmd: string): CommandResponse
}

export class DefaultCommandProcessor implements ICommandProcessor {
  private readonly commands: Record<string, string>
  private readonly helpCmd: string

  constructor(customCommands?: Record<string, string>, helpCmd?: string) {
    this.commands = customCommands ?? INTERACTIVE_COMMANDS
    this.helpCmd = helpCmd ?? 'help'
  }

  process(cmd: string): CommandResponse {
    const lowerCmd = cmd.toLowerCase().trim()

    if (lowerCmd === 'clear' || lowerCmd === 'limpiar') {
      return { output: '', signal: 'clear' }
    }

    // Object.hasOwn guards against prototype keys like __proto__ being treated as commands.
    if (Object.hasOwn(this.commands, lowerCmd)) {
      return { output: this.commands[lowerCmd] }
    }

    return {
      output: `bash: ${cmd}: command not found. Type '${this.helpCmd}' for available commands.`,
    }
  }
}
