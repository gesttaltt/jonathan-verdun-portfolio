'use client'

import {
  Github,
  Linkedin,
  ShieldCheck,
  FlaskConical,
  CheckCircle2,
  ExternalLink as ExternalLinkIcon,
  Server, // Added for infrastructure feel
  Database, // Added for data engineering feel
} from 'lucide-react'
import Link from 'next/link'
import { Terminal } from '@/components/Terminal'
import { BioinformaticsGraphic } from '@/components/BioinformaticsGraphic'
import { motion } from 'framer-motion'

// Importing Bootstrap Contracts
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import { TOP_SECRET_TERMINAL_DATA } from '@/lib/contracts/TerminalContract'
import { InteractiveTopology } from '@/components/InteractiveTopology'

export default function Home() {
  const researchSpecs = BioinformaticsService.getResearchSpecs()

  // Updated Terminal Commands for "High-Assurance" Persona
  const terminalCommands = TOP_SECRET_TERMINAL_DATA.commands

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-mono text-zinc-300 selection:bg-blue-500/30">
      <InteractiveTopology />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-blue-500">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase">
                High-Assurance Architect
              </span>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl">
              Jonathan Verdun
            </h1>
            <div className="flex gap-6">
              <Link
                href="https://github.com/gesttaltt"
                target="_blank"
                aria-label="GitHub Profile"
                className="flex items-center gap-2 border-b border-white/5 pb-1 text-sm transition-all hover:border-blue-500/50 hover:text-cyan-400"
              >
                <Github className="h-4 w-4" /> gesttaltt
              </Link>
              <Link
                href="https://www.linkedin.com/in/jonathan-verdun/"
                target="_blank"
                aria-label="LinkedIn Profile"
                className="flex items-center gap-2 border-b border-white/5 pb-1 text-sm transition-all hover:border-blue-500/50 hover:text-cyan-400"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Link>
            </div>
          </div>

          <div className="glass flex flex-col gap-2 rounded-lg p-4">
            <div className="flex items-center gap-3 text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
              <span className="font-bold tracking-widest text-zinc-500 uppercase">
                Active Deployment
              </span>
            </div>
            <Link
              href="https://github.com/Ai-Whisperers"
              aria-label="Ai-Whisperers Organization"
              className="flex items-center gap-2 text-white transition-colors hover:text-cyan-400"
            >
              Ai-Whisperers <ExternalLinkIcon className="h-3 w-3" />
            </Link>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-20 lg:col-span-8">
            <section>
              <Terminal commands={terminalCommands} />
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                  <Database className="h-6 w-6 text-blue-500" />
                  High-Dimensional Data Engineering
                </h2>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {researchSpecs.map((spec) => (
                  <div
                    key={spec.id}
                    className="glass space-y-4 rounded-xl p-6 transition-colors duration-300 hover:border-blue-500/30"
                  >
                    <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-cyan-400 uppercase">
                      <FlaskConical className="h-4 w-4" /> {spec.focus} Pipeline
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      Processing chaotic datasets with{' '}
                      <span className="font-semibold text-white">{spec.methodology}</span>{' '}
                      architectures.
                      <br />
                      <span className="mt-2 block text-xs font-bold text-zinc-500 uppercase">
                        Optimization Target:
                      </span>
                      {spec.invariants.join(', ')}.
                    </p>
                  </div>
                ))}
              </div>

              <BioinformaticsGraphic />
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                  <ShieldCheck className="h-6 w-6 text-blue-500" />
                  Invariant-Based Verification
                </h2>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>

              <div className="glass-dark space-y-6 rounded-r-xl border-l-4 border-blue-500 p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {QA_PHILOSOPHY.specifications.map((spec, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        <h4 className="text-sm font-bold text-white uppercase">{spec.layer}</h4>
                        <span className="rounded bg-white/10 px-1 text-[10px] text-zinc-500">
                          {spec.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">{spec.objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-12 lg:col-span-4">
            <div className="glass group relative overflow-hidden rounded-2xl p-8">
              <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <Server className="h-5 w-5 text-cyan-400" />
                System Constraints
              </h3>
              <div className="space-y-4">
                {QA_PHILOSOPHY.constraints.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    <p className="text-xs leading-relaxed font-medium text-zinc-400">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
