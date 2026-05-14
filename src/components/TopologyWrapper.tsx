'use client'

import React from 'react'

interface TopologyWrapperProps {
  children?: React.ReactNode
  showScanline?: boolean
}

/**
 * Shared wrapper for both the static loading state and the interactive WebGL canvas.
 * Ensures consistent background elements (grid, gradient) during the transition.
 */
export const TopologyWrapper: React.FC<TopologyWrapperProps> = ({
  children,
  showScanline = true,
}) => {
  return (
    <div className="bg-bg-deep fixed inset-0 z-0 overflow-hidden">
      {showScanline && <div className="scanline" />}

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Atmospheric Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 opacity-50" />

      {children}
    </div>
  )
}
