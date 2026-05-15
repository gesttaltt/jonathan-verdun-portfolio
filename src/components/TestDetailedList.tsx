'use client'

import React, { useMemo } from 'react'
import { CheckCircle2, XCircle, Clock, FileCode } from 'lucide-react'
import coverageData from '../../coverage.json'

export const TestDetailedList: React.FC = () => {
  const suites = useMemo(() => {
    return coverageData.testResults
      .map((suite) => {
        const parts = suite.name.split('/')
        const fileName = parts[parts.length - 1] || 'unknown'
        const passed = suite.status === 'passed'
        const duration = (suite.endTime - suite.startTime) / 1000
        const assertions = suite.assertionResults.length

        return {
          id: suite.name,
          name: fileName,
          passed,
          duration,
          assertions,
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-text-tertiary text-sm font-bold tracking-widest uppercase">
        Verified Modules & Components
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {suites.map((suite) => (
          <div
            key={suite.id}
            className="bg-bg-card border-border-subtle hover:bg-bg-card-hover flex flex-col justify-between rounded-xl border p-4 transition-all hover:border-blue-500/30"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileCode className="text-text-muted h-4 w-4 shrink-0" />
                <span className="text-text-primary truncate text-xs font-bold" title={suite.name}>
                  {suite.name.replace('.test.tsx', '').replace('.test.ts', '')}
                </span>
              </div>
              {suite.passed ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0 text-red-500" />
              )}
            </div>

            <div className="text-text-muted flex items-center justify-between text-[11px] font-black uppercase sm:text-xs">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {suite.duration.toFixed(2)}s
              </div>
              <div>{suite.assertions} assertions</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
