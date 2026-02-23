export const TOP_SECRET_TERMINAL_DATA = {
  commands: [
    {
      text: './audit_infrastructure.sh --safety=max',
      output: `[AUDIT COMPLETE] Architecture verified for high-throughput compliance. 0 critical vulnerabilities found.`,
    },
    {
      text: 'grep -r "risk_mitigation" ./strategies',
      output:
        'Invariants: Deterministic Latent Spaces, Property-Based Fuzzing, Zero-Trust Validation.',
    },
    {
      text: 'cat engineering_principles.txt',
      output:
        'Correctness is a first-class citizen. Reproducibility > Speed. Failure-mode analysis is mandatory.',
    },
  ],
} as const

export const INTERACTIVE_COMMANDS: Record<string, string> = {
  help: 'Available commands: help, about, projects, contact, clear, status',
  about:
    'Jonathan Verdun. High-Assurance Architect. Specializing in Bioinformatics, QA Automation, and Resilient Systems.',
  projects:
    'Check out the "Active Deployment" section or type "ls projects" to see a list (simulated).',
  contact: 'Reach out via LinkedIn or GitHub linked above. Or emit a signal on port 443.',
  status: 'System Operational. All systems nominal. 0 anomalies detected.',
  'ls projects':
    'drwx------ 1 gestalt staff  Ai-Whisperers\n-rw-r--r-- 1 gestalt staff  Epitope-Scanner\n-rwxr-xr-x 1 gestalt staff  Chaos-Kube',
  sudo: 'User is not in the sudoers file. This incident will be reported.',
}
