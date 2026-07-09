'use client'

import { useState, useEffect } from 'react'
import { PRODUCTS } from '@/lib/data'
import {
  runAllTests,
  formatTestResults,
  type TestResult,
} from '@/lib/testing-utils'

export default function TestingPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runTests = async () => {
    setIsRunning(true)
    setError(null)
    setTestResults([])

    try {
      console.log('[v0] Starting comprehensive tests...')
      const results = await runAllTests(PRODUCTS)
      setTestResults(results)
      console.log('[v0] Tests completed:', results)

      // Log to console
      const formattedResults = formatTestResults(results)
      console.log(formattedResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during testing')
      console.error('[v0] Test error:', err)
    } finally {
      setIsRunning(false)
    }
  }

  const passedCount = testResults.filter((r) => r.passed).length
  const totalCount = testResults.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] to-[#f9f9f7] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-normal text-[#222222] mb-2">
            Image Migration Testing
          </h1>
          <p className="text-[#4a4a4a] text-lg font-light">
            Comprehensive QA checks for product images, fallbacks, and performance
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-8 mb-8">
          <button
            onClick={runTests}
            disabled={isRunning}
            className={`py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
              isRunning
                ? 'bg-[#4a4a4a]/50 cursor-not-allowed'
                : 'bg-[#222222] hover:bg-[#4a4a4a] cursor-pointer'
            }`}
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {testResults.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6 text-center">
                <div className="text-4xl font-bold text-[#222222]">{passedCount}</div>
                <div className="text-[#4a4a4a] text-sm mt-2">Tests Passed</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6 text-center">
                <div className="text-4xl font-bold text-[#222222]">{totalCount - passedCount}</div>
                <div className="text-[#4a4a4a] text-sm mt-2">Tests Failed</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6 text-center">
                <div className="text-4xl font-bold text-[#222222]">
                  {totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0}%
                </div>
                <div className="text-[#4a4a4a] text-sm mt-2">Pass Rate</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[#222222]">Overall Progress</span>
                <span className="text-[#4a4a4a] text-sm">
                  {passedCount} of {totalCount}
                </span>
              </div>
              <div className="w-full bg-[#e8e2d9]/30 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-[#222222] h-full transition-all duration-500 ease-out"
                  style={{ width: `${totalCount > 0 ? (passedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-sm border p-6 transition-all duration-300 ${
                    result.passed
                      ? 'bg-green-50/50 border-green-200/50'
                      : 'bg-red-50/50 border-red-200/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          result.passed ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {result.passed ? '✓' : '✗'}
                      </div>
                      <h3 className="font-semibold text-[#222222]">{result.name}</h3>
                    </div>
                    <span className="text-[#4a4a4a] text-sm font-mono">
                      {result.duration.toFixed(2)}ms
                    </span>
                  </div>

                  {result.details && (
                    <div className="ml-9 space-y-2 mb-3">
                      {Object.entries(result.details).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-semibold text-[#4a4a4a] capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}:
                          </span>{' '}
                          <span className="text-[#666666]">
                            {Array.isArray(value)
                              ? value.length > 0
                                ? value.map((v, i) => (
                                    <div key={i} className="ml-4 text-[11px] font-mono text-[#555555]">
                                      • {JSON.stringify(v)}
                                    </div>
                                  ))
                                : 'None'
                              : JSON.stringify(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {result.error && (
                    <div className="ml-9 text-sm text-red-700 font-mono bg-red-50 rounded px-3 py-2">
                      {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Export Results */}
            <div className="mt-8 pt-8 border-t border-[#e8e2d9]">
              <button
                onClick={() => {
                  const resultsJson = JSON.stringify(testResults, null, 2)
                  const blob = new Blob([resultsJson], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `test-results-${new Date().toISOString()}.json`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="py-2 px-4 border border-[#222222] text-[#222222] rounded-lg font-semibold hover:bg-[#f5f5f0] transition-colors"
              >
                Export Results (JSON)
              </button>
            </div>
          </>
        )}

        {/* Initial State */}
        {testResults.length === 0 && !isRunning && (
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-12 text-center">
            <p className="text-[#4a4a4a] font-light text-lg mb-4">
              Click "Run All Tests" to begin comprehensive testing
            </p>
            <div className="text-[#8c8c88] text-sm space-y-2">
              <p>Tests will verify:</p>
              <ul className="list-disc list-inside inline-block text-left">
                <li>Image Loading & Fallbacks</li>
                <li>URL Validation</li>
                <li>Empty States & Error Handling</li>
                <li>Accessibility & SEO</li>
                <li>Performance Metrics</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
