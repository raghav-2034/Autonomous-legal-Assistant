'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { analyzeRisk } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/components/AuthContext'

const severityColors = {
  Low: 'from-green-500 to-emerald-500',
  Medium: 'from-yellow-500 to-orange-500',
  High: 'from-red-500 to-pink-500',
}

export default function RiskRadar() {
  return (
    <ProtectedRoute>
      <RiskRadarContent />
    </ProtectedRoute>
  )
}

function RiskRadarContent() {
  const { updateCredits } = useAuth()
  const [document, setDocument] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!document.trim() || loading) return

    setLoading(true)
    setResult(null)

    try {
      const data = await analyzeRisk(document)
      
      // Update credits if returned
      if (data.credits_remaining !== undefined) {
        updateCredits(data.credits_remaining)
      }
      
      setResult(data)
    } catch (error) {
      const errorData = error.response?.data
      if (errorData?.upgrade_required) {
        setResult({ 
          error: errorData.message,
          upgrade_required: true 
        })
      } else {
        setResult({ error: 'Failed to analyze document. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Legal Risk Radar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced document intelligence and risk analysis
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass dark:glass-dark rounded-2xl p-8 mb-8"
        >
          <textarea
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            placeholder="Paste your legal document or contract here for analysis..."
            className="w-full h-64 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-red-500 transition-colors resize-none"
            disabled={loading}
          />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !document.trim()}
            className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Document'}
          </motion.button>
        </motion.form>

        {loading && <LoadingSpinner />}

        {result && !result.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">
                Summary
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                {result.summary}
              </p>
            </motion.div>

            {/* Risk Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass dark:glass-dark rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold mb-3 text-gray-700 dark:text-gray-300">
                  Risk Severity
                </h3>
                <div className={`inline-block px-6 py-3 rounded-xl bg-gradient-to-r ${severityColors[result.riskSeverity] || severityColors.Medium} text-white font-bold text-xl`}>
                  {result.riskSeverity}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass dark:glass-dark rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold mb-3 text-gray-700 dark:text-gray-300">
                  Fairness Score
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {result.fairnessScore}
                  </div>
                  <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.fairnessScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Flagged Clauses */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
                Flagged Clauses
              </h3>
              <ul className="space-y-3">
                {result.flaggedClauses?.map((clause, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-sm">
                      !
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{clause}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Improvements */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
                Clause Improvements
              </h3>
              <ul className="space-y-3">
                {result.improvements?.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                      ✓
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Recommended Actions */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                Recommended Actions
              </h3>
              <ol className="space-y-3">
                {result.actions?.map((action, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 pt-1">{action}</span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {result.disclaimer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass dark:glass-dark rounded-xl p-4 text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ⚖️ {result.disclaimer}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {result?.error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass dark:glass-dark rounded-2xl p-6 border-red-500 text-red-600 dark:text-red-400"
          >
            {result.error}
          </motion.div>
        )}
      </div>
    </div>
  )
}
