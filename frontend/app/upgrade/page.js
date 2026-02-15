'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/solid'

export default function Upgrade() {
  const { user, upgrade } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      await upgrade()
      setSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Upgrade failed:', error)
      alert('Upgrade failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to upgrade</h1>
          <a href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="absolute inset-0 water-gradient opacity-50 -z-10" />
      
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Upgrade Your Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get more credits and continue using Legal AI
          </p>
        </motion.div>

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass dark:glass-dark rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Current Plan
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Plan Type</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                {user.plan_type}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Credits Remaining</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {user.credits_remaining}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Upgrade Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass dark:glass-dark rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <SparklesIcon className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pro Plan
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Unlock unlimited access to all Legal AI features
            </p>

            <div className="space-y-3 mb-8">
              {[
                '100 Additional Credits',
                'Access to all features',
                'Priority support',
                'Advanced analytics',
                'No ads'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 dark:text-white">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                $9.99
                <span className="text-lg text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                One-time payment for this demo
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-500 rounded-xl text-green-600 dark:text-green-400 text-center"
              >
                ✓ Upgrade Successful! Redirecting...
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Upgrade Now'}
              </motion.button>
            )}

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              * This is a demo. No real payment will be processed.
            </p>
          </div>
        </motion.div>

        {/* Credit Costs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 glass dark:glass-dark rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Credit Costs
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Legal Chat', cost: 1 },
              { name: 'Describe Problem', cost: 1 },
              { name: 'Risk Radar', cost: 3 },
              { name: 'Strategy Simulator', cost: 2 },
              { name: 'Rights Analyzer', cost: 1 },
              { name: 'Constitution Explainer', cost: 1 },
            ].map((feature) => (
              <div key={feature.name} className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <span className="text-gray-800 dark:text-white">{feature.name}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {feature.cost} {feature.cost === 1 ? 'credit' : 'credits'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
