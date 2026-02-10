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
  Cpu,
  ExternalLink as ExternalLinkIcon
} from "lucide-react";
import Link from "next/link";
import { Terminal } from "@/components/Terminal";
import { BioinformaticsGraphic } from "@/components/BioinformaticsGraphic";
import { motion } from "framer-motion";

// Importing Bootstrap Contracts
import { BioinformaticsService } from "@/lib/contracts/BioinformaticsContract";
import { QA_PHILOSOPHY } from "@/lib/contracts/QAContract";

export default function Home() {
  const researchSpecs = BioinformaticsService.getResearchSpecs();
  
  const terminalCommands = [
    { 
      text: 'whoami', 
      output: `Jonathan Verdun | Gestalt. 25 y/o Engineer from Paraguay. ${QA_PHILOSOPHY.constraints[0]}.` 
    },
    { 
      text: 'ls skills/research', 
      output: researchSpecs.map(s => s.methodology.toLowerCase()).join(', ') + ', epitope-discovery' 
    },
    { 
      text: 'cat philosophy.txt', 
      output: QA_PHILOSOPHY.constraints.join('. ') 
    },
    {
      text: 'grep -r "current_work" .',
      output: 'Ai-Whisperers: Building self-validating pipelines and automated sanity checks for complex systems.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-mono selection:bg-emerald-500/30">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        
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
            </div>
          </div>
          
          <div className="glass p-4 rounded-lg flex flex-col gap-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-zinc-500 uppercase tracking-widest font-bold">Current Deployment</span>
            </div>
            <Link href="https://github.com/Ai-Whisperers" className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2">
              Ai-Whisperers <ExternalLinkIcon className="w-3 h-3" />
            </Link>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <Terminal commands={terminalCommands} />
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Microscope className="w-6 h-6 text-emerald-500" />
                  Bioinformatics Research
                </h2>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {researchSpecs.map((spec) => (
                  <div key={spec.id} className="glass p-6 rounded-xl space-y-4">
                    <h3 className="text-emerald-400 font-bold flex items-center gap-2">
                      <FlaskConical className="w-4 h-4" /> {spec.focus} Research
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      Utilizing <span className="text-white">{spec.methodology}</span> architectures. 
                      Key invariants: {spec.invariants.join(', ')}.
                    </p>
                  </div>
                ))}
              </div>

              <BioinformaticsGraphic />
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  QA Engineering Mindset
                </h2>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>

              <div className="glass-dark border-l-4 border-emerald-500 p-8 rounded-r-xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {QA_PHILOSOPHY.specifications.map((spec, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <h4 className="font-bold text-white text-sm uppercase">{spec.layer}</h4>
                        <span className="text-[10px] px-1 bg-white/10 rounded text-zinc-500">{spec.status}</span>
                      </div>
                      <p className="text-xs text-zinc-400">{spec.objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="glass p-8 rounded-2xl relative overflow-hidden group">
              <h3 className="text-white font-bold mb-6 text-xl">System Verification</h3>
              <div className="space-y-4">
                {QA_PHILOSOPHY.constraints.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <p className="text-xs text-zinc-400">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}