import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { ProjectSpec } from '@/lib/contracts/ProjectContract.types'
import { siteConfig } from '../siteConfig'

export const TERMINAL_PROMPT = 'gestalt@portfolio:'

export const generateLsOutput = (projects: ProjectSpec[]) => {
  return projects
    .map((p) => {
      const name = p.title.replace(/\s+/g, '-')
      const perms = p.status === 'QA' ? 'drwxr-xr-x' : '-rw-r--r--'
      return `${perms} 1 gestalt staff  ${name}`
    })
    .join('\n')
}

export const LS_PROJECTS_OUTPUT = generateLsOutput(PROJECT_DATA)

export const INTERACTIVE_COMMANDS: Record<string, string> = {
  help: 'Available commands: help, about, projects, contact, skills, version, whoami, clear, ls, cd, cat, pwd',
  about:
    'Jonathan Verdun. QA engineer and test architect. Test plans, traceability matrices, property-based testing, and automation pipelines — quality gates enforced via pre-commit hooks, GitHub Actions CI, and coverage thresholds. Pursuing ISTQB Foundation certification.',
  projects: 'Check out the Projects section below, or type "ls projects" to see a list.',
  contact: 'Reach out via LinkedIn or GitHub linked above.',
  skills:
    'Primary stack: Next.js, TypeScript, Tailwind CSS, Three.js. Testing: pytest, Playwright, Appium, Jest, fast-check.',
  version: `v${siteConfig.versions.portfolio}-audit-hardened (Next.js ${siteConfig.versions.nextjs})`,
  whoami: 'jonathan.verdun — QA Automation Engineer',
  'ls projects': LS_PROJECTS_OUTPUT,
  sudo: 'User is not in the sudoers file. This incident will be reported.',
}

export interface BootCommand {
  text: string
  output: string
  delay?: number
}

export const BOOT_COMMANDS: readonly BootCommand[] = [
  {
    text: 'whoami',
    output: 'jonathan.verdun — QA Automation Engineer',
    delay: 500,
  },
  {
    text: 'ls projects',
    output: LS_PROJECTS_OUTPUT,
    delay: 700,
  },
  {
    text: 'help',
    output: INTERACTIVE_COMMANDS.help!,
    delay: 600,
  },
]
