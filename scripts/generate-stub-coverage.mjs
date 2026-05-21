// Generates a stub coverage.json so next build can compile
// VisualTestSummary.tsx (which imports ../../coverage.json) without
// running the full test suite.  CI runs tests in a separate step.

import { writeFileSync, existsSync } from 'fs'

// Respect an already-generated real file from a prior test run.
if (existsSync('coverage.json')) {
  process.exit(0)
}

const stub = {
  numPassedTests: 0,
  numFailedTests: 0,
  numPendingTests: 0,
  numTodoTests: 0,
  numTotalTests: 0,
  numPassedTestSuites: 0,
  numFailedTestSuites: 0,
  numPendingTestSuites: 0,
  numRuntimeErrorTestSuites: 0,
  numTotalTestSuites: 0,
  startTime: Date.now(),
  success: true,
  wasInterrupted: false,
  openHandles: [],
  snapshot: {},
  testResults: [
    {
      assertionResults: [],
      endTime: 0,
      message: '',
      name: 'stub',
      startTime: 0,
      status: 'passed',
      summary: '',
    },
  ],
}

writeFileSync('coverage.json', JSON.stringify(stub, null, 2))
