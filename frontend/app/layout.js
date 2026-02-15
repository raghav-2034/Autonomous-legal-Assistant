import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/components/AuthContext'
import FloatingChatButton from '@/components/FloatingChatButton'

export const metadata = {
  title: 'Autonomous Legal Assistant',
  description: 'AI-powered legal intelligence platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "'Noteworthy', 'Comic Sans MS', cursive, sans-serif" }}>
        <ThemeProvider>
          <AuthProvider>
            {/* Animated Ocean Background */}
            <div className="fixed inset-0 ocean-bg -z-20" />
            
            {/* Floating Orbs */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="orb-1 floating-orb" />
              <div className="orb-2 floating-orb" />
              <div className="orb-3 floating-orb" />
            </div>

            <Navbar />
            <main className="min-h-screen relative z-10">
              {children}
            </main>
            <FloatingChatButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
