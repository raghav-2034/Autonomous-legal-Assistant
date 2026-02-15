'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { explainConstitution } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/components/AuthContext'

export default function Constitution() {
  return (
    <ProtectedRoute>
      <ConstitutionContent />
    </ProtectedRoute>
  )
}

function ConstitutionContent() {
  const { updateCredits } = useAuth()
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim() || loading) return

    setLoading(true)
    setResult(null)

    try {
      const data = await explainConstitution(query)
      
      if (data.credits_remaining !== undefined) {
        updateCredits(data.credits_remaining)
      }
      
      setResult(data)
    } catch (error) {
      const errorData = error.response?.data
      if (errorData?.upgrade_required) {
        setResult({ error: errorData.message, upgrade_required: true })
      } else {
        setResult({ error: 'Failed to explain provision. Please try again.' })
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Constitution Explainer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Understand constitutional provisions in simple language
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass dark:glass-dark rounded-2xl p-8 mb-8"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter article number or part name (e.g., 'Article 14' or 'Right to Equality')"
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-violet-500 transition-colors"
            disabled={loading}
          />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Explaining...' : 'Explain'}
          </motion.button>
        </motion.form>

        {loading && <LoadingSpinner />}

        {result && !result.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Simple Explanation */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-violet-600 dark:text-violet-400">
                Simple Explanation
              </h3>
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                {result.explanation}
              </p>
            </motion.div>

            {/* Key Points */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                Key Points
              </h3>
              <ul className="space-y-3">
                {result.keyPoints?.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 pt-0.5">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Examples */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                Real-World Examples
              </h3>
              <div className="space-y-4">
                {result.examples?.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      {example}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Related Provisions */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
                Related Provisions
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.relatedProvisions?.map((provision, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold"
                  >
                    {provision}
                  </motion.div>
                ))}
              </div>
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
