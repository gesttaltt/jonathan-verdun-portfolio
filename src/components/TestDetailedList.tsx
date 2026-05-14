'use client'

import React, { useMemo } from 'react'
import { CheckCircle2, XCircle, Clock, FileCode } from 'lucide-react'
import coverageData from '../../coverage.json'

export const TestDetailedList: React.FC = () => {
  const suites = useMemo(() => {
    return coverageData.testResults
      .map((suite) => {
        const filePath = suite.name.split('/').pop() || suite.name
        const passed = suite.status === 'passed'
        const duration = (suite.endTime - suite.startTime) / 1000
        const assertions = suite.assertionResults.length

        return {
          id: suite.name,
          name: filePath,
          passed,
          duration,
          assertions,
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
        Verified Modules & Components
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {suites.map((suite) => (
          <div
            key={suite.id}
            className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-blue-500/30 hover:bg-white/10"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileCode className="h-4 w-4 shrink-0 text-blue-400" />
                <span className="truncate text-xs font-bold text-white" title={suite.name}>
                  {suite.name.replace('.test.tsx', '').replace('.test.ts', '')}
                </span>
              </div>
              {suite.passed ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400">
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
