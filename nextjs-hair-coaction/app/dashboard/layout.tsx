'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import BeautifulLoader from '@/components/BeautifulLoader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
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
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100'}`}>
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] ${darkMode ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-pink-400 via-rose-400 to-orange-300'} rounded-full blur-3xl opacity-40 animate-blob3d`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900' : 'bg-gradient-to-br from-orange-300 via-pink-300 to-rose-400'} rounded-full blur-3xl opacity-30 animate-blob3d animation-delay-2000`} />
      </div>

      <div className="flex flex-1 relative z-10">
        <Sidebar user={user} darkMode={darkMode} onSignOut={handleSignOut} />
        
        <div className="flex-1 flex flex-col">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg font-semibold shadow transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-pink-200 text-pink-900 hover:bg-pink-300'}`}
            >
              {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
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
