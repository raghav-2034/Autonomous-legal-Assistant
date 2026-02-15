'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { legalChat } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

export default function LegalChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const data = await legalChat(input)
      const aiMessage = { 
        role: 'assistant', 
        content: data.response,
        disclaimer: data.disclaimer 
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.',
        error: true
      }
      setMessages(prev => [...prev, errorMessage])
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Legal Chat
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ask any legal question and get instant AI-powered answers
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass dark:glass-dark rounded-2xl p-6 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto"
        >
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"
              >
                Start a conversation by typing your legal question below
              </motion.div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : message.error
                          ? 'glass dark:glass-dark border-red-500'
                          : 'glass dark:glass-dark'
                      }`}
                    >
                      <p className={message.role === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-200'}>
                        {message.content}
                      </p>
                      {message.disclaimer && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                          {message.disclaimer}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {loading && <LoadingSpinner />}
        </motion.div>

        {/* Input Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="glass dark:glass-dark rounded-2xl p-4 flex gap-4"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your legal question here..."
            className="flex-1 bg-transparent border-none outline-none resize-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows="3"
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            Send
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}
