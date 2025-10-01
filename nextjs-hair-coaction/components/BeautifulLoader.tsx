'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

interface BeautifulLoaderProps {
  darkMode: boolean
}

const BeautifulLoader: React.FC<BeautifulLoaderProps> = ({ darkMode }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100'
    }`}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] rounded-full blur-3xl animate-blob-3d ${
          darkMode ? 'bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30' : 'bg-gradient-to-br from-pink-400/40 via-rose-400/30 to-orange-300/40'
        }`} />
        <div className={`absolute bottom-[-20%] right-[-15%] w-[45vw] h-[45vw] rounded-full blur-3xl animate-blob-3d-delay-2 ${
          darkMode ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20' : 'bg-gradient-to-br from-orange-300/30 via-pink-300/40 to-rose-400/30'
        }`} />
      </div>

      <div className="text-center relative z-10">
        {/* Spinning Rings */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className={`absolute inset-0 border-4 rounded-full animate-ping ${
            darkMode ? 'border-purple-600/30' : 'border-pink-200'
          }`}></div>
          <div className={`absolute inset-0 border-4 rounded-full animate-spin ${
            darkMode ? 'border-purple-500 border-t-transparent' : 'border-pink-500 border-t-transparent'
          }`}></div>
          <div className={`absolute inset-4 border-4 rounded-full animate-spin ${
            darkMode ? 'border-pink-500 border-b-transparent' : 'border-rose-500 border-b-transparent'
          }`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className={`absolute inset-8 border-4 rounded-full animate-spin ${
            darkMode ? 'border-blue-500 border-l-transparent' : 'border-orange-500 border-l-transparent'
          }`} style={{ animationDuration: '2s' }}></div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className={`h-8 w-8 ${darkMode ? 'text-purple-400' : 'text-pink-500'} animate-pulse`} />
          </div>
        </div>

        {/* Text */}
        <h2 className={`text-3xl font-black mb-2 ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent' 
            : 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent'
        }`}>
          Loading HairCoaction
        </h2>
        <p className={`mt-2 text-lg font-medium ${darkMode ? 'text-purple-300' : 'text-gray-600'}`}>
          Preparing your dashboard...
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                darkMode ? 'bg-purple-500' : 'bg-pink-500'
              } animate-bounce`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
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

export default BeautifulLoader
