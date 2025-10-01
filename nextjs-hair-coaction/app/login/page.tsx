'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { Mail, Lock, LogIn, Sparkles, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      setError(error.message || 'Failed to login with Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] rounded-full blur-3xl animate-blob-3d bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[45vw] h-[45vw] rounded-full blur-3xl animate-blob-3d-delay-2 bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Link */}
        <Link href="/" className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6 transition-colors group">
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-800/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700/50 mb-4">
              <Sparkles className="h-4 w-4 mr-2 text-purple-300" />
              <span className="text-sm font-medium text-purple-300">HairCoaction Platform</span>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-300">Login to your account and continue your journey</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-700/50 rounded-xl text-red-300 text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-purple-800/50 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-purple-800/50 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-purple-800/50"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-purple-800/50"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white/10 border-2 border-purple-700/50 text-white py-3 rounded-xl font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-gray-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob-3d {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(30px, -40px); }
          66% { transform: scale(0.95) translate(-20px, 20px); }
        }
        .animate-blob-3d {
          animation: blob-3d 8s ease-in-out infinite;
        }
        .animate-blob-3d-delay-2 {
          animation: blob-3d 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
