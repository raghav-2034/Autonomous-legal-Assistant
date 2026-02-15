'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthContext'
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
    description: 'Get instant answers to your legal questions with AI-powered assistance',
    icon: ChatBubbleLeftRightIcon,
    href: '/legal-chat',
    gradient: 'from-gray-800 to-white',
    cost: 1
  },
  {
    title: 'Describe Problem',
    description: 'Analyze and categorize your legal situation with precision',
    icon: DocumentMagnifyingGlassIcon,
    href: '/describe-problem',
    gradient: 'from-white to-gray-700',
    cost: 1
  },
  {
    title: 'Risk Radar',
    description: 'Scan documents for legal risks and unfair terms instantly',
    icon: ShieldCheckIcon,
    href: '/risk-radar',
    gradient: 'from-gray-900 to-gray-400',
    cost: 3
  },
  {
    title: 'Strategy Simulator',
    description: 'Explore different legal strategy approaches with AI guidance',
    icon: LightBulbIcon,
    href: '/strategy-simulator',
    gradient: 'from-gray-600 to-white',
    cost: 2
  },
  {
    title: 'Rights Analyzer',
    description: 'Understand your constitutional rights exposure clearly',
    icon: ScaleIcon,
    href: '/rights-analyzer',
    gradient: 'from-white to-gray-800',
    cost: 1
  },
  {
    title: 'Constitution Explainer',
    description: 'Learn about constitutional provisions in simple terms',
    icon: BookOpenIcon,
    href: '/constitution',
    gradient: 'from-gray-700 to-gray-300',
    cost: 1
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent glow-text tracking-tight leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Autonomous Legal Assistant
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your intelligent companion for legal research, analysis, and strategy
          </motion.p>
          
          {!user ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <div className="glass p-8 md:p-10 max-w-2xl mx-auto">
                <p className="text-2xl md:text-3xl text-white mb-6 font-medium">
                  🎁 Sign up now and get <span className="font-bold text-white glow-text">20 FREE credits</span> to explore all features!
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-gradient text-2xl px-10 py-5"
                    >
                      Get Started Free
                    </motion.button>
                  </Link>
                  
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 glass text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-2xl"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Disclaimer for non-logged users */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="glass p-6 max-w-3xl mx-auto"
              >
                <p className="text-lg text-gray-400">
                  ⚖️ This information is for educational purposes only and does not constitute legal advice.
                </p>
              </motion.div>
            </motion.div>
          ) : (
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
                  className="btn-gradient text-2xl px-10 py-5"
                >
                  Start Exploring
                </motion.button>
              </Link>
              
              <Link href="#features">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 glass text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-2xl"
                >
                  View Features
                </motion.button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Features Grid - Only show when logged in */}
      {user && (
        <section id="features" className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center mb-16 text-white tracking-tight"
          >
            Powerful Legal Tools
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
              >
                <Link href={feature.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass p-8 h-full cursor-pointer group relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-gray-300 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-xl">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="px-5 py-3 bg-white/20 text-white border border-white/50 rounded-lg font-semibold text-lg">
                        {feature.cost} {feature.cost === 1 ? 'credit' : 'credits'}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Disclaimer - Only show when logged in */}
      {user && (
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass p-6 text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-400">
              ⚖️ This information is for educational purposes only and does not constitute legal advice.
            </p>
          </motion.div>
        </section>
      )}
    </div>
  )
}
