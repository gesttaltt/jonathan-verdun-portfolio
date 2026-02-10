'use client'

import { 
  Github, 
  Linkedin, 
  Mail, 
  ShieldCheck, 
  Microscope, 
  FlaskConical, 
  Code2, 
  Terminal as TerminalIcon,
  Search,
  CheckCircle2,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { Terminal } from "@/components/Terminal";
import { BioinformaticsGraphic } from "@/components/BioinformaticsGraphic";
import { motion } from "framer-motion";

export default function Home() {
  const terminalCommands = [
    { 
      text: 'whoami', 
      output: 'Jonathan Verdun | Gestalt. 25 y/o Engineer from Paraguay. Focused on the intersection of QA and Bioinformatics.' 
    },
    { 
      text: 'ls skills/research', 
      output: 'epitope-discovery, p-adic-vae, deep-rl, codon-analysis, antigen-design' 
    },
    { 
      text: 'cat philosophy.txt', 
      output: 'Correctness, reproducibility, and failure-mode discovery are first-class design constraints. TDD is not an afterthought; it is the foundation.' 
    },
    {
      text: 'grep -r "current_work" .',
      output: 'Ai-Whisperers: Building self-validating pipelines and automated sanity checks for complex systems.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-mono selection:bg-emerald-500/30">
      {/* Subtle Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div>
            <div className="flex items-center gap-3 text-emerald-500 mb-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-bold">Systems Engineer</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
              Jonathan Verdun
            </h1>
            <div className="flex gap-6">
              <Link href="https://github.com/gesttaltt" target="_blank" className="hover:text-emerald-400 transition-all flex items-center gap-2 text-sm border-b border-white/5 hover:border-emerald-500/50 pb-1">
                <Github className="w-4 h-4" /> gesttaltt
              </Link>
              <Link href="https://www.linkedin.com/in/jonathan-verdun/" target="_blank" className="hover:text-emerald-400 transition-all flex items-center gap-2 text-sm border-b border-white/5 hover:border-emerald-500/50 pb-1">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </Link>
              <Link href="mailto:jonathan.verdun@example.com" className="hover:text-emerald-400 transition-all flex items-center gap-2 text-sm border-b border-white/5 hover:border-emerald-500/50 pb-1">
                <Mail className="w-4 h-4" /> Contact
              </Link>
            </div>
          </div>
          
          <div className="glass p-4 rounded-lg flex flex-col gap-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-zinc-500 uppercase tracking-widest font-bold">Current Deployment</span>
            </div>
            <Link href="https://github.com/Ai-Whisperers" className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2">
              Ai-Whisperers <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Terminal Section */}
            <section>
              <Terminal commands={terminalCommands} />
            </section>

            {/* Bioinformatics Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Microscope className="w-6 h-6 text-emerald-500" />
                  Bioinformatics Research
                </h2>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-xl space-y-4">
                  <h3 className="text-emerald-400 font-bold flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" /> Antigen Development
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Focused on HIV and Arthritis research through computational frameworks for 
                    <span className="text-white"> automated epitope discovery</span> and 
                    PTM-aware representation learning.
                  </p>
                </div>
                <div className="glass p-6 rounded-xl space-y-4">
                  <h3 className="text-emerald-400 font-bold flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Neural Architectures
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Implementing p-adic number theory within custom VAEs and Deep MLP architectures 
                    for high-dimensional protein–immune interaction modeling.
                  </p>
                </div>
              </div>

              <BioinformaticsGraphic />
            </section>

            {/* QA / TDD Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  QA Engineering Mindset
                </h2>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>

              <div className="glass-dark border-l-4 border-emerald-500 p-8 rounded-r-xl space-y-6">
                <p className="text-lg text-zinc-100 leading-relaxed italic">
                  "I habitually formalize system behavior into executable specifications before implementation, 
                  using layered test suites to lock invariants early."
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold text-white text-sm">Deterministic</h4>
                    <p className="text-xs text-zinc-500">Eliminating flaky tests through environment isolation and mocked state.</p>
                  </div>
                  <div className="space-y-2">
                    <Search className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold text-white text-sm">Auditable</h4>
                    <p className="text-xs text-zinc-500">Systems that surface hidden coupling and numerical instability early.</p>
                  </div>
                  <div className="space-y-2">
                    <Code2 className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold text-white text-sm">Resilient</h4>
                    <p className="text-xs text-zinc-500">Preventing semantic drift under continuous iteration with property-based testing.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Experience Card */}
            <div className="glass p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TerminalIcon className="w-24 h-24" />
              </div>
              <h3 className="text-white font-bold mb-6 text-xl">Experience</h3>
              <div className="space-y-6">
                <div className="border-l border-emerald-500/30 pl-4 relative">
                  <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-emerald-500"></div>
                  <h4 className="text-white font-bold text-sm">QA Automation / TDD</h4>
                  <p className="text-xs text-emerald-500 mb-2">Ai-Whisperers</p>
                  <p className="text-xs text-zinc-500">Leading automated workflows with Claude, Gemini, and custom local LLM pipelines.</p>
                </div>
                <div className="border-l border-white/10 pl-4 relative">
                  <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-zinc-700"></div>
                  <h4 className="text-white font-bold text-sm">Bioinformatics Research</h4>
                  <p className="text-xs text-zinc-500">Deep Learning applications for in-silico vaccine development.</p>
                </div>
              </div>
            </div>

            {/* Stack Card */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-white font-bold mb-6 text-xl">Technical Stack</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Development</p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'TypeScript', 'Python', 'PyTorch'].map(s => (
                      <span key={s} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-400">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">AI / LLM</p>
                  <div className="flex flex-wrap gap-2">
                    {['Claude', 'Gemini', 'Phi-3', 'Mistral'].map(s => (
                      <span key={s} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-400">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Bioinformatics</p>
                  <div className="flex flex-wrap gap-2">
                    {['VAE', 'ResNets', 'Epitope discovery', 'PTM'].map(s => (
                      <span key={s} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-400">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border border-white/5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent">
              <p className="text-xs text-zinc-500 leading-relaxed">
                Build: 2026.02.10_gestalt<br />
                Location: Asunción, Paraguay<br />
                Status: In-Silico Verification Pending...
              </p>
            </div>
          </aside>

        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-600">
            &copy; 2026 Jonathan Verdun. Built with Next.js, Framer Motion & TDD.
          </p>
          <div className="flex gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <Link href="https://github.com/gesttaltt/ims-test" target="_blank" className="text-[10px] text-zinc-500 hover:text-emerald-500 font-bold uppercase tracking-widest">
              [View IMS-TEST]
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ExternalLink({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}
