'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { ShieldCheck, Code2 } from 'lucide-react'
import { SiteFooter } from '@/components/SiteFooter'
import { FadeInSection } from '@/components/FadeInSection'
import { ProjectGallery } from '@/components/ProjectGallery'
import { QAPhilosophyGrid } from '@/components/QAPhilosophyGrid'
import { Terminal } from '@/components/Terminal'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { HeroHeader } from '@/components/HeroHeader'
import { SectionHeader } from '@/components/SectionHeader'
import { Sidebar } from '@/components/Sidebar'
import { VisualTestSummary } from '@/components/VisualTestSummary'
import { QAContact } from '@/components/QAContact'
import { ResearchSection } from '@/components/ResearchSection'
import { ProjectProvider } from '@/components/hooks/useProjects'
import { useTranslation } from '@/lib/i18n/context'
import { DefaultCommandProcessor } from '@/lib/services/CommandProcessor'
import { buildWebPageJsonLd, buildBreadcrumbJsonLd } from '@/lib/jsonLd'

const TopologyLoader = dynamic(
  () => import('@/components/TopologyLoader').then((m) => m.TopologyLoader),
  { ssr: false }
)

export const PortfolioPage: React.FC = () => {
  const t = useTranslation()
  const [simMode, setSimMode] = React.useState<'p-adic' | 'hyperbolic'>('p-adic')

  const processor = useMemo(() => {
    return new DefaultCommandProcessor(t.terminal.interactive, t.terminal.helpCmd, t.projects, {
      sim: (mode) => {
        if (mode === 'p-adic' || mode === 'hyperbolic') {
          setSimMode(mode)
          return { output: `Background simulation mode set to: ${mode}` }
        }
        return { output: 'Usage: sim --mode [p-adic|hyperbolic]' }
      },
    })
  }, [t, setSimMode])

  const projectAdapter = useMemo(() => ({ getProjects: () => t.projects }), [t.projects])

  return (
    <ProjectProvider adapter={projectAdapter}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageJsonLd(t.lang)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(t.lang)) }}
      />
      <div className="bg-background text-text-secondary min-h-screen font-mono selection:bg-blue-500/30">
        <ErrorBoundary>
          <TopologyLoader mode={simMode} quality={0.85} />
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
            <section
              aria-labelledby="qa-section-title"
              aria-describedby="qa-philosophy-grid"
              className="relative lg:col-span-8 lg:col-start-1 lg:row-start-1"
            >
              <SectionHeader
                id="qa-section-title"
                icon={<ShieldCheck className="h-5 w-5" />}
                title={t.sections.qa}
                color="green"
                showAccentLine
              />
              <div id="qa-philosophy-grid">
                <QAPhilosophyGrid />
              </div>
              <div className="mt-8">
                <VisualTestSummary />
              </div>
              <QAContact />
            </section>

            <div className="lg:col-span-4">
              <Sidebar />
            </div>

            {/* Projects + Prior Research — row 2, cols 1–8 */}
            <div className="space-y-14 lg:col-span-8 lg:col-start-1 lg:row-start-2 lg:space-y-24">
              <FadeInSection>
                <section
                  aria-labelledby="projects-section-title"
                  aria-describedby="projects-gallery"
                  className="relative space-y-8"
                >
                  <SectionHeader
                    id="projects-section-title"
                    icon={<Code2 className="h-5 w-5" />}
                    title={t.sections.projects}
                    color="blue"
                    showBorderBottom
                  />
                  <div id="projects-gallery">
                    <ProjectGallery />
                  </div>
                </section>
              </FadeInSection>

              <ResearchSection />
            </div>
          </div>

          <SiteFooter />
        </main>

        <div className="light:from-blue-50/20 light:via-transparent light:to-purple-50/20 pointer-events-none fixed inset-0 z-[1] bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
      </div>
    </ProjectProvider>
  )
}
