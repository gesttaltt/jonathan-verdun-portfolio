# Jonathan Verdun Portfolio (Gestalt)

A high-fidelity, glassmorphism portfolio centered on QA Automation, TDD, and Bioinformatics.

## Core Mandates
- **TDD First**: Every domain logic change is preceded by a failing test.
- **Deterministic**: Logic is abstracted into "Bootstrap Contracts" for reproducibility.
- **Auditable**: Automated documentation and system verification scripts.

## System Architecture

### 1. Bootstrap Contracts (`src/lib/contracts`)
- **BioinformaticsContract**: Formalizes epitope discovery and research focus invariants (HIV/Arthritis).
- **QAContract**: Defines the layered testing strategy (Unit, Property-based, Integration).

### 2. Testing Suite
- **Unit & Integration**: Jest + React Testing Library.
- **Property-Based**: `fast-check` used for fuzzing domain logic invariants.

### 3. Documentation
Automated documentation generation via TypeDoc:
\`\`\`bash
npm run docs
\`\`\`
View generated docs in the \`/docs\` directory.

## Automation & Practicality

### Local Development
\`\`\`bash
docker-compose up
# Or manually:
npm install && npm run dev
\`\`\`

### System Verification
Run the full verification pipeline (Tests -> Build -> Docs):
\`\`\`bash
./scripts/verify-system.sh
\`\`\`

## Deployment Status
- **Current**: Production build running on port 3000.
- **Repository**: [github.com/gesttaltt/jonathan-verdun-portfolio](https://github.com/gesttaltt/jonathan-verdun-portfolio)
