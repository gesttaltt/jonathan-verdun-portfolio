import fs from 'fs'
import path from 'path'

const coverageJsonPath = path.join(process.cwd(), 'coverage.json')
const coverageSummaryPath = path.join(process.cwd(), 'coverage/coverage-summary.json')

const publicDir = path.join(process.cwd(), 'public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// 1. Generate tests badge data
if (fs.existsSync(coverageJsonPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(coverageJsonPath, 'utf8'))
    const passed = data.numPassedTests || 0
    const total = data.numTotalTests || 0
    const success = data.success ?? true

    const badgeData = {
      schemaVersion: 1,
      label: 'tests',
      message: `${passed}/${total} passed`,
      color: success ? 'brightgreen' : 'red',
    }

    fs.writeFileSync(path.join(publicDir, 'badge-tests.json'), JSON.stringify(badgeData, null, 2))
    console.log('[generate-badge-data] Generated public/badge-tests.json')
  } catch (err) {
    console.error('[generate-badge-data] Failed to generate tests badge:', err)
  }
} else {
  console.log('[generate-badge-data] coverage.json not found, skipping tests badge')
}

// 2. Generate coverage badge data
if (fs.existsSync(coverageSummaryPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'))
    const pct = data.total?.lines?.pct ?? 0

    // Determine color based on percentage
    let color = 'red'
    if (pct >= 95) color = 'brightgreen'
    else if (pct >= 90) color = 'green'
    else if (pct >= 80) color = 'yellowgreen'
    else if (pct >= 70) color = 'yellow'
    else if (pct >= 60) color = 'orange'

    const badgeData = {
      schemaVersion: 1,
      label: 'coverage',
      message: `${pct}%`,
      color: color,
    }

    fs.writeFileSync(path.join(publicDir, 'badge-coverage.json'), JSON.stringify(badgeData, null, 2))
    console.log('[generate-badge-data] Generated public/badge-coverage.json')
  } catch (err) {
    console.error('[generate-badge-data] Failed to generate coverage badge:', err)
  }
} else {
  console.log('[generate-badge-data] coverage-summary.json not found, skipping coverage badge')
}
