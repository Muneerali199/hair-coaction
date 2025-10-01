'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading/verification
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Confirming your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] rounded-full blur-3xl animate-blob-3d bg-gradient-to-br from-purple-600/20 via-pink-600/15 to-blue-600/20" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[45vw] h-[45vw] rounded-full blur-3xl animate-blob-3d-delay-2 bg-gradient-to-br from-blue-600/15 via-purple-600/20 to-pink-600/15" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 mb-8 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Payment Successful! 🎉
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Welcome to the HairCoaction premium experience! Your subscription is now active.
          </p>

          {/* Features Unlocked */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">What&apos;s Unlocked</h2>
            </div>
            <ul className="space-y-3 text-left">
              {[
                'Advanced hair profile analysis',
                'Unlimited routine tracking',
                'Expert consultations',
                'Priority support',
                'Exclusive community content',
                'Product recommendations',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                Go to Dashboard
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/dashboard/billing">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-all duration-300">
                View Billing
              </button>
            </Link>
          </div>

          {/* Session Info */}
          {sessionId && (
            <p className="mt-8 text-sm text-gray-500">
              Session ID: {sessionId}
            </p>
          )}

          {/* Email Confirmation */}
          <p className="mt-8 text-gray-400">
            A confirmation email has been sent to your inbox.
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
