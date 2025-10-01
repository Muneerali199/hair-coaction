'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="text-center p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-purple-800/50 max-w-md w-full">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-300 mb-6">We're sorry for the inconvenience. Please try again.</p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-sm text-red-400 mb-4 font-mono bg-red-900/20 p-2 rounded">
            {error.message}
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 px-6 py-3 bg-white/10 border border-purple-700/50 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
