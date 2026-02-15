'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ChatBubbleLeftRightIcon, 
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ScaleIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    title: 'Legal Chat',
    description: 'Get instant answers to your legal questions',
    icon: ChatBubbleLeftRightIcon,
    href: '/legal-chat',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Describe Problem',
    description: 'Analyze and categorize your legal situation',
    icon: DocumentMagnifyingGlassIcon,
    href: '/describe-problem',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Risk Radar',
    description: 'Scan documents for legal risks and unfair terms',
    icon: ShieldCheckIcon,
    href: '/risk-radar',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    title: 'Strategy Simulator',
    description: 'Explore different legal strategy approaches',
    icon: LightBulbIcon,
    href: '/strategy-simulator',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Rights Analyzer',
    description: 'Understand your constitutional rights exposure',
    icon: ScaleIcon,
    href: '/rights-analyzer',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'Constitution Explainer',
    description: 'Learn about constitutional provisions simply',
    icon: BookOpenIcon,
    href: '/constitution',
    gradient: 'from-violet-500 to-purple-500'
  }
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 water-gradient opacity-50 -z-10" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            AI Legal Intelligence
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Your intelligent companion for legal research, analysis, and strategy
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/legal-chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started
              </motion.button>
            </Link>
            
            <Link href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass dark:glass-dark text-gray-800 dark:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Explore Features
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white"
        >
          Powerful Legal Tools
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass dark:glass-dark rounded-2xl p-8 h-full cursor-pointer group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <feature.icon className={`w-12 h-12 mb-4 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} />
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass dark:glass-dark rounded-xl p-6 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ⚖️ This information is for educational purposes only and does not constitute legal advice.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
