'use client'

import { createContext, useContext } from 'react'

const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  // Fixed dark theme for premium ocean design
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
