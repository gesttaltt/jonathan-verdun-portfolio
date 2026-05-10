'use client'

import React from 'react'
import { m } from 'framer-motion'
import { CheckCircle2, XCircle, Clock, Shield } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'
import coverageData from '../../coverage.json'

export const VisualTestSummary: React.FC = () => {
  const t = useTranslation()
  const vt = t.visualTestSummary

  const { numPassedTests, numTotalTests, numFailedTests, startTime, success } = coverageData

  const passRate = ((numPassedTests / numTotalTests) * 100).toFixed(1)
  const date = new Date(startTime).toLocaleDateString(t.lang === 'es' ? 'es-ES' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold tracking-widest text-white uppercase">
          <Shield className="h-4 w-4 text-blue-400" />
          {vt.title}
        </h3>
        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-[10px] font-bold text-green-500 uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          {vt.activeProtocol}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">{vt.executionStatus}</p>
          <div className="flex items-center gap-2">
            {success ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-lg font-bold text-white">{success ? vt.passed : vt.failed}</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">{vt.testPayload}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">{numPassedTests}</span>
            <span className="text-xs font-bold text-zinc-500">
              / {numTotalTests} {vt.assertions}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">{vt.verificationRate}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-green-400">{passRate}%</span>
            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-white/10">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${passRate}%` }}
                className="h-full bg-green-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">{vt.lastVerified}</p>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />
            {date}
          </div>
        </div>
      </div>

      {numFailedTests > 0 && (
        <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <p className="text-xs font-bold text-red-400">
            {vt.regressionDetected.replace('{count}', String(numFailedTests))}
          </p>
        </div>
      )}
    </div>
  )
}
