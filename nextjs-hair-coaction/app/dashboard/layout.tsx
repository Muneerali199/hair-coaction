'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import BeautifulLoader from '@/components/BeautifulLoader'
import { Moon, Sun } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true) // Dark mode enabled by default
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        router.push('/login')
        return
      }

      setUser(session.user)
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  if (loading) {
    return <BeautifulLoader darkMode={darkMode} />
  }

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100'}`}>
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-3xl animate-blob3d ${darkMode ? 'bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30' : 'bg-gradient-to-br from-pink-400 via-rose-400 to-orange-300 opacity-40'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full blur-3xl animate-blob3d animation-delay-2000 ${darkMode ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20' : 'bg-gradient-to-br from-orange-300 via-pink-300 to-rose-400 opacity-30'}`} />
      </div>

      <div className="flex flex-1 relative z-10">
        <Sidebar user={user} darkMode={darkMode} onSignOut={handleSignOut} />
        
        <div className="flex-1 flex flex-col">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 ${darkMode ? 'bg-purple-900/50 border border-purple-700/50 text-purple-300 hover:bg-purple-800/50' : 'bg-pink-200 text-pink-900 hover:bg-pink-300'}`}
            >
              {darkMode ? <><Sun className="h-5 w-5" /> Light Mode</> : <><Moon className="h-5 w-5" /> Dark Mode</>}
            </button>
          </div>

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
