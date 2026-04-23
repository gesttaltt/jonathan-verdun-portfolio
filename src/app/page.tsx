import { ShieldCheck, CheckCircle2, Server, Database, Code2 } from 'lucide-react'
import Link from 'next/link'
import { BioinformaticsGraphic } from '@/components/BioinformaticsGraphic'
import { ProjectGallery } from '@/components/ProjectGallery'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { HeroHeader } from '@/components/HeroHeader'
import { SectionHeader } from '@/components/SectionHeader'
import { SystemSpecCard } from '@/components/SystemSpecCard'
import { TopologyLoader } from '@/components/TopologyLoader'
import { siteConfig } from '@/lib/siteConfig'

import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'

export default function Home() {
  const systemSpecs = DataEngineeringService.getSystemSpecs()

  return (
    <div className="bg-background min-h-screen font-mono text-zinc-300 selection:bg-blue-500/30">
      <ErrorBoundary>
        <TopologyLoader />
      </ErrorBoundary>

      <main
        id="main-content"
        className="relative z-10 mx-auto max-w-7xl px-6 py-16 2xl:max-w-[1440px] 2xl:px-12"
      >
        {/* HeroHeader is a client island — uses Framer Motion */}
        <HeroHeader />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Main Content Column */}
          <div className="space-y-24 lg:col-span-8">
            {/* Projects Section */}
            <section className="relative">
              <SectionHeader
                icon={Code2}
                title={siteConfig.sections.projects.title}
                color="purple"
                showAccentLine
              />
              <ProjectGallery />
            </section>

            {/* Architecture Section */}
            <section className="space-y-8">
              <SectionHeader
                icon={Database}
                title={siteConfig.sections.architecture.title}
                color="cyan"
                showBorderBottom
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {systemSpecs.map((spec) => (
                  <SystemSpecCard key={spec.id} spec={spec} />
                ))}
              </div>

              <BioinformaticsGraphic />
            </section>

            {/* QA Philosophy Section */}
            <section className="space-y-8">
              <SectionHeader
                icon={ShieldCheck}
                title={siteConfig.sections.qa.title}
                color="green"
                showBorderBottom
              />

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
                  {siteConfig.sections.sidebar.constraintsTitle}
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
                  {siteConfig.sections.qa.contactTitle}
                </h3>
                <p className="mb-4 text-xs text-zinc-400">
                  {siteConfig.sections.qa.contactDescription}
                </p>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg"
                >
                  {siteConfig.contact.ctaLabel}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Overlay gradient to blend with InteractiveTopology */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
    </div>
  )
}
