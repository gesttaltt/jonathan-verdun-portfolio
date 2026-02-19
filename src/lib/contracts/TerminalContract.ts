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
