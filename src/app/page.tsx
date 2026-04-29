import { ShieldCheck, Server, Database, Code2, Dna } from 'lucide-react'
import Link from 'next/link'
import { BioinformaticsGraphic } from '@/components/BioinformaticsGraphic'
import { BioinformaticsResearchCard } from '@/components/BioinformaticsResearchCard'
import { FadeInSection } from '@/components/FadeInSection'
import { ProjectGallery } from '@/components/ProjectGallery'
import { QAPhilosophyGrid } from '@/components/QAPhilosophyGrid'
import { Terminal } from '@/components/Terminal'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { HeroHeader } from '@/components/HeroHeader'
import { SectionHeader } from '@/components/SectionHeader'
import { SystemSpecCard } from '@/components/SystemSpecCard'
import { TopologyLoader } from '@/components/TopologyLoader'
import { siteConfig } from '@/lib/siteConfig'

import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import { BOOT_COMMANDS } from '@/lib/contracts/TerminalContract'

export default function Home() {
  const systemSpecs = DataEngineeringService.getSystemSpecs()
  const researchSpecs = BioinformaticsService.getResearchSpecs()

  return (
    <div className="bg-background min-h-screen font-mono text-zinc-300 selection:bg-blue-500/30">
      <ErrorBoundary>
        <TopologyLoader />
      </ErrorBoundary>

      <main
        id="main-content"
        className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24 2xl:max-w-[1440px] 2xl:px-12"
      >
        <HeroHeader />

        <FadeInSection className="mb-10 sm:mb-16">
          <Terminal commands={BOOT_COMMANDS} />
        </FadeInSection>

        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12 lg:gap-y-24">
          {/* Projects — row 1, cols 1–8 */}
          <section className="relative lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <SectionHeader
              icon={<Code2 className="h-5 w-5" />}
              title={siteConfig.sections.projects.title}
              color="purple"
              showAccentLine
            />
            <ProjectGallery />
          </section>

          {/* Sidebar — desktop: cols 9–12, spans both rows; mobile: sits between Projects and rest */}
          <aside className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pl-8">
            <div className="space-y-8">
              <FadeInSection delay={0.1}>
                <div className="glass group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-blue-500/20 sm:p-8">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-75"></div>

                  <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
                    <Server className="h-5 w-5 text-blue-400" />
                    {siteConfig.sections.sidebar.constraintsTitle}
                  </h3>

                  <div className="space-y-5">
                    {QA_PHILOSOPHY.constraints.map((c) => (
                      <div key={c} className="flex items-start gap-4">
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                        <p className="text-xs leading-relaxed font-medium text-zinc-400">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-bold tracking-wider text-white uppercase">
                    {siteConfig.sections.qa.contactTitle}
                  </h3>
                  <p className="mb-4 text-xs text-zinc-400">
                    {siteConfig.sections.qa.contactDescription}
                  </p>
                  <Link
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:outline-none"
                  >
                    {siteConfig.contact.ctaLabel}
                  </Link>
                </div>
              </FadeInSection>
            </div>
          </aside>

          {/* Architecture + QA — row 2, cols 1–8 */}
          <div className="space-y-14 lg:col-span-8 lg:col-start-1 lg:row-start-2 lg:space-y-24">
            <FadeInSection>
              <section className="space-y-8">
                <SectionHeader
                  icon={<Database className="h-5 w-5" />}
                  title={siteConfig.sections.architecture.title}
                  color="cyan"
                  showBorderBottom
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {systemSpecs.map((spec) => (
                    <SystemSpecCard key={spec.id} spec={spec} />
                  ))}
                </div>
              </section>
            </FadeInSection>

            <FadeInSection>
              <section className="space-y-8">
                <SectionHeader
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title={siteConfig.sections.qa.title}
                  color="green"
                  showBorderBottom
                />
                <QAPhilosophyGrid />
              </section>
            </FadeInSection>

            <FadeInSection>
              <section className="space-y-8">
                <SectionHeader
                  icon={<Dna className="h-5 w-5" />}
                  title={siteConfig.sections.bioinformatics.title}
                  color="purple"
                  showBorderBottom
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {researchSpecs.map((spec) => (
                    <BioinformaticsResearchCard key={spec.id} spec={spec} />
                  ))}
                </div>
              </section>
            </FadeInSection>
          </div>
        </div>

        <footer
          aria-label="Bioinformatics showcase"
          className="mt-14 border-t border-white/5 pt-10 sm:mt-24 sm:pt-16"
        >
          <FadeInSection>
            <BioinformaticsGraphic />
          </FadeInSection>
        </footer>
      </main>

      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
    </div>
  )
}
