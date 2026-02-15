'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { generateStrategy } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/components/AuthContext'

const strategyTypes = [
  { key: 'conservative', title: 'Conservative Strategy', color: 'from-blue-500 to-cyan-500', icon: '🛡️' },
  { key: 'balanced', title: 'Balanced Strategy', color: 'from-purple-500 to-pink-500', icon: '⚖️' },
  { key: 'aggressive', title: 'Aggressive Strategy', color: 'from-red-500 to-orange-500', icon: '⚡' },
]

export default function StrategySimulator() {
  return (
    <ProtectedRoute>
      <StrategySimulatorContent />
    </ProtectedRoute>
  )
}

function StrategySimulatorContent() {
  const { updateCredits } = useAuth()
  const [situation, setSituation] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!situation.trim() || loading) return

    setLoading(true)
    setResult(null)

    try {
      const data = await generateStrategy(situation)
      
      if (data.credits_remaining !== undefined) {
        updateCredits(data.credits_remaining)
      }
      
      setResult(data)
    } catch (error) {
      const errorData = error.response?.data
      if (errorData?.upgrade_required) {
        setResult({ error: errorData.message, upgrade_required: true })
      } else {
        setResult({ error: 'Failed to generate strategies. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Legal Strategy Simulator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore different strategic approaches for your legal situation
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
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Describe your legal situation..."
            className="w-full h-48 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-green-500 transition-colors resize-none"
            disabled={loading}
          />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !situation.trim()}
            className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Strategies...' : 'Generate Strategies'}
          </motion.button>
        </motion.form>

        {loading && <LoadingSpinner />}

        {result && !result.error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {strategyTypes.map((strategy, index) => {
                const data = result[strategy.key]
                if (!data) return null

                return (
                  <motion.div
                    key={strategy.key}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="glass dark:glass-dark rounded-2xl p-6 relative overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${strategy.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="text-4xl mb-4">{strategy.icon}</div>
                    
                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${strategy.color} bg-clip-text text-transparent`}>
                      {strategy.title}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 mb-4">
                          {data.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                          Pros:
                        </h4>
                        <ul className="space-y-1">
                          {data.pros?.map((pro, i) => (
                            <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                              <span className="text-green-600">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                          Cons:
                        </h4>
                        <ul className="space-y-1">
                          {data.cons?.map((con, i) => (
                            <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                              <span className="text-red-600">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                          Timeline:
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {data.timeline}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

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
