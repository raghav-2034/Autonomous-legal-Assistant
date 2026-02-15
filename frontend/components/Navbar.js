'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from './AuthContext'
import { Bars3Icon, XMarkIcon, CreditCardIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Legal Chat', href: '/legal-chat' },
  { name: 'Describe Problem', href: '/describe-problem' },
  { name: 'Risk Radar', href: '/risk-radar' },
  { name: 'Strategy', href: '/strategy-simulator' },
  { name: 'Rights', href: '/rights-analyzer' },
  { name: 'Constitution', href: '/constitution' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  // Don't render navbar if user is not logged in
  if (!user) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Pure Left */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <span className="text-4xl">⚖️</span>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                Autonomous Legal Assistant
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all relative group text-xl"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-300" />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Credits Display */}
            <Link href="/upgrade">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex items-center gap-2 px-5 py-3 glass rounded-lg cursor-pointer"
              >
                <CreditCardIcon className="w-6 h-6 text-white" />
                <span className="font-semibold text-white text-xl">
                  {user.credits_remaining}
                </span>
                <span className="text-base text-gray-400">credits</span>
              </motion.div>
            </Link>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <div className="px-4 py-2 text-lg text-gray-300">
                {user.email}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg flex items-center gap-2 transition-all text-lg"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Logout
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6 text-white" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            <div className="px-4 py-3 mb-2 glass rounded-lg">
              <div className="text-lg text-gray-300 mb-2">
                {user.email}
              </div>
              <div className="flex items-center gap-2">
                <CreditCardIcon className="w-5 h-5 text-white" />
                <span className="font-semibold text-white text-lg">{user.credits_remaining} credits</span>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 transition-all text-xl"
                >
                  {link.name}
                </div>
              </Link>
            ))}

            <Link href="/upgrade">
              <div
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all text-xl"
              >
                Upgrade Plan
              </div>
            </Link>
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all text-xl"
            >
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
