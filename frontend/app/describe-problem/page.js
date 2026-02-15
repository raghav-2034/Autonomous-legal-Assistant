'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { describeProblem } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/components/AuthContext'

export default function DescribeProblem() {
  return (
    <ProtectedRoute>
      <DescribeProblemContent />
    </ProtectedRoute>
  )
}

function DescribeProblemContent() {
  const { updateCredits } = useAuth()
  const [problem, setProblem] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!problem.trim() || loading) return

    setLoading(true)
    setResult(null)

    try {
      const data = await describeProblem(problem)
      
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
        setResult({ error: 'Failed to analyze problem. Please try again.' })
      }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Describe Your Legal Problem
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant categorization and guidance for your legal situation
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
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your legal problem in detail..."
            className="w-full h-48 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-purple-500 transition-colors resize-none"
            disabled={loading}
          />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !problem.trim()}
            className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Problem'}
          </motion.button>
        </motion.form>

        {loading && <LoadingSpinner />}

        {result && result.upgrade_required && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass dark:glass-dark rounded-2xl p-6 border-yellow-500 text-center"
          >
            <p className="text-lg text-gray-800 dark:text-white mb-4">{result.error}</p>
            <a href="/upgrade">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
              >
                Upgrade Now
              </motion.button>
            </a>
          </motion.div>
        )}

        {result && !result.error && !result.upgrade_required && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">
                Case Category
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-lg">
                {result.category}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">
                Relevant Legal Sections
              </h3>
              <ul className="space-y-2">
                {result.sections?.map((section, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                    <span className="text-purple-600 dark:text-purple-400">•</span>
                    {section}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">
                Suggested Next Steps
              </h3>
              <ol className="space-y-2">
                {result.nextSteps?.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {step}
                  </li>
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

        {result?.error && !result.upgrade_required && (
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
