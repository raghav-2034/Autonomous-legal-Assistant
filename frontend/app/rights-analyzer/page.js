'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { analyzeRights } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'

const severityColors = {
  Low: 'from-green-500 to-emerald-500',
  Medium: 'from-yellow-500 to-orange-500',
  High: 'from-orange-500 to-red-500',
  Critical: 'from-red-500 to-pink-500',
}

export default function RightsAnalyzer() {
  const [scenario, setScenario] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!scenario.trim() || loading) return

    setLoading(true)
    setResult(null)

    try {
      const data = await analyzeRights(scenario)
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to analyze rights. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Rights Exposure Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Understand how your constitutional rights may be affected
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
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe your scenario or situation..."
            className="w-full h-48 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors resize-none"
            disabled={loading}
          />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !scenario.trim()}
            className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Rights'}
          </motion.button>
        </motion.form>

        {loading && <LoadingSpinner />}

        {result && !result.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Severity Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass dark:glass-dark rounded-2xl p-6 text-center"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Severity Level
              </h3>
              <div className={`inline-block px-8 py-4 rounded-xl bg-gradient-to-r ${severityColors[result.severityLevel] || severityColors.Medium} text-white font-bold text-2xl`}>
                {result.severityLevel}
              </div>
            </motion.div>

            {/* Affected Rights */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                Affected Constitutional Rights
              </h3>
              <div className="grid gap-3">
                {result.affectedRights?.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"
                  >
                    <span className="text-2xl">⚖️</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {right}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Relevant Articles */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                Relevant Constitutional Articles
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.articles?.map((article, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold"
                  >
                    {article}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Explanation */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                Detailed Explanation
              </h3>
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {result.explanation}
              </p>
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
