export const TOP_SECRET_TERMINAL_DATA = {
  commands: [],
} as const

export const INTERACTIVE_COMMANDS: Record<string, string> = {
  help: 'Available commands: help, about, projects, contact, clear',
  about:
    'Jonathan Verdun. QA Automation Engineer and Bioinformatics Researcher. Specializing in TDD, resilient systems, and deep learning.',
  projects: 'Check out the Projects section above, or type "ls projects" to see a list.',
  contact: 'Reach out via LinkedIn or GitHub linked above.',
  'ls projects':
    'drwx------ 1 gestalt staff  Ai-Whisperers\n-rw-r--r-- 1 gestalt staff  Epitope-Scanner\n-rwxr-xr-x 1 gestalt staff  Chaos-Kube',
  sudo: 'User is not in the sudoers file. This incident will be reported.',
}
