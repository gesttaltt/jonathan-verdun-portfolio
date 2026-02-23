'use client'

import {
  Github,
  Linkedin,
  ShieldCheck,
  FlaskConical,
  CheckCircle2,
  ExternalLink as ExternalLinkIcon,
  Server,
  Database,
  Terminal as TerminalIcon,
  Code2,
  Cpu,
} from 'lucide-react'
import Link from 'next/link'
import { Terminal } from '@/components/Terminal'
import { BioinformaticsGraphic } from '@/components/BioinformaticsGraphic'
import { ProjectGallery } from '@/components/ProjectGallery'
import { InteractiveTopology } from '@/components/InteractiveTopology'
import { motion } from 'framer-motion'

// Importing Bootstrap Contracts
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import { TOP_SECRET_TERMINAL_DATA } from '@/lib/contracts/TerminalContract'

export default function Home() {
  const systemSpecs = DataEngineeringService.getSystemSpecs()
  const terminalCommands = TOP_SECRET_TERMINAL_DATA.commands

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-mono text-zinc-300 selection:bg-blue-500/30">
      <InteractiveTopology />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-start gap-8 md:mb-24 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-blue-500">
              <span className="h-px w-12 bg-blue-500"></span>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase md:text-xs md:tracking-[0.4em]">
                High-Assurance Architect
              </span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-5xl font-extrabold tracking-tighter text-transparent md:text-6xl lg:text-8xl">
              Jonathan Verdun
            </h1>
            <div className="flex flex-wrap gap-6 text-sm font-medium">
              <Link
                href="https://github.com/gesttaltt"
                target="_blank"
                className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
              >
                <Github className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                <span>github.com/gesttaltt</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/jonathan-verdun/"
                target="_blank"
                className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
              >
                <Linkedin className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                <span>linkedin.com/in/jonathan-verdun</span>
              </Link>
            </div>
          </div>

          <div className="glass flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
              </span>
              <span className="font-bold tracking-widest text-zinc-500 uppercase">
                Active Context
              </span>
            </div>
            <Link
              href="https://github.com/Ai-Whisperers"
              className="flex items-center gap-2 text-lg font-bold text-white transition-colors hover:text-cyan-400"
            >
              Ai-Whisperers <ExternalLinkIcon className="h-4 w-4" />
            </Link>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Main Content Column */}
          <div className="space-y-24 lg:col-span-8">
            {/* Terminal Section */}
            <section className="relative">
              <div className="absolute top-0 -left-12 hidden h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent lg:block"></div>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <TerminalIcon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">System Interface</h2>
              </div>
              <Terminal commands={terminalCommands} />
            </section>

            {/* Projects Section */}
            <section className="relative">
              <div className="absolute top-0 -left-12 hidden h-full w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent lg:block"></div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                  <Code2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Deployment Gallery</h2>
              </div>
              <ProjectGallery />
            </section>

            {/* Architecture Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Data Architecture</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {systemSpecs.map((spec) => (
                  <div
                    key={spec.id}
                    className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-cyan-400 uppercase">
                        <FlaskConical className="h-4 w-4" /> {spec.focus}
                      </h3>
                      <Cpu className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-cyan-500" />
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      Processing chaotic datasets with{' '}
                      <span className="font-semibold text-white">{spec.methodology}</span>{' '}
                      architectures.
                      <br />
                      <span className="mt-3 block text-[10px] font-bold text-zinc-500 uppercase">
                        Invariant Target:
                      </span>
                      <span className="text-xs text-zinc-300">{spec.invariants.join(' + ')}</span>
                    </p>
                  </div>
                ))}
              </div>

              <BioinformaticsGraphic />
            </section>

            {/* QA Philosophy Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Verification Protocols</h2>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {QA_PHILOSOPHY.specifications.map((spec, i) => (
                    <div key={i} className="group space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </div>
                          <h4 className="text-sm font-bold text-white uppercase">{spec.layer}</h4>
                        </div>
                        <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300">
                          {spec.status}
                        </span>
                      </div>
                      <p className="pl-9 text-xs leading-relaxed text-zinc-400">{spec.objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:pl-8">
            <div className="sticky top-8 space-y-8">
              <div className="glass group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/20">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-75"></div>

                <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
                  <Server className="h-5 w-5 text-blue-400" />
                  System Constraints
                </h3>

                <div className="space-y-5">
                  {QA_PHILOSOPHY.constraints.map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                      <p className="text-xs leading-relaxed font-medium text-zinc-400">{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Callout */}
              <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-sm font-bold tracking-wider text-white uppercase">
                  Open for Research
                </h3>
                <p className="mb-4 text-xs text-zinc-400">
                  Currently accepting inquiries for high-assurance architecture and bioinformatics
                  contracts.
                </p>
                <Link
                  href="mailto:contact@jonathanverdun.com"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg"
                >
                  Initiate Handshake
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-tr from-blue-900/5 via-transparent to-purple-900/5"></div>
    </div>
  )
}
