'use client'

import React, { useMemo } from 'react'
import { ShieldCheck, Server, Code2 } from 'lucide-react'
import Link from 'next/link'
import { BioinformaticsResearchCard } from '@/components/BioinformaticsResearchCard'
import { SiteFooter } from '@/components/SiteFooter'
import { FadeInSection } from '@/components/FadeInSection'
import { ProjectGallery } from '@/components/ProjectGallery'
import { QAPhilosophyGrid } from '@/components/QAPhilosophyGrid'
import { Terminal } from '@/components/Terminal'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { HeroHeader } from '@/components/HeroHeader'
import { SectionHeader } from '@/components/SectionHeader'
import { SystemSpecCard } from '@/components/SystemSpecCard'
import { TopologyLoader } from '@/components/TopologyLoader'
import { ProjectProvider } from '@/components/hooks/useProjects'
import { useTranslation } from '@/lib/i18n/context'
import { DefaultCommandProcessor } from '@/lib/services/CommandProcessor'
import { siteConfig } from '@/lib/siteConfig'

export const PortfolioPage: React.FC = () => {
  const t = useTranslation()
  const processor = useMemo(
    () => new DefaultCommandProcessor(t.terminal.interactive, t.terminal.helpCmd),
    [t.terminal.interactive, t.terminal.helpCmd]
  )

  return (
    <ProjectProvider adapter={{ getProjects: () => t.projects }}>
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
            <Terminal
              commands={t.terminal.boot}
              processor={processor}
              title={t.terminal.title}
              prompt={t.terminal.prompt}
              hintCmd={t.terminal.helpCmd}
            />
          </FadeInSection>

          <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12 lg:gap-y-24">
            {/* QA Philosophy — row 1, cols 1–8 */}
            <section className="relative lg:col-span-8 lg:col-start-1 lg:row-start-1">
              <SectionHeader
                icon={<ShieldCheck className="h-5 w-5" />}
                title={t.sections.qa}
                color="green"
                showAccentLine
              />
              <QAPhilosophyGrid />
            </section>

            {/* Sidebar — desktop: cols 9–12, spans both rows; mobile: sits between QA and Projects */}
            <aside className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pl-8">
              <div className="space-y-8">
                <FadeInSection delay={0.1}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md transition-all hover:border-blue-500/20 sm:p-8">
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-75"></div>

                    <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
                      <Server className="h-5 w-5 text-blue-400" />
                      {t.sections.sidebar.constraintsTitle}
                    </h3>

                    <div className="space-y-5">
                      {t.qa.constraints.map((c) => (
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
                      {t.sections.qaContact.title}
                    </h3>
                    <p className="mb-4 text-xs text-zinc-400">{t.sections.qaContact.description}</p>
                    <Link
                      href={`mailto:${siteConfig.contact.email}`}
                      className="focus-visible:ring-offset-background flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {t.sections.qaContact.ctaLabel}
                    </Link>
                  </div>
                </FadeInSection>
              </div>
            </aside>

            {/* Projects + Prior Research — row 2, cols 1–8 */}
            <div className="space-y-14 lg:col-span-8 lg:col-start-1 lg:row-start-2 lg:space-y-24">
              <FadeInSection>
                <section className="relative space-y-8">
                  <SectionHeader
                    icon={<Code2 className="h-5 w-5" />}
                    title={t.sections.projects}
                    color="blue"
                    showBorderBottom
                  />
                  <ProjectGallery />
                </section>
              </FadeInSection>

              <section className="space-y-4 border-t border-white/5 pt-8 opacity-60">
                <p className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase sm:text-xs">
                  {t.sections.bioinformatics}
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {t.architecture.specs.map((spec) => (
                    <SystemSpecCard key={spec.id} spec={spec} />
                  ))}
                  {t.bioinformatics.specs.map((spec) => (
                    <BioinformaticsResearchCard key={spec.id} spec={spec} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          <SiteFooter />
        </main>

        <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
      </div>
    </ProjectProvider>
  )
}
