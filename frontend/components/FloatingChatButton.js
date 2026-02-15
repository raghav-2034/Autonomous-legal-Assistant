'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'

export default function FloatingChatButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Link href="/legal-chat">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group cursor-pointer"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity pointer-events-none" />
          
          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
            
            {/* Notification pulse */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
              >
                <div className="glass dark:glass-dark px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    💬 Chat with Legal AI
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Get instant legal answers
                  </p>
                </div>
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-white/10 backdrop-blur-lg border-r border-b border-white/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>

      {/* Ripple effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
