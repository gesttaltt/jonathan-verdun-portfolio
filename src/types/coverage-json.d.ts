// Type declaration for auto-generated coverage.json (gitignored).
// Jest generates this file via --json --outputFile=coverage.json at build time.
// These types ensure CI type-checking passes before the file exists.

declare module '../../coverage.json' {
  interface AssertionResult {
    ancestorTitles: string[]
    fullName: string
    status: 'passed' | 'failed' | 'pending' | 'todo'
    title: string
    duration: number | null
    failureMessages: string[]
    location: unknown | null
    meta: Record<string, unknown>
  }

  interface TestResult {
    assertionResults: AssertionResult[]
    endTime: number
    message: string
    name: string
    startTime: number
    status: 'passed' | 'failed'
    summary: string
  }

  const coverageData: {
    numFailedTestSuites: number
    numFailedTests: number
    numPassedTestSuites: number
    numPassedTests: number
    numPendingTestSuites: number
    numPendingTests: number
    numRuntimeErrorTestSuites: number
    numTodoTests: number
    numTotalTestSuites: number
    numTotalTests: number
    openHandles: unknown[]
    snapshot: Record<string, unknown>
    startTime: number
    success: boolean
    testResults: TestResult[]
    wasInterrupted: boolean
  }

  export default coverageData
}
