import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/siteConfig'
import { es } from '@/lib/i18n/es'

export const dynamic = 'force-static'
export const alt = 'Jonathan Verdun | Automatización QA e Bioinformática'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImageEs() {
  let fontData: Buffer | undefined
  try {
    fontData = await readFile(join(process.cwd(), 'public/fonts/JetBrainsMono-Bold.ttf'))
  } catch {
    // render without custom font if file is unavailable
  }

  return new ImageResponse(
    <div
      style={{
        background: '#0a0a0a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '80px',
        fontFamily: 'JetBrains Mono',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '45%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Accent line + tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '48px', height: '2px', background: '#3b82f6' }} />
        <span
          style={{
            color: '#3b82f6',
            fontSize: '13px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {es.tagline}
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          color: '#ffffff',
          fontSize: '80px',
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: '20px',
          letterSpacing: '-0.03em',
        }}
      >
        {siteConfig.name}
      </div>

      {/* Description */}
      <div
        style={{
          color: '#71717a',
          fontSize: '22px',
          lineHeight: 1.5,
          maxWidth: '800px',
          marginBottom: '40px',
        }}
      >
        Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en
        Bioinformática, enfocado en desarrollo guiado por pruebas y biología computacional.
      </div>

      {/* Social handles */}
      <div style={{ display: 'flex', gap: '32px' }}>
        <span style={{ color: '#52525b', fontSize: '16px' }}>
          {siteConfig.socialLinks.github.label}
        </span>
        <span style={{ color: '#3f3f46', fontSize: '16px' }}>·</span>
        <span style={{ color: '#52525b', fontSize: '16px' }}>
          {siteConfig.socialLinks.linkedin.label}
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: 'JetBrains Mono', data: fontData, weight: 700, style: 'normal' }]
        : [],
    }
  )
}
