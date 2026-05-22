import React from 'react'

interface SkeletonProps {
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  /* istanbul ignore next — default param, always provided */
  className = '',
}) => <div className={`animate-pulse rounded-xl bg-white/5 ${className}`} />

export const PageSkeleton: React.FC = () => (
  <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
    <Skeleton className="mb-8 h-4 w-24" />
    <Skeleton className="mb-4 h-10 w-3/4" />
    <Skeleton className="mb-12 h-4 w-1/2" />
    <div className="space-y-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-3/4" />
    </div>
  </div>
)

export const CardSkeleton: React.FC = () => (
  <div className="bg-bg-card border-border-subtle rounded-2xl border border-white/10 p-6">
    <div className="mb-4 flex items-center justify-between">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    <Skeleton className="mb-2 h-5 w-3/4" />
    <Skeleton className="mb-4 h-4 w-full" />
    <Skeleton className="h-4 w-1/2" />
  </div>
)
